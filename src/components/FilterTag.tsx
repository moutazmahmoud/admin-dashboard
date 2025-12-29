type FilterTagProps = {
  label: string;
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
};

export default function FilterTag({
  label,
  value,
  selected,
  onSelect,
}: FilterTagProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`
        rounded-full px-4 py-1.5 text-sm font-medium transition
        ${
          selected
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }
      `}
    >
      {label}
    </button>
  );
}
