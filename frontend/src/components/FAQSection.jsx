
import React, { useState } from "react";

const faqs = [
    {
      question: "What is OCR in manga?",
      answer:
        "OCR stands for Optical Character Recognition, a tech that converts images of text into machine-encoded text. In manga, it helps you read those tricky Japanese characters!",
    },
    {
      question: "How does MangaTech work?",
      answer:
        "Our software scans manga pages, recognizes text, and translates it into your preferred language. It's like having a personal translator in your pocket!",
    },
    {
      question: "Is it free to use?",
      answer:
        "Absolutely! We believe in making manga accessible to everyone, so enjoy our services without spending a dime!",
    },
    {
      question: "Can I use it on my phone?",
      answer:
        "Yes! MangaTech is mobile-friendly, so you can read on the go. Manga never looked so good!",
    },
    {
      question: "What languages are supported?",
      answer:
        "We support multiple languages, including English, Spanish, and French. Your manga, your language!",
    },
  ];
  
  const FAQSection = () => {
    const [bgColor, setBgColor] = useState("#edefeb");
    const [cardBg, setCardBg] = useState("#ffffff");
    const [fullWidth, setFullWidth] = useState(false);
    const [paddingTop, setPaddingTop] = useState(5);
    const [paddingBottom, setPaddingBottom] = useState(5);
    const [transparentBg, setTransparentBg] = useState(true);
  
    return (
      <section
        className={`py-${paddingTop} pb-${paddingBottom} ${fullWidth ? "w-full" : "container mx-auto"}`}
        style={{ backgroundColor: transparentBg ? "transparent" : bgColor }}
      >
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-black">Curious Minds Ask</h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-full max-w-3xl space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg shadow-lg text-left"
                style={{ backgroundColor: cardBg, marginBottom: "2rem", padding: "2.25rem" }}
              >
                <h5 className="text-xl font-semibold text-black">{faq.question}</h5>
                <p className="mt-2 text-black">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

export default FAQSection;