"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuItemForm } from "@/components/menu-item/menu-item-form";
import { useMenuItemStore } from "@/store/menu-item-store";
import { MenuItemFormInput } from "@/lib/validations/menu-item-schema";

export default function NewMenuItemPage() {
  const router = useRouter();
  const { createMenuItem, getCategoriesData } = useMenuItemStore();

  useEffect(() => {
    getCategoriesData();
  }, [getCategoriesData]);

  const handleSubmit = async (data: MenuItemFormInput) => {
    await createMenuItem(data);
  };

  return (
    <section>
      <MenuItemForm 
        mode="create" 
        defaultValues={{}} 
        onSubmit={handleSubmit} 
      />
    </section>
  );
} 