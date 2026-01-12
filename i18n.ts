import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

i18next
  // i18next-http-backend
  // loads translations from 'public/locales'
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .init({
    fallbackLng: "en",
    defaultNS: "systemSettings",
    debug: true,
    ns: ['staffManagement', 'homePage', 'navbar', 'footer', 'aboutUs', 'services', 'packages', 'blogs', 'aboutApp', 'login', 'contactUs', 'privacyPolicy', 'subscription', 'followUpPerformance', 'systemSettings', 'orders', 'tasks', 'common', 'main'],
  
    detection: {
      order: [
        "cookie",
        "htmlTag",
        "localStorage",
        "sessionStorage",
        "navigator",
        "path",
        "subdomain"
      ],
      caches: ["cookie"]
    },
    react: {
      useSuspense: false
    }
  });

export default i18next;