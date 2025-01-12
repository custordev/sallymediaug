"use client";

import LinkButton from "@/components/(global)/LinkButton ";
import React from "react";

type pageHeaderProps = {
  title: string;
  href: string;
  linkText: string;
  parent?: string;
};
export default function pageHeader({
  href,

  linkText,
}: pageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {linkText}
        </h1>
      </div>
      <div className="flex items-center justify-center gap-2">
        <LinkButton href={href} linkText={linkText} />
      </div>
    </div>
  );
}
