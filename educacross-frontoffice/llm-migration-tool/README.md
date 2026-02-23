# LLM Migration Tool

Automated Vue 2 to Vue 3 component migration tool using Azure OpenAI.

## Setup

1. **Install dependencies:**
   ```bash
   pip install openai python-dotenv colorama
   ```

2. **Configure environment:**
   Create a `.env` file in the `llm-migration-tool` directory:
   ```env
   AZURE_OPENAI_API_KEY=your_api_key_here
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
   AZURE_OPENAI_API_VERSION=2024-02-15-preview
   AZURE_OPENAI_DEPLOYMENT=gpt-4
   ```

## Usage

### Migrate a single file

```bash
cd llm-migration-tool
python migrate_files.py --path src/layouts/components/Tag.vue --apply
```

### Migrate an entire folder (recursively)

```bash
# Process all files in a specific folder
python migrate_files.py --path src/components --apply

# Process specific subfolder
python migrate_files.py --path src/views/admin --apply

# Test folder processing without LLM calls
python migrate_files.py --path src/layouts --dry-run

# Limit number of files from a folder
python migrate_files.py --path src/components --limit 5 --apply
```

### Dry run (no API calls)

```bash
python migrate_files.py --path src/layouts/components/Tag.vue --dry-run
```

### Migrate entire project

```bash
# Process 10 files and apply changes
python migrate_files.py --limit 10 --apply

# Process all remaining files
python migrate_files.py --apply
```

### Reset progress

```bash
python migrate_files.py --reset
```

### Start fresh (ignore previous progress)

```bash
python migrate_files.py --no-resume --apply
```

## How It Works

1. **File Collection**:
   - Scans the project for `.vue` and `.js` files
   - Supports single file, folder (recursive), or entire project processing
   - Automatically excludes `node_modules`, `.git`, `dist`, etc.
2. **Prompt Generation**: Uses `prompt-vue.md` or `prompt-js.md` templates
3. **LLM Processing**: Sends each file individually to Azure OpenAI
4. **Code Extraction**: Extracts migrated code from LLM response
5. **File Update**: Applies changes with automatic backup (`.backup` files)
6. **Progress Tracking**: Saves state to `.migration_progress.json` for resume capability (disabled for specific file/folder processing)

## Prompt Templates

### prompt-vue.md
Comprehensive Vue component migration instructions including:
- Project architecture and conventions
- Composition API with `<script setup>` conversion guidelines
- Bootstrap-Vue to Bootstrap-Vue-Next migration
- ECharts integration patterns
- ACL/Permissions usage
- VeeValidate 4 + Yup patterns
- Common pitfalls and verification checklist

### prompt-js.md
JavaScript file migration instructions for:
- Vue 2 to Vue 3 API updates
- Event bus migration (Vue instance → mitt)
- Global API changes (`Vue.prototype`, `Vue.filter()`, etc.)
- Environment variable updates (`VUE_APP_*` → `VITE_APP_*`)
- Vuex pattern preservation
- Mixins to Composables conversion

## Features

- ✅ **Flexible Input**: Process single files, entire folders (recursively), or the whole project
- ✅ **Smart Path Handling**: Automatic path validation and normalization
- ✅ **Automatic Backups**: Creates `.backup` files before making changes
- ✅ **Resume Capability**: Tracks processed files in `.migration_progress.json`
- ✅ **Cost Tracking**: Token usage and cost estimation for Azure OpenAI
- ✅ **Progress Monitoring**: ETA calculation and detailed progress bars
- ✅ **Rich CLI Output**: Colored terminal output with file listings
- ✅ **Error Recovery**: Response saving for failed extractions (`.response.txt` files)
- ✅ **Testing Support**: Dry-run mode for testing without API calls
- ✅ **Backward Compatible**: Legacy `--file` flag still works

## Output

- **Migrated files**: Original files are updated in place
- **Backups**: Created as `filename.ext.backup` (first backup only, not overwritten)
- **Failed responses**: Saved as `filename.ext.response.txt` when code extraction fails
- **Progress file**: `.migration_progress.json` tracks completed and failed files

## Cost Estimation

The tool estimates costs based on Azure OpenAI pricing:
- Input tokens: ~$0.03 per 1K tokens
- Output tokens: ~$0.06 per 1K tokens
- Average per file: ~2,500-4,000 tokens (~$0.10-$0.15 per file)

Update the cost calculation in `migrate_files.py` (`_estimate_cost()` method) to match your Azure pricing.

## Troubleshooting

### 'context' Error
This was caused by unescaped curly braces in prompt templates. All literal `{` and `}` characters in the templates must be escaped as `{{` and `}}`, except for the format placeholders: `{file_path}`, `{file_type}`, `{file_extension}`, `{file_content}`.

### No code extracted
If the LLM response doesn't contain a code block, the full response is saved to a `.response.txt` file for manual review. Check the prompt template to ensure it clearly instructs the LLM to output only code.

### API Rate Limits
The tool processes files sequentially to avoid rate limit issues. If you encounter rate limits, add delays between requests or reduce the batch size with `--limit`.

## Examples

### Process a single file
```bash
cd llm-migration-tool
python migrate_files.py --path src/layouts/components/Tag.vue --apply
```

**Result:**
- ✅ Options API → Composition API with `<script setup>`
- ✅ `bootstrap-vue` → `bootstrap-vue-next`
- ✅ `this.data` → `props.data`
- ✅ Proper TypeScript-like prop typing
- ✅ Template and styles preserved

### Process an entire folder
```bash
# Migrate all components in a specific folder
python migrate_files.py --path src/components/common --apply

# Test folder with dry-run first
python migrate_files.py --path src/views/admin --dry-run

# Process first 3 files from folder for testing
python migrate_files.py --path src/layouts --limit 3 --apply
```

### Process entire project progressively
```bash
# Process 50 files at a time
python migrate_files.py --limit 50 --apply

# Continue from where you left off
python migrate_files.py --apply
```

## Files Created

- `.migration_progress.json` - Progress tracking
- `*.backup` - Original file backups
- `*.response.txt` - Failed extraction responses (for debugging)

## Git Workflow

The tool automatically creates `.backup` files, but they're not tracked by git. To commit migrated files:

```bash
# Review changes
git diff src/layouts/components/Tag.vue

# Commit the migrated file
git add src/layouts/components/Tag.vue
git commit -m "refactor: migrate Tag component to Composition API"
```

## Notes

- The tool uses the project root's `src/` directory structure
- Excludes: `node_modules`, `.git`, `dist`, `build`, etc.
- Each file is sent as a separate API request
- Progress is saved after each file for safe interruption (Ctrl+C)
