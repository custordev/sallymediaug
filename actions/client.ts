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

// export async function createClient(data: ClientFormData): Promise<ApiResponse> {
//   try {
//     // Validate required fields
//     if (!data.title || !data.slug || !data.categoryId) {
//       return {
//         success: false,
//         error: "Missing required fields: title, slug, or category",
//         statusCode: 400,
//       };
//     }

//     // Check for existing client
//     const existingClient = await db.client.findUnique({
//       where: { slug: data.slug },
//     });

//     if (existingClient) {
//       return {
//         success: false,
//         error: "A client with this name already exists",
//         statusCode: 409,
//       };
//     }

//     // Create new client
//     const newClient = await db.client.create({
//       data: {
//         title: data.title,
//         slug: data.slug,
//         description: data.description || "",
//         eventDate: new Date(data.eventDate),
//         imageUrl: data.imageUrl || "",
//         youtubeUrl: data.youtubeUrl || "",
//         categoryId: data.categoryId,
//       },
//       include: {
//         category: true,
//         photos: {
//           include: {
//             category: true
//           }
//         }
//       },
//     });

//     console.log("Client created successfully:", newClient);
//     await revalidatePath("/dashboard/gallery");

//     return {
//       success: true,
//       data: newClient,
//       statusCode: 201,
//     };
//   } catch (error) {
//     console.error("Error creating client:", error);
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "An unexpected error occurred",
//       statusCode: 500,
//     };
//   }
// }

export async function createClient(data: ClientFormData): Promise<ApiResponse> {
  try {
    // Validate required fields
    if (!data.title || !data.slug || !data.categoryId) {
      return {
        success: false,
        error: "Missing required fields: title, slug, or category",
        statusCode: 400,
      };
    }

    // Check for existing client
    const existingClient = await db.client.findUnique({
      where: { slug: data.slug },
    });

    if (existingClient) {
      return {
        success: false,
        error: "A client with this name already exists",
        statusCode: 409,
      };
    }

    // Ensure "All" photo category exists
    let allCategory = await db.photoCategory.findFirst({
      where: {
        title: "All",
        slug: "all",
      },
    });

    if (!allCategory) {
      allCategory = await db.photoCategory.create({
        data: {
          title: "All",
          slug: "all",
          description: "Default category for all photos",
        },
      });
    }

    // Create new client with a transaction
    const newClient = await db.$transaction(async (prisma) => {
      // Create the client
      const client = await prisma.client.create({
        data: {
          title: data.title,
          slug: data.slug,
          description: data.description || "",
          eventDate: new Date(data.eventDate),
          imageUrl: data.imageUrl || "",
          youtubeUrl: data.youtubeUrl || "",
          categoryId: data.categoryId,
        },
      });

      // If there are gallery images, create photos for them in the "All" category
      if (data.photos && data.photos.length > 0) {
        await prisma.photo.createMany({
          data: data.photos.map((url) => ({
            url,
            clientId: client.id,
            categoryId: allCategory!.id, // We know this exists because we created it if it didn't
          })),
        });
      }

      return client;
    });

    console.log("Client created successfully:", newClient);
    await revalidatePath("/dashboard/gallery");

    return {
      success: true,
      data: newClient,
      statusCode: 201,
    };
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

// Helper function to ensure "All" category exists
export async function ensureAllPhotoCategory() {
  try {
    let allCategory = await db.photoCategory.findFirst({
      where: { title: "All" },
    });

    if (!allCategory) {
      allCategory = await db.photoCategory.create({
        data: {
          title: "All",
          slug: "all",
          description: "Default category for all photos",
        },
      });
    }

    return allCategory;
  } catch (error) {
    console.error("Error ensuring All category exists:", error);
    throw error;
  }
}

// Update the types to include optional photos in ClientFormData
interface ClientFormData {
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
    const clients = await db.client.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: {
          select: { title: true },
        },
        photos: {
          include: {
            category: true,
          },
        },
      },
    });
    return clients;
  } catch (error) {
    console.error("Error fetching all clients:", error);
    return null;
  }
}

export async function deleteClient(id: string) {
  try {
    // This will also delete all associated photos due to the cascade setting
    const deletedClient = await db.client.delete({
      where: { id },
    });

    revalidatePath("/dashboard/gallery");
    return {
      ok: true,
      data: deletedClient,
    };
  } catch (error) {
    console.error("Error deleting client:", error);
    return null;
  }
}

// export async function getClientById(id: string): Promise<ExtendedClient | null> {
//   if (!id || id === "new") return null;

//   try {
//     const client = await db.client.findUnique({
//       where: { id },
//       include: {
//         category: true,
//         photos: {
//           include: {
//             category: true
//           }
//         }
//       },
//     });

//     if (!client) return null;

//     // Transform the Prisma result into our ExtendedClient type
//     const extendedClient: ExtendedClient = {
//       id: client.id,
//       title: client.title,
//       slug: client.slug,
//       description: client.description,
//       eventDate: client.eventDate,
//       imageUrl: client.imageUrl,
//       youtubeUrl: client.youtubeUrl,
//       categoryId: client.categoryId,
//       photos: client.photos,
//       createdAt: client.createdAt,
//       updatedAt: client.updatedAt,
//     };

//     return extendedClient;
//   } catch (error) {
//     console.log("Error fetching client:", error);
//     return null;
//   }
// }

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
    console.error("Error fetching clients:", error);
    return [];
  }
}
