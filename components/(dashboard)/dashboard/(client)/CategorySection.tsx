/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { updateClientById } from "@/actions/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddCategoryDialog } from "./AlertCategoryDialog";
import { CategoryButtons } from "./CategoryButtons";

export function CategorySection({
  client,
  setClient,
  activeCategory,
  setActiveCategory,
}: any) {
  const [loading, setLoading] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleAddCategory = async (newCategory: string) => {
    if (!newCategory.trim()) return;
    
    setLoading(true);
    try {
      // Ensure eventCategories exists
      const currentCategories = client.eventCategories || [];
      
      const updated = await updateClientById(client.id, {
        ...client,
        eventCategories: [...currentCategories, { title: newCategory }],
      });
      
      if (updated) {
        setClient(updated);
        toast.success("Category added successfully");
        setIsAddingCategory(false);
      }
    } catch (error) {
      toast.error("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Photo Categories</h2>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="bg-primary text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          Add Category
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-4 py-2 rounded-md ${
            activeCategory === "All"
              ? "bg-primary text-white"
              : "bg-gray-100"
          }`}
        >
          All
        </button>
        {(client.eventCategories || []).map((category: { title: string }, index: number) => (
          <button
            key={index}
            onClick={() => setActiveCategory(category.title)}
            className={`px-4 py-2 rounded-md ${
              activeCategory === category.title
                ? "bg-primary text-white"
                : "bg-gray-100"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {isAddingCategory && (
        <AddCategoryDialog
          // open={isAddingCategory}
          // onClose={() => setIsAddingCategory(false)}
          onAdd={handleAddCategory}
          loading={loading}
        />
      )}
    </div>
  );
}