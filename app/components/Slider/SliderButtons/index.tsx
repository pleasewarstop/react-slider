import { MouseEventHandler } from "react";
import { ReactComponent as ArrowLeft } from "@/app/assets/icons/arrow-left.svg";
import { ReactComponent as ArrowRight } from "@/app/assets/icons/arrow-right.svg";
import s from "./styles.module.scss";

interface Props {
  prev: MouseEventHandler;
  next: MouseEventHandler;
}
export const SliderButtons = ({ prev, next }: Props) => {
  return (
    <div className={s.container}>
      <button onClick={prev} className={s.left}>
        <ArrowLeft className={s.icon} />
      </button>
      <button onClick={next} className={s.right}>
        <ArrowRight className={s.icon} />
      </button>
    </div>
  );
};
