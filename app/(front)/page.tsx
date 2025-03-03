import About from "@/components/(front)/About";
import FAQ from "@/components/(front)/faq";
import Hero from "@/components/(front)/MainHero";

import React from "react";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <FAQ />
    </div>
  );
}
