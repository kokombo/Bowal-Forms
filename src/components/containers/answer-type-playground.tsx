"use client";

import { useState } from "react";
import PlaygroundTextInput from "../ui/playground-text-input";
import { Separator } from "../ui/separator";
import { MultipleChoiceOptions, TextOption } from "./options";
import { Switch } from "../ui/switch";
import AnswerTypeSelect from "../selects/answer-type-select";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Button } from "../ui/button";

type AnswerTypePlaygroundProps = {
  value: string;
  required: boolean;
};

const optionsData: MultipleChoiceOption[] = [
  { id: "1", label: "Option 1", value: "Option 1" },
];

export const AnswerTypePlayground = ({
  value,
  required,
}: AnswerTypePlaygroundProps) => {
  const [showEditor, setShowEditor] = useState(false);
  const [answerType, setAnswerType] = useState("shortAnswer");
  const [newValue, setNewValue] = useState(value);

  const handleShowEditor = () => setShowEditor(true);
  const handleHideEditor = () => setShowEditor(false);

  return showEditor ? (
    <div className="bg-white py-6 px-5 flex flex-col gap-10 rounded-lg shadow-md">
      <div className="flex justify-between">
        <div className="w-3/5 space-y-3">
          <PlaygroundTextInput
            value={newValue}
            size="small"
            onChange={(e) => setNewValue(e.target.value)}
          />

          <div>
            {answerType === "shortAnswer" && (
              <TextOption placeholder="Short-answer text" />
            )}

            {answerType === "paragraph" && (
              <TextOption placeholder="Long-answer text" />
            )}

            {answerType === "multipleChoice" && (
              <MultipleChoiceOptions optionsData={optionsData} />
            )}
          </div>
        </div>

        <AnswerTypeSelect
          value={answerType}
          onValueChange={(value) => setAnswerType(value)}
        />
      </div>

      <div className="space-y-4">
        <Separator />

        <div className="text-primarytext flex items-center float-end gap-2 text-sm">
          <span className="flex items-center gap-1">
            Delete
            <button type="button">
              <RiDeleteBin5Fill size={28} />
            </button>
          </span>
          <span className="flex items-center gap-1">
            Required
            <Switch />
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white py-6 px-5 space-y-2 rounded-lg shadow-md">
      <label className="text-black text-sm font-medium">
        {value} {required && <span className="text-red-600 text-base">*</span>}
      </label>

      <div>
        {answerType === "shortAnswer" && (
          <TextOption
            placeholder="Short-answer text"
            onClick={handleShowEditor}
          />
        )}

        {answerType === "paragraph" && (
          <TextOption
            placeholder="Long-answer text"
            onClick={handleShowEditor}
          />
        )}
      </div>
    </div>
  );
};
