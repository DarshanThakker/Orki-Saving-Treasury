import CheckIcon from "@/assets/CheckIcon";
import Responsive from "../Responsive/Responsive";
import classes from "./Automation.module.css";
import image1 from "@/assets/img-section1.png";
import image2 from "@/assets/img-section2.png";
import image3 from "@/assets/img-section3.png";
import Image from "next/image";
import FadeInOnScroll from "../FadeInOnScroll/FadeInOnScroll";

// DynamicStrategies data object

export const dynamicStrategiesData = {
  title: "Dynamic Strategies",
  description:
    "Link your Stripe, Checkout.com, or QuickBooks accounts to automate BTC accumulation based on real-time revenue.",
  items: [
    "Set fixed recurring buys",
    "Allocate a fixed percentage of revenue to BTC",
    "Convert excess AED balances daily/weekly or when needed",
    "Make manual BTC purchases anytime — with low, transparent fees",
  ],
};

// Optimize Balance Sheet data object

export const optimizeBalanceSheetData = {
  title: "Optimize Your Balance Sheet",
  description: "Maximize long-term value with idle AED",
  items: [
    "Set minimum bank thresholds — only convert excess",
    "Regular conversion into Bitcoin for automated savings",
    "Stay protected from Inflation.",
  ],
};

// Built for SMEs data object

export const builtForSMEsData = {
  title: "Built for SMEs",
  description:
    "A savings engine designed for founders, freelancers, and financial teams:",
  items: [
    "No disruption to staff",
    "AED-to-BTC tracking + easy accounting exports",
    "Instantly reversible — convert back to AED when needed",
    "Simple reporting for peace of mind",
  ],
};

export default function Automation() {
  return (
    <section className={classes.automation}>
      <Responsive className={classes.container}>
        <FadeInOnScroll>
          <div className={classes.header}>
            <h2 className={classes.headerTitle}>
              Automated Bitcoin Accumulation - With Orki
            </h2>
            <p className={classes.headerSubtitle}>
              Smart Rules for Smarter Savings
            </p>
          </div>
        </FadeInOnScroll>

        <div className={classes.sectionWrapper}>
          <div className={classes.section}>
            <div className={`${classes.eclipse1} eclipse`}></div>
            <div className={`${classes.eclipse2} eclipse`}></div>

            <FadeInOnScroll>
              <div className={`${classes.image} ${classes.image1}`}>
                <Image src={image1} alt="" />
              </div>
            </FadeInOnScroll>
            <List
              title={dynamicStrategiesData.title}
              description={dynamicStrategiesData.description}
              items={dynamicStrategiesData.items}
            />
          </div>

          <div className={classes.section}>
            <div className={`${classes.eclipse1} eclipse`}></div>
            <div className={`${classes.eclipse2} eclipse`}></div>

            <List
              title={optimizeBalanceSheetData.title}
              description={optimizeBalanceSheetData.description}
              items={optimizeBalanceSheetData.items}
            />
            <FadeInOnScroll>
              <div className={`${classes.image} ${classes.image2}`}>
                <Image src={image2} alt="" />
              </div>
            </FadeInOnScroll>
          </div>

          <div className={classes.section}>
            <div className={`${classes.eclipse1} eclipse`}></div>
            <div className={`${classes.eclipse2} eclipse`}></div>

            <FadeInOnScroll>
              <div className={`${classes.image} ${classes.image3}`}>
                <Image src={image3} alt="" />
              </div>
            </FadeInOnScroll>
            <List
              title={builtForSMEsData.title}
              description={builtForSMEsData.description}
              items={builtForSMEsData.items}
            />
          </div>
        </div>
      </Responsive>
    </section>
  );
}

const List = ({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: string[];
}) => {
  return (
    <div className={classes.listContainer}>
      <FadeInOnScroll>
        <div className={classes.listTitle}>{title}</div>
      </FadeInOnScroll>
      <FadeInOnScroll>
        <div className={classes.listDescription}>{description}</div>
      </FadeInOnScroll>
      <div className={classes.listItems}>
        {items.map((item, idx) => (
          <FadeInOnScroll key={idx}>
            <div className={classes.listItem}>
              <div className={classes.checkIcon}>
                <CheckIcon />
              </div>
              <div className={classes.label}>{item}</div>
            </div>
          </FadeInOnScroll>
        ))}
      </div>
    </div>
  );
};
