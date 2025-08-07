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
  ChartTypeRegistry,
  Chart,
  ChartOptions,
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
const GRADIENT_FROM = "rgba(67, 121, 238, 0.36)";
const GRADIENT_TO = "rgba(255, 255, 255, 0.1769)";

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

    let gradient: string | CanvasGradient = GRADIENT_FROM;
    if (ctx) {
      const height = ctx.canvas.clientHeight || ctx.canvas.height;
      console.log(height);

      gradient = ctx.createLinearGradient(0, 0, 0, 350);
      gradient.addColorStop(0, GRADIENT_FROM);
      gradient.addColorStop(1, GRADIENT_TO);
    }

    return {
      labels: days,
      datasets: [
        {
          label: "Sales",
          data: sales,
          borderColor: CHART_BORDER_COLOR,
          borderWidth: 2,
          backgroundColor: gradient,
          fill: true,
          tension: 0.1,
          pointRadius: 3,
          pointBackgroundColor: CHART_BORDER_COLOR,
          pointHitRadius: 8,
          pointHoverRadius: 8,
        },
      ],
    };
  }, [sales, days, isChartReady]);

  // Chart options
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      onComplete: () => {
        delayedRef.current = true;
      },
      delay: (context: ScriptableContext<"line">) => {
        let delay = 0;
        // if (
        //   context.type === "data" &&
        //   context.mode === "default" &&
        //   !delayedRef.current
        // ) {
        //   // delay = context.dataIndex * 90 + context.datasetIndex * 80;
        // }
        delay = context.dataIndex * 40 + context.datasetIndex * 60;
        return delay;
      },
    },
    plugins: {
      legend: { display: false },
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

            if (num === 0) {
              return `$${num}`;
            }
            return `$${num / 1000}k`;
          },
        },
      },
      x: {
        title: {
          display: false,
        },
        grid: {
          display: false, // This removes vertical grid lines
        },
      },
    },
  };

  return (
    <div className="sales-details w-full rounded-xl bg-white p-2 pb-3 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Sales Details</h3>
        <CustomSelect
          options={months.map((month) => ({ label: month, value: month }))}
          value={selectedMonth}
          onChange={setSelectedMonth}
          placeholder="Select a month"
        />
      </div>
      {/* Always render the chart, it updates automatically when canvas is ready */}
      <div className="relative h-[350px] w-full">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesDetails;
