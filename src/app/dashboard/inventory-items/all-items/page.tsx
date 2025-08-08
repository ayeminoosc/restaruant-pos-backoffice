'use client';
import CustomButton from "@/components/custom-button";
import CustomSidebarItemHeader from "@/components/custom-sidebar-item-header";
import CustomTableHeader from "@/components/custom-table-header";
import InventoryManagementTable from "@/components/inventory-management/inventory-management-table";
import InventoryButton from "@/components/inventory/inventoryButton";
import InventoryDashboard from "@/components/inventory/inventoryDashboard";
import PrefixTable from "@/components/prefixes/prefix-table";
import { Plus } from "lucide-react";

const InventoryManagementPage = () => {
  return (
    <section>
      <CustomSidebarItemHeader>
       Inventory Management
      </CustomSidebarItemHeader>
      <div className="p-5 h-[calc(55.375rem-7.688rem)]">
        <CustomTableHeader title={`Inventory Items (4)`}>
          <div className="flex gap-4">
            <CustomButton
              href="/prefixes/new"
              className="h-[56px] min-w-[204px] font-medium text-xl bg-primary"
            >
              <Plus className="size-6" /> Add Prefix
            </CustomButton>
            <InventoryButton title="Adjust Stock" action={() => { }} className="min-w-[200px]" />
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
