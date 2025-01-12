"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import Image from "next/image";

const clients = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    image: "/denis-prossy/highlights/N77A8605.jpg",
    lastSession: "2023-05-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    image: "/denis-prossy/highlights/N77A8619.jpg",
    lastSession: "2023-06-22",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@example.com",
    image: "/denis-prossy/highlights/N77A8623.jpg",
    lastSession: "2023-07-08",
  },
];

export default function Clients() {
  return (
    <div className="space-y-6">
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
                      src={client.image}
                      alt={client.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    Last session: {client.lastSession}
                  </span>
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
