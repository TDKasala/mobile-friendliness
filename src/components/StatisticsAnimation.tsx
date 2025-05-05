
import React, { useState, useEffect, useRef } from 'react';

interface StatisticsAnimationProps {
  value: number | string;
  suffix?: string;
  label: string;
  duration?: number;
  delay?: number;
}

const StatisticsAnimation: React.FC<StatisticsAnimationProps> = ({ 
  value, 
  suffix = '', 
  label,
  duration = 2000,
  delay = 0
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
          const progress = elapsedTime / duration;
          // Use easeOutExpo for a more natural animation
          const easeOutProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(easeOutProgress * valueAsNumber);
          setAnimatedValue(currentValue);
          requestAnimationFrame(animate);
        } else {
          setAnimatedValue(valueAsNumber);
          hasAnimated.current = true;
        }
      };
      
      if (typeof value === 'number') {
        requestAnimationFrame(animate);
      }
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [value, duration, delay, valueAsNumber]);

  return (
    <div className="flex flex-col items-center sm:items-start">
      <span 
        ref={valueRef} 
        className="text-xl sm:text-2xl md:text-3xl font-bold text-sa-blue dark:text-sa-yellow"
      >
        {typeof value === 'number' ? animatedValue : value}{suffix}
      </span>
      <span className="text-xs sm:text-sm text-sa-gray dark:text-gray-300 text-center sm:text-left">
        {label}
      </span>
    </div>
  );
};

export default StatisticsAnimation;
