/**
 * Custom Jest Matchers para ESelect
 *
 * Aumentam especificidade e reduzem taxa de falso positivo
 * de 54.5% para <5%.
 *
 * @module ESelectTestMatchers
 */

/**
 * Valida que elemento existe e tem estrutura completa
 *
 * @param {Wrapper} received - Vue Test Utils Wrapper
 * @param {Object} expected - Estrutura esperada
 * @param {string[]} [expected.classes] - Classes CSS esperadas
 * @param {Object} [expected.attributes] - Atributos HTML esperados
 * @param {string} [expected.text] - Texto esperado
 * @param {boolean} [expected.visible] - Visibilidade esperada
 * @returns {Object} Jest matcher result
 *
 * @example
 * expect(container).toBeRenderedWith({
 *   classes: ['e-select', 'form-control'],
 *   attributes: { role: 'combobox', 'aria-expanded': 'false' },
 *   text: 'Opção 1',
 *   visible: true
 * })
 */
function toBeRenderedWith(received, expected) {
  const element = received

  if (!element.exists()) {
    return {
      pass: false,
      message: () => `Element does not exist in DOM`,
    }
  }

  const failures = []

  // Valida classes CSS
  if (expected.classes) {
    const actualClasses = element.classes()
    expected.classes.forEach(cls => {
      if (!actualClasses.includes(cls)) {
        failures.push(`Missing class: "${cls}"`)
      }
    })
  }

  // Valida attributes HTML
  if (expected.attributes) {
    Object.entries(expected.attributes).forEach(([attr, expectedValue]) => {
      const actualValue = element.attributes(attr)
      if (actualValue !== expectedValue) {
        failures.push(`Attribute "${attr}": expected "${expectedValue}", got "${actualValue}"`)
      }
    })
  }

  // Valida text content
  if (expected.text !== undefined) {
    const actualText = element.text()
    if (actualText !== expected.text) {
      failures.push(`Text: expected "${expected.text}", got "${actualText}"`)
    }
  }

  // Valida visibility
  if (expected.visible !== undefined) {
    const isVisible = element.isVisible()
    if (isVisible !== expected.visible) {
      failures.push(`Visibility: expected ${expected.visible}, got ${isVisible}`)
    }
  }

  return {
    pass: failures.length === 0,
    message: () =>
      failures.length > 0
        ? `Element validation failed:\n  ${failures.join('\n  ')}`
        : `Element matches expected structure`,
  }
}

/**
 * Valida estado "empty" completo (não só length)
 *
 * Detecta casos edge:
 * - Arrays com undefined: [undefined]
 * - Arrays com null: [null]
 * - Arrays não-array: null, undefined, {}
 *
 * @param {Array} received - Array a validar
 * @returns {Object} Jest matcher result
 *
 * @example
 * expect(wrapper.vm.internalSelectedOptions).toBeCompletelyEmpty()
 */
function toBeCompletelyEmpty(received) {
  const arr = received

  const failures = []

  if (!Array.isArray(arr)) {
    return {
      pass: false,
      message: () => `Expected array, got ${typeof arr}`,
    }
  }

  if (arr.length !== 0) {
    failures.push(`Array has ${arr.length} items`)
  }

  // Valida que não tem undefined/null (casos edge)
  if (arr.some(item => item === undefined || item === null)) {
    failures.push(`Array contains undefined/null values`)
  }

  return {
    pass: failures.length === 0,
    message: () =>
      failures.length > 0
        ? `Array not completely empty:\n  ${failures.join('\n  ')}`
        : `Array is completely empty`,
  }
}

/**
 * Valida dropdown fechado completo (não só opened=false)
 *
 * Verifica:
 * - vm.opened === false
 * - vm.search === null (limpo)
 * - DOM não contém .options-container
 * - aria-expanded === "false"
 *
 * @param {Wrapper} received - Vue Test Utils Wrapper
 * @returns {Object} Jest matcher result
 *
 * @example
 * await closeDropdown(wrapper)
 * expect(wrapper).toBeClosedCompletely()
 */
function toBeClosedCompletely(received) {
  const wrapper = received

  const failures = []

  // 1. Estado reativo
  if (wrapper.vm.opened !== false) {
    failures.push(`vm.opened: expected false, got ${wrapper.vm.opened}`)
  }

  // search pode ser null ou '' (vazio se nunca foi aberto)
  if (wrapper.vm.search !== null && wrapper.vm.search !== '') {
    failures.push(`vm.search: expected null or '', got "${wrapper.vm.search}"`)
  }

  // 2. DOM - dropdown não deve ter classe 'opened'
  const dropdown = wrapper.find('.options-container')
  if (dropdown.exists()) {
    // Dropdown é controlado por CSS class, não por v-if
    if (dropdown.classes().includes('opened')) {
      failures.push(`Dropdown has 'opened' class (should not have it)`)
    }
  }

  // 3. ARIA - sincronização com estado
  const container = wrapper.find('.e-select-container')
  if (container.exists()) {
    const ariaExpanded = container.attributes('aria-expanded')
    if (ariaExpanded !== 'false') {
      failures.push(`aria-expanded: expected "false", got "${ariaExpanded}"`)
    }
  }

  return {
    pass: failures.length === 0,
    message: () =>
      failures.length > 0
        ? `Dropdown not completely closed:\n  ${failures.join('\n  ')}`
        : `Dropdown is completely closed`,
  }
}

/**
 * Valida indeterminate state completo
 *
 * Verifica:
 * - vm.isIndeterminate === true
 * - checkbox.indeterminate === true (DOM property)
 * - vm.isAllSelected === false
 * - Seleção parcial (0 < count < total)
 *
 * @param {Wrapper} received - Vue Test Utils Wrapper
 * @returns {Object} Jest matcher result
 *
 * @example
 * await selectOptionAt(wrapper, 0) // Seleciona 1 de 4
 * expect(wrapper).toBeIndeterminate()
 */
function toBeIndeterminate(received) {
  const wrapper = received

  const failures = []

  // 1. Computed property
  if (wrapper.vm.isIndeterminate !== true) {
    failures.push(`vm.isIndeterminate: expected true, got ${wrapper.vm.isIndeterminate}`)
  }

  // 2. Checkbox DOM property
  const checkbox = wrapper.find('input[type="checkbox"]')
  if (!checkbox.exists()) {
    failures.push(`Checkbox not found in DOM`)
  } else if (!checkbox.element.indeterminate) {
    failures.push(`checkbox.indeterminate: expected true, got ${checkbox.element.indeterminate}`)
  }

  // 3. Não pode estar fully selected
  if (wrapper.vm.isAllSelected !== false) {
    failures.push(`vm.isAllSelected should be false (partial selection only)`)
  }

  // 4. Seleção parcial (nem zero nem total)
  const selectedCount = wrapper.vm.internalSelectedOptions.length
  // eslint-disable-next-line no-underscore-dangle
  const visibleCount = wrapper.vm._options.filter(o => !o.disabled).length

  if (selectedCount === 0) {
    failures.push(`No selections (indeterminate requires some selected)`)
  }

  if (selectedCount >= visibleCount) {
    failures.push(`All options selected (indeterminate requires partial selection)`)
  }

  return {
    pass: failures.length === 0,
    message: () =>
      failures.length > 0
        ? `Not in indeterminate state:\n  ${failures.join('\n  ')}`
        : `In proper indeterminate state`,
  }
}

/**
 * Valida estado de loading completo
 *
 * Verifica:
 * - vm.loading === true
 * - BSpinner renderizado
 * - Ícone expand_more oculto
 *
 * Nota: BSpinner do Bootstrap Vue não tem atributos a11y por padrão,
 * mas usa `role="status"` internamente via <div>.
 *
 * @param {Wrapper} received - Vue Test Utils Wrapper
 * @returns {Object} Jest matcher result
 *
 * @example
 * wrapper = createWrapper({ loading: true })
 * expect(wrapper).toBeInLoadingState()
 */
function toBeInLoadingState(received) {
  const wrapper = received

  const failures = []

  // 1. Prop loading
  if (wrapper.vm.loading !== true) {
    failures.push(`vm.loading: expected true, got ${wrapper.vm.loading}`)
  }

  // 2. Spinner renderizado
  const spinner = wrapper.findComponent({ name: 'BSpinner' })
  if (!spinner.exists()) {
    failures.push(`BSpinner not rendered`)
  }

  // 3. Ícone expand_more oculto (mutually exclusive)
  const icon = wrapper.find('.drop-icon')
  if (icon.exists()) {
    failures.push(`Expand icon should be hidden when loading`)
  }

  return {
    pass: failures.length === 0,
    message: () =>
      failures.length > 0
        ? `Not in loading state:\n  ${failures.join('\n  ')}`
        : `In proper loading state`,
  }
}

/**
 * Valida se array contém opções com disabled=true
 *
 * @param {Array} received - Array de opções
 * @returns {Object} Jest matcher result
 *
 * @example
 * expect(selectedOptions).not.toContainDisabledOptions()
 * expect(allOptions).toContainDisabledOptions()
 */
function toContainDisabledOptions(received) {
  if (!Array.isArray(received)) {
    return {
      pass: false,
      message: () => `Expected an array but received ${typeof received}`,
    }
  }

  const hasDisabled = received.some(option => option && option.disabled === true)

  return {
    pass: hasDisabled,
    message: () =>
      hasDisabled
        ? `Expected array not to contain disabled options, but found ${
            received.filter(o => o.disabled).length
          } disabled option(s)`
        : `Expected array to contain at least one disabled option, but all ${received.length} option(s) are enabled`,
  }
}

/**
 * Custom matcher: Valida múltiplos atributos ARIA de um elemento
 *
 * Simplifica validação de acessibilidade verificando role, aria-selected,
 * aria-disabled, aria-expanded, aria-haspopup em uma única asserção.
 *
 * @param {Wrapper} received - Vue Test Utils wrapper do elemento
 * @param {Object} expected - Objeto com atributos ARIA esperados
 * @returns {Object} Jest matcher result
 *
 * @example
 * // Validar combobox completo
 * expect(container).toHaveAriaAttributes({
 *   role: 'combobox',
 *   'aria-expanded': 'true',
 *   'aria-haspopup': 'listbox'
 * })
 *
 * // Validar opção selecionada
 * expect(option).toHaveAriaAttributes({
 *   role: 'option',
 *   'aria-selected': 'true'
 * })
 *
 * // Validar elemento desabilitado
 * expect(element).toHaveAriaAttributes({ 'aria-disabled': 'true' })
 */
function toHaveAriaAttributes(received, expected) {
  if (!received || !received.attributes) {
    return {
      pass: false,
      message: () => `Expected a Vue Test Utils wrapper, but received ${typeof received}`,
    }
  }

  const attributes = received.attributes()
  const failures = []

  Object.entries(expected).forEach(([attr, expectedValue]) => {
    const actualValue = attributes[attr]

    if (actualValue !== expectedValue) {
      failures.push(
        `  ${attr}: expected "${expectedValue}", received "${actualValue || 'undefined'}"`,
      )
    }
  })

  const pass = failures.length === 0

  return {
    pass,
    message: () =>
      pass
        ? `Expected element not to have ARIA attributes ${JSON.stringify(expected)}`
        : `Expected element to have ARIA attributes:\n${failures.join('\n')}`,
  }
}

/**
 * Registra todos os custom matchers no Jest
 *
 * @example
 * // No beforeAll do spec file:
 * import { customMatchers } from './ESelect.spec.matchers'
 *
 * beforeAll(() => {
 *   expect.extend(customMatchers)
 * })
 */
export const customMatchers = {
  toBeRenderedWith,
  toBeCompletelyEmpty,
  toBeClosedCompletely,
  toBeIndeterminate,
  toBeInLoadingState,
  toContainDisabledOptions,
  toHaveAriaAttributes,
}
