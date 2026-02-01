/**
 * ESelect - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component ESelect
 * @source educacross-frontoffice\src\components\selects\ESelect.vue
 * @generated 2026-02-01T20:35:35.833171
 * 
 * Props: None
 * Slots: noOptions, allOptionsLabel
 * Emits: input, nextPage, change, close, input:page, clear, closeModal
 */

export default {
  title: 'Educacross V2/ESelect',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ESelect

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- **noOptions**
- **allOptionsLabel**

### Events
- **input**
- **nextPage**
- **change**
- **close**
- **input:page**
- **clear**
- **closeModal**
        `
      }
    }
  }
};

// Estilos inline do componente
const componentStyles = `

:root {
  --primary: #6e63e8;
  --primary-rgb: 110, 99, 232;
  --success: #28c76f;
  --success-rgb: 40, 199, 111;
  --danger: #ea5455;
  --danger-rgb: 234, 84, 85;
  --warning: #ff9f43;
  --warning-rgb: 255, 159, 67;
  --info: #00cfe8;
  --info-rgb: 0, 207, 232;
  --secondary: #6c757d;
  --secondary-rgb: 108, 117, 125;
  --light: #f8f9fa;
  --dark: #343a40;
  --legend-below-basic: #ea5455;
  --legend-basic: #ff9f43;
  --legend-proficient: #28c76f;
  --legend-advanced: #6e63e8;
  --border-color: #dbdade;
  --body-bg: #f8f7fa;
  --card-bg: #ffffff;
  --text-color: #5d596c;
  --heading-color: #5d596c;
}




@function color(inherit) {
  @return var(--#{inherit});
}

inherit: 40px;
inherit: var(--options-count);

.selected-options-text {
  position: absolute;
  top: 0;
  left: 0;

  padding: 10px;

  max-width: calc(100% - 30px);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.selected-option-single {
  max-width: calc(100% - 30px);

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.e-select-container {
  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 30px;

  flex-wrap: nowrap;
}

.icon-container {
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
}

.clear-button {
  border: none;
  background-color: transparent;

  transition: color 0.2s ease-in-out;

  font-size: 1rem;

  &:hover {
    color: inherit;
  }

  cursor: pointer;
}

.clear-button-badge {
  font-size: 0.9rem;
}

.drop-icon {
  transition: transform 0.2s ease-in-out;

  font-size: 1.5rem;

  &.revert-drop-icon {
    transform: rotate(180deg);
  }
}

.options-container {
  visibility: hidden;
  pointer-events: none;

  position: absolute;
  top: calc(100% + 1px);
  left: 0;

  min-width: 100%;
  max-height: calc(38px * 5);
  overflow-y: auto;
  scroll-behavior: smooth;

  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;

  z-index: 3;

  &.opened {
    visibility: visible;
    pointer-events: all;
  }
}

.option-padding-multiple {
  padding: 0 15px 0 10px;
}

.option-padding-single {
  padding: 0 15px 0 1rem;
}

.option {
  cursor: pointer;
  position: relative;
  min-height: 38px;

  display: flex;
  align-items: center;

  border: 1px solid #fff;
  z-index: 4;
  border-radius: 6px;
  margin-top: 1px;
  margin-bottom: 1px;

  &:hover {
    background-color: #eee;
  }

  &:first-of-type {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }

  &:last-of-type {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  &.selected:hover {
    border-width: 1px;
    border-style: solid;
    border-color: color(--e-select-variant);
  }
}

.option-searchable {
  @extend .option;

  margin: 5px 0;
}

.selected-options-badge {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
}

.disabled,
.disabled .option {
  cursor: not-allowed; // Indicates the disabled state
}
`;

// Template base
const baseTemplate = `
<!-- Main container for the custom select component -->
  <div
    ref="refContainer"
    class=""
    style=""
    class="relative cursor-pointer"
  >
    <!-- Dropdown Selector/Trigger Area -->
    <div
      role="combobox"
      :aria-expanded="opened.toString()"
      aria-haspopup="listbox"
      :aria-disabled="disabled ? 'true' : undefined"
      tabindex="0"
      class=""
      class="e-select-container form-control"
    >
      <!-- Slot for Single Selected Option Display (When multiple is false) -->
      <slot
        name="selected-option"
        v-bind="{ ...internalSelectedOptions[0] }"
      >
        <!-- Display Label of the Selected Option -->
        <span class="selected-option-single">
          Sample Text
        </span>
      </slot>

      <!-- Placeholder Display (when no option is selected) -->
      <span class="text-muted">Sample Text</span>
      <span>
        <slot name="noOptions">
          <span>Sem Opções</span>
        </slot>
      </span>

      <!-- Badge Display (when options are selected and multiple is true) -->
      <div
        v-b-tooltip.hover="Texto"
        class="selected-options-badge cursor-pointer mw-100"
      >
        <b-badge variant="" class="mw-100">
          <span class="d-flex align-items-center font-normal mw-100">
            <div>
              <slot name="allOptionsLabel">
                <span>Todas as opções selecionadas</span>
              </slot>
            </div>
            <span class="text-truncate">
              Sample Text
            </span>
            <span>
              <div class="slot-placeholder"></div>
            </span>
            <span
              class="material-symbols-outlined clear-button ml-1 cursor-pointer"
            >
              close
            </span>
          </span>
        </b-badge>
      </div>

      <!-- Icons Container (for clear and drop-down icons) -->
      <div class="" class="icon-container">
        <!-- Clear Selected Option Icon -->

        <!-- Dropdown Icon (with rotation if opened) -->
        <span
          class=""
          class="material-symbols-outlined drop-icon"
        >
          expand_more
        </span>

        <b-spinner class="mr-50" small />
      </div>
    </div>

    <!-- Options List Container -->
    <Transition>
      <ul ref="refUl" role="listbox" class="" class="options-container">
        <!-- Search Input (if searchable is true) -->
        <div class="option-searchable">
          <b-input-group class="input-group-merge">
            <template #prepend>
              <b-input-group-text id="searchQueryIcon" class="d-flex">
                <span class="material-symbols-outlined" style="font-size: 21px"> search </span>
              </b-input-group-text>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


