import Bookings from "@/components/(dashboard)/bookings";
import React from "react";

export default function BookingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Bookings />
      </main>
    </div>
  );
}

