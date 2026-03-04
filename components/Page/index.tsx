"use client";

import { ReactNode } from "react";
import cn from "classnames";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScaleContainer } from "@/components/ScaleContainer";
import s from "./styles.module.scss";
import { useIsScaleInitialized } from "@/components/ScaleContainer/useScale";

interface Props {
  children: ReactNode;
}
export function Page({ children }: Props) {
  const initialized = useIsScaleInitialized();

  return (
    <div className={s.container}>
      <Header />
      <ScaleContainer className={cn(s.scale, { [s.initialized]: initialized })}>
        {children}
        <Footer />
      </ScaleContainer>
    </div>
  );
}
