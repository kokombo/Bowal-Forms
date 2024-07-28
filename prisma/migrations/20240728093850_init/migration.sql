/*
  Warnings:

  - Made the column `label` on table `CheckBoxOption` required. This step will fail if there are existing NULL values in that column.
  - Made the column `value` on table `CheckBoxOption` required. This step will fail if there are existing NULL values in that column.
  - Made the column `label` on table `DropDownOption` required. This step will fail if there are existing NULL values in that column.
  - Made the column `value` on table `DropDownOption` required. This step will fail if there are existing NULL values in that column.
  - Made the column `label` on table `MultipleChoiceOption` required. This step will fail if there are existing NULL values in that column.
  - Made the column `value` on table `MultipleChoiceOption` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CheckBoxOption" ALTER COLUMN "label" SET NOT NULL,
ALTER COLUMN "value" SET NOT NULL;

-- AlterTable
ALTER TABLE "DropDownOption" ALTER COLUMN "label" SET NOT NULL,
ALTER COLUMN "value" SET NOT NULL;

-- AlterTable
ALTER TABLE "MultipleChoiceOption" ALTER COLUMN "label" SET NOT NULL,
ALTER COLUMN "value" SET NOT NULL;
