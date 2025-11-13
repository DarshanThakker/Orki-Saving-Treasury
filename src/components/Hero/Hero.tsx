import Button from "../Button/Button";
import classes from "./Hero.module.css";
import shopify from "@/assets/partners/shopify.svg";
import stripe from "@/assets/partners/stripe.svg";
import paypal from "@/assets/partners/paypal.svg";
import intuit from "@/assets/partners/intuit.svg";
import xero from "@/assets/partners/xero.svg";
import paytabs from "@/assets/partners/paytabs.svg";
import wafeq from "@/assets/partners/wafeq.svg";
import checkout from "@/assets/partners/checkout.svg";
import Image from "next/image";
import Responsive from "../Responsive/Responsive";

const partnerLogos = [
  shopify,
  stripe,
  paypal,
  intuit,
  xero,
  paytabs,
  wafeq,
  checkout,
];
export default function Hero() {
  return (
    <section className={classes.hero}>
      <Responsive>
        <div className={classes.container}>
          <div className={classes.heading}>
            Turn Your Business Revenue Into Bitcoin Automatically
          </div>

          <div className={classes.subHeading}>
            Orki helps SMEs and Freelancers convert AED into BTC using smart
            automation, local integrations, and trusted custody.
          </div>

          <div className={classes.btnWrapper}>
            <Button className={classes.startBtn}>Start Saving Now</Button>
            <Button className={classes.requestBtn}>Request a Demo</Button>
          </div>

          <div className={classes.partners}>
            <div className={classes.lhs}>
              <div className={classes.tag}>Trusted Partners</div>
              <div className={classes.partnerText}>
                Trusted by Successful SMEs, Accountants & Bookkeepers
              </div>
            </div>

            <div className={classes.scrollWrapper}>
              <div className={classes.scrollContainer}>
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className={classes.scrollSection}>
                    {partnerLogos.map((logo, idx) => (
                      <div key={idx} className={classes.scrollItem}>
                        <Image src={logo} alt="" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Responsive>
    </section>
  );
}
