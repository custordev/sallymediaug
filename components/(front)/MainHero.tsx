"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  // Add state to track if component is mounted (client-side)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state once component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/b.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 flex flex-col min-h-screen">
        {/* Header Area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center w-full max-w-4xl mx-auto mt-14 sm:mt-20">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-5xl font-bold text-white mt-8 mb-4 sm:mb-6 leading-normal px-2"
            >
              Let&rsquo;s make your
              <span className="text-amber-400"> moments timeless</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4 hidden lg:block text-lg md:text-xl max-w-2xl mx-auto text-gray-300"
            >
              Experience stunning photography services for weddings, events, and
              portraits. Let&rsquo;s make your special moments timeless.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/sallyConcepts"
                className="bg-amber-400 text-black hover:bg-amber-500 transition-all px-8 py-4 rounded-full font-medium flex items-center group"
              >
                Sally Concepts
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/gallery"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all px-8 py-4 rounded-full font-medium flex items-center group"
              >
                View Gallery
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Featured Images Grid - Larger on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pb-10 sm:pb-20 mt-4 px-2 sm:px-4"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
            {[
              "/carousel/7.jpg",
              "/23.jpg",
              "/carousel/17.JPG",
              "/carousel/12.JPG",
              "/24.jpg",
              "/carousel/9.jpg",
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className={`relative overflow-hidden rounded-lg shadow-lg ${
                  // Use CSS classes for responsive visibility instead of window.innerWidth
                  index < 4
                    ? "block"
                    : index < 4
                      ? "hidden sm:block"
                      : "hidden md:block"
                }`}
              >
                {/* Use CSS classes for aspect ratio instead of inline styles with window.innerWidth */}
                <div className="aspect-[1/1.2] sm:aspect-square w-full h-full relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Featured Photography ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 16vw"
                    className="object-cover"
                    priority={index < 4}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
