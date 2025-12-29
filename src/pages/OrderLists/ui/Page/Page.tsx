import Calendar from "@/components/Calendar";
import FilterTag from "@/components/FilterTag";
import { ChevronDown, Funnel, RotateCcw } from "lucide-react";
import React, { useState, useMemo, useEffect, RefObject, useRef } from "react";

type Order = {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
  type: string;
};

// Mock data
const mockOrders: Order[] = Array.from({ length: 55 }).map((_, i) => ({
  id: `#ORD-${1000 + i}`,
  customer: `Customer ${i + 1}`,
  amount: Math.round(Math.random() * 2000),
  status: i % 2 === 0 ? "Completed" : "Pending",
  type: i % 3 === 0 ? "Delivery" : "Pickup",
  date: `2025-01-${String((i % 30) + 1).padStart(2, "0")}`,
}));

const OrdersList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const popupRef = useRef<HTMLDivElement>(null);

  const [sortBy, setSortBy] = useState<keyof Order>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [filterModal, setFilterModal] = useState<
    "date" | "type" | "status" | "none"
  >("none");

  // NEW FILTERS
  const [filters, setFilters] = useState({
    date: "",
    type: "",
    status: "",
  });

  // Reset Filters
  const resetFilters = () => {
    setFilters({
      date: "",
      type: "",
      status: "",
    });
  };

  useClickOutside(popupRef, filterModal, () => setFilterModal("none"));

  // Sorting handler
  const handleSort = (col: keyof Order) => {
    if (sortBy === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
  };

  // Apply filters + sorting + pagination
  const filteredOrders = useMemo(() => {
    let data = [...mockOrders];

    // FILTER BY DATE
    if (filters.date) data = data.filter((o) => o.date === filters.date);

    // FILTER BY TYPE
    if (filters.type) data = data.filter((o) => o.type === filters.type);

    // FILTER BY STATUS
    if (filters.status) data = data.filter((o) => o.status === filters.status);

    // SORTING
    data.sort((a, b) => {
      const v1 = a[sortBy];
      const v2 = b[sortBy];

      if (typeof v1 === "number" && typeof v2 === "number") {
        return sortDir === "asc" ? v1 - v2 : v2 - v1;
      }

      return sortDir === "asc"
        ? String(v1).localeCompare(String(v2))
        : String(v2).localeCompare(String(v1));
    });

    return data;
  }, [filters, sortBy, sortDir]);

  // Pagination
  const paginated = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  const totalPages = Math.ceil(filteredOrders.length / pageSize);

  const chevronDown = (isOpen: boolean) => {
    return (
      <ChevronDown
        className={`h-4 w-4 transition-transform duration-150 ease-in-out ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    );
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Orders</h2>

      {/* 🔍 FILTER BAR */}
      <div className="relative mb-6 flex rounded-lg border-[1px] border-solid border-[#D5D5D5] bg-[#F9F9FB] font-semibold">
        {filterModal !== "none" && (
          <div
            className="absolute left-1/2 top-full z-20 -mt-1 min-w-28 -translate-x-1/2 rounded-lg border bg-white p-4 shadow-lg"
            ref={popupRef}
          >
            {filterModal === "date" && <Calendar />}
            {filterModal === "type" && (
              <div className="">
                <h2 className="text-lg font-bold">Select Order Type</h2>
                <div className="flex gap-2 mt-6">
                  <FilterTag
                    label="All"
                    value=""
                    selected={filters.type === ""}
                    onSelect={(value) =>
                      setFilters({ ...filters, type: value })
                    }
                  />
                  <FilterTag
                    label="Delivery"
                    value="Delivery"
                    selected={filters.type === "Delivery"}
                    onSelect={(value) =>
                      setFilters({ ...filters, type: value })
                    }
                  />
                  <FilterTag
                    label="Pickup"
                    value="Pickup"
                    selected={filters.type === "Pickup"}
                    onSelect={(value) =>
                      setFilters({ ...filters, type: value })
                    }
                  />
                </div>
              </div>
            )}

            {filterModal === "status" && (
              <div className="flex gap-2">
                <FilterTag
                  label="All"
                  value=""
                  selected={filters.type === ""}
                  onSelect={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                />

                <FilterTag
                  label="Completed"
                  value="Completed"
                  selected={filters.type === "Completed"}
                  onSelect={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                />

                <FilterTag
                  label="Pending"
                  value="Pending"
                  selected={filters.type === "Pending"}
                  onSelect={(value) =>
                    setFilters({ ...filters, status: value })
                  }
                />
              </div>
            )}
          </div>
        )}
        <div className="flex items-center px-6 py-4 font-semibold">
          <Funnel className="mr-2 h-4 w-4" />
          Filter By
        </div>
        {/* Filter by Date */}
        <span
          className="flex flex-1 cursor-pointer select-none items-center justify-between border-l-[1px] border-solid border-[#D5D5D5] p-4"
          onClick={(e) => {
            e.stopPropagation();
            filterModal === "date"
              ? setFilterModal("none")
              : setFilterModal("date");
          }}
        >
          {/* DATE FILTER */}
          {filters.date && <span className="mr-2">{filters.date}</span>}
          {!filters.date && <span className="mr-2">Date</span>}
          {chevronDown(filterModal === "date")}
        </span>
        {/* Order Type */}
        <button
          className="flex flex-1 select-none items-center justify-between border-l-[1px] border-solid border-[#D5D5D5] p-4"
          onClick={(e) => {
            e.stopPropagation();

            filterModal === "type"
              ? setFilterModal("none")
              : setFilterModal("type");
          }}
        >
          Order Type {chevronDown(filterModal === "type")}
        </button>
        {/* Order Status */}
        <button
          className="flex flex-1 select-none items-center justify-between border-l-[1px] border-solid border-[#D5D5D5] p-4"
          onClick={(e) => {
            e.stopPropagation();
            filterModal === "status"
              ? setFilterModal("none")
              : setFilterModal("status");
          }}
        >
          Order Status {chevronDown(filterModal === "status")}
        </button>
        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="flex-1 rounded border-l-[1px] border-solid border-[#D5D5D5] p-4 text-red-500 hover:bg-gray-200"
        >
          <RotateCcw className="inline-block h-4 w-4" /> Reset Filter
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-auto rounded-lg border bg-white/40">
        <table className="w-full text-left">
          <thead className="bg-[#FCFDFD]">
            <tr>
              {[
                { key: "id", label: "Order ID" },
                { key: "customer", label: "Customer" },
                { key: "amount", label: "Amount" },
                { key: "type", label: "Type" },
                { key: "status", label: "Status" },
                { key: "date", label: "Date" },
              ].map((col) => (
                <th
                  key={col.key}
                  className="cursor-pointer select-none p-3"
                  onClick={() => handleSort(col.key as keyof Order)}
                >
                  {col.label}
                  {sortBy === col.key && (
                    <span className="ml-1 text-sm">
                      {sortDir === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginated.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">${order.amount}</td>
                <td className="p-3">{order.type}</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="mt-4 flex items-center justify-between">
        <button
          disabled={page === 1}
          className="rounded border px-3 py-1 disabled:opacity-50"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          className="rounded border px-3 py-1 disabled:opacity-50"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrdersList;

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  filterModal: string,
  onClose: () => void,
) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current) return;
      if (ref.current.contains(e.target as Node)) return;
      if (filterModal === "none") return;
      onClose();
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ref, onClose, filterModal]);
}
