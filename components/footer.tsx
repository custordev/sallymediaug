"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { categories } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, Phone, X, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-amber-50 to-white text-gray-700 py-16 border-t border-amber-100">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image carousel */}
        <div className="mb-16 overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={8}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 7 },
            }}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="h-32"
          >
            {categories[0].photos.map((photo, index) => (
              <SwiperSlide key={index}>
                <div className="group relative h-full overflow-hidden">
                  <Image
                    width={1080}
                    height={1080}
                    src={photo.src}
                    alt="Gallery preview"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="text-center mb-12  text-amber-700">
          <h2 className="text-4xl font-bold mb-4">
            LET&apos;S DO SOMETHING
            <br />
            GREAT TOGETHER
          </h2>
          <p className="text-gray-600">
            Feel free to mail me for any project or just say hello
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold mb-4">SAY HELLO</h3>
            <a
              href="mailto:hello@dreamlens.com"
              className="text-gray-600 hover:text-amber-600 flex items-center justify-center md:justify-start gap-2 transition-colors"
            >
              <Mail size={16} />
              hello@dreamlens.com
            </a>
          </div>

          <div className="text-center">
            <h3 className="text-sm font-semibold mb-4">WHATSAPP</h3>
            <a
              href="tel:+1234567890"
              className="text-gray-600 hover:text-amber-600 flex items-center justify-center gap-2 transition-colors"
            >
              <Phone size={16} />
              +1 (234) 567-890
            </a>
          </div>

          <div className="text-center ">
            <h3 className="text-sm font-semibold mb-4">FOLLOW ME</h3>
            <div className=" hidden lg:flex gap-4 mt-4 sm:justify-center sm:mt-0">
              <Link
                title="Twitter"
                href="https://twitter.com/cus_tor"
                className="bg-[#000211] dark:bg-amber-600 px-1 py-1 rounded-md
                     text-amber-50"
              >
                <X />
              </Link>
              <Link
                title="Instagram"
                href="https://www.instagram.com/custordev/"
                className="bg-[#000211] dark:bg-amber-600 px-1 py-1 rounded-md
           text-amber-50  "
              >
                <Instagram />
              </Link>

              <Link
                title="youtube"
                href="https://www.youtube.com/@custorDev"
                className="bg-[#000211] dark:bg-amber-600 px-1 py-1 rounded-md
           text-amber-50"
              >
                <Youtube />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 hover:text-amber-600">
          <p>
            © {new Date().getFullYear()} Sally Media Ug. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-amber-600 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
