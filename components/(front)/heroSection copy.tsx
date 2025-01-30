"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection({ slug }: { slug: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Border overlay */}
      <div className="absolute inset-4 border border-white/20 z-10" />

      {/* Main content container */}
      <div className="relative w-full h-full">
        {/* Background image */}
        <Image
          src="/denis-prossy/highlights/N77A9197.jpg"
          alt="Wedding Photo"
          fill
          className="object-cover"
          priority
          onLoadingComplete={() => setIsLoaded(true)}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Text content */}
      <div className="absolute mt-[20rem] inset-0 flex flex-col items-center justify-center text-white text-center z-20">
        <div
          className={`space-y-8 transform transition-all duration-1000 ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-7xl font-light tracking-wider transition-all duration-500">
            {slug}
          </h1>
          <p className="md:text-xl text-md tracking-[0.2em] transition-all duration-500">
            NOVEMBER 23RD 2024
          </p>
          <Button
            // variant="outline"
            className="bg-transparent border-white font-extrabold text-white hover:bg-white/10 
                     hover:text-white transition-all duration-300 uppercase tracking-wider
                     px-8 py-6 text-sm"
          >
            Introduction
          </Button>
        </div>
      </div>
    </section>
  );
}
