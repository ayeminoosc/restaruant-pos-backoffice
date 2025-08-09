"use client";

import { adjustStockSchema } from "@/lib/validations/adjust-stock-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import CustomButton from "../custom-button";
import { CustomCurrencyInput } from "../custom-currency-input";
import CustomTextarea from "../custom-textarea";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CustomSelect from "./custom-select";
import { CountRadioGroup } from "./radio-group";
import StockCount from "./stock-count";

type FormData = z.infer<typeof adjustStockSchema>;

const UNITS = ["Chicken", "Beef", "Vegetable"];
const REASONS = [
  "Spoilage",
  "Damage",
  "Theft",
  "Expired",
  "Incorrect Stock Count",
  "Lost in Transit",
  "Supplier Error",
  "Sample Given",
  "Promotional Use",
];

const AdjustStockForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [adjustmentType, setAdjustmentType] = useState<"add" | "subtract">(
    "add"
  );
  const isSubmitting = false;

  const form = useForm<FormData>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(adjustStockSchema),
    defaultValues: {
      adjustItem: [],
      adjustQty: "",
      reason: REASONS,
      note: "",
      status: true,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="max-w-[64.063rem] overflow-y-auto mx-auto mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/*  Select item stock */}
          <CustomSelect
            control={form.control}
            name="adjustItem"
            label={t("adjust_stock.labels.select_adjust_item")}
            optional={false}
            items={UNITS}
          />

          {/* Adjustment Type */}
          <CountRadioGroup
            adjustmentType={adjustmentType}
            setAdjustmentType={setAdjustmentType}
          />

          {/* Adjustment Quantity */}
          <FormField
            control={form.control}
            name="adjustQty"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-medium">
                  {t("adjust_stock.labels.adjustment")}{" "}
                  <span className="text-red-500">*</span>
                  <FormMessage className="text-base font-normal" />
                </FormLabel>
                <FormControl>
                  <CustomCurrencyInput
                    currencySymbol="lbs"
                    placeholder={"00 Ks"}
                    type="number"
                    min="1"
                    {...field}
                    className="placeholder:text-gray-300 md:text-lg placeholder:text-lg focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Stock Count */}
          <StockCount adjustmentType={adjustmentType} />

          {/*  Reason */}
          <CustomSelect
            control={form.control}
            name="reason"
            label={t("adjust_stock.labels.reason")}
            optional={false}
            items={REASONS}
          />

          {/* Textarea */}
          <CustomTextarea
            control={form.control}
            name="note"
            label={t("adjust_stock.labels.note")}
            placeholder={t("adjust_stock.placeholders.note")}
            optional
            className="h-36"
          />

          {/* ACTIVE */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xl">
                    {t("labels.active")}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          {/* SUBMIT BUTTON */}
          <div className="flex gap-3 pt-4 mb-10">
            <CustomButton
              type="submit"
              className="flex-1 bg-primary hover:bg-orange-600 h-14 font-medium text-xl cursor-pointer transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex gap-2 items-center">
                  <LoaderCircle className="animate-spin size-6" />
                  <span> {t("statuses.save")}</span>
                </div>
              ) : (
                <> {t("buttons.save")}</>
              )}
            </CustomButton>
            <CustomButton
              onClick={() => router.back()}
              variant="outline"
              className="flex-1 bg-secondary h-14 font-medium text-xl cursor-pointer hover:bg-[#bfbfbf] transition-colors duration-200"
              disabled={isSubmitting}
            >
              {t("buttons.cancel")}
            </CustomButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdjustStockForm;
