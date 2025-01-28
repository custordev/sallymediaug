/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCategories } from "@/actions/categories";
import { getClientById } from "@/actions/client";
import { getAllPhotoCategories } from "@/actions/photos";

import ClientEditForm from "@/components/(dashboard)/clientEdit";
import { Category, PhotoCategory } from "@prisma/client";

interface PageProps {
  params: {
    category: string;
    clientId: string;
  };
}

export default async function ClientPage({ params }: PageProps) {
  // Fetch all data in parallel for better performance
  const [client, categories, photoCategoriesResult] = await Promise.all([
    getClientById(params.clientId),
    getAllCategories(),
    getAllPhotoCategories(),
  ]);

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
        initialData={client as any}
      />
    </div>
  );
}
