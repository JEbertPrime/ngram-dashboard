import type { User, NGram, Text, Corpus } from "@prisma/client";

import { prisma } from "~/db.server";
import { nGram as getNGramFromText } from "n-gram";
export type { NGram, Text, Corpus } from "@prisma/client";

export function getNGram({
  id,
  userId,
}: Pick<NGram, "id"> & {
  userId: User["id"];
}) {
  return prisma.nGram.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  });
}

export function getNGramListItems({ userId }: { userId: User["id"] }) {
  return prisma.nGram.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createNGram({
  ngram,
  n,
  textId,
  userId,
}: Pick<NGram, "ngram" | "n"> & {
  userId: User["id"];
  textId: Text["id"];
}) {
  return prisma.nGram.create({
    data: {
      ngram,
      n,
      textId,
      userId,
    },
  });
}
export function createText({
  title,
  text,
  nValues,
  delimiter,
  corpusId,
  userId,
}: Pick<Text, "title" | "text"> & {
  nValues: [number];
  delimiter: string;
  corpusId: Corpus["id"];
  userId: User["id"];
}) {
  const nGramsArray = [];
  for (const n of nValues) {
    nGramsArray = nGramsArray;
  }
  return prisma.text.create({
    data: {
      title,
      text,
    },
  });
}
export function deleteNGram({
  id,
  userId,
}: Pick<NGram, "id"> & { userId: User["id"] }) {
  return prisma.nGram.deleteMany({
    where: { id, userId },
  });
}
