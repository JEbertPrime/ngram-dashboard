/*
  Warnings:

  - You are about to drop the column `ngrams` on the `NGram` table. All the data in the column will be lost.
  - Added the required column `ngram` to the `NGram` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NGram" DROP COLUMN "ngrams",
ADD COLUMN     "ngram" TEXT NOT NULL;
