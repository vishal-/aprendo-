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
    },
    {
      id: "question-bank",
      label: "Question Bank",
      href: "/setup/question-bank"
    },
    {
      id: "tests",
      label: "Tests",
      href: "/setup/assess"
    }
  ];

  const getActiveTab = () => {
    if (pathname === "/setup/curriculum") return "curriculum";
    if (pathname === "/setup/questions") return "questions";
    if (pathname === "/setup/question-bank") return "question-bank";
    if (pathname === "/setup/assess") return "tests";
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
