import React from "react";
import CountUp from "react-countup";
import { ShoppingCart, DollarSign, Users } from "lucide-react";

interface KPIProps {
  // filter: "today" | "week" | "month" | "year";
  kpis: Record<string, any>;
}

const KPICards: React.FC<KPIProps> = ({  kpis }) => {
  const items = [
    { label: "Total Revenue", value: kpis.totalRevenue, icon: DollarSign, trend: kpis.revenueGrowth },
    { label: "Total Sales", value: kpis.todaysRevenue, icon: DollarSign, trend: kpis.todaysTrend },
    { label: "Total Orders", value: kpis.totalOrders, icon: ShoppingCart, trend: kpis.ordersTrend },
    { label: "Avg. Order Value", value: kpis.aov, icon: Users, trend: kpis.aovTrend },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {items.map((it) => {
        const Icon = it.icon as any;
        return (
          <div key={it.label} className="bg-white/70 backdrop-blur p-4 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-gray-500">{it.label}</div>
                <div className="text-2xl font-bold mt-2">{typeof it.value === 'number' ? <CountUp end={it.value} separator="," /> : it.value}</div>
                <div className="text-sm text-green-600 mt-1">{it.trend}</div>
              </div>
              <div className="p-2 bg-white rounded-lg">
                <Icon className="w-6 h-6 text-gray-700" />
              </div>
            </div>
            {/* <div className="mt-3 h-8"><Sparkline values={kpis.sparkline[it.label] || []} /></div> */}
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;
