import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { animate, linear } from "../animate";
import { useResizeObserver } from "@/app/hooks/useResizeObserver";
import { useScale } from "../../ScaleContainer/useScale";

interface State {
  center: number;
  transformX: null | number;
  isMoving: boolean;
  isAnimation: boolean;
}

type StopAnimation = () => void;

type Setter = (st: State) => State;

const START_MOVING_PX = 10;

export const useSlider = (contentRef: RefObject<HTMLDivElement | null>) => {
  const [state, set] = useState<State>({
    center: 0,
    transformX: null,
    isMoving: false,
    isAnimation: false,
  });
  const stateRef = useRef(state);
  const setState = useCallback((setter: State | Setter) => {
    if (typeof setter !== "function") {
      stateRef.current = setter;
      return set(setter);
    }
    stateRef.current = setter(stateRef.current);
    set(stateRef.current);
  }, []);

  const startXRef = useRef<null | number>(null);
  const startCenterIRef = useRef<null | number>(null);
  const baseTransformXRef = useRef<null | number>(null);
  const movingStartedRef = useRef(false);
  const scale = useScale();

  useEffect(() => {
    setState((state) => ({
      ...state,
      transformX: -contentRef.current!.getBoundingClientRect().width / 2,
    }));
  }, [contentRef, setState]);

  function onPointerDown<T extends { button: number; clientX: number }>(e: T) {
    if (!contentRef.current) throw new Error("never");
    if (prevProgressRef.current !== 1 || e.button === 2) return;

    startXRef.current = e.clientX;
    startCenterIRef.current = getDomCenterI();
    baseTransformXRef.current = state.transformX;
    document.documentElement.addEventListener("pointermove", onPointerMove);
    document.documentElement.addEventListener("pointerup", stopListenMoving);
  }

  function onPointerMove(e: PointerEvent) {
    if (!contentRef.current) throw new Error("never");
    if (startXRef.current === null) throw new Error("never");
    if (baseTransformXRef.current === null) throw new Error("never");

    const baseTransformX = baseTransformXRef.current;
    const diff = e.clientX - startXRef.current;
    movingStartedRef.current =
      movingStartedRef.current || Math.abs(diff) > START_MOVING_PX;
    if (!movingStartedRef.current) return;

    setState((state) => ({
      ...state,
      isMoving: true,
      transformX: baseTransformX + diff / scale,
    }));
  }

  function stopListenMoving() {
    document.documentElement.removeEventListener("pointermove", onPointerMove);
    document.documentElement.removeEventListener("pointerup", stopListenMoving);

    startXRef.current = null;
    movingStartedRef.current = false;
    setState((state) => {
      if (state.transformX === null) throw new Error("never");
      if (startCenterIRef.current === null) throw new Error("never");
      const newCenter = getDomCenterI();
      return {
        ...state,
        isMoving: false,
        center: state.center + (newCenter - startCenterIRef.current),
        transformX:
          state.transformX +
          ((newCenter - startCenterIRef.current) * getItemWidthPlusGap()) /
            scale,
      };
    });
  }

  const debtPxRef = useRef(0);
  const prevProgressRef = useRef(1);
  const startTransformXRef = useRef(0);
  const stopAnimationRef = useRef<null | StopAnimation>(null);
  const prevScrolledCountRef = useRef<null | number>(null);
  function scroll(scrolledCount: number) {
    if (!contentRef.current) throw new Error("never");

    startTransformXRef.current = stateRef.current.transformX ?? 0;

    const itemWidthPlusGap = getItemWidthPlusGap();
    if (prevProgressRef.current !== 1) {
      if (prevScrolledCountRef.current === null) throw new Error("never");

      stopAnimationRef.current?.();
      debtPxRef.current =
        (1 - prevProgressRef.current) *
        (debtPxRef.current +
          Math.abs(prevScrolledCountRef.current) * itemWidthPlusGap);
    } else {
      debtPxRef.current = 0;
      prevScrolledCountRef.current = null;
    }

    const directionChanged =
      prevScrolledCountRef.current !== null &&
      ((prevScrolledCountRef.current > 0 && scrolledCount < 0) ||
        (prevScrolledCountRef.current < 0 && scrolledCount > 0));
    if (directionChanged) {
      debtPxRef.current = 0;
      prevScrolledCountRef.current = null;
      return stopAnimationRef.current?.();
    }
    prevScrolledCountRef.current = scrolledCount;

    let movedItemsCount = 0;

    stopAnimationRef.current = animate({
      duration: 300,
      timing: linear,
      draw: (progress) => {
        prevProgressRef.current = progress;
        const progressPx =
          progress *
          (debtPxRef.current + Math.abs(scrolledCount) * itemWidthPlusGap);

        const prevPxToItem = debtPxRef.current % itemWidthPlusGap;
        let currentMovedItemsCount = Math.floor(
          (progressPx - prevPxToItem) / itemWidthPlusGap,
        );
        if (prevPxToItem) currentMovedItemsCount += 1;

        const isNewElement = currentMovedItemsCount > movedItemsCount;
        if (isNewElement) movedItemsCount++;

        const correctedProgress =
          progressPx - movedItemsCount * itemWidthPlusGap;

        const side = scrolledCount > 0 ? 1 : -1;
        setState((state) => ({
          ...state,
          isAnimation: progress !== 1,
          center: isNewElement ? state.center + side : state.center,
          transformX:
            startTransformXRef.current - (side * correctedProgress) / scale,
        }));
      },
    });
  }

  function getItemWidthPlusGap() {
    if (!contentRef.current) throw new Error("never");
    const firstChildRect =
      contentRef.current.firstElementChild?.getBoundingClientRect();
    const secondChildRect =
      contentRef.current.firstElementChild?.nextElementSibling?.getBoundingClientRect();

    const itemWidth = firstChildRect?.width || 0;
    const gap =
      (secondChildRect?.left || 0) - (firstChildRect?.left || 0) - itemWidth;
    return itemWidth + gap;
  }

  function getDomCenterI() {
    if (!contentRef.current) throw new Error("never");
    if (stateRef.current.transformX === null) throw new Error("never");

    const firstChildRect =
      contentRef.current.firstElementChild?.getBoundingClientRect();
    const secondChildRect =
      contentRef.current.firstElementChild?.nextElementSibling?.getBoundingClientRect();

    const itemWidth = firstChildRect?.width || 0;
    const gap =
      (secondChildRect?.left || 0) - (firstChildRect?.left || 0) - itemWidth;

    for (let i = 0; i < contentRef.current.children.length; i++) {
      const child = contentRef.current.children[i];
      if (!(child instanceof HTMLElement)) continue;
      if (
        child.offsetLeft - gap / 2 < -stateRef.current.transformX &&
        child.offsetLeft + itemWidth + gap / 2 > -stateRef.current.transformX
      ) {
        return i;
      }
    }
    return -1;
  }

  const prevWidthRef = useRef<null | number>(null);
  useResizeObserver(contentRef, ({ contentRect }) => {
    if (
      prevWidthRef.current === null ||
      !(prevWidthRef.current - contentRect.width)
    ) {
      prevWidthRef.current = contentRect.width;
    } else {
      const diff = (prevWidthRef.current - contentRect.width) / 2;
      setState({
        ...stateRef.current,
        transformX: (stateRef.current.transformX ?? 0) + diff,
      });
      prevWidthRef.current = contentRect.width;
    }
  });

  return { state, scroll, onPointerDown };
};
