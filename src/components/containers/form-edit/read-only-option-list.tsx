"use client";

import type { Question } from "@/types/my-types";
import OptionIcon from "@/components/ui/option-icon";

const ReadOnlyOptionList = ({
  question,
  onClick,
}: {
  question: Question;
  onClick: () => void;
}) => {
  return (
    <div className="space-y-5 py-1" onClick={onClick} onKeyDown={() => {}}>
      {question.options.map((option, index) => {
        return (
          <div key={option.id} className="flex items-center gap-1 lg:gap-2">
            <OptionIcon type={question.type} index={index} />

            <span className="text-gray-400">{option.label} </span>
          </div>
        );
      })}
    </div>
  );
};

export default ReadOnlyOptionList;
