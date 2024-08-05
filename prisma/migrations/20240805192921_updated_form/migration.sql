/*
  Warnings:

  - Made the column `title` on table `Form` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `answer` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionTitle` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "acceptingResponses" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "answer" JSONB NOT NULL,
ADD COLUMN     "questionId" TEXT NOT NULL,
ADD COLUMN     "questionTitle" TEXT NOT NULL;
