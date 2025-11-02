import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  // { code: 'de', label: 'DE' },
  // { code: 'zh', label: '中文' },
  // { code: 'ja', label: '日本語' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language?.split('-')[0] || 'es'

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng)
    // opcional: persiste preferencia (i18next ya usa localStorage por detector)
    localStorage.setItem('i18nextLng', lng)
    document.documentElement.lang = lng
  }

  return (
    <div className="flex items-center gap-2">
      {languages.map(l => (
        <button
          key={l.code}
          onClick={() => changeLang(l.code)}
          className={`px-2 py-1 rounded-md text-sm font-sans
            ${current === l.code ? 'bg-brand-ink text-brand-paper' : 'bg-brand-paper text-brand-ink border border-brand-ink/20'}
            hover:opacity-90 transition`}
          aria-pressed={current === l.code}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
