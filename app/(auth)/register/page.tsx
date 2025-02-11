// import NotFound from "@/app/not-found";
import RegisterForm from "@/components/(forms)/RegisterForm";
import React from "react";

export default function page() {
  // return NotFound();
  return (
    <section>
      <div className="md:container mt-8 lg:px-4 md:px-0 ">
        <div className="border-gray-200  dark:border-gray-700 lg:max-w-xl lg:mx-auto border my-3 shadow rounded-md ">
          <RegisterForm />
        </div>
      </div>
    </section>
  );
}
