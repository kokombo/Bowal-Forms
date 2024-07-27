import type { $Enums } from "@prisma/client";

type Question = {
  id: string;
  title: string | null;
  type: $Enums.QUESTION_TYPE | null;
  required: boolean;
  multiChoiceOptions: Option[];
  checkboxesOptions: Option[];
  dropDownOptions: Option[];
  date: Date | null;
  time: Date | null;
  formId: string;
  createdAt: Date;
};

//  id: string;
//  title: string | null;
//  createdAt: Date;
//  formId: string;
//  type: $Enums.QUESTION_TYPE | null;
//  required: boolean;
//  date: Date | null;
//  time: Date | null;
