/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageIcon, Trash2 } from "lucide-react";
import MultipleImageInput from "@/components/(forms)/MultipleImageInput";


interface PhotoGridProps {
  filteredPhotos: any[];
  galleryImages: string[];
  setGalleryImages: React.Dispatch<React.SetStateAction<string[]>>;
  handleUploadPhotos: () => void;
  handleDeletePhoto: (photoId: string) => void;
}

export function PhotoGrid({
  filteredPhotos,
  galleryImages,
  setGalleryImages,
  handleUploadPhotos,
  handleDeletePhoto,
}: PhotoGridProps) {
  return (
    <div className="space-y-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full">
            <ImageIcon className="mr-2 h-4 w-4" />
            Upload New Photos
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Photos</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <MultipleImageInput
              title="Gallery Images"
              imageUrls={galleryImages}
              setImageUrls={setGalleryImages}
              categoryImage="categoryImage"
            />
            <Button onClick={handleUploadPhotos}>Upload Photos</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos?.map((photo: any, index: number) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="group overflow-hidden">
              <CardContent className="p-0 relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.title || `Photo ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDeletePhoto(photo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
