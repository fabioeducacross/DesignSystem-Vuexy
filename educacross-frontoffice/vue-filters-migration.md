# Relatório de Migração - Filtros Vue 2 para Vue 3

Este documento identifica todos os usos da sintaxe de filtros do Vue 2 (pipe filters `{{ variable | filterName }}`) que precisam ser substituídos por funções normais no Vue 3.

## Seção 1: Arquivos com uso de filtros

### Total: 133 arquivos Vue

- `src/components/mission-plus/FeedbackAndSend.vue` (linha: 43)
- `src/components/evaluations/questionDetail/QuestionDetail.vue` (linhas: 56, 57, 72, 135)
- `src/components/progessBar/ProgressBarVertical.vue` (linha: 3)
- `src/components/modal/StudentGameDetailsModal.vue` (linha: 110)
- `src/views/dashboard/classes/engagement/ClassesEngagementDashboard.vue` (linhas: 129, 147, 173, 177, 186, 206, 210, 241, 245, 276, 280, 313, 319, 352, 358)
- `src/views/dashboard/classes/engagement/components/ModalDetailsAccessClasses.vue` (linhas: 54, 61, 67, 73)
- `src/views/dashboard/classes/engagement/ClassesEngagementList.vue` (linha: 32)
- `src/views/dashboard/classes/performance/ClassesPerformanceList.vue` (linhas: 27, 33)
- `src/views/dashboard/classes/performance/ClassesPerformanceDashboard.vue` (linhas: 30, 47)
- `src/views/dashboard/students/Dashboard.vue` (linhas: 136, 153)
- `src/views/dashboard/students/List.vue` (linhas: 54, 60)
- `src/views/dashboard/studentDetails/Dashboard.vue` (linhas: 40, 69, 72, 90)
- `src/views/dashboard/studentDetails/components/StudentQuizDetail.vue` (linhas: 158, 161, 164, 176)
- `src/views/dashboard/studentDetails/components/StudentGameDetail.vue` (linhas: 94, 97, 100, 112)
- `src/views/dashboard/studentDetails/Rounds.vue` (linhas: 33, 49, 57)
- `src/views/dashboard/schools/engagement/SchoolsEngagementList.vue` (linha: 21)
- `src/views/dashboard/schools/engagement/SchoolsEngagementDashboard.vue` (linhas: 63, 67, 81, 84, 95, 97, 123, 129, 161, 167, 199, 205, 239, 245)
- `src/views/dashboard/schools/performance/SchoolsPerformanceList.vue` (linhas: 23, 29)
- `src/views/dashboard/schools/performance/SchoolsPerformanceDashboard.vue` (linhas: 31, 49)
- `src/views/events/results-report/class-details/performance/List.vue` (linhas: 23, 34, 45)
- `src/views/events/results-report/class-details/participation/Dashboard.vue` (linhas: 30, 33)
- `src/views/events/results-report/institutions-list/performance/List.vue` (linha: 23)
- `src/views/events/results-report/institutions-list/participation/ParticipationList.vue` (linhas: 48, 52)
- `src/views/events/results-report/institution-details/performance/List.vue` (linhas: 23, 37, 49)
- `src/views/events/results-report/institution-details/participation/Dashboard.vue` (linhas: 30, 33)
- `src/views/events/results-report/institution-details/participation/List.vue` (linhas: 53, 57)
- `src/views/events/certificate/list/CertificateListTable.vue` (linha: 61)
- `src/views/events/individual-report/student-report/List.vue` (linhas: 24, 36, 45)
- `src/views/events/individual-report/IndividualReportDashboard.vue` (linhas: 29, 42, 57, 78)
- `src/views/events/individual-report/IndividualReportList.vue` (linha: 23)
- `src/views/events/list/EventListCard.vue` (linhas: 17, 18, 58, 62)
- `src/views/events/list/EventsList.vue` (linha: 57)
- `src/views/events/reports/event-report/EventReportDashboard.vue` (linhas: 32, 35, 52, 55, 76, 120, 128, 134)
- `src/views/events/reports/event-report/EventReportTable.vue` (linhas: 26, 35, 40, 46)
- `src/views/events/reports/institution-detail/InstitutionDetailCards.vue` (linhas: 33, 34, 37, 51, 65, 84, 114, 122, 128)
- `src/views/events/reports/classe-detail/ClasseDetailTable.vue` (linhas: 23, 28, 36)
- `src/views/events/reports/classe-detail/ClasseDetailCards.vue` (linhas: 36, 64, 82, 112, 120, 126)
- `src/views/pages/records/coordinators/list/trash/List.vue` (linha: 49)
- `src/views/pages/records/coordinators/list/overview/List.vue` (linha: 196)
- `src/views/pages/records/managers/list/trash/List.vue` (linha: 48)
- `src/views/pages/records/managers/list/overview/List.vue` (linha: 50)
- `src/views/pages/records/teachers/list/trash/List.vue` (linha: 38)
- `src/views/pages/records/teachers/list/overview/List.vue` (linha: 51)
- `src/views/pages/records/students/transferStudents/StudentTable.vue` (linha: 86)
- `src/views/pages/records/students/list/StudentsIndex.vue` (linhas: 8, 13)
- `src/views/pages/records/students/import/import-wizard/Step1.vue` (linhas: 328, 391)
- `src/views/pages/records/students/import/history/Details.vue` (linha: 19)
- `src/views/pages/auth-context/manage-account/components/UserCard.vue` (linhas: 207, 211)
- `src/views/pages/admin-context/records/SchoolLogo.vue` (linha: 40)
- `src/views/pages/admin-context/evaluations/tct/classes-list/tri/EvaluationsTRIClassList.vue` (linha: 68)
- `src/views/pages/admin-context/evaluations/tct/classes-list/analysis/EvaluationsTCTClassDashboard.vue` (linhas: 29, 32)
- `src/views/pages/admin-context/evaluations/tct/classes-list/ability/AbilityClassesList.vue` (linhas: 25, 32)
- `src/views/pages/admin-context/evaluations/tct/institutions-list/tri/EvaluationsTRIInstitutionsList.vue` (linha: 61)
- `src/views/pages/admin-context/evaluations/tct/institutions-list/analysis/EvaluationsTCTInstitutionsDashboard.vue` (linhas: 29, 32)
- `src/views/pages/admin-context/evaluations/tct/institutions-list/ability/AbilityInstitutionsList.vue` (linhas: 51, 59)
- `src/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailCardsComp.vue` (linha: 26)
- `src/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailTableStrongWeak.vue` (linhas: 40, 67)
- `src/views/pages/admin-context/evaluations/tct/students-list/analysis-details/EvaluationsTCTStudentsDetailCards.vue` (linhas: 34, 35, 47, 49, 60, 62)
- `src/views/pages/admin-context/evaluations/tct/students-list/analysis/EvaluationsTCTStudentsDashboard.vue` (linhas: 29, 32)
- `src/views/pages/admin-context/evaluations/tct/students-list/ability/AbilityStudentsList.vue` (linhas: 20, 27)
- `src/views/pages/admin-context/evaluations/classes-list/EvaluationsInstitutionsClassesDashboard.vue` (linhas: 43, 51, 57, 81, 89, 95)
- `src/views/pages/admin-context/evaluations/classes-list/EvaluationsInstitutionsClassesList.vue` (linhas: 46, 54)
- `src/views/pages/admin-context/evaluations/components/EvaluationCard.vue` (linhas: 13, 14, 72, 76, 80)
- `src/views/pages/admin-context/evaluations/institutions-list/EvaluationsInstitutionsDashboard.vue` (linhas: 49, 52, 75, 78, 82, 99, 107, 113)
- `src/views/pages/admin-context/evaluations/institutions-list/EvaluationsInstitutionsList.vue` (linhas: 45, 50)
- `src/views/pages/admin-context/evaluations/students-list/EvaluationsStudentsDashboard.vue` (linhas: 25, 33, 39)
- `src/views/pages/admin-context/shared/table-columns-components/ProgressBar.vue` (linha: 4)
- `src/views/pages/admin-context/shared/table-columns-components/SemaphoreStatusV2.vue` (linha: 11)
- `src/views/pages/admin-context/shared/components/ranking-mission-table/RankingMissionTable.vue` (linhas: 5, 6, 46, 46)
- `src/views/pages/admin-context/shared/components/ranking-badge-table/RankingBadgeTable.vue` (linhas: 79, 81, 82, 83)
- `src/views/pages/admin-context/network-manager/education-system/books/List.vue` (linhas: 62, 94)
- `src/views/pages/admin-context/network-manager/education-system/books/book/hability/WeakStrong.vue` (linhas: 116, 186)
- `src/views/pages/admin-context/network-manager/education-system/books/book/hability/Rounds.vue` (linhas: 32, 51, 70, 115, 134, 153)
- `src/views/pages/admin-context/network-manager/education-system/components/EducationSystemCard.vue` (linhas: 22, 26)
- `src/views/pages/admin-context/reports/educationSystem/educationSystemList/components/EducationSystemCard.vue` (linhas: 22, 26)
- `src/views/pages/admin-context/reports/educationSystem/admin/bookReport/WeakStrong.vue` (linhas: 114, 183)
- `src/views/pages/admin-context/reports/educationSystem/admin/bookReport/Rounds.vue` (linhas: 37, 56, 75, 125, 144, 163)
- `src/views/pages/admin-context/reports/educationSystem/admin/mission/Rounds.vue` (linhas: 31, 47, 64, 80)
- `src/views/pages/admin-context/reports/educationSystem/admin/missionplus/WeakStrong.vue` (linhas: 86, 140)
- `src/views/pages/admin-context/reports/educationSystem/admin/missionplus/Rounds.vue` (linhas: 31, 47, 64, 80)
- `src/views/pages/admin-context/reports/educationSystem/detail/educationSystemClasses/general/GeralClassesDashboard.vue` (linhas: 25, 28, 44, 54, 57, 73)
- `src/views/pages/admin-context/reports/educationSystem/detail/educationSystemClasses/general/GeralClassesList.vue` (linhas: 26, 36, 46)
- `src/views/pages/admin-context/reports/educationSystem/detail/educationSystemInstitutions/general/GeneralInstitutionsList.vue` (linhas: 21, 31, 40)
- `src/views/pages/admin-context/reports/educationSystem/detail/educationSystemInstitutions/general/GeneralInstitutionsDashboard.vue` (linhas: 26, 29, 63, 66, 83)
- `src/views/pages/admin-context/reports/educationSystem/detail/educationSystemStudents/general/Dashboard.vue` (linhas: 25, 28, 44, 54)
- `src/views/pages/admin-context/reports/educationSystem/detail/educationSystemStudents/general/List.vue` (linhas: 20, 25, 33)
- `src/views/pages/admin-context/reports/educationSystem/detail/educationSystemBooks/GeralBooksList.vue` (linhas: 62, 94)
- `src/views/pages/admin-context/reports/educationSystem/studentsTab/students/List.vue` (linha: 47)
- `src/views/pages/admin-context/reports/access/Access.vue` (linhas: 93, 94, 97, 101)
- `src/views/pages/admin-context/reports/missions/components/MissionReportStudentsCards.vue` (linhas: 8, 9, 24, 41)
- `src/views/pages/admin-context/reports/schoolEvidence/pdf/SchoolEvidencePDF.vue` (linhas: 73, 88, 89, 140, 149, 156, 301)
- `src/views/pages/admin-context/reports/schoolEvidence/SchoolEvidence.vue` (linhas: 258, 265)
- `src/views/pages/reading-meter-V2/class-report/ClassReportDashboard.vue` (linhas: 60, 67, 68)
- `src/views/pages/reading-meter-V2/class-report/ClassReportHeader.vue` (linhas: 59, 60)
- `src/views/pages/reading-meter-V2/class-report/ClassReportTable.vue` (linha: 27)
- `src/views/pages/reading-meter-V2/evaluation-report/EvaluationReportDashboard.vue` (linhas: 58, 65, 66)
- `src/views/pages/reading-meter-V2/student-report/StudentReportCards.vue` (linha: 31)
- `src/views/pages/reading-meter-V2/schools-report/SchoolsReportDashboard.vue` (linhas: 59, 66, 67)
- `src/views/pages/reading-meter-V2/schools-report/SchoolsReportList.vue` (linha: 27)
- `src/views/pages/reading-meter-V2/auditor/EvaluationAuditorList.vue` (linha: 75)
- `src/views/pages/writing-phases/students/List.vue` (linha: 33)
- `src/views/pages/writing-phases/components/ApplicationCardContent.vue` (linha: 8)
- `src/views/pages/writing-phases/components/BarChart.vue` (linhas: 124, 127)
- `src/views/pages/teacher-context/records/missions/customMissionV2/CustomMissionDataV2.vue` (linha: 540)
- `src/views/pages/teacher-context/records/students/Students.vue` (linha: 112)
- `src/views/pages/teacher-context/educationSystem/bookReport/WeakStrong.vue` (linhas: 117, 187)
- `src/views/pages/teacher-context/educationSystem/bookReport/Rounds.vue` (linhas: 37, 56, 75, 125, 144, 163)
- `src/views/pages/teacher-context/educationSystem/mission-only/Title.vue` (linha: 25)
- `src/views/pages/teacher-context/educationSystem/mission-only/List.vue` (linha: 33)
- `src/views/pages/teacher-context/educationSystem/mission-only/Cards.vue` (linhas: 18, 56, 86)
- `src/views/pages/teacher-context/educationSystem/books/List.vue` (linhas: 202, 234)
- `src/views/pages/teacher-context/educationSystem/mission/WeakStrong.vue` (linhas: 90, 148)
- `src/views/pages/teacher-context/educationSystem/mission/Rounds.vue` (linhas: 32, 48, 56, 60)
- `src/views/pages/teacher-context/educationSystem/students/List.vue` (linha: 33)
- `src/views/pages/teacher-context/educationSystem/students/Cards.vue` (linhas: 18, 56, 86)
- `src/views/pages/teacher-context/educationSystem/missionplus/Cards.vue` (linhas: 37, 49, 76, 88, 108, 111)
- `src/views/pages/teacher-context/educationSystem/missionplus/WeakStrong.vue` (linhas: 89, 145)
- `src/views/pages/teacher-context/educationSystem/missionplus/Rounds.vue` (linhas: 32, 48, 56, 60)
- `src/views/pages/teacher-context/evaluations/list/EvaluationsListTable.vue` (linhas: 52, 57)
- `src/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationTitle.vue` (linha: 40)
- `src/views/pages/teacher-context/library/general/GeneralList.vue` (linhas: 54, 58, 59)
- `src/views/pages/teacher-context/library/general/GeneralDashboard.vue` (linha: 14)
- `src/views/pages/teacher-context/shared/modals/GuideFeedbackConfirmation.vue` (linhas: 28, 29)
- `src/views/pages/teacher-context/shared/components/Book.vue` (linha: 29)
- `src/views/pages/teacher-context/shared/components/ProgressWithLabelFollowing.vue` (linhas: 4, 10)
- `src/views/pages/teacher-context/reports/missions/tabs/MissionReportRanking.vue` (linha: 97)
- `src/views/pages/teacher-context/reports/missions/tabs/MissionReportStudents.vue` (linhas: 26, 32, 41, 49)
- `src/views/pages/teacher-context/reports/missions/tabs/MissionReportGames.vue` (linhas: 13, 17, 31, 44, 73, 88, 92, 106, 119, 152, 192, 208, 224, 240, 256, 380, 392, 536, 543, 557)
- `src/views/pages/teacher-context/reports/missions/tabs/components/MissionReportStudentsTableCard.vue` (linha: 9)
- `src/views/pages/teacher-context/reports/missions/tabs/components/MissionReportStudentsCards.vue` (linhas: 8, 9, 24, 39)
- `src/views/pages/teacher-context/reports/missions/studentDetailMission/StudentDetailMissionReportList.vue` (linhas: 246, 253, 261, 272, 284, 356, 364, 446, 453, 459, 465, 476, 500, 506, 512, 518)
- `src/views/pages/teacher-context/reports/missions/studentDetailMission/StudentDetailMissionReportDashboard.vue` (linhas: 87, 119, 155)
- `src/views/pages/teacher-context/reports/missions/ActivityDetailMissionReport.vue` (linhas: 42, 56, 70, 98, 159, 171, 188, 278, 287)
- `src/views/pages/teacher-context/reports/skillReport/details/SkillReportDetails.vue` (linhas: 85, 90, 101, 111)
- `src/views/pages/teacher-context/reports/highFive/TeacherHighFive.vue` (linha: 108)
- `src/views/pages/responsible-context/InstitutionMissions.vue` (linhas: 39, 70, 71, 74)
- `src/views/pages/responsible-context/shared/modals/EducationSystemMissionDetail.vue` (linhas: 25, 26)
- `src/views/pages/responsible-context/shared/components/MissionsTable.vue` (linhas: 87, 88, 144, 145)
- `src/views/pages/responsible-context/dashboard/Home.vue` (linha: 67)
- `src/views/pages/responsible-context/student-family-missions/StudentFamilyMissions.vue` (linhas: 40, 49)
- `src/views/pages/test-fluency/narrative-complexity/student/Graph.vue` (linha: 175)
- `src/views/pages/test-fluency/narrative-complexity/students/List.vue` (linha: 31)
- `src/views/pages/test-fluency/reading-fluency/classes/ReadingFluencyClassesProficiencyDetails.vue` (linha: 50)
- `src/views/pages/reading-meter/test/reading/ReadingMeterCards.vue` (linhas: 41, 91)
- `src/views/pages/reading-meter/test/reading/ReadingMeterInfo.vue` (linha: 20)
- `src/views/pages/reading-meter/components/ReadPasport.vue` (linhas: 40, 63, 64, 87, 88, 114, 115, 151, 154, 155)
- `src/views/pages/reading-expedition/fluency-tests/student/ReadingMeterCards.vue` (linhas: 47, 93)
- `src/views/pages/reading-expedition/fluency-tests/student/ReadingMeterHeader.vue` (linhas: 33, 45)
- `src/views/pages/reading-expedition/units/student/index.vue` (linhas: 34, 46)
- `src/views/pages/reading-expedition/units/student/gamesTrail.vue` (linha: 62)
- `src/views/pages/reading-expedition/components/PassportModal.vue` (linha: 63)
- `src/views/pages/reading-expedition/overview/admin-overview/ModalDetails.vue` (linha: 52)
- `src/views/pages/reading-expedition/overview/components/CellStatusReadingExpedition.vue` (linha: 35)
- `src/views/reports/teachersAccess/tabs/Network/NetworkCards.vue` (linhas: 31, 49, 68)
- `src/views/reports/teachersAccess/tabs/School/SchoolCards.vue` (linhas: 31, 49, 67)
- `src/views/reports/missionPlus/admin-report/institutions/content/Rounds.vue` (linhas: 37, 57, 76, 126, 145, 164)
- `src/views/reports/missionPlus/admin-report/missions/overview/List.vue` (linha: 61)
- `src/views/reports/missionPlus/admin-report/missions/overview/Cards.vue` (linha: 203)
- `src/views/reports/missionPlus/admin-report/classes/content/Rounds.vue` (linhas: 37, 56, 123, 142)
- `src/views/reports/missionPlus/classe-report/student/StudentQuizDetail.vue` (linhas: 175, 178, 181, 195)
- `src/views/reports/missionPlus/classe-report/student/ReportMissionPlusStudentCards.vue` (linhas: 100, 104)
- `src/views/reports/missionPlus/classe-report/student/ReportMissionPlusStudentRounds.vue` (linhas: 100, 104)
- `src/views/reports/missionPlus/classe-report/student/StudentGameDetail.vue` (linhas: 81, 101)
- `src/views/reports/missionPlus/classe-report/classe/ReportMissionPlusClasseCards.vue` (linha: 89)
- `src/views/reports/missionPlus/classe-report/classe/ReportMissionPlusClasseMissions.vue` (linha: 117)
- `src/views/reports/missionPlus/classe-report/students/ReportMissionPlusStudentsTable.vue` (linha: 35)
- `src/views/reports/missionPlus/classe-report/students/ReportMissionPlusStudentsMissions.vue` (linha: 45)
- `src/views/reports/skills/SkillReport.vue` (linha: 115)

---

## Seção 2: Filtros identificados

### Filtros definidos em `src/filters/filters.js`

#### 1. `formatNumber`
- **Arquivo de definição:** `src/filters/filters.js` (linha 17)
- **Quantidade de usos:** 341 vezes
- **Descrição:** Formata números com separadores de milhares (.) e decimais (,)

#### 2. `formattedDate`
- **Arquivo de definição:** `src/filters/filters.js` (linha 48)
- **Quantidade de usos:** 51 vezes
- **Descrição:** Formata datas no padrão DD/MM/YYYY

#### 3. `formattedTime`
- **Arquivo de definição:** `src/filters/filters.js` (linha 71)
- **Quantidade de usos:** 76 vezes
- **Descrição:** Converte segundos em formato de tempo legível (Xh Ymin Zs)

#### 4. `formatDate`
- **Arquivo de definição:** `src/filters/filters.js` (linha 140) + `src/utils/date` (importado)
- **Quantidade de usos:** 13 vezes
- **Descrição:** Formata datas (importado de utils)

#### 5. `formatPercentToPtBr`
- **Arquivo de definição:** `src/filters/filters.js` (linha 109)
- **Quantidade de usos:** 9 vezes
- **Descrição:** Formata porcentagens no padrão pt-BR

#### 6. `truncate`
- **Arquivo de definição:** `src/filters/filters.js` (linha 95)
- **Quantidade de usos:** 0 vezes (não encontrado no grep)
- **Descrição:** Trunca strings com ellipsis

#### 7. `title`
- **Arquivo de definição:** `src/filters/filters.js` (linha 4)
- **Quantidade de usos:** 0 vezes (não encontrado no grep)
- **Descrição:** Capitaliza palavras separadas por underscore

#### 8. `formattedSchedule`
- **Arquivo de definição:** `src/filters/filters.js` (linha 61)
- **Quantidade de usos:** 0 vezes (não encontrado no grep)
- **Descrição:** Formata horários (HH:MM)

#### 9. `abbreviateName`
- **Arquivo de definição:** `src/filters/filters.js` (linha 102)
- **Quantidade de usos:** 0 vezes (não encontrado no grep)
- **Descrição:** Cria iniciais a partir de nome completo

#### 10. `floatToPercent`
- **Arquivo de definição:** `src/filters/filters.js` (linha 111)
- **Quantidade de usos:** 0 vezes (não encontrado no grep)
- **Descrição:** Converte float para porcentagem pt-BR

#### 11. `arrayToString`
- **Arquivo de definição:** `src/filters/filters.js` (linha 113)
- **Quantidade de usos:** 0 vezes (não encontrado no grep)
- **Descrição:** Converte array em string separada por vírgulas

#### 12. `initials`
- **Arquivo de definição:** `src/filters/filters.js` (linha 121)
- **Quantidade de usos:** 0 vezes (não encontrado no grep)
- **Descrição:** Gera iniciais de um nome

### Filtros usados mas NÃO definidos em `filters.js`

⚠️ **ATENÇÃO:** Os seguintes filtros são usados no código mas NÃO foram encontrados no arquivo principal de filtros:

#### `DaysLeft`
- **Quantidade de usos:** 3 vezes
- **Arquivos:**
  - `src/views/events/reports/institution-detail/InstitutionDetailCards.vue` (linha: 84)
  - `src/views/events/reports/classe-detail/ClasseDetailCards.vue` (linha: 82)
- **Status:** ⚠️ Definição não encontrada - pode ser um filtro local do componente

#### `Time`
- **Quantidade de usos:** 1 vez
- **Arquivos:**
  - `src/views/events/reports/institution-detail/InstitutionDetailCards.vue` (linha: 51)
- **Status:** ⚠️ Definição não encontrada - pode ser um filtro local do componente

---

## Resumo Estatístico

- **Total de arquivos com filtros:** 133 arquivos
- **Total de usos de filtros:** ~491 ocorrências
- **Filtros mais usados:**
  1. `formatNumber` - 341 usos
  2. `formattedTime` - 76 usos
  3. `formattedDate` - 51 usos
  4. `formatDate` - 13 usos
  5. `formatPercentToPtBr` - 9 usos

---

## Próximos Passos para Migração

1. **Criar funções utilitárias:** Mover as funções de filtro para um arquivo de utilitários reutilizáveis
2. **Substituir nos templates:** Trocar `{{ value | filterName }}` por `{{ filterName(value) }}`
3. **Importar nos componentes:** Adicionar imports das funções nos componentes que as usam
4. **Investigar filtros não encontrados:** Localizar as definições de `DaysLeft` e `Time`
5. **Testar componente por componente:** Validar que a formatação permanece correta após migração

---

## Recomendações

### Estratégia de Migração Sugerida

1. **Criar arquivo de composables:**
```javascript
// src/composables/useFilters.js
import { formatNumber, formattedDate, formattedTime, ... } from '@/filters/filters'

export function useFilters() {
  return {
    formatNumber,
    formattedDate,
    formattedTime,
    formatDate,
    formatPercentToPtBr,
    // ... outros filtros
  }
}
```

2. **Uso nos componentes Vue 3:**
```vue
<script setup>
import { useFilters } from '@/composables/useFilters'

const { formatNumber, formattedDate, formattedTime } = useFilters()
</script>

<template>
  <div>{{ formatNumber(value) }}</div>
  <div>{{ formattedDate(date) }}</div>
</template>
```

### Arquivos Prioritários (maior número de filtros)

1. `src/views/pages/teacher-context/reports/missions/tabs/MissionReportGames.vue` (21 usos)
2. `src/views/dashboard/classes/engagement/ClassesEngagementDashboard.vue` (15 usos)
3. `src/views/dashboard/schools/engagement/SchoolsEngagementDashboard.vue` (14 usos)
4. `src/views/pages/teacher-context/reports/missions/studentDetailMission/StudentDetailMissionReportList.vue` (16 usos)

Comece a migração por estes arquivos para ter maior impacto.
