import mammoth from "mammoth";
import pdfParse from "pdf-parse";
import JSZip from "jszip";

export async function extractText(
  buffer: Buffer,
  filename: string
): Promise<string> {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return extractPDF(buffer);
    case "docx":
      return extractDOCX(buffer);
    case "pptx":
      return extractPPTX(buffer);
    default:
      throw new Error(`Unsupported file type: .${ext}`);
  }
}

async function extractPDF(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer);
  return data.text;
}

async function extractDOCX(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

async function extractPPTX(buffer: Buffer): Promise<string> {
  const zip = await JSZip.loadAsync(buffer);
  const slideFiles = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => {
      const numA = parseInt(a.match(/slide(\d+)/)?.[1] || "0");
      const numB = parseInt(b.match(/slide(\d+)/)?.[1] || "0");
      return numA - numB;
    });

  const texts: string[] = [];
  for (const slidePath of slideFiles) {
    const xml = await zip.files[slidePath].async("text");
    const matches = xml.match(/<a:t>([^<]*)<\/a:t>/g) || [];
    const slideText = matches
      .map((m) => m.replace(/<\/?a:t>/g, ""))
      .join(" ");
    if (slideText.trim()) texts.push(slideText.trim());
  }
  return texts.join("\n\n");
}
