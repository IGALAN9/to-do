"use client";

import React from "react";

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

type Props = {
  todo: Todo;
  onClose: () => void;
  onUpdate: (id: number, data: Partial<Todo>) => void;
  onDelete: (id: number) => void;
};

export default function TodoModal({ todo, onClose, onUpdate, onDelete }: Props) {
  const isDone = todo.completed;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Card Modal */}
      <div className="w-full max-w-3xl bg-[#5B6BF9] rounded-3xl p-6 shadow-2xl text-white relative flex flex-col gap-6 border-4 border-[#5B6BF9]">
        
        {/* Tombol Back */}
        <div className="absolute top-6 left-6">
          <button
            onClick={onClose}
            className="bg-white text-[#5B6BF9] px-6 py-2 rounded-full font-bold shadow-lg hover:bg-gray-100 transition"
          >
            BACK
          </button>
        </div>

        {/* Title */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold uppercase tracking-wider text-black">
            {todo.title}
          </h2>
        </div>

        {/* Description */}
        <div className="bg-[#5B6BF9] text-black font-medium text-lg text-center px-8 uppercase leading-relaxed min-h-[100px] flex items-center justify-center">
          {todo.description || "NO DESCRIPTION"}
        </div>

        {/* Status Badge */}
        <div className="flex justify-center">
          <div
            className={`px-12 py-3 rounded-full font-bold text-xl shadow-md border-2 border-black/10 ${
              isDone ? "bg-[#4ADE80] text-black" : "bg-[#DC2626] text-black"
            }`}
          >
            Status : {isDone ? "Done" : "Not Done"}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4 mt-4 px-4">
          <button
            onClick={() => onUpdate(todo.id, { completed: !isDone })}
            className={`flex-1 py-4 rounded-full font-bold text-xl shadow-lg transition border-2 border-black/10 text-black ${
              isDone
                ? "bg-[#DC2626] hover:bg-red-700" 
                : "bg-[#4ADE80] hover:bg-green-500" 
            }`}
          >
            {isDone ? "Mark As Not Done" : "Mark As Done"}
          </button>

          <button
            onClick={() => {
              if (confirm("Are you sure?")) onDelete(todo.id);
            }}
            className="flex-1 bg-[#DC2626] text-black border-2 border-black/10 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}