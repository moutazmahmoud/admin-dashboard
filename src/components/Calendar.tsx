import { useState } from "react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getMonthDays(year, month);

  return (
    <div className="w-full max-w-md rounded-2xl bg-white">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() =>
            setCurrentDate(new Date(year, month - 1, 1))
          }
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          ←
        </button>

        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          onClick={() =>
            setCurrentDate(new Date(year, month + 1, 1))
          }
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          →
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 text-center text-sm text-gray-500">
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="mt-2 grid grid-cols-7 gap-1">
        {days.map((date, i) => (
          <div
            key={i}
            className={`flex h-10 items-center justify-center rounded-lg text-sm
              ${!date ? "invisible" : "cursor-pointer hover:bg-blue-50"}
              ${
                date?.toDateString() === new Date().toDateString()
                  ? "bg-blue-500 text-white"
                  : ""
              }`}
          >
            {date?.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
}


const getMonthDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days = [];
  const startOffset = firstDay.getDay(); // 0 = Sunday

  // Previous month filler
  for (let i = 0; i < startOffset; i++) {
    days.push(null);
  }

  // Current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  return days;
};