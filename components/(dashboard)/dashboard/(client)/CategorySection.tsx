/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createPhotoCategory, deletePhotoCategory, getPhotoCategories } from "@/actions/photoCategory"
import { toast } from "react-hot-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import type { PhotoCategory } from "@/types/types"
import { Trash2 } from "lucide-react"
import { DeleteConfirmationDialog } from "../../deleteDialog"


interface CategorySectionProps {
  client: any
  setClient: (client: any) => void
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export function CategorySection({ client, setClient, activeCategory, setActiveCategory }: CategorySectionProps) {
  const [loading, setLoading] = useState(false)
  const [isAddingPhotoCategory, setIsAddingPhotoCategory] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [description, setDescription] = useState("")
  const [categories, setCategories] = useState<PhotoCategory[]>([])
  const [categoryToDelete, setCategoryToDelete] = useState<PhotoCategory | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCategories = async () => {
      if (client?.id) {
        // Only fetch if we have a client ID
        const result = await getPhotoCategories(client.id)
        if (result.success) {
          setCategories(result.data as any)
        }
      }
    }
    fetchCategories()
  }, [client?.id])

  const handleAddPhotoCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCategory.trim()) return

    setLoading(true)
    try {
      const slug = newCategory
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")

      const result = await createPhotoCategory({
        title: newCategory.trim(),
        slug,
        description: description.trim(),
        clientId: client.id,
      })

      if (result.success) {
        if (result.data) {
          setCategories((prev) => [...prev, result.data])
        }
        toast.success("Photo category added successfully")
        setIsAddingPhotoCategory(false)
        setNewCategory("")
        setDescription("")
        router.refresh()
      } else {
        toast.error(result.error || "Failed to add photo category")
      }
    } catch (error) {
      toast.error("Failed to add photo category")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (category: PhotoCategory) => {
    setCategoryToDelete(category)
  }

  const confirmDeleteCategory = async () => {
    if (!categoryToDelete) return

    setLoading(true)
    try {
      const result = await deletePhotoCategory(categoryToDelete.id)
      if (result.success) {
        setCategories((prev) => prev.filter((cat) => cat.id !== categoryToDelete.id))
        toast.success("Category deleted successfully")
        if (activeCategory === categoryToDelete.title) {
          setActiveCategory("All")
        }
        router.refresh()
      } else {
        toast.error(result.error || "Failed to delete category")
      }
    } catch (error) {
      toast.error("Failed to delete category")
    } finally {
      setLoading(false)
      setCategoryToDelete(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl lg:text-2xl font-semibold">Photo Categories</h2>
        <Button onClick={() => setIsAddingPhotoCategory(true)}>Add Category</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <Button
              onClick={() => setActiveCategory(category.title)}
              variant={activeCategory === category.title ? "default" : "outline"}
            >
              {category.title}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category)} className="ml-1">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Dialog open={isAddingPhotoCategory} onOpenChange={setIsAddingPhotoCategory}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Photo Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddPhotoCategory}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="col-span-3"
                  placeholder="e.g., Highlights"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="col-span-3"
                  rows={3}
                  placeholder="Category description (optional)"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        isOpen={!!categoryToDelete}
        onClose={() => setCategoryToDelete(null)}
        onConfirm={confirmDeleteCategory}
        title="Delete Category"
        description={`Are you sure you want to delete the category "${categoryToDelete?.title}"?`}
      />
    </div>
  )
}

