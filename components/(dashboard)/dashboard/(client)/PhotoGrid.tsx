/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import type { Photo, Client, PhotoCategory } from "@/types/types";
import { createPhoto, deletePhoto } from "@/actions/photos";
import { PhotoCard } from "./PhotoCard";

import { getPhotoCategories } from "@/actions/photoCategory";
import { Button } from "@/components/ui/button";
import MultipleImageInput from "@/components/(forms)/MultipleImageInputDs";

interface PhotoGridProps {
  client: Client;
  activeCategory: string;
}

export function PhotoGrid({ client, activeCategory }: PhotoGridProps) {
  const [photos, setPhotos] = useState<Photo[]>(client.photos || []);
  const [uploading, setUploading] = useState(false);
  const [photoCategories, setPhotoCategories] = useState<PhotoCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getPhotoCategories();
      if (result.success) {
        setPhotoCategories(result.data as PhotoCategory[]);
      }
    };
    fetchCategories();
  }, []);

  const handleImageSelection = (urls: string[]) => {
    setSelectedImages(urls);
  };

  const handlePhotoUpload = async () => {
    if (!selectedCategoryId) {
      toast.error("Please select a photo category");
      return;
    }

    if (selectedImages.length === 0) {
      toast.error("Please select images to upload");
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = selectedImages.map((url) =>
        createPhoto({
          url,
          clientId: String(client.id),
          categoryId: selectedCategoryId,
        })
      );

      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter((result) => result.success);

      if (successfulUploads.length > 0) {
        const newPhotos = successfulUploads.map((result) => result.data as unknown as Photo);
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos] as Photo[]);
        setSelectedImages([]);
        toast.success(
          `${successfulUploads.length} photos uploaded successfully`
        );
      }
    } catch (error) {
      toast.error("Failed to upload photos");
    } finally {
      setUploading(false);
    }
  };

  const handlePhotoDelete = async (photoId: string) => {
    try {
      const result = await deletePhoto(photoId);
      if (result.success) {
        setPhotos((prevPhotos) => prevPhotos.filter((p) => p.id !== photoId));
        toast.success("Photo deleted successfully");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Failed to delete photo");
    }
  };

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter((photo) => {
          if (typeof photo.category === 'string') {
            return photo.category === activeCategory;
          }
          return photo.category && typeof photo.category !== 'string' && (photo.category as PhotoCategory).title === activeCategory;
        });

  return (
    <div className="space-y-4">
      <MultipleImageInput
        title="Upload Photos"
        imageUrls={selectedImages}
        setImageUrls={handleImageSelection}
        categoryImage="categoryImage"
        photoCategories={photoCategories}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
        disabled={uploading}
      />
      <Button onClick={handlePhotoUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Save Images"}
      </Button>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <AnimatePresence>
          {filteredPhotos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onDelete={() => handlePhotoDelete(photo.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}