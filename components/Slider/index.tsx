"use client";

import { ReactNode, useRef } from "react";
import cn from "classnames";
import { useScreenMaxWidth } from "@/hooks/useScreenMaxWidth";
import { SliderButtons } from "./Buttons";
import { useSlider } from "./hooks/useSlider";
import { useItemsToRender } from "./hooks/useItemsToRender";
import s from "./styles.module.scss";

const RENDERED_ITEMS_COUNT = 21;

export interface SliderItemProps<T extends { id: string }> {
  item: T;
  isMoving: boolean;
  key: string;
}

interface Props<T extends { id: string }> {
  items: T[];
  renderItem: (props: SliderItemProps<T>) => ReactNode;
}
export function Slider<T extends { id: string }>({
  items,
  renderItem,
}: Props<T>) {
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
            return renderItem({ item, isMoving: state.isMoving, key });
          })}
        </div>
      </div>
      <SliderButtons
        prev={() => scroll(-itemsToScroll)}
        next={() => scroll(itemsToScroll)}
      />
    </div>
  );
}
