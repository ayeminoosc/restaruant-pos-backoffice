"use client";

import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";

type CountRadioGroupProps = {
  adjustmentType: "add" | "subtract";
  setAdjustmentType: (val: "add" | "subtract") => void;
};

type CustomRadioButtonProps = {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (val: any) => void;
};

const CustomRadioButton = ({
  id,
  name,
  value,
  checked,
  onChange,
}: CustomRadioButtonProps) => {
  return (
    <div className="relative mt-1">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <label htmlFor={id} className="block cursor-pointer">
        <div className="size-5 bg-green-100 rounded-full flex items-center justify-center transition-all duration-200">
          <div
            className={`
            flex items-center justify-center size-5 rounded-full border-2 transition-all duration-200
            ${
              checked
                ? "border-black bg-white"
                : "border-gray-300 bg-white hover:border-black"
            }
          `}
          >
            {checked && <div className="size-2.5 rounded-full bg-black" />}
          </div>
        </div>
      </label>
    </div>
  );
};

export function CountRadioGroup({
  adjustmentType,
  setAdjustmentType,
}: CountRadioGroupProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 p-6 bg-[#e2ffe2] rounded-2xl border">
        <CustomRadioButton
          id="r1"
          name="adjustmentType"
          value="add"
          checked={adjustmentType === "add"}
          onChange={(e: any) =>
            setAdjustmentType(e.target.value as "add" | "subtract")
          }
        />
        <div>
          <Label htmlFor="r1" className="text-xl cursor-pointer">
            {t("adjust_stock.labels.add_stock")}
          </Label>
          <div className="text-sm text-muted-foreground">
            {t("adjust_stock.labels.add_stock_text")}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 p-6 bg-[#ffeeee] rounded-2xl border">
        <CustomRadioButton
          id="r2"
          name="adjustmentType"
          value="subtract"
          checked={adjustmentType === "subtract"}
          onChange={(e: any) =>
            setAdjustmentType(e.target.value as "add" | "subtract")
          }
        />
        <div>
          <Label htmlFor="r1" className="text-xl cursor-pointer">
            {t("adjust_stock.labels.substract_stock")}
          </Label>
          <div className="text-sm text-muted-foreground">
            {t("adjust_stock.labels.substract_stock_text")}
          </div>
        </div>
      </div>
    </div>
  );
}
