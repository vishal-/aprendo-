import { ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
  href?: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange?: (tabId: string) => void;
  children?: ReactNode;
}

export default function Tabs({ tabs, activeTab, onTabChange, children }: TabsProps) {
  return (
    <div>
      <div className="border-b border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}