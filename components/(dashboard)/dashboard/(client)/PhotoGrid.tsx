/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { updateClientById } from "@/actions/client";
import { SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { Lightbox } from "./LightBox";
import { PhotoUploadDialog } from "./PhotoUploadDialog";
import { PhotoCard } from "./PhotoCard";
import { Photo } from "@/types/types";

export function PhotoGrid({ client, setClient, activeCategory }: any) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const filteredPhotos =
    activeCategory === "All"
      ? client.photos || []
      : (client.photos || []).filter(
          (photo: { category: string }) => photo.category === activeCategory
        );

  const handlePhotoUpload = async (newPhotos: string[]) => {
    setLoading(true);
    try {
      const photoObjects = newPhotos.map((src) => ({
        src,
        category:
          activeCategory !== "All"
            ? activeCategory
            : client.eventCategories?.[0]?.title || "Uncategorized",
      }));

      const updated = await updateClientById(client.id, {
        ...client,
        photos: [...(client.photos || []), ...photoObjects],
      });

      if (updated) {
        setClient(updated);
        toast.success("Photos uploaded successfully");
      }
    } catch (error) {
      toast.error("Failed to upload photos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <PhotoUploadDialog onUpload={handlePhotoUpload} loading={loading} />

      {filteredPhotos.map((photo: Photo, index: SetStateAction<number>) => (
        <PhotoCard
          key={photo.id || (index as number)}
          photo={photo}
          onClick={() => {
            setCurrentPhotoIndex(index);
            setLightboxOpen(true);
          }}
          onDelete={async () => {
            const updated = await updateClientById(client.id, {
              ...client,
              photos: client.photos.filter((p: any) => p.id !== photo.id),
            });
            if (updated) {
              setClient(updated);
              toast.success("Photo deleted successfully");
            }
          }}
          index={0}
        />
      ))}

      {lightboxOpen && (
        <Lightbox
          photos={filteredPhotos}
          currentIndex={currentPhotoIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={() =>
            setCurrentPhotoIndex((prev) => (prev + 1) % filteredPhotos.length)
          }
          onPrev={() =>
            setCurrentPhotoIndex(
              (prev) =>
                (prev - 1 + filteredPhotos.length) % filteredPhotos.length
            )
          }
        />
      )}
    </div>
  );
}
