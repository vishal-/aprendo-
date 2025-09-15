"use client";

import { useRouter } from "next/navigation";

export type Tab = {
  href: string;
  label: string;
  isActive: boolean;
};

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const router = useRouter();

  return (
    <div className="border-b border-gray-700">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => router.push(tab.href)}
            className={`${
              tab.isActive
                ? "border-primary text-primary"
                : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            aria-current={tab.isActive ? "page" : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
