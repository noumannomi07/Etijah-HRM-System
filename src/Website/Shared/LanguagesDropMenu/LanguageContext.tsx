import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import i18next from "i18next";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

interface LanguageContextType {
  selectedLang: string;
  handleLanguageChange: (langCode: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  selectedLang: "ar",
  handleLanguageChange: () => { }
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [selectedLang, setSelectedLang] = useState("ar");

  const updateHtmlAttributes = (langCode: string) => {
    document.documentElement.lang = langCode;
    document.documentElement.dir = langCode === "ar" ? "rtl" : "ltr";
  };

  const changeLangSafely = (lang: string) => {
    if (i18next.isInitialized) {
      i18next.changeLanguage(lang);
    } else {
      i18next.on('initialized', () => {
        i18next.changeLanguage(lang);
      });
    }
    updateHtmlAttributes(lang);
    Cookies.set("selectedLang", lang);
    setSelectedLang(lang);
  };

  const handleLanguageChange = (langCode: string) => {
    if (!langCode) {
      console.error("Language code is undefined");
      return;
    }
    changeLangSafely(langCode);
  };

  useEffect(() => {
    const storedLang = Cookies.get("selectedLang");
    const languageToUse = storedLang || "ar";
    changeLangSafely(languageToUse);

    // Listen for Google Translate language changes
    const handleLanguageChangeEvent = (event: CustomEvent) => {
      const { language } = event.detail;
      if (language && language !== selectedLang) {
        setSelectedLang(language);
      }
    };

    window.addEventListener('languageChanged', handleLanguageChangeEvent as EventListener);

    return () => {
      window.removeEventListener('languageChanged', handleLanguageChangeEvent as EventListener);
    };
  }, [selectedLang]);

  return (
    <LanguageContext.Provider value={{ selectedLang, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired
};
