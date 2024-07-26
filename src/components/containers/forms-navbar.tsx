"use client";

import { MdOutlineDehaze } from "react-icons/md";
import { Button } from "../ui/button";
import Logo from "../ui/logo";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TbGridDots } from "react-icons/tb";
import Search from "../ui/search";
import type { Session } from "next-auth";
import ProfilePicture from "../ui/profile-picture";
import { signOut } from "next-auth/react";

const FormsNavbar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="sticky left-0 top-0 bg-white z-10 flex items-center justify-between md:px-4 pr-1 md:pr-5 py-3">
      <div className="flex items-center lg:gap-1">
        <Button variant="ghost">
          <MdOutlineDehaze size={24} className="text-primarytext" />
        </Button>
        <Logo />
      </div>

      <div className="hidden md:inline-block w-1/2">
        <Search />
      </div>

      <div className="flex items-center md:gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">
              <TbGridDots size={24} className="text-primarytext" />
            </Button>
          </PopoverTrigger>

          <PopoverContent>
            <ul className="">
              <li>
                <Button
                  variant="ghost"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </Button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>

        <ProfilePicture picture={session?.user.image as string} />
      </div>
    </nav>
  );
};

export default FormsNavbar;
