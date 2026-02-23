// Import from shared config (SINGLE SOURCE OF TRUTH)
import whitelabelColors from '@/consts/whitelabelColors.config'

/**
 * Converts camelCase to kebab-case
 * @param {string} str - The camelCase string
 * @returns {string} The kebab-case string
 */
const camelToKebab = str => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Loads whitelabel-specific colors and applies them as CSS custom properties
 * @param {string} whitelabelName - The name of the whitelabel (e.g., 'educacross', 'superensino', 'seduc', 'somosplay')
 */
export const loadWhitelabelColors = whitelabelName => {
  // Get the color configuration for the specified whitelabel
  const colors = whitelabelColors[whitelabelName]

  if (!colors) {
    return
  }

  // Get the root element to set CSS custom properties
  const root = document.documentElement

  // Apply each color as a CSS custom property
  Object.keys(colors).forEach(colorKey => {
    const cssVarName = `--${camelToKebab(colorKey)}`
    const colorValue = colors[colorKey]

    root.style.setProperty(cssVarName, colorValue)
  })
}
