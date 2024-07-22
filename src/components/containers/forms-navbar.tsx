"use client";

import { MdOutlineDehaze } from "react-icons/md";
import { Button } from "../ui/button";
import Logo from "../ui/logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TbGridDots } from "react-icons/tb";
import Search from "../ui/search";

const FormsNavbar = () => {
  return (
    <nav className="sticky left-0 top-0 bg-white z-10 flex items-center justify-between md:px-2 pr-1 md:pr-5 py-3">
      <div className="flex items-center lg:gap-1">
        <Button variant="ghost">
          <MdOutlineDehaze size={24} className="text-primarytext" />
        </Button>
        <Logo />
      </div>

      <div className="hidden md:inline-block w-1/2">
        <Search />
      </div>

      <div className="flex items-center md:gap-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">
              <TbGridDots size={24} className="text-primarytext" />
            </Button>
          </PopoverTrigger>

          <PopoverContent>AAA</PopoverContent>
        </Popover>

        <Avatar className="h-9 w-9">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default FormsNavbar;
