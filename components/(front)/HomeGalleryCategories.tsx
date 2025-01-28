"use client";

import React, { useState } from "react";
import { GalleryCard } from "@/components/(front)/GalleryCard";
import { Category, Client } from "@prisma/client";

interface GalleryProps {
  allCategories: Category[];
  clients: Client[];
  initialCategory?: string;
}

export default function Gallery({
  allCategories,
  clients,
  initialCategory = "all",
}: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const filteredClients =
    selectedCategory === "all"
      ? clients.slice(0, 9) // Show first 9 clients when "all" is selected
      : clients.filter((client) => client.categoryId === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Categories Navigation */}
        <div className="overflow-x-auto mb-12">
          <div className="flex justify-start md:justify-center space-x-2 md:space-x-4 min-w-max px-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 
                ${
                  selectedCategory === "all"
                    ? "text-amber-600 border-b-2 border-amber-600"
                    : "text-gray-600 hover:text-amber-600"
                }`}
            >
              All
            </button>
            {allCategories.map((category) => (
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
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredClients.map((client) => (
            <GalleryCard key={client.id} client={client} />
          ))}
        </div>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
