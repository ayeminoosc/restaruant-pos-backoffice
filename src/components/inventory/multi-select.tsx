import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import MultipleSelector, { Option } from "../ui/multi-selector";

const OPTIONS: Option[] = [
  { label: "Vegetables", value: "vegetables" },
  { label: "Fruits", value: "fruits" },
  { label: "Meat", value: "meat" },
  { label: "Seafood", value: "seafood" },
  { label: "Juices", value: "juices" },
  { label: "Alcohol", value: "alcohol" },
];

type MultipleSelectProps = {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  optional?: boolean;
};

const MultipleSelect = ({
  control,
  name,
  label,
  optional,
  placeholder,
}: MultipleSelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedOptions = OPTIONS.filter((option) =>
          field.value?.includes(option.value)
        );

        return (
          <FormItem>
            {label && (
              <FormLabel className="text-xl font-medium">
                {label}{" "}
                {optional ? (
                  <span className="text-gray-400">(Optional)</span>
                ) : (
                  <span className="text-red-500">*</span>
                )}
                <FormMessage />
              </FormLabel>
            )}
            <FormControl>
              <MultipleSelector
                value={selectedOptions}
                defaultOptions={OPTIONS}
                onChange={(options) => {
                  const values = options.map((opt) => opt.value);
                  field.onChange(values);
                }}
                placeholder={
                  field.value && field.value.length > 0 ? "" : placeholder
                }
                className="focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring focus:border-ring-none"
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default MultipleSelect;
