/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCategories } from "@/actions/categories";
import { getClientById } from "@/actions/client";
import { getPhotoCategories } from "@/actions/photoCategory";

import ClientEditForm from "@/components/(dashboard)/clientEdit";

interface PageProps {
  params: Promise<{
    category: string;
    clientId: string;
  }>;
}

export default async function ClientPage({ params }: PageProps) {
  const { clientId } = await params;
  // Check if clientId exists for edit mode
  if (clientId !== "new") {
    const [client, categories, photoCategories] = await Promise.all([
      getClientById(clientId),
      getAllCategories(),
      getPhotoCategories(),
    ]);

    return (
      <div className="p-8">
        <ClientEditForm
          categories={categories ?? []}
          photoCategories={photoCategories.data}
          editingId={clientId}
          initialData={client as any}
        />
      </div>
    );
  }

  // Handle new client creation
  const [categories, photoCategories] = await Promise.all([
    getAllCategories(),
    getPhotoCategories(),
  ]);

  return (
    <div className="p-8">
      <ClientEditForm
        categories={categories}
        photoCategories={photoCategories.data}
      />
    </div>
  );
}
