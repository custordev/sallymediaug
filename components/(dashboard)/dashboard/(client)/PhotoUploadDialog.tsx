"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2 } from "lucide-react";

import { useState } from "react";
import MultipleImageInput from "@/components/(forms)/MultipleImageInput";

interface PhotoUploadDialogProps {
  onUpload: (photos: string[]) => Promise<void>;
  loading: boolean;
}

export function PhotoUploadDialog({
  onUpload,
  loading,
}: PhotoUploadDialogProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpload = async () => {
    await onUpload(images);
    setImages([]);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <ImageIcon className="mr-2 h-4 w-4" />
          Upload New Photos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Upload Photos</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <MultipleImageInput
            title="Gallery Images"
            imageUrls={images}
            setImageUrls={setImages}
            categoryImage="categoryImage"
          />
          <Button
            onClick={handleUpload}
            disabled={loading || images.length === 0}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Photos"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
