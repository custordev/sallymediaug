/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { HeroSection } from "./dashboard/(client)/HeroSection";
import { VideoSection } from "./dashboard/(client)/VideoSection";
import { CategorySection } from "./dashboard/(client)/CategorySection";
import { PhotoGrid } from "./dashboard/(client)/PhotoGrid";

export default function ClientGallery({
  initialClient,
}: {
  initialClient: any;
}) {
  const [client, setClient] = useState(initialClient);
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <HeroSection client={client} setClient={setClient} />

      <VideoSection client={client} setClient={setClient} />
      <CategorySection
        client={client}
        setClient={setClient}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <PhotoGrid
        client={client}
        activeCategory={activeCategory}
      />
    </div>
  );
}
