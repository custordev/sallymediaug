"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  ImageIcon,
  LogOut,
  HelpCircle,
  AirVent,
  Home,
} from "lucide-react";
import Logo from "@/components/(global)/Logo";

const sidebarLinks = [
  { name: "Dashboard", icon: AirVent, href: "/" },
  { name: "Clients", icon: Users, href: "/dashboard/clients" },
  { name: "Categories", icon: ImageIcon, href: "/dashboard/categories" },
  { name: "Live App", icon: Home, href: "/" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 bg-white border-r border-amber-100">
      <div className="p-4 border-b border-amber-100">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-amber-50 text-amber-700"
                  : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-amber-100 space-y-2">
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-amber-50 hover:text-amber-700"
        >
          <HelpCircle className="h-5 w-5" />
          Help
        </Link>
        <Link
          href="/logout"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-amber-50 hover:text-amber-700"
        >
          <LogOut className="h-5 w-5" />
          Sign Out
        </Link>
      </div>
    </div>
  );
}
