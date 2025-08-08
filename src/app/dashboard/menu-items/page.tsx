
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useMenuStore } from "@/store/useMenuStore";
import ModifierGroupHeader from "@/components/modifier-group/modifier-group-header";
import MenuItemList from "@/components/ui/menu-item-list";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function MenuItemManagementPage() {
  const menu = useMenuStore((state) => state.menu);
  const fetchMenu = useMenuStore((state) => state.fetchMenu);
  const loading = useMenuStore((state) => state.loading);
  const error = useMenuStore((state) => state.error);
  const {t} = useTranslation();

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <div className="w-full">
      <ModifierGroupHeader />

      <div className="ml-[1.25rem] mr-[2.5rem]">
        <div className="flex justify-between items-end h-14 mt-[2rem] mb-[2.5rem]">
          <div className="text-black font-inter text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] font-semibold leading-normal">
            Menu Item ({menu?.length || 0})
          </div>

          <Button asChild className="h-full">
            <Link href="/menu-items/new" className="font-medium text-xl">
              <Plus className="size-6" /> {t("add-menu-item")}
            </Link>
          </Button>
        </div>

        {loading && <div className="p-4 text-gray-500">Loading menu...</div>}
        {error && <div className="p-4 text-red-500">Error: {error}</div>}
        {!loading && !error && <MenuItemList />}
      </div>
    </div>
  );
}
