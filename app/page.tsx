import React from "react";

import { Hero } from "@/components/MainHero";
import About from "@/components/About";
import WhyUs from "@/components/whyus";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import Contact from "@/components/contact";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <WhyUs />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
}
