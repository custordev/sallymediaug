/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { updateClientById } from "@/actions/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { VideoControls } from "./VideoControls";

function getYouTubeVideoId(url: string): string | null {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export function VideoSection({ client, setClient }: any) {
  const [loading, setLoading] = useState(false);

  const handleVideoUpdate = async (newUrl: string) => {
    setLoading(true);
    try {
      const updated = await updateClientById(client.id, {
        ...client,
        youtubeUrl: newUrl,
      });
      if (updated) {
        setClient(updated);
        toast.success("Video updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update video");
    } finally {
      setLoading(false);
    }
  };

  if (!client.youtubeUrl) return null;

  const videoId = getYouTubeVideoId(client.youtubeUrl);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      <div className="w-full md:w-2/3 aspect-video rounded-lg overflow-hidden shadow-lg">
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Event Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <p>Invalid YouTube URL</p>
          </div>
        )}
      </div>
      <VideoControls
        youtubeUrl={client.youtubeUrl}
        onUpdate={handleVideoUpdate}
        loading={loading}
      />
    </div>
  );
}
