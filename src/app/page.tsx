"use client";

import { useEffect, useState } from "react";

type Note = {
  id: string | number;
  title?: string;
  description?: string;
};

function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [all, setAll] = useState<Note[]>([]);
  const [saving, setSaving] = useState(false);

  async function Allnotes() {
    const res = await fetch("/api/notes");
    const json = await res.json();
    setAll(json.data);
  }

  useEffect(() => {
    Allnotes();
  }, []);

  async function createNote() {
    if (!title.trim() || !description.trim()) return;

    setSaving(true);
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    await Allnotes(); 
    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-[#0f0f11] px-6 py-12 text-neutral-100 md:py-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Notes
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            {all.length === 0
              ? "Nothing here yet"
              : `${all.length} ${all.length === 1 ? "note" : "notes"}`}
          </p>
        </header>

        {/* Form */}
        <section className="mb-14 border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full border-b border-white/10 bg-transparent pb-3 text-lg outline-none placeholder:text-neutral-600 focus:border-white/40"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write something..."
            rows={4}
            className="mt-4 w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none placeholder:text-neutral-600"
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={createNote}
              disabled={saving || !title.trim() || !description.trim()}
              className="bg-white px-6 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {saving ? "Saving..." : "Add note"}
            </button>
          </div>
        </section>

        {/* Notes list */}
        {all.length === 0 ? (
          <p className="text-center text-sm text-neutral-600">
            Add your first note above.
          </p>
        ) : (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {all.map((note) => (
              <article
                key={note.id}
                className="border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/30"
              >
                <h2 className="text-base font-medium">{note.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {note.description}
                </p>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

export default Home;