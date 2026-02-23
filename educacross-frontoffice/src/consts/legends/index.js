/**
 * Legends object that holds different performance legends.
 * @type {Object}
 * @property {Array} learningPerformance - Legend for learning performance.
 * @property {Array} accuracyPerformance - Legend for accuracy performance.
 */
import { eventLearningPerformance } from './events/eventPerformanceEnum'
import { eventProgress } from './events/eventProgressEnum'
import { guideStatus } from './guideStatusEnum'
import { participation } from './participationEnum'
import { percentileNarrativeComplexityWithNotCompleted } from './percentileNarrativeComplexityEnum.js'
import { accuracyPerformance, learningPerformance } from './performanceEnum'
import {
  proficiency,
  proficiencyWithInProgress,
  proficiencyWithNotCompleted,
} from './proficiencyEnum'
import { progress } from './progressEnum'
import { ReadingProficiencyEnum } from '@/consts/ReadingExpeditionEnum'
import { ReadingFluencyV2StatusEnum } from '@/consts/ReadingMeterEnum'
import { UserStatusEnum } from '@/consts/UserStatusEnum'
import { evidenceReportFinishedGames } from '@/consts/legends/evidenceReportEnum'
import { percentilePerformance } from '@/consts/legends/percentilePerformanceEnum'
import { writingPhaseEnum } from '@/consts/legends/writingPhasesEnum'
import { performanceEnum } from '@/consts/progressPerformanceEnum'

/**
 * @typedef {'legend-advanced' | 'legend-not-completed' | 'legend-in-progress' | 'legend-basic' | 'legend-below-basic'} SystemVariant
 */

/**
 * @typedef {SystemVariant | SubjectVariant} Variant
 */

/**
 * rule function that determines if a value matches an interval.
 * @param {number} value - The value to be evaluated against the rule function.
 * @returns {boolean} - Returns true if the value matches the rule, otherwise false.
 * @typedef {Function} Rule
 */

/**
 * @typedef {Object} LegendItem
 * @property {string} text - The display text.
 * @property {Variant} variant - The variant color, can be classes.
 * @property {Rule} rule - The rule function that determines if a value matches an interval.
 * @param {number} value - The value to be evaluated against the rule function.
 * @returns {boolean} - Returns true if the value matches the rule, otherwise false.
 * @property {string} [label] - The display label used on legends.
 * @property {string} [textClass] - The text class to be applied.
 * @property {string} [badgeLabel] - The badge label to be displayed.
 * @property {string} [key] - The key to access the api's crazy props.
 */

/**
 * @typedef {'learningPerformance' | 'accuracyPerformance' | 'progress' | 'eventLearningPerformance' | 'eventProgress' | 'participation' | 'proficiency' | 'proficiencyWithInProgress' | 'proficiencyWithNotCompleted' | 'percentileNarrativeComplexityWithNotCompleted' | 'percentilePerformance', 'performanceEnum', 'writingPhaseEnum', 'UserStatusEnum', 'evidenceReportFinishedGames', 'guideStatus', 'ReadingFluencyV2StatusEnum', 'ReadingProficiencyEnum'} LegendKeys
 */
export const LEGENDS = {
  learningPerformance,
  accuracyPerformance,
  progress,
  eventLearningPerformance,
  eventProgress,
  participation,
  proficiency,
  proficiencyWithInProgress,
  proficiencyWithNotCompleted,
  percentileNarrativeComplexityWithNotCompleted,
  percentilePerformance,
  performanceEnum,
  writingPhaseEnum,
  UserStatusEnum,
  evidenceReportFinishedGames,
  guideStatus,
  ReadingFluencyV2StatusEnum,
  ReadingProficiencyEnum,
}

/**
 * Returns the variant color based on the given value and legend enum value.
 * @param {number} value - The value to be evaluated.
 * @param {LegendKeys} enumValue - The enum value of the legend.
 * @returns {LegendItem | undefined} - The object with variant color if found, otherwise a default from the selected legend.
 */
export const getVariantByRule = (value = 0, enumValue) => {
  /** @type {Array<LegendItem>} */
  const legend = LEGENDS[enumValue]

  if (!legend) return undefined

  return legend.find(i => i.rule && i.rule(value)) || legend[0]
}
