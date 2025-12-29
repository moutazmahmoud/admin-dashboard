const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function generateLineData(range: string) {
  if (range === "today") {
    return {
      labels: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"],
      datasets: [
        {
          label: "Sales",
          data: [
            rand(20, 80),
            rand(30, 120),
            rand(10, 60),
            rand(40, 150),
            rand(20, 120),
            rand(10, 180),
            rand(30, 200),
          ],
          borderColor: "rgba(72, 128, 255, 1)",
          backgroundColor: "rgba(72, 128, 255, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }

  if (range === "week") {
    return {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Sales",
          data: Array.from({ length: 7 }, () => rand(200, 900)),
          borderColor: "rgba(72, 128, 255, 1)",
          backgroundColor: "rgba(72, 128, 255, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }

  // month or year fallback
  const days = range === "month" ? 30 : 12;
  return {
    labels: Array.from({ length: days }, (_, i) =>
      range === "month" ? `${i + 1}` : `${i + 1}`,
    ),
    datasets: [
      {
        label: "Sales",
        data: Array.from({ length: days }, () => rand(200, 1400)),
        borderColor: "rgba(72, 128, 255, 1)",
        backgroundColor: "rgba(72, 128, 255, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };
}

export function generateBarData(range: string, topProducts = false) {
  const categories = ["Coffee", "Tea", "Dessert", "Drinks", "Snacks"];
  if (topProducts) {
    return {
      labels: [
        "Iphone 14",
        "Iphone 14 Pro",
        "MacBook Pro",
        "MacBook Air",
        "iPad Pro",
      ],
      datasets: [
        {
          data: Array.from({ length: 5 }, () => rand(80, 450)),
          backgroundColor: [
            "#3b82f6",
            "#f97316",
            "#10b981",
            "#a78bfa",
            "#fb7185",
          ],
        },
      ],
    };
  }

  return {
    labels: categories,
    datasets: [
      {
        data: categories.map(() =>
          range === "today" ? rand(10, 80) : rand(200, 1200),
        ),
        backgroundColor: [
          "#3b82f6",
          "#f97316",
          "#10b981",
          "#a78bfa",
          "#fb7185",
        ],
      },
    ],
  };
}

export function generateDoughnutData(range: string) {
  const baseCompleted = range === "today" ? 60 : range === "week" ? 420 : 1800;
  return {
    labels: ["Completed", "In Progress", "Cancelled", "Refunded"],
    datasets: [
      {
        data: [
          baseCompleted,
          Math.floor(baseCompleted * 0.2),
          Math.floor(baseCompleted * 0.05),
          Math.floor(baseCompleted * 0.02),
        ],
        backgroundColor: ["#4880FF", "#facc15", "#ef4444", "#64748b"],
      },
    ],
  };
}

export function generateKPIs(range: string) {
  const totalRevenue =
    range === "today"
      ? rand(300, 1200)
      : range === "week"
      ? rand(3000, 12000)
      : rand(15000, 80000);
  const totalSales = Math.floor(totalRevenue * 8);
  const totalOrders = Math.floor(totalRevenue / rand(10, 30));
  const aov = Math.round(totalRevenue / Math.max(1, totalOrders));

  return {
    totalRevenue,
    todaysRevenue: totalSales,
    totalOrders,
    aov,
    revenueGrowth: `+${rand(2, 18)}%`,
    todaysTrend: `+${rand(1, 12)}%`,
    ordersTrend: `+${rand(1, 14)}%`,
    aovTrend: `+${rand(1, 8)}%`,
    sparkline: {
      "Total Revenue": Array.from({ length: 8 }, () => rand(100, 900)),
      "Today Revenue": Array.from({ length: 8 }, () => rand(10, 400)),
      "Total Orders": Array.from({ length: 8 }, () => rand(5, 70)),
      "Avg. Order Value": Array.from({ length: 8 }, () => rand(5, 70)),
    },
  };
}
