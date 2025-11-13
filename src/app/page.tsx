/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Automation from "@/components/Automation/Automation";
import Evidence from "@/components/Evidence/Evidence";
import FAQ from "@/components/FAQ/FAQ";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Integrations from "@/components/Integrations/Integrations";
import classes from "./page.module.css";
import Feedback from "@/components/Feedback/Feedback";
import heroBg from "@/assets/hero-bg.png";
import { useObserver } from "@/hooks/useObserver";
import { useEffect, useState } from "react";

export default function OrkiLandingPage() {
  const { ref, isVisible } = useObserver();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{ visibility: mounted ? "visible" : "hidden" }}
      className={classes.container}
    >
      <div
        style={{ backgroundImage: `url(${heroBg.src})` }}
        className={classes.heroWrapper}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        <Header pin={!isVisible} />
        <Hero />
      </div>
      <Evidence />
      <Automation />
      <Integrations />
      <FAQ />
      <div className={classes.footerWrapper}>
        <Feedback />
        <Footer />
      </div>
    </div>
  );
}
