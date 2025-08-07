"use client";

import { useRouter } from "next/navigation";
import CategoryBoxOfCPg from "@/components/category/category-box";
import { Plus } from "phosphor-react";
import { useCategoryStore } from "@/store/category-store";
import { useEffect, useState } from "react";
import CustomSidebarItemHeader from "@/components/custom-sidebar-item-header";
import CustomTableHeader from "@/components/custom-table-header";
import CustomButton from "@/components/custom-button";

export default function CategoryPg() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    categories,
    fetchCategories,
    subCategories,
    fetchSubCategories,
    deleteCategoryById,
    deleteSubCategoryById,
  } = useCategoryStore();

  useEffect(() => {
    const loadData = async () => {
      await fetchCategories();
      await fetchSubCategories();
    };

    loadData();
  }, []);

  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (category.bilingualName && category.bilingualName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter subcategories based on search query
  const filteredSubCategories = subCategories?.filter(sub =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (sub.bilingualName && sub.bilingualName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    sub.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];


  const handleCategoryDelete = async (categoryId: string, categoryName: string) => {
    if (confirm(`Are you sure you want to delete category "${categoryName}"?`)) {
      await deleteCategoryById(categoryId);
      await fetchCategories();
    }
  };

  const handleCategoryEdit = (categoryId: string) => {
    router.push(`/new-category?id=${categoryId}`);
  };

  const handleSubCategoryDelete = async (subCategoryId: string) => {
    const subCategory = subCategories?.find(sub => sub.id === subCategoryId);
    if (confirm(`Are you sure you want to delete subcategory "${subCategory?.name}"?`)) {
      await deleteSubCategoryById(subCategoryId);
      await fetchSubCategories();
    }
  };

  const handleSubCategoryEdit = (subCategoryId: string) => {
    router.push(`/new-sub-category?id=${subCategoryId}`);
  };

  return (
    <div className="w-full h-full">
      <CustomSidebarItemHeader
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search categories..."
      >
        Category
      </CustomSidebarItemHeader>

      <div className="p-5 h-[calc(55.375rem-7.688rem)]">
        <CustomTableHeader title={`Menu-category (${filteredCategories.length})`}>
          <div className="buttons flex gap-[0.625rem]">
            <CustomButton
              href="/new-category"
              className="h-full font-medium text-xl"
            >
              <Plus className="size-6" />
              Add Category
            </CustomButton>
            <CustomButton
              href="/new-sub-category"
              className="h-full font-medium text-xl"
            >
              <Plus className="size-6" />
              Add Sub-Category
            </CustomButton>
          </div>
        </CustomTableHeader>

        <div className="h-[calc(47.69rem-5rem)] pb-4 space-y-8">
          <div className="flex flex-col rounded-[1.25rem] shadow-md ">
            {filteredCategories.map((category) => (
              <div key={category.id} className="categoryBoxOfCPg">
                <CategoryBoxOfCPg
                  id={category.id}
                  name={category.name}
                  bilingualName={category.bilingualName}
                  image={category.imageUrl}
                  isActive={category.active}
                  subCategoryList={filteredSubCategories.filter(sub => sub.category === category.name) || []} handleDelete={() => handleCategoryDelete(category.id, category.name)}
                  handleEdit={() => handleCategoryEdit(category.id)}
                  handleDeleteForSub={handleSubCategoryDelete}
                  handleEditForSub={handleSubCategoryEdit}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}