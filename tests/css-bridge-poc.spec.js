/**
 * CSS Bridge POC - Visual Validation Tests
 *
 * Tests ProgressBar (Categoria A) and ListTable (Categoria B)
 * to validate CSS Bridge approach before global rollout.
 */

const { test, expect } = require('@playwright/test');

const STORYBOOK_URL = 'http://localhost:6006';

test.describe('CSS Bridge POC - Baseline Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('ProgressBar - Categoria A (CSS auto-contido)', async ({ page }) => {
    // Navigate to ProgressBar story
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=educacross-components-v2-feedback-progressbar--default&viewMode=story`);

    // Wait for story to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Extra buffer for CSS loading

    // Take screenshot of the component
    const component = await page.locator('.sb-show-main');
    await expect(component).toBeVisible();

    await page.screenshot({
      path: 'tests/screenshots/progressbar-baseline.png',
      fullPage: true
    });

    // Verify key elements are visible
    await expect(page.locator('.progress-bar-container')).toBeVisible();
    await expect(page.locator('.progress-bar-header')).toBeVisible();
    await expect(page.locator('.progress-bar')).toBeVisible();

    console.log('✅ ProgressBar baseline captured');
  });

  test('ProgressBar - ColorRanges story', async ({ page }) => {
    // Navigate to ColorRanges story showing all proficiency levels
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=educacross-components-v2-feedback-progressbar--color-ranges&viewMode=story`);

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const component = await page.locator('.sb-show-main');
    await expect(component).toBeVisible();

    await page.screenshot({
      path: 'tests/screenshots/progressbar-color-ranges.png',
      fullPage: true
    });

    // Verify all three proficiency levels are present
    await expect(page.locator('.bg-legend-below-basic')).toBeVisible();
    await expect(page.locator('.bg-legend-basic')).toBeVisible();
    await expect(page.locator('.bg-legend-proficient')).toBeVisible();

    console.log('✅ ProgressBar color ranges captured');
  });

  test('ListTable - Categoria B (depende BS5)', async ({ page }) => {
    // Navigate to ListTable story
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=educacross-components-v2-data-display-listtable--default&viewMode=story`);

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const component = await page.locator('.sb-show-main');
    await expect(component).toBeVisible();

    await page.screenshot({
      path: 'tests/screenshots/listtable-baseline.png',
      fullPage: true
    });

    // Verify key table elements
    await expect(page.locator('.card')).toBeVisible();
    await expect(page.locator('.list-table-controls')).toBeVisible();
    await expect(page.locator('.table')).toBeVisible();
    await expect(page.locator('.pagination-container')).toBeVisible();

    // Check for Bootstrap 5 specific classes (should be present)
    const hasFormSelect = await page.locator('.form-select').count() > 0;
    const hasMeClasses = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('*'))
        .some(el => Array.from(el.classList).some(c => c.startsWith('me-')));
    });

    console.log('✅ ListTable baseline captured');
    console.log(`   - Has .form-select: ${hasFormSelect}`);
    console.log(`   - Has .me-* classes: ${hasMeClasses}`);
  });

  test('ListTable - Loading state with skeleton', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=educacross-components-v2-data-display-listtable--loading&viewMode=story`);

    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const component = await page.locator('.sb-show-main');
    await expect(component).toBeVisible();

    await page.screenshot({
      path: 'tests/screenshots/listtable-loading.png',
      fullPage: true
    });

    // Verify skeleton elements
    await expect(page.locator('.skeleton-cell')).toBeVisible();

    console.log('✅ ListTable loading state captured');
  });

  test('CSS Dependencies Audit', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=educacross-components-v2-data-display-listtable--default&viewMode=story`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Audit Bootstrap 5 classes in use
    const bs5Classes = await page.evaluate(() => {
      const allClasses = new Set();
      document.querySelectorAll('*').forEach(el => {
        el.classList.forEach(cls => allClasses.add(cls));
      });

      const classArray = Array.from(allClasses);

      return {
        total: classArray.length,
        meClasses: classArray.filter(c => c.startsWith('me-')),
        msClasses: classArray.filter(c => c.startsWith('ms-')),
        formSelect: classArray.includes('form-select'),
        gapClasses: classArray.filter(c => c.startsWith('gap-')),
        fwClasses: classArray.filter(c => c.startsWith('fw-')),
        bgLightClasses: classArray.filter(c => c.startsWith('bg-light-'))
      };
    });

    console.log('📊 Bootstrap 5 Dependencies Audit:');
    console.log(`   Total classes: ${bs5Classes.total}`);
    console.log(`   .me-* classes: ${JSON.stringify(bs5Classes.meClasses)}`);
    console.log(`   .ms-* classes: ${JSON.stringify(bs5Classes.msClasses)}`);
    console.log(`   .form-select: ${bs5Classes.formSelect}`);
    console.log(`   .gap-* classes: ${JSON.stringify(bs5Classes.gapClasses)}`);
    console.log(`   .fw-* classes: ${JSON.stringify(bs5Classes.fwClasses)}`);
    console.log(`   .bg-light-* classes: ${JSON.stringify(bs5Classes.bgLightClasses)}`);
  });
});

test.describe('CSS Bridge POC - Font Validation', () => {
  test('ProgressBar uses correct typography', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=educacross-components-v2-feedback-progressbar--default&viewMode=story`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Check computed styles
    const fontInfo = await page.locator('.progress-bar-label').evaluate(el => {
      const styles = window.getComputedStyle(el);
      return {
        fontFamily: styles.fontFamily,
        fontWeight: styles.fontWeight,
        color: styles.color
      };
    });

    console.log('🔤 ProgressBar Typography:');
    console.log(`   Font Family: ${fontInfo.fontFamily}`);
    console.log(`   Font Weight: ${fontInfo.fontWeight}`);
    console.log(`   Color: ${fontInfo.color}`);

    // Note: Montserrat should be loaded if educacross-brand.css is active
  });

  test('ProgressBar colors validation', async ({ page }) => {
    await page.goto(`${STORYBOOK_URL}/iframe.html?id=educacross-components-v2-feedback-progressbar--color-ranges&viewMode=story`);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Check proficiency colors
    const colors = await page.evaluate(() => {
      const proficient = document.querySelector('.bg-legend-proficient');
      const basic = document.querySelector('.bg-legend-basic');
      const belowBasic = document.querySelector('.bg-legend-below-basic');

      return {
        proficient: proficient ? window.getComputedStyle(proficient).backgroundColor : null,
        basic: basic ? window.getComputedStyle(basic).backgroundColor : null,
        belowBasic: belowBasic ? window.getComputedStyle(belowBasic).backgroundColor : null
      };
    });

    console.log('🎨 ProgressBar Colors:');
    console.log(`   Proficient (should be #28c76f): ${colors.proficient}`);
    console.log(`   Basic (should be #ff9f43): ${colors.basic}`);
    console.log(`   Below Basic (should be #ea5455): ${colors.belowBasic}`);
  });
});
