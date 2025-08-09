import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

interface CustomTextareaProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  optional?: boolean;
  className?: string;
}

const CustomTextarea = ({
  control,
  name,
  label,
  placeholder,
  optional,
  className,
}: CustomTextareaProps) => {
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
            <Textarea
              {...field}
              placeholder={placeholder}
              className={cn(
                " md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring",
                className
              )}
              minLength={20}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CustomTextarea;
