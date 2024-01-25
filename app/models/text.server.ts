import type { User, NGram, Text, Corpus } from "@prisma/client";

import { prisma } from "~/db.server";
import { parseNgrams } from "~/utils";
export type { NGram, Text, Corpus } from "@prisma/client";

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
  const nGramObjects = [];
  for (const n of nValues) {
    nGramObjects.push(
      ...parseNgrams(text, n, delimiter).map((ngram) => {
        return {
          n,
          ngram,
          userId,
        };
      }),
    );
  }

  return prisma.text.create({
    data: {
      title,
      text,
      nGrams: {
        createMany: { data: nGramObjects },
      },
      corpusId: {
        connect,
      },
      userId,
    },
  });
}
export function getText({ textId }) {
  return prisma.text.findFirst({
    where: {
      id: textId,
    },
  });
}
export function getTexts({ userId }) {
  return prisma.text.findMany();
}
export function getNGramsByText({ textId, userId }) {
  return prisma.nGram.findMany({
    where: {
      textId,
      userId,
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
