import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Loader2 } from "lucide-react";
import { Client } from "@/types/types";
import ImageInput from "@/components/(formInputs)/ImageInput";

interface EditHeroDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  editedClient: Client;
  setEditedClient: (client: Client) => void;
  onSave: () => Promise<void>;
  loading: boolean;
}

export function EditHeroDialog({
  isOpen,
  setIsOpen,
  editedClient,
  setEditedClient,
  onSave,
  loading,
}: EditHeroDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="secondary"
        size="icon"
        className="h-10 w-10 bg-white/10 hover:bg-white/20 backdrop-blur-md"
        onClick={() => setIsOpen(true)}
      >
        <Edit className="h-5 w-5 text-white" />
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Event Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Event Title</Label>
            <Input
              value={editedClient.title}
              onChange={(e) =>
                setEditedClient({
                  ...editedClient,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Event Date</Label>
            <Input
              type="date"
              value={editedClient.eventDate}
              onChange={(e) =>
                setEditedClient({
                  ...editedClient,
                  eventDate: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={editedClient.description}
              onChange={(e) =>
                setEditedClient({
                  ...editedClient,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <ImageInput
              title="Cover Image"
              imageUrl={editedClient.imageUrl}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setImageUrl={(url: any) =>
                setEditedClient({
                  ...editedClient,
                  imageUrl: url,
                })
              }
              endpoint="categoryImage"
            />
          </div>

          <Button onClick={onSave} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
