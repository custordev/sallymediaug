/* eslint-disable @typescript-eslint/no-explicit-any */
import { revalidatePath } from "next/cache";
import db from "@/prisma/db";

/** Create a new photo */
export async function createPhoto(data: {
  url: string;
  description?: string;
  clientId: string;
  categoryId?: string;
}) {
  try {
    const defaultCategory = await ensureDefaultPhotoCategory();

    const photo = await db.photo.create({
      data: {
        url: data.url,
        description: data.description,
        clientId: data.clientId,
        categoryId: data.categoryId || defaultCategory.id,
      },
      include: {
        category: true,
        client: true,
      },
    });

    return photo;
  } catch (error) {
    console.error("Error creating photo:", error);
    throw new Error("Failed to create photo");
  }
}
export async function getAllPhotos() {
  try {
  

    // Now fetch all photos safely
    const photos = await db.photo.findMany({
      select: {
        id: true,
        url: true,
        description: true,
        clientId: true,
        client: {
          select: {
            id: true,
            title: true,
          },
        },
        categoryId: true,
        category: {
          select: {
            id: true,
            title: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
      where: {
        AND: [
          { categoryId: { not: null as any } },
          { clientId: { not: null as any } },
        ],
      },
    });

    return photos;
  } catch (error) {
    console.error("Error fetching photos:", error);
    // throw new Error("Failed to fetch photos");
  }
}

/** Fetch photos by client and optional category */
export async function getClientPhotos(clientId: string, categoryId?: string) {
  try {
    const photos = await db.photo.findMany({
      where: {
        clientId,
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: photos };
  } catch (error) {
    console.error("Error fetching photos:", error);
    return { success: false, error: "Failed to fetch photos" };
  }
}

/** Fetch all photo categories */
export async function getAllPhotoCategories() {
  try {
    const categories = await db.photoCategory.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return { success: true, data: categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}

/** Fetch a photo category by ID */
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

/** Create a new photo category */
export async function createPhotoCategory(data: {
  title: string;
  slug: string;
  description?: string;
}) {
  try {
    const category = await db.photoCategory.create({
      data,
    });

    revalidatePath("/dashboard/categories");
    return { success: true, data: category };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

/** Update a photo category */
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

/** Delete a photo category */
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

/** Delete a photo */
export async function deletePhoto(photoId: string) {
  try {
    const photo = await db.photo.delete({
      where: { id: photoId },
    });

    revalidatePath(`/dashboard/clients/${photo.clientId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting photo:", error);
    return { success: false, error: "Failed to delete photo" };
  }
}

async function ensureDefaultPhotoCategory() {
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


