"use client";

import { MdOutlineDehaze } from "react-icons/md";
import { Button } from "../ui/button";
import Logo from "../ui/logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IoSearch } from "react-icons/io5";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TbGridDots } from "react-icons/tb";

const FormsNavbar = () => {
  const [showInteractableInput, setShowInteractableInput] = useState(false);

  return (
    <nav className="sticky left-0 top-0 bg-white z-10 flex items-center justify-between md:px-2 pr-1 md:pr-5 py-3">
      <div className="flex items-center lg:gap-1">
        <Button variant="ghost">
          <MdOutlineDehaze size={24} className="text-primarytext" />
        </Button>
        <Logo />
      </div>

      <div className="hidden md:inline-block w-1/2">
        <form className="w-full relative">
          <IoSearch
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-primarytext z-10"
          />
          <input
            type="search"
            placeholder="Search"
            className={cn(
              "h-12 rounded-lg outline-0 border-1 px-12 w-full text-sm",
              showInteractableInput ? "bg-white drop-shadow-md" : "bg-grey"
            )}
            onFocus={() => setShowInteractableInput(true)}
            onBlur={() => setShowInteractableInput(false)}
          />
        </form>
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
