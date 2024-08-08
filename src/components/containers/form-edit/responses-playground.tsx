"use client";

import { TbDotsVertical } from "react-icons/tb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import useSWR, { type Fetcher } from "swr";
import { OvalLoader } from "@/components/loaders/loaders";
import FormResponsesField from "./form-responses-field";
import type { Question } from "@/types/my-types";

type ResponsesPlaygoundProps = {
  form: Form;
  questions: Question[] | undefined;
};

const ResponsesPlayground = ({ form, questions }: ResponsesPlaygoundProps) => {
  const formId = form.id;
  const ownerId = form.ownerId;

  const responsesFetcher: Fetcher<FormResponse[], string> = async (url) => {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      let error: ErrorResponse;
      error = await res.json();
      throw error;
    }

    return res.json();
  };

  const { data, error, isLoading } = useSWR<FormResponse[], ErrorResponse>(
    `/api/response?formId=${formId}&ownerId=${ownerId}`,
    responsesFetcher
  );

  return (
    <main className="flex justify-center pt-5 pb-20 min-h-screen">
      <div className="w-11/12 lg:w-3/5 md:w-9/12 space-y-3">
        <section className="bg-white py-6 px-5 space-y-5 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h5 className="text-2xl font-medium"> {data?.length} responses</h5>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full p-2">
                  <TbDotsVertical size={20} className="text-primarytext" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-56 lg:w-72">Content</PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end">
            <span className="flex items-center gap-1 lg:gap-2 text-sm text-primarytext">
              Accepting responses
              <Switch defaultChecked />
            </span>
          </div>
        </section>

        <section className="bg-white py-6 px-5 space-y-5 rounded-lg shadow-md">
          {isLoading ? (
            <div className="grid place-items-center space-y-2">
              <OvalLoader />
              <span className="text-sm text-primarytext">
                Loading responses...
              </span>
            </div>
          ) : error ? (
            <span className="text-sm text-red-500">{error.message}</span>
          ) : data?.length === 0 ? (
            <span className="text-sm text-primarytext">
              Waiting for responses
            </span>
          ) : (
            <FormResponsesField responses={data} questions={questions} />
          )}
        </section>
      </div>
    </main>
  );
};

export default ResponsesPlayground;
