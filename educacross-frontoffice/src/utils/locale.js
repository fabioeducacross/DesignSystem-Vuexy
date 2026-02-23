import { getLocale } from '@/libs/i18n/index.js'
import { english } from 'flatpickr/dist/l10n/default.js'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'

export function getflatpickrLanguage(locale = getLocale()) {
  switch (locale) {
    case 'pt-BR':
      return Portuguese
    case 'en':
      return english
    default:
      return Portuguese
  }
}
