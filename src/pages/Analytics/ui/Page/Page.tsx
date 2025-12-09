import React, { useMemo, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import KPICards from "../components/KPICards";
import DateFilter from "../components/DateFilter";
import ExportButtons from "../components/ExportButtons";
import ChartWrapper from "../components/ChartWrapper";

import {
  generateLineData,
  generateBarData,
  generateDoughnutData,
  generateKPIs,
} from "../../data/analyticsData";
import PageWrapper from "@/components/PageWrapper";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

const Analytics: React.FC = () => {
  const [filter, setFilter] = useState<"today" | "week" | "month" | "year">(
    "week",
  );

  // generate mock data based on filter
  const lineData = useMemo(() => generateLineData(filter), [filter]);
  const barData = useMemo(() => generateBarData(filter), [filter]);
  const doughnutData = useMemo(() => generateDoughnutData(filter), [filter]);
  const kpis = useMemo(() => generateKPIs(filter), [filter]);

  return (
    <PageWrapper>
      <div className="min-h-screen space-y-6 user-select-none cursor-default">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <DateFilter filter={filter} setFilter={setFilter} />
            <ExportButtons
              kpis={kpis}
              line={lineData}
              bar={barData}
              doughnut={doughnutData}
            />
          </div>
        </div>

        <KPICards kpis={kpis} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          <ChartWrapper title="Sales Over Time">
            <Line
              data={lineData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </ChartWrapper>

          <ChartWrapper title="Sales by Category">
            <Bar
              data={barData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </ChartWrapper>

          <ChartWrapper title="Order Status Distribution">
            <Doughnut
              data={doughnutData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          </ChartWrapper>

          <ChartWrapper title="Revenue Forecast" className="xl:col-span-2">
            <Line
              data={generateLineData(filter)}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </ChartWrapper>

          <ChartWrapper title="Top Selling Products" className="xl:col-span-1">
            <Bar
              data={generateBarData(filter, true)}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </ChartWrapper>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="col-span-2 rounded-xl bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Smart Insights</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                • Peak sales hour is <strong>7 PM</strong> — consider extending
                promotions.
              </li>
              <li>
                • Latte sales increased by <strong>12%</strong> vs last week.
              </li>
              <li>
                • Cancellation rate rose by <strong>+6%</strong> today.
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-white p-4 shadow">
            <h3 className="mb-2 font-semibold">Top Items</h3>
            <ol className="list-inside list-decimal space-y-1 text-sm text-gray-700">
              <li>Iced Latte — 320 sold</li>
              <li>Caramel Latte — 285 sold</li>
              <li>Espresso — 210 sold</li>
            </ol>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Analytics;
