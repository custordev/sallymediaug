import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2, Youtube } from "lucide-react";
import { useState } from "react";

interface VideoControlsProps {
  youtubeUrl: string;
  onUpdate: (url: string) => Promise<void>;
  loading: boolean;
}

export function VideoControls({
  youtubeUrl,
  onUpdate,
  loading,
}: VideoControlsProps) {
  const [newUrl, setNewUrl] = useState(youtubeUrl);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = async () => {
    await onUpdate(newUrl);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="outline"
        size="lg"
        className="bg-white shadow-md hover:bg-gray-50"
        onClick={() => window.open(youtubeUrl, "_blank")}
      >
        <Youtube className="mr-2 h-5 w-5 text-red-600" />
        Watch on YouTube
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="lg">
            <Edit className="mr-2 h-4 w-4" />
            Edit Video Link
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Video Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>YouTube Video URL</Label>
              <Input
                placeholder="https://youtube.com/watch?v=..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
            </div>
            <Button
              onClick={handleUpdate}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Video Link"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
