# 📚 Replicar padrão piloto EInput para TODOS os 122 componentes restantes

**Labels:** `enhancement`, `documentation`, `epic`, `priority-high`

---

## Objetivo
Replicar o padrão de documentação completo do EInput (piloto v1.2) para TODOS os 122 componentes educacross restantes.

## Meta Global:
**123 componentes × 4 stories = 492 stories totais**
- ✅ 1 componente completo (EInput - piloto)
- 🎯 122 componentes a documentar

## Estrutura padrão por componente:

### 1. 📖 Documentation Story
- Feature cards com Material Symbols (6 cards)
- Tabs de código multi-framework (Vue 2, Vue 3, React, Vanilla)
- Seções técnicas completas

### 2. 🎮 Playground Story
- Controles interativos (argTypes)
- Estados principais
- Variações de props

### 3. 💼 Use Cases Story
- Casos de uso reais do educacross-frontoffice
- Exemplos práticos com contexto
- Best practices

### 4. ♿ Accessibility Story
- 4 seções padronizadas com Material Symbols:
  - Keyboard Navigation (keyboard)
  - Screen Readers (label)
  - Color Contrast (palette)
  - Audio Feedback (volume_up)

---

## 📊 Roadmap por Fase:

### Fase 1: Forms (4 componentes) - Sprint 1
- [ ] EFormCheck
- [ ] ESelect
- [ ] ETextarea
- [ ] FilterChip

**Meta:** 16 stories (4×4)

### Fase 2: Modals (8 componentes) - Sprint 2
- [ ] CancelMission
- [ ] EditProfileStudentNew
- [ ] ConfirmDialog
- [ ] DeleteConfirmation
- [ ] ShareModal
- [ ] UploadModal
- [ ] FilterModal
- [ ] PreviewModal

**Meta:** 32 stories (8×4)

### Fase 3: Navigation (12 componentes) - Sprint 3-4
- [ ] AppNavbar
- [ ] Sidebar
- [ ] Tab / TabRouter
- [ ] AppCollapse / AppCollapseItem
- [ ] AppLanguageSelector
- [ ] Breadcrumb
- [ ] MainFooter
- [ ] Pagination
- [ ] ScrollToTop
- [ ] StepperHorizontal

**Meta:** 48 stories (12×4)

### Fase 4: Feedback (14 componentes) - Sprint 5-6
- [ ] AlertMessage
- [ ] Banner
- [ ] EmptyState
- [ ] ErrorBoundary
- [ ] LoadingSpinner
- [ ] Notification
- [ ] ProgressBar
- [ ] SkeletonLoader
- [ ] StatusBadge
- [ ] Toast
- [ ] Tooltip
- [ ] ValidationMessage
- [ ] WarningMessage
- [ ] SuccessMessage

**Meta:** 56 stories (14×4)

### Fase 5: Tables (6 componentes) - Sprint 7
- [ ] DataTable
- [ ] ListTable
- [ ] SortableTable
- [ ] FilterableTable
- [ ] ExpandableTable
- [ ] PaginatedTable

**Meta:** 24 stories (6×4)

### Fases 6-15: Continuar com as 28 categorias restantes
- Cards (6), Charts (4), PDF (5), Templates (13), etc.

---

## ✅ Checklist por Componente:
- [ ] Remover `'autodocs'` tag
- [ ] Criar Documentation story com tabs multi-framework
- [ ] Criar Playground story com controles
- [ ] Criar Use Cases story com exemplos reais
- [ ] Criar Accessibility story com 4 seções padrão
- [ ] Validar Material Symbols em todos os ícones decorativos
- [ ] Rodar Playwright tests
- [ ] Build Storybook sem erros
- [ ] Atualizar `agent_helpers/tarefas.md`

---

## 🌿 Estratégia de Branch:

### Branch Única com Commits Incrementais
```bash
git checkout v1.2
git checkout -b feature/pilot-replication-all-components

# Trabalhar por fases, commit após cada componente
git commit -m "feat(EFormCheck): adiciona 4 stories padrão piloto"
git commit -m "feat(ESelect): adiciona 4 stories padrão piloto"
git commit -m "feat(ETextarea): adiciona 4 stories padrão piloto"
git commit -m "feat(FilterChip): adiciona 4 stories padrão piloto"

# Fase 1 completa - validar build
npm run build-storybook

# Continuar com próximas fases...
```

---

## 📈 Progresso Geral:
- [x] Fase 0: Piloto EInput (1/123) - ✅ COMPLETO
- [ ] Fase 1: Forms (5/123) - 4%
- [ ] Fase 2: Modals (13/123) - 10%
- [ ] Fase 3: Navigation (25/123) - 20%
- [ ] Fase 4: Feedback (39/123) - 31%
- [ ] Fase 5: Tables (45/123) - 36%
- [ ] Fases 6-15: Restante (123/123) - 100%

---

## 🎯 Critérios de Conclusão:
- ✅ 492 stories criadas (123 componentes × 4 stories)
- ✅ Build Storybook: 0 erros
- ✅ Playwright: todos os testes passando
- ✅ Documentação completa e padronizada
- ✅ Iconografia unificada (Material Symbols)
- ✅ Sidebar organizado (33 categorias)

---

## 📚 Referências:
- Piloto: `src/stories/educacross-components-v2/Forms / EInput.stories.js`
- Template: `agent_helpers/TEMPLATE_COMPONENT.stories.js`
- Loader patterns: `agent_helpers/LOADER_PATTERNS.md`
- Task tracking: `agent_helpers/tarefas.md`

---

## 📅 Timeline Estimado:
- **Fase 1 (Forms):** 1 semana
- **Fase 2 (Modals):** 1-2 semanas
- **Fase 3 (Navigation):** 2-3 semanas
- **Fase 4 (Feedback):** 2-3 semanas
- **Fase 5 (Tables):** 1 semana
- **Fases 6-15 (Restante):** 6-8 semanas

**Total estimado:** 13-18 semanas para conclusão completa

---

## 🚀 Como criar esta issue:

1. Acesse: https://github.com/fabioeducacross/DesignSystem-Vuexy/issues/new
2. Cole este conteúdo (sem o título "Como criar esta issue")
3. Adicione labels: `enhancement`, `documentation`, `epic`, `priority-high`
4. Atribua a você mesmo
5. Crie a issue

Depois crie a branch:
```bash
git checkout v1.2
git checkout -b feature/pilot-replication-all-components
git push -u origin feature/pilot-replication-all-components
```
