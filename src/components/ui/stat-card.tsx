import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: React.ReactNode | string; // can be ReactNode OR SVG string path
  title: string;
  value: string | number;
  percentageChange?: string;
  changeColor?: "green" | "red" | "gray";
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  percentageChange,
  changeColor = "gray",
}) => {
  const renderIcon = () => {
    if (typeof icon === "string") {
      // If it's a string, assume it's an SVG path
      return <img src={icon} alt={title} className="w-12 h-12" />;
    }
    return icon; // Otherwise render as ReactNode
  };

  return (
    <div className="flex flex-col justify-between rounded-xl bg-white shadow-sm p-5 w-full">
      {/* Icon + Value + Change */}
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div>{renderIcon()}</div>

        {/* Value + Percentage */}
        <div className="flex-1 flex items-baseline gap-2 mt-1">
          <h4 className="text-3xl font-semibold leading-tight">{value}</h4>
          {percentageChange && (
            <span
              className={cn(
                "text-md font-medium ml-2",
                changeColor === "green" && "text-green-600",
                changeColor === "red" && "text-red-600",
                changeColor === "gray" && "text-gray-500"
              )}
            >
              {percentageChange}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <p className="mt-6 text-xl text-gray-600">{title}</p>
    </div>
  );
};

export default StatCard;
