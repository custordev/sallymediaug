import { Photo } from "@/types/types";
import Image from "next/image";


interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ 
  photos, 
  currentIndex, 
  onClose, 
  onNext, 
  onPrev 
}: LightboxProps) {
  if (!photos || photos.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <button
        className="absolute top-4 right-4 text-white text-2xl p-2"
        onClick={onClose}
      >
        ×
      </button>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl p-4"
        onClick={onPrev}
      >
        ‹
      </button>
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <Image
          src={photos[currentIndex].src}
          alt={`Photo ${currentIndex + 1}`}
          width={1920}
          height={1080}
          className="max-h-[90vh] max-w-[90vw] object-contain"
        />
      </div>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl p-4"
        onClick={onNext}
      >
        ›
      </button>
    </div>
  );
}