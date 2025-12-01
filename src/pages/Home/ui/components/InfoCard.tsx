import UpIcon from "../../../../assets/icons/trending-up.svg?react";
import DownIcon from "../../../../assets/icons/trending-down.svg?react";
import CountUp from "react-countup";

type InfoCardProps = {
  title: string;
  stats: number;
  statsPerfix?: string;
  imageUrl: string;
  change?: {
    percent: number;
    direction: "up" | "down";
    note?: string;
  };
};

const InfoCard = ({
  title,
  stats,
  change,
  imageUrl,
  statsPerfix,
}: InfoCardProps) => {
  const isUp = change?.direction === "up";

  return (
    <div className="card relative w-full bg-base-100 p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:scale-[1.02]">
      <div className="flex flex-col">
        <div>
          <div className="mb-4 font-semibold text-text/70">{title}</div>

          <div className="text-[1.75rem] font-bold">
            {statsPerfix}
            {typeof stats === "number" ? (
              <CountUp end={stats} separator="," />
            ) : (
              stats
            )}
          </div>
        </div>
        {change && (
          <div className="text-muted mt-8 flex items-center text-[1rem] font-semibold text-text/70">
            {isUp ? (
              <UpIcon className="h-6 w-6 " />
            ) : (
              <DownIcon className="h-6 w-6" />
            )}
            <span className={`ml-2 ${isUp ? "text-success" : "text-danger"}`}>
              {change.percent}%
            </span>
            {change.note && <span className="ml-[2px]"> {change.note}</span>}
          </div>
        )}
      </div>
      <div className="h-15 w-15 absolute right-4 top-4 rounded-3xl">
        <img className="h-full w-full" src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default InfoCard;
