import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Hero() {
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <Image
          width={1080}
          height={1080}
          src="/14.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative   h-full flex items-center justify-center text-center">
        <div className="max-w-3xl px-4 mt-48">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Capturing Life&apos;s Beautiful Moments
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Professional photography services for weddings, events, and special
            occasions
          </p>
          <Link
            href="/gallery"
            className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-white/90 transition"
          >
            View Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
