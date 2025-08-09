"use client";
import CustomSidebarItemHeader from "@/components/custom-sidebar-item-header";
import InventoryDashboard from "@/components/inventory/inventoryDashboard";

const InventoryItemsPage = () => {
  return (

   <section>
      <CustomSidebarItemHeader>
       Inventory Dashboard
      </CustomSidebarItemHeader>    
        <div className="h-[calc(47.69rem-5rem)] pb-4 space-y-8">
          <InventoryDashboard />
        </div>
     
    </section>
  );
};

export default InventoryItemsPage;
