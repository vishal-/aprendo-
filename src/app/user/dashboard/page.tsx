"use client";

import { useUserDetailsStore } from "@/store/userDetailsStore";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { PATHS } from "@/config/paths";

export default function UserDashboard() {
  const { user } = useAuthStore();
  const { userDetails } = useUserDetailsStore();

  const getWidgetsByRole = () => {
    const role = userDetails?.role;

    const commonWidgets = [
      {
        title: "Profile",
        description: "Manage your profile settings",
        href: PATHS.userDetails,
        icon: "👤"
      }
    ];

    switch (role) {
      case "tutor":
        return [
          ...commonWidgets,
          {
            title: "Create Test",
            description: "Create a new test for your students",
            href: PATHS.teacherTestNew,
            icon: "📝"
          },
          {
            title: "My Tests",
            description: "View and manage your created tests",
            href: PATHS.teacherTests,
            icon: "📋"
          },
          {
            title: "Assign Tests",
            description: "Assign tests to students",
            href: PATHS.teacherTestAssign,
            icon: "📤"
          }
        ];

      case "student":
        return [
          ...commonWidgets,
          {
            title: "Upcoming Tests",
            description: "View your assigned tests",
            href: PATHS.studentTests,
            icon: "📅"
          },
          {
            title: "Test Results",
            description: "View your test results and progress",
            href: PATHS.studentResults,
            icon: "📊"
          }
        ];

      case "parent":
        return [
          ...commonWidgets,
          {
            title: "Child Progress",
            description: "Monitor your child's test performance",
            href: PATHS.parentProgress,
            icon: "👶"
          }
        ];

      case "academy":
        return [
          ...commonWidgets,
          {
            title: "Manage Students",
            description: "View and manage academy students",
            href: PATHS.academyStudents,
            icon: "🎓"
          },
          {
            title: "Academy Tests",
            description: "Manage academy-wide tests",
            href: PATHS.academyTests,
            icon: "🏫"
          }
        ];

      default:
        return commonWidgets;
    }
  };

  const widgets = getWidgetsByRole();

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
