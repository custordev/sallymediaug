"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer a wide range of photography services including weddings, kwanjula ceremonies, studio sessions (Sally Concepts), corporate events, and personal photoshoots."
  },
  {
    question: "How far in advance should I book?",
    answer: "For weddings and major events, we recommend booking 3-6 months in advance. For studio sessions and smaller events, 2-4 weeks notice is usually sufficient."
  },
  {
    question: "Do you travel for photoshoots?",
    answer: "Yes, we are available for travel both locally and internationally. Travel fees may apply depending on the location."
  },
  {
    question: "How long until I receive my photos?",
    answer: "For weddings and major events, delivery time is typically 2-3 weeks. For studio sessions and smaller events, you can expect your photos within 1-2 weeks."
  },
  {
    question: "What is Sally Concepts?",
    answer: "Sally Concepts is our premium studio photography service offering creative, high-quality portrait sessions in a controlled environment with professional lighting and backdrops."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-amber-700 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full text-left p-4 bg-white rounded-lg shadow-md"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-800">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-amber-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-amber-600" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white px-4 pb-4 rounded-b-lg"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
