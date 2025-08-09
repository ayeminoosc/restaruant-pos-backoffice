"use client";

import CustomButton from "@/components/custom-button";
import CustomSidebarItemHeader from "@/components/custom-sidebar-item-header";
import CustomTableHeader from "@/components/custom-table-header";
import ModifierTable from "@/components/modifier-group/modifier-table";
import { useModifierGroupStore } from "@/store/modifier-group-store";
import { useProfileStore } from "@/store/profile-store";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

const ModifierGroupPage = () => {
  const { t } = useTranslation();
  const itemCount = useModifierGroupStore((s) => s.modifierGroups).length;
  const setSearchTerm = useProfileStore((s) => s.setSearchTerm);

  return (
    <section>
      <CustomSidebarItemHeader onSearchChange={setSearchTerm}>
        {t("modifier_group.titles.group_management")}
      </CustomSidebarItemHeader>
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
