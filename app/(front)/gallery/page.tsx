/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllClients } from "@/actions/client";
import HomeGalleryCategories from "@/components/(front)/HomeGalleryCategories";

export default async function GalleryPage() {
  const clients = (await getAllClients()) || [];

  return <HomeGalleryCategories clients={clients as any} />;
}
