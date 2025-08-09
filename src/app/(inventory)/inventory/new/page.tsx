"use client";
import CustomPageTitle from "@/components/custom-page-title";
import NewInventoryForm from "@/components/inventory/new-inventory-form";
import { useTranslation } from "react-i18next";

const AddNewInventoryItemPage = () => {
  const { t } = useTranslation();

  return (
    <section>
      <CustomPageTitle title={t("inventory_items.titles.new_inventory")} />
      <NewInventoryForm />
    </section>
  );
};

export default AddNewInventoryItemPage;
