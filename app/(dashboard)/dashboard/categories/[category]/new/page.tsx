import { getAllCategories } from "@/actions/categories";
import { getClientById } from "@/actions/client";
import { getPhotoCategories } from "@/actions/photoCategory";
import ClientEditForm from "@/components/(dashboard)/clientEdit";
import { Category, PhotoCategory, Client } from "@prisma/client";

interface PageProps {
  params: Promise<{
    category: string;
    clientId: string;
  }>;
}

// Define a type for the photo categories response
interface PhotoCategoriesResponse {
  success: boolean;
  data: PhotoCategory[];
}

export default async function ClientPage({ params }: PageProps) {
  const { clientId } = await params;

  // Fetch all data in parallel for better performance
  const [client, categories, photoCategoriesResult] = (await Promise.all([
    getClientById(clientId),
    getAllCategories(),
    getPhotoCategories(),
  ])) as [Client | null, Category[] | null, PhotoCategoriesResponse];

  const PhotoCategories = photoCategoriesResult.success
    ? photoCategoriesResult.data
    : [];

  const safeCategories: Category[] = categories || [];
  const safePhotoCategories: PhotoCategory[] = PhotoCategories || [];

  return (
    <div className="p-8">
      <ClientEditForm
        categories={safeCategories}
        photoCategories={safePhotoCategories}
        editingId={client?.id}
        initialData={client}
      />
    </div>
  );
}
