"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { galleryPhoto, photos } from "@/types/types";
import HeroSection from "@/components/heroSection";
import PhotoGallery from "@/components/GridSection";

export default function GalleryDetail({
  params,
}: {
  params: { slug: string };
}) {
  const [photo, setPhoto] = useState<galleryPhoto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundPhoto = photos.find((p) => p.slug === params.slug);
    if (foundPhoto) {
      setPhoto(foundPhoto);
    }
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!photo) {
    return notFound();
  }

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <HeroSection />
        </div>
        <PhotoGallery />
      </div>
    </section>
  );
}
