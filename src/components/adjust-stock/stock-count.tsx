import { useTranslation } from "react-i18next";

type StockCountProps = {
  adjustmentType: string;
};

const StockCount = ({ adjustmentType }: StockCountProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="mb-3 text-xl font-medium">
          {t("adjust_stock.labels.current_stock")}
        </div>
        <div className="p-6 border rounded-2xl space-y-5 border-[#e3e3e3]">
          <div className="text-2xl font-bold">4 lbs</div>
          <div className="text-xl font-medium">Reorder Level: 5lbs</div>
        </div>
      </div>
      <div>
        <div className="mb-3 text-xl font-medium">
          {t("adjust_stock.labels.new_stock")}
        </div>
        <div className="p-6 border rounded-2xl bg-[#fff1dd] space-y-5 border-[#e3e3e3]">
          <div className="text-2xl font-bold text-primary">10 lbs</div>
          <div className="text-xl font-medium text-[#14af19]">+6lbs</div>
        </div>
      </div>
    </div>
  );
};

export default StockCount;
