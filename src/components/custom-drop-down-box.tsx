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
    options: DropdownOption[];  // ← More generic name
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
    optional ,
}: CustomDropDownBoxProps<T>) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <DropdownBox
                        key={`dropdown-${editId}-${field.value}`}
                        label={label}
                        placeHolder={placeholder}
                        optional={optional}
                        categoryNameList={options.map(option => option.name)}  // ← More generic
                        value={field.value}
                        onChange={field.onChange}
                        error={control._formState.errors[name]?.message as string}
                    />
                </FormItem>
            )}
        />
    );
}