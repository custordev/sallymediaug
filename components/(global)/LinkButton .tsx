import { PlusCircle } from "lucide-react";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
export type LinkButtonProps = {
  linkText: string;
  href: string;
};
export default function LinkButton({ href, linkText }: LinkButtonProps) {
  return (
    <Button className="bg-[#004D40]">
      <PlusCircle />
      <Link href={href}>{linkText}</Link>
    </Button>
  );
}
