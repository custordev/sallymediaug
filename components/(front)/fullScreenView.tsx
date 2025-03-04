/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Heart, Download, Share2, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Types
export type FormatTimeFunction = (seconds: number) => string

interface FullscreenViewProps {
  selectedImage: string | null
  handleCloseFullscreen: () => void
  handlePrevImage: () => void
  handleNextImage: () => void
  handleFavorite: (e: React.MouseEvent, src: string) => void
  handleDownload: (e: React.MouseEvent, src: string) => void
  handleShare: (e: React.MouseEvent, src: string) => void
  handleSlideshow: (e: React.MouseEvent) => void
  favorites: Set<string>
  isSlideshow: boolean
  slideshowDelay: number
  setSlideshowDelay: (delay: number) => void
}

// Format time helper function
export const formatTime: FormatTimeFunction = (seconds) => {
  return `${seconds.toFixed(1)}s`
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
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Memoize event handlers for better performance
  const memoizedPrevImage = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation()
      handlePrevImage()
    },
    [handlePrevImage],
  )

  const memoizedNextImage = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation()
      handleNextImage()
    },
    [handleNextImage],
  )

  const memoizedCloseFullscreen = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation()
      handleCloseFullscreen()
    },
    [handleCloseFullscreen],
  )

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") memoizedPrevImage()
      if (e.key === "ArrowRight") memoizedNextImage()
      if (e.key === "Escape") memoizedCloseFullscreen()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [memoizedPrevImage, memoizedNextImage, memoizedCloseFullscreen])

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedImage])

  // Reset image loaded state when selected image changes
  useEffect(() => {
    setIsImageLoaded(false)
  }, [selectedImage])

  // Touch handlers for swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(null)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isSignificantSwipe = Math.abs(distance) > 100

    if (isSignificantSwipe) {
      if (distance > 0) {
        memoizedNextImage()
      } else {
        memoizedPrevImage()
      }
    }

    // Reset touch values
    setTouchStart(null)
    setTouchEnd(null)
  }, [touchStart, touchEnd, memoizedNextImage, memoizedPrevImage])

  // Handle image loading
  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true)
  }, [])

  if (!selectedImage) return null

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={memoizedCloseFullscreen}
    >
      {/* Close Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-amber-500 hover:text-black border-white/20 z-50 transition-all duration-200"
        onClick={memoizedCloseFullscreen}
        aria-label="Close fullscreen view"
      >
        <X className="w-5 h-5" />
      </Button>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-amber-500 hover:text-black border-white/20 z-50 transition-all duration-200"
        onClick={(e) => {
          e.stopPropagation()
          memoizedPrevImage(e)
        }}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-amber-500 hover:text-black border-white/20 z-50 transition-all duration-200"
        onClick={(e) => {
          e.stopPropagation()
          memoizedNextImage(e)
        }}
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Loading Indicator */}
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-amber-400 border-t-transparent animate-spin"></div>
        </div>
      )}

      {/* Image Container */}
      <div
        ref={containerRef}
        className="relative max-w-7xl w-full h-[85vh] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          ref={imageRef as any}
          src={selectedImage || "/placeholder.svg"}
          alt="Selected photo"
          fill
          className={cn("object-contain transition-opacity duration-300", isImageLoaded ? "opacity-100" : "opacity-0")}
          onLoad={handleImageLoad}
          priority
          sizes="(max-width: 768px) 100vw, 90vw"
        />
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-4 flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "text-white hover:bg-amber-500 hover:text-black transition-all duration-200",
            favorites.has(selectedImage) ? "text-amber-500" : "",
          )}
          onClick={(e) => {
            e.stopPropagation()
            handleFavorite(e, selectedImage)
          }}
          aria-label={favorites.has(selectedImage) ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className="w-5 h-5" fill={favorites.has(selectedImage) ? "currentColor" : "none"} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-amber-500 hover:text-black transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation()
            handleDownload(e, selectedImage)
          }}
          aria-label="Download image"
        >
          <Download className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-amber-500 hover:text-black transition-all duration-200"
          onClick={(e) => {
            e.stopPropagation()
            handleShare(e, selectedImage)
          }}
          aria-label="Share image"
        >
          <Share2 className="w-5 h-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "text-white hover:bg-amber-500 hover:text-black transition-all duration-200",
            isSlideshow ? "text-amber-500" : "",
          )}
          onClick={(e) => {
            e.stopPropagation()
            handleSlideshow(e)
          }}
          aria-label={isSlideshow ? "Stop slideshow" : "Start slideshow"}
        >
          <PlayCircle className="w-5 h-5" fill={isSlideshow ? "currentColor" : "none"} />
        </Button>
      </div>

      {/* Slideshow Controls */}
      {isSlideshow && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSlideshowDelay(Math.min(slideshowDelay + 500, 5000))
            }}
            className="text-white hover:text-amber-400 transition-colors text-sm"
          >
            Slower
          </button>
          <span className="text-amber-400 font-medium">{formatTime(slideshowDelay / 1000)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSlideshowDelay(Math.max(slideshowDelay - 500, 1000))
            }}
            className="text-white hover:text-amber-400 transition-colors text-sm"
          >
            Faster
          </button>
        </div>
      )}
    </div>
  )
}

