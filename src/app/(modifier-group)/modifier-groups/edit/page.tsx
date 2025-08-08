"use client";

import CustomPageTitle from "@/components/custom-page-title";
import { UpdateModifierGroupForm } from "@/components/modifier-group/update-modifier-group.form";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

const UpdateModiferGroupPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { t } = useTranslation();

  return (
    <section>
      <CustomPageTitle title={t("modifier_group.titles.update")} />
      <UpdateModifierGroupForm dataId={id!} />
    </section>
  );
};

export default UpdateModiferGroupPage;
