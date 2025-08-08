import CustomPageTitle from "@/components/custom-page-title";
import { UpdateCategoryForm } from "@/components/category/update-category-form";

const UpdateCategoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <section>
      <CustomPageTitle title="Update category" />
      <UpdateCategoryForm categoryId={id} />
    </section>
  );
};

export default UpdateCategoryPage;