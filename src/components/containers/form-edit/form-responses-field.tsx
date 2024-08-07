"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Question } from "@/types/my-types";

type FormResponsesTableProps = {
  responses: FormResponse[] | undefined;
  questions: Question[] | undefined;
};

const FormResponsesField = ({ responses }: FormResponsesTableProps) => {
  return (
    <div className="space-y-3">
      <h4>Summary</h4>

      <div>
        {responses?.map((response, index) => {
          return (
            <Accordion key={response.id} type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-black text-sm">
                  Entry {index + 1}
                </AccordionTrigger>

                <AccordionContent className="space-y-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-1/2">Question </TableHead>
                        <TableHead className="w-1/2">Response</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {response.answers.map((answer) => (
                        <TableRow key={answer.id}>
                          <TableCell className="w-1/2">
                            {answer.questionTitle}
                          </TableCell>
                          <TableCell className="w-1/2">
                            {answer.answer}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default FormResponsesField;
