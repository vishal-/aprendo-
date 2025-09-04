"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useUserDetailsStore } from "@/store/userDetailsStore";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { userDetails } = useUserDetailsStore();

  useEffect(() => {
    // Public paths that don't require authentication
    const publicPaths = ["/", "/auth", "/terms", "/privacy", "/about"];
    if (publicPaths.includes(pathname)) {
      return;
    }

    // Check if user is logged in
    if (!user) {
      router.push("/auth");
      return;
    }

    // Always allow access to userDetails page
    if (pathname === "/userDetails") {
      return;
    }

    // If user is logged in but hasn't filled details or accepted terms, redirect to UserDetailsForm
    if (!userDetails?.termsAccepted) {
      router.push("/userDetails");
      return;
    }
  }, [user, userDetails, router, pathname]);

  return <>{children}</>;
}
