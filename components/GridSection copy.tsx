"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Download,
  Heart,
  PlayCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Share2,
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
      { src: "/denis-prossy/highlights/N77A8605.jpg" },
      { src: "/denis-prossy/highlights/N77A8619.jpg" },
      { src: "/denis-prossy/highlights/N77A8623.jpg" },
      { src: "/denis-prossy/highlights/N77A8645.jpg" },
      { src: "/denis-prossy/highlights/N77A8646.jpg" },
      { src: "/denis-prossy/highlights/N77A9197.jpg" },
      { src: "/denis-prossy/highlights/N77A9204.jpg" },
      { src: "/denis-prossy/highlights/N77A8604.jpg" },
      { src: "/denis-prossy/highlights/N77A8669.jpg" },
      { src: "/denis-prossy/highlights/N77A9641.jpg" },
      { src: "/denis-prossy/highlights/N77A9096.jpg" },
      { src: "/denis-prossy/highlights/N77A9181.jpg" },
      { src: "/denis-prossy/highlights/N77A9186.jpg" },
      { src: "/denis-prossy/highlights/N77A9398.jpg" },
      { src: "/denis-prossy/highlights/N77A9399.jpg" },
      { src: "/denis-prossy/highlights/N77A9428.jpg" },

      { src: "/denis-prossy/function/N77A9252.jpg" },
      { src: "/denis-prossy/highlights/N77A9254.jpg" },
      { src: "/denis-prossy/highlights/N77A9274.jpg" },
      { src: "/denis-prossy/highlights/N77A9272.jpg" },
      { src: "/denis-prossy/highlights/N77A9252.jpg" },
      { src: "/denis-prossy/highlights/N77A8681.jpg" },
      { src: "/denis-prossy/highlights/N77A8656.jpg" },
      { src: "/denis-prossy/highlights/N77A8657.jpg" },
      { src: "/denis-prossy/highlights/N77A8602.jpg" },
      { src: "/denis-prossy/highlights/N77A8698.jpg" },
    ],
  },

  {
    id: "church",
    name: "Church",
    photos: [
      { src: "/denis-prossy/church/N77A8538.jpg" },
      { src: "/denis-prossy/church/N77A8558.jpg" },
      { src: "/denis-prossy/church/N77A8558.jpg" },
      { src: "/denis-prossy/church/N77A8570.jpg" },
      // { src: "/denis-prossy/church/N77A8574.jpg" },
      { src: "/denis-prossy/church/N77A8582.jpg" },
      { src: "/denis-prossy/church/N77A8594.jpg" },
      { src: "/denis-prossy/church/N77A8547.jpg" },
      { src: "/denis-prossy/church/N77A8555.jpg" },
    ],
  },
  {
    id: "decor",
    name: "Décor",
    photos: [
      { src: "/denis-prossy/decor/N77A8500.jpg" },
      { src: "/denis-prossy/decor/N77A8509.jpg" },
      { src: "/denis-prossy/decor/N77A8491.jpg" },
      { src: "/denis-prossy/decor/N77A8497.jpg" },
      { src: "/denis-prossy/decor/N77A8499.jpg" },
      { src: "/denis-prossy/decor/N77A8529.jpg" },
    ],
  },
  {
    id: "greetings",
    name: "Greetings",
    photos: [
      { src: "/denis-prossy/greetings/N77A8743.jpg" },
      { src: "/denis-prossy/greetings/N77A8749.jpg" },
      { src: "/denis-prossy/greetings/N77A8771.jpg" },
      { src: "/denis-prossy/greetings/N77A8803.jpg" },
      { src: "/denis-prossy/greetings/N77A8864.jpg" },
      { src: "/denis-prossy/greetings/N77A9450.jpg" },
      { src: "/denis-prossy/greetings/N77A9011.jpg" },
      { src: "/denis-prossy/greetings/N77A9025.jpg" },
      { src: "/denis-prossy/greetings/N77A9024.jpg" },
      { src: "/denis-prossy/greetings/N77A9445.jpg" },
      { src: "/denis-prossy/greetings/N77A9018.jpg" },
      { src: "/denis-prossy/greetings/N77A9007.jpg" },

      { src: "/denis-prossy/greetings/N77A8858.jpg" },
      { src: "/denis-prossy/greetings/N77A8861.jpg" },
      { src: "/denis-prossy/greetings/N77A8799.jpg" },
      { src: "/denis-prossy/greetings/N77A8784.jpg" },
      { src: "/denis-prossy/greetings/N77A8802.jpg" },
      { src: "/denis-prossy/greetings/N77A8808.jpg" },
      { src: "/denis-prossy/greetings/N77A8813.jpg" },
      { src: "/denis-prossy/greetings/N77A8817.jpg" },
      { src: "/denis-prossy/greetings/N77A8826.jpg" },
      { src: "/denis-prossy/greetings/N77A8874.jpg" },
      { src: "/denis-prossy/greetings/N77A8879.jpg" },
      { src: "/denis-prossy/greetings/N77A8895.jpg" },
      { src: "/denis-prossy/greetings/N77A8903.jpg" },
      { src: "/denis-prossy/greetings/N77A8886.jpg" },
      { src: "/denis-prossy/greetings/N77A8943.jpg" },
      { src: "/denis-prossy/greetings/N77A8951.jpg" },
      { src: "/denis-prossy/greetings/N77A8932.jpg" },
      { src: "/denis-prossy/greetings/N77A8919.jpg" },
      { src: "/denis-prossy/greetings/N77A8969.jpg" },
    ],
  },
  {
    id: "function",
    name: "Function",
    photos: [
      { src: "/denis-prossy/function/N77A9074.jpg" },
      { src: "/denis-prossy/function/N77A9075.jpg" },
      { src: "/denis-prossy/function/N77A9077.jpg" },
      { src: "/denis-prossy/function/N77A9080.jpg" },
      { src: "/denis-prossy/function/N77A9100.jpg" },
      { src: "/denis-prossy/function/N77A9106.jpg" },
      { src: "/denis-prossy/function/N77A9107.jpg" },
      { src: "/denis-prossy/function/N77A9121.jpg" },
      { src: "/denis-prossy/function/N77A9135.jpg" },
      { src: "/denis-prossy/function/N77A9160.jpg" },

      { src: "/denis-prossy/function/N77A9263.jpg" },
      { src: "/denis-prossy/function/N77A9131.jpg" },
      { src: "/denis-prossy/function/N77A9131.jpg" },
      { src: "/denis-prossy/function/N77A9115.jpg" },
      { src: "/denis-prossy/function/N77A9118.jpg" },
      { src: "/denis-prossy/function/N77A9103.jpg" },
      { src: "/denis-prossy/function/N77A9090.jpg" },

      { src: "/denis-prossy/function/N77A9042.jpg" },
      { src: "/denis-prossy/function/N77A9246.jpg" },
      { src: "/denis-prossy/function/N77A9058.jpg" },

      { src: "/denis-prossy/function/N77A9040.jpg" },
      { src: "/denis-prossy/function/N77A9050.jpg" },
      { src: "/denis-prossy/function/N77A9265.jpg" },
      { src: "/denis-prossy/function/N77A9041.jpg" },
      { src: "/denis-prossy/function/N77A8971.jpg" },
      { src: "/denis-prossy/function/N77A8973.jpg" },
      { src: "/denis-prossy/function/N77A8982.jpg" },
      { src: "/denis-prossy/function/N77A9000.jpg" },
      { src: "/denis-prossy/function/N77A9053.jpg" },
      { src: "/denis-prossy/function/N77A9056.jpg" },
      { src: "/denis-prossy/function/N77A9292.jpg" },
      { src: "/denis-prossy/function/N77A9340.jpg" },
      { src: "/denis-prossy/function/N77A9360.jpg" },
      { src: "/denis-prossy/function/N77A9366.jpg" },
      { src: "/denis-prossy/function/N77A9380.jpg" },
      { src: "/denis-prossy/function/N77A9407.jpg" },
      { src: "/denis-prossy/function/N77A9456.jpg" },
      { src: "/denis-prossy/function/N77A9458.jpg" },
      // { src: "/denis-prossy/function/N77A9464.jpg" },
      { src: "/denis-prossy/function/N77A9480.jpg" },
      { src: "/denis-prossy/function/N77A9483.jpg" },
      { src: "/denis-prossy/function/N77A9453.jpg" },
      // { src: "/denis-prossy/function/N77A9428.jpg" },
      { src: "/denis-prossy/function/N77A9472.jpg" },
      { src: "/denis-prossy/function/N77A9486.jpg" },
      { src: "/denis-prossy/function/N77A9511.jpg" },
      { src: "/denis-prossy/function/N77A9542.jpg" },
      { src: "/denis-prossy/function/N77A9545.jpg" },
      { src: "/denis-prossy/function/N77A9569.jpg" },
      { src: "/denis-prossy/function/N77A9552.jpg" },
      { src: "/denis-prossy/function/N77A9558.jpg" },
      { src: "/denis-prossy/function/N77A9563.jpg" },
      { src: "/denis-prossy/function/N77A9582.jpg" },
      { src: "/denis-prossy/function/N77A9505.jpg" },
      { src: "/denis-prossy/function/N77A9518.jpg" },
      { src: "/denis-prossy/function/N77A9526.jpg" },
      { src: "/denis-prossy/function/N77A9529.jpg" },
      { src: "/denis-prossy/function/N77A9558.jpg" },
    ],
  },
  // ... other categories
];

export default function PhotoGallery() {
  const [activeCategory, setActiveCategory] = useState("highlights");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set<string>());
  const [showAlert, setShowAlert] = useState({ show: false, message: "" });
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [slideshowInterval, setSlideshowInterval] =
    useState<NodeJS.Timeout | null>(null);
  const [slideshowDelay, setSlideshowDelay] = useState(3000); // 3 seconds default

  const currentCategory =
    categories.find((cat) => cat.id === activeCategory) || categories[0];
  const photos = currentCategory.photos;

  useEffect(() => {
    return () => {
      if (slideshowInterval) {
        clearInterval(slideshowInterval);
      }
    };
  }, [slideshowInterval]);

  const showAlertMessage = (message: string) => {
    setShowAlert({ show: true, message });
    setTimeout(() => setShowAlert({ show: false, message: "" }), 3000);
  };

  const handleSlideshow = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();

      if (!isSlideshow) {
        if (!selectedImage) {
          setSelectedImage(photos[0].src);
          setCurrentImageIndex(0);
        }

        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % photos.length;
            setSelectedImage(photos[newIndex].src);
            return newIndex;
          });
        }, slideshowDelay);

        setSlideshowInterval(interval);
        setIsSlideshow(true);
        showAlertMessage("Slideshow started");
      } else {
        if (slideshowInterval) {
          clearInterval(slideshowInterval);
          setSlideshowInterval(null);
        }
        setIsSlideshow(false);
        showAlertMessage("Slideshow stopped");
      }
    },
    [isSlideshow, selectedImage, photos, slideshowDelay]
  );

  const handleImageClick = useCallback(
    (src: string, index: number) => {
      if (isSlideshow) {
        if (slideshowInterval) {
          clearInterval(slideshowInterval);
          setSlideshowInterval(null);
        }
        setIsSlideshow(false);
      }
      setSelectedImage(src);
      setCurrentImageIndex(index);
    },
    [isSlideshow, slideshowInterval]
  );

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

  const handleDownload = useCallback(
    (e: React.MouseEvent, src?: string) => {
      e.stopPropagation();

      if (!src) {
        currentCategory.photos.forEach((photo) => {
          const link = document.createElement("a");
          link.href = photo.src;
          const filename = photo.src.split("/").pop() || "image";
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
        showAlertMessage("Downloading all photos from this category!");
        return;
      }

      const link = document.createElement("a");
      link.href = src;
      const filename = src.split("/").pop() || "image";
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showAlertMessage("Download started!");
    },
    [currentCategory]
  );

  const handleFavorite = useCallback(
    (e: React.MouseEvent, src?: string) => {
      e.stopPropagation();

      if (!src) {
        setFavorites((prev) => {
          const newFavorites = new Set(prev);
          const areAllFavorited = currentCategory.photos.every((photo) =>
            newFavorites.has(photo.src)
          );

          if (areAllFavorited) {
            currentCategory.photos.forEach((photo) =>
              newFavorites.delete(photo.src)
            );
            showAlertMessage("Removed all from favorites");
          } else {
            currentCategory.photos.forEach((photo) =>
              newFavorites.add(photo.src)
            );
            showAlertMessage("Added all to favorites!");
          }
          return newFavorites;
        });
        return;
      }

      setFavorites((prev) => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(src)) {
          newFavorites.delete(src);
          showAlertMessage("Removed from favorites");
        } else {
          newFavorites.add(src);
          showAlertMessage("Added to favorites!");
        }
        return newFavorites;
      });
    },
    [currentCategory]
  );

  const handleShare = useCallback(async (e: React.MouseEvent, src?: string) => {
    e.stopPropagation();

    try {
      if (!src) {
        const galleryUrl = window.location.href;
        if (navigator.share) {
          await navigator.share({
            title: "Wedding Photo Gallery",
            text: "Check out this wedding photo gallery",
            url: galleryUrl,
          });
          showAlertMessage("Shared gallery successfully!");
        } else {
          await navigator.clipboard.writeText(galleryUrl);
          showAlertMessage("Gallery link copied to clipboard!");
        }
        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: "Check out this wedding photo",
          text: "I found this beautiful wedding photo",
          url: src,
        });
        showAlertMessage("Shared successfully!");
      } else {
        await navigator.clipboard.writeText(src);
        showAlertMessage("Link copied to clipboard!");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showAlertMessage("Error sharing image");
    }
  }, []);

  return (
    <div className="w-full max-w-[1800px] mx-auto px-4">
      {showAlert.show && (
        <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-auto min-w-[200px] max-w-[90%]">
          <AlertDescription>{showAlert.message}</AlertDescription>
        </Alert>
      )}

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
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleFavorite(e)}
            className={cn(
              "transition-colors",
              currentCategory.photos.every((photo) => favorites.has(photo.src))
                ? "text-red-500 hover:text-red-600"
                : ""
            )}
          >
            <Heart
              className="w-5 h-5"
              fill={
                currentCategory.photos.every((photo) =>
                  favorites.has(photo.src)
                )
                  ? "currentColor"
                  : "none"
              }
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleDownload(e)}
          >
            <Download className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={(e) => handleShare(e)}>
            <Share2 className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSlideshow}
            className={cn(
              "transition-colors",
              isSlideshow ? "text-blue-500 hover:text-blue-600" : ""
            )}
          >
            <PlayCircle className="w-5 h-5" />
          </Button>
        </div>
      </header>

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

      <section className="py-6">
        <div className="flex flex-col gap-4">
          {activeCategory === "highlights" && (
            <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/LrIXxSMqS98"
                title="Highlights Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="relative group cursor-pointer"
                onClick={() => handleImageClick(photo.src, index)}
              >
                <Image
                  src={photo.src}
                  alt={`Wedding photo ${index}`}
                  width={500}
                  height={500}
                  className="h-auto max-w-full rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "text-white hover:bg-white/20",
                      favorites.has(photo.src) ? "text-red-500" : ""
                    )}
                    onClick={(e) => handleFavorite(e, photo.src)}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={favorites.has(photo.src) ? "currentColor" : "none"}
                    />
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
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => {
            if (isSlideshow) {
              handleSlideshow();
            }
            setSelectedImage(null);
          }}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => {
              if (isSlideshow) {
                handleSlideshow();
              }
              setSelectedImage(null);
            }}
          >
            <X className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              if (isSlideshow) {
                handleSlideshow();
              }
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
              if (isSlideshow) {
                handleSlideshow();
              }
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
              className={cn(
                "text-white hover:bg-white/20",
                favorites.has(selectedImage) ? "text-red-500" : ""
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleFavorite(e, selectedImage);
              }}
            >
              <Heart
                className="w-5 h-5"
                fill={favorites.has(selectedImage) ? "currentColor" : "none"}
              />
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
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "text-white hover:bg-white/20",
                isSlideshow ? "text-blue-500" : ""
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleSlideshow(e);
              }}
            >
              <PlayCircle className="w-5 h-5" />
            </Button>
          </div>

          {isSlideshow && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full flex items-center gap-4">
              <button
                onClick={() =>
                  setSlideshowDelay((d) => Math.min(d + 500, 5000))
                }
                className="text-white hover:text-blue-400"
              >
                Slower
              </button>
              <span className="text-white">{slideshowDelay / 1000}s</span>
              <button
                onClick={() =>
                  setSlideshowDelay((d) => Math.max(d - 500, 1000))
                }
                className="text-white hover:text-blue-400"
              >
                Faster
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
