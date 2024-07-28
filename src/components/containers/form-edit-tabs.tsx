"use client";

import { useHash } from "@/lib/use-hash";
import { cn } from "@/lib/utils";
import Link from "next/link";

const tabs = [
  { label: "Questions", href: "" },
  { label: "Responses", href: "#responses" },
  { label: "Settings", href: "#settings" },
];

const FormEditTabs = () => {
  const hash = useHash();

  return (
    <ul className="flex gap-2">
      {tabs.map((tab, index) => {
        const tabIsActive = hash === tab.href;

        return (
          <li key={index.toString()}>
            <Link
              href={tab.href}
              className={cn(
                "px-2 text-sm font-medium",
                tabIsActive && "text-green-700"
              )}
            >
              {tab.label}
            </Link>

            {tabIsActive && (
              <hr className="h-[3px] bg-green-700 rounded-t-sm mt-[2px]" />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default FormEditTabs;
