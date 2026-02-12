import { ReactComponent as LogoIcon } from "@/app/assets/icons/logo.svg";
import { ReactComponent as MenuIcon } from "@/app/assets/icons/menu.svg";
import { ReactComponent as CancelIcon } from "@/app/assets/icons/menu.svg";
import s from "./styles.module.scss";
import Link from "next/link";
import cn from "classnames";
import { useEffect, useState } from "react";
import { ScaleContainer } from "../ScaleContainer";
import { useIsScaleInitialized } from "../ScaleContainer/useScale";
import { useIsScreenLess } from "../../hooks/useIsScreenLess";

const MOBILE_PX = 700;

interface Props {
  small: boolean;
}
export const Header = ({ small }: Props) => {
  const [opened, setOpened] = useState(false);
  const MenuIconComponent = opened ? CancelIcon : MenuIcon;
  const initialized = useIsScaleInitialized();
  const isMobile = useIsScreenLess(MOBILE_PX + 1);
  useEffect(() => {
    if (!isMobile && opened) setOpened(false);
  }, [isMobile, opened]);
  return (
    <>
      <header
        className={cn(s.container, {
          [s.small]: small,
          [s.opened]: opened,
          [s.initialized]: initialized,
        })}
      >
        <ScaleContainer className={s.content}>
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
        </ScaleContainer>
      </header>
      <ScaleContainer className={s.height} />
    </>
  );
};
