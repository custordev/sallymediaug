import { getCategoryById } from "@/actions/categories";
import CategoryForm from "@/components/(forms)/CategoryForm";
import React from "react";

// Define the type for params
type tParams = Promise<{ id: string }>;

export default async function Page({ params }: { params: tParams }) {
  // Await the params object to extract 'id'
  const { id } = await params;

  let category = null;

  try {
    category = await getCategoryById(id);
  } catch (error) {
    console.error("Error fetching category:", error);
    // Handle the error gracefully (optional UI feedback or redirect)
  }

  return (
    <div className="p-8">
      {category ? (
        <CategoryForm initialData={category} editingId={id} />
      ) : (
        <p className="text-red-500">Failed to load category data.</p>
      )}
    </div>
  );
}
