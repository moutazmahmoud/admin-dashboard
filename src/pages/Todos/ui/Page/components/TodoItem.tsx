import { useState } from "react";
import type { Todo } from "@/types/todo";

type Props = {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void | Promise<void>;
  onRemove: (id: string) => void | Promise<void>;
  onUpdateText: (id: string, text: string) => void | Promise<void>;
};

export default function TodoItem({ todo, onToggle, onRemove, onUpdateText }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(todo.text);

  async function save() {
    if (value.trim() !== todo.text) {
      await onUpdateText(todo.id, value);
    }
    setEditing(false);
  }

  return (
    <li className="flex items-center gap-3 rounded border p-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => onToggle(todo.id, e.target.checked)}
      />
      {!editing ? (
        <span
          onDoubleClick={() => setEditing(true)}
          className={todo.completed ? "line-through text-gray-400" : ""}
        >
          {todo.text}
        </span>
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => e.key === "Enter" && save()}
          autoFocus
          className="border px-1"
        />
      )}
      <button onClick={() => onRemove(todo.id)} className="ml-auto text-red-500">
        Delete
      </button>
    </li>
  );
}
