"use client";

import CustomButton from "@/components/custom-button";
import CustomTableHeader from "@/components/custom-table-header";
import ModifierGroupHeader from "@/components/modifier-group/modifier-group-header";
import ModifierTable from "@/components/modifier-group/modifier-table";
import { useModifierGroupStore } from "@/store/modifier-group-store";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const ModifierGroupPage = () => {
  const { t } = useTranslation();
  const itemCount = useModifierGroupStore((s) => s.modifierGroups).length;

  return (
    <section>
      <ModifierGroupHeader />
      <div className="p-5 h-[calc(55.375rem-7.688rem)]">
        <CustomTableHeader title={t(`Modifier Groups (${itemCount})`)}>
          <CustomButton
            href="/modifier-groups/new"
            className="h-full font-medium text-xl"
          >
            <Plus className="size-6" /> {t("modifier_group.buttons.add_group")}
          </CustomButton>
        </CustomTableHeader>
        <div className="h-[calc(47.69rem-5rem)] pb-4 space-y-8">
          <ModifierTable />
        </div>
      </div>
    </section>
  );
};

export default ModifierGroupPage;
