"use client";
import { useUserDetailsStore } from "@/store/userDetailsStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminDashboardPage = () => {
  const { userDetails } = useUserDetailsStore();
  const router = useRouter();

  useEffect(() => {
    if (userDetails && userDetails.role !== "admin") {
      router.push("/");
    }
  }, [userDetails, router]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  if (userDetails.role !== "admin") {
    return null;
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="">
        <p>Welcome to the admin dashboard, {userDetails.displayName}!</p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
