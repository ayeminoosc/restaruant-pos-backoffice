import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as React from "react";

interface CurrencyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  currencySymbol?: string;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, currencySymbol = "MMK", type = "text", ...props }, ref) => {
    return (
      <div className="relative">
        <span className="absolute inset-y-0 left-0 px-2 flex items-center text-lg text-muted-foreground bg-[#f0f2f5] rounded-l-md font-normal">
          {currencySymbol}
        </span>
        <Input
          ref={ref}
          className={cn(
            "pl-18 h-[56px] text-lg placeholder:text-lg ",
            className
          )}
          type={type}
          {...props}
        />
      </div>
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
