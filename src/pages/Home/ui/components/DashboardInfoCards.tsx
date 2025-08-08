import InfoCard from "./InfoCard";
import usersIcon from "../../../../assets/icons/users-icon.svg";
import ordersIcon from "../../../../assets/icons/orders-icon.svg";
import SalesIcon from "../../../../assets/icons/sales-icon.svg";
import PendingIcon from "../../../../assets/icons/pending-icon.svg";

const cardData = [
  {
    title: "Total Users",
    description: "12,500",
    imageUrl: usersIcon,
    change: {
      percent: 8.5,
      direction: "up",
      note: "from yesterday",
    },
  },
  {
    title: "Visitors",
    description: "2,800",
    imageUrl: ordersIcon,
    change: {
      percent: 3.2,
      direction: "down",
      note: "since last week",
    },
  },
  {
    title: "Orders",
    description: "320",
    imageUrl: SalesIcon,
    change: {
      percent: 6.7,
      direction: "up",
      note: "this month",
    },
  },
  {
    title: "Revenue",
    description: "$27,300",
    imageUrl: PendingIcon,
    change: {
      percent: 2.1,
      direction: "down",
      note: "this week",
    },
  },
] as const;

const DashboardCards = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card) => (
        <InfoCard key={card.title} {...card} />
      ))}
    </div>
  );
};

export default DashboardCards;
