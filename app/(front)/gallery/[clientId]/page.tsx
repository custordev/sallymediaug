/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(front)/gallery/[clientId]/page.tsx
import HeroSection from "@/components/(front)/heroSection";
import PhotoGallery from "@/components/(front)/GridSection";
import { getClientById } from "@/actions/client";
import { getClientPhotos } from "@/actions/photos";
import { getPhotoCategories } from "@/actions/photoCategory";

interface PageParams {
  params: {
    category?: string;
    clientId: string;
  };
}

export default async function GalleryDetail({ params }: PageParams) {
  const { clientId } = params;

  // Fetch all data in parallel for better performance
  const [fetchedClient, photoCategories, clientPhotos] = await Promise.all([
    getClientById(clientId),
    getPhotoCategories(clientId), // Pass the clientId here
    getClientPhotos(clientId),
  ]);

  if (!fetchedClient) {
    return <div>Client not found</div>;
  }

  // Check if we have successful responses
  if (!photoCategories.success || !clientPhotos.success) {
    return <div>Error loading gallery data</div>;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <HeroSection initialClient={fetchedClient} />
        </div>
        <PhotoGallery
          initialClient={fetchedClient as any}
          photoCategories={photoCategories.data}
          clientPhotos={clientPhotos.data as any}
        />
      </div>
    </section>
  );
}
