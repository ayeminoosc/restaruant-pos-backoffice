"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import CustomInput from "@/components/custom-input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import CustomButton from "@/components/custom-button";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { itemInSchema } from "@/lib/validations/item-in-schema";
import CustomDropDownBox from "@/components/custom-drop-down-box";
import { Textarea } from "@/components/ui/textarea";
import ItemsReceivedForm from "@/components/items-received-form";
import CustomDatePicker from "@/components/custom-date-picker";
import { useEffect } from "react";
import { useItemInStore } from "@/store/item-in_store";
import { useTranslation } from "react-i18next";

type FormData = z.infer<typeof itemInSchema>;
export default function ItemInPage() {
  const { t } = useTranslation();
  const form = useForm<FormData>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(itemInSchema),
    defaultValues: {
      date: undefined,
      voucherNo: "",
      vendor: "",
      orderNote: "",
      itemReceived: [],
    },
  });
  const addItemIn = useItemInStore((state) => state.addItemIn);

  const vendorOptions = [
    { id: "1", name: "Vendor A" },
    { id: "2", name: "Vendor B" },
    { id: "3", name: "Vendor C" },
  ];

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        date: data.date instanceof Date ? data.date.toISOString() : data.date,
      };
      await addItemIn(payload);
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between px-5 border-b-[2px] h-[7.688rem] border-[#D9D9D9]">
        <div className="text-[2rem] font-semibold font-inter">{t("item-in.titles.item_in")}</div>
      </div>
      <div className="flex-1 p-6">
        <div className="text-black font-inter text-[1.5rem] font-semibold leading-[1] tracking-[0.03125rem] mb-[1.25rem]">
          {t("item-in.titles.receipt_info")}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[1.25rem]">

            <CustomDatePicker
              name="date"
              label={t("item-in.labels.date")}
              placeholder={t("item-in.placeholders.date")}
              control={form.control}
              optional={false}
            />

            <CustomInput
              control={form.control}
              name="voucherNo"
              label={t("item-in.labels.voucherNo")}
              placeholder={t("item-in.placeholders.voucherNo")}
              optional={false}
            />
            <CustomDropDownBox
              control={form.control}
              name="vendor"
              label={t("item-in.labels.vendor")}
              placeholder={t("item-in.placeholders.vendor")}
              options={vendorOptions}
              editId={undefined}
              optional={false}
            />

            <FormField
              control={form.control}
              name="orderNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-[20px] text-[#2A2A2A]">{t("item-in.labels.description")}
                    <span className="text-gray-400 ml-1">(Optional)</span></FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("item-in.placeholders.description")}
                      className="w-full h-[192px] resize-none md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <ItemsReceivedForm />

            <div className="flex gap-3 pt-4 mb-10">
              <CustomButton
                type="submit"
                variant="outline"
                className="flex-1 bg-primary text-white hover:bg-orange-600 h-14 font-medium text-xl cursor-pointer transition-colors duration-200"
              >
                Save
              </CustomButton>

              <CustomButton
                type="button"
                variant="outline"
                onClick={() => form.reset({
                  date: undefined,
                  voucherNo: "",
                  vendor: "",
                  orderNote: "",
                  itemReceived: [],
                })}
                className="flex-1 bg-secondary h-14 font-medium text-xl cursor-pointer hover:bg-[#bfbfbf] transition-colors duration-200"
              >
                Cancel
              </CustomButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}