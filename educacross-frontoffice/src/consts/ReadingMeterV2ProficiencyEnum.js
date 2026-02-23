/**
 * Enum de proficiência específico para o módulo Reading Meter V2
 * Este enum substitui o uso de ReadingMeterEnum.ReadingProficiencyEnum
 * no contexto de Fluência Leitora V2.
 *
 * @note DIFERENÇA: ID 3 usa "Adequado" ao invés de "Proficiente"
 */
export const ReadingProficiencyV2Enum = [
  {
    id: 1,
    text: 'Abaixo do Básico',
    label: 'Abaixo do Básico',
    variant: 'legend-below-basic',
    icon: 'trending_down',
    barPercent: 25,
    backgroundColor: '#FFDEE1',
    rule: value => value === 1,
  },
  {
    id: 2,
    text: 'Básico',
    label: 'Básico',
    variant: 'legend-basic',
    icon: 'commit',
    barPercent: 50,
    backgroundColor: '#FFF4DB',
    rule: value => value === 2,
  },
  {
    id: 3,
    text: 'Adequado',
    label: 'Adequado',
    variant: 'legend-proficient',
    icon: 'trending_up',
    barPercent: 75,
    backgroundColor: '#DAEEFF',
    rule: value => value === 3,
  },
  {
    id: 4,
    text: 'Avançado',
    label: 'Avançado',
    variant: 'legend-advanced',
    icon: 'north',
    barPercent: 100,
    backgroundColor: '#DBFFE1',
    rule: value => value === 4,
  },
]

/**
 * Enum de proficiência para uso em legendas (compatível com sistema de legendas)
 * Este enum substitui proficiencyEnum no contexto de Fluência Leitora V2.
 */
export const proficiencyV2 = [
  {
    id: 0,
    label: 'Não Iniciado',
    variant: 'legend-not-completed',
    icon: 'no_accounts',
    textClass: 'text-legend-not-completed',
    rule: value => value === 0,
  },
  {
    id: 1,
    label: 'Abaixo do Básico',
    variant: 'legend-below-basic',
    icon: 'sentiment_dissatisfied',
    textClass: 'text-legend-below-basic',
    rule: value => value === 1,
  },
  {
    id: 2,
    label: 'Básico',
    variant: 'legend-basic',
    icon: 'sentiment_neutral',
    textClass: 'text-legend-basic',
    rule: value => value === 2,
  },
  {
    id: 3,
    label: 'Adequado',
    variant: 'legend-proficient',
    icon: 'sentiment_satisfied',
    textClass: 'text-legend-proficient',
    rule: value => value === 3,
  },
  {
    id: 4,
    label: 'Avançado',
    variant: 'legend-advanced',
    icon: 'sentiment_very_satisfied',
    textClass: 'text-legend-advanced',
    rule: value => value === 4,
  },
]

/**
 * Versão com status "Em Andamento"
 */
export const proficiencyV2WithInProgress = [
  {
    id: 0,
    label: 'Em Andamento',
    variant: 'legend-in-progress',
    icon: 'directions_walk',
    textClass: 'text-legend-in-progress',
    rule: value => value === 0,
  },
  ...proficiencyV2.filter(p => p.id !== 0),
]

/**
 * Versão com status "Não Concluído"
 */
export const proficiencyV2WithNotCompleted = [
  {
    id: 0,
    label: 'Não Concluído',
    variant: 'legend-not-completed',
    icon: 'no_accounts',
    textClass: 'text-legend-not-completed',
    rule: value => value === 0,
  },
  ...proficiencyV2.filter(p => p.id !== 0),
]

/**
 * Função helper para obter proficiência por ID (compatível com getVariantByRule)
 */
export const getVariantByRuleV2 = (value = 0, enumType = 'proficiency') => {
  const enums = {
    proficiency: proficiencyV2,
    proficiencyWithInProgress: proficiencyV2WithInProgress,
    proficiencyWithNotCompleted: proficiencyV2WithNotCompleted,
  }

  const legend = enums[enumType]
  if (!legend) return undefined

  return legend.find(i => i.rule && i.rule(value)) || legend[0]
}
