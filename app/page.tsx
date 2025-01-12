import React from "react";

import { Hero } from "@/components/MainHero";
import About from "@/components/About";
import WhyUs from "@/components/whyus";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import Contact from "@/components/contact";
import Services from "@/components/services";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <WhyUs />
      <Services/>
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
}
