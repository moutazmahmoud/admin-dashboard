import React from "react";
import { Download } from "lucide-react";
import { exportToCSV, exportToPDF } from "../../../../utils/exportUtils";

const ExportButtons: React.FC<any> = ({ kpis, line, bar, doughnut }) => {
  return (
    <div className="flex gap-3">
      <button
        onClick={() => exportToCSV({ kpis, line, bar, doughnut })}
        className="px-3 py-2 rounded-lg bg-white border hover:bg-gray-50 flex items-center gap-2"
      >
        <Download className="w-4 h-4" /> Export CSV
      </button>

      <button
        onClick={() => exportToPDF({ kpis, line, bar, doughnut })}
        className="px-3 py-2 rounded-lg bg-black text-white hover:bg-gray-900 flex items-center gap-2"
      >
        <Download className="w-4 h-4" /> Export PDF
      </button>
    </div>
  );
};

export default ExportButtons;