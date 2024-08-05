"use client";

import { cn } from "@/lib/utils";
import {
  type Dispatch,
  type SetStateAction,
  useState,
  useCallback,
  memo,
  useId,
} from "react";
import { createQuestionOption, deleteQuestionOption } from "@/actions";
import type { $Enums } from "@prisma/client";
import OptionIcon from "./option-icon";

type OptionItemProps = {
  value: string;
  optionId: string;
  questionId: string;
  formId: string;
  setData: Dispatch<SetStateAction<Option[]>>;
  data: Option[];
  type: $Enums.QUESTION_TYPE | null;
  optionIndex: number;
};

const OptionItem = ({
  value,
  optionId,
  questionId,
  formId,
  setData,
  type,
  optionIndex,
}: OptionItemProps) => {
  const [showOutline, setShowOutline] = useState(false);
  const [newValue, setNewValue] = useState(value);
  const id = useId();

  const handleOnBlur = useCallback(async () => {
    setShowOutline(false);
    if (value.trim() === newValue.trim()) return;
    await createQuestionOption({
      label: newValue.trim(),
      value: newValue.trim(),
      questionId,
      formId,
      optionId,
    });
  }, [formId, questionId, optionId, newValue, value]);

  const handleDeleteOption = useCallback(() => {
    setData((data) => data.filter((item) => item.id !== optionId));
    deleteQuestionOption({ formId, optionId });
  }, [formId, optionId, setData]);

  return (
    <div className="flex items-center gap-1 relative">
      <OptionIcon type={type} index={optionIndex} />

      <label htmlFor={`${id}-option`} />

      <input
        type="text"
        value={newValue}
        id={`${id}-option`}
        name="option"
        placeholder="Add option"
        onFocus={() => setShowOutline(true)}
        onBlur={handleOnBlur}
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
        onClick={handleDeleteOption}
        className="text-primarytext font-lg font-semibold px-2"
        aria-label={`Delete option ${value}`}
      >
        X
      </button>
    </div>
  );
};

export default memo(OptionItem);
