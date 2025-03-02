/*
  Warnings:

  - You are about to drop the column `street` on the `ClassifiedAd` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ClassifiedAd" DROP COLUMN "street",
ALTER COLUMN "imageUrl" DROP NOT NULL;
