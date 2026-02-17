"use client";

import {
  scaleContext,
  useScaleProvider,
} from "@/components/ScaleContainer/useScale";

export const ScaleProvider = ({
  children,
  maxWidth,
}: Readonly<{
  children: React.ReactNode;
  maxWidth: number;
}>) => {
  const scale = useScaleProvider(maxWidth);
  return (
    <scaleContext.Provider value={scale}>{children}</scaleContext.Provider>
  );
};
