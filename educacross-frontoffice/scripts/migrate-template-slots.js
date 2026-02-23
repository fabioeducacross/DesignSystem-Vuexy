#!/usr/bin/env node

/**
 * Script to convert <template #name> shorthand to <template v-slot:name> syntax in Vue files
 *
 * This converts the shorthand slot syntax to the explicit v-slot directive syntax:
 * - <template #slotName> → <template v-slot:slotName>
 * - <template #slotName="props"> → <template v-slot:slotName="props">
 * - <template #default> → <template v-slot>
 * - <template #default="props"> → <template v-slot="props">
 *
 * Usage:
 *   node scripts/migrate-template-slots.js --dry-run  # Preview changes
 *   node scripts/migrate-template-slots.js            # Apply changes
 *   node scripts/migrate-template-slots.js --revert   # Revert from backups
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);

// Configuration
const SRC_DIR = path.join(__dirname, '..', 'src');
const BACKUP_DIR = path.join(__dirname, '..', '.backups', `migration-${Date.now()}`);
const DRY_RUN = process.argv.includes('--dry-run');
const REVERT = process.argv.includes('--revert');
const VERBOSE = process.argv.includes('--verbose');

// Statistics
const stats = {
  filesProcessed: 0,
  filesChanged: 0,
  conversionsApplied: 0,
  errors: [],
};

/**
 * Recursively find all .vue files
 */
async function findVueFiles(dir) {
  const files = [];

  async function walk(currentDir) {
    const entries = await readdir(currentDir);

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry);
      const fileStat = await stat(fullPath);

      if (fileStat.isDirectory()) {
        // Skip node_modules, dist, etc.
        if (!['node_modules', 'dist', '.git', '.backups'].includes(entry)) {
          await walk(fullPath);
        }
      } else if (fileStat.isFile() && entry.endsWith('.vue')) {
        files.push(fullPath);
      }
    }
  }

  await walk(dir);
  return files;
}

/**
 * Convert template slot shorthand syntax to v-slot directive syntax
 *
 * Patterns to convert:
 * 1. <template #name> → <template v-slot:name>
 * 2. <template #name="props"> → <template v-slot:name="props">
 * 3. <template #default> → <template v-slot:default> or <template v-slot>
 * 4. <template #default="props"> → <template v-slot="props">
 *
 * Skip patterns:
 * - Dynamic slots: #head(), #cell(name), etc. (keep as-is or handle separately)
 */
function convertTemplateSlots(content, filePath) {
  let modified = content;
  let conversions = 0;
  const changes = [];

  // We'll collect all matches first with their positions, then apply changes
  // This prevents issues with overlapping replacements

  // Pattern 1: <template #name> without props (simple named slots)
  // Match: <template #slotName>
  // Convert to: <template v-slot:slotName>
  const simpleNamedSlotRegex = /<template\s+#([a-zA-Z][a-zA-Z0-9-_]*)\s*>/g;
  let match;

  while ((match = simpleNamedSlotRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const slotName = match[1];

    // Skip if this looks like a dynamic slot (contains parentheses in the name)
    const afterContext = content.substring(match.index, match.index + fullMatch.length + 10);
    if (afterContext.match(/#[a-zA-Z0-9-_]*\(/)) {
      if (VERBOSE) {
        console.log(`  Skipping dynamic slot pattern: ${fullMatch}`);
      }
      continue;
    }

    const replacement = `<template v-slot:${slotName}>`;
    changes.push({
      from: fullMatch,
      to: replacement,
      line: content.substring(0, match.index).split('\n').length,
      index: match.index,
    });
  }

  // Pattern 2: <template #name="props"> with props binding
  // Match: <template #slotName="propName">
  // Convert to: <template v-slot:slotName="propName">
  const namedSlotWithPropsRegex = /<template\s+#([a-zA-Z][a-zA-Z0-9-_]*)\s*=\s*"([^"]+)"\s*>/g;

  while ((match = namedSlotWithPropsRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const slotName = match[1];
    const propsName = match[2];

    // Skip dynamic slots (contains parentheses in the name)
    const afterContext = content.substring(match.index, match.index + fullMatch.length + 10);
    if (afterContext.match(/#[a-zA-Z0-9-_]*\(/)) {
      if (VERBOSE) {
        console.log(`  Skipping dynamic slot pattern: ${fullMatch}`);
      }
      continue;
    }

    const replacement = `<template v-slot:${slotName}="${propsName}">`;
    changes.push({
      from: fullMatch,
      to: replacement,
      line: content.substring(0, match.index).split('\n').length,
      index: match.index,
    });
  }

  // Pattern 3: <template #default> without props
  // Convert to: <template v-slot>
  const defaultSlotRegex = /<template\s+#default\s*>/g;

  while ((match = defaultSlotRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const replacement = `<template v-slot>`;
    changes.push({
      from: fullMatch,
      to: replacement,
      line: content.substring(0, match.index).split('\n').length,
      index: match.index,
    });
  }

  // Pattern 4: <template #default="props"> with props
  // Convert to: <template v-slot="props">
  const defaultSlotWithPropsRegex = /<template\s+#default\s*=\s*"([^"]+)"\s*>/g;

  while ((match = defaultSlotWithPropsRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const propsName = match[1];

    const replacement = `<template v-slot="${propsName}">`;
    changes.push({
      from: fullMatch,
      to: replacement,
      line: content.substring(0, match.index).split('\n').length,
      index: match.index,
    });
  }

  // Sort changes by index (descending) to apply from end to start
  changes.sort((a, b) => b.index - a.index);

  // Apply changes from end to start to preserve string indices
  for (const change of changes) {
    const before = modified.substring(0, change.index);
    const after = modified.substring(change.index + change.from.length);
    modified = before + change.to + after;
    conversions++;
  }

  return {
    content: modified,
    changed: conversions > 0,
    conversions,
    changes: changes.reverse(),
  };
}

/**
 * Backup a file before modification
 */
async function backupFile(filePath) {
  const relativePath = path.relative(SRC_DIR, filePath);
  const backupPath = path.join(BACKUP_DIR, relativePath);
  const backupDir = path.dirname(backupPath);

  await mkdir(backupDir, { recursive: true });
  await copyFile(filePath, backupPath);
}

/**
 * Process a single Vue file
 */
async function processFile(filePath) {
  stats.filesProcessed++;

  try {
    const content = await readFile(filePath, 'utf8');
    const result = convertTemplateSlots(content, filePath);

    if (result.changed) {
      stats.filesChanged++;
      stats.conversionsApplied += result.conversions;

      const relativePath = path.relative(process.cwd(), filePath);
      console.log(`\n✓ ${relativePath}`);
      console.log(`  ${result.conversions} conversion(s) applied:`);

      result.changes.forEach((change, idx) => {
        console.log(`    ${idx + 1}. Line ${change.line}: ${change.from} → ${change.to}`);
      });

      if (!DRY_RUN) {
        await backupFile(filePath);
        await writeFile(filePath, result.content, 'utf8');
        console.log(`  File updated (backup saved)`);
      } else {
        console.log(`  [DRY RUN] Changes not applied`);
      }
    } else if (VERBOSE) {
      console.log(`  No changes needed: ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (error) {
    stats.errors.push({ file: filePath, error: error.message });
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(70));
  console.log('Vue Template Slot Migration Script');
  console.log('='.repeat(70));
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (preview only)' : 'LIVE (will modify files)'}`);
  console.log(`Source directory: ${SRC_DIR}`);
  if (!DRY_RUN) {
    console.log(`Backup directory: ${BACKUP_DIR}`);
  }
  console.log('='.repeat(70));
  console.log('');

  console.log('Finding Vue files...');
  const vueFiles = await findVueFiles(SRC_DIR);
  console.log(`Found ${vueFiles.length} Vue files\n`);

  console.log('Processing files...');
  for (const file of vueFiles) {
    await processFile(file);
  }

  console.log('\n' + '='.repeat(70));
  console.log('Migration Summary');
  console.log('='.repeat(70));
  console.log(`Files processed: ${stats.filesProcessed}`);
  console.log(`Files changed: ${stats.filesChanged}`);
  console.log(`Total conversions: ${stats.conversionsApplied}`);
  console.log(`Errors: ${stats.errors.length}`);

  if (stats.errors.length > 0) {
    console.log('\nErrors:');
    stats.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }

  if (!DRY_RUN && stats.filesChanged > 0) {
    console.log(`\nBackups saved to: ${BACKUP_DIR}`);
    console.log('\nTo revert changes, run:');
    console.log(`  node scripts/migrate-template-slots.js --revert`);
  }

  console.log('='.repeat(70));

  if (DRY_RUN) {
    console.log('\n⚠️  This was a DRY RUN - no files were modified');
    console.log('To apply changes, run without --dry-run flag\n');
  }
}

// Run the script
main().catch(console.error);

