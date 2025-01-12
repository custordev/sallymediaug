/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  Trash2,
  Plus,
  Video,
  Calendar,
  Image as ImageIcon,
  MoreVertical,
  Youtube,
  FolderPlus,
} from 'lucide-react';

const getClientData = (category: string, clientId: string) => {
  const data = {
    "weddings-1": {
      name: "Emma & James",
      date: "2023-05-15",
      description: "A beautiful garden wedding ceremony",
      heroImage: "/denis-prossy/highlights/N77A8605.jpg",
      videoLink: "https://youtube.com/watch?v=example",
      categories: ["Highlights", "Church", "Reception", "Garden Session"],
      photos: [
        { id: 1, src: "/denis-prossy/highlights/N77A8605.jpg", category: "Highlights", title: "First Look" },
        { id: 2, src: "/denis-prossy/highlights/N77A8619.jpg", category: "Church", title: "Exchange of Vows" },
        { id: 3, src: "/denis-prossy/highlights/N77A8623.jpg", category: "Reception", title: "First Dance" },
        { id: 4, src: "/denis-prossy/highlights/N77A8645.jpg", category: "Highlights", title: "Couple Portrait" },
        { id: 5, src: "/denis-prossy/highlights/N77A8646.jpg", category: "Garden Session", title: "Garden Portraits" },
        { id: 6, src: "/denis-prossy/highlights/N77A9197.jpg", category: "Reception", title: "Cake Cutting" },
      ],
    },
  };
  return data[`${category}-${clientId}` as keyof typeof data] || null;
};

export default function ClientGallery({ category, clientId }: { category: string; clientId: string }) {
  const [client, setClient] = React.useState(getClientData(category, clientId));
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [isEditingEvent, setIsEditingEvent] = React.useState(false);
  const [editedEvent, setEditedEvent] = React.useState(client);
  const [showAddCategory, setShowAddCategory] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState("");

  if (!client) {
    return <div className="text-center py-16">Client not found</div>;
  }

  const filteredPhotos = activeCategory === "All" 
    ? client.photos 
    : client.photos.filter(photo => photo.category === activeCategory);

  const handleEventUpdate = () => {
    setClient(editedEvent);
    setIsEditingEvent(false);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setClient(prev => ({
        ...prev!,
        categories: [...prev!.categories, newCategory.trim()]
      }));
      setNewCategory("");
      setShowAddCategory(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section with Edit Controls */}
      <div className="relative rounded-xl overflow-hidden shadow-xl">
        <div className="relative h-[400px]">
          <Image
            src={client.heroImage}
            alt={client.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          
          {/* Event Details */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold">{client.name}</h1>
                <p className="text-xl flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {new Date(client.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                {client.description && (
                  <p className="text-white/80">{client.description}</p>
                )}
              </div>
              
              {/* Event Edit Controls */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-10 w-10 bg-white/10 hover:bg-white/20 backdrop-blur-md"
                  >
                    <MoreVertical className="h-5 w-5 text-white" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" /> Edit Event Details
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Event
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {client.videoLink && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            className="bg-white shadow-md hover:bg-gray-50"
            onClick={() => window.open(client.videoLink, '_blank')}
          >
            <Youtube className="mr-2 h-5 w-5 text-red-600" />
            Watch Highlight Video
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-10 w-10">
                <Edit className="h-4 w-4" />
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
                    value={client.videoLink}
                    onChange={(e) => setClient(prev => ({
                      ...prev!,
                      videoLink: e.target.value
                    }))}
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Category Management */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Photo Categories</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FolderPlus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Category Name</Label>
                  <Input
                    placeholder="e.g., Garden Session"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddCategory}>Add Category</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeCategory === "All" ? "default" : "outline"}
            onClick={() => setActiveCategory("All")}
            className="shadow-sm"
          >
            All Photos
          </Button>
          {client.categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className="shadow-sm"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhotos.map((photo, index) => (
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
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Photo Actions */}
                  <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 bg-white/90 hover:bg-white shadow-md"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Photo Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Title</Label>
                                <Input defaultValue={photo.title} />
                              </div>
                              <div className="space-y-2">
                                <Label>Category</Label>
                                <select className="w-full p-2 border rounded-md">
                                  {client.categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Photo
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Add Photo Card */}
        <Dialog>
          <DialogTrigger asChild>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: filteredPhotos.length * 0.05 }}
            >
              <Card className="h-full cursor-pointer group hover:bg-gray-50 transition-colors">
                <CardContent className="h-full flex items-center justify-center p-0">
                  <div className="relative aspect-[4/3] w-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg group-hover:border-amber-500 transition-colors">
                    <div className="text-center space-y-2">
                      <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center mx-auto">
                        <ImageIcon className="h-6 w-6 text-amber-600" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">Add New Photo</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Upload Photo</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <ImageIcon className="h-8 w-8 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Drag and drop your photo here, or click to select
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="e.g., First Dance" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select className="w-full p-2 border rounded-md">
                  {client.categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}