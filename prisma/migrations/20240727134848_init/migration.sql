/*
  Warnings:

  - You are about to drop the column `checkboxesOptions` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `dropDownOptions` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `longAnswerText` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `multiChoiceOptions` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `shortAnswerText` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "checkboxesOptions",
DROP COLUMN "dropDownOptions",
DROP COLUMN "longAnswerText",
DROP COLUMN "multiChoiceOptions",
DROP COLUMN "shortAnswerText",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "MultipleChoiceOption" (
    "id" TEXT NOT NULL,
    "label" TEXT,
    "value" TEXT,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "MultipleChoiceOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckBoxOption" (
    "id" TEXT NOT NULL,
    "label" TEXT,
    "value" TEXT,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "CheckBoxOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DropDownOption" (
    "id" TEXT NOT NULL,
    "label" TEXT,
    "value" TEXT,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "DropDownOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MultipleChoiceOption" ADD CONSTRAINT "MultipleChoiceOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckBoxOption" ADD CONSTRAINT "CheckBoxOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropDownOption" ADD CONSTRAINT "DropDownOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
