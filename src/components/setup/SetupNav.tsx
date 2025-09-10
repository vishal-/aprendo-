"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SetupNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/setup/curriculum",
      label: "Curriculum",
      isActive: pathname === "/setup/curriculum"
    },
    {
      href: "/setup/questions",
      label: "Questions",
      isActive: pathname === "/setup/questions"
    }
  ];

  return (
    <div className="flex space-x-2 mx-24">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            item.isActive
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
