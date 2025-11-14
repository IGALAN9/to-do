"use client";

import { useEffect, useState } from "react";
import TodoModal from "../components/TodoModal";
import AddTodoForm from "../components/AddTodoForm";

type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [view, setView] = useState<"LIST" | "NEW">("LIST");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  // Sorting yang udah bakal ke bawah
  const sortTodos = (data: Todo[]) => {
    return [...data].sort((a, b) => {
      return Number(a.completed) - Number(b.completed);
    });
  };

  // 1. Fetch Data dari API (GET)
  const fetchTodos = async () => {
    try {
      const res = await fetch("/api/todos");
      const data = await res.json();
      if (Array.isArray(data)) {
        setTodos(sortTodos(data));
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // 2. Update Data (PUT)
  const handleUpdate = async (id: number, updates: Partial<Todo>) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updatedTodo = await res.json();
        
        // Logic Sort otomatis setelah update
        setTodos((prev) => {
          const newList = prev.map((t) => (t.id === id ? updatedTodo : t));
          return sortTodos(newList);
        });

        // Update selectedTodo jika yang diupdate adalah yang sedang dibuka
        if (selectedTodo?.id === id) {
          setSelectedTodo(updatedTodo);
        }
      }
    } catch (error) {
      console.error("Failed to update", error);
    }
  };

  // 3. Delete Data (DELETE)
  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/todos/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setSelectedTodo(null); 
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  return (
    <main className="min-h-screen bg-[#CFCFCF] p-4 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto bg-[#D9D9D9] rounded-[40px] shadow-xl overflow-hidden min-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#D9D9D9] p-8 pb-4">
          <h1 className="text-5xl font-extrabold text-[#7B61FF] drop-shadow-sm">
            TODO-LIST
          </h1>
        </div>

        {/* Menu Tabs */}
        <div className="flex gap-4 px-8 py-4 bg-[#D9D9D9] border-b border-gray-300/50">
          <button
            onClick={() => setView("LIST")}
            className={`px-12 py-2 rounded-full font-bold text-xl transition shadow-md ${
              view === "LIST"
                ? "bg-[#7B61FF] text-white"
                : "bg-[#7B61FF]/40 text-white hover:bg-[#7B61FF]/60"
            }`}
          >
            LIST
          </button>
          <button
            onClick={() => setView("NEW")}
            className={`px-12 py-2 rounded-full font-bold text-xl transition shadow-md ml-auto ${
              view === "NEW"
                ? "bg-[#7B61FF] text-white"
                : "bg-[#7B61FF]/40 text-white hover:bg-[#7B61FF]/60"
            }`}
          >
            NEW
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#CFCFCF] p-6 overflow-y-auto">
          {view === "LIST" ? (
            <div className="space-y-3">
              {loading && <p className="text-center text-gray-500">Loading...</p>}
              {!loading && todos.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No todos yet. Click "NEW" to create one!</p>
              )}

              {/* LIST ITEM */}
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  onClick={() => setSelectedTodo(todo)}
                  className="group bg-[#7B61FF] text-white p-2 pl-6 pr-4 rounded-full flex items-center justify-between cursor-pointer hover:scale-[1.01] transition shadow-lg"
                >
                  {/* Title */}
                  <div className="w-1/4 font-bold text-lg truncate uppercase">
                    {todo.title}
                  </div>

                  {/* Description (Tengah) */}
                  <div className="w-2/4 text-center text-white/80 text-sm truncate uppercase px-2">
                    {todo.description}
                  </div>

                  {/* Status & Arrow (Kanan) */}
                  <div className="w-1/4 flex justify-end items-center gap-3">
                    <div
                      className={`px-4 py-1 rounded-full text-xs font-bold border border-black/20 text-black ${
                        todo.completed ? "bg-[#4ADE80]" : "bg-[#DC2626]"
                      }`}
                    >
                      Status : {todo.completed ? "Done" : "Not Done"}
                    </div>
                    {/* Arrow Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="w-6 h-6 text-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Form New Todo */
            <div className="max-w-xl mx-auto mt-10">
              <AddTodoForm
                onSuccess={() => {
                  fetchTodos(); // Fetch akan otomatis menaruh item baru (Not Done)
                  setView("LIST");
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* MODAL DETAIL (Gambar 2 & 3) */}
      {selectedTodo && (
        <TodoModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </main>
  );
}