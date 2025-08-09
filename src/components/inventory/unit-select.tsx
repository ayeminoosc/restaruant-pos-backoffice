"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface UnitSelectProps {
  control: any;
  name: string;
  label?: string;
  optional?: boolean;
  placeholder: string;
}

const UnitSelect = ({
  control,
  name,
  label,
  optional,
  placeholder,
}: UnitSelectProps) => {
  const [units, setUnits] = useState<string[]>([]);

  // Simulate fetching from backend (for now hardcoded)
  useEffect(() => {
    // Later: replace with fetch("/api/units")
    setUnits(["kg", "gal", "lbs", "pcs"]);
  }, []);

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
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-full data-[size=default]:h-14 md:text-lg placeholder:text-lg focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="w-full ">
              {units.map((unit) => (
                <SelectItem key={unit} value={unit} className="text-lg">
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default UnitSelect;
