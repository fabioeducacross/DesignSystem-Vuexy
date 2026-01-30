#!/bin/bash

# Script de Integração do Template Vuexy v10.9.0
# Uso: ./scripts/integrate-vuexy.sh [caminho-para-html-version]

set -e  # Exit on error

echo "=================================================="
echo "🎨 Vuexy Template Integration Script"
echo "=================================================="
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar se o caminho foi fornecido
if [ -z "$1" ]; then
    echo -e "${RED}❌ Error: Template path not provided${NC}"
    echo ""
    echo "Usage: ./scripts/integrate-vuexy.sh <path-to-html-version>"
    echo ""
    echo "Examples:"
    echo "  ./scripts/integrate-vuexy.sh ./vuexy-template-source/html-version"
    echo "  ./scripts/integrate-vuexy.sh ../themeforest-*/vuexy-admin-v10.9.0/html-version"
    echo ""
    exit 1
fi

TEMPLATE_PATH="$1"
DEST_PATH="./packages/vuexy_theme/public/vuexy"

# Verificar se o caminho do template existe
if [ ! -d "$TEMPLATE_PATH" ]; then
    echo -e "${RED}❌ Error: Template path not found: $TEMPLATE_PATH${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Template found: $TEMPLATE_PATH"
echo ""

# Criar backup do placeholder CSS
if [ -f "$DEST_PATH/css/vuexy-theme.css" ]; then
    echo -e "${YELLOW}⚠${NC}  Backing up placeholder CSS..."
    mv "$DEST_PATH/css/vuexy-theme.css" "$DEST_PATH/css/vuexy-theme.css.backup"
    echo -e "${GREEN}✓${NC} Placeholder CSS backed up"
fi

echo ""
echo "=================================================="
echo "📂 Copying Template Assets"
echo "=================================================="
echo ""

# Função para copiar com verificação
copy_assets() {
    local src="$1"
    local dest="$2"
    local name="$3"
    
    if [ -d "$src" ]; then
        echo -e "${YELLOW}→${NC} Copying $name..."
        mkdir -p "$dest"
        cp -r "$src"/* "$dest/" 2>/dev/null || true
        
        # Verificar se copiou algo
        if [ "$(ls -A $dest)" ]; then
            local count=$(find "$dest" -type f | wc -l)
            echo -e "${GREEN}✓${NC} $name copied ($count files)"
        else
            echo -e "${YELLOW}⚠${NC}  $name directory empty or not found"
        fi
    else
        echo -e "${YELLOW}⚠${NC}  $name not found at $src"
    fi
}

# Copiar CSS
copy_assets "$TEMPLATE_PATH/css" "$DEST_PATH/css" "CSS"

# Copiar Fonts
copy_assets "$TEMPLATE_PATH/fonts" "$DEST_PATH/fonts" "Fonts"

# Copiar Vendors
copy_assets "$TEMPLATE_PATH/vendors" "$DEST_PATH/vendors" "Vendors"

# Copiar JavaScript
copy_assets "$TEMPLATE_PATH/js" "$DEST_PATH/js" "JavaScript"

# Copiar Images
copy_assets "$TEMPLATE_PATH/images" "$DEST_PATH/images" "Images"

# Copiar Assets (se existir)
copy_assets "$TEMPLATE_PATH/assets" "$DEST_PATH/assets" "Assets"

echo ""
echo "=================================================="
echo "🔍 Analyzing Template Structure"
echo "=================================================="
echo ""

# Buscar arquivos HTML de exemplo
HTML_FILES=$(find "$TEMPLATE_PATH" -maxdepth 1 -name "*.html" -type f | head -5)

if [ ! -z "$HTML_FILES" ]; then
    echo -e "${GREEN}✓${NC} Found HTML example files:"
    echo "$HTML_FILES" | while read file; do
        echo "  - $(basename $file)"
    done
    
    # Extrair CSS do primeiro arquivo HTML
    FIRST_HTML=$(echo "$HTML_FILES" | head -1)
    echo ""
    echo -e "${YELLOW}→${NC} Extracting CSS references from $(basename $FIRST_HTML)..."
    
    # Buscar links CSS
    CSS_LINKS=$(grep -o 'href="[^"]*\.css"' "$FIRST_HTML" 2>/dev/null || true)
    
    if [ ! -z "$CSS_LINKS" ]; then
        echo ""
        echo "CSS files found (in loading order):"
        echo "$CSS_LINKS" | sed 's/href="//g' | sed 's/"//g' | while read css; do
            echo "  - $css"
        done
        
        # Salvar para referência
        echo "$CSS_LINKS" | sed 's/href="//g' | sed 's/"//g' > "$DEST_PATH/css-load-order.txt"
        echo ""
        echo -e "${GREEN}✓${NC} CSS load order saved to: $DEST_PATH/css-load-order.txt"
    fi
else
    echo -e "${YELLOW}⚠${NC}  No HTML example files found"
fi

echo ""
echo "=================================================="
echo "📊 Integration Summary"
echo "=================================================="
echo ""

# Contar arquivos copiados
CSS_COUNT=$(find "$DEST_PATH/css" -type f -name "*.css" ! -name "*.backup" | wc -l)
FONTS_COUNT=$(find "$DEST_PATH/fonts" -type f 2>/dev/null | wc -l || echo "0")
VENDORS_COUNT=$(find "$DEST_PATH/vendors" -type f 2>/dev/null | wc -l || echo "0")
JS_COUNT=$(find "$DEST_PATH/js" -type f -name "*.js" 2>/dev/null | wc -l || echo "0")
IMAGES_COUNT=$(find "$DEST_PATH/images" -type f 2>/dev/null | wc -l || echo "0")

echo "Assets copied:"
echo "  - CSS files: $CSS_COUNT"
echo "  - Font files: $FONTS_COUNT"
echo "  - Vendor files: $VENDORS_COUNT"
echo "  - JavaScript files: $JS_COUNT"
echo "  - Image files: $IMAGES_COUNT"

echo ""
echo "=================================================="
echo "✅ Integration Complete!"
echo "=================================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Update .storybook/preview.js with correct CSS order"
echo "   (See: $DEST_PATH/css-load-order.txt)"
echo ""
echo "2. Test Storybook:"
echo "   npm run storybook"
echo ""
echo "3. Verify in browser (http://localhost:6006):"
echo "   - No 404 errors in console"
echo "   - Vuexy colors applied"
echo "   - Fonts loading correctly"
echo ""
echo "4. Update component stories with real Vuexy markup"
echo ""
echo "For detailed instructions, see:"
echo "  agent_helpers/INTEGRACAO_VUEXY.md"
echo ""
echo -e "${GREEN}🎉 Happy coding!${NC}"
echo ""
