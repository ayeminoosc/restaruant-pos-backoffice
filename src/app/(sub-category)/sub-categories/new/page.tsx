"use client";

import CustomPageTitle from "@/components/custom-page-title";
import SubCategoryForm from "@/components/sub-category/sub-category-form";

export default function NewSubCategoryPage() {
  return (
    <section>
      <CustomPageTitle title="Add New Sub-category" />
      <SubCategoryForm />
    </section>
  );
}