/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { GalleryCard } from "@/components/(front)/GalleryCard";
import type { Client, Category } from "@prisma/client";
import { Search, Filter, X, Camera } from "lucide-react";
import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";

interface GalleryProps {
  clients: (Client & { category?: Category })[];
  categories?: Category[];
}

export default function Gallery({ clients, categories = [] }: GalleryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState(clients);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Filter clients based on search term and active category
  useEffect(() => {
    let results = clients;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (client) =>
          client.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          client.category?.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory) {
      results = results.filter(
        (client) => client.categoryId === activeCategory
      );
    }

    setFilteredClients(results);
  }, [searchTerm, activeCategory, clients]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory(null);
  };

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <>
      {/* Hero Banner Section - Enhanced */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1000&auto=format&fit=crop&q=60')",
          }}
        />
        <div className="absolute inset-0 bg-black/70 z-10" />

        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl md:text-8xl font-light text-white mb-6 tracking-wider">
              SALLY<span className="text-amber-400">CONCEPTS</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light">
              Premium studio photography services for individuals, families, and
              businesses
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              <Link
                href="#sessions"
                className="inline-block bg-amber-400 text-black px-10 py-4 mt-8 rounded-full font-medium hover:bg-amber-500 transition-all hover:shadow-lg transform hover:-translate-y-1"
              >
                Explore Our Sessions
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2,
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Link href="#sessions" className="text-white">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section - Redesigned */}
      <section className="py-6 bg-gradient-to-b from-amber-100 to-amber-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-3 relative inline-block">
              Our Studio Sessions
              <motion.div
                className="absolute -bottom-2 left-1/2 h-1 bg-amber-400"
                initial={{ width: 0 }}
                whileInView={{ width: "80%" }}
                transition={{ delay: 0.3, duration: 0.6 }}
                style={{ transform: "translateX(-50%)" }}
                viewport={{ once: true }}
              />
            </h2>

            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                {/* Search Bar */}
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search sessions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 rounded-full border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-sm"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 h-5 w-5" />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Category Filter */}
                {categories.length > 0 && (
                  <div className="relative w-full sm:w-auto">
                    <select
                      value={activeCategory || ""}
                      onChange={(e) =>
                        setActiveCategory(e.target.value || null)
                      }
                      className="appearance-none w-full px-4 py-3 pl-12 pr-10 rounded-full border-2 border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white shadow-sm"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-500 h-5 w-5" />
                  </div>
                )}
              </div>
            </div>

            {/* Active Filters */}
            {(searchTerm || activeCategory) && (
              <div className="flex items-center justify-center mt-4 gap-2 flex-wrap">
                <span className="text-sm text-gray-500">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-amber-200 text-amber-800">
                    {searchTerm}
                    <button onClick={() => setSearchTerm("")} className="ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {activeCategory && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-amber-200 text-amber-800">
                    {categories.find((c) => c.id === activeCategory)?.title ||
                      "Category"}
                    <button
                      onClick={() => setActiveCategory(null)}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs text-amber-600 hover:text-amber-800 underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid Section - Enhanced with Animation */}
      <section
        id="sessions"
        className="py-8 bg-gradient-to-b from-amber-50 to-white"
      >
        <div className="container mx-auto px-4">
          {/* Category Showcase - Improved */}
          {categories.length > 0 && !activeCategory && !searchTerm && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                Browse by Category
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {categories.map((category, index) => (
                  <motion.div
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={variants}
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-md"
                  >
                    <Image
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 group-hover:translate-y-0">
                      <h3 className="text-xl font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {category.title}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-gray-200 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {filteredClients.map((client, index) => (
              <motion.div
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={variants}
                key={client.id}
              >
                <GalleryCard client={client} />
              </motion.div>
            ))}
          </div>

          {/* Empty State - Enhanced */}
          {filteredClients.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 my-8 bg-white rounded-lg shadow-md max-w-xl mx-auto"
            >
              <Camera className="h-16 w-16 mx-auto text-amber-300 mb-4" />
              <p className="text-gray-600 text-lg mb-4">
                {searchTerm
                  ? `No sessions found matching "${searchTerm}"`
                  : activeCategory
                    ? "No sessions found in this category."
                    : "No sessions available at the moment."}
              </p>
              <button
                onClick={clearFilters}
                className="text-amber-500 hover:text-amber-600 font-medium border-2 border-amber-500 hover:border-amber-600 rounded-full px-6 py-2 transition-colors"
              >
                View all sessions
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Booking CTA - Enhanced */}
      <section className="py-20 bg-amber-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-5 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">
              Ready for Your Perfect Shot?
            </h2>
            <p className="text-black/80 mb-10 text-lg">
              Contact us today to schedule your premium studio session at Sally
              Concepts
            </p>
            <a
              href="https://wa.me/256709717440"
              className="inline-block bg-black text-white px-10 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              Book Your Session Now
            </a>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-amber-300 opacity-30 z-0" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-500 opacity-20 z-0" />
      </section>
    </>
  );
}
