# Feature Specification: Component Documentation Template Application

**Feature Branch**: `v1.1`  
**Created**: 2026-02-07  
**Updated**: 2026-02-08  
**Status**: In Progress  
**Strategy**: Opção A - Híbrido Estratégico (4 stories por componente)  
**Input**: Apply comprehensive documentation template to 117 remaining Educacross V2 components (123 total - 6 completed)

## Estratégia de Documentação: Opção A - Híbrido Estratégico

Cada componente terá **4 stories essenciais**:

1. **📖 Documentation** (Template 1 JavaScript funcional)
   - Hero section com título, subtitle, badge, cores
   - 4 stats cards (tipos, tamanhos, estados, acessibilidade)
   - 3-6 exemplos visuais com preview HTML + código Vue
   - Props table completa (nome, tipo, default, descrição)
   - 4-6 features cards (ícones + descrição)
   - Componentes relacionados com links
   - **Função**: Entrada principal, documentação estruturada

2. **🎨 Playground** (Controls interativos)
   - Story com argTypes completo
   - Controles para testar todas as props
   - Live preview no Canvas
   - **Função**: Testes manuais, exploração de combinações

3. **🎭 Use Cases** (Cenários reais Educacross)
   - 2-4 exemplos de uso no contexto educacional
   - Ex: "Cadastro de Aluno", "Busca de Turma", "Formulário de Missão"
   - Código completo com contexto de negócio
   - **Função**: Mostra aplicação prática no domínio

4. **♿ Accessibility** (Acessibilidade)
   - Testes de keyboard navigation
   - ARIA labels e roles
   - Contraste e legibilidade
   - Screen reader support
   - **Função**: Garantia de conformidade WCAG AA

### Decisão Técnica: Por que Opção A?

**Mantém**:
- ✅ Documentação estruturada e consistente (Template 1)
- ✅ Interatividade para testes (Playground)
- ✅ Contexto educacional real (Use Cases)
- ✅ Acessibilidade verificável (Accessibility)

**Remove**:
- ❌ Stories redundantes (All Types, All Sizes, etc.)
- ❌ Exemplos desconectados do contexto educacional
- ❌ Duplicação de informação

**Resultado**: De ~12 stories por componente → **4 stories essenciais** (~66% redução)

## User Scenarios & Testing

### User Story 1 - Component Documentation Completeness (Priority: P1)

Developers and designers need comprehensive documentation for all 123 Educacross V2 components to understand usage, props, behavior, and design specifications without reading source code.

**Why this priority**: Core functionality - without complete documentation, the Design System loses its primary value proposition. Documentation is the interface between designers/developers and the component library.

**Current Status**: 6/123 (4.9%) have complete template → Goal: 123/123 (100%)

**Independent Test**: Pick any component from educacross-components-v2 folder → Open its .stories.js file → Verify it has complete template with CSS styling, Contexto de Uso, Arquitetura, Especificações, Comportamento, API, and Componentes Relacionados sections.

**Acceptance Scenarios**:

1. **Given** a component story file, **When** opened in Storybook, **Then** documentation includes CSS styling for professional appearance
2. **Given** any component, **When** viewing its docs, **Then** all 6 major sections are present and filled with relevant information
3. **Given** 123 total components, **When** documentation phase completes, **Then** all components have standardized template applied

---

### User Story 2 - Consistent Documentation Structure (Priority: P2)

All components follow identical documentation structure making it easy to navigate and find information quickly across the entire Design System.

**Why this priority**: Consistency enables learning transfer - once a developer understands how to read one component's docs, they can efficiently read all others.

**Independent Test**: Compare 3 random component documentation pages → Verify identical section ordering, CSS styling, table structures, and heading hierarchy.

**Acceptance Scenarios**:

1. **Given** multiple component docs, **When** comparing section structure, **Then** all follow exact same template order
2. **Given** component API tables, **When** viewing different components, **Then** table columns and formatting are identical
3. **Given** CSS styling, **When** viewing any component doc, **Then** typography, colors, and spacing match template

---

### User Story 3 - Efficient Batch Processing (Priority: P1)

The documentation application process completes all 117 remaining components efficiently without manual repetition, using multi_replace_string_in_file for parallel edits.

**Why this priority**: Time efficiency - manual sequential editing would take hours/days. Batch processing enables completion in minutes/hours.

**Independent Test**: Execute multi_replace_string_in_file with 5-10 components → Verify all complete successfully → Measure time vs sequential approach.

**Acceptance Scenarios**:

1. **Given** list of 117 components, **When** batch process runs, **Then** multiple components update simultaneously
2. **Given** 10 components to update, **When** using multi_replace, **Then** completion time < 5 minutes
3. **Given** batch operation, **When** one replacement fails, **Then** others continue and failures are logged

---

### Edge Cases

- What happens when component already has partial template? → Detect existing sections and merge/replace appropriately
- How to handle components with unique structure (createDocPage helper)? → Skip or apply adapted template
- What if export default location varies? → Use grep_search to find exact line before replacement
- How to verify all components after batch update? → Run automated check for template presence

## Requirements

### Functional Requirements

- **FR-001**: System MUST apply comprehensive documentation template to all 117 remaining components
- **FR-002**: System MUST preserve existing component code and stories (only modify export default docs)
- **FR-003**: System MUST include all 6 sections: Contexto, Arquitetura, Especificações, Comportamento, API, Relacionados
- **FR-004**: System MUST apply consistent CSS styling (Inter font, professional typography) to all components
- **FR-005**: System MUST use multi_replace_string_in_file for parallel operations when possible
- **FR-006**: System MUST track progress (X/117 completed) and report failures
- **FR-007**: System MUST adapt template to component-specific context (Forms/Cards/Navigation/etc)

### Key Entities

- **Component Story File**: .stories.js file containing export default with title, tags, parameters.docs.description.component
- **Template Sections**: CSS styling block + 6 documentation sections (each with specific markdown structure)
- **Component Metadata**: Name, category (Forms/Cards/Navigation), priority, source file reference
- **Batch Operation**: Multi-component update executed in parallel using multi_replace_string_in_file

## Current State Analysis

### Completed (6/123 = 4.9%)
1. ButtonWaitAction ✅
2. MediaCardIcon ✅
3. MissionDetails ✅
4. ProgressBarHorizontal ✅
5. QuestionDetail ✅
6. Sidebar ✅

### Pending (117/123 components requiring template)

**Priority Groups** (117 components organizados por tipo e criticidade):

#### P0 - Forms & Input Controls (5 components)
1. EFormCheck
2. EInput
3. ESelect
4. ETextarea
5. FilterChip

#### P1 - Navigation & Layout (9 components)
6. AppLanguageSelector
7. AppNavbar
8. Divider
9. VerticalDivider
10. Tab
11. TabRouter
12. TabCards
13. SimpleTab
14. MultipleDropdown

#### P2 - Progress Indicators & Status (10 components)
15. BadgeList
16. BadgeStatus
17. PerformanceCell
18. ProgressBar
19. ProgressBarHorizontalV2
20. ProgressBarTopInfo
21. ProgressBarVertical
22. RadialBar
23. RainbowProgressBar
24. ZipLoading

#### P3 - Data Display & Tables (15 components)
25. Card
26. CardsList
27. CellStatus
28. ListTable
29. ListTableAccess
30. ListTableLocalSorting
31. ListTablePagination
32. ListTableRanking
33. ListTableSelect
34. ListTableSelectLocal
35. listInitialsTeacher
36. StudentAvatar
37. StudentsDetail
38. SubjectCard
39. UserCard

#### P4 - Exercise & Mission System (21 components)
40. ExerciseType
41. ExpiredMission
42. GameDetailsModal
43. MissionAndQuestionItem
44. MissionBookDetails
45. MissionDetailsPlus
46. MissionVisualization
47. ModalStudentActivityDetails
48. ModalStudentRoundDetails
49. QuestionAlternative
50. QuestionContent
51. QuestionsListDetail
52. QuestionStatus
53. StudentActivityDetail
54. StudentGameDetailsModal
55. Template1
56. Template2
57. Template3
58. Template4
59. Template5
60. Template6

#### P4 (continuação) - Exercise Templates (7 components)
61. Template7
62. Template8
63. Template9
64. Template10
65. Template11
66. TemplateDefault
67. FeedbackAndSend

#### P5 - Content & Media (11 components)
68. AlbumCover
69. Certificate
70. CertificateList
71. DynamicMediaCard
72. LyricsDisplay
73. MediaCard
74. Player
75. PerformancePDF
76. PerformancePDFList
77. PDFRoot
78. StudentEvidenceReportPDF

#### P6 - Modals & Overlays (10 components)
79. AcceptOrRejectAccess
80. CancelMission
81. ChangeProficiency
82. CopyLink
83. DefaultFAQModal
84. DeleteGuide
85. GuidesLimitAlert
86. HelpChat
87. ModalStudentActivityDetails (duplicate check needed)
88. NewDeepLink

#### P7 - Charts & Visualization (4 components)
89. BarChart
90. DefaultChart
91. PieChart
92. LegendCard

#### P8 - Legends & Badges (3 components)
93. LegendBadgesReadingMeter
94. LegendEnum
95. LegendEnumPDF

#### P9 - Selects & Dropdowns (7 components)
96. SelectInfinityScroll
97. SelectInfinityScrollModelo
98. SelectLocale
99. SelectLocaleNavbar
100. subjectSelect
101. subjects
102. SubjectBand

#### P10 - Layout & Containers (7 components)
103. AppCollapse
104. AppCollapseItem
105. BackgroundSpace
106. ExpandableFilterArea
107. FixedStickyFooter
108. ProfilePicture
109. SidebarProficiencyInfo

#### P11 - Specialized & Utilities (8 components)
110. ConditionalValueDisplay
111. DescriptorTag
112. EditProfileStudentNew
113. EvaluationsHtmlContentRenderer
114. InfinityScroll
115. IntermediateRedirectLoginDeepLink
116. ManageAccountPage
117. NPS

#### P12 - Misc & ShareGuide (1 component)
118. ShareGuide

**Note**: Sidebar e QuestionDetail duplicados removidos da lista (já completos)

## Success Criteria

1. **Coverage**: 87/87 components (100%) have comprehensive template applied
2. **Consistency**: All components follow identical structure and CSS styling
3. **Quality**: Each component has relevant, accurate information in all 6 sections
4. **Efficiency**: Batch processing used for 80%+ of updates
5. **Validation**: Automated check confirms template presence in all files
