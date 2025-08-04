import CustomPageTitle from "@/components/custom-page-title";
import { ModifierGroupForm } from "@/components/modifier-group/modifier-group-form";

const NewModifierGroupPage = () => {
  return (
    <section>
      <CustomPageTitle title="Add new modifier group" />
      <ModifierGroupForm />
    </section>
  );
};

export default NewModifierGroupPage;
