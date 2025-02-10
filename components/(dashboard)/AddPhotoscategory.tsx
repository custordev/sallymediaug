"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { createPhotoCategory } from "@/actions/photoCategory";
import { PhotoCategory } from "@prisma/client";

interface AddEventCategoryFormProps {
  onSuccess: (newCategory: PhotoCategory) => void;
  clientId: string;
}

interface FormInputs {
  title: string;
  description?: string;
}

export function AddEventCategoryForm({
  onSuccess,
  clientId,
}: AddEventCategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormInputs, e?: React.BaseSyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log("Creating category with clientId:", clientId); // Debug log

    if (!clientId) {
      toast.error("Client ID is required");
      return;
    }

    try {
      setLoading(true);

      const slug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const result = await createPhotoCategory({
        title: data.title,
        slug,
        description: data.description,
        clientId: clientId,
      });

      if (result.success && result.data) {
        toast.success("Photo category created successfully!");
        reset();
        onSuccess(result.data);
      } else {
        toast.error(result.error || "Failed to create photo category");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An error occurred while creating the category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmit((data) => onSubmit(data, e))(e);
      }} 
      onClick={(e) => e.stopPropagation()}
      className="space-y-4"
    >
      <div className="grid gap-4" onClick={(e) => e.stopPropagation()}>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <div className="col-span-3">
            <Input
              id="title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
              })}
              placeholder="Enter category title"
              onClick={(e) => e.stopPropagation()}
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Input
            id="description"
            {...register("description")}
            className="col-span-3"
            placeholder="Optional description"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={loading || !clientId}
          className="min-w-[150px]"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit((data) => onSubmit(data, e))(e);
          }}
        >
          {loading ? "Creating..." : "Create Category"}
        </Button>
      </div>
    </form>
  );
}