"use client";

import { useRef } from "react";
import { SliderItem } from "./SliderItem";
import { SliderButtons } from "./SliderButtons";
import { Product } from "../../api/products";
import s from "./styles.module.scss";
import { useSlider } from "./hooks/useSlider";
import { useItemsToRender } from "./hooks/useItemsToRender";
import { useScreenMaxWidth } from "@/hooks/useScreenMaxWidth";
import cn from "classnames";

const RENDERED_ITEMS_COUNT = 21;

interface Props {
  items: Product[];
}
export const Slider = ({ items }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { state, scroll, onPointerDown } = useSlider(contentRef);
  const itemsToRender = useItemsToRender(
    items,
    state.center,
    RENDERED_ITEMS_COUNT,
  );
  const itemsToScroll = useScreenMaxWidth(550) ? 1 : 2;
  const busyKeys: Record<string, boolean> = {};

  return (
    <div className={s.container}>
      <div className={s.slider}>
        <div
          className={cn(s.sliderContent, {
            [s.isAnimation]: state.isAnimation,
          })}
          ref={contentRef}
          style={
            state.transformX !== null
              ? {
                  transform: `translateX(${state.transformX}px)`,
                }
              : undefined
          }
          onPointerDown={onPointerDown}
        >
          {itemsToRender.map((item, i) => {
            let key = item.id;
            if (busyKeys[key]) key += i;
            busyKeys[key] = true;
            return (
              <SliderItem item={item} isMoving={state.isMoving} key={key} />
            );
          })}
        </div>
      </div>
      <SliderButtons
        prev={() => scroll(-itemsToScroll)}
        next={() => scroll(itemsToScroll)}
      />
    </div>
  );
};
