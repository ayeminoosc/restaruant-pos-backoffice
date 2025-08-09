"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useMenuItemStore } from "@/store/menu-item-store";
import { MenuItemForm } from "@/components/menu-item/menu-item-form";
import { MenuItemType } from "@/types/menu-item";
import { MenuItemFormInput } from "@/lib/validations/menu-item-schema";
import CustomPageTitle from "@/components/custom-page-title";

export default function EditMenuItemPage() {
  const router = useRouter();
  const params = useParams() as { id?: string | string[] };
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const {
    menuitems,
    getMenuItemsData,
    getSingleMenuItemData,
    updateMenuItem,
    getCategoriesData,
    resetSingleMenuItem,
  } = useMenuItemStore();
  const menuItems = menuitems.items;
  const singleMenuItem = menuitems.singleItem;
  const [defaultValues, setDefaultValues] =
    useState<Partial<MenuItemFormInput> | null>(null);

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

    // Cleanup function that runs when component unmounts or when id changes
    return () => {
      resetSingleMenuItem();
    };
  }, [
    id,
    getCategoriesData,
    getMenuItemsData,
    getSingleMenuItemData,
    resetSingleMenuItem,
  ]);

  useEffect(() => {
    if (singleMenuItem) {
      const {
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
        active,
      } = singleMenuItem;
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
        active,
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
      <CustomPageTitle title="Edit menu item" />
      <MenuItemForm
        mode="edit"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      />
    </section>
  );
}
