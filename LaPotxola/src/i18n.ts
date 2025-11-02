// src/i18n.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Importa tus JSON de /src/data
import es from './data/ui.es.json'
import en from './data/ui.en.json'
import fr from './data/ui.fr.json'
import de from './data/ui.de.json'
import ja from './data/ui.ja.json'
import zh from './data/ui.zh.json'

// Un único namespace: "ui"
const resources = {
  es: { ui: es },
  en: { ui: en },
  fr: { ui: fr },
  de: { ui: de },
  ja: { ui: ja },
  zh: { ui: zh },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    supportedLngs: ['es', 'en', 'fr', 'de', 'ja', 'zh'],
    ns: ['ui'],
    defaultNS: 'ui',
    detection: {
      order: ['localStorage', 'querystring', 'htmlTag', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
  })

export default i18n
