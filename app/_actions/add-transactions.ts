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
  await db.transaction.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params.id ?? "",
    },
  });
  revalidatePath("/transactions");
};
