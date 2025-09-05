"use client";

import { useUserDetailsStore } from "@/store/userDetailsStore";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const { userDetails } = useUserDetailsStore();
  const router = useRouter();

  useEffect(() => {
    // Redirect non-admin users
    if (userDetails && userDetails.role !== "admin") {
      router.push("/user/dashboard");
    }
  }, [userDetails, router]);

  if (!userDetails || userDetails.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
          <p className="text-gray-300">You need admin privileges to access this page.</p>
        </div>
      </div>
    );
  }

  const adminWidgets = [
    {
      title: "Manage Users",
      description: "View, edit, and manage all platform users",
      href: "/admin/users",
      icon: "👥",
      stats: "1,234 users"
    },
    {
      title: "Global Analytics",
      description: "Platform-wide statistics and insights",
      href: "/admin/analytics",
      icon: "📈",
      stats: "View reports"
    },
    {
      title: "System Settings",
      description: "Configure platform settings and preferences",
      href: "/admin/settings",
      icon: "⚙️",
      stats: "Configure"
    },
    {
      title: "Test Management",
      description: "Oversee all tests across the platform",
      href: "/admin/tests",
      icon: "📋",
      stats: "5,678 tests"
    },
    {
      title: "User Roles",
      description: "Manage user roles and permissions",
      href: "/admin/roles",
      icon: "🔐",
      stats: "Permissions"
    },
    {
      title: "Platform Health",
      description: "Monitor system performance and health",
      href: "/admin/health",
      icon: "💚",
      stats: "All systems OK"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-300">
          Welcome, {user?.displayName || userDetails?.displayName} - System Administrator
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminWidgets.map((widget, index) => (
          <Link
            key={index}
            href={widget.href}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-500 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{widget.icon}</span>
                <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors">
                  {widget.title}
                </h3>
              </div>
              <span className="text-sm text-gray-400">{widget.stats}</span>
            </div>
            <p className="text-gray-300">{widget.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">1,234</div>
            <div className="text-gray-300">Total Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">5,678</div>
            <div className="text-gray-300">Total Tests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">98.5%</div>
            <div className="text-gray-300">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400">456</div>
            <div className="text-gray-300">Active Today</div>
          </div>
        </div>
      </div>
    </div>
  );
}