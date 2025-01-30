import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import type { Photo } from "@/types/types"

interface PhotoCardProps {
  photo: Photo
  index: number
  onDelete: () => Promise<void>
}

export function PhotoCard({ photo, index, onDelete }: PhotoCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDeleting(true)
    await onDelete()
    setIsDeleting(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="w-full"
    >
      <Card className="group overflow-hidden h-full">
        <CardContent className="p-2 relative h-full">
          <div className="relative aspect-square overflow-hidden rounded-md">
            <Image src={photo.url || "/placeholder.svg"} alt={`Photo ${index + 1}`} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="destructive" size="sm" className="h-8 w-8" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

