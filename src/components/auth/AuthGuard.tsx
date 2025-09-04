"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useUserDetailsStore } from "@/store/userDetailsStore";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { userDetails, setUserDetails } = useUserDetailsStore();
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Fetch user details when user is authenticated
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && !userDetails && !isLoadingDetails) {
        setIsLoadingDetails(true);
        try {
          const response = await fetch(`/api/user/info?uid=${user.uid}`);
          if (response.ok) {
            const result = await response.json();
            setUserDetails(result.data);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        } finally {
          setIsLoadingDetails(false);
        }
      }
    };

    fetchUserDetails();
  }, [user, userDetails, setUserDetails, isLoadingDetails]);

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
  }, [user, userDetails, router, pathname, isLoadingDetails]);

  return <>{children}</>;
}
