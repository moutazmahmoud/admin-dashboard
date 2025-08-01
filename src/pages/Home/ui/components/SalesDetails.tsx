import React, { useRef, useState, useMemo, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  Scale,
  CoreScaleOptions,
  ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { salesDataByMonth } from "@/lib/MockData";
import CustomSelect from "@/components/CustomSelect";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
);

console.log("Sales data by month:", salesDataByMonth);

const months = Object.keys(salesDataByMonth);
const CHART_BORDER_COLOR = "#3b82f6";
const GRADIENT_FROM1 = "#99d6f9ff";
// const GRADIENT_FROM2 = "rgba(2, 98, 252, 0.3)";
const GRADIENT_TO = "white";

const SalesDetails: React.FC = () => {
  const chartRef = useRef<ChartJS<"line"> | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("January");
  const delayedRef = useRef(false);
  const [isChartReady, setIsChartReady] = useState(false);

  // Extract days and sales based on selected month
  const { days, sales } = useMemo(() => {
    const sales = salesDataByMonth[selectedMonth];
    const days = sales.map((_, i) => `${i + 1}`);
    return { days, sales };
  }, [selectedMonth]);

  // Detect when canvas is available

  // Prepare chart data (with fallback and gradient)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      if (chartRef.current?.ctx && !isChartReady) {
        setIsChartReady(true);
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [isChartReady]);

  const data: ChartData<"line"> = useMemo(() => {
    const ctx = chartRef.current?.ctx;

    let gradient: string | CanvasGradient = "rgba(2, 98, 252, 0.2)";
    if (ctx) {
      gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, GRADIENT_FROM1);
      // gradient.addColorStop(0.8, GRADIENT_FROM2);
      gradient.addColorStop(1, GRADIENT_TO);
    }

    return {
      labels: days,
      datasets: [
        {
          label: "Sales ($)",
          data: sales,
          borderColor: CHART_BORDER_COLOR,
          backgroundColor: gradient,
          fill: true,
          tension: 0.2,
          pointRadius: 5,
          pointBackgroundColor: CHART_BORDER_COLOR,
          pointHitRadius: 10,
          pointHoverRadius: 10,
        },
      ],
    };
  }, [sales, days, isChartReady]);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      onComplete: () => {
        delayedRef.current = true;
      },
      delay: (context: ScriptableContext<"line">) => {
        let delay = 0;
        if (
          context.type === "data" &&
          context.mode === "default" &&
          !delayedRef.current
        ) {
          delay = context.dataIndex * 80 + context.datasetIndex * 80;
        }
        return delay;
      },
    },
    plugins: {
      legend: { position: "top" as const },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (
            this: Scale<CoreScaleOptions>,
            tickValue: string | number,
          ): string {
            const num =
              typeof tickValue === "number" ? tickValue : parseFloat(tickValue);
            return `$${num}`;
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Day of Month",
        },
      },
    },
  };

  return (
    <div className="w-full rounded-xl bg-white p-2 shadow-md">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Sales Details</h3>
        <CustomSelect
          options={months.map((month) => ({ label: month, value: month }))}
          value={selectedMonth}
          onChange={setSelectedMonth}
          placeholder="Select a month"
        />
      </div>
      {/* Always render the chart, it updates automatically when canvas is ready */}
      <div className="h-[350px] w-full">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesDetails;
