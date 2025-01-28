/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Youtube } from "lucide-react";

interface VideoSectionProps {
  client: any;
  editedEvent: any;
  setEditedEvent: React.Dispatch<React.SetStateAction<any>>;
  handleEventUpdate: () => Promise<void>;
}

export function VideoSection({
  client,
  editedEvent,
  setEditedEvent,
  handleEventUpdate,
}: VideoSectionProps) {
  if (!client?.youtubeUrl) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-8">
      <div className="w-full md:w-2/3 aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${client?.youtubeUrl.split("v=")[1]}`}
          title="Event Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/3">
        <Button
          variant="outline"
          size="lg"
          className="bg-white shadow-md hover:bg-gray-50 w-full"
          onClick={() => window.open(client?.youtubeUrl, "_blank")}
        >
          <Youtube className="mr-2 h-5 w-5 text-red-600" />
          Watch on YouTube
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="w-full">
              <Edit className="mr-2 h-4 w-4" />
              Edit Video Link
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Video Link</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="youtubeUrl" className="text-right">
                  YouTube URL
                </Label>
                <Input
                  id="youtubeUrl"
                  placeholder="https://youtube.com/watch?v=..."
                  value={editedEvent?.youtubeUrl}
                  onChange={(e) =>
                    setEditedEvent((prev: any) => ({
                      ...prev,
                      youtubeUrl: e.target.value,
                    }))
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleEventUpdate}>Update Video Link</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
