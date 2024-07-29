"use client";

import { cn } from "@/lib/utils";
import {
  type ChangeEventHandler,
  type FocusEventHandler,
  useRef,
  useState,
  memo,
} from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type PlaygroundTextInputProps = {
  value: string | null;
  name: string;
  size: "small" | "large";
  placeholder?: string;
  onInputChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  disabled?: boolean;
  onInputBlur?: FocusEventHandler<HTMLInputElement> | undefined;
};

const PlaygroundTextInput = ({
  value,
  size,
  placeholder,
  onInputChange,
  disabled,
  onInputBlur,
  name,
}: PlaygroundTextInputProps) => {
  const [showOutline, setShowOutline] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  let style = "";

  if (size === "small") {
    style = "text-primarytext py-1";
  } else if (size === "large") {
    style = "text-3xl py-2";
  }

  return (
    <div
      onFocus={() => setShowOutline(true)}
      onBlur={() => setShowOutline(false)}
    >
      <input
        type="text"
        ref={inputRef}
        name={name}
        value={value || ""}
        placeholder={placeholder}
        onChange={onInputChange}
        onBlur={onInputBlur}
        className={cn(
          "outline-none font-medium px-1 w-full",
          style,
          showOutline
            ? "border-b-2 border-b-green-700 transition-colors duration-200"
            : "border-b-1",
          disabled && "bg-white"
        )}
        disabled={disabled}
      />

      <div
        className="flex items-start"
        onClick={() => {
          setShowOutline(true);
          inputRef.current?.focus();
        }}
        onKeyDown={() => {}}
      >
        <ToggleGroup
          type="multiple"
          className={cn(
            "text-primarytext transition-all duration-300",
            showOutline ? "h-[60px]" : "overflow-hidden h-0 opacity-0"
          )}
        >
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-5 w-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-5 w-5" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-5 w-5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default memo(PlaygroundTextInput);
