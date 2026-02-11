"use client";

import { ReactComponent as LogoIcon } from "@/app/assets/icons/logo.svg";
import { ReactComponent as MenuIcon } from "@/app/assets/icons/menu.svg";
import { ReactComponent as CancelIcon } from "@/app/assets/icons/menu.svg";
import s from "./styles.module.scss";
import Link from "next/link";
import cn from "classnames";
import { useState } from "react";
import { useMounted } from "../../hooks/useMounted";

interface Props {
  small: boolean;
}
export const Header = ({ small }: Props) => {
  const [opened, setOpened] = useState(false);
  const MenuIconComponent = opened ? CancelIcon : MenuIcon;
  const mounted = useMounted();
  return (
    <>
      <header
        className={cn(s.container, {
          [s.small]: small,
          [s.opened]: opened,
          [s.mounted]: mounted,
        })}
      >
        <div className={s.content}>
          <div className={s.logo}>
            <LogoIcon className={s.logoIcon} />
            <span className={s.logoText}>DiveSea</span>
          </div>
          <MenuIconComponent
            className={s.menuIcon}
            onClick={() => setOpened(!opened)}
          />
          <nav className={s.nav}>
            <Link className={s.navItem} href="#">
              DISCOVER
            </Link>
            <Link className={s.navItem} href="#">
              CREATORS
            </Link>
            <Link className={s.navItem} href="#">
              SELL
            </Link>
            <Link className={s.navItem} href="#">
              STATS
            </Link>
          </nav>
        </div>
      </header>
      <div className={s.height} />
    </>
  );
};
