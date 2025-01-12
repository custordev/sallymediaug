"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Download,
  Heart,
  PlayCircle,
  Share,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Photo {
  src: string;
}

interface Category {
  id: string;
  name: string;
  photos: Photo[];
}

const categories: Category[] = [
  {
    id: "highlights",
    name: "Highlights",
    photos: [
      { src: "/images/N77A8602.jpg" },
      { src: "/images/N77A8604.jpg" },
      { src: "/images/N77A8605.jpg" },
      { src: "/images/N77A8619.jpg" },
      { src: "/images/N77A8623.jpg" },
      { src: "/images/N77A8645.jpg" },
      { src: "/images/N77A8646.jpg" },
      { src: "/images/N77A9197.jpg" },
      { src: "/images/N77A9204.jpg" },
      { src: "/images/N77A9398.jpg" },
    ],
  },
   {
    id: "morning",
    name: "Morning",
    photos: [
      { src: "/images/N77A8602.jpg" },
      { src: "/images/N77A8604.jpg" },
      { src: "/images/N77A8605.jpg" },
    ],
  },
  {
    id: "salon",
    name: "Salon",
    photos: [{ src: "/images/N77A8619.jpg" }, { src: "/images/N77A8623.jpg" }],
  },
  {
    id: "church",
    name: "Church",
    photos: [{ src: "/images/N77A8645.jpg" }, { src: "/images/N77A8646.jpg" }],
  },
  {
    id: "gardens",
    name: "Gardens",
    photos: [{ src: "/images/N77A9197.jpg" }, { src: "/images/N77A9204.jpg" }],
  },
  {
    id: "decor",
    name: "Décor",
    photos: [{ src: "/images/N77A9398.jpg" }],
  },
  // ... other categories
];

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState("highlights");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const currentCategory =
    categories.find((cat) => cat.id === activeCategory) || categories[0];
  const photos = currentCategory.photos;

  const columns = photos.reduce(
    (acc: Photo[][], photo, index) => {
      const columnIndex = index % 5;
      if (!acc[columnIndex]) acc[columnIndex] = [];
      acc[columnIndex].push(photo);
      return acc;
    },
    Array(5)
      .fill(null)
      .map(() => [])
  );

  const handleImageClick = useCallback((src: string, index: number) => {
    setSelectedImage(src);
    setCurrentImageIndex(index);
  }, []);

  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
    setSelectedImage(
      photos[(currentImageIndex - 1 + photos.length) % photos.length].src
    );
  }, [photos, currentImageIndex]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
    setSelectedImage(photos[(currentImageIndex + 1) % photos.length].src);
  }, [photos, currentImageIndex]);

  const handleDownload = useCallback((e: React.MouseEvent, src: string) => {
    e.stopPropagation();
    // Implement download functionality
    console.log("Downloading:", src);
  }, []);

  const handleFavorite = useCallback((e: React.MouseEvent, src: string) => {
    e.stopPropagation();
    // Implement favorite functionality
    console.log("Favoriting:", src);
  }, []);

  const handleShare = useCallback((e: React.MouseEvent, src: string) => {
    e.stopPropagation();
    // Implement share functionality
    console.log("Sharing:", src);
  }, []);

  return (
    <div className="w-full max-w-[1800px] mx-auto px-4">
      {/* Header (Desktop and Mobile) */}
      <header className="flex justify-between items-center py-6 mb-4">
        <div className="flex flex-col">
          <Link href="/" className="text-xl font-light">
            Denis + Prossy
          </Link>
          <Link href="/" className="text-xs">
            SALLY MEDIA UG
          </Link>
        </div>
        <nav className="hidden lg:flex items-center space-x-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "text-sm transition-all duration-300 hover:text-black relative py-2",
                activeCategory === category.id
                  ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black after:transition-transform after:duration-300"
                  : "text-gray-500"
              )}
            >
              {category.name}
            </button>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Download className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <PlayCircle className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="lg:hidden overflow-x-auto mb-6">
        <div className="flex whitespace-nowrap gap-8 pb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "text-sm font-light transition-colors relative",
                activeCategory === category.id
                  ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black"
                  : "text-gray-500"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Content Area */}
      <section className="py-6">
        <div className="flex flex-col gap-4">
          {activeCategory === "highlights" && (
            <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/z6O6dVXDh2k"
                title="Highlights Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="grid gap-4">
                {column.map((photo, photoIndex) => (
                  <div
                    key={photoIndex}
                    className="relative group cursor-pointer"
                    onClick={() =>
                      handleImageClick(
                        photo.src,
                        columnIndex * column.length + photoIndex
                      )
                    }
                  >
                    <Image
                      src={photo.src}
                      alt={`Wedding photo ${columnIndex}-${photoIndex}`}
                      width={500}
                      height={500}
                      className="h-auto max-w-full rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={(e) => handleFavorite(e, photo.src)}
                      >
                        <Heart className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={(e) => handleDownload(e, photo.src)}
                      >
                        <Download className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={(e) => handleShare(e, photo.src)}
                      >
                        <Share className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage();
            }}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage();
            }}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
          <div className="relative max-w-7xl w-full h-[85vh]">
            <Image
              src={selectedImage}
              alt="Selected wedding photo"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite(e, selectedImage);
              }}
            >
              <Heart className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(e, selectedImage);
              }}
            >
              <Download className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                handleShare(e, selectedImage);
              }}
            >
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden">
        <div className="overflow-x-auto">
          <div className="flex whitespace-nowrap px-4 py-3 gap-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "text-sm transition-colors",
                  activeCategory === category.id
                    ? "text-black"
                    : "text-gray-500"
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
