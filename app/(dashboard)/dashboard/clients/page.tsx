import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Lock, Unlock } from "lucide-react";
import Image from "next/image";
import { getAllClients } from "@/actions/client";

import Link from "next/link";
import ClientProtectionToggle from "@/components/(front)/clientsProtectionToggle";

export default async function Clients() {
  const clients = (await getAllClients()) || [];

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-amber-700">Clients</h1>
        <Link href="/dashboard/clients/new">
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Plus className="mr-2 h-4 w-4" /> New Client
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Client List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={client.imageUrl || "/placeholder.svg"}
                      alt={client.title}
                      width={48}
                      height={48}
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{client.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(client.eventDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <ClientProtectionToggle
                    client={{
                      ...client,
                      isProtected: client.isProtected ?? false,
                    }}
                  />
                  {client.isProtected ? (
                    <Lock className="h-4 w-4 text-amber-600" />
                  ) : (
                    <Unlock className="h-4 w-4 text-gray-400" />
                  )}
                  <Link href={`/dashboard/clients/${client.id}/edit`}>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
