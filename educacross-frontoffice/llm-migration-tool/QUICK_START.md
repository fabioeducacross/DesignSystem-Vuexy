# Quick Start Guide

## Installation

```bash
cd llm-migration-tool
pip install openai python-dotenv colorama
```

## Configuration

Create `.env` file:
```env
AZURE_OPENAI_API_KEY=your_api_key_here
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_OPENAI_DEPLOYMENT=gpt-4
```

## Common Commands

### 🎯 Process a Single File

```bash
# Test without making changes
python migrate_files.py --path src/components/Button.vue --dry-run

# Apply migration
python migrate_files.py --path src/components/Button.vue --apply
```

### 📁 Process an Entire Folder

```bash
# Test folder (no API calls)
python migrate_files.py --path src/components --dry-run

# Process all files in folder
python migrate_files.py --path src/components --apply

# Process first 5 files for testing
python migrate_files.py --path src/components --limit 5 --apply
```

### 🌍 Process Entire Project

```bash
# Process 10 files at a time
python migrate_files.py --limit 10 --apply

# Continue from where you left off
python migrate_files.py --apply

# Start fresh (ignore previous progress)
python migrate_files.py --no-resume --apply
```

### 🔧 Utility Commands

```bash
# Clear all progress
python migrate_files.py --reset

# Show help
python migrate_files.py --help
```

## Workflow Example

### Incremental Folder Migration

```bash
# 1. Test first with dry-run to see what will be processed
python migrate_files.py --path src/views/admin --dry-run

# 2. Process a small batch first
python migrate_files.py --path src/views/admin --limit 3 --apply

# 3. Review the changes, test the code

# 4. If satisfied, process the rest
python migrate_files.py --path src/views/admin --apply
```

### Testing Single Components

```bash
# 1. Try a simple component first
python migrate_files.py --path src/components/Button.vue --apply

# 2. Check the backup file
ls -la src/components/Button.vue.backup

# 3. Test the migrated component

# 4. If there are issues, restore from backup
cp src/components/Button.vue.backup src/components/Button.vue
```

## What Gets Created

```
your-file.vue          # Modified file (migrated)
your-file.vue.backup   # Original file (first backup only)
.migration_progress.json  # Progress tracking (project-wide only)
```

## Tips

1. **Always test with `--dry-run` first** to see what will be processed
2. **Use `--limit`** when testing folders to process a few files at a time
3. **Backups are created automatically** - you can safely experiment
4. **Resume is automatic** for project-wide migrations
5. **Target specific folders** for focused migrations

## Common Patterns

### Test a component folder
```bash
python migrate_files.py --path src/components/forms --dry-run
```

### Migrate all layouts
```bash
python migrate_files.py --path src/layouts --apply
```

### Process views folder progressively
```bash
python migrate_files.py --path src/views --limit 10 --apply
# Review and test
python migrate_files.py --path src/views --limit 10 --apply
# Continue...
```

### Migrate specific subfolder
```bash
python migrate_files.py --path src/components/common/buttons --apply
```

## Troubleshooting

### "Path does not exist"
- Check the path is correct relative to project root
- Use `ls src/your/path` to verify

### "Invalid file type"
- Only `.vue` and `.js` files are supported
- Check file extension

### "No files found in folder"
- Folder may not contain any `.vue` or `.js` files
- Check subdirectories - processing is recursive

### Rate limiting
- Reduce batch size with `--limit`
- Add delays between batches
- Contact Azure support for higher limits

## Need Help?

```bash
python migrate_files.py --help
```

See `README.md` for detailed documentation.
