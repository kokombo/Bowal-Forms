"use client";

import { Button } from "./button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";
import { IoMdAddCircle } from "react-icons/io";
import { createNewQuestion } from "@/actions";

type CreateNewQuestionButtonProps = {
  questionId: string;
  formId: string;
  ownerId: string;
};

export const CreateNewQuestionButton = ({
  questionId,
  formId,
  ownerId,
}: CreateNewQuestionButtonProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            onClick={async () =>
              await createNewQuestion({ questionId, formId, ownerId })
            }
          >
            <IoMdAddCircle size={24} className="text-primarytext" />
            <span className="sr-only">Add a new question</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add a new question</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
