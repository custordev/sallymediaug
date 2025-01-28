import { getAllClients } from "@/actions/client";
import CategoryGallery from "@/components/(dashboard)/galleryCategory";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const allClients = (await getAllClients()) || [];
  const categorySlug = params.category.toLowerCase();

  // Filter clients by matching the category slug
  const categoryClients = allClients.filter(
    (client) => client.category.title.toLowerCase() === categorySlug
  );

  // Map to match the Client type expected by CategoryGallery
  const mappedClients = categoryClients.map((client) => ({
    id: client.id,
    name: client.title, // Map from title to name
    image: client.imageUrl || "", // Map from imageUrl to image
    date: client.eventDate.toISOString(),
    category: client.category.title, // Use category slug instead of categoryId
  }));

  console.log("Mapped clients:", mappedClients);

  return (
    <div className="min-h-screen bg-background">
      <CategoryGallery category={categorySlug} clients={mappedClients} />
    </div>
  );
}
