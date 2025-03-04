/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllClients } from "@/actions/client";
import HomeGalleryCategories from "@/components/(front)/HomeGalleryCategories";

export default async function GalleryPage() {
  const allClients = (await getAllClients()) || [];

  // Filter out clients from the sallyconcepts category
  const filteredClients = allClients.filter((client) => {
    // Check if the client has a categoryId and if it's not related to sallyconcepts
    // This assumes there's a way to identify sallyconcepts category (by name, id, etc.)
    // Adjust the condition based on your actual data structure
    return !(
      client.categoryId &&
      (client.category?.title?.toLowerCase() === "sallyconcepts" ||
        client.category?.slug?.toLowerCase() === "sallyconcepts" ||
        client.categoryId === "sallyconcepts-id")
    ); // Replace with actual ID if known
  });

  return <HomeGalleryCategories clients={filteredClients as any} />;
}
