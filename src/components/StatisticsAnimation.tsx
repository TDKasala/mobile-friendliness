
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
          const progress = elapsedTime / duration;
          // Use easeOutExpo for a more natural animation
          const easeOutProgress = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(easeOutProgress * valueAsNumber);
          setAnimatedValue(currentValue);
          requestAnimationFrame(animate);
        } else {
          setAnimatedValue(valueAsNumber);
          hasAnimated.current = true;
          
          // Add a subtle bounce animation to the text when it finishes
          if (valueRef.current) {
            valueRef.current.classList.add('animate-bounce');
            setTimeout(() => {
              if (valueRef.current) {
                valueRef.current.classList.remove('animate-bounce');
              }
            }, 1000);
          }
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
        className={`font-bold ${highlightColor} transition-all hover:scale-110 hover:text-sa-blue dark:hover:text-white ${
          isLarge 
            ? "text-4xl sm:text-5xl md:text-6xl" 
            : "text-xl sm:text-2xl md:text-3xl"
        }`}
      >
        {typeof value === 'number' ? animatedValue : value}{suffix}
      </span>
      <span className={`text-sa-gray dark:text-gray-300 text-center sm:text-left ${
        isLarge ? "text-sm sm:text-base" : "text-xs sm:text-sm"
      }`}>
        {label}
      </span>
    </div>
  );
};

export default StatisticsAnimation;
