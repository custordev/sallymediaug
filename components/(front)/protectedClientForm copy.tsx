/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { verifyClientAccess } from "@/actions/client";

interface ProtectedClientFormProps {
  clientId: string;
  clientName:string
}

export default function ProtectedClientForm({
  clientId,
  clientName
}: ProtectedClientFormProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await verifyClientAccess(clientId, password);
    if (result.success) {
      router.refresh();
    } else {
      setError(result.error || "Invalid password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-amber-700">
          Protected Gallery
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700"
          >
            Access Gallery
          </Button>
        </form>
      </div>
    </div>
  );
}
