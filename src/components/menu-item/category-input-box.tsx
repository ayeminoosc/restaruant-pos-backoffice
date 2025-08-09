import { useEffect } from 'react';
import { useCategoryStore } from '@/store/category-store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryInputProps {
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
}

export default function CategoryInput({ 
    selectedCategory,
    setSelectedCategory 
}: CategoryInputProps) {
    const { categories, isLoading, fetchCategories } = useCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <label className="w-full h-[20%] font-inter font-medium text-[1.4rem] leading-[100%] tracking-[0] flex items-center gap-1">
                Choose category
                <div className="text-red-500">*</div>
            </label>
            <div>
                <Select
                    value={selectedCategory || "none"}
                    onValueChange={(value) => {
                        if (value === "none") {
                            setSelectedCategory("");
                        } else {
                            setSelectedCategory(value);
                        }
                    }}
                >
                    <SelectTrigger
                        className="h-14 w-full md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring rounded-md bg-background px-3 py-2 [&>svg]:w-6 [&>svg]:h-6"
                        style={{ minHeight: '56px', height: '56px' }}
                    >
                        <SelectValue
                            placeholder="Select a category"
                            className="md:text-lg"
                        />
                    </SelectTrigger>
                    <SelectContent className="w-full min-w-[200px]">
                        <SelectItem value="none">
                            Select a category
                        </SelectItem>
                        {isLoading ? (
                            <SelectItem value="loading" disabled>
                                Loading categories...
                            </SelectItem>
                        ) : (
                            categories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id}
                                    className="md:text-lg p-[0.625rem] cursor-pointer hover:bg-[#FFE5D6] data-[highlighted]:bg-[#FFE5D6]"
                                >
                                    {category.name}
                                </SelectItem>
                            ))
                        )}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}