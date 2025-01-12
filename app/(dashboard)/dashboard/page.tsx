import Dashboard from "@/components/(dashboard)/dashboard";

import React from "react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <SiteHeader /> */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Dashboard />
      </main>
    </div>
  );
}
