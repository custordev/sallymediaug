import HeroSection from "@/components/(front)/heroSection";
// import PhotoGallery from "@/components/(front)/GridSection";
import { getClientById } from "@/actions/client";

export default async function GalleryDetail({
  params,
}: {
  params: Promise<{ category: string; clientId: string }>;
}) {
  const clientId = (await params).clientId;
  const fetchedClient = await getClientById(clientId);
  // console.log(fetchedClient);

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <HeroSection initialClient={fetchedClient} />
        </div>
        {/* <PhotoGallery initialClient={fetchedClient} /> */}
      </div>
    </section>
  );
}
