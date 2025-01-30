import { authOptions } from "@/app/config/auth";
import LoginForm from "@/components/(forms)/LoginForm";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    if (
      session.user?.role === "admin" ||
      session.user?.role === "service_provider"
    ) {
      redirect("/dashboard");
    } else {
      redirect("/");
    }
  }

  return (
    <section>
      <div className="md:container lg:px-4 md:px-0  mt-8">
        <div className="border-gray-200  dark:border-gray-700 lg:max-w-md lg:mx-auto border mb-4 shadow rounded-md ">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
