"use client";

import type { Question } from "@/types/my-types";
import OptionIcon from "@/components/ui/option-icon";
import { cn } from "@/lib/utils";

const ReadOnlyOptionList = ({
  question,
  onClick,
}: {
  question: Question;
  onClick: () => void;
}) => {
  return (
    <div className="space-y-5 py-1" onClick={onClick} onKeyDown={onClick}>
      {question.options.map((option, index) => {
        return (
          <div
            key={option.id}
            className={cn(
              "flex items-center",
              question.type !== "DROP_DOWN" && "gap-1 lg:gap-2"
            )}
          >
            <OptionIcon type={question.type} index={index} />

            <span className="text-gray-400 text-sm">{option.label} </span>
          </div>
        );
      })}
    </div>
  );
};

export default ReadOnlyOptionList;
