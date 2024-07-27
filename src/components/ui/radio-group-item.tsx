"use client";

import { cn } from "@/lib/utils";
import { type Dispatch, type SetStateAction, useState } from "react";
import {
  createOptionForMultiChoiceQuestion,
  deleteMultipleChoiceOption,
} from "@/actions";

//id is the identifier of the input element option while optionId is the id from the server

type RadioGroupItemProps = {
  value: string;
  id: string;
  optionId: string;
  questionId: string;
  formId: string;
  setData: Dispatch<SetStateAction<Option[]>>;
  data: Option[];
};

const RadioGroupItem = ({
  value,
  id,
  optionId,
  questionId,
  formId,
  setData,
  data,
}: RadioGroupItemProps) => {
  const [showOutline, setShowOutline] = useState(false);
  const [newValue, setNewValue] = useState(value);

  return (
    <div className="flex items-center gap-2 relative">
      <input type="radio" value={value} disabled className="h-5 w-5" />

      <input
        type="text"
        value={newValue}
        id={id}
        placeholder="Add option"
        onFocus={() => setShowOutline(true)}
        onBlur={async () => {
          setShowOutline(false);
          if (value.trim() === newValue.trim()) return;
          await createOptionForMultiChoiceQuestion({
            label: newValue,
            value: newValue,
            questionId,
            formId,
            optionId,
          });
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
        onClick={async () => {
          setData(data.filter((item) => item.id !== optionId));
          await deleteMultipleChoiceOption({ formId, optionId });
        }}
        className="text-primarytext font-lg font-semibold rounded-full px-2"
      >
        X
      </button>
    </div>
  );
};

export default RadioGroupItem;
