
import React from 'react';
import { Star, Award, Trophy, TrendingUp } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface StatisticsCardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  icon?: "star" | "award" | "trophy" | "trending-up";
  progress?: number;
  variant?: "default" | "outline";
  badgeText?: string;
  onClick?: () => void;
  isInteractive?: boolean;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  progress,
  variant = "default",
  badgeText,
  onClick,
  isInteractive = false,
}) => {
  const getIcon = () => {
    switch (icon) {
      case "star":
        return <Star className="h-5 w-5 text-sa-yellow" />;
      case "award":
        return <Award className="h-5 w-5 text-sa-blue" />;
      case "trophy":
        return <Trophy className="h-5 w-5 text-sa-green" />;
      case "trending-up":
        return <TrendingUp className="h-5 w-5 text-sa-green" />;
      default:
        return null;
    }
  };

  const cardClasses = `rounded-lg p-4 ${
    variant === "outline" 
      ? "border border-gray-200" 
      : "bg-white shadow-sm"
  } ${
    isInteractive 
      ? "cursor-pointer transition-all hover:shadow-md hover:scale-105 active:scale-95" 
      : ""
  }`;

  return (
    <div 
      className={cardClasses}
      onClick={isInteractive ? onClick : undefined}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-sa-gray text-sm">{title}</h3>
        {icon && (
          <div className="p-1.5 bg-gray-50 rounded-full">
            {getIcon()}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold text-sa-blue animate-fade-in">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-sa-gray mt-1">{subtitle}</p>
          )}
        </div>
        {badgeText && (
          <Badge 
            variant="default" 
            className={`
              ${badgeText === "Excellent" ? "bg-sa-green" : 
                badgeText === "Good" ? "bg-sa-yellow text-sa-blue" : 
                "bg-red-500"} 
              text-white animate-fade-in
            `}
          >
            {badgeText}
          </Badge>
        )}
      </div>

      {progress !== undefined && (
        <div className="mt-4">
          <Progress 
            value={progress} 
            className="h-1.5 bg-gray-100"
          />
          <p className="text-xs text-sa-gray mt-1 text-right">{progress}% complete</p>
        </div>
      )}
    </div>
  );
};

export default StatisticsCard;
