/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ClientProtectionToggleProps {
  client: {
    id: string;
    isProtected: boolean;
  };
}

export default function ClientProtectionToggle({
  client,
}: ClientProtectionToggleProps) {
  const [isProtected, setIsProtected] = useState(client.isProtected);
  const router = useRouter();

  const handleToggle = async () => {
    try {
      const result = await toggleClientProtection(client.id);
      if (result.success) {
        setIsProtected(!isProtected);
        toast.success(
          `Client protection ${!isProtected ? "enabled" : "disabled"}`
        );
        router.refresh();
      } else {
        toast.error(result.error || "Failed to toggle protection");
      }
    } catch (error) {
      console.error("Error toggling client protection:", error);
      toast.error("An error occurred while toggling protection");
    }
  };

  return <Switch checked={isProtected} onCheckedChange={handleToggle} />;
}
async function toggleClientProtection(id: string): Promise<{ success: boolean; error?: string }> {
  // Implement the actual logic to toggle client protection here
  // For now, let's simulate a successful response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

