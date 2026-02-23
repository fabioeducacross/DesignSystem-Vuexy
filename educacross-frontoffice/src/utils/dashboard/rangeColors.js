const colorsEnum = [
  {
    textVariant: 'text-success',
    variant: 'success',
    background: 'bg-progress-bar-success',
    label: 'Satisfatório ≥ 80%',
    min: 80,
  },

  {
    textVariant: 'text-warning',
    variant: 'warning',
    background: 'bg-progress-bar-warning',
    label: 'Moderado ≥ 50%',
    min: 50,
    max: 80,
  },
  {
    textVariant: 'text-danger',
    variant: 'danger',
    background: 'bg-progress-bar-danger',
    label: 'Crítico ≤ 49%',
    min: 0,
    max: 49,
  },
]

export { colorsEnum }
