import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DropdownBox({ label, placeHolder, categoryNameList }: { label: string, placeHolder: string, categoryNameList: [] }) {
    console.log("Category Name List:", categoryNameList);
    return (
        <div className="w-full h-full flex flex-col gap-[1rem]">

            <label
                htmlFor="main-input"
                className="w-full h-[20%] font-inter font-medium text-[1.25rem] text-[#2A2A2A] flex items-center gap-1"
            >
                {label}
                <div className="pt-1 text-[#EA1414] font-inter text-[1.25rem] font-medium leading-none"> *</div>
            </label>

            <Select onValueChange={(value) => console.log(value)}>
                <SelectTrigger
                    className="w-full flex items-center gap-[0.625rem] self-stretch rounded-[0.625rem] border border-[#9C9C9C] font-inter text-[1.25rem] [&>svg]:w-6 [&>svg]:h-6"
                    style={{
                        padding: '0.625rem 1rem',
                        height: 'auto',
                        minHeight: 'auto'
                    }}
                >
                    <SelectValue
                        placeholder={placeHolder}
                        className="font-inter text-[1.25rem]"
                    />
                </SelectTrigger>
                <SelectContent className="w-full min-w-[200px]">
                    {categoryNameList.map((categoryName, index) => (
                        <SelectItem
                            key={index}
                            value={categoryName}
                            className="font-inter text-[1.25rem] p-[0.625rem] cursor-pointer hover:bg-[#FFE5D6] focus:bg-[#FFE5D6] data-[highlighted]:bg-[#FFE5D6] data-[state=checked]:bg-[#FFE5D6]"
                        >
                            {categoryName}
                        </SelectItem>
                    ))}

                </SelectContent>
            </Select>
        </div>
    )
}