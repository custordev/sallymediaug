import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Download, Share2, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Category } from "@/types/types";
import { Client } from "@prisma/client";

interface HeaderProps {
  activeCategory: string;
  categories: Category[];
  setActiveCategory: (id: string) => void;
  handleFavorite: (e: React.MouseEvent) => void;
  handleDownload: (e: React.MouseEvent) => void;
  handleShare: (e: React.MouseEvent) => void;
  handleSlideshow: (e: React.MouseEvent) => void;
  isSlideshow: boolean;
  isCategoryFavorited: boolean;
  initialClient: Client;
}

export function Header({
  initialClient,
  activeCategory,
  categories,
  setActiveCategory,
  handleFavorite,
  handleDownload,
  handleShare,
  handleSlideshow,
  isSlideshow,
  isCategoryFavorited,
}: HeaderProps) {
  return (
    <header className="flex justify-between items-center py-6 mb-4">
      <div className="flex flex-col">
        <Link href="/" className="text-xl font-light">
          {initialClient.title}
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
          onClick={handleFavorite}
          className={cn(
            "transition-colors",
            isCategoryFavorited ? "text-red-500 hover:text-red-600" : ""
          )}
        >
          <Heart
            className="w-5 h-5"
            fill={isCategoryFavorited ? "currentColor" : "none"}
          />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDownload}>
          <Download className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleShare}>
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
  );
}
