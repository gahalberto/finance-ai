"use server";

import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { db } from "../_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { addTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid"; // Biblioteca para gerar UUIDs

interface addTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  data: Date;
}

export const upsertTransaction = async (params: addTransactionParams) => {
  addTransactionSchema.parse(params);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  // Garante que `id` sempre tenha um valor
  const id = params.id || uuidv4();

  await db.transaction.upsert({
    where: {
      id,
    },
    update: { ...params, userId },
    create: { ...params, userId },
  });
  revalidatePath("/transactions");
};
