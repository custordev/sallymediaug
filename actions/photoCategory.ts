"use server";

import db from "@/prisma/db";
import { revalidatePath } from "next/cache";

export async function createPhotoCategory(data: {
  title: string;
  slug: string;
  description?: string;
}) {
  try {
    const existing = await db.photoCategory.findFirst({
      where: {
        OR: [{ title: data.title }, { slug: data.slug }],
      },
    });

    if (existing) {
      return {
        success: false,
        error: `Category with this ${existing.title === data.title ? "title" : "slug"} already exists`,
      };
    }

    const category = await db.photoCategory.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
      },
    });

    revalidatePath("/dashboard/categories");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error creating category:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create category",
    };
  }
}

export async function updatePhotoCategory(
  categoryId: string,
  data: { title?: string; slug?: string; description?: string }
) {
  try {
    const category = await db.photoCategory.update({
      where: { id: categoryId },
      data,
    });

    revalidatePath("/dashboard/categories");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

export async function deletePhotoCategory(categoryId: string) {
  try {
    await db.photoCategory.delete({
      where: { id: categoryId },
    });

    revalidatePath("/dashboard/categories");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}

export async function getPhotoCategories() {
  try {
    const categories = await db.photoCategory.findMany({
      orderBy: { title: "asc" },
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function getPhotoCategoryById(categoryId: string) {
  try {
    const category = await db.photoCategory.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return { success: false, error: "Category not found" };
    }

    return { success: true, data: category };
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    return { success: false, error: "Failed to fetch category" };
  }
}

export async function ensureDefaultPhotoCategory() {
  try {
    let defaultCategory = await db.photoCategory.findFirst({
      where: { slug: "uncategorized" },
    });

    if (!defaultCategory) {
      defaultCategory = await db.photoCategory.create({
        data: {
          title: "Uncategorized",
          slug: "uncategorized",
          description: "Default category for uncategorized photos",
        },
      });
    }

    return defaultCategory;
  } catch (error) {
    console.error("Error ensuring default category:", error);
    throw error;
  }
}
