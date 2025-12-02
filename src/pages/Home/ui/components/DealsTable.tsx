import { mockDeals } from "@/lib/MockData";
import { Deal } from "@/types/Deal";
import { MoveDown, MoveUp, MoveVertical } from "lucide-react";
import React, { useState } from "react";

const getStatusColor = (status: Deal["status"]) => {
  switch (status) {
    case "Delivered":
      return "bg-success text-white";
    case "Pending":
      return "bg-warning text-white";
    case "Cancelled":
      return "bg-danger text-white";
    default:
      return "";
  }
};

type SortOrder = "none" | "asc" | "desc";

export default function DealsTable() {
  const [sortColumn, setSortColumn] = useState<keyof Deal | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  const handleSort = (column: keyof Deal) => {
    if (sortColumn !== column) {
      setSortColumn(column);
      setSortOrder("asc");
    } else {
      setSortOrder((prev) =>
        prev === "none" ? "asc" : prev === "asc" ? "desc" : "none",
      );
    }
  };

  const renderSortIcon = (column: keyof Deal) => {
    if (sortColumn !== column || sortOrder === "none") {
      return <span className="ml-1"><MoveVertical className="w-[0.8rem] h-[0.8rem] text-black" /></span>;
    }
    if (sortOrder === "asc") return <span className="ml-1"><MoveUp className="w-[0.8rem] h-[0.8rem] text-black" /></span>;
    if (sortOrder === "desc") return <span className="ml-1"><MoveDown className="w-[0.8rem] h-[0.8rem] text-black" /></span>;
  };

  // تطبيق الترتيب
  const sortedDeals = [...mockDeals].sort((a, b) => {
    if (!sortColumn || sortOrder === "none") return 0;

    const valA = a[sortColumn];
    const valB = b[sortColumn];

    // لو values أرقام
    if (typeof valA === "number" && typeof valB === "number") {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    // لو نصوص
    return sortOrder === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  return (
    <div className="w-full overflow-x-auto rounded-[0.8rem] bg-white p-8 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Deals Table</h3>
      </div>

      <table className="min-w-full text-left text-sm text-gray-700">
        <thead className="bg-[#F1F4F9] text-xs uppercase text-gray-500">
          <tr>
            <SortableTH
              onClick={() => handleSort("productName")}
              label="Product Name"
              icon={renderSortIcon("productName")}
              leftRounded
            />
            <SortableTH
              onClick={() => handleSort("location")}
              label="Location"
              icon={renderSortIcon("location")}
            />
            <SortableTH
              onClick={() => handleSort("dateTime")}
              label="Date-Time"
              icon={renderSortIcon("dateTime")}
            />
            <SortableTH
              onClick={() => handleSort("pieces")}
              label="Pieces"
              icon={renderSortIcon("pieces")}
            />
            <SortableTH
              onClick={() => handleSort("amount")}
              label="Amount"
              icon={renderSortIcon("amount")}
            />
            <SortableTH label="Status" rightRounded />
          </tr>
        </thead>

        <tbody>
          {sortedDeals.map((deal, idx) => (
            <tr key={idx} className="rounded-2xl border-b hover:border-transparent hover:bg-gray-50">
              <td className="rounded-bl-2xl rounded-tl-2xl py-4 pl-12">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 object-cover"
                    src={deal.productImageUrl}
                    alt={deal.productName}
                  />
                  <span className="ml-4 text-sm font-medium">
                    {deal.productName}
                  </span>
                </div>
              </td>

              <td className="px-12 py-4 text-center">{deal.location}</td>
              <td className="px-12 py-4 text-center">{deal.dateTime}</td>
              <td className="px-12 py-4 text-center">{deal.pieces}</td>
              <td className="px-12 py-4 text-center">
                ${deal.amount.toLocaleString()}
              </td>

              <td className="rounded-br-2xl rounded-tr-2xl px-12 py-4 text-center">
                <span
                  className={`rounded-full px-4 py-1 text-xs font-medium ${getStatusColor(
                    deal.status,
                  )}`}
                >
                  {deal.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const SortableTH = ({
  label,
  onClick,
  icon,
  leftRounded = false,
  rightRounded = false,
}: {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  leftRounded?: boolean;
  rightRounded?: boolean;
}) => (
  <th
    className={`cursor-pointer select-none px-12 py-4 text-center ${
      leftRounded ? "rounded-bl-2xl rounded-tl-2xl" : ""
    } ${rightRounded ? "rounded-br-2xl rounded-tr-2xl" : ""}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-center">
      {label}
      {icon}
    </div>
  </th>
);
