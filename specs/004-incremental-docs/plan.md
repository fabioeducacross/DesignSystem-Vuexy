# Implementation Plan: Documentação Incremental de 118 Componentes

**Branch**: `feature/incremental-docs-118-components` | **Date**: 09/02/2026 | **Spec**: [Issue #4](https://github.com/fabioeducacross/DesignSystem-Vuexy/issues/4)
**Input**: Componentes educacross existentes sem documentação completa

## Summary

Criar documentação incremental (nível básico/intermediário) para 118 componentes educacross restantes após a replicação do padrão piloto. O objetivo é cobertura ampla com qualidade funcional, priorizando componentes por frequência de uso no educacross-frontoffice.

## Technical Context

**Language/Version**: JavaScript ES2020+ (Storybook 8.6.15 HTML-Vite)  
**Primary Dependencies**: Storybook, Bootstrap 5, Material Symbols, jQuery (vendors)  
**Storage**: Arquivos `.stories.js` em `src/stories/educacross-components-v2/`  
**Testing**: Playwright visual regression tests  
**Target Platform**: Web browser (Chrome, Firefox, Safari, Edge)  
**Project Type**: Design System documentation (Storybook)  
**Performance Goals**: Build time <30s, bundle <100MB, navegação fluida  
**Constraints**: Padrão piloto já está definido (EInput), manter consistência de iconografia (Material Symbols)  
**Scale/Scope**: 118 componentes, 33 categorias, ~118-354 stories (1-3 por componente)

## Constitution Check

*GATE: Passar antes de iniciar qualquer fase*

✅ **Padrão de Qualidade**: Piloto EInput estabelecido (4 stories completas)  
✅ **Estrutura**: Sidebar organizado em "Educacross Components V2" (123 componentes)  
✅ **Iconografia**: Material Symbols padronizado  
✅ **Build**: Validado sem erros (v1.2)  
⚠️ **Priorização**: DEVE seguir ordem por frequência de uso real  
⚠️ **Batch Processing**: Documentar 10-15 componentes por sprint  
⚠️ **Qualidade Gate**: Build + Playwright tests devem passar após cada batch

## Project Structure

### Documentation (this feature)

```text
specs/004-incremental-docs/
├── plan.md                    # Este arquivo
├── research.md                # Análise de priorização por uso
├── component-priority.md      # Lista ordenada dos 118 componentes
├── batch-schedule.md          # Planejamento de sprints
└── tasks.md                   # Tarefas detalhadas por batch
```

### Source Code (repository root)

```text
src/stories/educacross-components-v2/
├── Forms/
│   ├── EFormCheck.stories.js         # [Piloto - Issue #4]
│   ├── ESelect.stories.js            # [Piloto - Issue #4]
│   ├── ETextarea.stories.js          # [Piloto - Issue #4]
│   ├── FilterChip.stories.js         # [Piloto - Issue #4]
│   ├── ButtonWaitAction.stories.js   # [Incremental - Nível 2]
│   ├── MultipleDropdown.stories.js   # [Incremental - Nível 2]
│   └── SelectInfinityScroll.stories.js # [Incremental - Nível 1]
│
├── Navigation/                        # 12 componentes - Batch 1-2
│   ├── AppNavbar.stories.js          # [Incremental - Nível 3]
│   ├── Sidebar.stories.js            # [Incremental - Nível 3]
│   ├── Tab.stories.js                # [Incremental - Nível 2]
│   ├── TabRouter.stories.js          # [Incremental - Nível 2]
│   ├── AppCollapse.stories.js        # [Incremental - Nível 2]
│   ├── AppCollapseItem.stories.js    # [Incremental - Nível 1]
│   ├── AppLanguageSelector.stories.js # [Incremental - Nível 2]
│   ├── Breadcrumb.stories.js         # [Incremental - Nível 1]
│   ├── MainFooter.stories.js         # [Incremental - Nível 1]
│   ├── Pagination.stories.js         # [Incremental - Nível 2]
│   ├── ScrollToTop.stories.js        # [Incremental - Nível 1]
│   └── StepperHorizontal.stories.js  # [Incremental - Nível 2]
│
├── Modals/                           # 8 componentes - Batch 3
│   ├── CancelMission.stories.js      # [Piloto - Issue #4]
│   ├── EditProfileStudentNew.stories.js # [Piloto - Issue #4]
│   ├── ConfirmDialog.stories.js      # [Incremental - Nível 2]
│   ├── DeleteConfirmation.stories.js # [Incremental - Nível 2]
│   ├── ShareModal.stories.js         # [Incremental - Nível 2]
│   ├── UploadModal.stories.js        # [Incremental - Nível 2]
│   ├── FilterModal.stories.js        # [Incremental - Nível 2]
│   └── PreviewModal.stories.js       # [Incremental - Nível 2]
│
├── Feedback/                         # 14 componentes - Batch 4-5
│   ├── AlertMessage.stories.js       # [Incremental - Nível 2]
│   ├── Banner.stories.js             # [Incremental - Nível 2]
│   ├── EmptyState.stories.js         # [Incremental - Nível 2]
│   ├── ErrorBoundary.stories.js      # [Incremental - Nível 3]
│   ├── LoadingSpinner.stories.js     # [Incremental - Nível 2]
│   ├── Notification.stories.js       # [Incremental - Nível 2]
│   ├── ProgressBar.stories.js        # [Incremental - Nível 2]
│   ├── SkeletonLoader.stories.js     # [Incremental - Nível 2]
│   ├── StatusBadge.stories.js        # [Incremental - Nível 1]
│   ├── Toast.stories.js              # [Incremental - Nível 2]
│   ├── Tooltip.stories.js            # [Incremental - Nível 2]
│   ├── ValidationMessage.stories.js  # [Incremental - Nível 1]
│   ├── WarningMessage.stories.js     # [Incremental - Nível 1]
│   └── SuccessMessage.stories.js     # [Incremental - Nível 1]
│
├── Tables/                           # 6 componentes - Batch 6
│   ├── DataTable.stories.js          # [Incremental - Nível 3]
│   ├── ListTable.stories.js          # [Incremental - Nível 3]
│   ├── SortableTable.stories.js      # [Incremental - Nível 2]
│   ├── FilterableTable.stories.js    # [Incremental - Nível 2]
│   ├── ExpandableTable.stories.js    # [Incremental - Nível 2]
│   └── PaginatedTable.stories.js     # [Incremental - Nível 2]
│
├── Cards/                            # 6 componentes - Batch 7
│   ├── CardWithMedia.stories.js      # [Incremental - Nível 2]
│   ├── MediaCard.stories.js          # [Incremental - Nível 3]
│   ├── ProfileCard.stories.js        # [Incremental - Nível 2]
│   ├── StatsCard.stories.js          # [Incremental - Nível 2]
│   ├── CourseCard.stories.js         # [Incremental - Nível 2]
│   └── MissionCard.stories.js        # [Incremental - Nível 3]
│
├── Templates/                        # 13 componentes - Batch 8-10
│   ├── Template1.stories.js          # [Incremental - Nível 1]
│   ├── Template2.stories.js          # [Incremental - Nível 1]
│   ├── Template3.stories.js          # [Incremental - Nível 1]
│   ├── Template4.stories.js          # [Incremental - Nível 1]
│   ├── Template5.stories.js          # [Incremental - Nível 1]
│   ├── Template6.stories.js          # [Incremental - Nível 1]
│   ├── Template7.stories.js          # [Incremental - Nível 1]
│   ├── Template8.stories.js          # [Incremental - Nível 1]
│   ├── Template9.stories.js          # [Incremental - Nível 1]
│   ├── Template10.stories.js         # [Incremental - Nível 1]
│   ├── Template11.stories.js         # [Incremental - Nível 1]
│   ├── TemplateDefault.stories.js    # [Incremental - Nível 2]
│   └── ManageAccountPage.stories.js  # [Incremental - Nível 2]
│
└── [Mais 26 categorias...]          # Batch 11-20
    ├── Charts/ (4 componentes)
    ├── PDF/ (5 componentes)
    ├── Missions/ (3 componentes)
    ├── Media/ (3 componentes)
    ├── Legends/ (3 componentes)
    ├── Evaluations/ (3 componentes)
    ├── Layout/ (3 componentes)
    ├── Lists/ (3 componentes)
    └── [18 categorias single-component...]
```

**Structure Decision**: Organização por categoria com priorização baseada em:
1. **Frequência de uso** no educacross-frontoffice (dados de grep/search)
2. **Impacto visual** (componentes críticos de UI)
3. **Complexidade** (simples primeiro, complexos depois)

## Níveis de Documentação Incremental

### Nível 1 (Mínimo Viável) - ~40 componentes simples
**Stories**: 1 (Default apenas)  
**Tempo**: 15-30min por componente  
**Checklist**:
- [ ] Story Default existente funcional
- [ ] Props documentadas em argTypes básico
- [ ] Título: `'Educacross Components V2/{Category}/{Component}'`
- [ ] Ícones decorativos: Material Symbols
- [ ] Remover `'autodocs'` tag

**Exemplo**: StatusBadge, Breadcrumb, ScrollToTop

### Nível 2 (Básico+) - ~60 componentes médios
**Stories**: 2-3 (Default + Overview + 1 variação)  
**Tempo**: 45-90min por componente  
**Checklist**:
- [ ] Story Default funcional
- [ ] Story Overview com variantes principais
- [ ] 1 story adicional de estado importante
- [ ] Props documentadas com descrições
- [ ] Comentários JSDoc básicos
- [ ] Material Symbols padronizado

**Exemplo**: Tab, Pagination, AlertMessage, ConfirmDialog

### Nível 3 (Intermediário) - ~18 componentes complexos
**Stories**: 3-5 (Default + Overview + 2-3 use cases)  
**Tempo**: 2-4h por componente  
**Checklist**:
- [ ] Story Default funcional
- [ ] Story Overview com variantes
- [ ] 2-3 stories de casos de uso reais
- [ ] Props documentadas completamente
- [ ] Controles interativos úteis (argTypes avançado)
- [ ] Documentação de acessibilidade básica
- [ ] Material Symbols + validação WCAG

**Exemplo**: AppNavbar, Sidebar, DataTable, MediaCard, ErrorBoundary

## Estratégia de Batches

### Batch 1: Navigation Top (Sprint 1) - 6 componentes
- AppNavbar (Nível 3)
- Sidebar (Nível 3)
- Tab (Nível 2)
- TabRouter (Nível 2)
- Breadcrumb (Nível 1)
- MainFooter (Nível 1)

**Meta**: 14 stories | **Tempo estimado**: 1 semana

### Batch 2: Navigation Bottom (Sprint 2) - 6 componentes
- AppCollapse (Nível 2)
- AppCollapseItem (Nível 1)
- AppLanguageSelector (Nível 2)
- Pagination (Nível 2)
- ScrollToTop (Nível 1)
- StepperHorizontal (Nível 2)

**Meta**: 11 stories | **Tempo estimado**: 4-5 dias

### Batch 3-4: Feedback (Sprint 3-4) - 14 componentes
[Dividir em 2 batches de 7 componentes]

**Meta**: 28 stories | **Tempo estimado**: 2 semanas

### Batch 5-6: Tables + Cards (Sprint 5-6) - 12 componentes
**Meta**: 30 stories | **Tempo estimado**: 2 semanas

### Batch 7-20: Restante (Sprint 7-20)
**Meta**: ~100 stories | **Tempo estimado**: 8-10 semanas

## Checklist por Batch

### Pré-requisitos
- [ ] Piloto (Issue #4) completo: EInput, EFormCheck, ESelect, ETextarea, FilterChip
- [ ] Branch criada: `feature/incremental-docs-118-components`
- [ ] Storybook rodando sem erros em v1.2

### Durante o Batch
- [ ] Listar componentes do batch por prioridade
- [ ] Para cada componente:
  - [ ] Ler código-fonte em `educacross-frontoffice/src/components/`
  - [ ] Identificar props principais
  - [ ] Identificar estados/variações
  - [ ] Criar stories conforme nível (1, 2 ou 3)
  - [ ] Validar Material Symbols
  - [ ] Testar renderização no Storybook
- [ ] Build Storybook: `npm run build-storybook`
- [ ] Playwright tests: `npx playwright test`
- [ ] Commit por componente ou grupo (max 3 componentes)

### Pós-Batch
- [ ] Atualizar `agent_helpers/tarefas.md`
- [ ] Atualizar `specs/004-incremental-docs/batch-schedule.md`
- [ ] Push para branch
- [ ] Criar PR parcial (opcional) ou continuar

### Gate Final
- [ ] 118 componentes documentados
- [ ] Build: 0 erros
- [ ] Playwright: todos os testes passando
- [ ] Sidebar navegável e organizado
- [ ] Merge para v1.2

## Complexity Tracking

| Decisão | Justificativa | Alternativa Rejeitada |
|---------|---------------|----------------------|
| Documentação incremental vs piloto completo | Balancear cobertura ampla com prazo viável. Piloto (4 stories) demora muito para 118 componentes (472 stories = 4-6 meses). | Piloto completo: 472 stories em 20+ semanas vs Incremental: 118-354 stories em 10-12 semanas |
| Priorização por uso real | Componentes críticos primeiro, templates depois. AppNavbar e Sidebar são usados em toda aplicação, Templates são específicos. | Ordem alfabética ou por categoria: não considera importância funcional |
| Níveis 1-2-3 | Permite escalar rapidamente (Nível 1) e aprofundar depois (upgrade para Nível 2-3 conforme demanda). | Nível único: inflexível e ineficiente para componentes simples vs complexos |
| Batch de 10-15 componentes | Permite validação frequente (build + tests) e entregas incrementais. | Batch grande (50+ componentes): risco de regressão, difícil debug |

## Success Metrics

### Quantitativas
- ✅ 118 componentes documentados
- ✅ 118-354 stories criadas (média 1.5-3 por componente)
- ✅ Build time <30s
- ✅ 0 erros de build
- ✅ Todos os testes Playwright passando

### Qualitativas
- ✅ Sidebar navegável e intuitivo
- ✅ Componentes críticos (AppNavbar, Sidebar, DataTable) com Nível 3
- ✅ Componentes médios (Modals, Forms restantes) com Nível 2
- ✅ Componentes simples (Badges, Dividers) com Nível 1
- ✅ Iconografia Material Symbols consistente
- ✅ Base sólida para futuras expansões

## Timeline

**Início**: Após conclusão do Issue #4 (Piloto - 4 componentes)  
**Duração**: 10-12 semanas (20 batches × 2-3 dias)  
**Conclusão**: ~Abril 2026

### Roadmap
- **Semana 1-2**: Navigation (12 componentes) - 2 batches
- **Semana 3-4**: Feedback (14 componentes) - 2 batches
- **Semana 5-6**: Tables + Cards (12 componentes) - 2 batches
- **Semana 7-8**: Templates (13 componentes) - 3 batches
- **Semana 9-12**: Restante (67 componentes) - 11 batches

## Next Steps

1. Criar `specs/004-incremental-docs/research.md` com análise de uso real
2. Criar `specs/004-incremental-docs/component-priority.md` com lista ordenada
3. Criar `specs/004-incremental-docs/batch-schedule.md` com planejamento detalhado
4. Criar branch: `git checkout -b feature/incremental-docs-118-components`
5. Começar Batch 1: Navigation Top (6 componentes)
