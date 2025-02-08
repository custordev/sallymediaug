/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Select from "react-tailwindcss-select";
import { Option, Options } from "react-tailwindcss-select/dist/components/type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateSlug } from "@/lib/generateSlug";
import { toast } from "react-hot-toast";
import { createPhotoCategory } from "@/actions/photoCategory";

type FormSelectInputProps = {
  options: Options;
  label: string;
  option: Option;
  setOption: (option: Option | null) => void;
  href?: string;
  labelShown?: boolean;
  toolTipText?: string;
};

export default function FormSelectInput({
  options,
  label,
  option,
  setOption,
  href,
  toolTipText,
  labelShown = true,
}: FormSelectInputProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const slug = generateSlug(formData.title);
      const result = await createPhotoCategory({
        title: formData.title,
        slug,
        description: formData.description,
      });

      if (result.success) {
        if (result.data) {
          const newOption = { value: result.data.id, label: result.data.title };
          setOption(newOption);
        } else {
          toast.error("Failed to create category: No data returned");
        }

        toast.success("Category created successfully!");
        setIsOpen(false);
        setFormData({ title: "", description: "" });
      } else {
        toast.error(result.error || "Failed to create category");
      }
    } catch (error) {
      toast.error("An error occurred while creating the category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    if (href === "/dashboard/categories/new") {
      router.push(href); // Redirect to add new category page
    } else {
      setIsOpen(true); // Show popup for photo category
    }
  };

  return (
    <div className="space-y-2">
      {labelShown && (
        <Label className="text-sm font-medium leading-6">Select {label}</Label>
      )}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Select
            isSearchable
            primaryColor="blue"
            value={option}
            onChange={(value) => setOption(value as Option | null)}
            options={options}
            placeholder={label}
          />
        </div>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="flex-shrink-0"
          onClick={handleAddClick}
        >
          <PlusCircle className="h-5 w-5" />
        </Button>

        {/* Popup only for adding new photo category */}
        {href !== "/dashboard/categories/new" && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Photo Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Category Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Category"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
