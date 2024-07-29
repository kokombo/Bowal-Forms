"use client";

import { cn } from "@/lib/utils";
import {
  type Dispatch,
  type SetStateAction,
  useState,
  useCallback,
  memo,
} from "react";
import {
  createOptionForCheckboxQuestion,
  deleteCheckboxOption,
} from "@/actions";

type CheckboxItemProps = {
  value: string;
  inputId: string;
  optionId: string;
  questionId: string;
  formId: string;
  setData: Dispatch<SetStateAction<Option[]>>;
  data: Option[];
};

const CheckboxItem = ({
  value,
  inputId,
  optionId,
  questionId,
  formId,
  setData,
}: CheckboxItemProps) => {
  const [showOutline, setShowOutline] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const handleOnBlur = useCallback(async () => {
    setShowOutline(false);
    if (value.trim() === newValue.trim()) return;
    await createOptionForCheckboxQuestion({
      label: newValue.trim(),
      value: newValue.trim(),
      questionId,
      formId,
      optionId,
    });
  }, [formId, questionId, optionId, newValue, value]);

  const handleDeleteOption = useCallback(() => {
    setData((data) => data.filter((item) => item.id !== optionId));
    deleteCheckboxOption({ formId, optionId });
  }, [formId, optionId, setData]);

  return (
    <div className="flex items-center gap-1 lg:gap-2 relative">
      <input type="checkbox" disabled className="h-5 w-5" />

      <label htmlFor="label" />

      <input
        type="text"
        value={newValue}
        id={inputId}
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

export default memo(CheckboxItem);
