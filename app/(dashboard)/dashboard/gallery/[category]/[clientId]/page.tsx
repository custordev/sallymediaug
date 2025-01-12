import ClientGallery from "@/components/(dashboard)/clientGallery";
import React from "react";

export default async function ClientPage({
  params,
}: {
  params: Promise<{ category: string; clientId: string }>;
}) {
  const category = (await params).category;
  const clientId = (await params).clientId;
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <ClientGallery category={category} clientId={clientId} />
      </main>
    </div>
  );
}
