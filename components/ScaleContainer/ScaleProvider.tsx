"use client";

import {
  scaleContext,
  useScaleProvider,
} from "@/components/ScaleContainer/useScale";

interface Props {
  children: React.ReactNode;
  maxWidth: number;
}
export function ScaleProvider({ children, maxWidth }: Props) {
  const scale = useScaleProvider(maxWidth);
  return (
    <scaleContext.Provider value={scale}>{children}</scaleContext.Provider>
  );
}
