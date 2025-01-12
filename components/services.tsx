"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Camera,
  Heart,
  GraduationCap,
  Cake,
  Users,
  Sparkles,
} from "lucide-react";
import { serviceProps } from "@/types/types";

const services = [
  {
    title: "Weddings",
    icon: Heart,
    description:
      "Capture the magic of your special day with our expert wedding photography.",
    image: "/denis-prossy/highlights/N77A8645.jpg",
  },
  {
    title: "Kukyala",
    icon: Users,
    description:
      "Preserve the beauty of traditional ceremonies with our Kukyala photography.",
    image: "/denis-prossy/highlights/N77A8605.jpg",
  },
  {
    title: "Introduction",
    icon: Sparkles,
    description: "Document your introduction ceremony with style and elegance.",
    image: "/denis-prossy/highlights/N77A8619.jpg",
  },
  {
    title: "Birthdays",
    icon: Cake,
    description:
      "Celebrate another year with vibrant and joyful birthday photography.",
    image: "/denis-prossy/highlights/N77A8623.jpg",
  },
  {
    title: "Graduations",
    icon: GraduationCap,
    description:
      "Commemorate your academic achievements with professional graduation photos.",
    image: "/denis-prossy/highlights/N77A8646.jpg",
  },
  {
    title: "Other Events",
    icon: Camera,
    description:
      "From corporate functions to family reunions, we capture all your special moments.",
    image: "/denis-prossy/highlights/N77A9197.jpg",
  },
];

const ServiceCard = ({
  service,
  index,
}: {
  service: serviceProps;
  index: number;
}) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <service.icon className="w-6 h-6 mb-2" />
          <h3 className="text-xl font-semibold">{service.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600">{service.description}</p>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section
      id="services"
      className="py-16 bg-gradient-to-b from-white to-amber-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-amber-700 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From life&apos;s biggest moments to everyday magic, we&apos;re here
            to capture it all.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <button className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition duration-300 text-lg font-medium">
            Book a Session
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
