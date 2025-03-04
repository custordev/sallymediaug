/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState, useEffect, type JSX } from "react";
import toast from "react-hot-toast";
import type { Category, Client, PhotoCategory } from "@prisma/client";
import { useForm } from "react-hook-form";
import { generateSlug } from "@/lib/generateSlug";
import { createClient, updateClientById } from "@/actions/client";
import ImageInput from "../(formInputs)/ImageInput";
import TextArea from "../(formInputs)/TextAreaInput";
import TextInput from "../(formInputs)/TextInput";
import FormHeader from "../(forms)/FormHeader";
import MultipleImageInput from "../(forms)/MultipleImageInput";
import FormFooter from "../(forms)/FormFooter";
import { Popup } from "./popupcat";
import { AddEventCategoryForm } from "./AddPhotoscategory";
import FormSelectInput from "../(forms)/ShadSelectInput";
import { getPhotoCategories } from "@/actions/photoCategory";
import PasswordInput from "../(formInputs)/PasswordInput";

interface ExtendedClient extends Omit<Client, "password"> {
  eventCategories?: PhotoCategory[];
  galleryImages?: string[];
  password?: string | null;
}

interface ClientFormProps {
  editingId?: string;
  initialData?: ExtendedClient | null;
  categories: Category[] | null;
  photoCategories?: PhotoCategory[] | null;
}

interface FormInputs {
  title: string;
  description: string | null;
  eventDate: string;
  youtubeUrl: string | null;
  password: string | null;
}

export default function ClientEditForm({
  categories,
  editingId,
  initialData,
}: ClientFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [photoCategories, setPhotoCategories] = useState<PhotoCategory[]>([]);

  const categoryOptions =
    categories?.map((category) => ({
      value: category.id,
      label: category.title,
    })) || [];

  const initialCategoryId = initialData?.categoryId;
  const initialCategory = categoryOptions.find(
    (item) => item.value === initialCategoryId
  );
  const [selectedCategory, setSelectedCategory] =
    useState<any>(initialCategory);

  const initialPhotoCategory = initialData?.eventCategories?.map((ec) => ({
    value: ec.id,
    label: ec.title,
  }));
  const [selectedPhotoCategory, setSelectedPhotoCategory] =
    useState<any>(initialPhotoCategory);

  const [imageUrl, setImageUrl] = useState<string>("/placeholder.svg");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const [isPhotoCategoryPopupOpen, setIsPhotoCategoryPopupOpen] =
    useState(false);

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("description", initialData.description || "");
      setValue(
        "eventDate",
        initialData.eventDate
          ? new Date(initialData.eventDate).toISOString().split("T")[0]
          : ""
      );
      setValue("youtubeUrl", initialData.youtubeUrl || "");
      setValue("password", initialData.password || "");
      setImageUrl(initialData.imageUrl || "/placeholder.svg");
      setGalleryImages(initialData.galleryImages || []);
    }
  }, [initialData, setValue]);

  useEffect(() => {
    async function fetchPhotoCategories() {
      if (editingId) {
        const result = await getPhotoCategories(editingId);
        if (result.success) {
          setPhotoCategories(result.data);
        } else {
          toast.error("Failed to fetch photo categories");
        }
      } else {
        setPhotoCategories([]);
      }
    }

    fetchPhotoCategories();
  }, [editingId]);

  const validateForm = () => {
    if (!selectedCategory) {
      toast.error("Please select a category");
      return false;
    }

    return true;
  };

  const handlePhotoCategoryAdd = async (newCategory: PhotoCategory) => {
    setPhotoCategories([...photoCategories, newCategory]);
    setSelectedPhotoCategory({
      value: newCategory.id,
      label: newCategory.title,
    });
    setIsPhotoCategoryPopupOpen(false);
  };

  const handleFormSubmit = async (data: FormInputs) => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      const clientData = {
        title: data.title,
        description: data.description || undefined,
        eventDate: data.eventDate,
        youtubeUrl: data.youtubeUrl || undefined,
        categoryId: selectedCategory.value,
        photoCategoryId: selectedPhotoCategory
          ? selectedPhotoCategory.value
          : undefined,
        imageUrl: imageUrl !== "/placeholder.svg" ? imageUrl : undefined,
        galleryImages,
        slug: generateSlug(data.title),
        isProtected: !!data.password,
        password: data.password || null,
      };

      if (editingId) {
        const result = await updateClientById(editingId, {
          ...clientData,
          photos: true,
        });
        if (result) {
          toast.success("Client updated successfully!");
          router.push(`/dashboard/categories`);
        } else {
          toast.error("Failed to update client");
        }
      } else {
        const result = await createClient(clientData);
        if (result.success) {
          toast.success("Client created successfully!");
          router.push(`/dashboard/categories`);
          reset();
          setImageUrl("/placeholder.svg");
          setGalleryImages([]);
          setSelectedCategory(null);
          setSelectedPhotoCategory(null);
        } else {
          toast.error(result.error || "Failed to create client");
        }
      }
    } catch (error) {
      console.error("Error saving client:", error);
      toast.error("Failed to save client. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="dark:bg-black/50 backdrop-blur-sm max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <FormHeader
        href="/dashboard/categories"
        title="Client"
        editingId={editingId}
        loading={loading}
        parent=""
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-4">
        <div className="lg:col-span-8 space-y-3">
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Client Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <TextInput
                  register={register}
                  errors={errors}
                  label="Client Title"
                  name="title"
                />

                <TextInput
                  register={register}
                  errors={errors}
                  label="Event Date"
                  name="eventDate"
                  type="date"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextInput
                    register={register}
                    errors={errors}
                    label="YouTube URL"
                    name="youtubeUrl"
                    placeholder="https://youtube.com/..."
                  />
                  <PasswordInput
                    register={register}
                    // errors={errors}
                    label="Password (Optional)"
                    name="password"
                    toolTipText="Set a password to protect this client's gallery"
                    errors={undefined}
                  />
                </div>

                <TextArea
                  register={register}
                  errors={errors}
                  label="Description"
                  name="description"
                />

                <div className="space-y-6">
                  <Card>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                        <FormSelectInput
                          label="Choose Category"
                          options={categoryOptions}
                          option={selectedCategory}
                          setOption={setSelectedCategory}
                          toolTipText="Add New Category"
                          href="/dashboard/categories/new"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                      <FormSelectInput
                        label="Photo Categories (Optional)"
                        options={photoCategories.map((cat) => ({
                          value: cat.id,
                          label: cat.title,
                        }))}
                        option={selectedPhotoCategory}
                        setOption={setSelectedPhotoCategory}
                        toolTipText="Add New Photo Category"
                        href="/dashboard/photo-categories/new"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <div className="grid gap-6">
            <ImageInput
              title="Client Cover Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="clientImage"
            />

            <MultipleImageInput
              title="Gallery Images"
              imageUrls={galleryImages}
              setImageUrls={setGalleryImages}
              categoryImage="categoryImage"
            />
          </div>
        </div>
      </div>

      <FormFooter
        href="/dashboard/categories"
        editingId={editingId}
        loading={loading}
        title="Client"
        parent=""
      />

      <Popup
        isOpen={isPhotoCategoryPopupOpen}
        onClose={() => setIsPhotoCategoryPopupOpen(false)}
        title="Add Photo Category"
      >
        <AddEventCategoryForm
          onSuccess={handlePhotoCategoryAdd}
          clientId={editingId || ""}
        />
      </Popup>
    </form>
  );
}
