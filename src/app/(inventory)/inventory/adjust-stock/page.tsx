"use client";
import AdjustStockForm from "@/components/adjust-stock/adjust-stock-form";
import CustomPageTitle from "@/components/custom-page-title";
import { useTranslation } from "react-i18next";

const AdjustStockPage = () => {
  const { t } = useTranslation();

  return (
    <section>
      <CustomPageTitle title={t("adjust_stock.titles.adjust_stock")} />
      <AdjustStockForm />
    </section>
  );
};

export default AdjustStockPage;
