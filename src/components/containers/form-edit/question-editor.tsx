"use client";

import {
  type Dispatch,
  Fragment,
  type SetStateAction,
  useCallback,
  useState,
} from "react";
import { DateOption, ListOptions, TextOption, TimeOption } from "./options";
import AnswerTypeSelect from "@/components/selects/answer-type-select";
import { Separator } from "@/components/ui/separator";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GoDuplicate } from "react-icons/go";
import { Switch } from "@/components/ui/switch";
import { deleteQuestion, updateQuestion } from "@/actions";
import type { Question } from "@/types/my-types";
import { Button } from "@/components/ui/button";
import { useServerAction } from "@/lib/use-server-actions";
import type { $Enums } from "@prisma/client";
import { stringToEnum } from "@/lib/string-to-enum";
import { Loader } from "lucide-react";
import PlaygroundTextInput from "@/components/ui/playground-text-input";

type QuestionEditorProps = {
  question: Question;
  answerType: $Enums.QUESTION_TYPE | null;
  setAnswerType: Dispatch<SetStateAction<$Enums.QUESTION_TYPE | null>>;
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
  const [questionTitle, setQuestionTitle] = useState<string>(
    question.title ?? ""
  );

  const [isQuestionRequired, setIsQuestionRequired] = useState<boolean>(
    question.required ?? false
  );

  const [runUpdateQuestion, isPending] = useServerAction(updateQuestion);

  const handleUpdateQuestion = useCallback(async () => {
    await runUpdateQuestion({
      formId: question.formId,
      questionId: question.id,
      ownerId,
      required: isQuestionRequired,
      title: questionTitle,
      type: answerType,
    });

    handleHideEditor();
  }, [
    answerType,
    question,
    ownerId,
    isQuestionRequired,
    questionTitle,
    handleHideEditor,
    runUpdateQuestion,
  ]);

  const handleDeleteQuestion = useCallback(() => {
    deleteQuestion({
      questionId: question.id,
      formId: question.formId,
      ownerId,
    });
  }, [question, ownerId]);

  return (
    <div className="bg-white py-6 px-5 flex flex-col gap-10 rounded-lg shadow-md">
      <div className="flex flex-col-reverse md:flex-row gap-4 md:justify-between">
        <div className="w-full md:w-3/5 space-y-3">
          <PlaygroundTextInput
            name="question"
            value={questionTitle}
            placeholder="Add Question Title"
            size="small"
            onInputChange={(e) => setQuestionTitle(e.target.value)}
          />

          <Fragment>
            {answerType === "SHORT_ANSWER" && (
              <TextOption placeholder="Short-answer text" />
            )}

            {answerType === "PARAGRAPH" && (
              <TextOption placeholder="Long-answer text" />
            )}

            {["CHECKBOXES", "DROP_DOWN", "MULTIPLE_CHOICE"].includes(
              answerType as string
            ) && (
              <ListOptions
                questionId={question.id}
                formId={question.formId}
                options={question.options}
                answerType={answerType}
              />
            )}

            {answerType === "DATE" && <DateOption />}

            {answerType === "TIME" && <TimeOption />}
          </Fragment>
        </div>

        <AnswerTypeSelect
          value={answerType as string}
          onValueChange={(value) => setAnswerType(stringToEnum(value))}
        />
      </div>

      <div className="space-y-4">
        <Separator />

        <div className="flex justify-between items-center">
          <Button variant="default" size="sm" onClick={handleUpdateQuestion}>
            {isPending ? <Loader size={16} /> : "Save"}
          </Button>

          <div className="flex items-center gap-2 lg:gap-3 text-sm text-primarytext">
            <span className="flex items-center gap-1">
              Delete
              <button type="button" onClick={handleDeleteQuestion}>
                <RiDeleteBin5Fill size={28} />
              </button>
            </span>

            <span className="flex items-center gap-1">
              Duplicate
              <button type="button" onClick={() => {}}>
                <GoDuplicate size={28} />
              </button>
            </span>

            <span className="flex items-center gap-1">
              Required
              <Switch
                checked={isQuestionRequired}
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
