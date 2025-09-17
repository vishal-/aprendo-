"use client";

import { usePathname } from "next/navigation";
import Tabs from "@/components/ui/Tabs";

export default function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    {
      id: "dashboard",
      href: "/admin/dashboard",
      label: "Dashboard"
    },
    {
      id: "questions",
      href: "/admin/questions",
      label: "Questions"
    }
  ];

  const activeTab = pathname === "/admin/dashboard" ? "dashboard" : "questions";

  return <Tabs tabs={navItems} activeTab={activeTab} />;
}
