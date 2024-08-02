import type { $Enums } from "@prisma/client";

type Question = {
  id: string;
  title: string | null;
  type: $Enums.QUESTION_TYPE | null;
  required: boolean;
  options: Option[];
  date: Date | null;
  time: Date | null;
  formId: string;
  createdAt: Date;
};
