"use client";

import type { Dispatch, SetStateAction, MouseEventHandler } from "react";
import { RadioGroup } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import RadioGroupItem from "../ui/radio-group-item";

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
      className="outline-none font-medium px-1 text-sm py-1 w-full border-b-1 bg-white text-gray-400"
    >
      {placeholder}
    </div>
  );
};

export const MultipleChoiceOptions = ({
  multiChoiceOptions,
  setMultiChoiceOptions,
  questionId,
  formId,
}: {
  multiChoiceOptions: Option[];
  setMultiChoiceOptions: Dispatch<SetStateAction<Option[]>>;
  questionId: string;
  formId: string;
}) => {
  return (
    <RadioGroup
      defaultValue=""
      className="flex flex-col gap-6 py-2 items-start"
    >
      {multiChoiceOptions.map((option, index) => {
        return (
          <div key={index.toString()} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              optionId={option.id}
              id={option.label}
              setData={setMultiChoiceOptions}
              data={multiChoiceOptions}
              questionId={questionId}
              formId={formId}
            />

            <Label htmlFor={option.label} />
          </div>
        );
      })}

      <Button
        variant="link"
        size="sm"
        onClick={() => {
          setMultiChoiceOptions((multiChoiceOptions) => [
            ...multiChoiceOptions,
            {
              id: "new-option",
              value: "Add option",
              label: "Add option",
              questionId,
            },
          ]);
        }}
      >
        Add Another
      </Button>
    </RadioGroup>
  );
};
