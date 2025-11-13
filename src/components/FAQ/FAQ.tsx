import { useState } from "react";
import classes from "./FAQ.module.css";
import Responsive from "../Responsive/Responsive";
import FadeInOnScroll from "../FadeInOnScroll/FadeInOnScroll";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I get started?",
      answer:
        "Bitcoin is the only cryptocurrency being used by reputed firms around the world. When a user like you or firm wishes to keep your BTC investment strategy, it's a much needed form/format exchange/setup early. When's an exchange, it's activated from the Orki app.",
    },
    {
      question: "How do I get started?",
      answer:
        "Getting started is easy. Simply sign up for an account, connect your business bank account or payment processor, set your automation rules, and start converting excess AED to Bitcoin automatically.",
    },
    {
      question: "How do I get started?",
      answer:
        "Getting started is easy. Simply sign up for an account, connect your business bank account or payment processor, set your automation rules, and start converting excess AED to Bitcoin automatically.",
    },
    {
      question: "How do I get started?",
      answer:
        "Getting started is easy. Simply sign up for an account, connect your business bank account or payment processor, set your automation rules, and start converting excess AED to Bitcoin automatically.",
    },
    {
      question: "How do I get started?",
      answer:
        "Getting started is easy. Simply sign up for an account, connect your business bank account or payment processor, set your automation rules, and start converting excess AED to Bitcoin automatically.",
    },
  ];

  return (
    <section className={classes.faq}>
      <Responsive>
        <FadeInOnScroll>
          <h2 className={classes.headerTitle}>Frequently Asked Questions</h2>
        </FadeInOnScroll>
        <div className={classes.faqList}>
          {faqs.map((faq, index) => (
            <FadeInOnScroll key={index}>
              <div
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={classes.faqItem}
              >
                <div className={classes.faqQuestion}>
                  <span>{faq.question}</span>
                  <span>{openIndex === index ? "-" : "+"}</span>
                </div>
                {openIndex === index && (
                  <div className={classes.faqAnswer}>{faq.answer}</div>
                )}
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </Responsive>
    </section>
  );
}
