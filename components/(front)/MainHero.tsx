"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
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
            backgroundImage: "url('/i-min.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col min-h-screen">
        {/* Header Area */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto mt-20">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-5xl  font-light text-white mb-6 leading-tight"
            >
              Capturing Moments,
              <span className="text-amber-400">Creating Memories</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-300"
            >
              Experience stunning photography services for weddings, events, and
              portraits. Let&rsquo;s make your special moments timeless.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/gallery"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all px-8 py-4 rounded-full font-medium flex items-center group"
              >
                View Gallery
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/sallyConcepts"
                className="bg-amber-400 text-black hover:bg-amber-500 transition-all px-8 py-4 rounded-full font-medium flex items-center group"
              >
                Sally Concepts
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Featured Images Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="pb-20"
        >
          <div className="grid grid-cols-3 md:grid-cols-6 py-4 gap-4 px-4">
            {[
              "/carousel/7.jpg",
              "/carousel/6.jpg",
              "/carousel/9.jpg",
              "/denis-prossy/highlights/N77A8605.jpg",
              "/carousel/8.jpg",
              "/denis-prossy/highlights/N77A8623.jpg",
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="relative aspect-square overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`Featured Photography ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
