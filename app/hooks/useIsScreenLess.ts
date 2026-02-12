import { useState, useEffect } from "react";

export function useIsScreenLess(px: number): boolean {
  const [isLess, setIsLess] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= px;
  });

  useEffect(() => {
    const handler = () => {
      setIsLess(window.innerWidth <= px);
    };
    handler();

    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [px]);

  return isLess;
}
