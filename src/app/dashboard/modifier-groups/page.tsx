import ModifierGroupHeader from "@/components/modifier-group/modifier-group-header";
import ModifierGroupTable from "@/components/modifier-group/modifier-group-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const ModifierGroupPage = () => {
  return (
    <section>
      <ModifierGroupHeader />
      <div className="p-5 h-[calc(55.375rem-7.6875rem)]">
        <div className="flex justify-between items-end h-14 mb-6">
          <div className="font-semibold text-2xl ">Modifier Groups (3)</div>
          <Button asChild className="h-full">
            <Link href={"/new-modifier-group"} className="font-medium text-xl">
              <Plus className="size-6" /> Add Modifier Group
            </Link>
          </Button>
        </div>
        <div className="h-[calc(763px-80px)] pb-4">
          <ModifierGroupTable />
        </div>
      </div>
    </section>
  );
};

export default ModifierGroupPage;
