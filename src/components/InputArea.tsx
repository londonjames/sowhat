"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const ACCEPTED_EXTENSIONS = ".pdf,.docx,.pptx";

export default function InputArea() {
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFile = useCallback((f: File) => {
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (!ext || !["pdf", "docx", "pptx"].includes(ext)) {
      setError("Unsupported file type. Please upload a PDF, DOCX, or PPTX.");
      return;
    }
    setFile(f);
    setText("");
    setError("");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (e.target.value) {
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    setError("");
  };

  const handleSubmit = async () => {
    if (!text.trim() && !file) {
      setError("Please paste some text or upload a file.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let res: Response;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        res = await fetch("/api/evaluate", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch("/api/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: text.trim() }),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("sowhat_result", JSON.stringify(data.evaluation));
      if (data.id) {
        router.push(`/r/${data.id}`);
      } else {
        router.push("/review");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-20">
        <p className="text-xl italic text-foreground">
          Reading your document...
        </p>
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-1.5 w-8 rounded-full bg-gray-border animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Paste your document here..."
        rows={6}
        autoFocus
        className="w-full resize-y rounded-lg border border-gray-border bg-white px-5 py-4 text-base leading-relaxed text-foreground placeholder:text-gray-light outline-none transition-colors focus:border-foreground"
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer items-center justify-center gap-3 rounded-lg border py-4 transition-colors ${
          dragOver
            ? "border-foreground bg-surface"
            : file
              ? "border-foreground bg-white"
              : "border-gray-border bg-white hover:border-gray-light"
        }`}
      >
        {file ? (
          <p className="text-sm text-foreground">
            <span className="font-medium">{file.name}</span>
            <span className="ml-2 text-gray-light">
              (click to replace)
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-light">
            Or add a file here (e.g., PDF, DOC, PPT)
          </p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-center text-sm text-red-700">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!text.trim() && !file}
        className="rounded-lg border border-foreground bg-foreground px-10 py-3 text-base font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
      >
        Review
      </button>
    </div>
  );
}
