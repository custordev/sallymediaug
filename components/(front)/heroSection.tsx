"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { Client } from "@prisma/client";

export default function HeroSection({
  initialClient,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialClient: any;
}) {
  console.log(`${initialClient} , client details`);
  // const [client, setClient] = useState(initialClient);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Border overlay */}
      <div className="absolute inset-4 border border-white/20 z-10" />

      {/* Main content container */}
      <div className="relative w-full h-full">
        {/* Background image */}
        <Image
          src={initialClient?.imageUrl || ""}
          alt="Client Photo"
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
          <h1 className="text-3xl uppercase md:text-7xl font-light tracking-wide transition-all duration-500">
            {initialClient?.title}
          </h1>
          <p className="md:text-xl text-md tracking-[0.1rem] uppercase transition-all duration-500">
            {initialClient?.eventDate.toDateString()}
          </p>
          <Button
            // variant="outline"
            className="bg-transparent border-white font-extrabold text-white hover:bg-white/10 
                     hover:text-white transition-all duration-300 uppercase tracking-wider
                     px-8 py-6 text-sm"
          >
            {initialClient?.description}
          </Button>
        </div>
      </div>
    </section>
  );
}
