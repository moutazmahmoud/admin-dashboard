import InfoCard from "./InfoCard";
import usersIcon from "../../../../assets/icons/users-icon.svg";
import ordersIcon from "../../../../assets/icons/orders-icon.svg";
import SalesIcon from "../../../../assets/icons/sales-icon.svg";
import PendingIcon from "../../../../assets/icons/pending-icon.svg";

const cardData = [
  {
    title: "Total Users",
    stats: 12500,
    imageUrl: usersIcon,
    change: {
      percent: 8.5,
      direction: "up",
      note: "from yesterday",
    },
  },
  {
    title: "Visitors",
    stats: 2800,
    imageUrl: ordersIcon,
    change: {
      percent: 3.2,
      direction: "down",
      note: "since last week",
    },
  },
  {
    title: "Orders",
    stats: 320,
    imageUrl: SalesIcon,
    change: {
      percent: 6.7,
      direction: "up",
      note: "this month",
    },
  },
  {
    title: "Revenue",
    stats: 27300,
    statsPerfix: "$",
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
