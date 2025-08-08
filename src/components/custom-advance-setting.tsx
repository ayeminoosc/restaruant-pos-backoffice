"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { FormField, FormItem, FormMessage } from "./ui/form";

type CustomAdvanceSettingProps = {
  control: any;
  isAdvancedOpen: boolean;
  setIsAdvancedOpen: (val: boolean) => void;
  children: ReactNode;
};

const CustomAdvanceSetting = ({
  control,
  isAdvancedOpen,
  setIsAdvancedOpen,
  children,
}: CustomAdvanceSettingProps) => {
  const { t } = useTranslation();

  return (
    <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
        <span className="font-medium text-xl">
          {t("labels.advance_setting")}
        </span>
        <ChevronRight
          className={`size-6 transition-transform ${
            isAdvancedOpen ? "rotate-90" : ""
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-4">
        <FormField
          control={control}
          name="buttonColor"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-4">{children}</div>
              <FormMessage className="text-base font-normal" />
            </FormItem>
          )}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CustomAdvanceSetting;
