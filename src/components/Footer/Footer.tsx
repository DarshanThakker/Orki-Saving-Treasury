import Image from "next/image";
import classes from "./Footer.module.css";
import logo from "@/assets/logo-white.svg";
import XIcon from "@/assets/XIcon";
import LinkedInIcon from "@/assets/LinkedInIcon";
import InstagramIcon from "@/assets/InstagramIcon";
import ArrowUp from "@/assets/ArrowUp";

export default function Footer() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.footerLinks}>
          <div className={classes.footerColumn}>
            <h4>Product</h4>
            <div className={classes.links}>
              <a href="#">For Business</a>
              <a href="#">For Individuals</a>
            </div>
          </div>
          <div className={classes.footerColumn}>
            <h4>Company</h4>
            <div className={classes.links}>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
              <a href="#">Media</a>
            </div>
          </div>
          <div className={classes.footerColumn}>
            <h4>Resources</h4>
            <div className={classes.links}>
              <a href="#">Blog</a>
              <a href="#">FAQs</a>
            </div>
          </div>
        </div>
        <div className={classes.stroke}></div>
        <div className={classes.footerRHS}>
          <div className={classes.footerLogo}>
            <Image src={logo} alt="" />
          </div>
          <div className={classes.stroke}></div>
          <div className={classes.fbText}>
            Financial tools for forward-thinking businesses.
          </div>
          <div className={classes.footerSocial}>
            <XIcon />
            <LinkedInIcon />
            <InstagramIcon />
          </div>
        </div>
      </div>

      <div className={classes.base}>
        <div className={classes.baseText}>© 2025 — Copyright</div>
        <div onClick={handleClick} className={classes.arrowIcon}>
          <ArrowUp />
        </div>
      </div>
    </footer>
  );
}
