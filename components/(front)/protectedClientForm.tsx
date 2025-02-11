/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface ProtectedClientFormProps {
  clientId: string;
  clientName: string;
  onSuccess: () => void;
}

export default function ProtectedClientForm({
  clientId,
  clientName,
  onSuccess,
}: ProtectedClientFormProps) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/validate-client-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store the access token in session storage
        sessionStorage.setItem(`client-access-${clientId}`, "true");
        toast.success("Access granted!");
        onSuccess();
      } else {
        toast.error("Invalid password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center">Protected Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">
              Please enter the password to view {clientName}&apos;s gallery
            </p>
          </div>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
