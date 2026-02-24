#!/usr/bin/env node

/**
 * Batch Fix: Bootstrap 5 → Bootstrap 4 Class Conversion
 *
 * This script converts BS5 utility classes to BS4 equivalents across story files.
 *
 * Conversions:
 * - me-{n} → mr-{n} (margin-end → margin-right)
 * - ms-{n} → ml-{n} (margin-start → margin-left)
 * - pe-{n} → pr-{n} (padding-end → padding-right)
 * - ps-{n} → pl-{n} (padding-start → padding-left)
 * - form-select → custom-select
 * - fw-bold → font-weight-bold
 * - fw-bolder → font-weight-bolder
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const STORIES_DIR = path.join(__dirname, '../src/stories');
const DRY_RUN = process.argv.includes('--dry-run');

// Conversion rules (order matters!)
const CONVERSIONS = [
  // Margin utilities (with word boundaries to avoid partial matches)
  { from: /\bme-0\b/g, to: 'mr-0', name: 'me-0 → mr-0' },
  { from: /\bme-1\b/g, to: 'mr-1', name: 'me-1 → mr-1' },
  { from: /\bme-2\b/g, to: 'mr-2', name: 'me-2 → mr-2' },
  { from: /\bme-3\b/g, to: 'mr-3', name: 'me-3 → mr-3' },
  { from: /\bme-4\b/g, to: 'mr-4', name: 'me-4 → mr-4' },
  { from: /\bme-5\b/g, to: 'mr-5', name: 'me-5 → mr-5' },
  { from: /\bme-auto\b/g, to: 'mr-auto', name: 'me-auto → mr-auto' },

  { from: /\bms-0\b/g, to: 'ml-0', name: 'ms-0 → ml-0' },
  { from: /\bms-1\b/g, to: 'ml-1', name: 'ms-1 → ml-1' },
  { from: /\bms-2\b/g, to: 'ml-2', name: 'ms-2 → ml-2' },
  { from: /\bms-3\b/g, to: 'ml-3', name: 'ms-3 → ml-3' },
  { from: /\bms-4\b/g, to: 'ml-4', name: 'ms-4 → ml-4' },
  { from: /\bms-5\b/g, to: 'ml-5', name: 'ms-5 → ml-5' },
  { from: /\bms-auto\b/g, to: 'ml-auto', name: 'ms-auto → ml-auto' },

  // Padding utilities
  { from: /\bpe-0\b/g, to: 'pr-0', name: 'pe-0 → pr-0' },
  { from: /\bpe-1\b/g, to: 'pr-1', name: 'pe-1 → pr-1' },
  { from: /\bpe-2\b/g, to: 'pr-2', name: 'pe-2 → pr-2' },
  { from: /\bpe-3\b/g, to: 'pr-3', name: 'pe-3 → pr-3' },
  { from: /\bpe-4\b/g, to: 'pr-4', name: 'pe-4 → pr-4' },
  { from: /\bpe-5\b/g, to: 'pr-5', name: 'pe-5 → pr-5' },

  { from: /\bps-0\b/g, to: 'pl-0', name: 'ps-0 → pl-0' },
  { from: /\bps-1\b/g, to: 'pl-1', name: 'ps-1 → pl-1' },
  { from: /\bps-2\b/g, to: 'pl-2', name: 'ps-2 → pl-2' },
  { from: /\bps-3\b/g, to: 'pl-3', name: 'ps-3 → pl-3' },
  { from: /\bps-4\b/g, to: 'pl-4', name: 'ps-4 → pl-4' },
  { from: /\bps-5\b/g, to: 'pl-5', name: 'ps-5 → pl-5' },

  // Form utilities
  { from: /\bform-select\b/g, to: 'custom-select', name: 'form-select → custom-select' },

  // Font weight utilities
  { from: /\bfw-bold\b/g, to: 'font-weight-bold', name: 'fw-bold → font-weight-bold' },
  { from: /\bfw-bolder\b/g, to: 'font-weight-bolder', name: 'fw-bolder → font-weight-bolder' },
  { from: /\bfw-normal\b/g, to: 'font-weight-normal', name: 'fw-normal → font-weight-normal' },
  { from: /\bfw-light\b/g, to: 'font-weight-light', name: 'fw-light → font-weight-light' },
  { from: /\bfw-lighter\b/g, to: 'font-weight-lighter', name: 'fw-lighter → font-weight-lighter' },
];

console.log('🔧 Bootstrap 5 → Bootstrap 4 Batch Converter\n');
if (DRY_RUN) {
  console.log('🔍 DRY RUN MODE - No files will be modified\n');
}

// Find all story files
function findStoryFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(findStoryFiles(filePath));
    } else if (file.endsWith('.stories.js')) {
      results.push(filePath);
    }
  }

  return results;
}

// Process a single file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  let changes = [];

  for (const rule of CONVERSIONS) {
    const matches = content.match(rule.from);
    if (matches && matches.length > 0) {
      newContent = newContent.replace(rule.from, rule.to);
      changes.push({ rule: rule.name, count: matches.length });
    }
  }

  if (changes.length > 0) {
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, newContent, 'utf8');
    }
    return { path: filePath, changes, modified: true };
  }

  return { path: filePath, changes: [], modified: false };
}

// Main execution
try {
  console.log('📁 Scanning for story files...');
  const storyFiles = findStoryFiles(STORIES_DIR);
  console.log(`✅ Found ${storyFiles.length} story files\n`);

  console.log('🔄 Processing files...\n');

  let totalModified = 0;
  let totalChanges = 0;
  const results = [];

  for (const file of storyFiles) {
    const result = processFile(file);
    if (result.modified) {
      totalModified++;
      totalChanges += result.changes.reduce((sum, c) => sum + c.count, 0);
      results.push(result);

      const relativePath = path.relative(process.cwd(), result.path);
      console.log(`✏️  ${relativePath}`);
      result.changes.forEach(change => {
        console.log(`    - ${change.rule}: ${change.count} occurrence(s)`);
      });
      console.log('');
    }
  }

  // Summary
  console.log('━'.repeat(60));
  console.log('📊 Summary');
  console.log('━'.repeat(60));
  console.log(`Total files scanned:  ${storyFiles.length}`);
  console.log(`Files modified:       ${totalModified}`);
  console.log(`Total replacements:   ${totalChanges}`);

  if (DRY_RUN) {
    console.log('\n⚠️  DRY RUN - No changes were written to disk');
    console.log('   Run without --dry-run to apply changes\n');
  } else {
    console.log('\n✨ Success! All files have been updated.\n');
  }

} catch (error) {
  console.error('\n❌ Error during conversion:', error.message);
  process.exit(1);
}
