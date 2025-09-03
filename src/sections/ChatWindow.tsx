"use client";

import { useState } from "react";
import InputBar from "@/components/InputBar";

export default function ChatWindow() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (message: string, files: any[]) => {
    if (!message.trim() && files.length === 0) return;
    if (loading) {
      alert("Please wait until the current response is complete.");
      return;
    }

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    // Add placeholder assistant message
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "validating test cases..." },
    ]);

    setLoading(true);

    try {
      // Send to backend API
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, files }),
      });

      const data = await res.json();

      // Replace placeholder with real reply
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: data.reply,
        };
        return copy;
      });
    } catch (err) {
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "❌ Error fetching response from model.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-2xl font-semibold text-gray-200 mb-6">
        What are you working on?
      </h1>

      {/* Messages */}
      <div className="flex flex-col w-full max-w-2xl flex-1 overflow-y-auto space-y-3 p-4 bg-gray-900 rounded-xl mb-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              m.role === "user"
                ? "bg-blue-600 self-end"
                : "bg-gray-700 self-start"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <InputBar onSend={handleSend} disabled={loading} />
    </section>
  );
}
