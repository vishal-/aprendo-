"use client";

import { usePathname, useRouter } from "next/navigation";
import Tabs from "@/components/ui/Tabs";

export default function SetupNav() {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    {
      id: "curriculum",
      label: "Curriculum",
      href: "/setup/curriculum"
    },
    {
      id: "questions",
      label: "Questions",
      href: "/setup/questions"
    }
  ];

  const getActiveTab = () => {
    if (pathname === "/setup/curriculum") return "curriculum";
    if (pathname === "/setup/questions") return "questions";
    return "curriculum";
  };

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab?.href) {
      router.push(tab.href);
    }
  };

  return (
    <Tabs
      tabs={tabs}
      activeTab={getActiveTab()}
      onTabChange={handleTabChange}
    />
  );
}
