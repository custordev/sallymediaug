"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Client } from "@prisma/client";
// import { Badge } from "@/components/ui/badge";

interface GalleryCardProps {
  client: Client;
}

export function GalleryCard({ client }: GalleryCardProps) {
  // Extract category from client or use a default


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 w-full"
    >
      <Link href={`/gallery/${client.id}`} className="block aspect-square">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={(client.imageUrl as string) || "/placeholder.svg"}
            alt={client.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          {/* <Badge className="absolute top-3 right-3 bg-amber-400 hover:bg-amber-500 text-black z-10">
            {category}
          </Badge> */}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-semibold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
            {client.description}
          </h3>
          <p className="text-sm text-gray-200 line-clamp-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {client.title}
          </p>
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="inline-block px-3 py-1 bg-black/50 text-white text-xs rounded-full">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
