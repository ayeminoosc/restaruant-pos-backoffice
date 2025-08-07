import CategoryInput from "./category-input-box";
import { useEffect, useState } from 'react';
import { categoryApi, SubCategory } from '@/utils/category-api';

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
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSubCategories = async () => {
            if (!selectedCategory) {
                setSubCategories([]);
                return;
            }

            setLoading(true);
            try {
                // Get the category name from the selected category ID
                const categories = await categoryApi.getCategories();
                const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
                
                if (selectedCategoryData) {
                    const data = await categoryApi.getSubCategoriesByCategory(selectedCategoryData.name);
                    setSubCategories(data);
                }
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubCategories();
    }, [selectedCategory]);

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
                    <div className="relative">
                        <select 
                            value={selectedSubCategory}
                            onChange={(e) => setSelectedSubCategory(e.target.value)}
                            className="w-full
                            px-4 py-2.5 border border-[#9C9C9C] rounded-[10px]
                            font-inter text-[1.25rem] pl-6 pr-10 appearance-none bg-white"
                            disabled={!selectedCategory}
                        >
                            <option value="">Select a subcategory</option>
                            {loading ? (
                                <option value="" disabled>Loading subcategories...</option>
                            ) : (
                                subCategories.map((subCategory) => (
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