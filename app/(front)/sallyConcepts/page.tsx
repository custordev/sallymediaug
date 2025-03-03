/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, Users, Star, Clock, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Sample data for studio sessions
const studioSessions = [
  {
    id: "1",
    title: "Classic Portrait",
    description: "Timeless portrait photography in studio setting",
    imageUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&auto=format&fit=crop&q=60",
    price: "$150",
    duration: "1 hour",
  },
  {
    id: "2",
    title: "Family Session",
    description: "Capture beautiful moments with your loved ones",
    imageUrl:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&auto=format&fit=crop&q=60",
    price: "$250",
    duration: "2 hours",
  },
  {
    id: "3",
    title: "Fashion Shoot",
    description: "Professional fashion photography for models and portfolios",
    imageUrl:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&auto=format&fit=crop&q=60",
    price: "$300",
    duration: "3 hours",
  },
  {
    id: "4",
    title: "Business Headshots",
    description: "Professional headshots for corporate and business use",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
    price: "$120",
    duration: "30 minutes",
  },
  {
    id: "5",
    title: "Maternity Session",
    description: "Beautiful photography celebrating motherhood",
    imageUrl:
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=500&auto=format&fit=crop&q=60",
    price: "$200",
    duration: "1.5 hours",
  },
  {
    id: "6",
    title: "Creative Concept",
    description: "Artistic and creative photography concepts",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60",
    price: "$350",
    duration: "3 hours",
  },
];

export default function SallyConceptsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSessions, setFilteredSessions] = useState(studioSessions);

  // Filter sessions based on search term
  useEffect(() => {
    const results = studioSessions.filter(
      (session) =>
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSessions(results);
  }, [searchTerm]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1000&auto=format&fit=crop&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-7xl font-light text-white mb-6">
                Sally Concepts
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                Premium studio photography services for individuals, families,
                and businesses
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link
                  href="#sessions"
                  className="inline-block bg-amber-400 text-black px-8 py-3 mt-4 rounded-full font-medium hover:bg-amber-500 transition-colors"
                >
                  Explore Our Sessions
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full mb-4">
                <Camera className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Professional Equipment
              </h3>
              <p className="text-gray-600">
                State-of-the-art cameras, lighting, and studio equipment
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Expert Photographers
              </h3>
              <p className="text-gray-600">
                Experienced professionals who know how to capture your best
                angles
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full mb-4">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                High-resolution images with professional editing and retouching
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Turnaround</h3>
              <p className="text-gray-600">
                Receive your edited photos within 7 business days
              </p>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Studio Sessions with Search */}
      <section id="sessions" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Studio Sessions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Choose from our range of professional photography sessions
              tailored to your needs
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <Image
                  width={1080}
                  height={1080}
                  src={session.imageUrl}
                  alt={session.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {session.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{session.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-500 font-bold">
                      {session.price}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {session.duration}
                    </span>
                  </div>
                  <button className="mt-4 w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 transition-colors">
                    Book Session
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredSessions.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 mb-2">
                No sessions found matching `${searchTerm}`
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-yellow-500 hover:text-yellow-600 font-medium"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Booking CTA */}
      <section id="contact" className="py-20 bg-yellow-400">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
              Ready to Book Your Session?
            </h2>
            <p className="text-black/80 mb-8">
              Contact us today to schedule your studio session at Sally Concepts
            </p>
            <a
              href="#"
              className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Book Now
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
