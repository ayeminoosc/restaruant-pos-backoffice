import CategoryInput from "./category-input-box";
import { useEffect } from 'react';
import { useCategoryStore } from '@/store/category-store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategorySectionProps {
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    selectedSubCategory: string;
    setSelectedSubCategory: (value: string) => void;
}

export default function CategorySection({ 
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory, 
    setSelectedSubCategory 
}: CategorySectionProps) {
    const { 
        categories, 
        subCategories, 
        isLoading, 
        fetchCategories, 
        fetchSubCategories 
    } = useCategoryStore();

    useEffect(() => {
        fetchCategories();
        fetchSubCategories();
    }, [fetchCategories, fetchSubCategories]);

    // Filter subcategories for the selected category
    const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
    const filteredSubCategories = selectedCategoryData 
        ? subCategories.filter(sub => sub.category === selectedCategoryData.name)
        : [];

    return (
        <>
            <div className="w-full h-[96px]">
                <CategoryInput 
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>

            <div className="w-full h-[96px]">
                <div className="w-full h-full flex flex-col gap-4">
                    <label className="w-full h-[20%] font-inter font-medium text-[1.4rem] leading-[100%] tracking-[0] flex items-center gap-1">
                        Choose subcategory
                        <div className="text-gray-400"> (Optional)</div>
                    </label>
                    <div>
                        <Select
                            value={selectedSubCategory || "none"}
                            onValueChange={(value) => {
                                if (value === "none") {
                                    setSelectedSubCategory("");
                                } else {
                                    setSelectedSubCategory(value);
                                }
                            }}
                            disabled={!selectedCategory}
                        >
                            <SelectTrigger
                                className="h-14 w-full md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring rounded-md bg-background px-3 py-2 [&>svg]:w-6 [&>svg]:h-6"
                                style={{ minHeight: '56px', height: '56px' }}
                            >
                                <SelectValue
                                    placeholder="Select a subcategory"
                                    className="md:text-lg"
                                />
                            </SelectTrigger>
                            <SelectContent className="w-full min-w-[200px]">
                                <SelectItem value="none">
                                    Select a subcategory
                                </SelectItem>
                                {isLoading ? (
                                    <SelectItem value="loading" disabled>
                                        Loading subcategories...
                                    </SelectItem>
                                ) : (
                                    filteredSubCategories.map((subCategory) => (
                                        <SelectItem
                                            key={subCategory.id}
                                            value={subCategory.id}
                                            className="md:text-lg p-[0.625rem] cursor-pointer hover:bg-[#FFE5D6] data-[highlighted]:bg-[#FFE5D6]"
                                        >
                                            {subCategory.name}
                                        </SelectItem>
                                    ))
                                )}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </>
    );
}