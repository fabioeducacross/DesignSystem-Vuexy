# DesignSystem-Vuexy - AI Coding Instructions

## Project Overview

Design System built with **Storybook 8.6.15** using **HTML-Vite** renderer, based on the Vuexy v10.9.0 admin template. Contains 220+ component stories following Atomic Design (Atoms → Molecules → Organisms → Templates).

## ⚠️ CRITICAL: Dual Component Structure

**ALWAYS work in the correct category:**

### 1. Vuexy Generic Components (Reference Only)
- **Location**: `src/stories/atoms/`, `molecules/`, `organisms/`, `templates/`, `pages/`
- **Purpose**: Showcase Vuexy template capabilities (buttons, cards, modals, invoices, etc.)
- **Usage**: **NOT used in educacross-frontoffice** - generic template examples only
- **When to use**: Never for educacross features - only for Vuexy template documentation

### 2. Educacross Real Components (⭐ WORK HERE)
- **Location**: `src/stories/educacross-components-v2/`
- **Count**: **111 components** from educacross-frontoffice
- **Purpose**: Document actual components used in production Educacross app
- **Examples**: ProgressBar, MediaCard, ListTable, MissionDetails, QuestionAlternative
- **When to use**: **ALWAYS** when working on Educacross features

**Rule**: If the component exists in `educacross-frontoffice/src/components/`, it belongs in `educacross-components-v2/`, NOT in Atomic Design folders.

## Architecture

### Key Directories

- **`.storybook/`** - Storybook config (`main.js`, `preview.js`, `preview-head.html`)
- **`packages/vuexy_theme/public/vuexy/`** - Vuexy assets (CSS, fonts, JS, vendors) - served as static at `/vuexy/`
- **`src/stories/`** - Component stories organized by Atomic Design:
  - `atoms/{actions,data-display,feedback,forms,navigation}/`
  - `molecules/{actions,content,data-display,feedback,forms,navigation,overlays,surfaces}/`
  - `organisms/{apps,charts,commerce,content,data-display,feedback,forms,navigation,productivity}/`
  - `templates/`, `pages/`, `foundations/`
- **`src/stories/_helpers/`** - Shared utilities (`interactive.js`, `snippets.js`, placeholders)
- **`agent_helpers/`** - Development docs and task tracking
- **`educacross-frontoffice/`** - Companion Vue 2.7 app (separate project, see its own `AGENTS.md`)

### Storybook Configuration

```javascript
// .storybook/main.js - Key settings
staticDirs: ['../packages/vuexy_theme/public', { from: '../.storybook/public', to: '/' }]
framework: '@storybook/html-vite'
```

Assets served at `/vuexy/css/`, `/vuexy/js/`, `/vuexy/vendors/`, `/vuexy/fonts/`.

## Development Commands

```bash
npm run storybook         # Start dev server at http://localhost:6006
npm run build-storybook   # Build static site to storybook-static/
npm run serve-storybook   # Serve built static site
npm run integrate-vuexy <path>  # Integrate Vuexy template assets
```

## Story Pattern

Stories use **pure HTML rendering** with Storybook controls:

```javascript
// src/stories/atoms/actions/Button.stories.js
import { createOverviewGrid, generateSnippetDocs } from '../../_helpers/snippets';

export default {
  title: 'Atoms/Actions/Button',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'success', ...] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    // ...
  },
};

export const Default = {
  args: { variant: 'primary', label: 'Button' },
  render: (args) => `<button class="btn btn-${args.variant}">${args.label}</button>`,
};
```

## Interactive Stories Pattern

For components requiring Bootstrap JS or vendor libraries, use the **loader pattern**:

```javascript
// src/stories/molecules/overlays/Tooltip.stories.js
export const Interactive = {
  loaders: [
    async () => {
      if (typeof window !== 'undefined' && !window.bootstrap) {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = '/vuexy/js/bootstrap.js';
          script.onload = () => resolve({ bootstrapLoaded: true });
          document.head.appendChild(script);
        });
      }
      return {};
    }
  ],
  render: () => {
    setTimeout(() => {
      if (window.bootstrap?.Tooltip) {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
          new bootstrap.Tooltip(el);
        });
      }
    }, 100);
    return `<button data-bs-toggle="tooltip" title="Tooltip">Hover</button>`;
  }
};
```

**Key libraries**: Bootstrap JS, Flatpickr, FullCalendar, Select2, SortableJS, Quill, ApexCharts.

See [agent_helpers/LOADER_PATTERNS.md](agent_helpers/LOADER_PATTERNS.md) for complete patterns.

## Helper Utilities

### `src/stories/_helpers/interactive.js`
- `createState(initialValue)` - React-like state for HTML stories
- `createClickHandler(element, callback)` - Safe click handler with disabled check
- `addKeyboardSupport(element, { onEnter, onEscape })` - Accessibility helpers
- `createUniqueId(prefix)` - Generate unique IDs for components

### `src/stories/_helpers/snippets.js`
- `createOverviewGrid(items)` - Grid layout for variant overview
- `generateSnippetDocs(component)` - Code snippets in HTML/React/Vue formats

## CSS & Assets

Core CSS loaded globally in `preview.js`:
```javascript
const cssFiles = ['/vuexy/css/core.css'];
```

Icon libraries available:
- Bootstrap Icons (recommended): `<i class="bi bi-*"></i>`
- Font Awesome 6: `<i class="fa-solid fa-*"></i>`
- Tabler Icons: iconify integration

## Testing

Playwright for visual regression (pixel-perfect):
```bash
npx playwright test                    # Run all tests
npx playwright test --update-snapshots # Update baselines
```

Config: `playwright.config.js` - Requires `storybook-static/` built first.

## Conventions

- **Story file naming**: `ComponentName.stories.js` (PascalCase)
- **Story hierarchy**: 
  - Vuexy generic: `title: 'Atoms/Actions/Button'` (follow Atomic Design)
  - Educacross real: `title: 'Educacross Components V2/Category/ComponentName'`
- **Story naming**: PascalCase exports (`Default`, `AllVariants`, `Interactive`)
- **CSS classes**: Use Vuexy classes directly (`btn`, `btn-primary`, `card`, `alert`)
- **No external images**: Use SVG placeholders from `_helpers/` or `/vuexy/images/`
- **Component categorization**: 
  - If exists in `educacross-frontoffice/src/components/` → `educacross-components-v2/`
  - If Vuexy template example → Atomic Design folders

## Important Notes

1. **ALWAYS verify component location** - educacross-frontoffice components go to `educacross-components-v2/`, NOT Atomic Design folders
2. **Do not modify** files in `packages/vuexy_theme/public/vuexy/` - these are Vuexy template assets
3. **Use Bootstrap 5 patterns** for interactive components (data-bs-* attributes)
4. **Always include `setTimeout(100)`** when initializing JS libraries after render
5. Check [agent_helpers/tarefas.md](agent_helpers/tarefas.md) for component status and priorities
6. **Before creating new story**: Search `educacross-frontoffice/src/components/` to verify if component exists there
