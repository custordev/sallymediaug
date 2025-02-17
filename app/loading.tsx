"use client";

import Loader from "@/components/(global)/Loader";
import React from "react";

export default function Loading() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[400px] ">
          <Loader />
        </div>
      </div>
    </div>
  );
}
