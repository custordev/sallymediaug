"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Heart, Download, Share2, PlayCircle } from 'lucide-react';
import { cn } from "@/lib/utils";
import { formatTime } from "@/types/types";

interface FullscreenViewProps {
  selectedImage: string | null;
  handleCloseFullscreen: () => void;
  handlePrevImage: () => void;
  handleNextImage: () => void;
  handleFavorite: (e: React.MouseEvent, src: string) => void;
  handleDownload: (e: React.MouseEvent, src: string) => void;
  handleShare: (e: React.MouseEvent, src: string) => void;
  handleSlideshow: (e: React.MouseEvent) => void;
  favorites: Set<string>;
  isSlideshow: boolean;
  slideshowDelay: number;
  setSlideshowDelay: (delay: number) => void;
}

export function FullscreenView({
  selectedImage,
  handleCloseFullscreen,
  handlePrevImage,
  handleNextImage,
  handleFavorite,
  handleDownload,
  handleShare,
  handleSlideshow,
  favorites,
  isSlideshow,
  slideshowDelay,
  setSlideshowDelay,
}: FullscreenViewProps) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'Escape') handleCloseFullscreen();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevImage, handleNextImage, handleCloseFullscreen]);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      handleNextImage();
    }

    if (touchStart - touchEnd < -150) {
      handlePrevImage();
    }
  };

  if (!selectedImage) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={handleCloseFullscreen}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20"
        onClick={handleCloseFullscreen}
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

      <div 
        ref={containerRef}
        className="relative max-w-7xl w-full h-[85vh] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
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
            onClick={() => setSlideshowDelay(Math.min(slideshowDelay + 500, 5000))}
            className="text-white hover:text-blue-400"
          >
            Slower
          </button>
          <span className="text-white">{formatTime(slideshowDelay / 1000)}</span>
          <button
            onClick={() => setSlideshowDelay(Math.max(slideshowDelay - 500, 1000))}
            className="text-white hover:text-blue-400"
          >
            Faster
          </button>
        </div>
      )}
    </div>
  );
}

