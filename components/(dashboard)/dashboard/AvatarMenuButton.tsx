"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getInitials } from "@/lib/generateInitials";
import {
  Headset,
  LogOut,
  Mail,
  MessageSquareMore,
  PhoneCall,
  Presentation,
  Settings,
  User,
  UserRound,
} from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AvatarMenuButton({ session }: { session: Session }) {
  const [isOpen, setIsOpen] = useState(false);
  const user = session.user;
  const initials = getInitials(user?.name ?? "");
  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const menuLinks = [
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
    { name: "Profile", icon: UserRound, href: "/dashboard/profile" },
    { name: "POS", icon: Presentation, href: "/dashboard/pos" },
  ];

  const assistanceLinks = [
    {
      name: "Free 2 hour set-up assistance",
      icon: Headset,
      href: "/dashboard/assistance",
    },
    {
      name: "Chat with Our experts",
      icon: MessageSquareMore,
      href: "/dashboard/chat",
    },
    { name: "Send an Email", icon: Mail, href: "/dashboard/email" },
    {
      name: "Talk to Us - 256 784 143 872",
      icon: PhoneCall,
      href: "/dashboard/call",
    },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Avatar className="bg-[#004D40] text-white cursor-pointer">
          <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px] bg-[#E8F5E9]">
        <SheetHeader>
          <div className="flex items-center space-x-3 pb-3 border-b border-[#004D40]/20">
            <Avatar className="bg-[#004D40] text-white">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold text-[#004D40]">
                {user?.name}
              </h2>
              <p className="text-sm text-[#004D40]/80">{user?.email}</p>
            </div>
          </div>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="flex space-x-2">
            <Button
              asChild
              variant="outline"
              className="flex-1 border-[#004D40] text-[#004D40] hover:bg-[#004D40] hover:text-white"
            >
              <Link href="/dashboard/account">
                <User className="h-4 w-4 mr-2" />
                <span>Manage Account</span>
              </Link>
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex-1 border-[#004D40] text-[#004D40] hover:bg-[#004D40] hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Logout</span>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-[#004D40]/20">
            {menuLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  href={item.href}
                  className="flex flex-col items-center text-[#004D40] hover:text-[#004D40]/80"
                >
                  <Icon className="w-8 h-8 mb-1" />
                  <span className="text-sm">{item.name}</span>
                </Link>
              );
            })}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#004D40] mb-2">
              Need Assistance?
            </h2>
            <div className="space-y-2">
              {assistanceLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={i}
                    asChild
                    variant="ghost"
                    className="w-full justify-start text-[#004D40] hover:bg-[#004D40]/10"
                  >
                    <Link href={item.href}>
                      <Icon className="h-4 w-4 mr-2" />
                      <span>{item.name}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
