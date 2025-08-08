import { FormField, FormItem } from "@/components/ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import DropdownBox from "@/components/category/drop-down";

interface DropdownOption {
    id: string;
    name: string;
    value?: string;
}

interface CustomDropDownBoxProps<T extends FieldValues> {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    placeholder?: string;
    options: DropdownOption[];
    editId?: string | null;
    optional?: boolean;
}

export default function CustomDropDownBox<T extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    options,
    editId,
    optional,
}: CustomDropDownBoxProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem>
                    <DropdownBox
                        key={`dropdown-${editId}-${field.value}`}
                        label={label}
                        placeHolder={placeholder}
                        optional={optional}
                        categoryNameList={options.map(option => option.name)}
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                    />
                </FormItem>
            )}
        />
    );
}