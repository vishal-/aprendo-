"use client";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { auth } from "@/lib/firebase";
import Button from "../ui/Button";

export default function Header() {
  const { user, loading } = useAuthStore();

  return (
    <header className="border-b bg-gray-900 border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:py-6">
          <Link href="/" className="text-xl md:text-2xl font-bold text-primary">
            <img
              src="/aprendo.png"
              alt="logo"
              className="inline h-8 w-8 mr-2"
            />
            Aprendo
          </Link>
          <div className="flex items-center space-x-3 md:space-x-4">
            {loading ? (
              <div>Loading...</div>
            ) : user ? (
              <>
                <Link
                  href="/user/dashboard"
                  className="bg-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-secondary text-sm md:text-base"
                >
                  {user.displayName || user.email}
                </Link>
                {/* <span className="text-light">
                  {user.displayName || user.email}
                </span> */}
                <Button variant="secondary" onClick={() => auth.signOut()}>
                  Logout
                </Button>
              </>
            ) : (
              <Link
                href="/auth"
                className="bg-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-lg hover:bg-secondary text-sm md:text-base"
              >
                Get started
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
