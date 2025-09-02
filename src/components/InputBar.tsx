"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function InputBar({ onSend }: { onSend: (msg: string) => void }) {
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 rounded-full w-full max-w-2xl text-gray-200">
      {/* Upload Icon */}
      <button className="hover:text-white">
        <Plus size={20} />
      </button>

      {/* Text Input Area */}
      <textarea
        placeholder="Ask anything or paste your text here..."
        className="flex-1 bg-transparent resize-none outline-none text-sm text-gray-200 placeholder-gray-500 max-h-32"
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />
    </div>
  );
}
