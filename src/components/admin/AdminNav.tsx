"use client";

import { usePathname } from "next/navigation";
import Tabs from "@/components/ui/Tabs";

export default function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      isActive: pathname === "/admin/dashboard"
    },
    {
      href: "/admin/questions",
      label: "Questions",
      isActive: pathname === "/admin/questions"
    }
  ];

  return <Tabs tabs={navItems} />;
}
