/*
  Warnings:

  - Added the required column `imageUrl` to the `ClassifiedAd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClassifiedAd" ADD COLUMN     "imageUrl" TEXT NOT NULL;
