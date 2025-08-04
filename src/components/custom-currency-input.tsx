import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as React from "react";

interface CustomCurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  currencySymbol?: string;
}

const CustomCurrencyInput = React.forwardRef<
  HTMLInputElement,
  CustomCurrencyInputProps
>(({ className, currencySymbol = "MMK", type = "text", ...props }, ref) => {
  return (
    <div className="relative">
      <span className="absolute inset-0  flex items-center justify-center text-lg w-20 bg-[#f0f2f5] rounded-l-md font-normal border-ring border">
        {currencySymbol}
      </span>
      <Input
        ref={ref}
        className={cn("pl-22 h-14 text-lg placeholder:text-lg ", className)}
        type={type}
        {...props}
      />
    </div>
  );
});
CustomCurrencyInput.displayName = "CustomCurrencyInput";

export { CustomCurrencyInput };
