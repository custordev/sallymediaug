/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import db from "@/prisma/db";
import { ClientUpdateData } from "@/types/types";
import { revalidatePath } from "next/cache";

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
  name: string;
  // Add other category fields as needed
}

export async function getClientById(
  id: string
): Promise<ExtendedClient | null> {
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
  try {
    if (!data.title || !data.slug || !data.categoryId) {
      return {
        success: false,
        error: "Missing required fields",
        statusCode: 400,
      };
    }

    // Create client and photos in a single transaction
    const result = await db.$transaction(async (prisma) => {
      // Ensure "Highlights" photo category exists
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

      // Create the client
      const client = await prisma.client.create({
        data: {
          title: data.title,
          slug: data.slug,
          description: data.description || "",
          eventDate: new Date(data.eventDate),
          imageUrl: data.imageUrl || "",
          youtubeUrl: data.youtubeUrl?.trim() || null,
          categoryId: data.categoryId,
        },
      });

      // Create photos if they exist
      if (data.galleryImages && data.galleryImages.length > 0) {
        // Create photos one by one to ensure proper category assignment
        await Promise.all(
          data.galleryImages.map(async (url) => {
            return prisma.photo.create({
              data: {
                url,
                clientId: client.id,
                categoryId: defaultPhotoCategory!.id, // Always use the default photo category
                description: "", // Add a default empty description
              },
            });
          })
        );
      }

      // Fetch the complete client with all relations
      const completeClient = await prisma.client.findUnique({
        where: { id: client.id },
        include: {
          category: true,
          photos: {
            include: {
              category: true,
            },
          },
        },
      });

      return completeClient;
    });

    await revalidatePath("/dashboard/gallery");
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

// Update the types to include optional photos in ClientFormData
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

export async function getAllClients() {
  try {
    // First check if we have any clients without categories
    const invalidClients = await db.client.findMany({
      where: {
        categoryId: undefined,
      },
    });

    if (invalidClients.length > 0) {
      console.warn(`Found ${invalidClients.length} clients without categories`);
      // Optionally handle invalid clients (e.g., assign to default category or delete)
    }

    const clients = await db.client.findMany({
      where: {
        // Only fetch clients that have valid categories
        category: {
          isNot: undefined,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        photos: {
          include: {
            category: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    return clients;
  } catch (error) {
    console.log("Error fetching all clients:", error);
    // throw new Error("Failed to fetch clients");
  }
}

export async function deleteClient(id: string) {
  try {
    // Start a transaction to handle all deletions
    const result = await db.$transaction(async (prisma) => {
      // 1. Find the client and their photos
      const client = await prisma.client.findUnique({
        where: { id },
        include: {
          photos: {
            include: {
              category: true,
            },
          },
        },
      });

      if (!client) {
        throw new Error("Client not found");
      }

      // 2. Delete all photos of this client
      if (client.photos.length > 0) {
        await prisma.photo.deleteMany({
          where: {
            clientId: id,
          },
        });
      }

      // 3. Delete the client (this will cascade to related records)
      const deletedClient = await prisma.client.delete({
        where: { id },
      });

      // 4. Clean up any photo categories that are now empty
      const emptyCategories = await prisma.photoCategory.findMany({
        where: {
          photos: {
            none: {}, // Find categories with no photos
          },
        },
      });

      // Delete empty categories (except "all" or other special categories you want to keep)
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

    // Revalidate the gallery page
    await revalidatePath("/dashboard/gallery");

    return {
      ok: true,
      data: result,
    };
  } catch (error) {
    console.log("Error deleting client:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Failed to delete client",
    };
  }
}

export async function updateClientById(id: string, data: ClientFormData) {
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
        photos: {
          include: {
            category: true,
          },
        },
      },
    });

    revalidatePath("/dashboard/gallery");
    return updatedClient;
  } catch (error) {
    console.log("Error updating client:", error);
    throw error;
  }
}

export async function updateClientDetails(id: string, data: ClientUpdateData) {
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
    return {
      success: true,
      data: updatedClient,
    };
  } catch (error) {
    console.error("Error updating client details:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update client",
    };
  }
}

export async function getClientsByCategory(categorySlug: string) {
  try {
    return await db.client.findMany({
      where: {
        category: {
          slug: categorySlug.toLowerCase(),
        },
      },
      include: {
        category: true,
        photos: true,
      },
    });
  } catch (error) {
    console.log("Error fetching clients:", error);
    return [];
  }
}
