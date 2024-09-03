import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en-US';
import translationZH from './locales/zh-CN';

const resources = {
  en: {
    translation: translationEN
  },
  zh: {
    translation: translationZH
  }
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // language resources
    resources
  });

export default i18n;
