/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Image from "next/image";
import { updateClientById } from "@/actions/client";
import toast from "react-hot-toast";
import { Calendar } from "lucide-react";
import { EditHeroDialog } from "./EditHeroDialog";
import { formatDate } from "@/lib/formatDate";


export function HeroSection({ client, setClient }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editedClient, setEditedClient] = useState(client);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const updated = await updateClientById(client.id, editedClient);
      if (updated) {
        setClient(updated);
        setIsEditing(false);
        toast.success("Updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl">
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={client.imageUrl || "/placeholder.svg"}
          alt={client.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-4xl font-bold">{client.title}</h1>
              <div className="flex items-center text-white mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(client.eventDate)}</span>
              </div>
              {client.description && (
                <p className="text-sm md:text-base text-white/80 line-clamp-2 md:line-clamp-none">
                  {client.description}
                </p>
              )}
            </div>

            <EditHeroDialog
              isOpen={isEditing}
              setIsOpen={setIsEditing}
              editedClient={editedClient}
              setEditedClient={setEditedClient}
              onSave={handleUpdate}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
