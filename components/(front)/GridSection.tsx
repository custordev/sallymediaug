/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useCallback, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "../(global)/Header";
import { CategoryNav } from "./categoryNav";
import { PhotoGrid } from "./photoGrid";
import { FullscreenView } from "./fullScreenView";

export interface Client {
  photos?: { url: string; caption?: string }[];
  youtubeUrl?: string;
  name: string;
}

function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export default function PhotoGallery({
  initialClient,
}: {
  initialClient: Client;
}) {
  const [activeCategory, setActiveCategory] = useState("highlights");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set<string>());
  const [showAlert, setShowAlert] = useState({ show: false, message: "" });
  const [isSlideshow, setIsSlideshow] = useState(false);
  const [slideshowInterval, setSlideshowInterval] =
    useState<NodeJS.Timeout | null>(null);
  const [slideshowDelay, setSlideshowDelay] = useState(3000);

  // Transform client data into categories format
  const categories = [
    {
      id: "highlights",
      title: "Highlights",
      name: "Highlights",
      photos:
        initialClient.photos?.map((photo) => ({
          src: photo.url,
          alt: photo.caption || " photo",
        })) || [],
      youtubeUrl: initialClient.youtubeUrl || null,
    },
    // Add more categories if needed based on your data structure
  ];

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

  const videoId = initialClient.youtubeUrl
    ? getYouTubeVideoId(initialClient.youtubeUrl)
    : null;

  const handleSlideshow = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();

      if (!isSlideshow) {
        if (!selectedImage && photos.length > 0) {
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

  const handleShare = useCallback(
    async (e: React.MouseEvent, src?: string) => {
      e.stopPropagation();

      try {
        if (!src) {
          const galleryUrl = window.location.href;
          if (navigator.share) {
            await navigator.share({
              title: `${initialClient.name}'s Photo Gallery`,
              text: `Check out ${initialClient.name}'s photo gallery`,
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
            title: `Photo from ${initialClient.name}'s gallery`,
            text: `Check out this photo from ${initialClient.name}'s gallery`,
            url: src,
          });
          showAlertMessage("Shared successfully!");
        } else {
          await navigator.clipboard.writeText(src);
          showAlertMessage("Link copied to clipboard!");
        }
      } catch (error) {
        showAlertMessage("Error sharing image");
      }
    },
    [initialClient]
  );

  return (
    <div className="w-full max-w-[1800px] mx-auto px-4">
      {showAlert.show && (
        <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-auto min-w-[200px] max-w-[90%]">
          <AlertDescription>{showAlert.message}</AlertDescription>
        </Alert>
      )}

      <Header
      initialClient={initialClient as any}
        activeCategory={activeCategory}
        categories={categories as any}
        setActiveCategory={setActiveCategory}
        handleFavorite={(e) => handleFavorite(e)}
        handleDownload={(e) => handleDownload(e)}
        handleShare={(e) => handleShare(e)}
        handleSlideshow={handleSlideshow}
        isSlideshow={isSlideshow}
        isCategoryFavorited={currentCategory.photos.every((photo) =>
          favorites.has(photo.src)
        )}
      />

      <CategoryNav
        categories={categories as any}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <section className="py-6">
        <div className="flex flex-col gap-4">
          {activeCategory === "highlights" && videoId && (
            <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Highlights Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <PhotoGrid
            photos={photos as any}
            handleImageClick={handleImageClick}
            handleFavorite={handleFavorite}
            handleDownload={handleDownload}
            handleShare={handleShare}
            favorites={favorites}
          />
        </div>
      </section>

      <FullscreenView
        selectedImage={selectedImage}
        handleCloseFullscreen={() => setSelectedImage(null)}
        handlePrevImage={handlePrevImage}
        handleNextImage={handleNextImage}
        handleFavorite={handleFavorite}
        handleDownload={handleDownload}
        handleShare={handleShare}
        handleSlideshow={handleSlideshow}
        favorites={favorites}
        isSlideshow={isSlideshow}
        slideshowDelay={slideshowDelay}
        setSlideshowDelay={setSlideshowDelay}
      />
    </div>
  );
}
