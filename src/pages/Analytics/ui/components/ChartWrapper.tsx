import React from "react";

const ChartWrapper: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white/70 backdrop-blur p-5 rounded-2xl shadow border ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="text-sm text-gray-500">Last update: Today</div>
      </div>
      <div className="h-72">{children}</div>
    </div>
  );
};

export default ChartWrapper;