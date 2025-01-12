/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Mail,
  MessageCircle,
  Phone,
  FileText,
  HelpCircle,
  Video,
  BookOpen,
  AlertCircle,
  Settings,
  Image as ImageIcon,
} from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-amber-700 mb-4">How can we help you?</h1>
        <p className="text-muted-foreground mb-6">Find answers to common questions or get in touch with our support team</p>
        <div className="max-w-2xl mx-auto relative">
          <Input
            type="search"
            placeholder="Search for help..."
            className="pl-10 py-6 text-lg"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="bg-amber-50 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground mb-4">Learn through our step-by-step video guides</p>
              <Button variant="outline" className="w-full">Watch Tutorials</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="bg-amber-50 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground mb-4">Browse our detailed documentation</p>
              <Button variant="outline" className="w-full">Read Docs</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="bg-amber-50 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">Chat with our support team</p>
              <Button variant="outline" className="w-full">Start Chat</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I upload photos to my gallery?</AccordionTrigger>
            <AccordionContent>
              To upload photos, navigate to your gallery and click the "Add Photo" button. You can select multiple photos at once, and they'll be automatically organized based on the categories you've set up.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How can I create a new event category?</AccordionTrigger>
            <AccordionContent>
              Go to the Categories page and click the "New Category" button. Enter the category name, upload a cover image, and customize any additional settings. Your new category will be available immediately.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Can I share my gallery with clients?</AccordionTrigger>
            <AccordionContent>
              Yes! Each gallery has a unique sharing link. You can find this in the gallery settings. You can also set password protection and expiration dates for shared galleries.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>How do I manage image quality and storage?</AccordionTrigger>
            <AccordionContent>
              Images are automatically optimized for web viewing while maintaining quality. You can adjust quality settings in your account preferences. Storage limits depend on your subscription plan.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>How can I organize photos within an event?</AccordionTrigger>
            <AccordionContent>
              You can create custom categories within each event (e.g., "Ceremony," "Reception"). You can also drag and drop photos to reorder them or bulk select to categorize multiple photos at once.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Contact Options */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-6">Still Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-amber-600" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get help via email. We typically respond within 24 hours.
              </p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-amber-600" />
                Phone Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Available Monday to Friday, 9 AM to 5 PM EST
              </p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700">
                Call Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}