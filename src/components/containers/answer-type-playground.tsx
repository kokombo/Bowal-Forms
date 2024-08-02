"use client";

import { useState } from "react";
import QuestionEditor from "./question-editor";
import type { Question } from "@/types/my-types";
import QuestionsList from "./questions-list";
import type { $Enums } from "@prisma/client";

type AnswerTypePlaygroundProps = {
  question: Question;
  ownerId: string;
};

export const AnswerTypePlayground = ({
  question,
  ownerId,
}: AnswerTypePlaygroundProps) => {
  const [showEditor, setShowEditor] = useState(false);
  const [answerType, setAnswerType] = useState<$Enums.QUESTION_TYPE | null>(
    question.type || "SHORT_ANSWER"
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
    <QuestionsList
      question={question}
      answerType={answerType}
      handleShowEditor={handleShowEditor}
    />
  );
};
