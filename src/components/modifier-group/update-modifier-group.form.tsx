"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { modifierGroupSchema } from "@/lib/validations/modifier-group-schema";
import { useModifierGroupStore } from "@/store/modifier-group-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ColorPicker } from "../color-picker";
import CustomAdvanceSetting from "../custom-advance-setting";
import CustomButton from "../custom-button";
import { CustomCurrencyInput } from "../custom-currency-input";
import CustomInput from "../custom-input";
import { Input } from "../ui/input";

type FormData = z.infer<typeof modifierGroupSchema>;

export function UpdateModifierGroupForm({ dataId }: { dataId: string }) {
  const [inputBoxOpen, setInputBoxOpen] = useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const updateModifierGroup = useModifierGroupStore(
    (s) => s.updateModifierGroup
  );
  const getSingleModifierGroupsData = useModifierGroupStore(
    (s) => s.getSingleModifierGroupsData
  );
  const isFetching = useModifierGroupStore((s) => s.isFetching);
  const isSubmitting = useModifierGroupStore((s) => s.isSubmitting);
  const error = useModifierGroupStore((s) => s.error);
  const status = useModifierGroupStore((s) => s.status);
  const resetStatus = useModifierGroupStore((s) => s.resetStatus);
  const router = useRouter();
  const groupData = useModifierGroupStore((s) => s.singleModifierGroup);

  const form = useForm<FormData>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(modifierGroupSchema),
    defaultValues: {
      groupName: groupData?.groupName,
      bilingualName: groupData?.bilingualName || "",
      price: groupData?.price,
      minSelection: groupData?.minSelection,
      maxSelection: groupData?.minSelection,
      selectionType: groupData?.selectionType,
      required: groupData?.required,
      buttonColor: groupData?.buttonColor,
      modifierItems: groupData?.modifierItems,
      status: groupData?.status,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "modifierItems",
  });

  const onSubmit = (data: FormData) => {
    updateModifierGroup(dataId, data);
  };

  useEffect(() => {
    getSingleModifierGroupsData(dataId);
  }, [dataId, getSingleModifierGroupsData]);

  useEffect(() => {
    if (groupData) form.reset(groupData);
  }, [groupData]);

  useEffect(() => {
    if (status === "success") {
      toast.success("Modifier group updated!");
      router.push("/dashboard/modifier-groups");
      resetStatus();
    } else if (status === "error") {
      toast.error(error);
      resetStatus();
    }
  }, [status, error, resetStatus, router]);

  if (isFetching)
    return (
      <div className="flex justify-center pt-40 ">
        <div className="flex items-center space-x-2">
          <div className="size-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Loading data...</span>
        </div>
      </div>
    );

  return (
    <div className="max-w-[64.063rem] overflow-y-auto mx-auto mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* GROUP NAME */}
          <CustomInput
            control={form.control}
            name="groupName"
            label="Create modifier group name"
            placeholder="Enter group name"
            optional={false}
          />

          {/* BILLINGUAL NAME */}
          <CustomInput
            control={form.control}
            name="bilingualName"
            label="Bilingual name"
            placeholder="Enter translated name (e.g., 'Hta-min-kyaw')"
            optional
          />

          {/* 🔹 MODIFIER ITEMS SECTION */}
          <FormField
            control={form.control}
            name="modifierItems"
            render={() => (
              <FormItem className="gap-0">
                <FormLabel className="text-xl font-medium pb-0">
                  Modifier Items <span className="text-red-500">*</span>
                  <FormMessage className="text-base font-normal" />
                </FormLabel>
                <p className="text-base text-gray-500 ">
                  Add new customize modifier items
                </p>

                {(inputBoxOpen || fields.length > 0) && (
                  <div className="space-y-1 ">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex gap-2 items-center">
                        {/* Name Input */}
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`modifierItems.${index}.name` as const}
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <div className="min-h-5">
                                  <FormMessage className="text-base font-normal" />
                                </div>
                                <Input
                                  {...field}
                                  placeholder="Modifier Item Name"
                                  className="placeholder:text-gray-300 h-14 md:text-lg placeholder:text-lg focus-visible:ring-0 focus:outline-none  border-ring"
                                />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Price Input */}
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`modifierItems.${index}.price` as const}
                            rules={{ required: "Price is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <div className="min-h-5">
                                  <FormMessage className="text-base font-normal" />
                                </div>
                                <CustomCurrencyInput
                                  {...field}
                                  placeholder="00 Ks"
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  className="placeholder:text-gray-300 md:text-lg placeholder:text-lg focus-visible:ring-0 focus:outline-none  border-ring"
                                />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Delete */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-transparent cursor-pointer mt-5"
                        >
                          <Trash2 className="size-7" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {/* 🔹 Add Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    append({ name: "", price: "" });
                    setInputBoxOpen(true);
                  }}
                  className=" text-[15px] mt-2 font-normal border border-red-300  cursor-pointer w-fit"
                >
                  <Plus className="size-6 mr-2" />
                  Add Modifier
                </Button>
              </FormItem>
            )}
          />

          {/* PRICE */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-medium">
                  Price <span className="text-red-500">*</span>
                  <FormMessage className="text-base font-normal" />
                </FormLabel>
                <FormControl>
                  <CustomCurrencyInput
                    placeholder="00 Ks"
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    className="placeholder:text-gray-300 md:text-lg placeholder:text-lg focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* MIN - MAX SELECTION */}
          <div className="grid grid-cols-2 gap-4">
            <CustomInput
              control={form.control}
              name="minSelection"
              label="Min Selection"
              optional={false}
              placeholder="0"
              type="number"
            />

            <CustomInput
              control={form.control}
              name="maxSelection"
              label="Min Selection"
              optional={false}
              placeholder="1"
              type="number"
            />
          </div>

          {/*   SELECTION TYPE */}
          <FormField
            control={form.control}
            name="selectionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-medium">
                  Selection Type <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    // className="flex gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="single" id="single" />
                      <Label htmlFor="single" className="text-lg">
                        Single
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="multiple" id="multiple" />
                      <Label htmlFor="multiple" className="text-lg">
                        Multiple
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-base" />
              </FormItem>
            )}
          />

          {/* REQUIRED */}
          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-medium">
                  Required <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    // className="flex gap-6"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="text-lg">
                        Yes
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="text-lg">
                        No <span className="text-gray-400">(Optional)</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-base" />
              </FormItem>
            )}
          />

          {/* ADVANCED SETTING */}
          <CustomAdvanceSetting
            control={form.control}
            isAdvancedOpen={isAdvancedOpen}
            setIsAdvancedOpen={setIsAdvancedOpen}
          >
            <ColorPicker name="buttonColor" />
          </CustomAdvanceSetting>

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
                  <FormLabel className="text-xl">Active</FormLabel>
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
                  <span>Updating...</span>
                </div>
              ) : (
                "Update"
              )}
            </CustomButton>
            <CustomButton
              onClick={() => router.back()}
              variant="outline"
              className="flex-1 bg-secondary h-14 font-medium text-xl cursor-pointer hover:bg-[#bfbfbf] transition-colors duration-200"
              disabled={isSubmitting}
            >
              Cancel
            </CustomButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
