"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useUserDetailsStore } from "@/store/userDetailsStore";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, user } = useAuthStore();
  const { userDetails, setUserDetails } = useUserDetailsStore();
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const hasFetchedRef = useRef<string | null>(null);

  // Fetch user details when user is authenticated
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (
        user &&
        user.uid &&
        !userDetails &&
        !isLoadingDetails &&
        hasFetchedRef.current !== user.uid
      ) {
        hasFetchedRef.current = user.uid;
        setIsLoadingDetails(true);
        try {
          const token = await user.getIdToken();
          const response = await fetch("/api/user/info", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (response.ok) {
            const result = await response.json();
            setUserDetails(result.data);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          hasFetchedRef.current = null; // Reset on error to allow retry
        } finally {
          setIsLoadingDetails(false);
        }
      }
    };

    fetchUserDetails();
  }, [user, userDetails, isLoadingDetails, setUserDetails]);

  useEffect(() => {
    // Don't redirect while loading auth state or user details
    if (loading || isLoadingDetails) return;

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

    // Always allow access to user details page
    if (pathname === "/user/details") {
      return;
    }

    // Don't redirect while loading user details
    if (isLoadingDetails) {
      return;
    }

    // If user is logged in but hasn't filled details or accepted terms, redirect to UserDetailsForm
    if (!userDetails?.termsAccepted) {
      router.push("/user/details");
      return;
    }

    // Redirect to appropriate dashboard based on role
    if (pathname === "/dashboard") {
      if (userDetails?.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user/dashboard");
      }
      return;
    }
  }, [loading, user, userDetails, router, pathname, isLoadingDetails]);

  return <>{children}</>;
}
