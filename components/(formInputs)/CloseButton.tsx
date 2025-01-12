import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function CloseButton({
  href,
  parent = "inventory",
}: {
  href: string;
  parent?: string;
}) {
  return (
    <Button variant="outline" asChild>
      <Link
        href={
          parent === "" ? `/dashboard${href}` : `/dashboard/${parent}${href}`
        }
      >
        Close
      </Link>
    </Button>
  );
}
