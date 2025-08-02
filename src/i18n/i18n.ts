import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import mm from "./locales/mm.json"; 

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: true,
    resources: {
      en: { translation: en },
      mm: { translation: mm },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
