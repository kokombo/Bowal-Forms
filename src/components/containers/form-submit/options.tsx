import type { Question } from "@/types/my-types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Field, type FieldProps } from "formik";

export const TextInputOption = ({ question }: { question: Question }) => {
  const [showOutline, setShowOutline] = useState(false);

  return (
    <div className="bg-white py-5 px-6 flex flex-col gap-6 rounded-lg shadow-sm border-1">
      <legend>
        {question.title}{" "}
        {question.required && <span className="text-red-500">*</span>}
      </legend>

      <Field name={`${question.title}_${question.id}`}>
        {({ field }: FieldProps) => {
          return (
            <input
              {...field}
              type="text"
              autoComplete="off"
              required={question.required}
              onFocus={() => setShowOutline(true)}
              onBlur={() => setShowOutline(false)}
              className={cn(
                "outline-none font-medium w-full px-1",
                showOutline
                  ? "border-b-2 border-b-green-700 transition-colors duration-200"
                  : "border-b-1"
              )}
            />
          );
        }}
      </Field>
    </div>
  );
};

export const RadioGroupOptions = ({ question }: { question: Question }) => {
  return (
    <div className="bg-white py-5 px-6 flex flex-col gap-6 rounded-lg shadow-sm border-1">
      <legend>
        {question.title}{" "}
        {question.required && <span className="text-red-500">*</span>}
      </legend>

      <Field name={`${question.title}_${question.id}`}>
        {({ field, form }: FieldProps) => (
          <RadioGroup
            className="flex flex-col gap-6"
            required={question.required}
            {...field}
            onValueChange={(value) =>
              form.setFieldValue(`${question.title}_${question.id}`, value)
            }
          >
            {question.options.map((option) => {
              return (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.id} />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </div>
              );
            })}
          </RadioGroup>
        )}
      </Field>
    </div>
  );
};

export const CheckboxGroupOptions = ({ question }: { question: Question }) => {
  return (
    <div className="bg-white py-5 px-6 flex flex-col gap-6 rounded-lg shadow-sm border-1">
      <legend>
        {question.title}{" "}
        {question.required && <span className="text-red-500">*</span>}
      </legend>

      <Field
        name={`${question.title}_${question.id}`}
        required={question.required}
      >
        {({ field, form }: FieldProps) => (
          <div className="flex flex-col gap-6">
            {question.options.map((option) => {
              return (
                <span key={option.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...field}
                    value={option.value}
                    id={option.id}
                  />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </span>
              );
            })}
          </div>
        )}
      </Field>
    </div>
  );
};

export const DropdownOption = ({ question }: { question: Question }) => {
  return (
    <div className="bg-white py-5 px-6 flex flex-col gap-6 rounded-lg shadow-sm border-1">
      <legend>
        {question.title}{" "}
        {question.required && <span className="text-red-500">*</span>}
      </legend>

      <Field name={`${question.title}_${question.id}`}>
        {({ field, form }: FieldProps) => (
          <Select
            required={question.required}
            {...field}
            onValueChange={(value) =>
              form.setFieldValue(`${question.title}_${question.id}`, value)
            }
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Choose" />
            </SelectTrigger>
            <SelectContent>
              {question.options.map((option) => {
                return (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        )}
      </Field>
    </div>
  );
};
