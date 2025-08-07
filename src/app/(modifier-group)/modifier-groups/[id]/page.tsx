import CustomPageTitle from "@/components/custom-page-title";
import { UpdateModifierGroupForm } from "@/components/modifier-group/update-modifier-group.form";

const UpdateModiferGroupPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <section>
      <CustomPageTitle title="Update modifier group" />
      <UpdateModifierGroupForm dataId={id} />
    </section>
  );
};

export default UpdateModiferGroupPage;
