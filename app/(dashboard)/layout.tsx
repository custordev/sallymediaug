import { Navbar } from "@/components/(dashboard)/dashboard/Navbar";
import { Sidebar } from "@/components/(dashboard)/dashboard/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../config/auth";
import { redirect } from "next/navigation";
import { Footer } from "@/components/(global)/footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="min-h-screen bg-amber-50">
      <Sidebar />
      <div className="md:ml-64">
        <main>
          <Navbar />
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}
