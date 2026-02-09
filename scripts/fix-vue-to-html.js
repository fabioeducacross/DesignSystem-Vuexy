/**
 * Script para converter componentes Vue/BootstrapVue para HTML puro
 * Corrige automaticamente os 72 componentes com problemas de extração
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '..', 'src', 'stories', 'educacross-components-v2');

// Mapeamento de tags Vue para HTML
const tagReplacements = [
  // BootstrapVue Grid
  [/<b-row([^>]*)>/g, '<div class="row"$1>'],
  [/<\/b-row>/g, '</div>'],
  [/<b-col([^>]*)>/g, '<div class="col"$1>'],
  [/<\/b-col>/g, '</div>'],
  
  // BootstrapVue Components
  [/<b-button([^>]*)>/g, '<button class="btn"$1>'],
  [/<\/b-button>/g, '</button>'],
  [/<b-card([^>]*)>/g, '<div class="card"$1>'],
  [/<\/b-card>/g, '</div>'],
  [/<b-card-body([^>]*)>/g, '<div class="card-body"$1>'],
  [/<\/b-card-body>/g, '</div>'],
  [/<b-card-header([^>]*)>/g, '<div class="card-header"$1>'],
  [/<\/b-card-header>/g, '</div>'],
  [/<b-card-footer([^>]*)>/g, '<div class="card-footer"$1>'],
  [/<\/b-card-footer>/g, '</div>'],
  [/<b-card-title([^>]*)>/g, '<h5 class="card-title"$1>'],
  [/<\/b-card-title>/g, '</h5>'],
  [/<b-card-text([^>]*)>/g, '<p class="card-text"$1>'],
  [/<\/b-card-text>/g, '</p>'],
  
  // Form components
  [/<b-form([^>]*)>/g, '<form$1>'],
  [/<\/b-form>/g, '</form>'],
  [/<b-form-group([^>]*)>/g, '<div class="mb-3"$1>'],
  [/<\/b-form-group>/g, '</div>'],
  [/<b-form-input([^>]*)>/g, '<input class="form-control"$1>'],
  [/<\/b-form-input>/g, ''],
  [/<b-form-textarea([^>]*)\/>/g, '<textarea class="form-control"$1></textarea>'],
  [/<b-form-textarea([^>]*)>/g, '<textarea class="form-control"$1>'],
  [/<\/b-form-textarea>/g, '</textarea>'],
  [/<b-form-select([^>]*)>/g, '<select class="form-select"$1>'],
  [/<\/b-form-select>/g, '</select>'],
  [/<b-form-checkbox([^>]*)>/g, '<div class="form-check"$1><input type="checkbox" class="form-check-input">'],
  [/<\/b-form-checkbox>/g, '</div>'],
  [/<b-form-radio([^>]*)>/g, '<div class="form-check"$1><input type="radio" class="form-check-input">'],
  [/<\/b-form-radio>/g, '</div>'],
  
  // Other components
  [/<b-spinner([^>]*)\/>/g, '<div class="spinner-border spinner-border-sm"$1></div>'],
  [/<b-spinner([^>]*)>/g, '<div class="spinner-border spinner-border-sm"$1>'],
  [/<\/b-spinner>/g, '</div>'],
  [/<b-badge([^>]*)>/g, '<span class="badge"$1>'],
  [/<\/b-badge>/g, '</span>'],
  [/<b-alert([^>]*)>/g, '<div class="alert"$1>'],
  [/<\/b-alert>/g, '</div>'],
  [/<b-modal([^>]*)>/g, '<div class="modal"$1><div class="modal-dialog"><div class="modal-content">'],
  [/<\/b-modal>/g, '</div></div></div>'],
  [/<b-table([^>]*)>/g, '<table class="table"$1>'],
  [/<\/b-table>/g, '</table>'],
  [/<b-pagination([^>]*)>/g, '<nav><ul class="pagination"$1>'],
  [/<\/b-pagination>/g, '</ul></nav>'],
  [/<b-progress([^>]*)>/g, '<div class="progress"$1>'],
  [/<\/b-progress>/g, '</div>'],
  [/<b-progress-bar([^>]*)>/g, '<div class="progress-bar"$1>'],
  [/<\/b-progress-bar>/g, '</div>'],
  [/<b-img([^>]*)\/>/g, '<img$1>'],
  [/<b-img([^>]*)>/g, '<img$1>'],
  [/<\/b-img>/g, ''],
  [/<b-link([^>]*)>/g, '<a$1>'],
  [/<\/b-link>/g, '</a>'],
  [/<b-nav([^>]*)>/g, '<nav$1>'],
  [/<\/b-nav>/g, '</nav>'],
  [/<b-nav-item([^>]*)>/g, '<a class="nav-link"$1>'],
  [/<\/b-nav-item>/g, '</a>'],
  [/<b-dropdown([^>]*)>/g, '<div class="dropdown"$1>'],
  [/<\/b-dropdown>/g, '</div>'],
  
  // Table elements
  [/<b-thead([^>]*)>/g, '<thead$1>'],
  [/<\/b-thead>/g, '</thead>'],
  [/<b-tbody([^>]*)>/g, '<tbody$1>'],
  [/<\/b-tbody>/g, '</tbody>'],
  [/<b-tr([^>]*)>/g, '<tr$1>'],
  [/<\/b-tr>/g, '</tr>'],
  [/<b-th([^>]*)>/g, '<th$1>'],
  [/<\/b-th>/g, '</th>'],
  [/<b-td([^>]*)>/g, '<td$1>'],
  [/<\/b-td>/g, '</td>'],
  
  // Input group
  [/<b-input-group([^>]*)>/g, '<div class="input-group"$1>'],
  [/<\/b-input-group>/g, '</div>'],
  [/<b-input-group-text([^>]*)>/g, '<span class="input-group-text"$1>'],
  [/<\/b-input-group-text>/g, '</span>'],
  
  // Media and sidebar
  [/<b-media([^>]*)>/g, '<div class="d-flex"$1>'],
  [/<\/b-media>/g, '</div>'],
  [/<b-sidebar([^>]*)>/g, '<aside class="sidebar"$1>'],
  [/<\/b-sidebar>/g, '</aside>'],
  
  // Skeleton
  [/<b-skeleton-wrapper([^>]*)>/g, '<div class="placeholder-glow"$1>'],
  [/<\/b-skeleton-wrapper>/g, '</div>'],
  [/<b-skeleton([^>]*)\/>/g, '<span class="placeholder col-12"></span>'],
  [/<b-skeleton([^>]*)>/g, '<span class="placeholder col-12"$1>'],
  [/<\/b-skeleton>/g, '</span>'],
  [/<b-dropdown-item([^>]*)>/g, '<a class="dropdown-item"$1>'],
  [/<\/b-dropdown-item>/g, '</a>'],
  [/<b-tabs([^>]*)>/g, '<div class="nav nav-tabs"$1>'],
  [/<\/b-tabs>/g, '</div>'],
  [/<b-tab([^>]*)>/g, '<div class="tab-pane"$1>'],
  [/<\/b-tab>/g, '</div>'],
  [/<b-collapse([^>]*)>/g, '<div class="collapse"$1>'],
  [/<\/b-collapse>/g, '</div>'],
  [/<b-avatar([^>]*)>/g, '<div class="avatar rounded-circle"$1>'],
  [/<\/b-avatar>/g, '</div>'],
  [/<b-overlay([^>]*)>/g, '<div class="position-relative"$1>'],
  [/<\/b-overlay>/g, '</div>'],
  [/<b-skeleton([^>]*)\/>/g, '<div class="placeholder-glow"><span class="placeholder col-12"></span></div>'],
  [/<b-tooltip([^>]*)>/g, '<!-- tooltip -->'],
  [/<\/b-tooltip>/g, ''],
  [/<b-popover([^>]*)>/g, '<!-- popover -->'],
  [/<\/b-popover>/g, ''],
  
  // Vue directives (remove them as they don't work in plain HTML)
  [/\s+v-if="[^"]*"/g, ''],
  [/\s+v-else-if="[^"]*"/g, ''],
  [/\s+v-else/g, ''],
  [/\s+v-show="[^"]*"/g, ''],
  [/\s+v-for="[^"]*"/g, ''],
  [/\s+v-model="[^"]*"/g, ''],
  [/\s+v-bind:[^=]+="[^"]*"/g, ''],
  [/\s+v-on:[^=]+="[^"]*"/g, ''],
  [/\s+@[a-z-]+="[^"]*"/g, ''],
  [/\s+@[a-z-]+\.[a-z]+="[^"]*"/g, ''],
  [/\s+:[a-z-]+="[^"]*"/g, ''],
  [/\s+#[a-z-]+/g, ''],
  [/\s+ref="[^"]*"/g, ''],
  [/\s+key="[^"]*"/g, ''],
  
  // Clean up duplicate class attributes
  [/class=""\s+class="/g, 'class="'],
  [/class="([^"]*)"\s+class="([^"]*)"/g, 'class="$1 $2"'],
  
  // Fix variant attributes to classes
  [/variant="primary"/g, 'class="btn-primary"'],
  [/variant="secondary"/g, 'class="btn-secondary"'],
  [/variant="success"/g, 'class="btn-success"'],
  [/variant="danger"/g, 'class="btn-danger"'],
  [/variant="warning"/g, 'class="btn-warning"'],
  [/variant="info"/g, 'class="btn-info"'],
  [/variant="light"/g, 'class="btn-light"'],
  [/variant="dark"/g, 'class="btn-dark"'],
  [/variant="outline-primary"/g, 'class="btn-outline-primary"'],
  [/variant="outline-secondary"/g, 'class="btn-outline-secondary"'],
  [/variant="link"/g, 'class="btn-link"'],
  
  // Remove remaining Vue-specific attributes
  [/\s+small(?=[\s>])/g, ''],
  [/\s+disabled=""/g, ' disabled'],
  [/\s+readonly=""/g, ' readonly'],
];

// Contador de arquivos processados
let processedCount = 0;
let fixedCount = 0;

// Processar cada arquivo
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.stories.js'));

console.log(`\n🔍 Analisando ${files.length} arquivos...\n`);

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Aplicar todas as substituições
  tagReplacements.forEach(([pattern, replacement]) => {
    content = content.replace(pattern, replacement);
  });
  
  // Verificar se houve mudanças
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${file}`);
    fixedCount++;
  }
  
  processedCount++;
});

console.log(`\n========================================`);
console.log(`📊 RESULTADO:`);
console.log(`   Arquivos analisados: ${processedCount}`);
console.log(`   Arquivos corrigidos: ${fixedCount}`);
console.log(`========================================\n`);
