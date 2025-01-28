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
import ShadSelectInput from "../(forms)/ShadSelectInput";
import NewButton from "../(forms)/NewButton";
import MultipleImageInput from "../(forms)/MultipleImageInput";
import FormFooter from "../(forms)/FormFooter";
import { Popup } from "./popupcat";
import { AddEventCategoryForm } from "./AddPhotoscategory";
import { ClientFormData } from "@/types/types";

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
  const [categoryId, setCategoryId] = useState<string>("");
  const [selectedPhotoCategories, setSelectedPhotoCategories] = useState<
    string[]
  >([]);
  const [imageUrl, setImageUrl] = useState<string>("/placeholder.svg");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [isPhotoCategoryPopupOpen, setIsPhotoCategoryPopupOpen] =
    useState(false);

  // Initialize form data when initialData changes
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
      setCategoryId(initialData.categoryId);
      setSelectedPhotoCategories(
        initialData.eventCategories?.map((ec) => ec.id) || []
      );
      setImageUrl(initialData.imageUrl || "/placeholder.svg");
      setGalleryImages(initialData.galleryImages || []);
    }
  }, [initialData, setValue]);

  const validateForm = () => {
    if (!categoryId) {
      toast.error("Please select a category");
      return false;
    }

    if (selectedPhotoCategories.length === 0) {
      toast.error("Please select at least one event category");
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
      const clientData: ClientFormData = {
        title: data.title,
        description: data.description || undefined, // Convert null to undefined
        eventDate: data.eventDate,
        youtubeUrl: data.youtubeUrl || undefined, // Convert null to undefined
        categoryId,
        eventCategories: selectedPhotoCategories,
        imageUrl: imageUrl !== "/placeholder.svg" ? imageUrl : undefined,
        galleryImages,
        slug: generateSlug(data.title),
      };

      if (editingId) {
        const result = await updateClientById(editingId, clientData);
        if (result) {
          toast.success("Client updated successfully!");
          // Route to the category page using the category slug
          const category = categories?.find((cat) => cat.id === categoryId);
          router.push(`/dashboard/categories/${category?.slug}`);
        } else {
          toast.error("Failed to update client");
        }
      } else {
        const result = await createClient(clientData);
        if (result.success) {
          toast.success("Client created successfully!");
          // Route to the category page using the category slug
          const category = categories?.find((cat) => cat.id === categoryId);
          router.push(`/dashboard/categories/${category?.slug}`);
          reset();
          setImageUrl("/placeholder.svg");
          setGalleryImages([]);
          setCategoryId("");
          setSelectedPhotoCategories([]);
        } else {
          switch (result.statusCode) {
            case 400:
              toast.error("Please fill in all required fields");
              break;
            case 409:
              toast.error("A client with this name already exists");
              break;
            default:
              toast.error(result.error || "Failed to create client");
          }
          return;
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
                  // required
                />

                <TextInput
                  register={register}
                  errors={errors}
                  label="Event Date"
                  name="eventDate"
                  type="date"
                  // required
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
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                    <div className="flex-1 w-full">
                      {categories && categories.length > 0 ? (
                        <ShadSelectInput
                          label="Choose Category"
                          optionTitle="select from below"
                          options={categories.map((category: Category) => ({
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
                    <div className="sm:mt-8">
                      <NewButton
                        onClick={(e) => {
                          e.preventDefault();
                          setIsCategoryPopupOpen(true);
                        }}
                        toolTipText="Add Category"
                        title="Add category"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                  <div className="flex-1 w-full">
                    {photoCategories && photoCategories.length > 0 ? (
                      <ShadSelectInput
                        label="Photo Categories (Optional)"
                        optionTitle="select photo categories"
                        options={photoCategories.map(
                          (category: PhotoCategory) => ({
                            value: category.id,
                            label: category.title,
                          })
                        )}
                        selectedOption={selectedPhotoCategories}
                        setSelectedOption={setSelectedPhotoCategories}
                        initialData={initialData?.eventCategories?.map(
                          (ec) => ec.id
                        )}
                        // required={false}
                      />
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No custom photo categories available. Photos will be
                        added to &quot;All&quot; category by default.
                      </p>
                    )}
                  </div>
                  <div className="sm:mt-8">
                    <NewButton
                      onClick={(e) => {
                        e.preventDefault();
                        setIsPhotoCategoryPopupOpen(true);
                      }}
                      toolTipText="Add Photo Category"
                      title="Add photo category"
                    />
                  </div>
                </div>
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
