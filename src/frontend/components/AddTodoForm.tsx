"use client";
import { useState } from "react";

export default function AddTodoForm({ onSuccess }: { onSuccess: () => void }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description: desc }),
      });
      setTitle("");
      setDesc("");
      onSuccess(); 
    } catch (err) {
      alert("Failed to create todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <input
        className="p-4 rounded-2xl text-black text-xl outline-none focus:ring-4 ring-[#5B6BF9]/50"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="p-4 rounded-2xl text-black text-xl h-32 outline-none focus:ring-4 ring-[#5B6BF9]/50"
        placeholder="Description..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button
        disabled={loading}
        className="bg-[#5B6BF9] text-white p-4 rounded-full font-bold text-xl hover:bg-blue-700 transition shadow-lg"
      >
        {loading ? "SAVING..." : "SAVE TODO"}
      </button>
    </form>
  );
}