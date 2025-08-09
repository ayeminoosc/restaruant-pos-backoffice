"use client";
import CustomButton from "@/components/custom-button";
import CustomSidebarItemHeader from "@/components/custom-sidebar-item-header";
import CustomTableHeader from "@/components/custom-table-header";
import InventoryManagementTable from "@/components/inventory-management/inventory-management-table";
import { useInventoryStore } from "@/store/inventory-store";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const InventoryManagementPage = () => {
  const { setSearchQuery, fetchInventoryData } = useInventoryStore();
  useEffect(() => {
    fetchInventoryData();
  }, []);
  const { t } = useTranslation();
  return (
    <section>
      <CustomSidebarItemHeader onSearchChange={setSearchQuery}>
        {t("inventory.titles.inventory_management")}
      </CustomSidebarItemHeader>
      <div className="p-5 h-[calc(55.375rem-7.688rem)]">
        <CustomTableHeader title={`Inventory Items (4)`}>
          <div className="flex gap-4">
            <CustomButton
              href="/inventory/new"
              className="h-14 min-w-[12.75rem] font-medium text-xl bg-primary"
            >
              <Plus className="size-6" /> {t("inventory.buttons.add_item")}
            </CustomButton>
            <CustomButton
              href="/inventory/adjust-stock"
              className="h-14 min-w-[12.75rem] font-medium text-xl border-primary rounded-[4px]"
              variant="outline"
            >
              {t("inventory.buttons.adjust_stock")}
            </CustomButton>
          </div>
        </CustomTableHeader>
        <div className="h-[calc(47.69rem-5rem)] pb-4 space-y-8">
          <InventoryManagementTable />
        </div>
      </div>
    </section>
  );
};

export default InventoryManagementPage;
