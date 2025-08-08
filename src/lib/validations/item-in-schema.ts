import * as z from "zod";

export const itemInSchema = z.object({
    date: z.string()
        .min(1, "Date is required"),
    voucherNo: z.string(),
    vendor: z.string(),
    orderNote: z.string().optional(),
    itemReceived: z.array(z.object({
        itemName: z.string(),
        quantity: z.number(),
        unit: z.string(),
        costPerUnit: z.number(),
    })),
});