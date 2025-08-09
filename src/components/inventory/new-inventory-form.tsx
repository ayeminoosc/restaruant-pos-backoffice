"use client";

import { inventorySchema } from "@/lib/validations/new-inventory-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import CustomButton from "../custom-button";
import CustomInput from "../custom-input";
import CustomTextarea from "../custom-textarea";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import MultipleSelect from "./multi-select";
import UnitSelect from "./unit-select";

type FormData = z.infer<typeof inventorySchema>;

const NewInventoryForm = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const isSubmitting = false;

  const form = useForm<FormData>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      name: "",
      bilingualName: "",
      description: "",
      barCode: "",
      unit: "",
      reorderLevel: "",
      group: [],
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
          {/*  NAME */}
          <CustomInput
            control={form.control}
            name="name"
            label={t("inventory_items.labels.create_group_name")}
            placeholder={t("inventory_items.placeholders.enter_name")}
            optional={false}
          />

          {/* BILLINGUAL NAME */}
          <CustomInput
            control={form.control}
            name="bilingualName"
            label={t("inventory_items.labels.bilingual_name")}
            placeholder={t("inventory_items.placeholders.enter_bliingual_name")}
            optional
          />

          {/* Textarea */}
          <CustomTextarea
            control={form.control}
            name="description"
            label={t("inventory_items.labels.description")}
            placeholder={t("inventory_items.placeholders.description")}
            optional
            className="h-36"
          />

          {/* BAR CODE */}
          <CustomInput
            control={form.control}
            name="barCode"
            label={t("inventory_items.labels.code")}
            placeholder={t("inventory_items.placeholders.code")}
            optional={false}
          />

          {/* Unit */}
          <UnitSelect
            name="unit"
            control={form.control}
            label={t("inventory_items.labels.unit")}
            placeholder={t("inventory_items.placeholders.unit")}
            optional={false}
          />

          {/* Record level */}
          <CustomInput
            control={form.control}
            name="reorderLevel"
            type="number"
            label={t("inventory_items.labels.reorder_level")}
            placeholder={t("inventory_items.placeholders.reorder_level")}
            optional={false}
          />

          {/* Group */}
          <MultipleSelect
            control={form.control}
            name="group"
            label={t("inventory_items.labels.group")}
            placeholder={t("inventory_items.placeholders.group")}
            optional
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

export default NewInventoryForm;
