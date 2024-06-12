import { z } from "zod";

export const createEntrySchema = z.object({
  prodType_id: z.string({}),
  productType: z.string({
    required_error: "Product type is required",
  }),
  transactionType: z.string({
    required_error: "Transaction Type is required",
  }),
  amount: z.string({
    required_error: "Amount is required",
  }),
  remarks: z.string().optional(),
});

export const updateEntrySchema = z.object({
  prodType_id: z.string().optional(),
  productType: z.string().optional(),
  transactionType: z.string().optional(),
  amount: z.string().optional(),
  remarks: z.string().optional(),
});
