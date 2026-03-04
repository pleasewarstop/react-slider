import { useEffect, useRef, PointerEvent as ReactPointerEvent } from "react";
import s from "./styles.module.scss";

export interface Props {
  isMoving: boolean;
  onPointerUp: (e: ReactPointerEvent<HTMLButtonElement>) => void;
}
export function SliderProductButton({ isMoving, onPointerUp }: Props) {
  const expectedClickRef = useRef(false);
  const preventClickRef = useRef(false);

  useEffect(() => {
    if (expectedClickRef.current && isMoving) {
      preventClickRef.current = true;

      const onPointerUp = (e: PointerEvent) => {
        if (
          e.target instanceof HTMLElement &&
          !e.target?.classList.contains(s.button)
        ) {
          preventClickRef.current = false;
        }
        expectedClickRef.current = false;
        document.documentElement.removeEventListener("pointerup", onPointerUp);
      };
      document.documentElement.addEventListener("pointerup", onPointerUp);
    }
  }, [isMoving]);

  return (
    <button
      className={s.button}
      onPointerDown={() => (expectedClickRef.current = true)}
      onPointerUp={(e) => {
        if (preventClickRef.current) {
          preventClickRef.current = false;
          return;
        }
        onPointerUp(e);
      }}
    >
      PLACE BID
    </button>
  );
}
