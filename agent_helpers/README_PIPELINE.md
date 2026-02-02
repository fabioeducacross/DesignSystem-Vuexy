# Pipeline de Reconstrução Profissional - Quick Start

Documentação completa do processo de reconstrução profissional dos 111 componentes do Design System.

## Status Atual

- **Validado:** 2 componentes (CancelMission, Card)
- **Restantes:** 109 componentes
- **Tempo Estimado:** 28 horas de trabalho (15 min × 111)
- **Padrão:** Figma-style documentation, 3+ stories, UX Writing matrices

---

## Arquivos Principais

### 1. PIPELINE_RECONSTRUCAO.md
Documentação completa e detalhada do processo.

**Conteúdo (13 seções):**
- Análise inicial (identificar contexto, assets, complexidade)
- Estrutura do arquivo (header, docs, CSS, stories)
- Documentação Figma-style (10 seções obrigatórias)
- Assets e recursos (mapeamento, estratégias)
- Tipos de stories (Default, WithData, Interactive)
- Checklist de qualidade
- Automação e scripts futuros
- Workflow recomendado
- Componentes por prioridade (P0/P1/P2)
- Padrões de commit
- Troubleshooting
- Referências (loaders, CSS, paths)
- Próximos passos

**Quando usar:** Para entender processo completo e detalhes técnicos.

---

### 2. TEMPLATE_COMPONENT.stories.js
Template pronto para copiar/colar em novos componentes.

**Conteúdo:**
- Header completo com metadados
- CSS Figma-style pré-incluído
- Estrutura de documentação com placeholders
- 3 stories prontas (Default, WithData, Interactive)
- UX Writing matrix comentada
- Exemplos de código Vue 2
- Loaders para vendor libraries

**Quando usar:** Ao começar reconstrução de qualquer componente novo.

**Como usar:**
1. Copiar arquivo completo
2. Substituir `ComponentName` por nome real
3. Preencher placeholders `[...]`
4. Adaptar stories ao contexto

---

### 3. CHECKLIST_RECONSTRUCAO.md
Checklist executivo passo a passo.

**Conteúdo:**
- Pre-Flight: Setup antes de começar
- Durante Reconstrução: 5 fases (Read, Analyze, Plan, Write, Test)
- Post-Flight: Git commit e tracking
- Troubleshooting rápido
- Referências rápidas (assets, loaders, commands)
- Prioridades (P0/P1/P2)

**Quando usar:** Durante execução prática de cada componente.

**Como usar:**
1. Imprimir ou ter em tela separada
2. Seguir checkbox por checkbox
3. 15 minutos cronometrados
4. Validar no final de cada componente

---

## Workflow Executivo

### Por Componente (15 min)

```
1. Read (2 min)    → Ler arquivo existente
2. Analyze (3 min) → Contexto, assets, complexidade
3. Plan (2 min)    → Stories e seções de docs
4. Write (6 min)   → Reescrever com template
5. Test (2 min)    → Build + visual check
```

### Por Dia (6-8 componentes)

```
Manhã:
  - Comp 1 (15 min) + Build (5 min)
  - Comp 2 (15 min) + Build (5 min)  
  - Comp 3 (15 min) + Build (5 min)
  - Comp 4 (15 min) + Build (10 min review)

Tarde:
  - Comp 5-8 (repetir)
  
Total: 6-8 componentes/dia
```

---

## Priorização

### Fase 1 - P0 Critical (18 componentes - 2 dias)
Componentes com assets quebrados, slots vazios, documentação crítica.

**Inclui:**
- MediaCard, AlbumCover, AppCollapseItem
- QuestionAlternative, ESelect, FilterChip
- ExpiredMission, MissionDetailsPlus
- ProgressBar, RainbowProgressBar (5 variants)

### Fase 2 - P1 Core UI (25 componentes - 3 dias)
Forms, Cards, Navigation, Data Display, Feedback mais usados.

**Inclui:**
- Forms: EFormCheck, EInput, ETextarea, Selects
- Cards: MediaCard variants, SubjectCard
- Navigation: Tabs, Dividers
- Data Display: Tags, Status, Performance
- Modals: StudentActivity, StudentRound

### Fase 3 - P2 Specialized (68 componentes - 5 dias)
Tables, PDFs, Charts, Templates, componentes específicos.

**Inclui:**
- 18 Tables (Sorting, Pagination, Ranking, etc)
- 11 PDFs (Cards, Certificates, Performance, etc)
- 5 Charts (Bar, Pie, Radial, Default)
- 9 Templates (Layout variants)
- 25+ Specialized (Filters, Modals, Custom)

---

## Referências de Implementação

### CancelMission.stories.js
**Tipo:** Componente complexo com interação  
**Linhas:** 900+  
**Stories:** 3 (Confirmacao, Loading, Sucesso)  
**Destaques:**
- Inline SVG assets (Belinha mascote 240×240px)
- Loader para interações
- Múltiplos estados (confirmação, loading, sucesso)
- Documentação máxima

**Quando referenciar:** Componentes com múltiplos estados e interação.

---

### Card.stories.js
**Tipo:** Componente visual com impressão  
**Linhas:** 1200+  
**Stories:** 3 (Default, WithStudentData, PrintReady)  
**Destaques:**
- SVGs inline de frutas (gamificação)
- QR Code simplificado
- Layout de impressão A4 (grid 2×3)
- Print media queries

**Quando referenciar:** Componentes visuais, PDFs, impressão.

---

## Assets Disponíveis

```
Assets/
├── Gamificação/
│   ├── Estrelas.svg, Moedas.svg
│   ├── Troféu-Bronze.svg, Troféu-Prata.svg, Troféu-Ouro.svg
│   └── Insignias/
│
├── ícones de ação/
│   ├── delete.svg, edit.svg, badge.svg
│   ├── trophy.svg, social_leaderboard.svg
│   └── workspace_premium.svg
│
├── Áreas de conhecimento/
│   ├── Matemática.svg, Língua Portuguesa.svg
│   ├── Math.svg, LP.svg, LIGA.svg
│   └── [outras matérias]
│
├── Típos de usuários/
│   ├── Aluno.svg, Professor.svg
│   ├── Coordenadores.svg, Diretor.svg
│   └── Gestor.svg, Administrador.svg
│
├── Logos/
│   ├── Principal/logo.svg
│   ├── Variações/
│   └── Dark mode/
│
├── Interface/
│   ├── Acesso.svg
│   └── Group 9555.svg
│
└── Proficiência/
    ├── abaixo do básico.svg
    ├── básico.svg, proficiente.svg
    └── avançado.svg, não fizeram.svg
```

---

## Comandos Essenciais

```bash
# Build Storybook
npm run build-storybook

# Serve (após build)
cd storybook-static
python -m http.server 6006

# Build + Serve (one-liner)
npm run build-storybook && cd storybook-static && python -m http.server 6006

# Git workflow
git add src/stories/educacross-components-v2/ComponentName.stories.js
git commit -m "feat(stories): reconstruct ComponentName with professional docs"
git push origin v1.1

# Ver progresso
cat agent_helpers/tarefas.md | grep "DONE"
```

---

## Seções Obrigatórias de Documentação

Todo componente reconstruído deve ter:

1. **CSS Figma-style** (copiar de Card/CancelMission)
2. **Contexto de Uso** (persona, tela, fluxo, casos)
3. **Arquitetura da Informação** (ASCII trees)
4. **Especificações de Design** (6 tabelas):
   - Dimensões
   - Tipografia
   - Cores
   - Layout/Espaçamento
   - Assets (se tiver)
   - Comportamento/Estados
5. **Regras de Negócio** (se aplicável)
6. **Acessibilidade** (contraste, keyboard, ARIA)
7. **Exemplo de Integração** (Vue 2)
8. **Performance** (se relevante)
9. **Variações** (se houver)
10. **Componentes Relacionados**

**Plus:**
- UX Writing Matrix (comentário antes das stories)
- Mínimo 3 stories (Default, WithData, Interactive/Variant)

---

## Troubleshooting Rápido

| Erro | Fix |
|------|-----|
| "Unterminated template" | Verificar fechamento de template strings `` ` `` |
| "Parse error" | Verificar aspas escapadas e sintaxe JS |
| Assets 404 | Vuexy: `/vuexy/images/...` / Educacross: `.storybook/public/Assets/` |
| Vendor library não carrega | Adicionar loader apropriado (ver template) |
| Build muito lento | Remover assets inline grandes, usar referências |

---

## Métricas de Sucesso

### Por Componente
- ✓ Tempo: ≤ 15 minutos
- ✓ Build: Sem erros
- ✓ Stories: ≥ 3
- ✓ Documentação: Todas seções obrigatórias
- ✓ Assets: Todos funcionando
- ✓ Visual check: 100% aprovado

### Por Sprint (Dia)
- ✓ Componentes: 6-8
- ✓ Commits: 6-8 (1 por componente)
- ✓ Build time: < 20s
- ✓ Zero erros de console

---

## Próximos Passos

1. **Validar Card:** Coletar feedback do Card reconstruído
2. **Ajustar Pipeline:** Refinar com base em feedback
3. **Iniciar P0:** 18 componentes críticos
4. **Escalar P1 e P2:** 93 componentes restantes

**Timeline:**
- Fase 1 (P0): 2 dias → 18 componentes
- Fase 2 (P1): 3 dias → 25 componentes
- Fase 3 (P2): 5 dias → 68 componentes
**Total: 10 dias úteis para 111 componentes**

---

## Contato

**Documentação Criada:** 2 de fevereiro de 2026  
**Status:** Validado com 2 componentes (CancelMission, Card)  
**Branch:** v1.1  
**Repository:** fabioeducacross/DesignSystem-Vuexy

**Feedback:** Testar Card.stories.js e reportar ajustes necessários antes de escalar.
