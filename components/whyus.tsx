import React from "react";
import { FiCamera, FiHeart, FiClock, FiAward } from "react-icons/fi";

const Feature = ({ icon, title, description }) => (
  <div className="flex flex-col items-start bg-white bg-opacity-80 p-6 shadow-lg rounded-xl">
    <div className="bg-amber-400 rounded-full p-4 mb-4">{icon}</div>
    <h3 className="text-lg text-amber-800 font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const WhyUs = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-amber-700 text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature
            icon={<FiCamera className="w-6 h-6 text-amber-800" />}
            title="Professional Equipment"
            description="We use top-of-the-line cameras and lenses to ensure the highest quality photos."
          />
          <Feature
            icon={<FiHeart className="w-6 h-6 text-amber-800" />}
            title="Passion for Photography"
            description="Our love for photography shines through in every image we capture."
          />
          <Feature
            icon={<FiClock className="w-6 h-6 text-amber-800" />}
            title="Timely Delivery"
            description="We understand the importance of receiving your photos promptly."
          />
          <Feature
            icon={<FiAward className="w-6 h-6 text-amber-800" />}
            title="Award-Winning Service"
            description="Our work has been recognized with multiple industry awards."
          />
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
