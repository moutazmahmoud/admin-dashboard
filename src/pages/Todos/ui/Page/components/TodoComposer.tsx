import { useState } from "react";

type Props = {
  onAdd: (text: string) => Promise<void> | void;
  disabled?: boolean;
};

export default function TodoComposer({ onAdd, disabled }: Props) {
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || pending || disabled) return;
    setPending(true);
    try {
      await onAdd(text);
      setText("");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        placeholder="Add new todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled || pending}
      />
      <button
        type="submit"
        disabled={disabled || pending}
        className="rounded bg-blue-500 px-4 py-2 text-white disabled:opacity-50"
      >
        {pending ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
