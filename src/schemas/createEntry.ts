import { z } from "zod";

export const createEntrySchema = z.object({
  prodType_id: z.string({}),
  productType: z.string({
    required_error: "Product type is required",
  }),
  transactionType: z.string({
    required_error: "Transaction Type is required",
  }),
  title: z.string({
    required_error: "Amount is required",
  }),
  remarks: z.string().optional(),
  video: z.strictObject({}),
  thumbnail: z.string({}),
  productDescription: z.string({}),
});

export const updateEntrySchema = z.object({
  prodType_id: z.string().optional(),
  productType: z.string().optional(),
  transactionType: z.string().optional(),
  amount: z.string().optional(),
  remarks: z.string().optional(),
});
