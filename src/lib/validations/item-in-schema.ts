import * as z from "zod";

export const itemInSchema = z.object({
    date: z
        .any()
        .refine(
            (val) => val instanceof Date && !isNaN(val.getTime()),
            { message: "Date is required" }
        ),
    voucherNo: z.string().nonempty("Voucher No is required"),
    vendor: z.string().nonempty("Vendor is required"),
    orderNote: z.string().optional(),
    itemReceived: z.array(z.object({
        itemName: z.string(),
        quantity: z.number(),
        unit: z.string(),
        costPerUnit: z.number(),
    })),
});