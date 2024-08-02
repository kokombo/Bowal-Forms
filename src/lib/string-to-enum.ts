import { $Enums } from "@prisma/client";

export const stringToEnum = (value: string): $Enums.QUESTION_TYPE | null => {
  if (
    Object.values($Enums.QUESTION_TYPE).includes(value as $Enums.QUESTION_TYPE)
  ) {
    return value as $Enums.QUESTION_TYPE;
  }

  return null;
};
