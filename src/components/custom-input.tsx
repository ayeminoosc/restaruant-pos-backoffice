import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CustomInputProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  optional?: boolean;
  type?: "text" | "number";
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
  optional = false,
  type = "text",
}: CustomInputProps) => {
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
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              className="h-14 md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CustomInput;
