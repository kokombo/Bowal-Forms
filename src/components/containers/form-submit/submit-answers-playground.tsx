"use client";

import type { Question } from "@/types/my-types";
import {
  CheckboxGroupOptions,
  DropdownOption,
  RadioGroupOptions,
  TextInputOption,
} from "./options";
import { Fragment } from "react";

const SubmitAnswersPlayground = ({ question }: { question: Question }) => {
  return (
    <Fragment>
      {question.type === "SHORT_ANSWER" && (
        <TextInputOption question={question} />
      )}
      {question.type === "PARAGRAPH" && <TextInputOption question={question} />}

      {question.type === "MULTIPLE_CHOICE" && (
        <RadioGroupOptions question={question} />
      )}
      {question.type === "CHECKBOXES" && (
        <CheckboxGroupOptions question={question} />
      )}
      {question.type === "DROP_DOWN" && <DropdownOption question={question} />}
    </Fragment>
  );
};

export default SubmitAnswersPlayground;
