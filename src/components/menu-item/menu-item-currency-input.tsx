import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MenuItemCurrencyInputProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  optional?: boolean;
  currencySymbol?: string;
}

const MenuItemCurrencyInput = ({
  control,
  name,
  label,
  placeholder,
  optional = false,
  currencySymbol = "MMK",
}: MenuItemCurrencyInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="text-xl font-medium">
              {label}
              {optional ? (
                <span className="text-gray-400 ml-1">(Optional)</span>
              ) : (
                <span className="text-red-500">*</span>
              )}
              <FormMessage className="text-base font-normal" />
            </FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <span className="absolute inset-0 flex items-center justify-center text-lg w-20 bg-[#f0f2f5] rounded-l-md font-normal border-ring border z-10">
                {currencySymbol}
              </span>
              <Input
                {...field}
                placeholder={placeholder}
                className={cn(
                  "pl-22 h-14 md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring"
                )}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default MenuItemCurrencyInput; 