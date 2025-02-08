"use server";

import { generateSlug } from "@/lib/generateSlug";
import db from "@/prisma/db";
import { CategoryProps } from "@/types/types";

import { revalidatePath } from "next/cache";

// export async function createCategory(data: CategoryProps) {
//   const slug = data.slug;
//   try {
//     const existingCategory = await db.category.findUnique({
//       where: {
//         slug,
//       },
//     });
//     if (existingCategory) {
//       return existingCategory;
//     }
//     const newCategory = await db.category.create({
//       data,
//     });
//     // console.log(newCategory);
//     revalidatePath("/dashboard/categories");
//     return newCategory;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

export async function createCategory(data: CategoryProps) {
  try {
    // Validate required fields explicitly
    if (!data.title) {
      console.error("Title is required");
      return null;
    }

    // Generate slug if not provided
    data.slug = data.slug || generateSlug(data.title);

    // Ensure all required fields are populated
    const newCategory = await db.category.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description || "",
        imageUrl: data.imageUrl || "/placeholder.svg",
      },
    });

    return newCategory;
  } catch (error) {
    console.error("Category Creation Error:", error);
    // Throw the error to get more details
    throw error;
  }
}

export async function getAllCategories() {
  try {
    const categories = await db.category.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function updateCategoryById(id: string, data: CategoryProps) {
  try {
    const updatedCategory = await db.category.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/categories");
    return updatedCategory;
  } catch (error) {
    console.log(error);
  }
}
export async function getCategoryById(id: string) {
  try {
    const category = await db.category.findUnique({
      where: {
        id,
      },
    });
    return category;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteCategoryById(id: string) {
  try {
    const deletedCategory = await db.category.delete({
      where: {
        id,
      },
    });

    return {
      ok: true,
      data: deletedCategory,
    };
  } catch (error) {
    console.log(error);
  }
}
export async function createBulkCategories(categories: CategoryProps[]) {
  try {
    for (const category of categories) {
      await createCategory(category);
    }
  } catch (error) {
    console.log(error);
  }
}
// export async function createCategory(data: CategoryProps) {
//   const slug = data.slug;
//   try {
//     const existingCategory = await db.category.findUnique({
//       where: {
//         slug,
//       },
//     });
//     if (existingCategory) {
//       return existingCategory;
//     }
//     const newCategory = await db.category.create({
//       data,
//     });
//     // console.log(newCategory);
//     revalidatePath("/dashboard/categories");
//     return newCategory;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
