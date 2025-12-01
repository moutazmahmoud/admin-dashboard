import React from "react";

interface Props {
  filter: "today" | "week" | "month" | "year";
  setFilter: (f: "today" | "week" | "month" | "year") => void;
}

const DateFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const options = [
    { id: "today", label: "Today" },
    { id: "week", label: "Last 7 Days" },
    { id: "month", label: "Last 30 Days" },
    { id: "year", label: "This Year" },
  ];

  return (
    <div className="flex gap-2 items-center">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setFilter(opt.id as any)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition ${filter === opt.id ? 'bg-black text-white' : 'bg-white border'} `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

export default DateFilter;