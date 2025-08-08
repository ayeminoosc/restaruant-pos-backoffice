"use client";
import { useModifierGroupStore } from "@/store/modifier-group-store";
import { Search } from "lucide-react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./language-switcher";
import { Input } from "./ui/input";

type CustomSidebarItemHeaderProps = {
  children: ReactNode;
};

const CustomSidebarItemHeader = ({
  children,
}: CustomSidebarItemHeaderProps) => {
  const { t } = useTranslation();
  const setSearchTerm = useModifierGroupStore((s) => s.setSearchTerm);

  return (
    <div className="flex items-center justify-between px-5 border-b-[2px] h-[7.688rem] border-[#D9D9D9]">
      <div className="text-[2rem] font-semibold font-inter">{children}</div>
      <LanguageSwitcher />
      <div className="max-w-[45rem] min-w-[33.688rem] h-14 bg-[#f6f6f6] px-4 rounded-[10px] relative">
        <Search className="absolute text-[#a2a2a2] size-[1.375rem] top-4" />
        <Input
          className="h-full border-none focus-visible:ring-0 focus:outline-none text-[#a2a2a2] !text-[1.063rem] font-normal leading-6 placeholder:text-[#a2a2a2] pl-7"
          placeholder={t("placeholders.search")}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CustomSidebarItemHeader;
