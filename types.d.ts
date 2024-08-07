type Form = {
  id: string;
  title: string | null;
  description: string | null;
  shareableURL: string | null;
  ownerId: string;
  image: string | null;
  lastOpened: Date;
  theme: Theme | null;
  createdAt: Date;
};

type Theme = {
  id: string;
  headerImage: string | null;
  backgroundColor: string | null;
  formId: string;
};

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
