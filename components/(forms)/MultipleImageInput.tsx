/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";

import Image from "next/image";
import React from "react";

type ImageInputProps = {
  title: string;
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
  categoryImage: any;
};

export default function MultipleImageInput({
  title,
  imageUrls,
  setImageUrls,
  categoryImage,
}: ImageInputProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* Display main image */}
          {imageUrls.length > 0 ? (
            <Image
              alt={title}
              className="h-40 w-full rounded-md object-cover"
              height="300"
              src={imageUrls[0]} // Main image
              width="300"
            />
          ) : (
            <div className="h-40 w-full flex items-center justify-center border rounded-md">
              <span className="text-gray-500">No image selected</span>
            </div>
          )}

          {/* Display thumbnails */}
          <div className="grid grid-cols-3 gap-2">
            {imageUrls.map((imageUrl: string, i: number) => (
              <div key={i}>
                <Image
                  alt="Uploaded image"
                  className="aspect-square w-full rounded-md object-cover"
                  height="84"
                  src={imageUrl}
                  width="84"
                />
              </div>
            ))}
          </div>

          {/* Upload button */}
          <UploadButton
            className="col-span-full"
            endpoint={categoryImage}
            onClientUploadComplete={(res) => {
              // Append new image URLs to the existing list
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
