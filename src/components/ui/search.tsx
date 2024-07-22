"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const [showInteractableInput, setShowInteractableInput] = useState(false);

  return (
    <div>
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
  );
};

export default Search;
