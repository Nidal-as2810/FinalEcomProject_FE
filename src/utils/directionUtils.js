import cookies from "js-cookie";

export const languages = [
  {
    code: "ar",
    name: "العربية",
    direction: "rtl",
  },
  {
    code: "en",
    name: "English",
    direction: "ltr",
  },
  {
    code: "he",
    name: "עברית",
    direction: "rtl",
  },
];

export const currentLang = () => {
  const currentLanguageCode = cookies.get("i18next") || "en";
  return languages.find((lang) => lang.code === currentLanguageCode);
};
