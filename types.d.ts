type Option = {
  id: string;
  label: string;
  value: string;
  questionId: string;
  createdAt?: Date;
};

type Response = {
  id: string;
};

type Answer = {
  questionId: string;
  questionTitle: string;
  answer: string | Array<string>;
};

type FormResponse = {
  formId: string;
  id: string;
  answers: {
    id: string;
    questionId: string;
    questionTitle: string;
    answer: Prisma.JsonValue;
    responseId: string | null;
  }[];
  createdAt: Date;
};

type ErrorResponse = {
  message: string;
};
