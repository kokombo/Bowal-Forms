"use client";

import { type MouseEventHandler, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";
import OptionItem from "@/components/ui/option-item";
import type { $Enums } from "@prisma/client";

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
      className="outline-none font-medium px-1 text-sm py-1 w-full border-b-1 bg-white text-gray-400 max-w-56"
    >
      {placeholder}
    </div>
  );
};

export const ListOptions = ({
  options,
  questionId,
  answerType,
  formId,
}: {
  options: Option[];
  questionId: string;
  answerType: $Enums.QUESTION_TYPE | null;
  formId: string;
}) => {
  const [newOptions, setNewOptions] = useState<Option[]>(
    options.length > 0
      ? options
      : [
          {
            id: uuid(),
            value: "",
            label: "",
            questionId,
          },
        ]
  );

  const addANewOption = useCallback(() => {
    setNewOptions((prevOptions) => [
      ...prevOptions,
      {
        id: uuid(),
        value: "",
        label: "",
        questionId,
      },
    ]);
  }, [questionId]);

  return (
    <div className="space-y-6 py-2">
      {newOptions.map((option, index) => {
        return (
          <OptionItem
            key={option.id}
            value={option.value}
            optionId={option.id}
            setData={setNewOptions}
            data={newOptions}
            questionId={questionId}
            formId={formId}
            optionIndex={index}
            type={answerType}
          />
        );
      })}

      <Button variant="link" size="sm" onClick={addANewOption}>
        {newOptions.length > 1 ? "Add Another" : "Add Option"}
      </Button>
    </div>
  );
};

export const DateOption = ({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <input
      onClick={onClick}
      type="date"
      readOnly
      className="border-b-1 text-gray-400 font-medium px-1 py-1 bg-white outline-none cursor-text"
    />
  );
};

export const TimeOption = ({
  onClick,
}: {
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  return (
    <div
      onClick={onClick}
      onKeyDown={() => {}}
      className="outline-none font-medium px-1 text-sm py-1 w-full border-b-1 bg-white text-gray-400 max-w-56"
    >
      Time
    </div>
  );
};
