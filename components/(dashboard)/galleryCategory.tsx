"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Edit, Trash2, Plus, Calendar, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getCategoryData = (category: string) => {
  const data = {
    weddings: [
      {
        id: 1,
        name: "Emma & James",
        image: "/denis-prossy/highlights/N77A8605.jpg",
        date: "2023-05-15",
      },
      {
        id: 2,
        name: "Sarah & John",
        image: "/denis-prossy/highlights/N77A8619.jpg",
        date: "2023-06-22",
      },
      {
        id: 3,
        name: "Olivia & Ethan",
        image: "/denis-prossy/highlights/N77A8623.jpg",
        date: "2023-07-08",
      },
    ],
    birthdays: [
      {
        id: 1,
        name: "Sophia's 5th",
        image: "/denis-prossy/highlights/N77A8645.jpg",
        date: "2023-04-10",
      },
      {
        id: 2,
        name: "Michael's 30th",
        image: "/denis-prossy/highlights/N77A8646.jpg",
        date: "2023-05-20",
      },
      {
        id: 3,
        name: "Grandpa's 80th",
        image: "/denis-prossy/highlights/N77A9197.jpg",
        date: "2023-06-15",
      },
    ],
  };
  return data[category as keyof typeof data] || [];
};

export default function CategoryGallery({ category }: { category: string }) {
  const clients = getCategoryData(category);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-amber-700 capitalize mb-2">
            {category} Gallery
          </h1>
          <p className="text-muted-foreground">
            {clients.length} {category.slice(0, -1)} sessions
          </p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 shadow-lg">
          <Plus className="mr-2 h-4 w-4" /> New Session
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

                  {/* Action buttons */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 bg-white/90 hover:bg-white shadow-md"
                        >
                          <Edit className="h-4 w-4 text-amber-700" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit Session
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Session
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                  href={`/dashboard/gallery/${category}/${client.id}`}
                  className="text-amber-700 hover:text-amber-800 font-medium text-sm mt-2 flex items-center gap-1"
                >
                  View Gallery <span className="ml-1">→</span>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
