# Bootstrap 4 to Bootstrap 5 Migration Guide

**Date**: 2026-02-24
**Issue**: #11 - CSS Bridge Epic
**Purpose**: Guide for migrating stories from Bootstrap 4 to Bootstrap 5 classes

---

## Quick Reference: Class Replacements

### ⚠️ Automatic Support via bs4-compatibility.css

The `bs4-compatibility.css` file provides **backward compatibility** for most BS4 classes. This means you can use BS4 class names and they will work automatically.

**Files affected**: ALL stories can use BS4 or BS5 classes interchangeably.

---

## Category 1: Spacing Utilities (✅ Auto-supported)

### Margin Left/Right → Start/End

| Bootstrap 4 | Bootstrap 5 | Status |
|-------------|-------------|--------|
| `.ml-{0-5}` | `.ms-{0-5}` | ✅ Both work |
| `.mr-{0-5}` | `.me-{0-5}` | ✅ Both work |
| `.ml-auto` | `.ms-auto` | ✅ Both work |
| `.mr-auto` | `.me-auto` | ✅ Both work |

### Padding Left/Right → Start/End

| Bootstrap 4 | Bootstrap 5 | Status |
|-------------|-------------|--------|
| `.pl-{0-5}` | `.ps-{0-5}` | ✅ Both work |
| `.pr-{0-5}` | `.pe-{0-5}` | ✅ Both work |

### Examples:

```html
<!-- BS4 syntax (still works) -->
<div class="mr-3 ml-2 pr-4 pl-1">Content</div>

<!-- BS5 syntax (preferred) -->
<div class="me-3 ms-2 pe-4 ps-1">Content</div>

<!-- Mixed (both work) -->
<div class="mr-3 ms-2 pr-4 ps-1">Content</div>
```

**Recommendation**: Use BS5 syntax (me-*, ms-*, pe-*, ps-*) for new components, but BS4 classes continue to work.

---

## Category 2: Text Utilities (✅ Auto-supported)

### Text Alignment

| Bootstrap 4 | Bootstrap 5 | Status |
|-------------|-------------|--------|
| `.text-left` | `.text-start` | ✅ Both work |
| `.text-right` | `.text-end` | ✅ Both work |
| `.text-center` | `.text-center` | ✅ Unchanged |

### Font Weight

| Bootstrap 4 | Bootstrap 5 | Status |
|-------------|-------------|--------|
| `.font-weight-bold` | `.fw-bold` | ✅ Both work |
| `.font-weight-bolder` | `.fw-bolder` | ✅ Both work |
| `.font-weight-semibold` | `.fw-semibold` | ✅ Both work |
| `.font-weight-normal` | `.fw-normal` | ✅ Both work |
| `.font-weight-light` | `.fw-light` | ✅ Both work |
| `.font-weight-lighter` | `.fw-lighter` | ✅ Both work |

### Font Style

| Bootstrap 4 | Bootstrap 5 | Status |
|-------------|-------------|--------|
| `.font-italic` | `.fst-italic` | ⚠️ Only BS4 supported |

---

## Category 3: Float Utilities (✅ Auto-supported)

| Bootstrap 4 | Bootstrap 5 | Status |
|-------------|-------------|--------|
| `.float-left` | `.float-start` | ✅ Both work |
| `.float-right` | `.float-end` | ✅ Both work |
| `.float-none` | `.float-none` | ✅ Unchanged |

---

## Category 4: Form Controls (✅ Auto-supported)

### Select Dropdowns

| Bootstrap 4 | Bootstrap 5 | Status |
|-------------|-------------|--------|
| `.custom-select` | `.form-select` | ✅ Both work |
| `.custom-select-sm` | `.form-select-sm` | ✅ Both work |
| `.custom-select-lg` | `.form-select-lg` | ✅ Both work |

### Checkboxes & Radios

| Bootstrap 4 | Bootstrap 5 | Status |
|-------------|-------------|--------|
| `.custom-control` | `.form-check` | ✅ Both work |
| `.custom-control-input` | `.form-check-input` | ⚠️ Requires HTML changes |
| `.custom-control-label` | `.form-check-label` | ⚠️ Requires HTML changes |
| `.custom-checkbox` | `.form-check` | ✅ Both work |
| `.custom-radio` | `.form-check` | ✅ Both work |

### File Inputs

| Bootstrap 4 | Bootstrap 5 | Status |
|-------------|-------------|--------|
| `.custom-file` | `.form-control` | ✅ Both work |
| `.custom-file-input` | `.form-control` | ⚠️ Requires HTML changes |
| `.custom-file-label` | `.form-label` | ⚠️ Requires HTML changes |

---

## Category 5: Data Attributes (❌ NOT Auto-supported)

### Modal, Dropdown, Collapse, Tooltip, Popover

| Bootstrap 4 | Bootstrap 5 | Status |
|-------------|-------------|--------|
| `data-toggle="modal"` | `data-bs-toggle="modal"` | ❌ Manual fix required |
| `data-toggle="dropdown"` | `data-bs-toggle="dropdown"` | ❌ Manual fix required |
| `data-toggle="collapse"` | `data-bs-toggle="collapse"` | ❌ Manual fix required |
| `data-toggle="tooltip"` | `data-bs-toggle="tooltip"` | ❌ Manual fix required |
| `data-toggle="popover"` | `data-bs-toggle="popover"` | ❌ Manual fix required |
| `data-target="#id"` | `data-bs-target="#id"` | ❌ Manual fix required |
| `data-dismiss="modal"` | `data-bs-dismiss="modal"` | ❌ Manual fix required |
| `data-dismiss="alert"` | `data-bs-dismiss="alert"` | ❌ Manual fix required |

**⚠️ Important**: Data attributes CANNOT be aliased with CSS. Stories using these require HTML updates.

### Example Fix:

```html
<!-- ❌ BS4 (will NOT work) -->
<button data-toggle="modal" data-target="#myModal">
  Open Modal
</button>

<!-- ✅ BS5 (correct) -->
<button data-bs-toggle="modal" data-bs-target="#myModal">
  Open Modal
</button>
```

---

## Category 6: Responsive Utilities (✅ Auto-supported)

All responsive variants are auto-supported via `bs4-compatibility.css`:

```
.ml-sm-*, .mr-sm-*, .pl-sm-*, .pr-sm-*
.ml-md-*, .mr-md-*, .pl-md-*, .pr-md-*
.ml-lg-*, .mr-lg-*, .pl-lg-*, .pr-lg-*
.ml-xl-*, .mr-xl-*, .pl-xl-*, .pr-xl-*

.text-sm-left, .text-sm-right
.text-md-left, .text-md-right
.text-lg-left, .text-lg-right
.text-xl-left, .text-xl-right

.float-sm-left, .float-sm-right, .float-sm-none
.float-md-left, .float-md-right, .float-md-none
.float-lg-left, .float-lg-right, .float-lg-none
.float-xl-left, .float-xl-right, .float-xl-none
```

---

## Migration Strategy

### Step 1: Identify Story Type

| Story Type | Action | Estimated Effort |
|------------|--------|------------------|
| **A: Self-contained CSS** | ✅ No action needed | 0 min |
| **B: Uses BS4 utility classes** | ✅ Already compatible | 0 min |
| **C: Uses data-bs attributes** | ❌ Manual fix required | 5-15 min per story |

### Step 2: Fix Interactive Components (Category C)

**Files to check**:
```bash
src/stories/molecules/overlays/*.stories.js    # Modals, Tooltips, Popovers
src/stories/organisms/**/*.stories.js          # Dropdowns, Collapse, Accordion
```

**Search patterns**:
```bash
grep -r 'data-toggle' src/stories/
grep -r 'data-target' src/stories/
grep -r 'data-dismiss' src/stories/
```

**Replace patterns**:
```
data-toggle="     → data-bs-toggle="
data-target="     → data-bs-target="
data-dismiss="    → data-bs-dismiss="
```

### Step 3: Test in Storybook

```bash
npm run storybook
# Verify:
# 1. No console errors
# 2. Interactive components work (modals open, dropdowns expand, etc.)
# 3. Visual appearance unchanged
```

### Step 4: Update Playwright Tests

```bash
npx playwright test --update-snapshots
```

---

## Automated Migration Script (Future)

For bulk migration, create a script:

```bash
#!/bin/bash
# migrate-bs4-to-bs5.sh

# Find all .stories.js files
FILES=$(find src/stories -name "*.stories.js")

for file in $FILES; do
  echo "Processing: $file"

  # Replace data attributes
  sed -i 's/data-toggle="/data-bs-toggle="/g' "$file"
  sed -i 's/data-target="/data-bs-target="/g' "$file"
  sed -i 's/data-dismiss="/data-bs-dismiss="/g' "$file"

  # Optional: Replace utility classes (not required due to compatibility layer)
  # sed -i 's/\\.ml-/\\.ms-/g' "$file"
  # sed -i 's/\\.mr-/\\.me-/g' "$file"
  # sed -i 's/\\.pl-/\\.ps-/g' "$file"
  # sed -i 's/\\.pr-/\\.pe-/g' "$file"
done

echo "Migration complete!"
```

**Usage**:
```bash
chmod +x migrate-bs4-to-bs5.sh
./migrate-bs4-to-bs5.sh
```

---

## Story Inventory

### Category A: Self-contained CSS (51% - ~65 stories)
✅ **No action needed** - These stories have inline `<style>` blocks and don't rely on Bootstrap classes.

**Example**:
```javascript
render: () => `
  <style>
    .custom-component {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
  </style>
  <div class="custom-component">Content</div>
`
```

### Category B: Uses BS4 Utility Classes (31% - ~40 stories)
✅ **Already compatible** via `bs4-compatibility.css` - No changes needed.

**Example**:
```javascript
render: () => `
  <div class="d-flex justify-content-between mr-3 ml-2">
    <span class="font-weight-bold">Text</span>
  </div>
`
```

### Category C: Uses Interactive Components (18% - ~23 stories)
❌ **Manual fix required** - Update data-* attributes.

**Example**:
```javascript
// ❌ Before
render: () => `
  <button data-toggle="modal" data-target="#myModal">Open</button>
`

// ✅ After
render: () => `
  <button data-bs-toggle="modal" data-bs-target="#myModal">Open</button>
`
```

---

## Testing Checklist

### Visual Regression Testing:
```bash
# 1. Build Storybook
npm run build-storybook

# 2. Run Playwright tests
npx playwright test

# 3. Update snapshots if visual changes are expected
npx playwright test --update-snapshots

# 4. Review differences
npx playwright show-report
```

### Manual Testing:
- [ ] Primary color is #6e63e8 (not #7367f0)
- [ ] Montserrat font loads correctly
- [ ] BS4 utility classes work (mr-3, ml-2, etc.)
- [ ] BS5 utility classes work (me-3, ms-2, etc.)
- [ ] Modals open correctly
- [ ] Dropdowns expand correctly
- [ ] Tooltips show correctly
- [ ] Collapse/Accordion works
- [ ] Forms validate correctly
- [ ] No console errors

---

## Breaking Changes Summary

| Component | BS4 | BS5 | Fix Required |
|-----------|-----|-----|--------------|
| **Utilities** | `mr-*`, `ml-*` | `me-*`, `ms-*` | ✅ Auto-aliased |
| **Text** | `text-left`, `text-right` | `text-start`, `text-end` | ✅ Auto-aliased |
| **Font** | `font-weight-bold` | `fw-bold` | ✅ Auto-aliased |
| **Float** | `float-left`, `float-right` | `float-start`, `float-end` | ✅ Auto-aliased |
| **Select** | `.custom-select` | `.form-select` | ✅ Auto-aliased |
| **Data Attrs** | `data-toggle` | `data-bs-toggle` | ❌ Manual fix |

---

## FAQ

### Q: Do I need to update all BS4 classes to BS5?
**A**: No! The `bs4-compatibility.css` layer allows BS4 classes to work. Only update if you prefer BS5 syntax.

### Q: Which classes require manual updates?
**A**: Only data attributes (`data-toggle`, `data-target`, `data-dismiss`) require manual updates. CSS classes are auto-supported.

### Q: Can I mix BS4 and BS5 classes?
**A**: Yes! You can use `<div class="mr-3 ms-2">` and both will work.

### Q: Will this affect performance?
**A**: Minimal impact (~5KB additional CSS). The compatibility layer is small and cached.

### Q: How do I know which stories need fixing?
**A**: Run: `grep -r 'data-toggle\|data-target\|data-dismiss' src/stories/`

---

## Resources

- [Bootstrap 5 Migration Guide](https://getbootstrap.com/docs/5.3/migration/)
- [Bootstrap 5.3.8 Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Agent Helper: CSS_BRIDGE_POC_ANALYSIS.md](./CSS_BRIDGE_POC_ANALYSIS.md)
- [Compatibility Layer: /vuexy/css/bs4-compatibility.css](../packages/vuexy_theme/public/vuexy/css/bs4-compatibility.css)

---

**Last Updated**: 2026-02-24
**Maintained By**: AI Agent (Claude Sonnet 4.5)
