import type { MouseEventHandler } from "react";

export const TextOption = ({
  placeholder,
  onClick,
}: {
  placeholder: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={() => {}}
      className="outline-none font-medium px-1 text-sm py-1 w-3/5 border-b-1 bg-white text-gray-400"
    >
      {placeholder}
    </div>
  );
};
