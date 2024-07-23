-- CreateEnum
CREATE TYPE "QUESTION_TYPE" AS ENUM ('MULTIPLE_CHOICE', 'CHECKBOXES', 'PARAGRAPH', 'SHORT_ANSWER', 'DROP_DOWN', 'DATE', 'TIME');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'untitled form',
    "description" TEXT,
    "shareableURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "type" "QUESTION_TYPE",
    "required" BOOLEAN NOT NULL DEFAULT false,
    "longAnswerText" TEXT,
    "shortAnswerText" TEXT,
    "multiChoiceOptions" TEXT[],
    "checkboxesOptions" TEXT[],
    "dropDownOptions" TEXT[],
    "date" TIMESTAMP(3),
    "time" TIMESTAMP(3),
    "formId" TEXT,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "formId" TEXT,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "id" TEXT NOT NULL,
    "headerImage" TEXT,
    "backgroundColor" TEXT,
    "formId" TEXT,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Question_formId_key" ON "Question"("formId");

-- CreateIndex
CREATE UNIQUE INDEX "Response_formId_key" ON "Response"("formId");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_formId_key" ON "Theme"("formId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;
