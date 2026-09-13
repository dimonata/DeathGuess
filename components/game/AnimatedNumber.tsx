"use client";

import { useEffect, useState } from "react";
import { formatNumber } from "@/lib/format";

type AnimatedNumberProps = {
  value: number;
  duration?: number;
};

export function AnimatedNumber({ value, duration = 1000 }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timeout = window.setTimeout(() => setDisplay(value), 0);
      return () => window.clearTimeout(timeout);
    }

    const startedAt = performance.now();
    let frame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration, value]);

  return <>{formatNumber(display)}</>;
}
