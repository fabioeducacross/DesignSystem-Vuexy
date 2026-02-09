# 🤖 Automação GitHub Actions: Documentação de 118 Componentes Restantes

**Labels**: `enhancement`, `automation`, `documentation`, `priority-high`  
**Milestone**: v1.2  
**Assignees**: @fabioeducacross

---

## 📋 Contexto

Após a conclusão do **Issue #4** (replicação do padrão piloto para 4 componentes: EFormCheck, ESelect, ETextarea, FilterChip), temos **118 componentes educacross restantes** que precisam de documentação.

**Problema**: Documentar manualmente 118 componentes no padrão piloto (4 stories cada = 472 stories totais) levaria **4-6 meses** de trabalho intensivo.

**Solução**: Criar pipeline de automação via **GitHub Actions** para gerar documentação incremental em 3 níveis de qualidade, priorizando componentes por frequência de uso real no educacross-frontoffice.

## 🎯 Objetivo

Criar workflow no GitHub Actions que:

1. **Analisa** código-fonte dos componentes em `educacross-frontoffice/src/components/`
2. **Classifica** componentes em 3 níveis (Simples/Médio/Complexo)
3. **Gera** stories automaticamente:
   - **Nível 1** (40 componentes): 1 story Default
   - **Nível 2** (60 componentes): 2-3 stories (Default + Overview + 1 variação)
   - **Nível 3** (18 componentes): 3-5 stories (padrão piloto completo)
4. **Valida** build + Playwright tests
5. **Cria** PR automaticamente com batch de 10-15 componentes

## 📊 Escopo

### Componentes Alvo (118 total)

#### Prioridade Alta (40 componentes)
- **Navigation** (12): AppNavbar, Sidebar, Tab, TabRouter, AppCollapse, Breadcrumb, Pagination, etc.
- **Feedback** (14): AlertMessage, Banner, EmptyState, LoadingSpinner, ProgressBar, Toast, etc.
- **Forms** (3): ButtonWaitAction, MultipleDropdown, SelectInfinityScroll
- **Modals** (6): ConfirmDialog, DeleteConfirmation, ShareModal, UploadModal, FilterModal, PreviewModal
- **Tables** (6): DataTable, ListTable, SortableTable, FilterableTable, ExpandableTable, PaginatedTable

#### Prioridade Média (45 componentes)
- **Cards** (6): CardWithMedia, MediaCard, ProfileCard, StatsCard, CourseCard, MissionCard
- **Charts** (4): BarChart, LineChart, PieChart, RadarChart
- **PDF** (5): PDFViewer, PDFGenerator, PDFPreview, PDFDownload, PDFThumbnail
- **Missions** (3): MissionCard, MissionDetails, MissionProgress
- **Media** (3): VideoPlayer, AudioPlayer, ImageGallery
- [+12 categorias menores]

#### Prioridade Baixa (33 componentes)
- **Templates** (13): Template1-11, TemplateDefault, ManageAccountPage
- **Single-component categories** (20): Avatars, Banners, Calendars, Dialogs, etc.

## 🤖 Workflow Proposto

### GitHub Actions Workflow

```yaml
name: Auto-Generate Component Docs

on:
  workflow_dispatch:
    inputs:
      batch_number:
        description: 'Batch number (1-20)'
        required: true
        type: number
      priority_level:
        description: 'Priority level'
        required: true
        type: choice
        options:
          - high
          - medium
          - low

jobs:
  generate-docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: true
      
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Generate component docs
        run: |
          node scripts/generate-component-docs.js \
            --batch ${{ inputs.batch_number }} \
            --priority ${{ inputs.priority_level }}
      
      - name: Build Storybook
        run: npm run build-storybook
      
      - name: Run Playwright tests
        run: npx playwright test
      
      - name: Create PR
        uses: peter-evans/create-pull-request@v5
        with:
          branch: auto-docs-batch-${{ inputs.batch_number }}
          title: "📚 Docs Batch ${{ inputs.batch_number }}: Component Documentation"
          body: |
            🤖 Automated component documentation generation
            
            - **Batch**: ${{ inputs.batch_number }}
            - **Priority**: ${{ inputs.priority_level }}
            - **Components**: See file changes
            
            **Validation**:
            - [x] Build passes
            - [x] Playwright tests pass
            - [ ] Manual review pending
            
            **Checklist**:
            - [ ] Stories render correctly
            - [ ] Props documented
            - [ ] Material Symbols icons consistent
            - [ ] Examples functional
          labels: |
            auto-generated
            documentation
            ${{ inputs.priority_level }}-priority
```

### Script de Geração

```javascript
// scripts/generate-component-docs.js
const fs = require('fs');
const path = require('path');
const { parse } = require('@vue/compiler-sfc');

class ComponentDocGenerator {
  constructor(componentPath, level) {
    this.componentPath = componentPath;
    this.level = level; // 1, 2, or 3
    this.componentName = path.basename(componentPath, '.vue');
    this.category = this.detectCategory();
  }
  
  async analyze() {
    const source = fs.readFileSync(this.componentPath, 'utf-8');
    const { descriptor } = parse(source);
    
    // Extract props
    this.props = this.extractProps(descriptor.script);
    
    // Extract events
    this.events = this.extractEvents(descriptor.script);
    
    // Extract slots
    this.slots = this.extractSlots(descriptor.template);
    
    // Detect complexity
    this.complexity = this.calculateComplexity();
  }
  
  generateLevel1() {
    return `
import { createDocPage } from '../_helpers/docTemplate.js';

export default {
  title: 'Educacross Components V2/${this.category}/${this.componentName}',
  tags: [],
  parameters: { layout: 'padded' }
};

export const Default = {
  render: () => \`
    <div class="${this.componentName.toLowerCase()}">
      ${this.generateBasicExample()}
    </div>
  \`
};
    `;
  }
  
  generateLevel2() {
    return `
import { createDocPage, createExampleCard } from '../_helpers/docTemplate.js';

export default {
  title: 'Educacross Components V2/${this.category}/${this.componentName}',
  tags: [],
  parameters: { layout: 'padded' },
  argTypes: ${JSON.stringify(this.generateArgTypes(), null, 2)}
};

export const Default = {
  args: ${JSON.stringify(this.generateDefaultArgs(), null, 2)},
  render: (args) => this.generateRenderFunction()
};

export const Overview = {
  render: () => this.generateOverview()
};

export const States = {
  render: () => this.generateStates()
};
    `;
  }
  
  generateLevel3() {
    // Full pilot pattern: Documentation, Playground, UseCases, Accessibility
    return this.generateFullPilotPattern();
  }
  
  detectCategory() {
    const categories = {
      'forms': ['Input', 'Select', 'Textarea', 'Checkbox', 'Radio', 'Button'],
      'navigation': ['Navbar', 'Sidebar', 'Tab', 'Breadcrumb', 'Pagination'],
      'feedback': ['Alert', 'Toast', 'Notification', 'Banner', 'Progress'],
      'modals': ['Modal', 'Dialog', 'Popup', 'Drawer'],
      'tables': ['Table', 'List', 'Grid'],
      'cards': ['Card', 'Media'],
      'charts': ['Chart', 'Graph'],
    };
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(kw => this.componentName.includes(kw))) {
        return category.charAt(0).toUpperCase() + category.slice(1);
      }
    }
    
    return 'Miscellaneous';
  }
  
  write(outputPath) {
    let content;
    
    switch(this.level) {
      case 1:
        content = this.generateLevel1();
        break;
      case 2:
        content = this.generateLevel2();
        break;
      case 3:
        content = this.generateLevel3();
        break;
      default:
        throw new Error(\`Invalid level: \${this.level}\`);
    }
    
    fs.writeFileSync(outputPath, content, 'utf-8');
    console.log(\`✅ Generated \${this.componentName} (Level \${this.level}): \${outputPath}\`);
  }
}

// Main execution
const batch = parseInt(process.argv[3]);
const priority = process.argv[5];

const components = loadBatch(batch, priority);

for (const component of components) {
  const generator = new ComponentDocGenerator(component.path, component.level);
  await generator.analyze();
  
  const outputPath = path.join(
    __dirname,
    '../src/stories/educacross-components-v2',
    component.category,
    \`\${component.name}.stories.js\`
  );
  
  generator.write(outputPath);
}

console.log(\`\n✨ Batch \${batch} completed: \${components.length} components generated\`);
```

## 📈 Benefícios

### Velocidade
- **Manual**: 4-6 meses (472 stories × 2-4h cada)
- **Automatizado**: 10-12 semanas (script + review)
- **Ganho**: **60-75% de redução de tempo**

### Consistência
- ✅ Material Symbols padronizado
- ✅ Estrutura de stories uniforme
- ✅ Props documentadas automaticamente
- ✅ Exemplos multi-framework gerados

### Qualidade
- ✅ Build validado automaticamente
- ✅ Playwright tests em cada batch
- ✅ Review manual focado em casos de uso
- ✅ Rollback fácil se batch falhar

### Escalabilidade
- ✅ Adicionar novos componentes facilmente
- ✅ Upgrade de Nível 1 para 2/3 sob demanda
- ✅ Re-gerar docs após mudanças no componente
- ✅ CI/CD pronto para futuras expansões

## 🔧 Requisitos Técnicos

### Ferramentas
- **Node.js 18+**: Para scripts de geração
- **@vue/compiler-sfc**: Parse de componentes Vue
- **Storybook CLI**: Build e validação
- **Playwright**: Testes visuais
- **GitHub Actions**: Orquestração

### Inputs
- `educacross-frontoffice/src/components/` (código-fonte)
- `specs/004-incremental-docs/component-priority.md` (ordem de prioridade)
- `src/stories/educacross-components-v2/EInput.stories.js` (template Nível 3)

### Outputs
- `src/stories/educacross-components-v2/{Category}/{Component}.stories.js` (stories geradas)
- `storybook-static/` (build validado)
- PR com batch de 10-15 componentes

## 📋 Checklist de Implementação

### Fase 1: Setup (Sprint 1) - 1 semana
- [ ] Criar `scripts/generate-component-docs.js`
- [ ] Criar `.github/workflows/auto-generate-docs.yml`
- [ ] Testar geração de 1 componente Nível 1 (ex: StatusBadge)
- [ ] Testar geração de 1 componente Nível 2 (ex: Tab)
- [ ] Testar geração de 1 componente Nível 3 (ex: AppNavbar)
- [ ] Validar build + Playwright após geração
- [ ] Documentar processo em `specs/005-automation-github-actions/AUTOMATION.md`

### Fase 2: Batch Piloto (Sprint 2) - 1 semana
- [ ] Executar Batch 1: Navigation Top (6 componentes)
- [ ] Review manual das stories geradas
- [ ] Ajustar script baseado em feedback
- [ ] Merge do PR de Batch 1
- [ ] Atualizar métricas de qualidade

### Fase 3: Produção (Sprint 3-14) - 10 semanas
- [ ] Executar Batch 2-20 automaticamente
- [ ] Review e merge de cada batch
- [ ] Monitorar build time e tamanho do bundle
- [ ] Atualizar `agent_helpers/ISSUE_4_PROGRESS.md` a cada batch

### Fase 4: Finalização (Sprint 15) - 1 semana
- [ ] Validação final de todos os 118 componentes
- [ ] Build completo sem erros
- [ ] Playwright tests 100% passando
- [ ] Documentação de manutenção
- [ ] Merge final para v1.2

## 🎯 Critérios de Sucesso

### Quantitativos
- ✅ 118 componentes documentados
- ✅ 118-354 stories geradas
- ✅ Build time <30s
- ✅ Bundle size <100MB
- ✅ 0 erros de build
- ✅ 100% Playwright tests passando

### Qualitativos
- ✅ Sidebar navegável e organizado
- ✅ Iconografia Material Symbols consistente
- ✅ Props documentadas completamente
- ✅ Exemplos funcionais em todos os níveis
- ✅ Base sólida para expansões futuras

## 📊 Métricas de Qualidade

### Por Nível
- **Nível 1**: 1 story × 40 componentes = 40 stories (15-30min cada)
- **Nível 2**: 2.5 stories × 60 componentes = 150 stories (45-90min cada)
- **Nível 3**: 4 stories × 18 componentes = 72 stories (2-4h cada)

**Total**: **262 stories** (vs 472 se todos fossem Nível 3)

### Tempo Estimado
- **Manual**: 472 stories × 2h = **944 horas** (6 meses em tempo integral)
- **Automatizado**: 
  - Setup: 80 horas (2 semanas)
  - Execução: 200 horas (10 semanas - review + ajustes)
  - **Total**: **280 horas** (2.5 meses)
- **Economia**: **664 horas** (70% de redução)

## 🔗 Referências

- **Issue #4**: [Replicação Padrão Piloto](https://github.com/fabioeducacross/DesignSystem-Vuexy/issues/4)
- **Plan**: `specs/004-incremental-docs/plan.md`
- **Template Nível 3**: `src/stories/educacross-components-v2/EInput.stories.js`
- **Progress**: `agent_helpers/ISSUE_4_PROGRESS.md`

## 💡 Próximos Passos

1. **Aprovar** esta issue
2. **Criar** branch `feature/automation-github-actions`
3. **Desenvolver** scripts de geração (Fase 1)
4. **Testar** com batch piloto (Fase 2)
5. **Executar** produção (Fase 3)
6. **Validar** e merge final (Fase 4)

---

**Estimativa Total**: 12 semanas  
**Início Proposto**: Após conclusão do Issue #4  
**Conclusão Esperada**: Abril 2026  
**ROI**: 70% de redução de tempo vs abordagem manual

**Criada por**: AI Agent (Fullstack Programmer Mode)  
**Data**: 09/02/2026
