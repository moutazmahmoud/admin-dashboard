import { mockDeals } from "@/lib/MockData";
import { Deal } from "@/types/Deal";
import React from "react";

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

const DealsTable: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto rounded-[0.875rem] bg-white p-2 shadow">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Deals Table</h3>
      </div>
      <table className="min-w-full text-left text-sm text-gray-700">
        <thead className="ru bg-[#F1F4F9] text-xs uppercase text-gray-500">
          <tr>
            <th className="rounded-bl-1 rounded-tl-1 px-3 py-1">
              Product Name
            </th>
            <th className="px-3 py-1 text-center">Location</th>
            <th className="px-3 py-1 text-center">Date-Time</th>
            <th className="px-3 py-1 text-center">Pieces</th>
            <th className="px-3 py-1 text-center">Amount</th>
            <th className="rounded-br-1 rounded-tr-1 px-3 py-1 text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {mockDeals.map((deal, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50 rounded-1">
              <td className="pl-3 py-1 rounded-tl-1 rounded-bl-1">
                <div className="flex items-center">
                  <img
                    className="h-[2.25rem] w-[2.25rem]"
                    src={deal.productImageUrl}
                    alt={deal.productName}
                  />
                  <span className="ml-1 text-sm font-medium">
                    {deal.productName}
                  </span>
                </div>
              </td>
              <td className="px-3 py-1 text-center">{deal.location}</td>
              <td className="px-3 py-1 text-center">{deal.dateTime}</td>
              <td className="px-3 py-1 text-center">{deal.pieces}</td>
              <td className="px-3 py-1 text-center">
                ${deal.amount.toLocaleString()}
              </td>
              <td className="px-3 py-1 text-center rounded-tr-1 rounded-br-1">
                <span
                  className={`rounded-full px-1 py-[0.25rem] text-xs font-medium ${getStatusColor(
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
};

export default DealsTable;
