"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import PlaygroundTextInput from "../ui/playground-text-input";
import { MultipleChoiceOptions, TextOption } from "./options";
import AnswerTypeSelect from "../selects/answer-type-select";
import { Separator } from "../ui/separator";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Switch } from "../ui/switch";
import {
  createShortAnswerTextQuestion,
  deleteQuestion,
  createParagraphAnswerQuestion,
  createMultiChoiceAnswerQuestion,
} from "@/actions";
import type { Question } from "@/types/my-types";
import { Button } from "../ui/button";
import { useServerAction } from "@/lib/use-server-actions";

type QuestionEditorProps = {
  question: Question;
  answerType: string;
  setAnswerType: Dispatch<SetStateAction<string>>;
  ownerId: string;
  handleHideEditor: () => void;
};

const QuestionEditor = ({
  question,
  answerType,
  setAnswerType,
  ownerId,
  handleHideEditor,
}: QuestionEditorProps) => {
  const [questionTitle, setQuestionTitle] = useState(question.title || "");
  const [isQuestionRequired, setIsQuestionRequired] = useState(
    question.required || false
  );
  const [multiChoiceOptions, setMultiChoiceOptions] = useState(
    question.multiChoiceOptions.length > 0
      ? question.multiChoiceOptions
      : [
          {
            id: "1",
            value: "Option 1",
            label: "Option 1",
            questionId: question.id,
          },
        ]
  );

  const [handleCreateShortAnswerTextQuestion, isCreatingShortAnswerQuestion] =
    useServerAction(createShortAnswerTextQuestion);
  const [handleCreateParagraphAnswerQuestion, isCreatingParagraphQuestion] =
    useServerAction(createParagraphAnswerQuestion);
  const [handleCreateMultiChoiceAnswerQuestion, isCreatingMultiChoiceQuestion] =
    useServerAction(createMultiChoiceAnswerQuestion);

  const handleCreateQuestion = async () => {
    if (answerType === "SHORT_ANSWER") {
      await handleCreateShortAnswerTextQuestion({
        formId: question.formId,
        questionId: question.id,
        ownerId,
        required: isQuestionRequired,
        title: questionTitle,
      });
    } else if (answerType === "PARAGRAPH") {
      await handleCreateParagraphAnswerQuestion({
        formId: question.formId,
        questionId: question.id,
        ownerId,
        required: isQuestionRequired,
        title: questionTitle,
      });
    } else if (answerType === "MULTIPLE_CHOICE") {
      await handleCreateMultiChoiceAnswerQuestion({
        formId: question.formId,
        questionId: question.id,
        ownerId,
        required: isQuestionRequired,
        title: questionTitle,
      });
    }

    handleHideEditor();
  };

  const handleDeleteQuestion = async () => {
    await deleteQuestion({
      questionId: question.id,
      formId: question.formId,
      ownerId,
    });
  };

  return (
    <div className="bg-white py-6 px-5 flex flex-col gap-10 rounded-lg shadow-md">
      <div className="flex justify-between">
        <div className="w-3/5 space-y-3">
          <PlaygroundTextInput
            name="question"
            value={questionTitle}
            placeholder="Add question title"
            size="small"
            onInputChange={(e) => setQuestionTitle(e.target.value)}
          />

          {/* MULTIPLE_CHOICE CHECKBOXES PARAGRAPH SHORT_ANSWER DROP_DOWN DATE TIME */}

          <div>
            {answerType === "SHORT_ANSWER" && (
              <TextOption placeholder="Short-answer text" />
            )}

            {answerType === "PARAGRAPH" && (
              <TextOption placeholder="Long-answer text" />
            )}

            {answerType === "MULTIPLE_CHOICE" && (
              <MultipleChoiceOptions
                multiChoiceOptions={multiChoiceOptions}
                setMultiChoiceOptions={setMultiChoiceOptions}
                questionId={question.id}
                formId={question.formId}
              />
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

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Button variant="default" size="sm" onClick={handleCreateQuestion}>
              Save
            </Button>

            <p className="text-sm text-medium text-green-700">
              {isCreatingShortAnswerQuestion ||
              isCreatingParagraphQuestion ||
              isCreatingMultiChoiceQuestion
                ? "Saving..."
                : ""}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-primarytext">
            <span className="flex items-center gap-1">
              Delete
              <button type="button" onClick={handleDeleteQuestion}>
                <RiDeleteBin5Fill size={28} />
              </button>
            </span>

            <span className="flex items-center gap-1">
              Required
              <Switch
                defaultChecked={isQuestionRequired}
                onCheckedChange={(checked) => setIsQuestionRequired(checked)}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
