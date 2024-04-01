/*
  Warnings:

  - You are about to drop the column `title` on the `reports` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeOfAbuse" AS ENUM ('ABANDONO', 'AGRESSAO', 'NEGLIGENCIA', 'EXPLORACAO', 'OUTROS');

-- AlterTable
ALTER TABLE "reports" DROP COLUMN "title",
ADD COLUMN     "type" "TypeOfAbuse" NOT NULL DEFAULT 'ABANDONO';
