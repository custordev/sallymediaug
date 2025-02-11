"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "./Logo";
import Image from "next/image";
import type { Category } from "@prisma/client";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Session } from "next-auth";

interface CustomSession extends Omit<Session, "user"> {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "admin" | "service_provider" | "user";
  };
}

// Base menu items without gallery children
const baseMenuItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Gallery",
    href: "/gallery",
    hasChildren: true,
  },
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Services",
    href: "/#services",
  },
  {
    title: "Contact",
    href: "/#contact",
  },
];

export default function SiteHeader({
  allCategories,
}: {
  allCategories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession() as { data: CustomSession | null };
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  // Process categories to match the required format and limit to 6
  const processedCategories = allCategories.slice(0, 6).map((category) => ({
    title: category.title,
    description:
      category.description || `View our ${category.title} collection`,
    image: category.imageUrl || "/placeholder-image.jpg",
    href: `/gallery`,
  }));

  // Combine base menu items with processed categories
  const menuItems = baseMenuItems.map((item) =>
    item.hasChildren ? { ...item, children: processedCategories } : item
  );

  const handleNavigation = (href: string) => {
    if (href.startsWith("#")) {
      if (pathname !== "/") {
        router.push("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push(href);
    }
    setIsSheetOpen(false);
  };

  // Auth button component
  const AuthButton = () => {
    if (session) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session.user?.image || ""}
                  alt={session.user?.name || ""}
                />
                <AvatarFallback>
                  {session.user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline">{session.user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {(session.user?.role === "admin" ||
              session.user?.role === "service_provider") && (
              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                Dashboard
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => signOut()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return null;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-amber-50 to-white border-b border-amber-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="z-50">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {"children" in item ? (
                    <>
                      <NavigationMenuTrigger className="text-gray-700 dark:text-gray-100 hover:text-amber-600">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px] bg-white">
                          <h3 className="text-lg font-semibold mb-2 text-amber-700">
                            {item.title}
                          </h3>
                          <ul className="grid gap-1 md:grid-cols-2">
                            {"children" in item &&
                              item.children.map((child) => (
                                <ListItem
                                  key={child.title}
                                  title={child.title}
                                  href={child.href}
                                  onClick={() => handleNavigation(child.href)}
                                >
                                  <div className="flex items-center gap-6">
                                    <div className="border border-amber-100 p-1 rounded-md">
                                      <Image
                                        src={child.image || "/placeholder.svg"}
                                        width={1080}
                                        height={1080}
                                        className="w-12 h-12 rounded-md object-cover"
                                        alt={child.title}
                                      />
                                    </div>
                                    <div>
                                      <div className="font-medium text-gray-700">
                                        {child.title}
                                      </div>
                                      <p className="text-sm text-gray-500">
                                        {child.description}
                                      </p>
                                    </div>
                                  </div>
                                </ListItem>
                              ))}
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-gray-700 dark:text-gray-100 hover:text-amber-600",
                          pathname === item.href && "text-amber-600"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(item.href);
                        }}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            className="border-amber-200 hover:text-amber-700"
          >
            <Link
              href="https://youtube.com/@sallymediaug?si=6n4WdgWgoC6oWJ-E"
              target="_blank"
              className="flex items-center gap-2"
            >
              <Image
                width={1080}
                height={1080}
                src="/youtube.png"
                className="w-6 h-4"
                alt="YouTube"
              />
              Youtube
            </Link>
          </Button>
          <AuthButton />
        </div>

        {/* Mobile Navigation */}
        <div className="flex lg:hidden items-center space-x-3">
          <AuthButton />
          <Button
            variant="outline"
            size="sm"
            className="border-amber-200 hover:text-amber-700"
          >
            <Link
              href="https://youtube.com/@sallymediaug?si=6n4WdgWgoC6oWJ-E"
              target="_blank"
              className="flex items-center gap-2"
            >
              <Image
                width={1080}
                height={1080}
                src="/youtube.png"
                className="w-6 h-4"
                alt="YouTube"
              />
              <span className="sr-only">YouTube</span>
            </Link>
          </Button>
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-amber-600 hover:text-amber-700"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gradient-to-b from-amber-50 to-white border-l border-amber-100 overflow-y-auto"
            >
              {/* Mobile Menu Content */}
              <nav className="flex flex-col space-y-6 mt-6">
                {menuItems.map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-amber-100 pb-4"
                  >
                    {!item.hasChildren ? (
                      <button
                        onClick={() => handleNavigation(item.href)}
                        className="text-lg font-semibold mb-3 text-amber-700 hover:text-amber-600 transition-colors"
                      >
                        {item.title}
                      </button>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold mb-3 text-amber-700">
                          {item.title}
                        </h3>
                        <ul className="space-y-3">
                          {"children" in item &&
                            item.children.map((child) => (
                              <li
                                key={child.title}
                                onClick={() => handleNavigation(child.href)}
                                className="flex items-center space-x-3 cursor-pointer hover:bg-amber-50 p-2 rounded-md transition-colors"
                              >
                                <div className="border border-amber-100 p-1 rounded-md">
                                  <Image
                                    src={child.image || "/placeholder.svg"}
                                    width={1080}
                                    height={1080}
                                    className="w-12 h-12 rounded-md object-cover"
                                    alt={child.title}
                                  />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-700">
                                    {child.title}
                                  </div>
                                  <p className="text-sm text-gray-500">
                                    {child.description}
                                  </p>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { onClick?: () => void }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ className, title, children, onClick, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-amber-50 hover:text-amber-600 focus:bg-amber-50 focus:text-amber-600",
            className
          )}
          onClick={onClick}
          {...props}
        >
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
