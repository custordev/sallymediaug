import { getAllClients } from "@/actions/client";
import CategoryGallery from "@/components/(dashboard)/galleryCategory";
import { Client, Category } from "@prisma/client";

// Define the types for our data structures
interface DbClient extends Client {
  category: Category;
}

interface MappedClient {
  id: string;
  name: string;
  image: string;
  date: string;
  category: string;
}

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: paramCategory } = await params;
  const allClients = ((await getAllClients()) || []) as unknown as DbClient[];
  const categorySlug = paramCategory.toLowerCase();

  // Filter clients by matching the category slug
  const categoryClients = allClients.filter(
    (client) => client.category.title.toLowerCase() === categorySlug
  );

  // Map to match the Client type expected by CategoryGallery
  const mappedClients: MappedClient[] = categoryClients.map((client) => ({
    id: client.id,
    name: client.title, // Map from title to name
    image: client.imageUrl || "", // Map from imageUrl to image
    date: client.eventDate.toISOString(),
    category: client.category.title, // Use category title
  }));

  console.log("Mapped clients:", mappedClients);

  return (
    <div className="min-h-screen bg-background">
      <CategoryGallery category={categorySlug} clients={mappedClients} />
    </div>
  );
}
