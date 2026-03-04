import { useEffect, useEffectEvent, useLayoutEffect, useState } from "react";
import Link from "next/link";
import cn from "classnames";
import { ScaleContainer } from "@/components/ScaleContainer";
import { useIsScaleInitialized } from "@/components/ScaleContainer/useScale";
import { useScreenMaxWidth } from "@/hooks/useScreenMaxWidth";
import { ReactComponent as LogoIcon } from "@/assets/icons/logo.svg";
import { ReactComponent as MenuIcon } from "@/assets/icons/menu.svg";
import { ReactComponent as CancelIcon } from "@/assets/icons/menu.svg";
import s from "./styles.module.scss";

const MOBILE_PX = 700;
const SMALL_HEADER_AFTER_SCROLL_PX = 40;

interface Props {}
export function Header({}: Props) {
  const [opened, setOpened] = useState(false);
  const MenuIconComponent = opened ? CancelIcon : MenuIcon;
  const initialized = useIsScaleInitialized();
  const isMobile = useScreenMaxWidth(MOBILE_PX);
  useEffect(() => {
    if (!isMobile && opened) setOpened(false);
  }, [isMobile, opened]);

  const [small, setSmall] = useState(false);

  const onScroll = useEffectEvent(() => {
    if (document.documentElement.scrollTop >= SMALL_HEADER_AFTER_SCROLL_PX) {
      if (!small) setSmall(true);
    } else if (small) setSmall(false);
  });

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = (
    <>
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
    </>
  );
  return (
    <>
      <ScaleContainer
        className={cn(s.container, {
          [s.small]: small,
          [s.opened]: opened,
          [s.initialized]: initialized,
        })}
        origin="left top"
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
          <nav className={s.nav}>{navItems}</nav>
        </div>
        {opened && <nav className={cn(s.nav, s.mobile)}>{navItems}</nav>}
      </ScaleContainer>
      <ScaleContainer className={s.height} />
    </>
  );
}
