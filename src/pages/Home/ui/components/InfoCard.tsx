import UpIcon from "../../../../assets/icons/trending-up.svg?react";
import DownIcon from "../../../../assets/icons/trending-down.svg?react";

type InfoCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  change?: {
    percent: number;
    direction: "up" | "down";
    note?: string;
  };
};

const InfoCard = ({ title, description, change, imageUrl }: InfoCardProps) => {
  const isUp = change?.direction === "up";

  return (
    <div className="card relative w-full bg-base-100 p-1 shadow-xl">
      <div className="flex flex-col">
        <div>
          <div className="mb-1 text-text/70 font-semibold">{title}</div>
          <div className="text-[1.75rem] font-bold">{description}</div>
        </div>
        {change && (
          <div className="text-muted mt-2 flex items-center text-[1rem] font-semibold text-text/70">
            {isUp ? (
              <UpIcon className="h-1.5 w-1.5" />
            ) : (
              <DownIcon className="h-1.5 w-1.5" />
            )}
            <span
              className={`ml-0.5 ${isUp ? "text-success" : "text-danger"}`}
            >
              {change.percent}%
            </span>
            {change.note && (
              <span className="ml-[2px]"> {change.note}</span>
            )}
          </div>
        )}
      </div>
      <div className="absolute right-1 top-1 h-[3.75rem] w-[3.75rem] rounded-[1.5rem]">
        <img className="h-full w-full" src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default InfoCard;
