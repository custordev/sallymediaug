import { revalidatePath } from "next/cache";
import db from "@/prisma/db";

/** Create a new photo */
export async function createPhoto(data: {
  url: string;
  clientId: string;
  categoryId?: string;
  description?: string;
}) {
  try {
    let categoryId = data.categoryId;

    // If no category is specified, use or create the "All" category
    if (!categoryId) {
      const allCategory = await db.photoCategory.findFirst({
        where: { title: "All" },
      });
      categoryId = allCategory?.id;

      if (!categoryId) {
        const newAllCategory = await db.photoCategory.create({
          data: {
            title: "All",
            slug: "all",
            description: "Default category for all photos",
          },
        });
        categoryId = newAllCategory.id;
      }
    }

    const photo = await db.photo.create({
      data: {
        url: data.url,
        clientId: data.clientId,
        categoryId,
        description: data.description,
      },
      include: {
        category: true,
      },
    });

    revalidatePath(`/dashboard/clients/${data.clientId}`);
    return { success: true, data: photo };
  } catch (error) {
    console.error("Error creating photo:", error);
    return { success: false, error: "Failed to create photo" };
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
