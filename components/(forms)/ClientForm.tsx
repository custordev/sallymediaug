/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState, useEffect, JSX } from "react";
import toast from "react-hot-toast";
import { Category, Client, PhotoCategory } from "@prisma/client";
import { useForm } from "react-hook-form";
import { generateSlug } from "@/lib/generateSlug";
import { createClient, updateClientById } from "@/actions/client";
import ImageInput from "../(formInputs)/ImageInput";
import TextArea from "../(formInputs)/TextAreaInput";
import TextInput from "../(formInputs)/TextInput";
import FormHeader from "../(forms)/FormHeader";

import MultipleImageInput from "../(forms)/MultipleImageInput";
import FormFooter from "../(forms)/FormFooter";

import FormSelectInput from "../(forms)/ShadSelectInput";
import { Popup } from "../(dashboard)/popupcat";
import { AddEventCategoryForm } from "../(dashboard)/AddPhotoscategory";

interface ExtendedClient extends Client {
  eventCategories?: PhotoCategory[];
  galleryImages?: string[];
}

interface ClientFormProps {
  editingId?: string;
  initialData?: ExtendedClient | null;
  categories: Category[] | null;
  eventCategories?: PhotoCategory[] | null;
  photoCategories?: PhotoCategory[] | null;
}

interface FormInputs {
  title: string;
  description: string | null;
  eventDate: string;
  youtubeUrl: string | null;
}

export default function ClientEditForm({
  categories,
  photoCategories,
  editingId,
  initialData,
}: ClientFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Transform categories for FormSelectInput
  const categoryOptions =
    categories?.map((category) => ({
      value: category.id,
      label: category.title,
    })) || [];

  // Transform photoCategories for FormSelectInput
  const photoCategoryOptions =
    photoCategories?.map((category) => ({
      value: category.id,
      label: category.title,
    })) || [];

  // Initialize selected categories with new approach
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
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
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
      setImageUrl(initialData.imageUrl || "/placeholder.svg");
      setGalleryImages(initialData.galleryImages || []);
    }
  }, [initialData, setValue]);

  const validateForm = () => {
    if (!selectedCategory) {
      toast.error("Please select a category");
      return false;
    }

    if (!selectedPhotoCategory) {
      toast.error("Please select at least one photo category");
      return false;
    }

    return true;
  };

  const handleCategoryAdd = () => {
    setIsCategoryPopupOpen(false);
  };

  const handlePhotoCategoryAdd = () => {
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
        imageUrl: imageUrl !== "/placeholder.svg" ? imageUrl : undefined,
        galleryImages,
        slug: generateSlug(data.title),
      };

      if (editingId) {
        const result = await updateClientById(editingId, clientData);
        if (result) {
          toast.success("Client updated successfully!");
          router.push(`/dashboard/categories/${selectedCategory.slug}`);
        } else {
          toast.error("Failed to update client");
        }
      } else {
        const result = await createClient(clientData);
        if (result.success) {
          toast.success("Client created successfully!");
          router.push(`/dashboard/categories/${selectedCategory.slug}`);
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

                <TextInput
                  register={register}
                  errors={errors}
                  label="YouTube URL"
                  name="youtubeUrl"
                  placeholder="https://youtube.com/..."
                />

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
                        label="Photo Categories"
                        options={photoCategoryOptions}
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
              title="Client Featured Image"
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              endpoint="categoryImage"
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
        isOpen={isCategoryPopupOpen}
        onClose={() => setIsCategoryPopupOpen(false)}
        title="Add Category"
      >
        <AddEventCategoryForm onSuccess={handleCategoryAdd} />
      </Popup>

      <Popup
        isOpen={isPhotoCategoryPopupOpen}
        onClose={() => setIsPhotoCategoryPopupOpen(false)}
        title="Add Photo Category"
      >
        <AddEventCategoryForm onSuccess={handlePhotoCategoryAdd} />
      </Popup>
    </form>
  );
}
