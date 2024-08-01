"use client";

import type { Question } from "@/types/my-types";
import { TextOption } from "./options";

type QuestionsListProps = {
  question: Question;
  answerType: string;
  handleShowEditor: () => void;
};

export const QuestionsList = ({
  question,
  answerType,
  handleShowEditor,
}: QuestionsListProps) => {
  return (
    <div className="bg-white py-6 px-5 space-y-2 rounded-lg shadow-md">
      <label className="text-black">
        {question.title || "Add question title"}{" "}
        {question.required && <span className="text-red-600 text-base">*</span>}
      </label>

      {/* MULTIPLE_CHOICE CHECKBOXES PARAGRAPH SHORT_ANSWER DROP_DOWN DATE TIME */}

      <div>
        {answerType === "SHORT_ANSWER" && (
          <TextOption
            placeholder="Short-answer text"
            onClick={handleShowEditor}
          />
        )}

        {answerType === "PARAGRAPH" && (
          <TextOption
            placeholder="Long-answer text"
            onClick={handleShowEditor}
          />
        )}

        {answerType === "MULTIPLE_CHOICE" && (
          <div
            className="flex flex-col gap-4 py-1 px-1 cursor-text"
            onClick={handleShowEditor}
            onKeyDown={() => {}}
          >
            {question?.multiChoiceOptions?.map((option) => {
              return (
                <span key={option.id} className="flex items-center gap-2">
                  <input type="radio" disabled className="h-5 w-5" />
                  <label className="text-sm font-medium text-gray-400">
                    {option.label}
                  </label>
                </span>
              );
            })}
          </div>
        )}

        {answerType === "CHECKBOXES" && (
          <div
            className="flex flex-col gap-4 py-1 px-1 cursor-text"
            onClick={handleShowEditor}
            onKeyDown={() => {}}
          >
            {question?.checkboxesOptions?.map((option) => {
              return (
                <span key={option.id} className="flex items-center gap-2">
                  <input type="checkbox" disabled className="h-5 w-5" />
                  <label className="text-sm font-medium text-gray-400">
                    {option.label}
                  </label>
                </span>
              );
            })}
          </div>
        )}

        {answerType === "DROP_DOWN" && (
          <div
            className="flex flex-col gap-4 py-1 px-1 cursor-text"
            onClick={handleShowEditor}
            onKeyDown={() => {}}
          >
            {question?.dropDownOptions?.map((option, index) => {
              return (
                <span key={option.id} className="flex items-center gap-2">
                  <h5>{index + 1}.</h5>
                  <label className="text-sm font-medium text-gray-400">
                    {option.label}
                  </label>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionsList;
