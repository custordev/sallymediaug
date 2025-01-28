"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Client } from "@prisma/client";

interface GalleryCardProps {
  client: Client;
}

export function GalleryCard({ client }: GalleryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg bg-white shadow-lg"
    >
      <Link href={`/gallery/client/${client.id}`}>
        <div className="aspect-[4/3] overflow-hidden">
          <Image
            src={client.imageUrl as string}
            alt={client.title}
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-amber-900 group-hover:text-amber-600 transition-colors">
            {client.title}
          </h3>
          <p className="text-sm text-gray-500">{client.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
