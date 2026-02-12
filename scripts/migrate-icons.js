#!/usr/bin/env node

/**
 * Script de Migração: Bootstrap Icons → Feather Icons
 *
 * Uso:
 *   node scripts/migrate-icons.js                  # Dry-run (preview)
 *   node scripts/migrate-icons.js --apply          # Aplicar mudanças
 *   node scripts/migrate-icons.js --apply file.js  # Migrar arquivo específico
 *
 * Funcionalidades:
 * - Detecta 4 padrões de uso de Bootstrap Icons
 * - Preserva estilos inline (font-size, color, margin)
 * - Mantém classes customizadas
 * - Trata innerHTML dinâmico
 * - Gera relatório em migration-report.json
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// =============================================================================
// MAPEAMENTO COMPLETO: BOOTSTRAP ICONS → FEATHER ICONS
// =============================================================================

const iconMap = {
  // Ações básicas
  'plus': 'plus',
  'plus-circle': 'plus-circle',
  'plus-lg': 'plus',
  'x': 'x',
  'x-circle': 'x-circle',
  'x-circle-fill': 'x-circle',
  'x-lg': 'x',
  'trash': 'trash-2',
  'trash2': 'trash-2',
  'pencil': 'edit-2',
  'pencil-square': 'edit-2',
  'check': 'check',
  'check-circle': 'check-circle',
  'check-circle-fill': 'check-circle',
  'check-lg': 'check',
  'check2-square': 'check-square',
  'check-all': 'check',
  'download': 'download',
  'upload': 'upload',
  'cloud-upload': 'cloud-upload',
  'cloud-arrow-up': 'cloud-upload',
  'search': 'search',

  // Navegação
  'chevron-left': 'chevron-left',
  'chevron-right': 'chevron-right',
  'chevron-up': 'chevron-up',
  'chevron-down': 'chevron-down',
  'caret-up-fill': 'chevron-up',
  'caret-down-fill': 'chevron-down',
  'arrow-left': 'arrow-left',
  'arrow-right': 'arrow-right',
  'arrow-up': 'arrow-up',
  'arrow-down': 'arrow-down',
  'arrow-left-right': 'arrow-right-left',
  'arrow-clockwise': 'rotate-cw',
  'arrow-repeat': 'rotate-cw',
  'arrow-right-circle-fill': 'arrow-right-circle',
  'arrows-angle-expand': 'expand',
  'arrows-fullscreen': 'maximize',
  'arrows-move': 'move',
  'box-arrow-up-right': 'external-link',
  'house': 'home',
  'building': 'home',
  'list': 'menu',
  'list-ul': 'list',
  'list-ol': 'list',
  'list-check': 'check-square',
  'menu': 'menu',
  'grid': 'grid',
  'grid-3x2': 'grid',
  'grid-3x3': 'grid',
  'grid-3x3-gap': 'grid',
  'layers': 'layers',
  'columns-gap': 'columns',
  'grip-vertical': 'menu',
  'skip-forward': 'skip-forward',
  '123': 'hash',

  // Usuário e conta
  'person': 'user',
  'person-fill': 'user',
  'person-circle': 'user',
  'person-badge': 'user',
  'people': 'users',
  'people-fill': 'users',
  'person-plus': 'user-plus',
  'person-check': 'user-check',
  'person-workspace': 'briefcase',
  'person-video3': 'video',
  'box-arrow-right': 'log-out',

  // Comunicação
  'bell': 'bell',
  'bell-fill': 'bell',
  'envelope': 'mail',
  'inbox': 'inbox',
  'send-check-fill': 'send',
  'chat': 'message-circle',
  'chat-dots': 'message-circle',
  'chat-left-text': 'message-square',
  'chat-square-text': 'message-square',
  'message-circle': 'message-circle',
  'message-square': 'message-square',
  'telephone': 'phone',
  'phone': 'phone',
  'whatsapp': 'message-circle',
  'facebook': 'facebook',
  'twitter-x': 'twitter',
  'at-sign': 'at-sign',

  // Status e feedback
  'exclamation-triangle': 'alert-triangle',
  'exclamation-triangle-fill': 'alert-triangle',
  'exclamation-circle': 'alert-circle',
  'exclamation-circle-fill': 'alert-circle',
  'info-circle': 'info',
  'info-circle-fill': 'info',
  'question-circle': 'help-circle',
  'question-lg': 'help-circle',
  'patch-question': 'help-circle',
  'lightbulb': 'zap',
  'lightbulb-fill': 'zap',
  'lightning': 'zap',
  'gem': 'zap',
  'shield-check': 'shield',
  'shield-exclamation': 'alert-octagon',
  'dash-circle': 'circle',
  'dash-circle-fill': 'circle',
  'dash-square': 'square',
  'activity': 'activity',

  // Configuração
  'gear': 'settings',
  'gear-fill': 'settings',
  'sliders': 'sliders',
  'three-dots': 'more-horizontal',
  'three-dots-vertical': 'more-vertical',
  'funnel': 'filter',
  'toggle-on': 'toggle-right',

  // Arquivos e documentos
  'file-earmark': 'file-text',
  'file-text': 'file-text',
  'file-earmark-text': 'file-text',
  'file-earmark-richtext': 'file-text',
  'file-earmark-pdf': 'file-text',
  'file-pdf': 'file',
  'file-earmark-excel': 'file',
  'file-bar-graph': 'file',
  'file-code': 'file-text',
  'file-zip': 'download',
  'files': 'copy',
  'folder': 'folder',
  'folder-plus': 'folder-plus',
  'archive': 'archive',
  'save': 'save',
  'diagram-2': 'folder',
  'diagram-3': 'layers',
  'diagram-3-fill': 'layers',
  'journal-bookmark': 'bookmark',
  'journal-text': 'file-text',
  'paperclip': 'paperclip',

  // Interface e visualização
  'eye': 'eye',
  'eye-fill': 'eye',
  'eye-slash': 'eye-off',
  'eye-slash-fill': 'eye-off',
  'star': 'star',
  'star-fill': 'star',
  'stars': 'star',
  'heart': 'heart',
  'heart-fill': 'heart',
  'share': 'share-2',
  'lock': 'lock',
  'lock-fill': 'lock',
  'unlock': 'unlock',
  'link-45deg': 'link',
  'clipboard': 'copy',
  'clipboard-check': 'check-square',
  'clipboard-data': 'bar-chart-2',
  'copy': 'copy',
  'emoji-smile': 'smile',
  'emoji-laughing': 'smile',
  'emoji-laughing-fill': 'smile',
  'emoji-wink': 'smile',
  'emoji-sunglasses': 'smile',
  'emoji-heart-eyes': 'heart',

  // Mídia
  'image': 'image',
  'camera': 'camera',
  'film': 'film',
  'play-fill': 'play',
  'play-circle': 'play-circle',
  'collection-play': 'play',
  'music': 'music',
  'volume-2': 'volume-2',
  'volume-x': 'volume-x',
  'video': 'video',
  'mic': 'mic',
  'printer': 'printer',

  // Tempo e agenda
  'clock': 'clock',
  'clock-fill': 'clock',
  'clock-history': 'clock',
  'hourglass-split': 'clock',
  'stopwatch': 'watch',
  'alarm': 'clock',
  'calendar': 'calendar',
  'calendar3': 'calendar',
  'calendar-event': 'calendar',
  'calendar-check': 'check-square',
  'calendar-x': 'x',

  // Educacional e negócios
  'book': 'book',
  'book-fill': 'book',
  'bookmark': 'bookmark',
  'calculator': 'calculator',
  'atom': 'atom',
  'flask': 'flask',
  'easel': 'help-circle',
  'award': 'award',
  'award-fill': 'award',
  'trophy': 'trophy',
  'trophy-fill': 'trophy',
  'mortarboard': 'award',
  'mortarboard-fill': 'award',

  // Comércio e finanças
  'cash-stack': 'dollar-sign',
  'currency-dollar': 'dollar-sign',
  'credit-card': 'credit-card',
  'tag': 'tag',
  'percent': 'percent',
  'gift': 'gift',
  'truck': 'truck',
  'package': 'package',
  'controller': 'gamepad2',
  'cart': 'shopping-cart',
  'bag': 'shopping-bag',

  // Gráficos e dados
  'bar-chart': 'bar-chart-2',
  'bar-chart-fill': 'bar-chart-2',
  'graph-up': 'trending-up',
  'graph-up-arrow': 'trending-up',
  'trending-up': 'trending-up',
  'trending-down': 'trending-down',
  'speedometer2': 'gauge',
  'pie-chart': 'pie-chart',
  'table': 'grid',
  'kanban': 'layers',
  'database': 'database',
  'server': 'server',

  // Localização e mapas
  'geo-alt-fill': 'map-pin',
  'map': 'map',
  'globe': 'globe',
  'globe-americas': 'globe',
  'translate': 'globe',
  'flag': 'flag',

  // Tecnologia
  'wifi-off': 'wifi-off',
  'broadcast-pin': 'radio',
  'code-slash': 'code',
  'code-square': 'code',
  'terminal': 'terminal',
  'git-branch': 'git-branch',
  'git-commit': 'git-commit',
  'git-merge': 'git-merge',
  'github': 'github',
  'laptop': 'monitor',
  'display': 'monitor',
  'tablet': 'tablet',
  'phone-mobile': 'smartphone',
  'cursor': 'mouse-pointer',
  'brightness-high-fill': 'sun',
  'palette': 'droplet',
  'magic': 'zap',
  'puzzle-fill': 'layers',
  'rulers': 'square',
  'cloud-fill': 'cloud',
  'cloud-rain-fill': 'cloud-rain',
  'droplet-fill': 'droplet',
  'water': 'droplet',

  // Outros
  'bullseye': 'target',
  'collection': 'list',
  'stack': 'layers',
  'hand-index': 'hand',
  'text-paragraph': 'type',
  'ui-checks': 'check-square',
  'ui-checks-grid': 'grid',
  'bootstrap': 'package',
  'sort-down': 'arrow-down',

  // Ícones sem equivalente direto (mapeados para próximos)
  'layout-three-columns': 'columns',
};

// =============================================================================
// FUNÇÕES AUXILIARES
// =============================================================================

/**
 * Extrai o tamanho do font-size em pixels
 */
function extractFontSize(styleString) {
  const match = styleString.match(/font-size:\s*(\d+)px/i);
  return match ? parseInt(match[1]) : 16; // Default 16px
}

/**
 * Extrai atributos de estilo inline
 */
function extractStyles(styleString) {
  if (!styleString) return {};

  const styles = {};

  // Color
  const colorMatch = styleString.match(/color:\s*([^;]+)/i);
  if (colorMatch) styles.color = colorMatch[1].trim();

  // Margin
  const marginMatch = styleString.match(/margin[^:]*:\s*([^;]+)/i);
  if (marginMatch) styles.margin = marginMatch[1].trim();

  // Outros estilos
  const otherStyles = styleString
    .split(';')
    .filter(s => s.trim() && !s.match(/font-size|color|margin/i))
    .join('; ');

  if (otherStyles) styles.other = otherStyles.trim();

  return styles;
}

/**
 * Converte ícone Bootstrap para Feather SVG
 */
function convertIcon(iconName, options = {}) {
  const featherName = iconMap[iconName];

  if (!featherName) {
    console.warn(`⚠️  Ícone sem equivalente: bi-${iconName}`);
    return null;
  }

  const size = options.size || 16;
  const attrs = [];

  attrs.push(`width: ${size}`);
  attrs.push(`height: ${size}`);

  if (options.class) {
    attrs.push(`class: '${options.class}'`);
  }

  if (options.style) {
    attrs.push(`style: '${options.style}'`);
  }

  return `\${feather.icons['${featherName}'].toSvg({ ${attrs.join(', ')} })}`;
}

/**
 * Processa um arquivo e substitui ícones
 */
function migrateFile(filePath, dryRun = true) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  const changes = [];

  // Adicionar import do feather se necessário
  if (!content.includes("import feather from 'feather-icons'") &&
      !content.includes('import feather from "feather-icons"')) {
    // Encontrar onde adicionar o import
    if (content.includes('export default {')) {
      content = `import feather from 'feather-icons';\n\n${content}`;
      changes.push({
        type: 'import',
        description: 'Added feather-icons import'
      });
    }
  }

  // Padrão 1: Ícone simples sem estilos
  // <i class="bi bi-heart"></i>
  content = content.replace(
    /<i\s+class="bi\s+bi-([a-z0-9-]+)"><\/i>/g,
    (match, iconName) => {
      const converted = convertIcon(iconName);
      if (converted) {
        changes.push({
          type: 'simple',
          old: match,
          new: converted,
          icon: iconName
        });
        return converted;
      }
      return match;
    }
  );

  // Padrão 2: Ícone com estilo inline
  // <i class="bi bi-heart" style="font-size: 24px; color: red;"></i>
  content = content.replace(
    /<i\s+class="bi\s+bi-([a-z0-9-]+)"([^>]*)\s+style="([^"]+)"([^>]*)><\/i>/g,
    (match, iconName, beforeStyle, styleContent, afterStyle) => {
      const size = extractFontSize(styleContent);
      const styles = extractStyles(styleContent);

      let styleStr = '';
      if (styles.color || styles.margin || styles.other) {
        const parts = [];
        if (styles.color) parts.push(`color: ${styles.color}`);
        if (styles.margin) parts.push(`margin: ${styles.margin}`);
        if (styles.other) parts.push(styles.other);
        styleStr = parts.join('; ');
      }

      const converted = convertIcon(iconName, {
        size,
        style: styleStr || undefined
      });

      if (converted) {
        changes.push({
          type: 'with-style',
          old: match,
          new: converted,
          icon: iconName,
          size,
          style: styleStr
        });
        return converted;
      }
      return match;
    }
  );

  // Padrão 3: Ícone com classes adicionais
  // <i class="bi bi-heart me-2 text-primary"></i>
  content = content.replace(
    /<i\s+class="bi\s+bi-([a-z0-9-]+)\s+([^"]+)"([^>]*)><\/i>/g,
    (match, iconName, additionalClasses, rest) => {
      // Verificar se já processamos (tem style="")
      if (rest.includes('style=')) {
        return match;
      }

      const converted = convertIcon(iconName, {
        class: additionalClasses.trim()
      });

      if (converted) {
        changes.push({
          type: 'with-classes',
          old: match,
          new: converted,
          icon: iconName,
          classes: additionalClasses.trim()
        });
        return converted;
      }
      return match;
    }
  );

  // Padrão 4: innerHTML dinâmico
  // innerHTML = '<i class="bi bi-check"></i> Sucesso'
  content = content.replace(
    /innerHTML\s*=\s*['"]([^'"]*<i\s+class="bi\s+bi-([a-z0-9-]+)"[^>]*><\/i>[^'"]*)['"]/g,
    (match, htmlContent, iconName) => {
      const converted = convertIcon(iconName);
      if (converted) {
        // Substituir o ícone dentro do innerHTML
        const newHtml = htmlContent.replace(
          /<i\s+class="bi\s+bi-[a-z0-9-]+"[^>]*><\/i>/,
          converted
        );
        const replacement = match.replace(htmlContent, newHtml);

        changes.push({
          type: 'innerHTML',
          old: match,
          new: replacement,
          icon: iconName
        });

        return replacement;
      }
      return match;
    }
  );

  // Se houve mudanças e não é dry-run, salvar arquivo
  if (!dryRun && changes.length > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
  }

  return {
    filePath,
    changes,
    hasChanges: changes.length > 0,
    originalContent,
    newContent: content
  };
}

// =============================================================================
// EXECUÇÃO PRINCIPAL
// =============================================================================

async function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--apply');
  const targetFiles = args.filter(a => !a.startsWith('--'));

  console.log('\n🔄 Migração Bootstrap Icons → Feather Icons');
  console.log('='.repeat(60));

  // Obter lista de arquivos
  let files;
  if (targetFiles.length > 0) {
    files = targetFiles;
    console.log(`📁 Arquivos especificados: ${files.length}`);
  } else {
    files = await glob('src/stories/**/*.stories.js');
    console.log(`📁 Arquivos encontrados: ${files.length}`);
  }

  console.log(`🔍 Modo: ${dryRun ? 'DRY-RUN (preview)' : 'APLICAR MUDANÇAS'}`);
  console.log('='.repeat(60) + '\n');

  // Processar arquivos
  const results = files.map(file => migrateFile(file, dryRun));

  // Gerar estatísticas
  const totalChanges = results.reduce((sum, r) => sum + r.changes.length, 0);
  const filesWithChanges = results.filter(r => r.hasChanges).length;
  const iconStats = {};

  results.forEach(r => {
    r.changes.forEach(c => {
      if (c.icon) {
        iconStats[c.icon] = (iconStats[c.icon] || 0) + 1;
      }
    });
  });

  // Exibir resumo
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DA MIGRAÇÃO');
  console.log('='.repeat(60) + '\n');

  console.log(`✅ Arquivos analisados: ${files.length}`);
  console.log(`📝 Arquivos com mudanças: ${filesWithChanges}`);
  console.log(`🔄 Total de substituições: ${totalChanges}`);
  console.log(`🎯 Ícones únicos migrados: ${Object.keys(iconStats).length}`);

  if (totalChanges > 0) {
    console.log('\n📈 Top 10 ícones mais substituídos:');
    const topIcons = Object.entries(iconStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    topIcons.forEach(([icon, count], index) => {
      console.log(`   ${index + 1}. bi-${icon}: ${count}x`);
    });
  }

  // Salvar relatório
  const report = {
    timestamp: new Date().toISOString(),
    mode: dryRun ? 'dry-run' : 'applied',
    summary: {
      totalFiles: files.length,
      filesWithChanges,
      totalChanges,
      uniqueIcons: Object.keys(iconStats).length
    },
    iconStats,
    details: results
      .filter(r => r.hasChanges)
      .map(r => ({
        filePath: r.filePath,
        changesCount: r.changes.length,
        changes: r.changes
      }))
  };

  fs.writeFileSync('migration-report.json', JSON.stringify(report, null, 2));
  console.log(`\n💾 Relatório salvo: migration-report.json`);

  if (dryRun && totalChanges > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('💡 PRÓXIMO PASSO');
    console.log('='.repeat(60));
    console.log('\nPara aplicar as mudanças, execute:');
    console.log('   node scripts/migrate-icons.js --apply\n');
  } else if (!dryRun && totalChanges > 0) {
    console.log('\n✅ Migração aplicada com sucesso!');
    console.log('\nPróximos passos:');
    console.log('1. Revisar mudanças: git diff');
    console.log('2. Testar Storybook: npm run storybook');
    console.log('3. Build: npm run build-storybook\n');
  }
}

// Executar
main().catch(error => {
  console.error('\n❌ ERRO:', error.message);
  console.error(error.stack);
  process.exit(1);
});
