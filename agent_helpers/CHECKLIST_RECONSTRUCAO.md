# Checklist de Reconstrução - Quick Reference

## Pre-Flight (Antes de Começar)

```bash
cd c:\Users\Educacross\Documents\Educacross\DesignSystem-Vuexy
git checkout v1.1
git pull origin v1.1
```

- [ ] Storybook server parado (Ctrl+C no terminal)
- [ ] Branch v1.1 atualizada
- [ ] Arquivo template aberto (agent_helpers/TEMPLATE_COMPONENT.stories.js)
- [ ] Card.stories.js aberto como referência

---

## Durante Reconstrução (Por Componente)

### 1. Read (2 min)

- [ ] Abrir arquivo .stories.js existente
- [ ] Identificar @source (path do Vue original)
- [ ] Anotar CSS classes principais
- [ ] Verificar assets referenciados (@/assets)

### 2. Analyze (3 min)

- [ ] Definir persona usuária (Aluno/Professor/Coord/Admin)
- [ ] Identificar tela/fluxo onde aparece
- [ ] Listar casos de uso (3 principais)
- [ ] Categorizar complexidade (Simples/Médio/Complexo)
- [ ] Mapear assets para pasta Assets/

### 3. Plan (2 min)

- [ ] Decidir número de stories (mínimo 3)
  - [ ] Default (sempre)
  - [ ] WithData/RealData (sempre)
  - [ ] Interactive/Variant/Special (contexto)
- [ ] Definir seções de documentação necessárias
- [ ] Identificar vendor libraries (Bootstrap/Flatpickr/etc)

### 4. Write (6 min)

#### Header
- [ ] Copiar template completo
- [ ] Atualizar título e descrição
- [ ] Preencher @source correto
- [ ] Atualizar @assets com paths reais
- [ ] Ajustar title (Educacross Components V2/Categoria/Nome)

#### Documentação
- [ ] CSS Figma-style (copiar de Card/CancelMission)
- [ ] Título H1 + descrição curta
- [ ] **Contexto de Uso** (persona, tela, fluxo, casos)
- [ ] **Arquitetura da Informação** (ASCII trees)
- [ ] **Especificações de Design** (6 tabelas):
  - [ ] Dimensões
  - [ ] Tipografia
  - [ ] Cores
  - [ ] Layout/Espaçamento
  - [ ] Assets (se tiver)
  - [ ] Comportamento/Estados
- [ ] **Regras de Negócio** (se aplicável)
- [ ] **Acessibilidade** (contraste, keyboard, ARIA)
- [ ] **Exemplo de Integração** (Vue 2)
- [ ] **Performance** (se relevante)
- [ ] **Variações** (se houver)
- [ ] **Componentes Relacionados**

#### UX Writing Matrix
- [ ] Listar todos os elementos de texto
- [ ] Preencher colunas: Elemento, Tipo, Conteúdo, Tom, Função
- [ ] Adicionar 3-5 princípios de copy

#### CSS Styles
- [ ] Copiar CSS existente ou criar novo
- [ ] Adicionar estados (hover, active, disabled)
- [ ] Media queries (responsivo, print)

#### Stories
- [ ] **Default Story:**
  - [ ] Descrição clara no parameters.docs
  - [ ] HTML básico funcional
  - [ ] Assets inline ou referenciados
  
- [ ] **WithData Story:**
  - [ ] Dados realistas
  - [ ] Demonstra uso real
  
- [ ] **Interactive/Variant Story:**
  - [ ] Loader se necessário
  - [ ] setTimeout(100) para init JS
  - [ ] Demonstra interação principal

### 5. Test (2 min)

- [ ] Salvar arquivo
- [ ] Build Storybook:
  ```bash
  npm run build-storybook
  ```
- [ ] Verificar console - sem erros de parse
- [ ] Iniciar servidor:
  ```bash
  cd storybook-static
  python -m http.server 6006
  ```
- [ ] Abrir http://localhost:6006
- [ ] Navegar até componente
- [ ] **Visual Check:**
  - [ ] Documentação renderiza corretamente
  - [ ] Tabelas formatadas (não quebradas)
  - [ ] CSS profissional aplicado
  - [ ] Stories todas visíveis e funcionais
  - [ ] Assets carregando (não 404)
  - [ ] Interações funcionando (se aplicável)

---

## Post-Flight (Após Componente)

### Git

```bash
git add src/stories/educacross-components-v2/[ComponentName].stories.js
git commit -m "feat(stories): reconstruct [ComponentName] with professional docs

- Add Figma-style CSS documentation
- Create 3 stories (Default, WithData, [Third])
- Map assets from Assets/[Folder]
- Add UX Writing matrix
- Add Architecture diagrams
- Add complete spec tables"
```

### Update Progress

- [ ] Marcar componente como DONE em tarefas.md
- [ ] Atualizar contador (ex: 3/111 concluídos)
- [ ] Anotar tempo real gasto
- [ ] Anotar dificuldades encontradas

---

## Troubleshooting Rápido

### Erro: "Unterminated template"
**Fix:** Verificar fechamento de template strings com `` ` ``

### Erro: "Parse error"
**Fix:** Verificar aspas escapadas e sintaxe JS válida

### Assets 404
**Fix:** 
- Vuexy: `/vuexy/images/...`
- Educacross: Copiar para `.storybook/public/Assets/`

### Vendor Library não carrega
**Fix:** Adicionar loader apropriado (ver TEMPLATE_COMPONENT.stories.js)

### Build muito lento
**Fix:** Remover assets inline grandes, usar referências

---

## Referências Rápidas

### Paths de Assets

```javascript
// Logo Educacross
<img src="/vuexy/images/logo.png">

// Ícones Gamificação
Assets/Gamificação/Estrelas.svg
Assets/Gamificação/Moedas.svg
Assets/Gamificação/Troféu-Bronze.svg

// Ícones Ação
Assets/ícones de ação/delete.svg
Assets/ícones de ação/edit.svg

// Áreas Conhecimento
Assets/Áreas de conhecimento/Matemática.svg
Assets/Áreas de conhecimento/Língua Portuguesa.svg
```

### Vendor Loaders

```javascript
// Bootstrap JS
script.src = '/vuexy/js/bootstrap.js';

// Flatpickr
script.src = '/vuexy/vendors/libs/flatpickr/flatpickr.js';

// Select2
script.src = '/vuexy/vendors/libs/select2/select2.js';

// FullCalendar
script.src = '/vuexy/vendors/libs/fullcalendar/fullcalendar.js';
```

### Layout Options

```javascript
parameters: {
  layout: 'padded'    // Padrão, com padding
  layout: 'centered'  // Centralizado
  layout: 'fullscreen' // Tela cheia (tables, templates)
}
```

---

## Métricas de Sucesso

### Por Componente
- Tempo: ≤ 15 minutos
- Build: Sem erros
- Stories: ≥ 3
- Documentação: Todas seções obrigatórias
- Assets: Todos funcionando

### Por Dia (Sprint)
- Componentes: 6-8
- Commits: 6-8 (1 por componente)
- Build time: < 20s
- Visual check: 100% aprovado

---

## Quick Commands

```bash
# Build
npm run build-storybook

# Serve
cd storybook-static && python -m http.server 6006

# Build + Serve (one-liner)
npm run build-storybook && cd storybook-static && python -m http.server 6006

# Kill server on port 6006 (se travar)
Get-Process | Where-Object {$_.Id -eq (Get-NetTCPConnection -LocalPort 6006).OwningProcess} | Stop-Process -Force

# Git status
git status
git log --oneline -5

# Ver componentes restantes
# Abrir: agent_helpers/tarefas.md
```

---

## Prioridades

### P0 Critical (18) - Fazer PRIMEIRO
- Componentes com assets quebrados
- Componentes com slots vazios
- Componentes de documentação crítica

### P1 Core UI (25) - Fazer SEGUNDO
- Forms, Cards, Navigation
- Data Display, Feedback
- Componentes mais usados

### P2 Specialized (68) - Fazer POR ÚLTIMO
- Tables, PDFs, Charts
- Templates, Modals complexos
- Componentes específicos

---

## Próximo Componente

Antes de começar, responder:

1. **Nome:** [ComponentName]
2. **Categoria P0/P1/P2:** [Prioridade]
3. **Complexidade:** [Simples/Médio/Complexo]
4. **Assets necessários:** [Lista]
5. **Vendor libraries:** [Lista se houver]
6. **Tempo estimado:** [10/15/20 min]

**COMEÇAR!**
