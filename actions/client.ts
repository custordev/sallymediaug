/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
import db from "@/prisma/db";
import { z } from "zod";
import type { ClientUpdateData } from "@/types/types";
interface ClientFormData {
  galleryImages?: string[];
  title: string;
  slug: string;
  description?: string;
  eventDate: string | Date;
  imageUrl?: string;
  youtubeUrl?: string;
  categoryId: string;
  photos?: string[]; // Array of photo URLs if any initial photos are being added
}

// Updated interfaces
interface PhotoWithCategory {
  url: string;
  description?: string;
  categoryId: string;
}
type ApiResponse = {
  success: boolean;
  data?: any;
  error?: string;
  statusCode: number;
};
// First, let's define the proper types
interface ExtendedClient {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  eventDate: Date | null;
  imageUrl: string | null;
  youtubeUrl: string | null;
  categoryId: string;
  photos: Photo[];
  createdAt: Date;
  updatedAt: Date;
}

interface Photo {
  id: string;
  category: Category;
  // Add other photo fields as needed
}

interface Category {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  name: string;
}
// Zod schema for input validation
const PhotoSchema = z.object({
  url: z.string().url(),
  description: z.string().optional(),
  clientId: z.string(),
  categoryId: z.string(),
});

export async function getClientById(
  id: string
): Promise<ExtendedClient | null> {
  noStore();

  if (!id || id === "new") return null;

  try {
    const client = await db.client.findUnique({
      where: { id },
      include: {
        category: true,
        photos: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!client) return null;

    // Transform the Prisma result into our ExtendedClient type
    // Handle nullable dates properly
    const extendedClient: ExtendedClient = {
      id: client.id,
      title: client.title,
      slug: client.slug,
      description: client.description,
      eventDate: client.eventDate || null,
      imageUrl: client.imageUrl,
      youtubeUrl: client.youtubeUrl,
      categoryId: client.categoryId,
      photos: client.photos as any,
      createdAt: client.createdAt,
      // Ensure updatedAt is never null by using current date as fallback
      updatedAt: client.updatedAt || new Date(),
    };

    return extendedClient;
  } catch (error) {
    console.error("Error fetching client:", error);
    return null;
  }
}

export async function createClient(data: ClientFormData): Promise<ApiResponse> {
  noStore();

  if (!data.title || !data.slug || !data.categoryId) {
    return {
      success: false,
      error: "Missing required fields",
      statusCode: 400,
    };
  }

  try {
    const result = await db.$transaction(async (prisma) => {
      let defaultPhotoCategory = await prisma.photoCategory.findFirst({
        where: { slug: "highlights" },
      });

      if (!defaultPhotoCategory) {
        defaultPhotoCategory = await prisma.photoCategory.create({
          data: {
            title: "HIGHLIGHTS",
            slug: "highlights",
            description: "Default category for all photos",
          },
        });
      }

      const client = await prisma.client.create({
        data: {
          title: data.title,
          slug: data.slug,
          description: data.description || "",
          eventDate: new Date(data.eventDate),
          imageUrl: data.imageUrl || "",
          youtubeUrl: data.youtubeUrl?.trim() || null,
          categoryId: data.categoryId,
          photos:
            data.galleryImages && data.galleryImages.length > 0
              ? {
                  create: data.galleryImages.map((url) => ({
                    url,
                    categoryId: defaultPhotoCategory!.id,
                    description: "",
                  })),
                }
              : undefined,
        },
        include: {
          category: true,
          photos: {
            include: {
              category: true,
            },
          },
        },
      });

      return client;
    });

    revalidatePath("/dashboard/gallery");
    return { success: true, data: result, statusCode: 201 };
  } catch (error) {
    console.error("Error creating client:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
      statusCode: 500,
    };
  }
}

export async function updateClientWithPhotos(
  id: string,
  data: ClientUpdateData
) {
  noStore();

  try {
    const result = await db.$transaction(async (prisma) => {
      const updatedClient = await prisma.client.update({
        where: { id },
        data: {
          title: data.title,
          eventDate: new Date(data.eventDate),
          description: data.description,
          youtubeUrl: data.youtubeUrl,
          photos:
            Array.isArray(data.photos) && data.photos.length > 0
              ? {
                  create: data.photos.map((photo) => ({
                    url: photo.url,
                    description: photo.description || "",
                    categoryId: photo.categoryId,
                  })),
                }
              : undefined,
        },
        include: {
          category: true,
          photos: {
            include: {
              category: true,
            },
          },
        },
      });

      return updatedClient;
    });

    revalidatePath(`/dashboard/gallery/${id}`);
    revalidatePath(`/dashboard/gallery`);

    return { success: true, data: result };
  } catch (error) {
    console.error("Error updating client with photos:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update client",
    };
  }
}

export async function createClientPhotoCategory(data: {
  title: string;
  slug: string;
  description?: string;
  clientId: string;
}) {
  noStore();

  try {
    const category = await db.photoCategory.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
      },
    });

    revalidatePath(`/dashboard/gallery/${data.clientId}`);
    return { success: true, data: category };
  } catch (error) {
    console.error("Error creating client photo category:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create category",
    };
  }
}

export async function getClientPhotosByCategory(clientId: string) {
  noStore();

  try {
    const photos = await db.photo.findMany({
      where: { clientId },
      include: { category: true },
      orderBy: { category: { title: "asc" } },
    });

    const photosByCategory = photos.reduce(
      (acc, photo) => {
        const categoryId = photo.category.id;
        if (!acc[categoryId]) {
          acc[categoryId] = { category: photo.category, photos: [] };
        }
        acc[categoryId].photos.push(photo);
        return acc;
      },
      {} as Record<string, { category: any; photos: any[] }>
    );

    return { success: true, data: Object.values(photosByCategory) };
  } catch (error) {
    console.error("Error fetching client photos by category:", error);
    return { success: false, error: "Failed to fetch photos" };
  }
}

export async function getAllClients() {
  noStore();

  try {
    const invalidClients = await db.client.findMany({
      where: { categoryId: undefined },
    });

    if (invalidClients.length > 0) {
      console.warn(`Found ${invalidClients.length} clients without categories`);
    }

    const clients = await db.client.findMany({
      where: { category: { isNot: undefined } },
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { id: true, title: true, slug: true } },
        photos: {
          include: {
            category: { select: { id: true, title: true, slug: true } },
          },
        },
      },
    });

    return clients;
  } catch (error) {
    console.error("Error fetching all clients:", error);
    throw new Error("Failed to fetch clients");
  }
}

export async function deleteClient(id: string) {
  noStore();

  try {
    const result = await db.$transaction(async (prisma) => {
      await prisma.photo.deleteMany({ where: { clientId: id } });
      const deletedClient = await prisma.client.delete({ where: { id } });

      const emptyCategories = await prisma.photoCategory.findMany({
        where: { photos: { none: {} } },
      });

      if (emptyCategories.length > 0) {
        await prisma.photoCategory.deleteMany({
          where: {
            id: {
              in: emptyCategories
                .filter((cat) => !["all", "uncategorized"].includes(cat.slug))
                .map((cat) => cat.id),
            },
          },
        });
      }

      return deletedClient;
    });

    revalidatePath("/dashboard/gallery");
    return { ok: true, data: result };
  } catch (error) {
    console.error("Error deleting client:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to delete client",
    };
  }
}

export async function updateClientById(id: string, data: ClientUpdateData) {
  noStore();

  try {
    const updatedClient = await db.client.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        eventDate: new Date(data.eventDate),
        imageUrl: data.imageUrl,
        youtubeUrl: data.youtubeUrl,
        categoryId: data.categoryId,
      },
      include: {
        category: true,
        photos: { include: { category: true } },
      },
    });

    revalidatePath("/dashboard/gallery");
    return updatedClient;
  } catch (error) {
    console.error("Error updating client:", error);
    throw error;
  }
}

export async function updateClientDetails(id: string, data: ClientUpdateData) {
  noStore();

  try {
    const updatedClient = await db.client.update({
      where: { id },
      data: {
        title: data.title,
        eventDate: new Date(data.eventDate),
        description: data.description,
        youtubeUrl: data.youtubeUrl,
      },
    });

    revalidatePath("/dashboard/gallery");
    return { success: true, data: updatedClient };
  } catch (error) {
    console.error("Error updating client details:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update client",
    };
  }
}

export async function getClientsByCategory(categorySlug: string) {
  noStore();

  try {
    const clients = await db.client.findMany({
      where: { category: { slug: categorySlug.toLowerCase() } },
      include: {
        category: true,
        photos: true,
      },
    });

    return clients;
  } catch (error) {
    console.error("Error fetching clients by category:", error);
    return [];
  }
}
