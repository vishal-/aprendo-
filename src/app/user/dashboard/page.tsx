"use client";

import { useUserDetailsStore } from "@/store/userDetailsStore";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { PATHS } from "@/config/paths";

export default function UserDashboard() {
  const { user } = useAuthStore();
  const { userDetails } = useUserDetailsStore();

  const widgets = [
    {
      title: "Profile",
      description: "Manage your profile settings",
      href: PATHS.userDetails,
      icon: "👤"
    },
    {
      title: "Curriculum",
      description: "View and manage curriculum content",
      href: "/setup/curriculum",
      icon: "📚"
    },
    {
      title: "Questions",
      description: "Add and manage questions",
      href: "/setup/questions",
      icon: "❓"
    }
  ];

  return (
    <div className="flex flex-col p-12 min-h-screen bg-gray-800">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.displayName || userDetails?.displayName}!
        </h1>
        <p className="text-gray-300">Role: {userDetails?.role || "Not set"}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {widgets.map((widget, index) => (
          <Link
            key={index}
            href={widget.href}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-primary transition-colors"
          >
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">{widget.icon}</span>
              <h3 className="text-xl font-semibold text-white">
                {widget.title}
              </h3>
            </div>
            <p className="text-gray-300">{widget.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}