"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Github } from "lucide-react";
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

const menuItems = [
  {
    title: "Home",
    href: "#home",
  },
  {
    title: "Gallery",
    href: "#gallery",
    children: [
      {
        title: "Weddings",
        description: "Capture your special moments.",
        image: "/images/gallery/weddings.jpg", // Replace with actual image paths
      },
      {
        title: "Kukyala",
        description: "Beautiful memories from Kukyala events.",
        image: "/images/gallery/kukyala.jpg",
      },
      {
        title: "Giveaways",
        description: "Cherished moments from giveaways.",
        image: "/images/gallery/giveaways.jpg",
      },
      {
        title: "Birthdays",
        description: "Celebrate your birthday in style.",
        image: "/images/gallery/birthdays.jpg",
      },
      {
        title: "Graduations",
        description: "Commemorate your achievements.",
        image: "/images/gallery/graduations.jpg",
      },
    ],
  },
  {
    title: "About",
    href: "#about",
    description: "Learn more about our story, mission, and team.",
    image: "/images/about/about-us.jpg",
  },
  {
    title: "Services",
    href: "#services",
    description: "Explore our photography and editing services.",
    image: "/images/services/services.jpg",
  },
  {
    title: "Contact",
    href: "#contact",
    description: "Get in touch to book your session or learn more.",
    image: "/images/contact/contact.jpg",
  },
];

export default function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-amber-50 to-white border-b border-amber-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        <nav className="hidden lg:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.children ? (
                    <NavigationMenuTrigger className="text-gray-700 dark:text-gray-100 hover:text-amber-600">
                      {item.title}
                    </NavigationMenuTrigger>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-gray-700 dark:text-gray-100 hover:text-amber-600"
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  )}
                  {item.children && (
                    <NavigationMenuContent>
                      <div className="w-[400px] p-4 md:w-[500px] lg:w-[600px] bg-white">
                        <h3 className="text-lg font-semibold mb-2 text-amber-700">
                          {item.title}
                        </h3>
                        <ul className="grid gap-1 md:grid-cols-2">
                          {item.children.map((child) => (
                            <ListItem
                              key={child.title}
                              title={child.title}
                              href="#"
                            >
                              <div className="flex items-center gap-6">
                                <div className=" border border-amber-100 p-1 rounded-md">
                                  <Image
                                    src="/denis-prossy/highlights/N77A8605.jpg"
                                    width={1080}
                                    height={1080}
                                    className="w-12 h-12 rounded-md"
                                    alt=""
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
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="hidden lg:flex items-center space-x-4">
          {/* <ModeToggle /> */}
          <Button
            variant="outline"
            size="sm"
            className="border-amber-200 hover:bg-amber-50 text-amber-700"
          >
            <Link
              href="https://github.com/custordev"
              target="_blank"
              className="flex items-center"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Link>
          </Button>
          <Button
            className="bg-amber-600 hover:bg-amber-700 text-white border-none"
            size="sm"
          >
            <Link href="/login">Login</Link>
          </Button>
        </div>

        <div className="flex lg:hidden items-center space-x-3">
          {/* <ModeToggle /> */}
          <Button
            className="bg-amber-600 hover:bg-amber-700 text-white border-none"
            size="sm"
          >
            <Link href="/login">Login</Link>
          </Button>
          <Sheet>
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
              className="bg-gradient-to-b from-amber-50 to-white border-l border-amber-100"
            >
              <nav className="flex flex-col space-y-6 mt-6">
                {menuItems.map((item) => (
                  <div
                    key={item.title}
                    className="border-b border-amber-100 pb-4"
                  >
                    <h3 className="text-lg font-semibold mb-3 text-amber-700">
                      {item.title}
                    </h3>
                    {item.children && (
                      <ul className="space-y-3">
                        {item.children.map((child) => (
                          <li
                            key={child.title}
                            className="flex items-center space-x-3"
                          >
                            <div className=" border border-amber-100 p-1 rounded-md">
                              <Image
                                src="/denis-prossy/highlights/N77A8605.jpg"
                                width={1080}
                                height={1080}
                                className="w-12 h-12 rounded-md"
                                alt=""
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
  React.ComponentPropsWithoutRef<"a">
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-amber-50 hover:text-amber-600 focus:bg-amber-50 focus:text-amber-600",
            className
          )}
          {...props}
        >
          {children}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
