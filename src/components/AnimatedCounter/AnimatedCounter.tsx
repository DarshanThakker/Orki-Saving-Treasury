"use client";
import React, { useState, useEffect, useRef } from "react";
import NumberFlow from "@number-flow/react";
import styles from "./AnimatedCounter.module.css";

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  onComplete?: () => void;
  format?: {
    notation?: "standard" | "compact";
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  };
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  targetValue,
  duration = 2000,
  delay = 0,
  suffix = "",
  prefix = "",
  className = "",
  onComplete,
  format,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const hasCompletedRef = useRef(false);

  // Determine decimal places from target value
  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (!str.includes(".")) return 0;
    return str.split(".")[1].length;
  };

  const decimalPlaces = getDecimalPlaces(targetValue);

  // Round to specific decimal places
  const roundToDecimalPlaces = (num: number, places: number): number => {
    const multiplier = Math.pow(10, places);
    return Math.round(num * multiplier) / multiplier;
  };

  // Intersection Observer to detect when component is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "-20px",
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  // Animate counter when visible
  useEffect(() => {
    if (!isVisible) return;

    hasCompletedRef.current = false;
    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime - delay;

      if (elapsed < 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const newValue = startValue + (targetValue - startValue) * easedProgress;

      // Round to the same decimal places as target value
      const roundedValue = roundToDecimalPlaces(newValue, decimalPlaces);
      setCurrentValue(roundedValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final value matches target exactly
        setCurrentValue(targetValue);
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onComplete?.();
        }
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, targetValue, duration, delay, onComplete, decimalPlaces]);

  // Merge format with automatic decimal places if not explicitly set
  const mergedFormat = {
    notation: format?.notation || ("standard" as const),
    minimumFractionDigits: format?.minimumFractionDigits ?? decimalPlaces,
    maximumFractionDigits: format?.maximumFractionDigits ?? decimalPlaces,
  };

  return (
    <div ref={counterRef} className={`${styles.animatedCounter} ${className}`}>
      <NumberFlow
        value={currentValue}
        format={mergedFormat}
        prefix={prefix}
        suffix={suffix}
        animated={true}
        style={{
          fontFamily: "inherit",
          fontSize: "inherit",
          fontWeight: "inherit",
          color: "inherit",
        }}
      />
    </div>
  );
};

export default AnimatedCounter;
