"use client";

import { Product } from "../../api/products";
import { useMounted } from "../../hooks/useMounted";
import { Slider } from "../Slider";
import s from "./styles.module.scss";
import cn from "classnames";

interface Props {
  items: Product[];
}
export const Content = ({ items }: Props) => {
  const mounted = useMounted();
  return (
    <main className={cn(s.container, { [s.mounted]: mounted })}>
      <h2 className={s.title}>Weekly - Top NFT</h2>
      <Slider items={items} />
    </main>
  );
};
