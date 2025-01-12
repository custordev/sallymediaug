import Analytics from "@/components/(dashboard)/analytics";
import React from "react";


export default function AnalyticsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Analytics />
      </main>
    </div>
  );
}
