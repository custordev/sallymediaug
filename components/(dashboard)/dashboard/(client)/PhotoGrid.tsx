/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import type { Photo, Client } from "@/types/types";
import { createPhoto, deletePhoto } from "@/actions/photos";
import MultipleImageInput from "@/components/(forms)/MultipleImageInput";
import { PhotoCard } from "./PhotoCard";

interface PhotoGridProps {
  client: Client;
  activeCategory: string;
}

export function PhotoGrid({ client, activeCategory }: PhotoGridProps) {
  const [photos, setPhotos] = useState<Photo[]>(client.photos || []);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async (newUrls: string[]) => {
    setUploading(true);
    try {
      for (const url of newUrls) {
        const newPhoto = await createPhoto({
          url,
          clientId: String(client.id),
          categoryId: activeCategory !== "All" ? activeCategory : undefined,
        });
        // if (newPhoto) {
        //   setPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
        // }
      }
      toast.success("Photos uploaded successfully");
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
      : photos.filter((photo) => photo.category === activeCategory);

  return (
    <div className="space-y-4">
      <MultipleImageInput
        title="Upload Photos"
        imageUrls={[]}
        setImageUrls={handlePhotoUpload}
        categoryImage="categoryImage"
      />
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
