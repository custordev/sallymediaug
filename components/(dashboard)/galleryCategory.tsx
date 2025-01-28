"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, FolderPlus, Edit2 } from "lucide-react";

import DeleteButton from "../(formInputs)/deleteBtn";
import { deleteClient } from "@/actions/client";

export type Client = {
  id: string;
  name: string;
  image: string;
  date: string;
  category: string;
};

export interface CategoryGalleryProps {
  category: string;
  clients: Client[];
}

export default function CategoryGallery({
  category,
  clients: initialClients,
}: CategoryGalleryProps) {
  const [clients, setClients] = useState(initialClients);
  console.log(clients);
  const handleDeleteSuccess = (deletedId: string) => {
    setClients((prev) => prev.filter((client) => client.id !== deletedId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-amber-700 capitalize mb-2">
            {category} Category
          </h1>
          <p className="text-muted-foreground">
            {clients.length} {category.slice(0, -1)}
          </p>
        </div>
        <Button
          size="sm"
          asChild
          className="h-8 gap-1 bg-amber-700 hover:bg-amber-800 text-white"
        >
          <Link href={`/dashboard/categories/${category}/new`}>
            <FolderPlus className="mr-2 h-5 w-5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              New Client
            </span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="group overflow-hidden h-full">
              <CardContent className="p-0 relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={client.image}
                    alt={client.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-50" />

                  {/* Floating action buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 bg-white/90 hover:bg-white"
                      asChild
                    >
                      <Link
                        href={`/dashboard/categories/${category}/${client.id}/update/${client.id}`}
                      >
                        <Edit2 className="h-4 w-4 text-amber-700" />
                      </Link>
                    </Button>
                    <DeleteButton
                      id={client.id}
                      onDelete={deleteClient}
                      onSuccess={() => handleDeleteSuccess(client.id)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 flex flex-col items-start gap-2">
                <div>
                  <h2 className="font-semibold text-lg text-foreground">
                    {client.name}
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />{" "}
                    {new Date(client.date).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  href={`/dashboard/categories/${category}/${client.id}`}
                  className="text-amber-700 hover:text-amber-800 font-medium text-sm mt-2 flex items-center gap-1"
                >
                  View Client<span className="ml-1">→</span>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
