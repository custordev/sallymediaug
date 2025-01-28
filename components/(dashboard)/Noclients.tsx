import { PlusCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NoClientsFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-6">
      <div className="bg-primary/10 p-6 rounded-full">
        <Users className="w-12 h-12 text-primary" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">No Clients Found</h2>
        <p className="text-muted-foreground">
          Get started by creating your first client
        </p>
      </div>

      <Button
        size="lg"
        className="gap-2"
        asChild
      >
        <Link href={`/dashboard/clients/new`}>
          <PlusCircle className="w-4 h-4" />
          Add New Client
        </Link>
      </Button>
    </div>
  );
}