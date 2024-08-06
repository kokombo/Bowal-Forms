/*
  Warnings:

  - You are about to drop the column `answer` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `questionTitle` on the `Response` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Response" DROP COLUMN "answer",
DROP COLUMN "questionId",
DROP COLUMN "questionTitle";

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "questionTitle" TEXT NOT NULL,
    "answer" JSONB NOT NULL,
    "responseId" TEXT,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE SET NULL ON UPDATE CASCADE;
