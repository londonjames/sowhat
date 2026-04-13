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
      router.push("/review");
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-24">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-gray-border" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-accent" />
        </div>
        <p className="text-lg text-gray">Reading your document...</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Paste your document here..."
        rows={10}
        className="w-full resize-none rounded-xl border border-gray-border bg-surface p-6 text-base leading-relaxed text-foreground placeholder:text-gray-light focus:border-accent focus:outline-none"
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors ${
          dragOver
            ? "border-accent bg-accent/5"
            : file
              ? "border-accent/50 bg-surface"
              : "border-gray-border bg-surface hover:border-gray-light"
        }`}
      >
        {file ? (
          <>
            <svg
              className="h-6 w-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-foreground">{file.name}</p>
            <p className="text-xs text-gray-light">
              Click or drop to replace
            </p>
          </>
        ) : (
          <>
            <svg
              className="h-8 w-8 text-gray-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="text-sm text-gray">
              Drop a file here, or click to browse
            </p>
            <p className="text-xs text-gray-light">PDF, DOCX, or PPTX</p>
          </>
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
        <p className="text-center text-sm" style={{ color: "var(--score-red)" }}>
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!text.trim() && !file}
        className="w-full rounded-xl bg-accent py-4 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Review
      </button>
    </div>
  );
}
