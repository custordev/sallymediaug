"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  { id: "weddings", name: "Weddings" },
  { id: "portraits", name: "Portraits" },
  { id: "events", name: "Events" },
  { id: "nature", name: "Nature" },
];

const photos = [
  { src: "/denis-prossy/highlights/N77A8645.jpg", category: "weddings" },
  { src: "/denis-prossy/highlights/N77A8605.jpg", category: "weddings" },
  { src: "/denis-prossy/highlights/N77A8619.jpg", category: "portraits" },
  { src: "/denis-prossy/highlights/N77A8623.jpg", category: "portraits" },
  { src: "/denis-prossy/highlights/N77A8669.jpg", category: "events" },
  { src: "/denis-prossy/function/N77A9582.jpg", category: "weddings" },
  { src: "/denis-prossy/function/N77A9505.jpg", category: "portraits" },
  { src: "/denis-prossy/function/N77A9518.jpg", category: "nature" },
  { src: "/denis-prossy/function/N77A9526.jpg", category: "events" },
  { src: "/denis-prossy/function/N77A9529.jpg", category: "nature" },
  { src: "/denis-prossy/function/N77A9558.jpg", category: "nature" },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-amber-700 text-center mb-8">
          Our Gallery
        </h2>
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full mr-2 ${
              selectedCategory === "all"
                ? "bg-amber-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full mr-2 ${
                selectedCategory === category.id
                  ? "bg-amber-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg cursor-pointer"
              onClick={() => setSelectedImage(photo.src)}
            >
              <Image
                src={photo.src}
                alt={`Gallery image ${index + 1}`}
                width={300}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Selected image"
            width={800}
            height={600}
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
