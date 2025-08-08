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
    <div className="w-full overflow-x-auto rounded-[0.875rem] bg-white p-8 shadow">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Deals Table</h3>
      </div>
      <table className="min-w-full text-left text-sm text-gray-700">
        <thead className="bg-[#F1F4F9] text-xs uppercase text-gray-500">
          <tr>
            <th className="rounded-bl-2xl rounded-tl-2xl px-12 py-4">
              Product Name
            </th>
            <th className="px-12 py-4 text-center">Location</th>
            <th className="px-12 py-4 text-center">Date-Time</th>
            <th className="px-12 py-4 text-center">Pieces</th>
            <th className="px-12 py-4 text-center">Amount</th>
            <th className="rounded-br-2xl rounded-tr-2xl px-12 py-4 text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {mockDeals.map((deal, idx) => (
            <tr key={idx} className="rounded-2xl border-b hover:bg-gray-50">
              <td className="rounded-bl-2xl rounded-tl-2xl py-4 pl-12">
                <div className="flex items-center">
                  <div className="relative h-10 w-10">
                    <img
                      className="object-cover"
                      src={deal.productImageUrl}
                      alt={deal.productName}
                    />
                  </div>
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
};

export default DealsTable;
