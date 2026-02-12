import { useRef, ReactNode } from "react";
import { useScale } from "./useScale";
import s from "./styles.module.scss";
import cn from "classnames";

interface Props {
  children?: ReactNode;
  className?: string;
}
export const ScaleContainer = ({ children, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useScale();
  // eslint-disable-next-line react-hooks/refs
  const addedHeight = (ref.current?.scrollHeight || 0) * (scale - 1);
  return (
    <div
      className={cn(s.container, className)}
      ref={ref}
      style={
        scale === 1
          ? undefined
          : {
              transform: `scale(${scale})`,
              transformOrigin: "top center",
              marginBottom: addedHeight,
            }
      }
    >
      {children}
    </div>
  );
};
