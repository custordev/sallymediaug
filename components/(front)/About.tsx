"use client";

import React from "react";

import { Camera, Clock, Award, Heart, Users } from "lucide-react";
import { Carousel } from "../ui/carousel";

const images = [
  { src: "/denis-prossy/highlights/N77A8605.jpg" },
  { src: "/denis-prossy/highlights/N77A8619.jpg" },
  { src: "/denis-prossy/highlights/N77A8623.jpg" },
  { src: "/denis-prossy/highlights/N77A8645.jpg" },
  { src: "/denis-prossy/highlights/N77A8646.jpg" },
  { src: "/denis-prossy/highlights/N77A9197.jpg" },
];

const stats = [
  { icon: Camera, label: "Photos Taken", value: "50K+" },
  { icon: Users, label: "Happy Clients", value: "1000+" },
  { icon: Clock, label: "Years Experience", value: "10+" },
  { icon: Award, label: "Awards Won", value: "25+" },
];

const About = () => {
  return (
    <section
      id="about"
      className="py-16 bg-gradient-to-b from-amber-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <Carousel images={images} autoPlayInterval={4000} />
          </div>
          <div className="w-full lg:w-1/2">
            <div className="max-w-xl mx-auto lg:mx-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-amber-700 mb-6">
                Capturing Your Precious Moments
              </h2>
              <p className="text-gray-700 mb-6 text-base lg:text-lg leading-relaxed">
                We are more than just photographers – we are storytellers,
                moment-catchers, and memory-makers. With a passion for capturing
                life&apos;s most beautiful moments, we bring artistry and
                expertise to every shoot.
              </p>
              <p className="text-gray-700 mb-8 text-base lg:text-lg leading-relaxed">
                Our approach combines technical excellence with creative vision,
                ensuring that each photograph not only captures the moment but
                also the emotions, atmosphere, and unique story behind it.
              </p>
              <button className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition duration-300 text-base lg:text-lg font-medium">
                Our Story
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 md:p-6 shadow-lg text-center hover:transform hover:-translate-y-1 transition-transform duration-300"
            >
              <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-amber-600 mx-auto mb-2 md:mb-4" />
              <div className="text-xl md:text-2xl font-bold text-amber-700 mb-1 md:mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="bg-amber-50 rounded-2xl p-6 md:p-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 md:w-12 md:h-12 text-amber-600" />
              <h3 className="text-2xl md:text-3xl font-bold text-amber-700 ml-4">
                Our Mission
              </h3>
            </div>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8 text-center">
              We believe that every moment is worth capturing, and every story
              is worth telling. Our mission is to create timeless photographs
              that not only document your special moments but also preserve the
              emotions, connections, and joy that make them unforgettable.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Quality",
                  description:
                    "Top-of-the-line equipment and advanced techniques for the highest quality results.",
                },
                {
                  title: "Creativity",
                  description:
                    "Fresh eyes and innovative ideas to create unique, stunning images.",
                },
                {
                  title: "Experience",
                  description:
                    "Years of expertise in various photography styles to handle any situation.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h4 className="text-lg md:text-xl font-semibold text-amber-700 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-sm md:text-base text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
