import GalleryCategories from "@/components/(dashboard)/galleryCategories";
import React from "react";

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <GalleryCategories />
      </main>
    </div>
  );
}
