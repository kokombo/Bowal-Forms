"use client";

import { FaFileWaveform } from "react-icons/fa6";
import EditFormTitleInput from "../ui/edit-form-title-input";
import Link from "next/link";
import { useHash } from "@/lib/use-hash";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Questions", href: "" },
  { label: "Responses", href: "#responses" },
  { label: "Settings", href: "#settings" },
];

const FormEditNavbar = (form: Form) => {
  const hash = useHash();

  return (
    <nav className="sticky left-0 top-0 bg-white z-10 md:px-4 pt-4 space-y-6">
      <div>
        <div className="flex items-center gap-1 w-fit">
          <Link href="/forms">
            <FaFileWaveform size={36} color="green" />
          </Link>

          <EditFormTitleInput {...form} />
        </div>

        <div />
      </div>

      <div className="flex w-full justify-center">
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
      </div>
    </nav>
  );
};

export default FormEditNavbar;
