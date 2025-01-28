/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FolderPlus } from 'lucide-react';

interface CategoryManagementProps {
  client: any;
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  handleAddCategory: (category: string) => Promise<void>;
}

export function CategoryManagement({ client, activeCategory, setActiveCategory, handleAddCategory }: CategoryManagementProps) {
  const [newCategory, setNewCategory] = useState('');

  return (
    <div className="space-y-4 my-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Photo Categories</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <FolderPlus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  placeholder="e.g., Garden Session"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={() => {
              handleAddCategory(newCategory);
              setNewCategory('');
            }}>
              Add Category
            </Button>
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
        {client.eventCategories.map((cat: any) => (
          <Button
            key={cat.id}
            variant={activeCategory === cat.title ? "default" : "outline"}
            onClick={() => setActiveCategory(cat.title)}
            className="shadow-sm"
          >
            {cat.title}
          </Button>
        ))}
      </div>
    </div>
  );
}

