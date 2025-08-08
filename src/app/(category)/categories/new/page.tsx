import CategoryForm from "@/components/category/category-form";
import CustomPageTitle from "@/components/custom-page-title";

export default function NewCategoryPage() {
  return (
    <section>
      <CustomPageTitle title="Add new category" />
      <CategoryForm />
    </section>
  );
}