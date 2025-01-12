import { AirVent } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 text-foreground hover:opacity-80 transition-opacity"
    >
      <AirVent className="h-8 w-8 text-amber-500" />
      <div className="flex flex-col">
        <span className="text-xl font-bold leading-none">Sally</span>
        <span className="text-xs text-muted-foreground tracking-widest">
          MediaUg
        </span>
      </div>
    </Link>
  );
}
