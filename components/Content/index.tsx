"use client";

import { useRef } from "react";
import { Product } from "../../api/products";
import { Slider } from "../Slider";
import s from "./styles.module.scss";
import cn from "classnames";
import { useIsScaleInitialized } from "../ScaleContainer/useScale";

interface Props {
  items: Product[];
}
export const Content = ({ items }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useIsScaleInitialized();
  return (
    <main
      className={cn(s.container, { [s.initialized]: initialized })}
      ref={containerRef}
    >
      <h2 className={s.title}>Weekly - Top NFT</h2>
      <Slider items={items} />
    </main>
  );
};
