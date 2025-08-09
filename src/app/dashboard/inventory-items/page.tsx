"use client";
import CustomSidebarItemHeader from "@/components/custom-sidebar-item-header";
import InventoryDashboard from "@/components/inventory/inventoryDashboard";
import { useTranslation } from "react-i18next";

const InventoryItemsPage = () => {
  const { t } = useTranslation();
  return (

   <section>
      <CustomSidebarItemHeader>
      {t("inventory.titles.inventory_dashboard")}
      </CustomSidebarItemHeader>    
        <div className="h-[calc(47.69rem-5rem)] pb-4 space-y-8">
          <InventoryDashboard />
        </div>
     
    </section>
  );
};

export default InventoryItemsPage;
