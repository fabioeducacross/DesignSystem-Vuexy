import { toReversed } from '@/utils/utils.js'

export const colorsEnum = [
  {
    textVariant: 'text-legend-below-basic',
    variant: 'legend-below-basic',
    background: 'bg-progress-bar-legend-below-basic',
    min: 0,
    max: 50,
    text: 'Crítico < 50%',
    textClass: 'text-legend-below-basic',
  },
  {
    textVariant: 'text-legend-basic',
    variant: 'legend-basic',
    background: 'bg-progress-bar-legend-basic',
    min: 50,
    max: 80,
    text: 'Moderado ≥ 50%',
    textClass: 'text-legend-basic',
  },
  {
    textVariant: 'text-legend-proficient',
    variant: 'legend-proficient',
    background: 'bg-progress-bar-legend-proficient',

    min: 80,
    max: 100,
    text: 'Satisfatório ≥ 80%',
    textClass: 'text-legend-proficient',
  },
  {
    textVariant: 'text-legend-proficient text-darken-4',
    variant: 'legend-proficient bg-darken-4',

    background: 'bg-progress-bar-legend-proficient',
    min: 100,
    text: 'Finalizado = 100%',
    textClass: 'text-legend-proficient text-darken-4',
  },
]

export const colorsLegend = {
  text: '',
  enum: toReversed(colorsEnum),
}
