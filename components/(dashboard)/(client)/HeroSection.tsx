/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { Calendar, Edit } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

interface HeroSectionProps {
  client: any;
  editedEvent: any;
  setEditedEvent: React.Dispatch<React.SetStateAction<any>>;
  handleEventUpdate: () => Promise<void>;
}

export function HeroSection({
  client,
  editedEvent,
  setEditedEvent,
  handleEventUpdate,
}: HeroSectionProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl">
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src={client?.imageUrl || "/placeholder.svg"}
          alt={client?.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                {client?.title}
              </h1>
              <p className="text-lg md:text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {new Date(client?.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {client?.description && (
                <p className="text-white/80 text-sm md:text-base max-w-prose">
                  {client?.description}
                </p>
              )}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 bg-white/10 hover:bg-white/20 backdrop-blur-md"
                >
                  <Edit className="h-5 w-5 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Event Details</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={editedEvent?.title}
                      onChange={(e) =>
                        setEditedEvent((prev: any) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={editedEvent?.eventDate}
                      onChange={(e) =>
                        setEditedEvent((prev: any) => ({
                          ...prev,
                          eventDate: e.target.value,
                        }))
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={editedEvent?.description}
                      onChange={(e) =>
                        setEditedEvent((prev: any) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={handleEventUpdate}>Save changes</Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
