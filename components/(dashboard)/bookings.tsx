"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2, Plus } from 'lucide-react';

const bookings = [
  { id: 1, client: "Emma & James", date: "2023-06-15", type: "Wedding", status: "Confirmed" },
  { id: 2, client: "Corporate Inc.", date: "2023-06-18", type: "Event", status: "Pending" },
  { id: 3, client: "Sarah Smith", date: "2023-06-20", type: "Portrait", status: "Confirmed" },
];

export default function Bookings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-amber-700">Bookings</h1>
        <Button className="bg-amber-600 hover:bg-amber-700">
          <Plus className="mr-2 h-4 w-4" /> New Booking
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-8 w-8 text-amber-600" />
                  <div>
                    <p className="font-medium text-gray-900">{booking.client}</p>
                    <p className="text-sm text-gray-500">{booking.type} - {booking.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    booking.status === "Confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {booking.status}
                  </span>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

