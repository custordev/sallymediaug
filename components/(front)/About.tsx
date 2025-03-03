"use client";
import { motion } from "framer-motion";
import { Camera, Clock, Award, Users, ArrowRight } from "lucide-react";
import { Carousel } from "../ui/carousel";

const images = [
  { src: "/carousel/7.jpg" },
  { src: "/carousel/6.jpg" },
  { src: "/carousel/9.jpg" },
  { src: "/denis-prossy/highlights/N77A8605.jpg" },
  { src: "/carousel/8.jpg" },
  { src: "/denis-prossy/highlights/N77A8623.jpg" },
  { src: "/carousel/2.jpg" },
  { src: "/denis-prossy/highlights/N77A8645.jpg" },
  { src: "/carousel/5.jpg" },
  { src: "/denis-prossy/highlights/N77A8646.jpg" },
  { src: "/carousel/3.jpg" },
  { src: "/carousel/4.jpg" },
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
      className="py-20 bg-gradient-to-b from-amber-50 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          {/* Carousel Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 order-2 lg:order-1"
          >
            <div className="max-w-md mx-auto">
              <Carousel images={images} autoPlayInterval={4000} />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 order-1 lg:order-2"
          >
            <div className="max-w-xl mx-auto lg:mx-0">
              <h2 className="text-3xl lg:text-5xl font-light text-amber-800 mb-6">
                Capturing Your
                <br />
                Precious Moments
              </h2>
              <p className="text-gray-700 mb-6 text-base lg:text-lg leading-relaxed">
                We are more than just photographers – we are storytellers,
                moment-catchers, and memory-makers. With a passion for capturing
                life&rsquo;s most beautiful moments, we bring artistry and
                expertise to every shoot.
              </p>
              <p className="text-gray-600 mb-8 text-base lg:text-lg leading-relaxed">
                Our approach combines technical excellence with creative vision,
                ensuring that each photograph not only captures the moment but
                also the emotions, atmosphere, and unique story behind it.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amber-600 text-white px-8 py-4 rounded-full hover:bg-amber-700 transition duration-300 text-base lg:text-lg font-medium group flex items-center"
              >
                Discover Our Story
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 text-center hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl border border-amber-100"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-4">
                <stat.icon className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-amber-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-600">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
