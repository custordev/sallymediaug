import React from "react";

import { Hero } from "@/components/(front)/MainHero";
import About from "@/components/(front)/About";
import WhyUs from "@/components/(front)/whyus";
import Testimonials from "@/components/(front)/testimonials";
import FAQ from "@/components/(front)/faq";
import Contact from "@/components/(front)/contact";
// import Services from "@/components/(front)/services";

export default async function HomePage() {
  return (
    <div>
      <Hero />
      <WhyUs />
      {/* <Services /> */}
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
    </div>
  );
}
