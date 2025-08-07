import CategoryInput from "./category-input-box";
import { useEffect } from 'react';
import { useCategoryStore } from '@/store/category-store';

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
                    <div className="relative h-14">
                        <select 
                            value={selectedSubCategory}
                            onChange={(e) => setSelectedSubCategory(e.target.value)}
                            className="w-full h-14
                            px-4 py-2.5 border border-[#9C9C9C] rounded-[10px]
                            font-inter text-[1.25rem] appearance-none bg-white"
                            disabled={!selectedCategory}
                        >
                            <option value="">Select a subcategory</option>
                            {isLoading ? (
                                <option value="" disabled>Loading subcategories...</option>
                            ) : (
                                filteredSubCategories.map((subCategory) => (
                                    <option key={subCategory.id} value={subCategory.id}>
                                        {subCategory.name}
                                    </option>
                                ))
                            )}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 