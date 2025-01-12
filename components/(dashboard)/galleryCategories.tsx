"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Edit2, Trash2, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const categories = [
  {
    name: "Weddings",
    slug: "weddings",
    image: "/denis-prossy/highlights/N77A8605.jpg",
  },
  {
    name: "Birthdays",
    slug: "birthdays",
    image: "/denis-prossy/highlights/N77A8619.jpg",
  },
  {
    name: "Corporate Events",
    slug: "corporate-events",
    image: "/denis-prossy/highlights/N77A8623.jpg",
  },
  {
    name: "Portraits",
    slug: "portraits",
    image: "/denis-prossy/highlights/N77A8645.jpg",
  },
  {
    name: "Graduations",
    slug: "graduations",
    image: "/denis-prossy/highlights/N77A8646.jpg",
  },
  {
    name: "Family Sessions",
    slug: "family-sessions",
    image: "/denis-prossy/highlights/N77A9197.jpg",
  },
];

export default function GalleryCategories() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-amber-700">Photo Gallery</h1>
        <Button
          variant="default"
          size="lg"
          className="bg-amber-700 hover:bg-amber-800 text-white"
        >
          <FolderPlus className="mr-2 h-5 w-5" />
          New Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group overflow-hidden">
              <CardContent className="p-0 relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 transition-opacity group-hover:opacity-70" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-2xl font-bold text-white">
                    {category.name}
                  </h2>
                </div>

                {/* Floating action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                  >
                    <Edit2 className="h-4 w-4 text-amber-700" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-white">
                <Link
                  href={`/dashboard/gallery/${category.slug}`}
                  className="text-amber-700 hover:text-amber-800 font-medium text-sm"
                >
                  View Gallery →
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
