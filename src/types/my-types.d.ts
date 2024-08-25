import type {
  $Enums,
  Form as FormType,
  Option,
  Question as QuestionType,
  Theme,
} from "@prisma/client";

interface Question extends QuestionType {
  options: Option[];
}

interface Form extends FormType {
  theme: Theme | null;
}
