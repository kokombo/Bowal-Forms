"use client";

import { type MouseEventHandler, useCallback, useState } from "react";
import { RadioGroup } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import RadioGroupItem from "../ui/radio-group-item";
import { v4 as uuid } from "uuid";
import CheckboxItem from "../ui/checkbox-item";
import type { Question } from "@/types/my-types";

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

export const MultipleChoiceOptions = ({ question }: { question: Question }) => {
  const [multiChoiceOptions, setMultiChoiceOptions] = useState<Option[]>(
    question.multiChoiceOptions.length > 0
      ? question.multiChoiceOptions
      : [
          {
            id: uuid(),
            value: "Option 1",
            label: "Option 1",
            questionId: question.id,
          },
        ]
  );

  const addANewOption = useCallback(() => {
    setMultiChoiceOptions((multiChoiceOptions) => [
      ...multiChoiceOptions,
      {
        id: uuid(),
        value: "",
        label: "",
        questionId: question.id,
      },
    ]);
  }, [question.id]);

  return (
    <RadioGroup className="flex flex-col gap-6 py-2 items-start">
      {multiChoiceOptions.map((option) => {
        return (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              optionId={option.id}
              setData={setMultiChoiceOptions}
              data={multiChoiceOptions}
              questionId={question.id}
              formId={question.formId}
            />
          </div>
        );
      })}

      <Button variant="link" size="sm" onClick={addANewOption}>
        {multiChoiceOptions.length > 1 ? "Add Another" : "Add Option"}
      </Button>
    </RadioGroup>
  );
};

export const CheckboxOptions = ({ question }: { question: Question }) => {
  const [checkboxOptions, setCheckboxOptions] = useState<Option[]>(
    question.checkboxesOptions.length > 0
      ? question.checkboxesOptions
      : [
          {
            id: uuid(),
            value: "Option 1",
            label: "Option 1",
            questionId: question.id,
          },
        ]
  );

  const addANewOption = useCallback(() => {
    setCheckboxOptions((checkboxOptions) => [
      ...checkboxOptions,
      {
        id: uuid(),
        value: "",
        label: "",
        questionId: question.id,
      },
    ]);
  }, [question.id]);

  return (
    <div className="flex flex-col gap-6 py-2 items-start">
      {checkboxOptions.map((option) => {
        return (
          <div key={option.id} className="flex items-center space-x-2">
            <CheckboxItem
              value={option.value}
              optionId={option.id}
              setData={setCheckboxOptions}
              data={checkboxOptions}
              questionId={question.id}
              formId={question.formId}
            />
          </div>
        );
      })}

      <Button variant="link" size="sm" onClick={addANewOption}>
        {checkboxOptions.length > 1 ? "Add Another" : "Add Option"}
      </Button>
    </div>
  );
};
