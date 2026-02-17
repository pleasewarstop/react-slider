import { useState, useEffect } from "react";

export function useScreenMaxWidth(px: number): boolean {
  const [isLessOrEqual, setIsLessOrEqual] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= px;
  });

  useEffect(() => {
    const handler = () => {
      setIsLessOrEqual(window.innerWidth <= px);
    };
    handler();

    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [px]);

  return isLessOrEqual;
}
