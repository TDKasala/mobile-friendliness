
import React, { useState, useEffect, useRef } from 'react';
interface StatisticsAnimationProps {
  value: number | string;
  suffix?: string;
  label: string;
  duration?: number;
  delay?: number;
  highlightColor?: string;
  isLarge?: boolean;
}
const StatisticsAnimation: React.FC<StatisticsAnimationProps> = ({
  value,
  suffix = '',
  label,
  duration = 2000,
  delay = 0,
  highlightColor = "text-sa-yellow",
  isLarge = false
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const valueAsNumber = typeof value === 'number' ? value : 0;
  const valueRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    // Wait for the specified delay before starting animation
    const delayTimer = setTimeout(() => {
      if (hasAnimated.current) return;
      const startTime = Date.now();
      const animate = () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          // Use easeOutCubic for a more elegant animation
          const progress = elapsedTime / duration;
          const easeOutProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(easeOutProgress * valueAsNumber);
          setAnimatedValue(currentValue);
          requestAnimationFrame(animate);
        } else {
          setAnimatedValue(valueAsNumber);
          hasAnimated.current = true;

          // Add a subtle scale animation to highlight completion
          if (valueRef.current) {
            valueRef.current.classList.add('animate-pulse-once');
            setTimeout(() => {
              if (valueRef.current) {
                valueRef.current.classList.remove('animate-pulse-once');
              }
            }, 600);
          }
        }
      };
      if (typeof value === 'number') {
        requestAnimationFrame(animate);
      }
    }, delay);
    return () => clearTimeout(delayTimer);
  }, [value, duration, delay, valueAsNumber]);
  
  // Determine dynamic color based on value
  const getStatColor = () => {
    const colors = [
      "text-sa-blue dark:text-sa-yellow", // Default
      "text-sa-green dark:text-sa-green", // Green
      "text-[#0EA5E9] dark:text-[#38BDF8]", // Blue
      "text-[#F97316] dark:text-[#FB923C]"  // Orange
    ];
    
    // Generate a stable color based on the value
    const index = typeof value === 'number' 
      ? Math.floor(value) % colors.length 
      : String(value).length % colors.length;
    
    return highlightColor === "text-sa-yellow" ? colors[index] : highlightColor;
  };

  return (
    <div className="flex flex-col items-center sm:items-start">
      <span 
        ref={valueRef} 
        className={`${getStatColor()} font-bold ${isLarge ? "text-2xl sm:text-3xl md:text-4xl" : "text-xl sm:text-2xl"} transition-all`}
      >
        {typeof value === 'number' ? animatedValue : value}{suffix}
      </span>
      <span className={`text-sa-gray dark:text-gray-300 text-center sm:text-left ${isLarge ? "text-sm sm:text-base" : "text-xs sm:text-sm"}`}>
        {label}
      </span>
    </div>
  );
};
export default StatisticsAnimation;
