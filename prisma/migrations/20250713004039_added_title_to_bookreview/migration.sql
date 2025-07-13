/*
  Warnings:

  - Added the required column `title` to the `BookReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookReview" ADD COLUMN     "title" TEXT NOT NULL;
