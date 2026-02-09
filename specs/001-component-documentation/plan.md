# Implementation Plan: Component Documentation Template Application

**Branch**: `v1.1` | **Date**: 2026-02-07 | **Updated**: 2026-02-08 | **Spec**: [spec.md](./spec.md)

## Summary

Apply **Opção A - Estratégia Híbrida** to **117 remaining Educacross V2 components** (123 total - 6 completed). Each component receives **4 stories essenciais**:

1. **Documentation** - Template 1 JavaScript funcional (hero, stats, exemplos, props, features)
2. **Playground** - Controls interativos para todas as props
3. **Use Cases** - 2-4 cenários reais do contexto Educacross
4. **Accessibility** - Testes de WCAG AA (keyboard, ARIA, contraste)

**Current Status**: 6/123 (4.9%) ✅ → Goal: 123/123 (100%)

**Mudança de Estratégia**: Ao invés de apenas adicionar Documentation, aplicamos estrutura completa de 4 stories. Reduz de ~12 stories/componente para 4 (~66% limpeza).

## Technical Context

**Language/Version**: JavaScript ES6+ (Storybook 8.6.15)  
**Primary Dependencies**: Storybook HTML-Vite renderer  
**Storage**: File system (117 .stories.js files)  
**Testing**: Playwright visual regression (after batch completion)  
**Target Platform**: Web (Storybook static build)  
**Project Type**: Design System documentation  
**Performance Goals**: Complete 117 components in ~6 hours  
**Constraints**: Preserve existing stories, only modify export default docs  
**Scale/Scope**: 117 files, ~150-200 lines added per file

## Project Structure

### Documentation (this feature)

```text
specs/001-component-documentation/
├── plan.md              # This file
├── spec.md              # Feature specification
├── tasks.md             # Execution tasks (to be created)
└── progress.md          # Real-time progress tracking

### Source Code (repository root)

```text
src/stories/educacross-components-v2/
├── [117 component files].stories.js   # Target files for template application
├── [6 completed files].stories.js     # Already have complete template
└── (existing files preserved)

agent_helpers/
├── TEMPLATE_COMPONENT.stories.js     # Reference template (657 lines)
└── tarefas.md                        # Component backlog tracking
```

## Implementation Phases

### Phase 0: Preparation & Strategy Update (30 min)

**Objective**: Refatorar abordagem para Opção A (4 stories/componente)

**Tasks**:
1. ✅ Atualizar spec.md, plan.md, progress.md com Opção A
2. ✅ Documentar estrutura das 4 stories (Documentation, Playground, Use Cases, Accessibility)
3. Criar helper functions para gerar stories automaticamente
4. Testar em 1 componente piloto (EInput) com 4 stories completas
5. Validar build e performance

**Validation**: 
- ✅ EInput tem 4 stories funcionando
- ✅ Build completa sem erros
- ✅ Template pode ser replicado para outros componentes

---

### Phase 1: P0 - Forms (2h)

**Objective**: Aplicar 4 stories em 5 componentes críticos de formulário

**Components** (1-5/123 = 4.1%):
1. ✅ EInput.stories.js (Documentation apenas - precisa Playground, UseCases, Accessibility)
2. ✅ EFormCheck.stories.js (Documentation apenas - precisa Playground, UseCases, Accessibility)
3. ✅ ESelect.stories.js (Documentation apenas - precisa Playground, UseCases, Accessibility)
4. ✅ ETextarea.stories.js (Documentation apenas - precisa Playground, UseCases, Accessibility)
5. ✅ FilterChip.stories.js (Documentation apenas - precisa Playground, UseCases, Accessibility)

**Approach por componente**:
1. **Documentation** (30min) - ✅ JÁ APLICADO
   - Import createDocPage, createExampleCard, createPropsTable
   - Hero + stats + 3-6 exemplos + props table + features + related

2. **Playground** (20min) - PENDENTE
   ```javascript
   export const Playground = {
     args: { /* props padrão */ },
     argTypes: { /* controles completos */ },
     render: (args) => `<!-- HTML com todas props -->`,
   };
   ```

3. **Use Cases** (30min) - PENDENTE
   ```javascript
   export const UseCases = {
     render: () => `
       <!-- Cadastro de Aluno -->
       <!-- Busca de Turma -->
       <!-- Formulário de Missão -->
     `,
   };
   ```

4. **Accessibility** (20min) - PENDENTE
   ```javascript
   export const Accessibility = {
     render: () => `
       <!-- Keyboard navigation test -->
       <!-- ARIA labels verification -->
       <!-- Contrast check -->
     `,
   };
   ```

**Status Atual**: Documentation ✅ | Playground ❌ | UseCases ❌ | Accessibility ❌

**Validation**: 
- ✅ 5 componentes com 4 stories cada (20 stories total)
- ✅ Build sem erros
- ✅ Cada story funciona independentemente

**Progress**: 5/123 componentes com 4 stories = 4.1%
- Execute multi_replace_string_in_file for all 5
- Verify success, retry failures individually

**Validation**: 
- ✅ All 5 components have complete template
- ✅ Form-specific examples accurate
- ✅ Props tables reflect actual component props

---

### Phase 1: P0 - Forms & Inputs (30 min)

**Objective**: Apply template to 5 critical form/input components

**Components** (1-5/117 = 4.3%):
1. EFormCheck.stories.js
2. EInput.stories.js
3. ESelect.stories.js
4. ETextarea.stories.js
5. FilterChip.stories.js

**Approach**:
- Read each file to locate export default
- Prepare replacement with form-specific context (validation, states, accessibility)
- Execute multi_replace_string_in_file for all 5
- Verify success, retry failures individually

**Validation**: 
- ✅ 5/117 (4.3%) completed
- ✅ Form-specific examples accurate (validation states, error handling)
- ✅ Props tables reflect actual component props

**Progress**: 5/117 completed

---

### Phase 2: P1 - Navigation & Layout + P2 - Progress (1h 15min)

**Objective**: Apply template to 19 navigation and progress components

**Components P1 - Navigation** (6-14/117):
6. AppLanguageSelector.stories.js
7. AppNavbar.stories.js
8. Divider.stories.js
9. VerticalDivider.stories.js
10. Tab.stories.js
11. TabRouter.stories.js
12. TabCards.stories.js
13. SimpleTab.stories.js
14. MultipleDropdown.stories.js

**Components P2 - Progress** (15-24/117):
15. BadgeList.stories.js
16. BadgeStatus.stories.js
17. PerformanceCell.stories.js
18. ProgressBar.stories.js
19. ProgressBarHorizontalV2.stories.js
20. ProgressBarTopInfo.stories.js
21. ProgressBarVertical.stories.js
22. RadialBar.stories.js
23. RainbowProgressBar.stories.js
24. ZipLoading.stories.js

**Approach**:
- Split into 2 batches (navigation 9 + progress 10)
- Use multi_replace_string_in_file for each batch
- Navigation: routing, active states, ARIA labels
- Progress: animation specs, color thresholds, accessibility

**Validation**: 
- ✅ 24/117 (20.5%) completed
- ✅ Navigation components have routing context
- ✅ Progress components document animation and states

**Progress**: 24/117 completed

---

### Phase 3: P3 - Data Display & Tables (1h)

**Objective**: Apply template to 15 list/table/card/avatar components

**Components** (25-39/117 = 33.3%):
25. Card.stories.js
26. CardsList.stories.js
27. CellStatus.stories.js
28. ListTable.stories.js
29. ListTableAccess.stories.js
30. ListTableLocalSorting.stories.js
31. ListTablePagination.stories.js
32. ListTableRanking.stories.js
33. ListTableSelect.stories.js
34. ListTableSelectLocal.stories.js
35. listInitialsTeacher.stories.js
36. StudentAvatar.stories.js
37. StudentsDetail.stories.js
38. SubjectCard.stories.js
39. UserCard.stories.js

**Approach**:
- Group by type: tables (10), cards (3), avatars (2)
- Use multi_replace for each group
- Tables: sorting, pagination, selection, accessibility
- Cards: layout variants, hover states
- Avatars: placeholder states, initials fallback

**Validation**: 
- ✅ 39/117 (33.3%) completed
- ✅ Table components document data props and interactions
- ✅ Card components show all visual variants

**Progress**: 39/117 completed

---

### Phase 4: P4 - Exercise & Mission System (1h 30min)

**Objective**: Apply template to 28 exercise/mission/template components

**Components** (40-67/117 = 57.3%):
40. ExerciseType.stories.js
41. ExpiredMission.stories.js
42. GameDetailsModal.stories.js
43. MissionAndQuestionItem.stories.js
44. MissionBookDetails.stories.js
45. MissionDetailsPlus.stories.js
46. MissionVisualization.stories.js
47. ModalStudentActivityDetails.stories.js
48. ModalStudentRoundDetails.stories.js
49. QuestionAlternative.stories.js
50. QuestionContent.stories.js
51. QuestionsListDetail.stories.js
52. QuestionStatus.stories.js
53. StudentActivityDetail.stories.js
54. StudentGameDetailsModal.stories.js
55. Template1.stories.js
56. Template2.stories.js
57. Template3.stories.js
58. Template4.stories.js
59. Template5.stories.js
60. Template6.stories.js
61. Template7.stories.js
62. Template8.stories.js
63. Template9.stories.js
64. Template10.stories.js
65. Template11.stories.js
66. TemplateDefault.stories.js
67. FeedbackAndSend.stories.js

**Approach**:
- Template1-11: batch together (identical structure, exercise question patterns)
- Modals: z-index, overlay behavior, focus trap
- Mission components: mission flow, state transitions
- Question components: answer validation, feedback display

**Validation**: 
- ✅ 67/117 (57.3%) completed
- ✅ Template1-11 have consistent exercise documentation
- ✅ Modals document accessibility and keyboard navigation

**Progress**: 67/117 completed

---

### Phase 5: P5 - Content & Media (45 min)

**Objective**: Apply template to 11 media/content/PDF components

**Components** (68-78/117 = 66.7%):
68. AlbumCover.stories.js
69. Certificate.stories.js
70. CertificateList.stories.js
71. DynamicMediaCard.stories.js
72. LyricsDisplay.stories.js
73. MediaCard.stories.js
74. Player.stories.js
75. PerformancePDF.stories.js
76. PerformancePDFList.stories.js
77. PDFRoot.stories.js
78. StudentEvidenceReportPDF.stories.js

**Approach**:
- Media: lazy loading, format support, error states
- PDF: generation process, print layout, page structure
- Use multi_replace for batch

**Validation**: 
- ✅ 78/117 (66.7%) completed
- ✅ Media components document asset loading and formats
- ✅ PDF components explain generation and print specs

**Progress**: 78/117 completed

---

### Phase 6: P6-P11 - Specialized Components (1h 30min)

**Objective**: Apply template to remaining 39 specialized/utility components

**Components** (79-117/117 = 100%):

**P6 - Modals & Overlays** (79-88):
79. AcceptOrRejectAccess.stories.js
80. CancelMission.stories.js
81. ChangeProficiency.stories.js
82. CopyLink.stories.js
83. DefaultFAQModal.stories.js
84. DeleteGuide.stories.js
85. GuidesLimitAlert.stories.js
86. HelpChat.stories.js
87. NewDeepLink.stories.js
88. ShareGuide.stories.js

**P7 - Charts** (89-92):
89. BarChart.stories.js
90. DefaultChart.stories.js
91. PieChart.stories.js
92. LegendCard.stories.js

**P8 - Legends** (93-95):
93. LegendBadgesReadingMeter.stories.js
94. LegendEnum.stories.js
95. LegendEnumPDF.stories.js

**P9 - Selects & Dropdowns** (96-102):
96. SelectInfinityScroll.stories.js
97. SelectInfinityScrollModelo.stories.js
98. SelectLocale.stories.js
99. SelectLocaleNavbar.stories.js
100. subjectSelect.stories.js
101. subjects.stories.js
102. SubjectBand.stories.js

**P10 - Layout & Containers** (103-109):
103. AppCollapse.stories.js
104. AppCollapseItem.stories.js
105. BackgroundSpace.stories.js
106. ExpandableFilterArea.stories.js
107. FixedStickyFooter.stories.js
108. ProfilePicture.stories.js
109. SidebarProficiencyInfo.stories.js

**P11 - Specialized Utilities** (110-117):
110. ConditionalValueDisplay.stories.js
111. DescriptorTag.stories.js
112. EditProfileStudentNew.stories.js
113. EvaluationsHtmlContentRenderer.stories.js
114. InfinityScroll.stories.js
115. IntermediateRedirectLoginDeepLink.stories.js
116. ManageAccountPage.stories.js
117. NPS.stories.js

**Approach**:
- Split into 4 batches (~10 components each)
- Charts: data format, tooltip specs, responsive behavior
- Modals: overlay, focus management, escape handling
- Selects: dropdown behavior, search, virtualization
- Utilities: specific use case documentation

**Validation**: 
- ✅ 117/117 (100%) completed
- ✅ Charts document data structure and customization
- ✅ All specialized components explain their unique use cases

**Progress**: 117/117 completed

---

### Phase 7: Verification & Quality Check (30 min)

**Objective**: Validate all 117 components have complete, consistent template

**Tasks**:
1. Run automated check: `grep -r '.sbdocs-wrapper.*Inter' src/stories/educacross-components-v2/*.stories.js | wc -l` (expect 123 = 6 existing + 117 new)
2. Manually spot-check 15 random components (verify 6 sections present, CSS correct, context accurate)
3. Build Storybook: `npm run build-storybook` (verify no errors)
4. Run Playwright visual regression on 10 sample components
5. Update agent_helpers/tarefas.md: 123/123 (100%) components documented
6. Generate completion report in specs/001-component-documentation/completion-report.md

**Validation**: 
- ✅ All 117 components pass automated check
- ✅ Storybook builds successfully without errors
- ✅ Visual regression shows consistent styling across all
- ✅ Manual review confirms quality and accuracy
- ✅ Progress tracking shows 123/123 (100%)

**Final Progress**: 123/123 completed ✅

---

## Total Time Estimate: ~6 hours

- Phase 0: 20 min
- Phase 1: 30 min (5 components)
- Phase 2: 1h 15min (19 components)
- Phase 3: 1h (15 components)
- Phase 4: 1h 30min (28 components)
- Phase 5: 45 min (11 components)
- Phase 6: 1h 30min (39 components)
- Phase 7: 30 min (verification)

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Multi-replace fails for some components | Fall back to sequential replace_string_in_file |
| Component has non-standard structure | Skip and handle manually after batch |
| Template doesn't fit component context | Create variant template for special cases |
| Progress tracking becomes outdated | Update progress.md after each phase |
| Components have complex nested structures | Locate export default with grep_search first |

## Success Metrics

1. **Coverage**: 117/117 components (100%) have complete template
2. **Quality**: Random sample of 15 passes manual review
3. **Consistency**: Automated check confirms CSS + 6 sections in all 123 files
4. **Efficiency**: Completed in ≤ 6 hours
5. **Zero Regressions**: Playwright visual tests pass on sample components
```
5. **Zero Regressions**: Storybook builds, all existing stories work
