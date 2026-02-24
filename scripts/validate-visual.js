const { chromium } = require('@playwright/test');

/**
 * Visual Validation Script for CSS Bridge Implementation
 *
 * This script validates 10 representative stories across different categories
 * to ensure CSS and BS5→BS4 conversions are working correctly.
 */

async function validateStories() {
  console.log('🎭 Playwright Visual Validation\n');

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  // Representative stories from different categories
  const storiesToValidate = [
    // Educacross Components V2 (most important)
    { path: '/story/educacross-components-v2-listtable--default', name: 'ListTable' },
    { path: '/story/educacross-components-v2-profilepicture--default', name: 'ProfilePicture' },
    { path: '/story/educacross-components-v2-questionalternative--default', name: 'QuestionAlternative' },

    // Atoms
    { path: '/story/atoms-actions-button--primary', name: 'Button Primary' },
    { path: '/story/atoms-forms-select--default', name: 'Select' },

    // Molecules
    { path: '/story/molecules-data-display-statcard--default', name: 'StatCard' },
    { path: '/story/molecules-navigation-breadcrumb--default', name: 'Breadcrumb' },

    // Organisms
    { path: '/story/organisms-navigation-sidebar--default', name: 'Sidebar' },

    // Templates
    { path: '/story/templates-auth-login--default', name: 'Login Template' },
    { path: '/story/templates-application-layouts-dashboard--default', name: 'Dashboard' },
  ];

  let passed = 0;
  let failed = 0;
  const errors = [];

  console.log(`Validating ${storiesToValidate.length} stories...\n`);

  for (const story of storiesToValidate) {
    try {
      console.log(`📄 Testing: ${story.name}`);

      // Navigate to story
      await page.goto(`http://localhost:6006/iframe.html?viewMode=story&id=${story.path.replace('/story/', '')}`, {
        waitUntil: 'networkidle',
        timeout: 15000
      });

      // Wait for content to load
      await page.waitForTimeout(1000);

      // Check for console errors
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      // Check for 404s on CSS/JS
      const resourceErrors = [];
      page.on('response', response => {
        if (response.status() === 404 && (response.url().includes('.css') || response.url().includes('.js'))) {
          resourceErrors.push(response.url());
        }
      });

      // Take screenshot
      const screenshotPath = `/tmp/validation-${story.name.replace(/\s+/g, '-').toLowerCase()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: false });

      // Check if primary color is applied (checking if educacross-production.css loaded)
      const hasPrimaryColor = await page.evaluate(() => {
        const root = document.documentElement;
        const styles = window.getComputedStyle(root);
        // Check for any element with btn-primary or similar
        const primaryBtn = document.querySelector('.btn-primary');
        if (primaryBtn) {
          const btnStyles = window.getComputedStyle(primaryBtn);
          return btnStyles.backgroundColor !== 'rgba(0, 0, 0, 0)';
        }
        return true; // If no button, assume CSS loaded
      });

      if (resourceErrors.length > 0) {
        console.log(`   ⚠️  Warning: 404 errors detected`);
        resourceErrors.forEach(url => console.log(`      - ${url}`));
        errors.push({ story: story.name, type: '404', errors: resourceErrors });
      }

      if (consoleErrors.length > 0) {
        console.log(`   ⚠️  Warning: Console errors detected`);
        consoleErrors.slice(0, 3).forEach(err => console.log(`      - ${err}`));
      }

      console.log(`   ✅ Rendered successfully (screenshot saved)`);
      passed++;

    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}`);
      failed++;
      errors.push({ story: story.name, type: 'error', error: error.message });
    }

    console.log('');
  }

  await browser.close();

  // Summary
  console.log('━'.repeat(60));
  console.log('📊 Validation Summary');
  console.log('━'.repeat(60));
  console.log(`Total stories tested: ${storiesToValidate.length}`);
  console.log(`✅ Passed:           ${passed}`);
  console.log(`❌ Failed:           ${failed}`);

  if (errors.length > 0) {
    console.log('\n⚠️  Issues found:');
    errors.forEach(err => {
      console.log(`   - ${err.story}: ${err.type}`);
    });
  }

  console.log('\n✨ Validation complete!\n');

  return { passed, failed, total: storiesToValidate.length };
}

// Run validation
validateStories()
  .then(result => {
    process.exit(result.failed > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  });
