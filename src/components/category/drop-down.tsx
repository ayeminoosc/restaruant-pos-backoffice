import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DropdownBoxProps {
    label: string;
    placeHolder: string;
    categoryNameList: string[];
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
    optional?: boolean;
}

export default function DropdownBox({ label, placeHolder, categoryNameList, value, onChange, error, optional }: DropdownBoxProps) {
    return (
        <div className="w-full h-full flex flex-col gap-[1rem]">
            <label
                htmlFor="main-input"
                className="text-xl font-medium flex items-center gap-1"
            >
                {label}
                {optional ? (
                    <span className="text-gray-400 ml-1">(Optional)</span>
                ) : (
                    <span className="text-red-500">*</span>
                )}
            </label>

            <Select value={value} onValueChange={onChange}>
                <SelectTrigger
                    className="h-14 w-full md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring rounded-md bg-background px-3 py-2 [&>svg]:w-6 [&>svg]:h-6"
                    style={{ minHeight: '56px', height: '56px' }}
                >
                    <SelectValue
                        placeholder={placeHolder}
                        className="md:text-lg"
                    />
                </SelectTrigger>
                <SelectContent className="w-full min-w-[200px]">
                    {categoryNameList.map((categoryName, index) => (
                        <SelectItem
                            key={index}
                            value={categoryName}
                            className="md:text-lg p-[0.625rem] cursor-pointer hover:bg-[#FFE5D6]  data-[highlighted]:bg-[#FFE5D6] "
                        >
                            {categoryName}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {error && (
                <p className="text-red-500 text-base font-normal">
                    {error}
                </p>
            )}
        </div>
    )
}