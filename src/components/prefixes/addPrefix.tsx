"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { prefixFormSchema, PrefixFormInput } from "@/lib/validations/prefix-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { LucidePlus, ChevronRight, ChevronDown, LoaderCircle } from "lucide-react";
import CustomInput from "../custom-input";
import CustomAdvanceSetting from "../custom-advance-setting";
import { ColorPicker } from "../color-picker";
import CustomButton from "../custom-button";
import { usePrefixStore } from "@/store/prefix-store";
import { useTranslation } from "react-i18next";

interface PrefixFormProps {
  defaultValues: Partial<PrefixFormInput>;
  onSubmit: (data: PrefixFormInput) => void;
  mode: "create" | "edit";
}
export function PrefixForm({ defaultValues, onSubmit, mode }: PrefixFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { isSubmitting } = usePrefixStore()
  const form = useForm<PrefixFormInput>({
    resolver: zodResolver(prefixFormSchema),
    defaultValues,
  });
  const { t } = useTranslation();
  return (
    <div className="flex justify-center">
      <div className=" w-5/6 pb-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-4 w-full"
          >
            <CustomInput
              control={form.control}
              name="name"
              label={t("prefix.labels.create_prefix_name")}
              placeholder={t("prefix.placeholders.enter_name")}
              optional={false}
            />

            <FormField
              control={form.control as any}
              name="bilingualName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <CustomInput
                      control={form.control}
                      name="bilingualName"
                      label={t("prefix.labels.bilingual_name")}
                      placeholder={t("prefix.placeholders.enter_bliingual_name")}
                      optional
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control as any}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-[20px] text-[#2A2A2A]">{t("prefix.labels.prefix_description")} <span className="text-gray-400 ml-1">({t("prefix.labels.optional")})</span></FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("prefix.placeholders.enter_description")}
                      className="w-full h-[192px] resize-none md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <CustomAdvanceSetting
              control={form.control}
              isAdvancedOpen={showAdvanced}
              setIsAdvancedOpen={setShowAdvanced}
            >
              <ColorPicker name="buttonColor" label={t("labels.select_btn_color")}/>
            </CustomAdvanceSetting>

            <FormField
              control={form.control as any}
              name="active"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 mt-8">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      className="border-[#1D1B20] border-2"
                    />
                  </FormControl>
                  <FormLabel className="font-medium text-[20px] text-black">{t("labels.active")}</FormLabel>
                </FormItem>
              )}
            />
            <div className="flex gap-3 pt-4 mb-10">
              <CustomButton
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                className="flex-1 bg-primary hover:bg-orange-600 h-14 font-medium text-xl cursor-pointer transition-colors duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex gap-2 items-center">
                    <LoaderCircle className="animate-spin size-6" />
                    <span>{t("statuses.save")}</span>
                  </div>
                ) : (
                  t("buttons.save")
                )}
              </CustomButton>
              <CustomButton
                onClick={() => form.reset()}
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
    </div>
  );
}
