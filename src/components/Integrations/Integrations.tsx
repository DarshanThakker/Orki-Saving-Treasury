import classes from "./Integrations.module.css";
import Responsive from "../Responsive/Responsive";
import shopifyIcon from "@/assets/partners/shopify-icon.svg";
import Image from "next/image";
import ArrowRight from "@/assets/ArrowRight";
import stripe from "@/assets/providers/stripe.svg";
import checkout from "@/assets/providers/checkout.svg";
import paytabs from "@/assets/providers/paytabs.svg";
import tapPayments from "@/assets/providers/tap-payment.svg";
import shopify from "@/assets/providers/shopify.svg";
import paypal from "@/assets/providers/paypal.svg";
import quickbooks from "@/assets/tools/quickbooks.svg";
import xero from "@/assets/tools/xero.svg";
import zohobooks from "@/assets/tools/zohobooks.svg";
import wafeq from "@/assets/tools/wafeq.svg";
import FadeInOnScroll from "../FadeInOnScroll/FadeInOnScroll";

const bookingTools = [
  {
    name: "Sripe",
    logo: quickbooks,
  },
  {
    name: "Sripe",
    logo: xero,
  },
  {
    name: "Sripe",
    logo: zohobooks,
  },
  {
    name: "Sripe",
    logo: wafeq,
  },
];

const paymentProviders = [
  {
    name: "Sripe",
    logo: stripe,
  },
  {
    name: "Checkout",
    logo: checkout,
  },
  {
    name: "Paytabs",
    logo: paytabs,
  },
  {
    name: "Tap Payment",
    logo: tapPayments,
  },
  {
    name: "Shopify",
    logo: shopify,
  },
  {
    name: "Paypal",
    logo: paypal,
  },
];

export default function Integrations() {
  return (
    <section className={classes.integrations}>
      <Responsive>
        <FadeInOnScroll>
          <div className={classes.container}>
            <div className={classes.headerWrapper}>
              <div className={classes.header}>
                <h2 className={classes.headerTitle}>
                  Seamlessly sync your systems
                </h2>
                <p className={classes.headerSubtitle}>
                  Connect your payment processor and accounting package in
                  seconds. No API key copy-pasting. Click one button.
                </p>
              </div>

              <div className={classes.navigation}>
                <div className={classes.iconAndText}>
                  <div className={classes.iconContainer}>
                    <Image src={shopifyIcon} alt="" />
                  </div>
                  <div>View all Integrations</div>
                </div>
                <ArrowRight />
              </div>
            </div>
            <div className={classes.stroke}></div>
            <div className={classes.partnerWrapper}>
              <div className={classes.section}>
                <div className={classes.sectionTitle}>Payment Providers</div>
                <div className={classes.partners}>
                  {paymentProviders.map(({ name, logo }, idx) => (
                    <div key={idx} className={classes.partner}>
                      <div className={classes.card}>
                        <div className={classes.name}>{name}</div>
                        <Image src={logo} alt="" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={classes.section}>
                <div className={classes.sectionTitle}>Bookeeping Tools</div>
                <div className={classes.partners}>
                  {bookingTools.map(({ name, logo }, idx) => (
                    <div key={idx} className={classes.partner}>
                      <div className={classes.card}>
                        <div className={classes.name}>{name}</div>
                        <Image src={logo} alt="" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </Responsive>
    </section>
  );
}
