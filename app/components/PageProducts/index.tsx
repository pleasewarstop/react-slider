"use client";

import { Header } from "@/app/components/Header";
import { Content } from "@/app/components/Content";
import { Footer } from "@/app/components/Footer";
import { Product } from "@/app/api/products";
import s from "./styles.module.scss";
import { useRef, useState } from "react";
import { mountedContext, useMountedProvider } from "../../hooks/useMounted";

const SMALL_HEADER_AFTER_SCROLL_PX = 40;

interface Props {
  products: Product[];
}
export const PageProducts = ({ products }: Props) => {
  const [headerSmall, setHeaderSmall] = useState(false);
  const containerRef = useRef(null);
  const mounted = useMountedProvider();
  return (
    <mountedContext.Provider value={mounted}>
      <div
        className={s.container}
        onScroll={(e) => {
          if (e.currentTarget.scrollTop >= SMALL_HEADER_AFTER_SCROLL_PX) {
            if (!headerSmall) setHeaderSmall(true);
          } else if (headerSmall) setHeaderSmall(false);
        }}
        ref={containerRef}
      >
        <Header small={headerSmall} />
        <Content items={products} />
        <Footer />
      </div>
    </mountedContext.Provider>
  );
};
