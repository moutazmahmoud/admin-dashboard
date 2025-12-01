import React from "react";

export const Sparkline: React.FC<{ values?: number[] }> = ({ values = [] }) => {
  // minimal sparkline using SVG
  const max = Math.max(...values, 1);
  const points = values.map((v, i) => `${(i / (values.length - 1 || 1)) * 100},${100 - (v / max) * 100}`).join(" ");
  return (
    <svg width="100%" height="32" viewBox="0 0 100 32" preserveAspectRatio="none">
      <polyline fill="none" stroke="#3b82f6" strokeWidth="1.5" points={points} />
    </svg>
  );
};
export default Sparkline;