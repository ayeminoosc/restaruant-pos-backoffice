"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { prefixFormSchema } from "@/types/type";
import { PrefixFormInput } from "@/types/type";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
// import { Button } from "./Themecomponents/Button";
import SaveCancelBtn from "@/common/save-cancle-btn";
import { LucidePlus, ChevronRight, ChevronDown  } from "lucide-react";

interface PrefixFormProps {
  defaultValues: Partial<PrefixFormInput>;
  onSubmit: (data: PrefixFormInput) => void;
  mode: "create" | "edit";
}
const COLOR_OPTIONS = [
  "#ff7a3d",  // Orange
  "#4de100",  // Lime Green
  "#ff2270",  // Pink
  "#0096ff",  // Blue
  "#00aaff",  // Teal
  "#5e16b9",  // Purple
  "#15b15b",  // Dark Green
  "#b76d1e",  // Brown
  "#ffffff",  // White
  "#642818",  // Brown
  "#000000",  // Black
  "#0a29ff",  // Dark Blue
  "#14720e",  // Green
  "#624248",  // Brown
  "#0b2d41",  // Dark Teal
  "#19e1b7",  // Aqua
  "#e5f3ff",  // Light Purple
  "#8f0d0a",  // Maroon
  "#ff630d",  // Orange
  "#ff9883",  // Peach
  "#a3c1ff",  // Light Blue
];

export function PrefixForm({ defaultValues, onSubmit, mode }: PrefixFormProps) {
  const form = useForm<PrefixFormInput>({
    resolver: zodResolver(prefixFormSchema),
    defaultValues,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="flex justify-center">
      <div className=" w-5/6 pb-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-4 w-full"
          >
            <FormField
              control={form.control as any}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-medium text-[20px] text-[#2A2A2A]">
                    Create prefix name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full border-[#9C9C9C] "
                      placeholder="Enter prefix name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="bilingualName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-[20px] text-[#2A2A2A]">
                    Bilingual Name{" "}
                    <span className="text-gray-300 text-[20px] font-medium">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input className="border-[#9C9C9C]" placeholder="Enter translated name (e.g., ‘Hta-min-kyaw’)" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control as any}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-[20px] text-[#2A2A2A]">Description <span className="text-gray-300 text-[20px] font-medium">(optional)</span></FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what this prefix means.."
                      className="w-full h-[192px] resize-none border-[#9C9C9C]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />           
               <div className="flex justify-between border-b-2 pb-4 "  onClick={() => setShowAdvanced((prev) => !prev)}>
              <FormLabel>Advanced Setting</FormLabel> {showAdvanced ? <ChevronDown size={20} /> : <ChevronRight size={20}/>}
         
            </div>

            {showAdvanced && (
              <>
                <FormField
                  control={form.control as any}
                  name="color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-[20px] text-black">Select Button Color</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {COLOR_OPTIONS.map((color) => (
                          <div
                            key={color}
                            className={`w-[40px] h-[40px] rounded-[10px] cursor-pointer border-2 border-[#D9D9D9] ${
                              field.value === color
                                ? "border-black"
                                : "border-transparent"
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => field.onChange(color)}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}

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
                  <FormLabel className="font-medium text-[20px] text-black">Active</FormLabel>
                </FormItem>
              )}
            />

            <div className="flex gap-4 mt-6">
               <SaveCancelBtn
  onSave={form.handleSubmit(onSubmit)}
  onCancel={() => form.reset()} 
  mode={mode}
/>

            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
