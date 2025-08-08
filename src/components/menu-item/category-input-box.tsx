import { useEffect } from 'react';
import { useCategoryStore } from '@/store/category-store';

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
            <div className="relative">
                <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-14
                    px-4 py-2.5 border border-[#9C9C9C] rounded-[10px]
                    font-inter text-[1.25rem] appearance-none bg-white"
                >
                    <option value="">Select a category</option>
                    {isLoading ? (
                        <option value="" disabled>Loading categories...</option>
                    ) : (
                        categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
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
    );
} 