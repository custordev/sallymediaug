/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Category } from "@prisma/client";
import { Client } from "@prisma/client";
import { useForm } from "react-hook-form";
import { generateSlug } from "@/lib/generateSlug";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";

import { createClient, updateClientById } from "@/actions/client";
// import ShadSelectInput from "../FormInputs/ShadSelectInput";

// import MultipleImageInput from "../FormInputs/MultipleImageInput";
import ImageInput from "../(formInputs)/ImageInput";
import TextArea from "../(formInputs)/TextAreaInput";
import TextInput from "../(formInputs)/TextInput";
import MultipleImageInput from "./MultipleImageInput";
import ShadSelectInput from "./ShadSelectInput";
import NewButton from "./NewButton";

export type ClientFormProps = {
  editingId?: string;
  initialData?: Client | null;
  categories: Category[] | null;
};

export default function ClientForm({
  categories,
  editingId,
  initialData,
}: ClientFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      eventDate: initialData?.eventDate
        ? new Date(initialData.eventDate).toISOString().split("T")[0]
        : "",
      youtubeUrl: initialData?.youtubeUrl || "",
    },
  });

  const [categoryId, setCategoryId] = useState<string>(
    initialData?.categoryId || ""
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    initialData?.imageUrl || "/placeholder.svg"
  );
  const [galleryImages, setGalleryImages] = useState<string[]>(
    initialData?.galleryImages || []
  );

  async function saveClient(data: any) {
    try {
      setLoading(true);
      const clientData = {
        ...data,
        categoryId,
        imageUrl,
        galleryImages,
        slug: generateSlug(data.title),
      };

      if (editingId) {
        await updateClientById(editingId, clientData);
        toast.success("Updated Successfully!");
        router.push("/dashboard/clients");
      } else {
        await createClient(clientData);
        toast.success("Successfully Created!");
        reset();
        setImageUrl("/placeholder.svg");
        setGalleryImages([]);
        router.push("/dashboard/clients");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="dark:bg-black/50 backdrop-blur-sm"
      onSubmit={handleSubmit(saveClient)}
    >
      <FormHeader
        href="/dashboard/clients"
        title="Client"
        editingId={editingId}
        loading={loading}
        parent=""
      />

      <div className="grid grid-cols-12 gap-6 py-4">
        <div className="lg:col-span-8 col-span-full space-y-3">
          <Card>
            <CardHeader>
              <CardTitle>Client Details</CardTitle>
            </CardHeader>
            <CardContent>
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

                <div className="flex items-center gap-4 lg:gap-40 justify-between">
                  <div className="">
                    {categories && Array.isArray(categories) ? (
                      <ShadSelectInput
                        label="Choose Category"
                        optionTitle="select from below"
                        options={categories.map((category: any) => ({
                          value: category.id,
                          label: category.title,
                        }))}
                        selectedOption={categoryId}
                        setSelectedOption={setCategoryId}
                        initialData={initialData?.categoryId}
                      />
                    ) : (
                      <p className="text-red-600 text-sm">
                        No categories available
                      </p>
                    )}
                  </div>
                  <div className="mt-8">
                    <NewButton
                      href="/dashboard/categories/new"
                      toolTipText="Add Category"
                      title="Add category"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 col-span-full">
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
        href="/dashboard/clients"
        editingId={editingId}
        loading={loading}
        title="Client"
        parent=""
      />
    </form>
  );
}
