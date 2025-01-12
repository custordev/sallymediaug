// "use client";


import HeroSection from "@/components/heroSection";
import PhotoGallery from "@/components/GridSection";

export default async function GalleryDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;


  
  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <HeroSection slug={slug}/>
        </div>
        <PhotoGallery />
      </div>
    </section>
  );
}
