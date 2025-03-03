"use client";
import { useState, useEffect } from "react";
import { GalleryCard } from "@/components/(front)/GalleryCard";
import type { Client, Category } from "@prisma/client";
import { Search, Filter, X } from "lucide-react";
import Image from "next/image";

interface GalleryProps {
  clients: (Client & { category?: Category })[];
  categories?: Category[];
}

export default function Gallery({ clients, categories = [] }: GalleryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState(clients);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

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

  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative h-[40vh]  flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/i-min.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute  inset-0 bg-black/60 z-10" />
        <div className="relative py-5 z-20 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
            Sally Media Gallery
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our portfolio of stunning photography work
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search by name, description or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
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
              <div className="relative w-full md:w-auto">
                <select
                  value={activeCategory || ""}
                  onChange={(e) => setActiveCategory(e.target.value || null)}
                  className="appearance-none w-full md:w-auto px-4 py-3 pl-12 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            )}
          </div>

          {/* Active Filters */}
          {(searchTerm || activeCategory) && (
            <div className="flex items-center justify-center mt-4 gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm("")} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {activeCategory && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
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
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="py-6 bg-gradient-to-b from-amber-50 to-white min-h-screen">
        <div className="container mx-auto px-4">
          {/* Category Showcase */}
          {categories.length > 0 && !activeCategory && !searchTerm && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Browse by Category
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group"
                  >
                    <Image
                      src={category.imageUrl || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {category.title}
                      </h3>
                      {category.description && (
                        <p className="text-sm text-gray-200 line-clamp-1 mt-1">
                          {category.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredClients.map((client) => (
              <GalleryCard key={client.id} client={client} />
            ))}
          </div>

          {/* Empty State */}
          {filteredClients.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 mb-2">
                {searchTerm
                  ? `No items found matching "${searchTerm}"`
                  : activeCategory
                    ? "No items found in this category."
                    : "No items found."}
              </p>
              <button
                onClick={clearFilters}
                className="text-amber-500 hover:text-amber-600 font-medium"
              >
                View all photos
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
