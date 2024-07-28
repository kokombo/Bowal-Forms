"use client";

import type { Dispatch, SetStateAction, MouseEventHandler } from "react";
import { RadioGroup } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import RadioGroupItem from "../ui/radio-group-item";
import { v4 as uuid } from "uuid";
import CheckboxItem from "../ui/checkbox-item";

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
    <RadioGroup className="flex flex-col gap-6 py-2 items-start">
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
              id: uuid(),
              value: "",
              label: "",
              questionId,
            },
          ]);
        }}
      >
        {multiChoiceOptions.length > 1 ? "Add Another" : "Add Option"}
      </Button>
    </RadioGroup>
  );
};

export const CheckboxOptions = ({
  checkboxOptions,
  setCheckboxOptions,
  questionId,
  formId,
}: {
  checkboxOptions: Option[];
  setCheckboxOptions: Dispatch<SetStateAction<Option[]>>;
  questionId: string;
  formId: string;
}) => {
  return (
    <div className="flex flex-col gap-6 py-2 items-start">
      {checkboxOptions.map((option, index) => {
        return (
          <div key={index.toString()} className="flex items-center space-x-2">
            <CheckboxItem
              value={option.value}
              optionId={option.id}
              id={option.label}
              setData={setCheckboxOptions}
              data={checkboxOptions}
              questionId={questionId}
              formId={formId}
            />
          </div>
        );
      })}

      <Button
        variant="link"
        size="sm"
        onClick={() => {
          setCheckboxOptions((checkboxOptions) => [
            ...checkboxOptions,
            {
              id: uuid(),
              value: "",
              label: "",
              questionId,
            },
          ]);
        }}
      >
        {checkboxOptions.length > 1 ? "Add Another" : "Add Option"}
      </Button>
    </div>
  );
};
