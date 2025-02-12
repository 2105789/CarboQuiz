import React, { useEffect, useRef, useState } from 'react';

interface AnalogCounterProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

export const AnalogCounter: React.FC<AnalogCounterProps> = ({ 
  value, 
  duration = 2000,
  className = "",
  suffix = ""
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTime = useRef<number>();
  const startValue = useRef(0);

  useEffect(() => {
    startTime.current = Date.now();
    startValue.current = displayValue;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - (startTime.current || now);
      const progress = Math.min(elapsed / duration, 1);

      // Enhanced easing function for more dramatic effect
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = startValue.current + (value - startValue.current) * eased;

      setDisplayValue(Math.round(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <div className={`font-mono text-4xl tabular-nums ${className}`}>
      {displayValue.toLocaleString()}{suffix}
    </div>
  );
};