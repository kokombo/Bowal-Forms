"use client";

import { useState } from "react";
import { TextOption } from "./options";
import QuestionEditor from "./question-editor";
import type { Question } from "@/types/my-types";

type AnswerTypePlaygroundProps = {
  question: Question;
  ownerId: string;
};

export const AnswerTypePlayground = ({
  question,
  ownerId,
}: AnswerTypePlaygroundProps) => {
  const [showEditor, setShowEditor] = useState(false);
  const [answerType, setAnswerType] = useState(
    question.type?.toString() || "SHORT_ANSWER"
  );

  const handleShowEditor = () => setShowEditor(true);
  const handleHideEditor = () => setShowEditor(false);

  return showEditor ? (
    <QuestionEditor
      question={question}
      answerType={answerType}
      setAnswerType={setAnswerType}
      ownerId={ownerId}
      handleHideEditor={handleHideEditor}
    />
  ) : (
    <div className="bg-white py-6 px-5 space-y-2 rounded-lg shadow-md">
      <label className="text-black text-sm font-medium">
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
      </div>
    </div>
  );
};
