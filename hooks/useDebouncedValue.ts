"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a debounced value after the provided delay.
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, [delay, value]);

  return debouncedValue;
}
