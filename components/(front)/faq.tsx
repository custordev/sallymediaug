"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What types of photography do you offer?",
    answer:
      "We specialize in wedding photography, portrait sessions, and event coverage. Our team is experienced in capturing a wide range of occasions, from intimate gatherings to large-scale events.",
  },
  {
    question: "How far in advance should I book your services?",
    answer:
      "We recommend booking as early as possible, especially for weddings and popular dates. Typically, 6-12 months in advance is ideal for weddings, while 2-4 weeks is sufficient for portrait sessions.",
  },
  {
    question: "Do you offer photo editing services?",
    answer:
      "Yes, all of our packages include basic editing and color correction. We also offer advanced retouching services for an additional fee.",
  },
  {
    question: "Can I get both digital files and printed photos?",
    answer:
      "We offer packages that include both digital files and printed photos. We can also create custom albums and wall art from your favorite images.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Our cancellation policy varies depending on the type of service and how far in advance you cancel. Please refer to your contract for specific details, or contact us for more information.",
  },
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
