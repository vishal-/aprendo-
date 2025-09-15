"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserDetailsStore } from "@/store/userDetailsStore";
import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { userDetails } = useUserDetailsStore();
  const router = useRouter();

  useEffect(() => {
    if (userDetails && userDetails.role !== "admin") {
      router.push("/");
    }
  }, [userDetails, router]);

  if (!userDetails) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (userDetails.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-3">
      <AdminNav />
      <div className="p-6">{children}</div>
    </div>
  );
}
