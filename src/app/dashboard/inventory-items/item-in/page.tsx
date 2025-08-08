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
import { CustomDatePicker } from "@/components/custom-date-picker";
import { Textarea } from "@/components/ui/textarea";

type FormData = z.infer<typeof itemInSchema>;
export default function ItemInPage() {
  const form = useForm<FormData>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: zodResolver(itemInSchema),
    defaultValues: {
      // receiptNumber: "",
    },
  });

  const vendorOptions = [
    { id: "1", name: "Vendor A" },
    { id: "2", name: "Vendor B" },
    { id: "3", name: "Vendor C" },
  ];

  const onSubmit = async (data: FormData) => {
    try {
      // Handle submit logic here
      toast.success("Saved!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between px-5 border-b-[2px] h-[7.688rem] border-[#D9D9D9]">
        <div className="text-[2rem] font-semibold font-inter">{"Item In"}</div>
      </div>
      <div className="flex-1 p-6">
        <div className="text-black font-inter text-[1.5rem] font-semibold leading-[1] tracking-[0.03125rem] mb-[1.25rem]">
          Receipt Information
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[1.25rem]">
            
            <CustomDatePicker
              label="Date"
              placeholder="Enter date..."
              optional={false} // or true for optional
            />

            <CustomInput
              control={form.control}
              name="receiptNumber"
              label="Receipt Number"
              placeholder="Enter Receipt Number..."
              className="mt-4"
            />
            <CustomDropDownBox
              control={form.control}
              name="vendor"
              label="Vendor"
              placeholder="Select a vendor"
              options={vendorOptions}
              editId={undefined}
              optional={false}
            />

             <FormField
              control={form.control as any}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-[20px] text-[#2A2A2A]">Description <span className="text-gray-400 ml-1">(Optional)</span></FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what this prefix means.."
                      className="w-full h-[192px] resize-none md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4 mb-10">
              <CustomButton
                type="button"
                // onClick={handleCancel}
                variant="outline"
                className="flex-1 bg-primary text-white hover:bg-orange-600 h-14 font-medium text-xl cursor-pointer transition-colors duration-200"
              // disabled={isSubmitting}
              >
                Save
              </CustomButton>

              <CustomButton
                type="button"
                // onClick={handleCancel}
                variant="outline"
                className="flex-1 bg-secondary h-14 font-medium text-xl cursor-pointer hover:bg-[#bfbfbf] transition-colors duration-200"
              // disabled={isSubmitting}
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