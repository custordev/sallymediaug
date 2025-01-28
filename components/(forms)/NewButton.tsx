/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

type AddNewButtonProps = {
  href?: string;
  toolTipText: string;
  title: string;
  onClick?: (e: React.MouseEvent) => void;
};

export default function NewButton({
  href,
  toolTipText,
  title,
  onClick,
}: AddNewButtonProps) {
  return (
    <Button
      type={onClick ? "button" : "submit"}
      asChild={!onClick}
      variant="outline"
      size="sm"
      onClick={onClick}
    >
      {onClick ? (
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {title}
        </div>
      ) : (
        <Link href={href || "#"}>
          <Plus className="w-4 h-4" />
          {title}
        </Link>
      )}
    </Button>
  );
}