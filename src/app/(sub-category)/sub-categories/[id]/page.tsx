import CustomPageTitle from "@/components/custom-page-title";
import { UpdateSubCategoryForm } from "@/components/sub-category/update-sub-category-form";

const UpdateSubCategoryPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <section>
      <CustomPageTitle title="Update sub-category" />
      <UpdateSubCategoryForm subCategoryId={id} />
    </section>
  );
};

export default UpdateSubCategoryPage;