// "use client";

// import {
//   type Dispatch,
//   type SetStateAction,
//   useCallback,
//   useState,
// } from "react";
// import PlaygroundTextInput from "../ui/playground-text-input";
// import { CheckboxOptions, MultipleChoiceOptions, TextOption } from "./options";
// import AnswerTypeSelect from "../selects/answer-type-select";
// import { Separator } from "../ui/separator";
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import { Switch } from "../ui/switch";
// import {
//   createShortAnswerTextQuestion,
//   deleteQuestion,
//   createParagraphAnswerQuestion,
//   createMultiChoiceAnswerQuestion,
//   createCheckboxAnswerQuestion,
// } from "@/actions";
// import type { Question } from "@/types/my-types";
// import { Button } from "../ui/button";
// import { useServerAction } from "@/lib/use-server-actions";

// type QuestionEditorProps = {
//   question: Question;
//   answerType: string;
//   setAnswerType: Dispatch<SetStateAction<string>>;
//   ownerId: string;
//   handleHideEditor: () => void;
// };

// const QuestionEditor = ({
//   question,
//   answerType,
//   setAnswerType,
//   ownerId,
//   handleHideEditor,
// }: QuestionEditorProps) => {
//   const [questionTitle, setQuestionTitle] = useState<string>(
//     question.title || ""
//   );

//   const [isQuestionRequired, setIsQuestionRequired] = useState<boolean>(
//     question.required || false
//   );

//   const [multiChoiceOptions, setMultiChoiceOptions] = useState<Option[]>(
//     question.multiChoiceOptions.length > 0
//       ? question.multiChoiceOptions
//       : [
//           {
//             id: "1",
//             value: "Option 1",
//             label: "Option 1",
//             questionId: question.id,
//           },
//         ]
//   );

//   const [checkboxOptions, setCheckboxOptions] = useState<Option[]>(
//     question.checkboxesOptions.length > 0
//       ? question.checkboxesOptions
//       : [
//           {
//             id: "1",
//             value: "Option 1",
//             label: "Option 1",
//             questionId: question.id,
//           },
//         ]
//   );

//   const [handleCreateShortAnswerTextQuestion, isCreatingShortAnswerQuestion] =
//     useServerAction(createShortAnswerTextQuestion);
//   const [handleCreateParagraphAnswerQuestion, isCreatingParagraphQuestion] =
//     useServerAction(createParagraphAnswerQuestion);
//   const [handleCreateMultiChoiceAnswerQuestion, isCreatingMultiChoiceQuestion] =
//     useServerAction(createMultiChoiceAnswerQuestion);
//   const [handleCreateCheckboxAnswerQuestion, isCreatingCheckboxQuestion] =
//     useServerAction(createCheckboxAnswerQuestion);

//   const handleCreateQuestion = useCallback(async () => {
//     switch (answerType) {
//       case "SHORT_ANSWER":
//         await handleCreateShortAnswerTextQuestion({
//           formId: question.formId,
//           questionId: question.id,
//           ownerId,
//           required: isQuestionRequired,
//           title: questionTitle,
//         });
//         break;
//       case "PARAGRAPH":
//         await handleCreateParagraphAnswerQuestion({
//           formId: question.formId,
//           questionId: question.id,
//           ownerId,
//           required: isQuestionRequired,
//           title: questionTitle,
//         });
//         break;
//       case "MULTIPLE_CHOICE":
//         await handleCreateMultiChoiceAnswerQuestion({
//           formId: question.formId,
//           questionId: question.id,
//           ownerId,
//           required: isQuestionRequired,
//           title: questionTitle,
//         });
//         break;
//       case "CHECKBOXES":
//         await handleCreateCheckboxAnswerQuestion({
//           formId: question.formId,
//           questionId: question.id,
//           ownerId,
//           required: isQuestionRequired,
//           title: questionTitle,
//         });
//         break;
//       default:
//         break;
//     }

//     handleHideEditor();
//   }, [
//     answerType,
//     question.formId,
//     question.id,
//     ownerId,
//     isQuestionRequired,
//     questionTitle,
//     handleCreateShortAnswerTextQuestion,
//     handleCreateParagraphAnswerQuestion,
//     handleCreateMultiChoiceAnswerQuestion,
//     handleCreateCheckboxAnswerQuestion,
//     handleHideEditor,
//   ]);

//   const handleDeleteQuestion = useCallback(() => {
//     deleteQuestion({
//       questionId: question.id,
//       formId: question.formId,
//       ownerId,
//     });
//   }, [question, ownerId]);

//   /* MULTIPLE_CHOICE CHECKBOXES PARAGRAPH SHORT_ANSWER DROP_DOWN DATE TIME */
//   const QuestionTypeComponent = () => {
//     switch (answerType) {
//       case "SHORT_ANSWER":
//         return <TextOption placeholder="Short-answer text" />;
//       case "PARAGRAPH":
//         return <TextOption placeholder="Long-answer text" />;
//       case "MULTIPLE_CHOICE":
//         return (
//           <MultipleChoiceOptions
//             multiChoiceOptions={multiChoiceOptions}
//             setMultiChoiceOptions={setMultiChoiceOptions}
//             questionId={question.id}
//             formId={question.formId}
//           />
//         );
//       case "CHECKBOXES":
//         return (
//           <CheckboxOptions
//             checkboxOptions={checkboxOptions}
//             setCheckboxOptions={setCheckboxOptions}
//             questionId={question.id}
//             formId={question.formId}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="bg-white py-6 px-5 flex flex-col gap-10 rounded-lg shadow-md">
//       <div className="flex flex-col-reverse md:flex-row gap-4 md:justify-between">
//         <div className="w-full md:w-3/5 space-y-3">
//           <PlaygroundTextInput
//             name="question"
//             value={questionTitle}
//             placeholder="Add question title"
//             size="small"
//             onInputChange={(e) => setQuestionTitle(e.target.value)}
//           />

//           <QuestionTypeComponent />
//         </div>

//         <AnswerTypeSelect
//           value={answerType}
//           onValueChange={(value) => setAnswerType(value)}
//         />
//       </div>

//       <div className="space-y-4">
//         <Separator />

//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-1">
//             <Button variant="default" size="sm" onClick={handleCreateQuestion}>
//               Save
//             </Button>

//             <p className="text-sm text-medium text-green-700">
//               {isCreatingShortAnswerQuestion ||
//               isCreatingParagraphQuestion ||
//               isCreatingMultiChoiceQuestion ||
//               isCreatingCheckboxQuestion
//                 ? "Saving..."
//                 : ""}
//             </p>
//           </div>

//           <div className="flex items-center gap-2 text-sm text-primarytext">
//             <span className="flex items-center gap-1">
//               Delete
//               <button type="button" onClick={handleDeleteQuestion}>
//                 <RiDeleteBin5Fill size={28} />
//               </button>
//             </span>

//             <span className="flex items-center gap-1">
//               Required
//               <Switch
//                 defaultChecked={isQuestionRequired}
//                 onCheckedChange={(checked) => setIsQuestionRequired(checked)}
//               />
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionEditor;

"use client";

import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from "react";
import PlaygroundTextInput from "../ui/playground-text-input";
import { CheckboxOptions, MultipleChoiceOptions, TextOption } from "./options";
import AnswerTypeSelect from "../selects/answer-type-select";
import { Separator } from "../ui/separator";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Switch } from "../ui/switch";
import {
  createShortAnswerTextQuestion,
  deleteQuestion,
  createParagraphAnswerQuestion,
  createMultiChoiceAnswerQuestion,
  createCheckboxAnswerQuestion,
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
  const [questionTitle, setQuestionTitle] = useState<string>(
    question.title || ""
  );

  const [isQuestionRequired, setIsQuestionRequired] = useState<boolean>(
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

  const [checkboxOptions, setCheckboxOptions] = useState(
    question.checkboxesOptions.length > 0
      ? question.checkboxesOptions
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
  const [handleCreateCheckboxAnswerQuestion, isCreatingCheckboxQuestion] =
    useServerAction(createCheckboxAnswerQuestion);

  const handleCreateQuestion = useCallback(async () => {
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
    } else if (answerType === "CHECKBOXES") {
      await handleCreateCheckboxAnswerQuestion({
        formId: question.formId,
        questionId: question.id,
        ownerId,
        required: isQuestionRequired,
        title: questionTitle,
      });
    }

    handleHideEditor();
  }, [
    answerType,
    question,
    ownerId,
    isQuestionRequired,
    questionTitle,
    handleCreateCheckboxAnswerQuestion,
    handleCreateMultiChoiceAnswerQuestion,
    handleCreateParagraphAnswerQuestion,
    handleCreateShortAnswerTextQuestion,
    handleHideEditor,
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

            {answerType === "CHECKBOXES" && (
              <CheckboxOptions
                checkboxOptions={checkboxOptions}
                setCheckboxOptions={setCheckboxOptions}
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
              isCreatingMultiChoiceQuestion ||
              isCreatingCheckboxQuestion
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
