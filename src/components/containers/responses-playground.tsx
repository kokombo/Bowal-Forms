"use client";

import { TbDotsVertical } from "react-icons/tb";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";

const ResponsesPlayground = ({ theme }: Form) => {
  return (
    <section
      style={{ backgroundColor: theme?.backgroundColor as string }}
      className="flex justify-center pt-5 pb-20 min-h-screen"
    >
      <div className="w-11/12 lg:w-3/5 md:w-9/12 space-y-3">
        <div className="bg-white py-6 px-5 space-y-5 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h5 className="text-2xl font-medium"> 0 responses</h5>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full p-2">
                  <TbDotsVertical size={20} className="text-primarytext" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-56 lg:w-72">Content</PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end">
            <span className="flex items-center gap-1 lg:gap-2 text-sm text-primarytext">
              Accepting responses
              <Switch />
            </span>
          </div>
        </div>

        <div className="bg-white py-6 px-5 space-y-5 rounded-lg shadow-md">
          Responses
        </div>
      </div>
    </section>
  );
};

export default ResponsesPlayground;
