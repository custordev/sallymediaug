import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import Image from "next/image";
import { getAllClients } from "@/actions/client";

export default async function Clients() {
  const clients = (await getAllClients()) || [];
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-amber-700">Clients</h1>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Plus className="mr-2 h-4 w-4" /> New Client
        </Button>
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
                      src={client.imageUrl as string}
                      alt={client.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{client.title}</p>
                    {/* <p className="text-sm text-gray-500">{client.eventDate}</p> */}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <span className="text-sm text-gray-500">
                    Last session: {client.createdAt}
                  </span> */}
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
