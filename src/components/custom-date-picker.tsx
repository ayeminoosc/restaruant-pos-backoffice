import { DatePicker } from "./date-picker";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface CustomDatePickerProps {
  control: any;
  optional?: boolean;
  name: string;
  label?: string;
  placeholder?: string;
}

export default function CustomDatePicker({ control, name, optional = false, label, placeholder }: CustomDatePickerProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <DatePicker
              {...field}
              label={label}
              placeholder={placeholder}
              value={field.value}
              onChange={field.onChange}
              optional={false}
              error={fieldState.error?.message}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}