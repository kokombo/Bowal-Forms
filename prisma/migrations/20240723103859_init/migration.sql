/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "ownerId" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Form_ownerId_key" ON "Form"("ownerId");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
