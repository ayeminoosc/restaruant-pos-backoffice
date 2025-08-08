"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import SearchBar from "../category/search-bar";
import { useTranslation } from "react-i18next";

const ModifierGroupHeader = ({value,onChange}) => {
  const {t} = useTranslation();
  return (
    <div className=" flex items-center justify-between px-5 border-b-[2px] h-[7.688rem] border-[#D9D9D9] ">
      <div className="text-[2rem] font-semibold font-inter">
        {t("menu-item-management")}
      </div>
      <SearchBar value={value} onChange={onChange}/>
      
    </div>
  );
};

export default ModifierGroupHeader;
