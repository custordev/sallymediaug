import ClientGallery from "@/components/(dashboard)/clientGallery";
import React from "react";

export default function ClientPage({
  params,
}: {
  params: { category: string; clientId: string };
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <ClientGallery category={params.category} clientId={params.clientId} />
      </main>
    </div>
  );
}
