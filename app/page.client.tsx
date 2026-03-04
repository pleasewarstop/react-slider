"use client";

import { Product } from "@/api/products";
import { Page } from "@/components/Page";
import { Slider } from "@/components/Slider";
import { SliderProduct } from "@/components/SliderProduct";
import { UIError } from "@/components/UIError";
import s from "./styles.module.scss";

interface Props {
  products: Product[];
  productsError?: string;
}
export function HomeClient({ products, productsError }: Props) {
  return (
    <Page>
      <main className={s.container}>
        <h1>Weekly - Top NFT</h1>
        {productsError ? (
          <UIError>{productsError}</UIError>
        ) : (
          <Slider
            items={products}
            renderItem={(props) => <SliderProduct {...props} key={props.key} />}
          />
        )}
      </main>
    </Page>
  );
}
