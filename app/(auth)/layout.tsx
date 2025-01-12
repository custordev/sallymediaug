import { Footer } from "@/components/(global)/footer";
import NavbarV1 from "@/components/(global)/siteHeader";

import React, { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white">
      <NavbarV1 />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {children}
        <Footer />
      </div>
    </div>
  );
}
