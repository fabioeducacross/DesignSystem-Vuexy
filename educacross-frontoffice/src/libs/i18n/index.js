import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
function loadLocaleMessages() {
  // Vite replacement for require.context: eagerly import all JSON locale files
  const localeModules = import.meta.glob('./locales/*.json', { eager: true })
  const messages = {}
  Object.keys(localeModules).forEach(key => {
    const matched = key.match(/\.\/locales\/([A-Za-z0-9-_]+)\.json$/i)
    if (matched && matched[1]) {
      const locale = matched[1]
      // JSON via glob eager returns module object with default
      messages[locale] = localeModules[key].default || localeModules[key]
    }
  })
  return messages
}
const i18n = new VueI18n({
  // locale: navigator.language.split('-')[0] || 'pt',
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: loadLocaleMessages(),
  silentTranslationWarn: true,
})

export const setLocale = locale => {
  i18n.locale = locale
}

export const getLocale = () => {
  return i18n.locale
}

export default i18n
