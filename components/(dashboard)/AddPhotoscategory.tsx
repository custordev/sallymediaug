import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { createPhotoCategory } from "@/actions/photoCategory";

interface AddEventCategoryFormProps {
  onSuccess: () => void;
}

interface FormInputs {
  title: string;
  description?: string;
}

export function AddEventCategoryForm({ onSuccess }: AddEventCategoryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);

    // Create the slug from the title
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace any non-alphanumeric chars with hyphen
      .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

    const result = await createPhotoCategory({
      title: data.title,
      slug,
      description: data.description,
    });

    if (result.success) {
      toast.success("Event category created successfully!");
      reset();
      onSuccess();
    } else {
      toast.error(result.error || "Failed to create event category");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4">
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
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading} className="min-w-[150px]">
          {loading ? "Creating..." : "Create Category"}
        </Button>
      </div>
    </form>
  );
}
