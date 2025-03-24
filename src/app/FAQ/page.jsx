"use client";
import React, { useState } from "react";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is AI-IMAGE-CREATOR✨?",
      answer:
        "AI-IMAGE-CREATOR✨ is an AI-powered web app that allows users to generate images using AI models.",
    },
    {
      question: "Is AI-IMAGE-CREATOR✨ free to use?",
      answer:
        "AI-IMAGE-CREATOR✨ is completely free to use for the moment, maybe we will offer a premium option with more features",
    },
    {
      question: "Can I use the AI-generated images commercially?",
      answer:
        "Yes, you own the rights to the images you create, but please review our Terms of Use for licensing details.",
    },
    {
      question: "How do I report inappropriate content?",
      answer:
        "If you come across any inappropriate content, please contact us immediately at [your email].",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach our support team via email at [your email] or through our contact page.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="mt-10 px-6 mx-auto max-w-4xl text-gray-900">
      <section className="bg-gray-50 p-8 rounded-lg shadow-md">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black text-center">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-center">
          Here are some common questions about AI-IMAGE-CREATOR✨.
        </p>

        {/* FAQ List */}
        <div className="mt-6 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                className="w-full cursor-pointer text-left flex justify-between items-center py-4 text-lg font-semibold text-gray-800"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-gray-500 font-bold text-2xl">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>

              {activeIndex === index && (
                <p className="text-gray-600 pb-4">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
