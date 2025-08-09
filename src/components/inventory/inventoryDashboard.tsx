"use client";
import { useInventoryStore } from "@/store/inventory-store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../custom-button";
import InventoryCard from "./inventoryCard";
import { StockCard } from "./stockCard";

const icons = {
  items: "/assets/totalItem.svg",
  vendors: "/assets/vendor.svg",
  warehouse: "/assets/warehouse.svg",
};

// const items = [
//   {
//     name: "Chicken",
//     status: "Warning",
//     level: "Below reorder level ",
//     remaining: '3lbs',
//   },
//  {
//     name: "Pork",
//     status: "Warning",
//     level: "Below reorder level ",
//     remaining: '3lbs',
//   },

//    {
//     name: "fish",
//     status: "Critical",
//     level: "Below reorder level ",
//     remaining: '3lbs',
//   },
// ];

const InventoryDashboard = () => {
  const { stockAlerts, summary, fetchInventoryData } = useInventoryStore();

  useEffect(() => {
    fetchInventoryData();
  }, []);
  const { t } = useTranslation();

  return (
    <div className="m-4">
      <div className="flex justify-between mt-2 items-end mb-8">
        <h2 className="font-semibold text-[24px] m-0 text-black">
          {t("inventory.titles.inventory_summary")}
        </h2>
        <div className="flex gap-4">
          <CustomButton
            href="#"
            className="h-14 min-w-[12.75rem] font-medium text-xl rounded-[4px] border-primary"
            variant="outline"
          >
            {t("inventory.buttons.view_all_items")}
          </CustomButton>
          <CustomButton
            href="#"
            className="h-14 min-w-[12.75rem] font-medium text-xl rounded-[4px] border-primary"
            variant="outline"
          >
            {t("inventory.buttons.view_all_transaction")}
          </CustomButton>
          <CustomButton
            href="/inventory/adjust-stock"
            className="h-14 min-w-[12.75rem] font-medium text-xl rounded-[4px] border-primary"
            variant="outline"
          >
            {t("inventory.buttons.adjust_stock")}
          </CustomButton>
        </div>
      </div>

      <div className="flex mb-4">
        <InventoryCard
          icon={icons.items}
          title={t("inventory.labels.total_items")}
          count={summary?.totalItems ?? 0}
          stateThisweek={summary?.totalItemsChange ?? ""}
        />
        <InventoryCard
          icon={icons.vendors}
          title={t("inventory.labels.vendors")}
          count={summary?.vendors ?? 0}
          stateThisweek={summary?.vendorsChange ?? ""}
        />
        <InventoryCard
          icon={icons.warehouse}
          title={t("inventory.labels.warehouses")}
          count={summary?.warehouses ?? 0}
          width="70px"
          stateThisweek={summary?.warehousesChange ?? ""}
        />
      </div>

      <div>
        <h2 className="mb-4 font-semibold text-[24px]">
          {t("inventory.labels.stock_alert")}(3)
        </h2>
        <div className="flex flex-col ">
          {stockAlerts.map((item, index) => (
            <StockCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
