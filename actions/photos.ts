// actions/photos.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import prisma from "@/prisma/db";

const PhotoSchema = z.object({
  url: z.string().url(),
  description: z.string().optional(),
  clientId: z.string(),
  categoryId: z.string(), // Made categoryId required
});

type CreatePhotoInput = z.infer<typeof PhotoSchema>;

export async function createPhoto(input: CreatePhotoInput) {
  try {
    const data = PhotoSchema.parse(input);

    // Check if client exists
    const client = await prisma.client.findUnique({
      where: { id: data.clientId },
    });

    if (!client) {
      return {
        success: false,
        error: "Client not found",
      };
    }

    // Check if photo category exists
    const category = await prisma.photoCategory.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      return {
        success: false,
        error: "Photo category not found",
      };
    }

    const photo = await prisma.photo.create({
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

    revalidatePath(`/dashboard/clients/${data.clientId}`);
    return { success: true, data: photo };
  } catch (error) {
    console.error("Error creating photo:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create photo",
    };
  }
}

export async function getClientPhotos(clientId: string, categoryId?: string) {
  try {
    // Verify client exists
    const client = await prisma.client.findUnique({
      where: { id: clientId },
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
      orderBy: { createdAt: "desc" },
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
  try {
    const photo = await prisma.photo.delete({
      where: { id },
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
