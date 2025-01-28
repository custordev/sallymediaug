import { getAllCategories } from "@/actions/categories";
import GalleryCategories from "@/components/(dashboard)/galleryCategories";
import { Category } from "@prisma/client";

import React from "react";

export default async function GalleryPage() {
    const categories: Category[] = (await getAllCategories()) || [];
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <GalleryCategories data={categories}/>
      </main>
    </div>
  );
}
