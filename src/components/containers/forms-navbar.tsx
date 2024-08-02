"use client";

import { Button } from "../ui/button";
import Logo from "../ui/logo";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MdOutlineDehaze } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { TbGridDots } from "react-icons/tb";
import Search from "../ui/search";
import type { Session } from "next-auth";
import ProfilePicture from "../ui/profile-picture";
import { signOut } from "next-auth/react";

const FormsNavbar = ({ session }: { session: Session | null }) => {
  return (
    <nav className="sticky left-0 top-0 bg-white z-10 flex items-center justify-between px-2 md:px-4 py-4">
      <div className="flex items-center lg:gap-1">
        {/* <Button variant="ghost">
          <MdOutlineDehaze size={24} className="text-primarytext" />
        </Button> */}
        <Logo />
      </div>

      <div className="hidden md:inline-block w-1/2">
        <Search />
      </div>

      <div className="flex items-center md:gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="rounded-full p-2">
              <TbGridDots size={24} className="text-primarytext" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-56 lg:w-72">
            <ul>
              <li>
                <Button
                  variant="ghost"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full justify-start outline-0"
                >
                  <BiLogOut size={20} className="text-primarytext mr-2" />
                  Logout
                </Button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>

        <ProfilePicture picture={session?.user.image} />
      </div>
    </nav>
  );
};

export default FormsNavbar;
