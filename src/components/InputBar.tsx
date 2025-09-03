"use client";

import { useState, useRef } from "react";
import { Plus } from "lucide-react";
import FilePreview from "@/components/FilePreview";
import { parseFile } from "@/lib/fileparser";

export default function InputBar({
  onSend,
  disabled = false,
}: {
  onSend: (msg: string, files: any[]) => void;
  disabled?: boolean;
}) {
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    if (selected.length === 0) return;
    setFiles((prev) => [...prev, ...selected]);
    e.target.value = ""; // reset for re-upload
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const sendMessage = async () => {
    if (disabled) {
      alert("Model is still processing. Please wait.");
      return;
    }
    if (!input.trim() && files.length === 0) return;

    const parsedFiles: any[] = [];
    for (const f of files) {
      try {
        const parsed = await parseFile(f);
        parsedFiles.push({ name: f.name, ...parsed });
      } catch (err) {
        parsedFiles.push({ name: f.name, type: "error", error: String(err) });
      }
    }

    onSend(input, parsedFiles);
    setInput("");
    setFiles([]);
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-2xl">
      {/* File previews */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, i) => (
            <FilePreview key={i} file={file} onRemove={() => removeFile(i)} />
          ))}
        </div>
      )}

      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-full w-full text-gray-200 ${
          disabled ? "bg-gray-600 opacity-70" : "bg-gray-800"
        }`}
      >
        {/* Upload button */}
        <button
          className="hover:text-white disabled:opacity-50"
          disabled={disabled}
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus size={20} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={handleFileSelect}
        />

        {/* Text Input Area */}
        <textarea
          placeholder={
            disabled
              ? "Model is processing..."
              : "Ask anything or paste your text here..."
          }
          className="flex-1 bg-transparent resize-none outline-none text-sm text-gray-200 placeholder-gray-500 max-h-32 disabled:cursor-not-allowed"
          rows={1}
          value={input}
          disabled={disabled}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
      </div>
    </div>
  );
}
