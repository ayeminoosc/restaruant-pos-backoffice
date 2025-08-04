import CustomButton from "@/components/custom-button";
import CustomSidebarItemHeader from "@/components/custom-sidebar-item-header";
import CustomTableHeader from "@/components/custom-table-header";
import ModifierTable from "@/components/modifier-group/modifier-table";
import { Plus } from "lucide-react";

const ModifierGroupPage = () => {
  return (
    <section>
      <CustomSidebarItemHeader>
        Modifier Group Management
      </CustomSidebarItemHeader>
      <div className="p-5 h-[calc(55.375rem-7.688rem)]">
        <CustomTableHeader title={"Modifier Groups (3)"}>
          <CustomButton
            href="/new-modifier-group"
            className="h-full font-medium text-xl"
          >
            <Plus className="size-6" /> Add Modifier Group
          </CustomButton>
        </CustomTableHeader>
        <div className="h-[calc(47.69rem-5rem)] pb-4 space-y-8">
          <ModifierTable />
          {/* <PrefixTable />
          <InventoryTable /> */}
        </div>
      </div>
    </section>
  );
};

export default ModifierGroupPage;
