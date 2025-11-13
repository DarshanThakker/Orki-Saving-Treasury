"use client";

import React, { useEffect, useRef, useState } from "react";

type FadeInOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  duration?: number; // in seconds
  delay?: number; // in seconds
  threshold?: number; // 0 to 1
  rootMargin?: string; // e.g., "0px 0px -100px 0px"
  translate?: number;
};

const FadeInOnScroll = ({
  children,
  className = "",
  duration = 0.65,
  delay = 0,
  threshold = 0.1,
  rootMargin = "0px",
  translate = 60,
}: FadeInOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node); // stop observing after animation
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : `translateY(${translate}px)`,
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;
