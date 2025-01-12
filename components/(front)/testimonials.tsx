"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Bride",
    image: "/denis-prossy/highlights/N77A8605.jpg",
    quote:
      "Our wedding photos are absolutely stunning! The team captured every special moment perfectly.",
  },
  {
    name: "Michael Chen",
    role: "Corporate Event Planner",
    image: "/denis-prossy/highlights/N77A8605.jpg",
    quote:
      "Professional, punctual, and produced amazing results. Highly recommended for any corporate event.",
  },
  {
    name: "Emily Rodriguez",
    role: "Portrait Client",
    image: "/denis-prossy/highlights/N77A8605.jpg",
    quote:
      "Professional, punctual, and produced amazing results. Highly recommended for any corporate event.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-amber-700 text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16  mb-4 rounded-full overflow-hidden">
                  <Image
                    width={1080}
                    height={1080}
                    src="/denis-prossy/highlights/N77A9197.jpg"
                    alt="Wedding"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
