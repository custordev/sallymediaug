import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <Link
          href="/"
          className="inline-block bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
