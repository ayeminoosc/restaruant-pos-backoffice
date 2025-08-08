"use client";
import React, { useEffect } from "react";
import { usePrefixStore } from "@/store/prefix-store";
import PrefixTable from "@/components/prefixes/prefix-table";
import CustomSidebarItemHeader from "@/components/custom-sidebar-item-header";
import CustomTableHeader from "@/components/custom-table-header";
import CustomButton from "@/components/custom-button";
import { Plus } from "lucide-react";

const Prefix = () => {
  const { fetchPrefixes, prefixes } = usePrefixStore();

  useEffect(() => {
    fetchPrefixes
  }, [])

  return (
      <section>
        <CustomSidebarItemHeader>
          Prefix Management
        </CustomSidebarItemHeader>
        <div className="p-5 h-[calc(55.375rem-7.688rem)]">
          <CustomTableHeader title={`Prefixes (${prefixes.length})`}>
            <CustomButton
              href="/prefixes/new"
              className="h-full font-medium text-xl bg-primary"
            >
              <Plus className="size-6" /> Add Prefix
            </CustomButton>
          </CustomTableHeader>
          <div className="h-[calc(47.69rem-5rem)] pb-4 space-y-8">
            <PrefixTable />
          </div>
        </div>
      </section>
  );
};

export default Prefix;
