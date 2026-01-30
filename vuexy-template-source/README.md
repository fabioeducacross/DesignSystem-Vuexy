# Vuexy Template Source

## 📍 Purpose

This directory is designated to hold the Vuexy v10.9.0 template files from ThemeForest.

## 📦 Expected Structure

```
vuexy-template-source/
└── html-version/              ← Place the HTML version of Vuexy here
    ├── css/                   # Vuexy CSS files
    ├── fonts/                 # Vuexy fonts (Montserrat, Feather Icons, etc.)
    ├── vendors/               # Third-party libraries
    ├── js/                    # Vuexy JavaScript files
    ├── images/                # Vuexy images and assets
    └── *.html                 # HTML example files
```

## 🎯 Source Template

**Template Name**: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template  
**Version**: v10.9.0  
**ThemeForest ID**: lV6WYTyr  
**Original Path**: `themeforest-lV6WYTyr-vuexy-vuejs-html-laravel-admin-dashboard-template/vuexy-admin-v10.9.0`

## 📥 How to Add the Template

### Option 1: Copy from Local Machine

If you have the Vuexy template on your computer:

```bash
# From your local machine, copy the html-version folder
cp -r /path/to/vuexy-admin-v10.9.0/html-version ./vuexy-template-source/

# Or on Windows PowerShell:
Copy-Item -Path "C:\path\to\vuexy-admin-v10.9.0\html-version" -Destination ".\vuexy-template-source\" -Recurse
```

### Option 2: Extract from ZIP

If you have the template as a ZIP file:

```bash
# Extract the ZIP file
unzip themeforest-lV6WYTyr-vuexy-*.zip -d ./temp

# Copy the html-version folder
cp -r ./temp/vuexy-admin-v10.9.0/html-version ./vuexy-template-source/

# Clean up
rm -rf ./temp
```

### Option 3: Git LFS (for large files)

For templates larger than 100MB:

```bash
# Install and configure Git LFS
git lfs install
git lfs track "vuexy-template-source/**"
git add .gitattributes

# Then add the template normally
git add vuexy-template-source
git commit -m "Add Vuexy v10.9.0 template via LFS"
```

## 🚀 After Adding the Template

Once the template files are in place, run the integration script:

```bash
npm run integrate-vuexy ./vuexy-template-source/html-version
```

This will:
1. ✅ Copy all assets to `packages/vuexy_theme/public/vuexy/`
2. ✅ Extract CSS load order from HTML examples
3. ✅ Prepare assets for Storybook integration
4. ✅ Create a reference file with CSS loading sequence

## 📚 Documentation

For more details, see:
- [Integration Guide](../agent_helpers/INTEGRACAO_VUEXY.md)
- [Quick Start](../agent_helpers/QUICK_START.md)
- [How to Add Template](../agent_helpers/COMO_ADICIONAR_TEMPLATE.md)

## ⚠️ Important Notes

- **Do not commit large binary files directly** if they exceed 100MB
- Consider using Git LFS for fonts and vendor files
- The `.gitignore` is configured to handle common large file patterns
- Keep only the `html-version` to minimize repository size

## 🔒 License

The Vuexy template is a commercial product from ThemeForest. Ensure you have a valid license before using it in your project.
