"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Camera, Users, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const recentBookings = [
  {
    client: "Emma & James",
    date: "2023-06-15",
    type: "Wedding",
    status: "Confirmed",
  },
  {
    client: "Corporate Inc.",
    date: "2023-06-18",
    type: "Event",
    status: "Pending",
  },
  {
    client: "Sarah Smith",
    date: "2023-06-20",
    type: "Portrait",
    status: "Confirmed",
  },
];

const topGalleries = [
  {
    name: "Summer Weddings",
    image: "/denis-prossy/highlights/N77A8605.jpg",
    count: 124,
  },
  {
    name: "Corporate Events",
    image: "/denis-prossy/highlights/N77A8619.jpg",
    count: 89,
  },
  {
    name: "Family Portraits",
    image: "/denis-prossy/highlights/N77A8623.jpg",
    count: 56,
  },
];

const recentClients = [
  {
    name: "John Doe",
    image: "/denis-prossy/highlights/N77A8645.jpg",
    date: "2023-06-10",
  },
  {
    name: "Jane Smith",
    image: "/denis-prossy/highlights/N77A8646.jpg",
    date: "2023-06-08",
  },
  {
    name: "Alex Johnson",
    image: "/denis-prossy/highlights/N77A9197.jpg",
    date: "2023-06-05",
  },
];

export default function Dashboard() {
  return (
    <div className="p-1 space-y-6">
      <h1 className="lg:text-3xl text-2xl font-bold text-amber-700 lg:mb-6">
        Photography Dashboard
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-amber-500 to-amber-600">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80 text-sm">Total Bookings</p>
                <h3 className="text-3xl font-bold text-white mt-1">152</h3>
              </div>
              <Calendar className="h-8 w-8 text-white/80" />
            </div>
            <div className="mt-4">
              <span className="text-white/80 text-sm flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                +12% from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-600 to-amber-700">
          <CardContent className="lg:p-6 p-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80 text-sm">Total Clients</p>
                <h3 className="text-3xl font-bold text-white mt-1">1,284</h3>
              </div>
              <Users className="h-8 w-8 text-white/80" />
            </div>
            <div className="mt-4">
              <span className="text-white/80 text-sm flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                +5% new clients this month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-700 to-amber-800">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white/80 text-sm">Photos Delivered</p>
                <h3 className="text-3xl font-bold text-white mt-1">15,769</h3>
              </div>
              <Camera className="h-8 w-8 text-white/80" />
            </div>
            <div className="mt-4">
              <span className="text-white/80 text-sm flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                +18% from last month
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings and Gallery Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-700 flex items-center justify-between">
              <span>Recent Bookings</span>
              <Button variant="outline" size="sm" asChild>
                <Link href="/bookings">View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {booking.client}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.type} - {booking.date}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-amber-700 flex items-center justify-between">
              <span>Top Galleries</span>
              <Button variant="outline" size="sm" asChild>
                <Link href="/gallery">View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {topGalleries.map((gallery, index) => (
                <div key={index} className="relative group">
                  <div className="relative h-32 w-full overflow-hidden rounded-lg">
                    <Image
                      src={gallery.image}
                      alt={gallery.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-30" />
                  </div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="text-sm font-medium">{gallery.name}</p>
                    <p className="text-xs">{gallery.count} photos</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Clients and Messages Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-amber-700 flex items-center justify-between">
              <span>Recent Clients</span>
              <Button variant="outline" size="sm" asChild>
                <Link href="/clients">View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClients.map((client, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="relative w-10 h-10">
                    <Image
                      src={client.image}
                      alt={client.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{client.name}</p>
                    <p className="text-sm text-gray-500">
                      Joined on {client.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-amber-700 flex items-center justify-between">
              <span>Recent Messages</span>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="relative w-10 h-10">
                    <Image
                      src={`/denis-prossy/highlights/N77A${8605 + index}.jpg`}
                      alt="Client"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">Client Name</p>
                      <span className="text-xs text-gray-500">2h ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Looking forward to our photo session next week!
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
