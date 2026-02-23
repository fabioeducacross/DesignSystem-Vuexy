import fullTextIcon from '@/assets/icons/exercises-types/full-text.svg'
import wordListIcon from '@/assets/icons/exercises-types/word-list.svg'

export const exerciseTypeEnum = {
  1: {
    label: 'Lista de palavras',
    value: 1,
    image: wordListIcon,
    variant: 'word-list',
  },
  2: {
    label: 'Texto completo',
    value: 2,
    image: fullTextIcon,
    variant: 'full-text',
  },
}
