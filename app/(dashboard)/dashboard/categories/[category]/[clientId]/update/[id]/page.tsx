/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCategories } from "@/actions/categories";
import { getClientById } from "@/actions/client";
import { getAllPhotoCategories } from "@/actions/photos";

import ClientEditForm from "@/components/(dashboard)/clientEdit";

interface PageProps {
  params: {
    clientId: string;
  };
}

export default async function ClientPage({ params }: PageProps) {
  // Check if clientId exists for edit mode
  if (params.clientId !== "new") {
    const [client, categories, photoCategories] = await Promise.all([
      getClientById(params.clientId),
      getAllCategories(),
      getAllPhotoCategories(),
    ]);

    return (
      <div className="p-8">
        <ClientEditForm
          categories={categories ?? []}
          photoCategories={photoCategories.data}
          editingId={params.clientId}
          initialData={client as any}
        />
      </div>
    );
  }

  // Handle new client creation
  const [categories, photoCategories] = await Promise.all([
    getAllCategories(),
    getAllPhotoCategories(),
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
