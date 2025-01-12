/* eslint-disable @typescript-eslint/no-unused-vars */
import CategoryGallery from "@/components/(dashboard)/galleryCategory";
import React from "react";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = (await params).category;
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <CategoryGallery category={category} />
      </main>
    </div>
  );
}
