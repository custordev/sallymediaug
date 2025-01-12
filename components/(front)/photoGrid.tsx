import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Download, Share2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Photo } from "@/types/types";


interface PhotoGridProps {
  photos: Photo[];
  handleImageClick: (src: string, index: number) => void;
  handleFavorite: (e: React.MouseEvent, src: string) => void;
  handleDownload: (e: React.MouseEvent, src: string) => void;
  handleShare: (e: React.MouseEvent, src: string) => void;
  favorites: Set<string>;
}

export function PhotoGrid({
  photos,
  handleImageClick,
  handleFavorite,
  handleDownload,
  handleShare,
  favorites,
}: PhotoGridProps) {
  return (
    <div className="grid grid-cols-2  lg:grid-cols-4 xl:grid-cols-6 gap-4">
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
  );
}

