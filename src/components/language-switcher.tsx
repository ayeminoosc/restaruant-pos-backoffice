"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "./ui/input";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [checked, setChecked] = useState(i18n.language === "my");

  const toggleLanguage = () => {
    const newLang = checked ? "en" : "my";
    i18n.changeLanguage(newLang);
    setChecked(!checked);
  };

  useEffect(() => {
    setChecked(i18n.language === "my");
  }, [i18n.language]);

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      {/* Hidden Checkbox */}
      <Input
        type="checkbox"
        checked={checked}
        onChange={toggleLanguage}
        className="sr-only peer"
      />

      {/* Track */}
      <div className="w-16 h-8 rounded-full transition-colors duration-300 border peer-checked:bg-primary peer-checked:border-primary bg-gray-300 border-gray-400" />

      {/* Thumb */}
      <span
        className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-all duration-300  ${
          checked ? "translate-x-8 bg-[#cc4c00]" : "translate-x-0 bg-gray-500"
        }`}
      ></span>
      <span className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
        {checked ? "မြန်မာ" : "English"}
      </span>
    </label>
  );
}
