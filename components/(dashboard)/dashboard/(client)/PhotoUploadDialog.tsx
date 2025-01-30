import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Loader2 } from "lucide-react"

interface PhotoUploadDialogProps {
  onUpload: (photos: string[]) => Promise<void>
  loading: boolean
}

export function PhotoUploadDialog({ onUpload, loading }: PhotoUploadDialogProps) {
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<FileList | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files)
  }

  const handleUpload = async () => {
    if (files) {
      const fileArray = Array.from(files)
      const fileUrls = await Promise.all(
        fileArray.map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = (e) => resolve(e.target?.result as string)
            reader.readAsDataURL(file)
          })
        }),
      )
      await onUpload(fileUrls)
      setOpen(false)
      setFiles(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Upload className="mr-2 h-4 w-4" />
          Upload Photos
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Photos</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="photo-upload">Select Photos</Label>
            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={loading}
            />
          </div>
          <Button onClick={handleUpload} disabled={!files || loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

