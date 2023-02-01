import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationAr from "./locale/ar.json";
import translationEn from "./locale/en.json";
import translationHe from "./locale/he.json";

const resources = {
  ar: {
    translation: translationAr,
  },
  en: {
    translation: translationEn,
  },
  he: {
    translation: translationHe,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    fallbackLng: "en",
    detection: {
      order: ["cookie", "localStorage", "htmlTag", "subdomain"],
      caches: ["cookie"],
    },
  });

export default i18n;
