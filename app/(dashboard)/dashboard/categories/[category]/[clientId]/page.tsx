/* eslint-disable @typescript-eslint/no-unused-vars */
import { getClientById } from "@/actions/client";
import ClientGallery from "@/components/(dashboard)/clientGallery";

import React from "react";

export default async function ClientPage({
  params,
}: {
  params: Promise<{ category: string; clientId: string }>;
}) {
  const clientId = (await params).clientId;
  const fetchedClient = await getClientById(clientId);
  // console.log(fetchedClient);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <ClientGallery initialClient={fetchedClient} />
      </main>
    </div>
  );
}
