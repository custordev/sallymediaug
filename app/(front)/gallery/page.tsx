"use client";

import React, { useState } from "react";
import { GalleryCard } from "@/components/(front)/GalleryCard";
import { galleryCategories, photos } from "@/types/types";

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPhotos =
    selectedCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-amber-700 text-center mb-12">
          Our Gallery
        </h2>

        {/* Categories Navigation */}
        <div className="overflow-x-auto mb-12">
          <div className="flex justify-start md:justify-center space-x-2 md:space-x-4 min-w-max px-4">
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 
                  ${
                    selectedCategory === category.id
                      ? "text-amber-600 border-b-2 border-amber-600"
                      : "text-gray-600 hover:text-amber-600"
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPhotos.map((photo) => (
            <GalleryCard key={photo.id} photo={photo} />
          ))}
        </div>

        {/* Empty State */}
        {filteredPhotos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No photos found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
