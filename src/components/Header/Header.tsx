import { useState } from "react";
import classes from "./Header.module.css";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import Button from "../Button/Button";
import { MenuIcon } from "lucide-react";
import Responsive from "../Responsive/Responsive";

export default function Header({ pin }: { pin: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`${classes.header} ${pin && classes.pin} ${
          mobileMenuOpen && classes.open
        }`}
      >
        <Responsive>
          <div className={classes.container}>
            <div className={classes.rhs}>
              <div className={classes.logo}>
                <Image src={logo} alt="" />
              </div>
              <nav
                className={`${classes.nav} ${
                  mobileMenuOpen ? classes.navOpen : ""
                }`}
              >
                <a href="#features">Features</a>
                <a href="#integrations">Integrations</a>
                <a href="#pricing">Pricing</a>
                <a href="#about">About</a>
              </nav>
            </div>
            <div className={classes.headerActions}>
              <Button className={classes.loginBtn}>Login</Button>
              <Button className={`${classes.requestBtn}`}>
                Request a Demo
              </Button>
            </div>
            <button
              className={classes.mobileMenuBtn}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <MenuIcon />
            </button>

            <div
              className={`${classes.dropdown} ${
                mobileMenuOpen && classes.open
              }`}
            >
              <nav className={classes.nav}>
                <a href="#features">Features</a>
                <a href="#integrations">Integrations</a>
                <a href="#pricing">Pricing</a>
                <a href="#about">About</a>
              </nav>

              <div className={classes.headerActions}>
                <Button className={classes.loginBtn}>Login</Button>
                <Button className={`${classes.requestBtn}`}>
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>
        </Responsive>
      </header>
      <div className={`${classes.placeholder} ${pin && classes.pin}`}></div>
      <div
        className={`${classes.overlay}  ${mobileMenuOpen && classes.open}`}
      ></div>
    </>
  );
}
