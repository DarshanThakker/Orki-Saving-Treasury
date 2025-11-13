import React, { useState } from "react";
import classes from "./Feedback.module.css";
import Button from "../Button/Button";
import feedbackImg from "@/assets/feedback.png";

export default function Feedback() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <div
      style={{ backgroundImage: `url(${feedbackImg.src})` }}
      className={classes.container}
    >
      <div className={classes.innerContainer}>
        <h2 className={classes.headerTitle}>Stay Updated</h2>
        <p className={classes.headerSubtitle}>
          We send periodic detailed information about our service, state of
          news, and templates.
        </p>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className={classes.submitBtn}>
            Subscribe
          </Button>
        </form>
      </div>
    </div>
  );
}
