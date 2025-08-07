"use client";

import CustomButton from "@/components/custom-button";
import CustomSidebarItemHeader from "@/components/custom-sidebar-item-header";
import CustomTableHeader from "@/components/custom-table-header";
import MenuItemTable from "@/components/menu-item/menu-item-table";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useMenuItemStore } from "@/store/menu-item-store";

const MenuItemsPage = () => {
  const { t } = useTranslation();
  const menuItems = useMenuItemStore((s) => s.menuItems);

  return (
    <section>
      <CustomSidebarItemHeader>{t("menuItems")}</CustomSidebarItemHeader>
      <div className="p-5 h-[calc(55.375rem-7.688rem)]">
        <CustomTableHeader title={`Menu Items (${menuItems.length})`}>
          <CustomButton
            href="/menu-items/new"
            className="h-full font-medium text-xl"
          >
            <Plus className="size-6" /> 
          </CustomButton>
        </CustomTableHeader>
        <div className="h-[calc(47.69rem-5rem)] pb-4 space-y-8">
          <MenuItemTable />
        </div>
      </div>
    </section>
  );
};

export default MenuItemsPage;
