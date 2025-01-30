"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Client } from "@prisma/client";

interface GalleryCardProps {
  client: Client;
}

export function GalleryCard({ client }: GalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"
    >
      <Link href={`/gallery/${client.id}`} className="block aspect-square">
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={(client.imageUrl as string) || "/placeholder.svg"}
            alt={client.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-semibold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
            {client.description}
          </h3>
          <p className="text-sm text-gray-200 line-clamp-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {client.title}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
