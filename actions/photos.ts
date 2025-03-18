/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
import { z } from "zod";
import prisma from "@/prisma/db";

const PhotoSchema = z.object({
  url: z.string().url(),
  description: z.string().optional(),
  clientId: z.string(),
  categoryId: z.string(),
});

type CreatePhotoInput = z.infer<typeof PhotoSchema>;

export async function createPhoto(input: CreatePhotoInput) {
  noStore();

  try {
    const data = PhotoSchema.parse(input);

    const result = await prisma.$transaction(async (tx) => {
      const [client, category] = await Promise.all([
        tx.client.findUnique({ where: { id: data.clientId } }),
        tx.photoCategory.findUnique({ where: { id: data.categoryId } }),
      ]);

      if (!client) {
        throw new Error("Client not found");
      }

      if (!category) {
        throw new Error("Photo category not found");
      }

      const photo = await tx.photo.create({
        data: {
          url: data.url,
          description: data.description,
          clientId: data.clientId,
          categoryId: data.categoryId,
        },
        include: {
          category: true,
          client: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });

      return photo;
    });

    revalidatePath(`/dashboard/clients/${input.clientId}`);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error creating photo:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create photo",
    };
  }
}

export async function getClientPhotos(clientId: string, categoryId?: string) {
  noStore();

  try {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
      select: { id: true },
    });

    if (!client) {
      return {
        success: false,
        error: "Client not found",
      };
    }

    const photos = await prisma.photo.findMany({
      where: {
        clientId,
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
      },
      // orderBy: { createdAt: "desc" },
    });

    return { success: true, data: photos };
  } catch (error) {
    console.error("Error fetching photos:", error);
    return {
      success: false,
      error: "Failed to fetch photos",
    };
  }
}

export async function deletePhoto(id: string) {
  noStore();

  try {
    const photo = await prisma.photo.delete({
      where: { id },
      select: { clientId: true },
    });

    revalidatePath(`/dashboard/clients/${photo.clientId}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting photo:", error);
    return {
      success: false,
      error: "Failed to delete photo",
    };
  }
}


export async function getRandomPhotos(count: number) {
  noStore();

  try {
    // Get all unique category IDs
    const categories = await prisma.photoCategory.findMany({
      select: { id: true },
    });

    // Get all unique client IDs
    const clients = await prisma.client.findMany({
      select: { id: true },
    });

    // Shuffle categories and clients
    const shuffledCategories = categories.sort(() => 0.5 - Math.random());
    const shuffledClients = clients.sort(() => 0.5 - Math.random());

    // Select a subset of categories and clients
    const selectedCategories = shuffledCategories.slice(
      0,
      Math.min(count, categories.length)
    );
    const selectedClients = shuffledClients.slice(
      0,
      Math.min(count, clients.length)
    );

    // Fetch one random photo for each selected category and client
    const photoPromises = [
      ...selectedCategories.map((category) =>
        prisma.photo.findFirst({
          where: { categoryId: category.id },
          select: { url: true, category: { select: { id: true } } },
          // orderBy: { createdAt: "desc" },
        })
      ),
      ...selectedClients.map((client) =>
        prisma.photo.findFirst({
          where: { clientId: client.id },
          select: { url: true, client: { select: { title: true } } },
          // orderBy: { createdAt: "desc" },
        })
      ),
    ];

    const photos = await Promise.all(photoPromises);

    // Filter out any null results and shuffle the remaining photos
    const validPhotos = photos.filter((photo) => photo !== null);
    const shuffledPhotos = validPhotos.sort(() => 0.5 - Math.random());

    // Take the requested count of photos
    const selected = shuffledPhotos.slice(0, count);

    return {
      success: true,
      data: selected.map((photo) => ({
        url: photo!.url,
        category: (photo as any).category
          ? (photo as any).category.name
          : undefined,
        client: "client" in photo! ? photo!.client.title : undefined,
      })),
    };
  } catch (error) {
    console.error("Error fetching random photos:", error);
    return {
      success: false,
      error: "Failed to fetch random photos",
    };
  }
}
