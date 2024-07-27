"use client";

import { cn } from "@/lib/utils";
import { type Dispatch, type SetStateAction, useState } from "react";

//id is the identifier of the input element option while optionId is the id from the server

type RadioGroupItemProps = {
  value: string;
  id: string;
  setData: Dispatch<SetStateAction<Option[]>>;
  data: Option[];
  optionId: string;
};

const RadioGroupItem = ({
  value,
  id,
  setData,
  data,
  optionId,
}: RadioGroupItemProps) => {
  const [showOutline, setShowOutline] = useState(false);
  const [newValue, setNewValue] = useState(value);

  return (
    <div className="flex items-center gap-2 relative">
      <input type="radio" value={value} className="h-5 w-5" />

      <input
        type="text"
        value={newValue}
        id={id}
        onFocus={() => setShowOutline(true)}
        onBlur={() => {
          setShowOutline(false);
          // call api to replace existing value with the new value
        }}
        onChange={(e) => setNewValue(e.target.value)}
        className={cn(
          "outline-none font-medium px-1 md:min-w-[350px] w-full text-sm py-1",
          showOutline
            ? "border-b-2 border-b-green-700 transition-colors duration-200"
            : "border-b-1"
        )}
      />

      <button
        type="button"
        onClick={
          () => {
            setData(data.filter((item) => item.id !== optionId));
          }
          //call api to delete option and remove above code
          //Check if newvalue is different from old value before calling the api
        }
        className="text-primarytext font-lg font-semibold rounded-full px-2"
      >
        X
      </button>
    </div>
  );
};

export default RadioGroupItem;
