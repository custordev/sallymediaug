import CategoryGallery from "@/components/(dashboard)/galleryCategory";
import React from "react";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <CategoryGallery category={params.category} />
      </main>
    </div>
  );
}
