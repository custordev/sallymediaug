"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  eventType: string;
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailTemplateProps>();

  async function onSubmit(data: EmailTemplateProps) {
    console.log(data);
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      toast.success("Message sent successfully!");
      // Here you would typically send the form data to your backend
      reset();
      setIsSubmitting(false);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Failed to send message", error);
    }
  }

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-amber-50 to-white py-16"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-5xl font-bold text-amber-700 mb-2 text-center">
          Get In Touch
        </h2>
        <p className="text-gray-600 mb-8 pb-4 text-center">
          Let us capture your special moments. Contact us to book a session or
          learn more about our services.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-4">
            <div className="bg-amber-400 text-amber-900 p-6 rounded-2xl">
              <h3 className="font-semibold text-xl mb-2">
                Book a Photography Session
              </h3>
              <p className="text-sm mb-4 py-2">
                Ready to capture your special moments? Schedule a photography
                session with us today.
              </p>
              <Button className="bg-amber-700 text-white hover:bg-amber-600">
                <Link
                  target="_blank"
                  href="https://calendar.app.google/npqa12eGtE1NgfGaA"
                >
                  Book Appointment
                </Link>
              </Button>
            </div>
            <div className="bg-amber-700 text-white p-6 rounded-2xl">
              <h3 className="font-semibold mb-2 text-xl">Contact our team</h3>
              <p className="text-sm mb-4 py-2">
                Have a question? Our team is here to help. Reach out to us
                directly.
              </p>
              <Button className="bg-amber-400 text-amber-900 hover:bg-amber-300">
                <Link href="mailto:contact@photographywebsite.com">
                  Send an Email
                </Link>
              </Button>
            </div>
          </div>

          <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-amber-900">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    className="p-2 border border-gray-300 text-black rounded"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <p className="text-red-600 ml-1 mt-1 text-sm">
                      First name is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    className="p-2 border border-gray-300 text-black rounded"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <p className="text-red-600 ml-1 mt-1 text-sm">
                      Last name is required
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  className="w-full border-gray-300 text-black p-2 border rounded"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                {errors.email && (
                  <p className="text-red-600 ml-1 text-sm">
                    Valid email is required
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <select
                  id="eventType"
                  className="w-full border-gray-300 text-black p-2 border rounded"
                  {...register("eventType", { required: true })}
                >
                  <option value="">Select Event Type</option>
                  <option value="wedding">Wedding</option>
                  <option value="portrait">Portrait</option>
                  <option value="event">Event</option>
                  <option value="other">Other</option>
                </select>
                {errors.eventType && (
                  <p className="text-red-600 ml-1 text-sm">
                    Event type is required
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  className="w-full border-gray-300 text-black p-2 border rounded"
                  {...register("subject", { required: true })}
                />
                {errors.subject && (
                  <p className="text-red-600 ml-1 text-sm">
                    Subject is required
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <textarea
                  placeholder="Message"
                  id="message"
                  rows={4}
                  className="w-full border-gray-300 text-black p-2 border rounded"
                  {...register("message", { required: true })}
                ></textarea>
                {errors.message && (
                  <p className="text-red-600 ml-1 mt-1 text-sm">
                    Message is required
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full sm:w-60 px-6 py-3 mt-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 transition duration-200 ease-in-out ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>

            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
