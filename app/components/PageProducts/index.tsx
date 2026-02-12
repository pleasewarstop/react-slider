"use client";

import { Header } from "@/app/components/Header";
import { Content } from "@/app/components/Content";
import { Footer } from "@/app/components/Footer";
import { Product } from "@/app/api/products";
import s from "./styles.module.scss";
import { useState } from "react";
import { scaleContext, useScaleProvider } from "../ScaleContainer/useScale";
import { ScaleContainer } from "../ScaleContainer";

const SMALL_HEADER_AFTER_SCROLL_PX = 40;
const MAX_WIDTH = 1920;

interface Props {
  products: Product[];
}
export const PageProducts = ({ products }: Props) => {
  const [headerSmall, setHeaderSmall] = useState(false);
  const scale = useScaleProvider(MAX_WIDTH);

  return (
    <scaleContext.Provider value={scale}>
      <div
        className={s.container}
        onScroll={(e) => {
          if (e.currentTarget.scrollTop >= SMALL_HEADER_AFTER_SCROLL_PX) {
            if (!headerSmall) setHeaderSmall(true);
          } else if (headerSmall) setHeaderSmall(false);
        }}
      >
        <Header small={headerSmall} />
        <ScaleContainer className={s.scale}>
          <div className={s.stretch} />
          <Content items={products} />
          <Footer />
        </ScaleContainer>
      </div>
    </scaleContext.Provider>
  );
};
