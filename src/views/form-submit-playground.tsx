"use client";

import FormBanner from "@/components/containers/form-banner";
import FormInfo from "@/components/containers/form-submit/form-info";
import SubmitAnswersPlayground from "@/components/containers/form-submit/submit-answers-playground";
import { Button } from "@/components/ui/button";
import images from "@/lib/constants";
import type { Question } from "@/types/my-types";
import { Formik, Form, type FormikHelpers } from "formik";
import { submitForm } from "../actions";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type Values = {
  [key: string]: string | [];
};

type FormSubmitPlaygroundProps = {
  form: Form;
  questions: Question[] | undefined;
};

const FormSubmitPlayground = ({
  form,
  questions,
}: FormSubmitPlaygroundProps) => {
  const router = useRouter();

  const generateInitialValues = () => {
    const initialValues: Values = {};

    if (questions) {
      for (const question of questions) {
        if (question.type === "MULTIPLE_CHOICE") {
          initialValues[`${question.title}_${question.id}`] = [];
        } else {
          initialValues[`${question.title}_${question.id}`] = "";
        }
      }
    }
    return initialValues;
  };

  const initialFormValues = generateInitialValues();

  const handleSubmitForm = useCallback(
    async (values: Values, helpers: FormikHelpers<Values>) => {
      const answerArray: Answer[] = [];

      for (const [key, value] of Object.entries(values)) {
        const answerObject: Answer = {
          questionTitle: key.split("_")[0],
          questionId: key.split("_")[1],
          answer: value,
        };

        answerArray.push(answerObject);
      }

      await submitForm({ formId: form.id, answers: answerArray }).then(() => {
        helpers.resetForm();
        router.push("/forms/vf/entry-submission?status=success");
      });
    },
    [form.id, router]
  );

  return (
    <section
      style={{ backgroundColor: form.theme?.backgroundColor as string }}
      className="flex justify-center pt-5 pb-20 relative min-h-screen"
    >
      <div className="w-11/12 lg:w-1/2 md:w-3/5 space-y-3">
        <FormBanner image={images.hero} />

        <FormInfo title={form.title} />

        <Formik initialValues={initialFormValues} onSubmit={handleSubmitForm}>
          <Form className="flex flex-col gap-3">
            {questions?.map((question) => (
              <SubmitAnswersPlayground key={question.id} question={question} />
            ))}

            <div>
              <Button size="sm" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default FormSubmitPlayground;
