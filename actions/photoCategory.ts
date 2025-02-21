/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

type ApiResponse = {
  success: boolean;
  data?: any;
  error?: string;
  statusCode: number;
};

export async function getPhotoCategories(
  clientId?: string
): Promise<ApiResponse> {
  noStore();
  try {
    // Only query if clientId is provided
    if (!clientId) {
      return {
        success: true,
        data: [],
        statusCode: 200,
      };
    }

    const categories = await db.photoCategory.findMany({
      where: { clientId },
      // orderBy: { title: "asc" },
    });

    return {
      success: true,
      data: categories,
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error fetching photo categories:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      statusCode: 500,
    };
  }
}

export async function createPhotoCategory(data: {
  title: string;
  slug: string;
  description?: string;
  clientId: string;
}) {
  if (!data.clientId) {
    return {
      success: false,
      error: "Client ID is required",
    };
  }

  try {
    const category = await db.photoCategory.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description || "",
        clientId: data.clientId,
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

export async function ensureDefaultPhotoCategory(clientId: string) {
  try {
    let defaultCategory = await db.photoCategory.findFirst({
      where: { slug: "uncategorized", clientId: clientId },
    });

    if (!defaultCategory) {
      defaultCategory = await db.photoCategory.create({
        data: {
          title: "Uncategorized",
          slug: "uncategorized",
          description: "Default category for uncategorized photos",
          clientId: clientId,
        },
      });
    }

    return defaultCategory;
  } catch (error) {
    console.error("Error ensuring default category:", error);
    throw error;
  }
}
