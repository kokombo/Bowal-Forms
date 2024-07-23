/*
  Warnings:

  - Made the column `formId` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `formId` on table `Response` required. This step will fail if there are existing NULL values in that column.
  - Made the column `formId` on table `Theme` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_formId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_formId_fkey";

-- DropForeignKey
ALTER TABLE "Theme" DROP CONSTRAINT "Theme_formId_fkey";

-- DropIndex
DROP INDEX "Form_ownerId_key";

-- DropIndex
DROP INDEX "Question_formId_key";

-- DropIndex
DROP INDEX "Response_formId_key";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "formId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "formId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Theme" ALTER COLUMN "formId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
