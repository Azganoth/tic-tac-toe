import { createContext, useContext, useEffect, useState } from "react";

import enUS from "../assets/locales/en.json";
import ptBR from "../assets/locales/ptBR.json";

export const LOCALES: Record<
  Translations["locale"],
  Translations["translations"]
> = {
  en: enUS,
  ptBR,
};

// helpers
const supportedLocales: string[] = [
  "en",
  "ptBR",
] satisfies Translations["locale"][];

const isSupportedLocale = (locale: string): locale is Translations["locale"] =>
  supportedLocales.includes(locale);

// context
type Translations = {
  locale: "en" | "ptBR";
  translations: typeof enUS;
  setLanguage: (locale: Translations["locale"]) => void;
};

const TranslationContext = createContext<Translations>({
  locale: "en",
  translations: enUS,
  setLanguage: () => {},
});

export const useTranslation = () => useContext(TranslationContext);

// provider
export type TranslationProviderProps = {
  children?: React.ReactNode;
  locale?: Translations["locale"];
};

export const TranslationProvider = ({
  children,
  locale,
}: TranslationProviderProps) => {
  const [currentLocale, setCurrentLocale] = useState(() => {
    const currentLanguage = navigator.language.replace("-", "");
    if (isSupportedLocale(currentLanguage)) {
      return currentLanguage;
    }

    return locale ?? "en";
  });

  useEffect(() => {
    const handleLanguageChange = () => {
      const currentLanguage = navigator.language.replace("-", "");
      if (isSupportedLocale(currentLanguage)) {
        setCurrentLocale(currentLanguage);
      }
    };

    window.addEventListener("languagechange", handleLanguageChange);

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange);
    };
  }, []);

  const setLanguage = (locale: Translations["locale"]) => {
    setCurrentLocale(locale);
  };

  return (
    <TranslationContext.Provider
      value={{
        locale: currentLocale,
        translations: LOCALES[currentLocale],
        setLanguage,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
