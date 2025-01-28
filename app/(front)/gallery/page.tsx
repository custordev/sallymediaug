import { getAllCategories } from "@/actions/categories";
import { getAllClients } from "@/actions/client";
import HomeGalleryCategories from "@/components/(front)/HomeGalleryCategories";

export default async function GalleryPage() {
  const allCategories = (await getAllCategories()) || [];
  const clients = (await getAllClients()) || [];
  console.log(allCategories);

  return (
    <HomeGalleryCategories allCategories={allCategories} clients={clients} />
  );
}
