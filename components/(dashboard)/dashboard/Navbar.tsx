"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Bell, Home, AirVent } from "lucide-react";

const navLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Bookings", href: "/dashboard/bookings" },
  { name: "Categories", href: "/dashboard/categories" },
  { name: "Clients", href: "/dashboard/clients" },
  { name: "Live App", icon: Home, href: "/" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <AirVent className="h-8 w-8 text-amber-500" />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium",
                    pathname === link.href
                      ? "border-b-2 border-amber-500 text-amber-700"
                      : "text-gray-500 hover:border-b-2 hover:border-amber-300 hover:text-amber-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-4 text-amber-600 hover:text-amber-700"
            >
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <div className="flex items-center sm:hidden">
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                variant="ghost"
                size="icon"
                className="text-amber-600 hover:text-amber-700"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("sm:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                pathname === link.href
                  ? "border-amber-500 text-amber-700 bg-amber-50"
                  : "border-transparent text-gray-500 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-600"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
