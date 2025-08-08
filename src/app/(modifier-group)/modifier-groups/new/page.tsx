"use client";

import CustomPageTitle from "@/components/custom-page-title";
import { ModifierGroupForm } from "@/components/modifier-group/modifier-group-form";
import { useTranslation } from "react-i18next";

const NewModifierGroupPage = () => {
  const { t } = useTranslation();

  return (
    <section>
      <CustomPageTitle title={t("modifier_group.titles.add_new")} />
      <ModifierGroupForm />
    </section>
  );
};

export default NewModifierGroupPage;
