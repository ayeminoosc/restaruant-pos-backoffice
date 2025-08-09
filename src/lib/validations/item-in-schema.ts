import * as z from "zod";

export const itemInSchema = z.object({
    //   date: z.string().nonempty("Date is required"),
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
        itemName: z.string().nonempty("Item name is required"),
        quantity: z.number(),
        unit: z.string().nonempty("Unit is required"),
        costPerUnit: z.number(),
    })),
});