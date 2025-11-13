import AnimatedCounter from "../AnimatedCounter/AnimatedCounter";
import Responsive from "../Responsive/Responsive";
import classes from "./Evidence.module.css";

export default function Evidence() {
  return (
    <section className={classes.evidence}>
      <Responsive>
        <div className={classes.container}>
          <h2 className={classes.sectionSubtitle}>
            Evidence of <br /> Excellence
          </h2>
          <div className={classes.evidenceGrid}>
            <div className={classes.evidenceCard}>
              <AnimatedCounter
                targetValue={10}
                duration={2500}
                delay={200}
                suffix={"+"}
                className={classes.evidenceNumber}
              />
              <p className={classes.evidenceLabel}>Integrations</p>
            </div>
            <div className={classes.evidenceCard}>
              <AnimatedCounter
                targetValue={80}
                duration={2500}
                delay={200}
                suffix={"%"}
                className={classes.evidenceNumber}
              />
              <p className={classes.evidenceLabel}>Accounts Automated</p>
            </div>
            <div className={classes.evidenceCard}>
              <AnimatedCounter
                targetValue={5}
                duration={2500}
                delay={200}
                suffix={"min"}
                className={classes.evidenceNumber}
              />
              <p className={classes.evidenceLabel}>Setup time</p>
            </div>
          </div>
        </div>
      </Responsive>
    </section>
  );
}
