"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useMenuItemStore } from "@/store/menu-item-store";
import { MenuItemForm } from "@/components/menu-item/menu-item-form";
import { MenuItemType } from "@/types/menu-item";
import { MenuItemFormInput } from "@/lib/validations/menu-item-schema";

export default function EditMenuItemPage() {
  const router = useRouter();
  const params = useParams() as { id?: string | string[] };
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { menuitems, getMenuItemsData, getSingleMenuItemData, updateMenuItem, getCategoriesData } = useMenuItemStore();
  const menuItems = menuitems.items;
  const singleMenuItem = menuitems.singleItem;
  const [defaultValues, setDefaultValues] = useState<Partial<MenuItemFormInput> | null>(null);

  useEffect(() => {
    const loadData = async () => {
      await getCategoriesData();
      if (menuItems.length === 0) {
        await getMenuItemsData();
      }
      if (id) {
        await getSingleMenuItemData(id);
      }
    };
    loadData();
  }, [id, getCategoriesData, getMenuItemsData, getSingleMenuItemData]);

  useEffect(() => {
    if (singleMenuItem) {
      const { name, bilingualName, barCode, price, categoryId, subcategoryId, photo, modifiers, advancedSettings, buttonColor, active } = singleMenuItem;
      setDefaultValues({ 
        name, 
        bilingualName, 
        barCode, 
        price, 
        categoryId, 
        subcategoryId, 
        photo, 
        modifiers, 
        advancedSettings, 
        buttonColor, 
        active 
      });
    }
  }, [singleMenuItem]);

  const handleSubmit = async (data: MenuItemFormInput) => {
    if (id) {
      await updateMenuItem(id, { ...data, id } as MenuItemType);
    }
  };

  if (!defaultValues) return <p>Loading...</p>;

  return (
    <section>
      <MenuItemForm 
        mode="edit" 
        defaultValues={defaultValues} 
        onSubmit={handleSubmit} 
      />
    </section>
  );
}