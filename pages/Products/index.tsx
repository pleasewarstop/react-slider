"use client";

import { Header } from "@/components/Header";
import { Content } from "@/components/Content";
import { Footer } from "@/components/Footer";
import { Product } from "@/api/products";
import s from "./styles.module.scss";
import { useState } from "react";
import { ScaleContainer } from "../../components/ScaleContainer";

const SMALL_HEADER_AFTER_SCROLL_PX = 40;

interface Props {
  products: Product[];
}
export const Products = ({ products }: Props) => {
  const [headerSmall, setHeaderSmall] = useState(false);

  return (
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
  );
};
