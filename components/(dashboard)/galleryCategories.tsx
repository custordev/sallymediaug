"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Edit2, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Category } from "@prisma/client";
import { deleteCategoryById } from "@/actions/categories";
import DeleteButton from "../(formInputs)/deleteBtn";

export default function CategoriesCategories({
  data: initialData,
}: {
  data: Category[];
}) {
  const [categories, setCategories] = useState<Category[]>(initialData);

  const handleDeleteSuccess = (deletedId: string) => {
    setCategories((prev) =>
      prev.filter((category) => category.id !== deletedId)
    );
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-12">
        <h1 className="lg:text-4xl text-2xl font-bold text-amber-700">
          Categories
        </h1>

        <Button
          size="sm"
          asChild
          className="h-8 gap-1 bg-amber-700 hover:bg-amber-800 text-white"
        >
          <Link href="/dashboard/categories/new">
            <FolderPlus className="mr-2 h-5 w-5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              New Category
            </span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="group overflow-hidden">
              <CardContent className="p-0 relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.imageUrl as string}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 transition-opacity group-hover:opacity-70" />
                </div>
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-2xl font-bold text-white">
                    {category.title}
                  </h2>
                </div>

                {/* Floating action buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                    asChild
                  >
                    <Link href={`/dashboard/categories/update/${category.id}`}>
                      <Edit2 className="h-4 w-4 text-amber-700" />
                    </Link>
                  </Button>
                  <DeleteButton
                    id={category.id}
                    onDelete={deleteCategoryById}
                    onSuccess={() => handleDeleteSuccess(category.id)}
                  />
                </div>
              </CardContent>
              <CardFooter className="p-4 bg-white">
                <Link
                  href={`/dashboard/categories/${category.slug}`}
                  className="text-amber-700 hover:text-amber-800 font-medium text-sm"
                >
                  View Category →
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
