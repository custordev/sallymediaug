/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { PhotoCategory } from "@/types/types";

interface MultipleImageInputProps {
  title: string;
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
  categoryImage: string;
  photoCategories: PhotoCategory[];
  selectedCategoryId: string;
  onCategoryChange: (categoryId: string) => void;
  disabled?: boolean;
}

export default function MultipleImageInput({
  title,
  imageUrls,
  setImageUrls,
  categoryImage,
  photoCategories,
  selectedCategoryId,
  onCategoryChange,
  disabled,
}: MultipleImageInputProps) {
  const handleRemoveImage = (indexToRemove: number) => {
    setImageUrls(imageUrls.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{title}</CardTitle>
          <Select
            value={selectedCategoryId}
            onValueChange={onCategoryChange}
            disabled={disabled}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {photoCategories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {imageUrls.map((imageUrl: string, i: number) => (
              <div key={i} className="relative group">
                <Image
                  alt="Uploaded image"
                  className="w-40 h-auto rounded-md object-cover aspect-square"
                  src={imageUrl || "/placeholder.svg"}
                  width={1080}
                  height={1080}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(i)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          <UploadButton
            className="ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-button:h-10 ut-button:px-4 ut-button:py-2"
            endpoint="categoryImage"
            onClientUploadComplete={(res) => {
              if (!selectedCategoryId) {
                alert("Please select a category first");
                return;
              }
              const newUrls = res.map((item) => item.url);
              setImageUrls([...imageUrls, ...newUrls]);
            }}
            onUploadError={(error: Error) => {
              alert(`Upload failed! ${error.message}`);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
