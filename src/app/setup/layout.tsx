"use client";

import SetupNav from "@/components/setup/SetupNav";

export default function SetupLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 p-3">
      <SetupNav />
      <div className="w-full p-6">{children}</div>
    </div>
  );
}
