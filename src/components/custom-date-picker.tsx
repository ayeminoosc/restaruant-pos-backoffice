import { DatePicker } from "./date-picker";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface CustomDatePickerProps {
  control: any;
  optional?: boolean;
}

export default function CustomDatePicker({ control, optional = false }: CustomDatePickerProps) {
  return (
    <FormField
      control={control}
      name="date"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <DatePicker
              {...field}
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