#!/usr/bin/env node

/**
 * Extract Production CSS for Educacross Design System
 *
 * This script creates the production CSS file for the Storybook Design System
 * by copying the existing Vuexy core.css and combining it with the brand system.
 *
 * In the future, this can be enhanced to compile SCSS when the educacross-frontoffice
 * source files are available.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CSS_DIR = path.join(__dirname, '../packages/vuexy_theme/public/vuexy/css');
const CORE_CSS = path.join(CSS_DIR, 'core.css');
const BRAND_CSS = path.join(CSS_DIR, 'educacross-brand.css');
const OUTPUT_CSS = path.join(CSS_DIR, 'educacross-production.css');
const BACKUP_CSS = path.join(CSS_DIR, 'educacross-production.css.backup');

console.log('🎨 Extracting Production CSS for Educacross...\n');

try {
  // Step 1: Check if source files exist
  console.log('📋 Step 1: Checking source files...');

  if (!fs.existsSync(CORE_CSS)) {
    console.error('❌ Error: core.css not found at:', CORE_CSS);
    process.exit(1);
  }
  console.log('✅ Found core.css');

  if (!fs.existsSync(BRAND_CSS)) {
    console.error('❌ Error: educacross-brand.css not found at:', BRAND_CSS);
    process.exit(1);
  }
  console.log('✅ Found educacross-brand.css');

  // Step 2: Backup existing production CSS if it exists
  if (fs.existsSync(OUTPUT_CSS)) {
    console.log('\n📦 Step 2: Backing up existing production CSS...');
    fs.copyFileSync(OUTPUT_CSS, BACKUP_CSS);
    console.log('✅ Backup created at:', path.basename(BACKUP_CSS));
  }

  // Step 3: Read CSS files
  console.log('\n📖 Step 3: Reading CSS files...');
  const coreContent = fs.readFileSync(CORE_CSS, 'utf8');
  const brandContent = fs.readFileSync(BRAND_CSS, 'utf8');
  console.log(`✅ Read ${(coreContent.length / 1024).toFixed(1)}KB from core.css`);
  console.log(`✅ Read ${(brandContent.length / 1024).toFixed(1)}KB from educacross-brand.css`);

  // Step 4: Combine CSS files
  console.log('\n🔨 Step 4: Combining CSS files...');

  const header = `/**
 * =====================================================
 * EDUCACROSS PRODUCTION CSS
 * Generated: ${new Date().toISOString()}
 * =====================================================
 *
 * This file combines:
 * 1. Vuexy Core CSS (Bootstrap 4 + Theme)
 * 2. Educacross Brand System (Colors, Typography, Components)
 *
 * To regenerate: npm run extract-css
 * =====================================================
 */

`;

  const combinedContent = header + coreContent + '\n\n/* ===== EDUCACROSS BRAND SYSTEM ===== */\n\n' + brandContent;

  // Step 5: Write output file
  console.log('\n💾 Step 5: Writing production CSS...');
  fs.writeFileSync(OUTPUT_CSS, combinedContent, 'utf8');
  console.log(`✅ Created ${(combinedContent.length / 1024).toFixed(1)}KB production CSS at: ${path.basename(OUTPUT_CSS)}`);

  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Source 1: core.css (${(coreContent.length / 1024).toFixed(1)}KB)`);
  console.log(`   Source 2: educacross-brand.css (${(brandContent.length / 1024).toFixed(1)}KB)`);
  console.log(`   Output:   educacross-production.css (${(combinedContent.length / 1024).toFixed(1)}KB)`);

  console.log('\n✨ Success! Production CSS extracted.');
  console.log('   You can now update Storybook to use educacross-production.css\n');

} catch (error) {
  console.error('\n❌ Error during CSS extraction:', error.message);
  console.error(error.stack);
  process.exit(1);
}
