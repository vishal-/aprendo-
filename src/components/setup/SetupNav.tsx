"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function SetupNav() {
  const pathname = usePathname();
  const router = useRouter();

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
    <div className="flex space-x-2">
      {navItems.map((item) => (
        <Button
          key={item.href}
          onClick={() => router.push(item.href)}
          variant={item.isActive ? "primary" : "secondary"}
          size="sm"
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}
