"use client";

import type { Question } from "@/types/my-types";
import { DateOption, TextOption, TimeOption } from "./options";
import type { $Enums } from "@prisma/client";
import ReadOnlyOptionList from "./read-only-option-list";

type QuestionsListProps = {
  question: Question;
  answerType: $Enums.QUESTION_TYPE | null;
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

        {new Set(["CHECKBOXES", "DROP_DOWN", "MULTIPLE_CHOICE"]).has(
          answerType as string
        ) && (
          <ReadOnlyOptionList question={question} onClick={handleShowEditor} />
        )}

        {answerType === "DATE" && <DateOption onClick={handleShowEditor} />}

        {answerType === "TIME" && <TimeOption onClick={handleShowEditor} />}
      </div>
    </div>
  );
};

export default QuestionsList;
