"use client";

import { useState } from "react";
import QuestionEditor from "./question-editor";
import type { Question } from "@/types/my-types";
import QuestionsList from "./questions-list";

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
    <QuestionsList
      question={question}
      answerType={answerType}
      handleShowEditor={handleShowEditor}
    />
  );
};
