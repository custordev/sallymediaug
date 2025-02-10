/* eslint-disable @typescript-eslint/no-explicit-any */
import HeroSection from "@/components/(front)/heroSection";
import PhotoGallery from "@/components/(front)/GridSection";
import { getClientById } from "@/actions/client";
// import { getPhotoCategories } from "@/actions/photoCategories";
import { getClientPhotos } from "@/actions/photos";
import { getPhotoCategories } from "@/actions/photoCategory";

export default async function GalleryDetail({
  params,
}: {
  params: { clientId: string };
}) {
  const clientId = params.clientId;
  const fetchedClient = await getClientById(clientId);
  const photoCategories = await getPhotoCategories();
  const clientPhotos = await getClientPhotos(clientId);

  if (!fetchedClient) {
    return <div>Client not found</div>;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <HeroSection initialClient={fetchedClient} />
        </div>
        {fetchedClient && (
          <PhotoGallery
            initialClient={fetchedClient as any}
            photoCategories={photoCategories.data as any}
            clientPhotos={clientPhotos.data as any}
          />
        )}
      </div>
    </section>
  );
}
