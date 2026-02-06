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

## Testing & Validation with Playwright

### ⚠️ CRITICAL: Use Playwright for Component Validation

**ALWAYS use Playwright** for the following tasks:

1. **Visual Analysis** - Inspect component rendering and layout
2. **Bug Investigation** - Debug visual issues and interactions
3. **Component Validation** - Verify components work correctly
4. **Regression Testing** - Ensure changes don't break existing components
5. **Interactive Testing** - Test JavaScript functionality (modals, tooltips, dropdowns)

### When to Use Playwright

✅ **MUST use Playwright when:**
- User reports visual bugs
- Creating or modifying stories
- Adding interactive components
- User asks to "check", "verify", "test", or "validate"
- Investigating rendering issues
- Testing responsive behavior
- Debugging JavaScript interactions

❌ **Don't skip Playwright for:**
- "Just check if it works" → Run Playwright test
- "See if the modal opens" → Use Playwright browser
- "Verify the component" → Run visual regression test
- "Debug this issue" → Use Playwright with screenshots

### Playwright Commands

```bash
# Visual regression tests (pixel-perfect)
npx playwright test                    # Run all tests
npx playwright test ComponentName      # Test specific component
npx playwright test --update-snapshots # Update baselines

# Interactive debugging
npx playwright test --debug            # Debug mode with browser
npx playwright test --headed           # See browser during test
npx playwright test --ui               # Interactive UI mode

# Generate reports
npx playwright show-report             # View HTML report
npx playwright test --reporter=html    # Generate HTML report
```

### Playwright Workflow for Validation

```javascript
// 1. Navigate to component story
await page.goto('http://localhost:6006/?path=/story/component-name--default');

// 2. Wait for Storybook to load
await page.waitForSelector('.sb-show-main', { state: 'visible' });
await page.waitForLoadState('networkidle');

// 3. Take screenshot for visual validation
await page.screenshot({ path: 'component-screenshot.png' });

// 4. Test interactions
await page.locator('.btn-primary').click();
await page.waitForSelector('.modal', { state: 'visible' });

// 5. Verify visual regression
await expect(page.locator('.sb-show-main')).toHaveScreenshot();
```

### Browser Tools Integration

Use Playwright's browser tools for analysis:

```javascript
// Capture accessibility snapshot
const snapshot = await page.accessibility.snapshot();

// Get console messages
page.on('console', msg => console.log('Browser log:', msg.text()));

// Capture network requests
page.on('request', request => console.log('Request:', request.url()));

// Take screenshots at different viewports
await page.setViewportSize({ width: 375, height: 667 }); // Mobile
await page.screenshot({ path: 'mobile.png' });
```

Config: `playwright.config.js` - Requires `storybook-static/` built first.

**Note**: Before running Playwright tests, ensure Storybook is built with `npm run build-storybook`

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
---

# 📚 Advanced Guidelines

## Design Tokens Reference

### Vuexy Color System
```css
--bs-primary: #7367f0;
--bs-secondary: #a8aaae;
--bs-success: #28c76f;
--bs-danger: #ea5455;
--bs-warning: #ff9f43;
--bs-info: #00cfe8;
--bs-dark: #4b4b4b;
--bs-light: #f6f6f6;
```

### Spacing Scale
```
0 = 0
1 = 0.25rem (4px)
2 = 0.5rem  (8px)
3 = 1rem    (16px)
4 = 1.5rem  (24px)
5 = 3rem    (48px)
```

### Typography System
```
Font: "Public Sans", -apple-system, "Segoe UI"
Base: 0.9375rem (15px), Line Height: 1.53

h1: 2.25rem   (36px)
h2: 1.875rem  (30px)
h3: 1.5rem    (24px)
h4: 1.125rem  (18px)
h5: 0.9375rem (15px)
h6: 0.8125rem (13px)
```

### Border Radius Scale
```
--bs-border-radius:    0.375rem (6px)
--bs-border-radius-sm: 0.25rem  (4px)
--bs-border-radius-lg: 0.5rem   (8px)
--bs-border-radius-xl: 0.75rem  (12px)
--bs-border-radius-2xl: 1rem    (16px)
```

## Bootstrap 5 Utility Classes

### Flexbox Patterns
```html
<div class="d-flex justify-content-between align-items-center">
<div class="d-flex flex-column gap-2">
<div class="d-flex flex-wrap">
```

### Spacing Utilities
```html
<div class="p-4">        <!-- padding all sides -->
<div class="m-3">        <!-- margin all sides -->
<div class="mt-2 mb-4">  <!-- margin-top, margin-bottom -->
<div class="px-3 py-2">  <!-- padding horizontal/vertical -->
```

### Text Utilities
```html
<div class="text-primary">   <!-- Color -->
<div class="text-center">    <!-- Alignment -->
<div class="fw-bold">        <!-- Font weight -->
<div class="text-uppercase"> <!-- Transform -->
<div class="text-truncate">  <!-- Ellipsis -->
```

## Icon Systems

### Bootstrap Icons (Preferred)
```html
<i class="bi bi-heart"></i>
<i class="bi bi-star-fill"></i>
<i class="bi bi-check-circle"></i>
```

### Font Awesome 6
```html
<i class="fa-solid fa-user"></i>
<i class="fa-regular fa-envelope"></i>
<i class="fa-brands fa-github"></i>
```

### Tabler Icons
```html
<iconify-icon icon="tabler:home"></iconify-icon>
```

## Form Component Patterns

### Input Groups
```html
<div class="input-group">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control">
</div>
```

### Custom Controls
```html
<!-- Checkbox -->
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="check1">
  <label class="form-check-label" for="check1">Label</label>
</div>

<!-- Switch -->
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="switch1">
  <label class="form-check-label" for="switch1">Toggle</label>
</div>
```

## Vendor Library Patterns

### Flatpickr Integration
```javascript
loaders: [async () => {
  if (!window.flatpickr) {
    return new Promise((resolve) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/vuexy/vendors/libs/flatpickr/flatpickr.css';
      document.head.appendChild(link);
      
      const script = document.createElement('script');
      script.src = '/vuexy/vendors/libs/flatpickr/flatpickr.js';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }
}],
render: () => {
  setTimeout(() => {
    if (window.flatpickr) {
      flatpickr('.datepicker', { dateFormat: 'Y-m-d' });
    }
  }, 100);
  return `<input type="text" class="form-control datepicker">`;
}
```

### Select2 with jQuery
```javascript
loaders: [async () => {
  // 1. Load jQuery first
  if (!window.jQuery) {
    await new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = '/vuexy/vendors/libs/jquery/jquery.js';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }
  
  // 2. Then load Select2
  if (!window.jQuery.fn.select2) {
    await new Promise((resolve) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/vuexy/vendors/libs/select2/select2.css';
      document.head.appendChild(link);
      
      const script = document.createElement('script');
      script.src = '/vuexy/vendors/libs/select2/select2.js';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }
}]
```

## Common Pitfalls

1. **❌ External images** → ✅ Use SVG placeholders
2. **❌ Modify vuexy assets** → ✅ They are template files
3. **❌ Forget setTimeout** → ✅ Always use 100ms delay
4. **❌ Inline styles** → ✅ Use utility classes
5. **❌ Story dependencies** → ✅ Each story self-contained
6. **❌ Vue components** → ✅ Pure HTML only
7. **❌ Hardcoded values** → ✅ Use args in render
8. **❌ Wrong import paths** → ✅ Count folder levels correctly

---

# 🔍 Debug & Troubleshooting

## Diagnostic Checklist

### Quick Health Check
```bash
# 1. Storybook running?
npm run storybook  # Port 6006

# 2. Build errors?
# Check terminal output

# 3. Browser errors?
# F12 → Console
```

## Common Errors & Solutions

### Error: "Cannot find module"
**Causa**: Import path incorreto  
**Solução**:
```javascript
// ❌ Wrong
import { createOverviewGrid } from '../_helpers/snippets';

// ✅ Correct - count folder levels
// src/stories/atoms/actions/ → ../../_helpers/
// src/stories/educacross-components-v2/ → ../_helpers/
import { createOverviewGrid } from '../../_helpers/snippets';
```

### Error: "Unexpected token" 
**Causa**: Template string syntax error  
**Solução**:
```javascript
// ❌ Wrong - broken string
render: () => `<div class="card">
  <div class="card-body">Content</div>
</div>`;

// ✅ Correct - proper template literal
render: () => `
  <div class="card">
    <div class="card-body">Content</div>
  </div>
`;
```

### Error: "bootstrap is not defined"
**Causa**: Bootstrap JS not loaded  
**Solução**:
```javascript
// ✅ Add loader + setTimeout
loaders: [
  async () => {
    if (!window.bootstrap) {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = '/vuexy/js/bootstrap.js';
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    }
  }
],
render: () => {
  setTimeout(() => {
    if (window.bootstrap?.Modal) {
      new bootstrap.Modal(document.querySelector('#modal'));
    }
  }, 100);
  return `...`;
}
```

### Error: CSS not loading (404)
**Causa**: Static directory misconfigured  
**Solução**:
```bash
# Check file exists
ls packages/vuexy_theme/public/vuexy/css/core.css

# Check .storybook/main.js
staticDirs: [
  '../packages/vuexy_theme/public',
  { from: '../.storybook/public', to: '/' }
]
```

### Story doesn't update with controls
**Causa**: Render not using args  
**Solução**:
```javascript
// ❌ Wrong - hardcoded
render: () => `<button class="btn btn-primary">Button</button>`

// ✅ Correct - uses args
render: (args) => `<button class="btn btn-${args.variant}">${args.label}</button>`
```

### Story doesn't appear in Storybook
**Checklist**:
```bash
# 1. File ends with .stories.js?
# 2. Has export default?
export default { title: '...' }
# 3. Has story exports?
export const Default = { ... }
# 4. Title has no special chars?
# 5. Restart Storybook
```

## Vendor Library Issues

### Flatpickr not initializing
```javascript
// ✅ Load CSS + JS, then init with delay
loaders: [async () => {
  if (!window.flatpickr) {
    return new Promise((resolve) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/vuexy/vendors/libs/flatpickr/flatpickr.css';
      document.head.appendChild(link);
      
      const script = document.createElement('script');
      script.src = '/vuexy/vendors/libs/flatpickr/flatpickr.js';
      script.onload = resolve;
      document.head.appendChild(script);
    });
  }
}],
render: () => {
  setTimeout(() => {
    if (window.flatpickr) {
      flatpickr('.datepicker', { dateFormat: 'Y-m-d' });
    }
  }, 100);
  return `<input class="form-control datepicker">`;
}
```

## CSS Issues

### Classes not working
```html
<!-- ❌ Wrong - typo -->
<button class="btn btn-prmary">

<!-- ✅ Correct -->
<button class="btn btn-primary">

<!-- Available: primary, secondary, success, danger, warning, info, dark, light -->
```

### Wrong spacing values
```html
<!-- ❌ Wrong - doesn't exist -->
<div class="p-10 m-20">

<!-- ✅ Correct - use 0-5 scale -->
<div class="p-4 m-3">
```

### Icons not showing
```html
<!-- ❌ Problem -->
<i class="bi bi-heart"></i>  <!-- Icon doesn't render -->

<!-- ✅ Check preview.js imports -->
import 'bootstrap-icons/font/bootstrap-icons.css';
```

## Playwright Test Issues

### Element not found
```javascript
// ❌ Wrong - no wait
await page.locator('.btn').click();

// ✅ Correct - wait for element
await page.waitForSelector('.btn', { state: 'visible' });
await page.locator('.btn').click();
```

### Flaky tests
```javascript
// ✅ Add proper waits
await page.goto('...');
await page.waitForLoadState('networkidle');
await page.waitForSelector('.sb-show-main');
await page.waitForTimeout(500); // Buffer
```

### Update snapshots
```bash
npx playwright test --update-snapshots
npx playwright show-report
```

## Debug Strategies

### Console debugging
```javascript
render: () => {
  console.log('1. Render started');
  
  setTimeout(() => {
    console.log('2. setTimeout fired');
    console.log('3. Bootstrap loaded?', !!window.bootstrap);
    
    if (window.bootstrap?.Modal) {
      console.log('4. Modal available');
    } else {
      console.error('❌ Bootstrap not loaded');
    }
  }, 100);
  
  return `...`;
}
```

### Browser DevTools
```
1. F12 → Console (errors)
2. F12 → Network (404s, failed loads)
3. F12 → Elements (inspect HTML/CSS)
4. Check computed styles
```

### Clean slate
```bash
# Nuclear option
Stop-Process -Name "node" -Force
rm -rf node_modules .storybook/cache storybook-static
npm install
npm run storybook
```

## Critical Errors

### Port 6006 in use
```bash
# Windows
Stop-Process -Name "node" -Force
npm run storybook

# Alternative - different port
npm run storybook -- --port 6007
```

### Module build failed
**Check**:
- Template strings closed properly
- All quotes balanced
- Commas in objects correct
- Parentheses/braces balanced

## Troubleshooting Quick Reference

| Symptom | Likely Cause | Quick Fix |
|---------|-------------|-----------|
| Story missing | Export issue | Check `export default` + `export const` |
| JS not working | Missing loader | Add loader + setTimeout(100) |
| CSS not applied | Class typo | Verify class name |
| Icons missing | CSS not loaded | Check preview.js imports |
| 404 errors | Wrong path | Check staticDirs in main.js |
| Modal won't open | Bootstrap missing | Add Bootstrap loader |
| Controls don't work | Not using args | Use args in render function |
| Test fails | Timing | Add waitForSelector |

## Golden Rules

1. **ALWAYS** use `setTimeout(100)` for JS init
2. **ALWAYS** check library exists: `window.bootstrap?.Modal`
3. **ALWAYS** use loaders for external JS
4. **ALWAYS** count import path levels correctly
5. **ALWAYS** check browser console for errors
6. **ALWAYS** use template literals for multi-line HTML
7. **ALWAYS** use args in render for controls
8. **ALWAYS** verify CSS class spelling
9. **ALWAYS** use Playwright to validate components before marking as complete
10. **ALWAYS** run Playwright tests when debugging visual issues

## Playwright-First Debugging

When investigating issues, follow this order:

### 1. Visual Inspection (Playwright)
```bash
# Start Storybook
npm run storybook

# In another terminal, run Playwright with UI
npx playwright test --ui

# Or headed mode to see browser
npx playwright test --headed --debug
```

### 2. Take Screenshots for Analysis
```javascript
// In Playwright test or script
await page.goto('http://localhost:6006/?path=/story/...');
await page.screenshot({ path: 'debug-screenshot.png', fullPage: true });
```

### 3. Inspect Element States
```javascript
// Check if element exists
const exists = await page.locator('.component').count() > 0;

// Get computed styles
const bgColor = await page.locator('.btn').evaluate(
  el => window.getComputedStyle(el).backgroundColor
);

// Check class list
const classes = await page.locator('.btn').getAttribute('class');
```

### 4. Monitor JavaScript Errors
```javascript
// Capture console errors
const errors = [];
page.on('console', msg => {
  if (msg.type() === 'error') errors.push(msg.text());
});

// After test
console.log('Errors found:', errors);
```

### 5. Validate Interactions
```javascript
// Test modal opening
await page.locator('[data-bs-toggle="modal"]').click();
await page.waitForSelector('.modal.show', { state: 'visible', timeout: 5000 });

// Verify modal is visible
const isVisible = await page.locator('.modal.show').isVisible();
```

## When to Ask for Help

Include:
1. **What you expected**: "Modal should open"
2. **What happened**: "Nothing on click"
3. **Error messages**: Console + terminal
4. **Code**: Story + loaders + render
5. **What you tried**: "Added loader, checked path, restarted"

---

# 📖 Documentation Index (RAG Reference)

## Project Documentation Structure

When you need specific information, use semantic_search or grep_search to find details in these docs:

### Component Development
- **`agent_helpers/tarefas.md`** - Component status, priorities, backlog (111 components)
- **`agent_helpers/component_backlog.md`** - Detailed component tracking
- **`agent_helpers/catalog_progress.md`** - Cataloging progress metrics

### Patterns & Guidelines
- **`agent_helpers/LOADER_PATTERNS.md`** - Complete vendor library loader patterns (Bootstrap, Flatpickr, Select2, etc.)
- **`agent_helpers/TEMPLATE_COMPONENT.stories.js`** - Story template with all best practices
- **`agent_helpers/DOC_TEMPLATE_GUIDE.md`** - Documentation writing guidelines
- **`agent_helpers/COMO_ADICIONAR_TEMPLATE.md`** - Step-by-step component addition guide

### Testing & Quality
- **`agent_helpers/TESTING_GUIDE.md`** - Playwright visual regression testing guide
- **`agent_helpers/validacao.md`** - Component validation checklist
- **`agent_helpers/INTERATIVIDADE_AUDIT.md`** - Interactive components audit
- **`agent_helpers/VIOLACOES_REAIS.md`** - Known issues and violations

### Project History
- **`agent_helpers/PROJETO_CONCLUIDO.md`** - Project completion summary
- **`agent_helpers/LESSONS_LEARNED.md`** - Lessons learned during development
- **`agent_helpers/decisoes.md`** - Architectural decisions log
- **`agent_helpers/FASE2_ORGANISMS_CONCLUIDA.md`** - Phase 2 completion report

### Integration & Setup
- **`agent_helpers/INTEGRACAO_VUEXY.md`** - Vuexy template integration guide
- **`agent_helpers/QUICK_START.md`** - Quick start for new contributors
- **`agent_helpers/README.md`** - Agent helpers overview
- **`agent_helpers/PIPELINE_RECONSTRUCAO.md`** - Reconstruction pipeline

### Reference
- **`agent_helpers/vuexy_pages_index.md`** - Index of all Vuexy template pages
- **`agent_helpers/SUBSTITUICOES_IMAGENS.md`** - Image replacement strategies
- **`agent_helpers/EXEMPLO_VISUAL.md`** - Visual examples reference

## How to Use Documentation (RAG Workflow)

### When Adding New Component
1. Check **`tarefas.md`** for priority and status
2. Follow **`TEMPLATE_COMPONENT.stories.js`** pattern
3. If interactive, use **`LOADER_PATTERNS.md`** for loaders
4. Validate with **`validacao.md`** checklist

### When Fixing Bugs
1. Check **`VIOLACOES_REAIS.md`** for known issues
2. Use debug section above (lines 200-400)
3. Reference **`TESTING_GUIDE.md`** for test patterns

### When Documenting
1. Follow **`DOC_TEMPLATE_GUIDE.md`** format
2. Update **`catalog_progress.md`** if needed
3. Log decisions in **`decisoes.md`**

### When Integrating Vuexy Assets
1. Use **`INTEGRACAO_VUEXY.md`** process
2. Check **`vuexy_pages_index.md`** for available pages
3. Follow **`SUBSTITUICOES_IMAGENS.md`** for images

## Search Commands for AI Assistant

To access specific documentation:

```bash
# Find component status
semantic_search "component status ProgressBar MediaCard"

# Find loader patterns
grep_search "flatpickr loader" --includePattern "agent_helpers/**"

# Find testing examples
semantic_search "playwright visual regression test"

# Find known issues
grep_search "bug|erro|problem" --includePattern "agent_helpers/VIOLACOES_REAIS.md"
```

## Documentation Maintenance

- Keep **`tarefas.md`** updated as components are completed
- Add new patterns to **`LOADER_PATTERNS.md`** when discovered
- Update **`validacao.md`** with new validation rules
- Log important decisions in **`decisoes.md`**