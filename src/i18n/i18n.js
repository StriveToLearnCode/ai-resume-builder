import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import zhLang from './locales/zh.json'
import enLang from './locales/en.json'


i18n
  .use(LanguageDetector)  // 加这个
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enLang },
      zh: { translation: zhLang },
    },
    fallbackLng: 'zh',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: { escapeValue: false },
  })

export default i18n
