/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllClients } from "@/actions/client";
import Gallery from "@/components/(front)/SallyConceptsGallery";
export default async function SallyConceptsRoute() {
  const allClients = (await getAllClients()) || [];

  // Filter to only include clients from the sallyconcepts category
  const sallyConceptsClients = allClients.filter((client) => {
    // Check if the client has a categoryId and if it's related to sallyconcepts
    // Adjust the condition based on your actual data structure
    return (
      client.categoryId &&
      (client.category?.title?.toLowerCase() === "sallyconcepts" ||
        client.category?.slug?.toLowerCase() === "sallyconcepts" ||
        client.categoryId === "sallyconcepts-id")
    ); // Replace with actual ID if known
  });

  return <Gallery clients={sallyConceptsClients as any} />;
}
