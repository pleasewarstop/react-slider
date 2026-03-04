import { ReactNode } from "react";
import s from "./styles.module.scss";

export interface Props {
  children: ReactNode;
}
export function UIError({ children }: Props) {
  return <div className={s.container}>{children}</div>;
}
