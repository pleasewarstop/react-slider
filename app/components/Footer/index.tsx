import Link from "next/link";
import s from "./styles.module.scss";
import { ReactComponent as Logo } from "@/app/assets/icons/logo.svg";

export const Footer = () => {
  return (
    <footer className={s.container}>
      <div className={s.top}>
        <div className={s.logo}>
          <Logo className={s.logoIcon} /> DiveSea
        </div>
        <div className={s.nav}>
          <Link className={s.navItem} href="#">
            Privacy Policy
          </Link>
          <Link className={s.navItem} href="#">
            Term & Conditions
          </Link>
          <Link className={s.navItem} href="#">
            About Us
          </Link>
          <Link className={s.navItem} href="#">
            Contact
          </Link>
        </div>
      </div>
      <div className={s.bottom}>
        © 2023 <span className={s.reserved}>DiveSea All Rights Reserved.</span>
      </div>
    </footer>
  );
};
