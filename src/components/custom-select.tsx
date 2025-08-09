"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

interface CustomSelectProps {
  control: any;
  name: string;
  label?: string;
  optional?: boolean;
  placeholder?: string;
  items: string[];
}

const CustomSelect = ({
  control,
  name,
  label,
  optional,
  placeholder,
  items,
}: CustomSelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xl font-medium">
            {label}
            {optional ? (
              <span className="text-gray-400 ml-1">(Optional)</span>
            ) : (
              <span className="text-red-500">*</span>
            )}
            <FormMessage className="text-base font-normal" />
          </FormLabel>
          <Select
            onValueChange={(value) => field.onChange([value])} // wrap in array
            value={field.value?.[0] || ""} // unwrap for display
          >
            <FormControl>
              <SelectTrigger className="w-full data-[size=default]:h-14 md:text-lg placeholder:text-lg focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-full ">
              {items.map((item) => (
                <SelectItem key={item} value={item} className="text-lg">
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default CustomSelect;
