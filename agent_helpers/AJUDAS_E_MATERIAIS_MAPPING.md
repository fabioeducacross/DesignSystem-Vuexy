# Mapeamento Figma → Storybook: [professor] Ajudas e Materiais

**Última atualização**: 16 de fevereiro de 2026  
**Frame Figma**: `7801:24711` - "[professor] Ajudas e Materiais"  
**Dimensões**: 1366 × 1842px  
**Status**: ✅ VALIDADO COM PLAYWRIGHT

---

## 📊 Resumo do Mapeamento

| Seção Figma | Componente Design System | Status | Gap |
|-------------|--------------------------|--------|-----|
| Background | Não mapeado (layout container) | N/A | - |
| Menu professor (Sidebar) | `Sidebar.stories.js` | ✅ Existe | - |
| Content Container | Layout pattern | N/A | - |
| Global Header | `AppNavbar.stories.js` | ✅ Existe | - |
| Breadcrumb | `Breadcrumb.stories.js` (Vuexy) | ✅ Existe | - |
| Hero Banner (Rectangle 39396) | **NÃO EXISTE** | ❌ Gap | Criar `HeroBanner.stories.js` |
| Filtros Tema (Frame 481672) | `FilterChip.stories.js` parcial | ⚠️ Parcial | Criar story de grupo |
| Barra de Busca | `EInput.stories.js` | ✅ Existe | - |
| Select de Opções | `ESelect.stories.js` | ✅ Existe | - |
| Botão Filtros | Button (Vuexy) | ✅ Existe | - |
| Card Material (imagem) | `ResourceCard.stories.js` | ✅ **CRIADO** | - |
| Card Material (vídeo/interativo) | `ResourceCard.stories.js` | ✅ **CRIADO** | - |
| Card Material (áudio) | `ResourceCard.stories.js` | ✅ **CRIADO** | Mini-player inline |
| Tags de Categoria (Proficiente, etc) | `FilterChip.stories.js` | ✅ Existe | - |
| Botão Baixar | Button (Vuexy) | ✅ Existe | - |
| Pagination | `ListTablePagination.stories.js` | ✅ Existe | - |
| Footer Social (SMM) | **NÃO EXISTE** | ❌ Gap | Criar `SocialFooter.stories.js` |
| Tooltip | Tooltip (Vuexy) | ✅ Existe | - |

### 🎉 Componente Criado Nesta Sessão

**ResourceCard** (`src/stories/educacross-components-v2/ResourceCard.stories.js`)
- ✅ Validado com Playwright MCP
- ✅ 10 stories: Default, Video, Audio, Document, Interactive, AllVariants, GridLayout, WithoutMenu, ViewOnly
- ✅ 5 variantes de tipo: image, video, audio, document, interactive
- ✅ Mini-player de áudio inline funcional
- ✅ Overlay de play para vídeos
- ✅ Controles interativos (settings, fullscreen, open_in_new)

---

## 🔍 Análise Detalhada por Bloco

### 1. Layout Principal (Frame 7801:24711)

**Estrutura**:
- `Background` (rounded-rectangle): Fundo #FFFFFF
- `Menu professor` (symbol): Sidebar lateral esquerda - 260px width
- `Content` (frame): Área de conteúdo - 1066px width, offset 280px

**Mapeamento**:
- **Sidebar**: Mapeado → `Educacross Components V2/Navigation/Sidebar`
- **Layout Container**: Padrão de página, não precisa de story isolada

---

### 2. Header Global (Instance 7801:25556)

**Figma Node**: `Default global-header` - 1366×62px

**Componente Existente**: ✅ `AppNavbar.stories.js`
- Status: PIXEL-PERFECT
- Path: `Educacross Components V2/Navigation/AppNavbar`

---

### 3. Breadcrumb (Instance 7801:24837)

**Figma Node**: `Default Breadcrumb` - 172×21px

**Componente Existente**: ✅ `Breadcrumb.stories.js`
- Path: `Vuexy/Molecules/Navigation/Breadcrumb`
- Suporta: items array, icons, aria-label

---

### 4. Hero Banner (Symbol 7802:2962)

**Figma Node**: `Rectangle 39396` - 1066×160px

❌ **GAP IDENTIFICADO**: Não existe componente dedicado

**Proposta de Novo Componente**:
```
Nome: HeroBanner
Path: Educacross Components V2/Content/HeroBanner
Props:
  - title: String
  - subtitle: String
  - backgroundImage: String (opcional)
  - backgroundColor: String (gradiente ou cor sólida)
  - actions: Array<{ label, href, variant }>
Uso:
  - Cabeçalho de seções como "Ajudas e Materiais", "Missões", etc.
```

---

### 5. Filtros de Tema (Symbol 7801:24992)

**Figma Node**: `Frame 481672` - 1066×112px

**Componente Parcialmente Existente**: ⚠️ `FilterChip.stories.js`
- Tags individuais funcionam
- Falta: Composição de grupo de filtros com toggle

**Proposta de Extensão**:
```
Nome: FilterGroup
Path: Educacross Components V2/Forms/FilterGroup
Props:
  - filters: Array<{ id, label, icon, active }>
  - onToggle: Function
Uso:
  - Grupo de filtros por categoria (tema, tipo, dificuldade)
```

---

### 6. Barra de Busca (Frame 7801:24999)

**Figma Node**: `Busca Tema` - 1066×84px

**Estrutura Interna**:
- Select de opções (Frame 7801:25001): `ESelect`
- Campo de busca (Frame 7801:25005): `EInput` type="search"
- Botão filtros (Frame 7801:25008): Button com ícone

**Componentes Existentes**: ✅ Todos disponíveis
- `ESelect.stories.js`
- `EInput.stories.js`
- Button (Vuexy atoms)

**Proposta de Composição**:
```
Nome: SearchBar
Path: Educacross Components V2/Forms/SearchBar
Props:
  - placeholder: String
  - filterOptions: Array
  - showFilterButton: Boolean
  - onSearch: Function
  - onFilter: Function
Uso:
  - Barra de busca com select + input + botão de filtro
```

---

### 7. Cards de Material (Frame 7801:25014)

**Figma Node**: `Frame 481487` - 1066×1164px (grid 4×3 de cards)

**Estrutura de Card** (7801:25016 - `Material`):
- Dimensões: 259×362px
- Header: Menu contextual (more_horiz)
- Imagem/Mídia: 219×148px (rounded)
- Tags: Badges de categoria
- Título: 219×52px
- Ação: Botão "Baixar" ou mini-player

❌ **GAP IDENTIFICADO**: Não existe componente dedicado para Resource Card

### 7.1 Variantes de Cards Identificadas

| Variante | Exemplo Figma | Características |
|----------|---------------|-----------------|
| Imagem Estática | 7801:25016 | Thumbnail + tags + título + download |
| Vídeo/Interativo | 7801:25059 | Thumbnail com overlay de player |
| Áudio | 7801:25124 | Mini-player embutido (play, progress, volume) |
| Visualização | 7801:25154 | Thumbnail com ícone de visualizar (eye) |

**Proposta de Novo Componente**:
```
Nome: ResourceCard
Path: Educacross Components V2/Cards/ResourceCard
Props:
  - type: 'image' | 'video' | 'audio' | 'document' | 'interactive'
  - title: String
  - thumbnail: String
  - tags: Array<{ label, variant }>
  - menuOptions: Array<{ label, icon, action }>
  - downloadable: Boolean
  - audioSrc: String (se type='audio')
  - videoSrc: String (se type='video')
Variantes:
  - Default: Imagem com download
  - Video: Overlay de play
  - Audio: Mini-player inline
  - Interactive: Botões de ação (settings, open, zoom)
  - Preview: Ícone de visualização
```

---

### 8. Mini-Player de Áudio (Frame 7801:25142)

**Figma Node**: `Frame 481201` - 219×40px

**Estrutura**:
- Play/Pause button (20×20px)
- Timestamp: "00:00 / 00:35"
- Progress bar (80×5px)
- Volume control (20×20px)

**Componente Parcial**: ⚠️ `AlbumCover.stories.js` tem player integration

❌ **GAP IDENTIFICADO**: Falta mini-player inline para cards

**Proposta de Novo Componente**:
```
Nome: MiniAudioPlayer
Path: Educacross Components V2/Media/MiniAudioPlayer
Props:
  - src: String (URL do áudio)
  - duration: Number (segundos)
  - compact: Boolean
  - showVolume: Boolean
Uso:
  - Player de áudio compacto para cards de recurso
```

---

### 9. Paginação (Frame 7801:25523)

**Figma Node**: `Pagination` - 1066×48px

**Estrutura**:
- Info: "Showing 1 to 7 of 10"
- Navegação: Previous | Numbers | Next

**Componente Existente**: ✅ `ListTablePagination.stories.js`
- Status: PIXEL-PERFECT
- Path: `Educacross Components V2/Tables/ListTablePagination`

---

### 10. Footer Social (Frame 7801:25542)

**Figma Node**: `Frame 481205` - 1066×75px

**Estrutura**:
- Texto: "Checked" (central)
- Ícones sociais: Facebook, YouTube, Instagram (24×24px)

❌ **GAP IDENTIFICADO**: Não existe componente de footer social

**Proposta de Novo Componente**:
```
Nome: SocialFooter
Path: Educacross Components V2/Content/SocialFooter
Props:
  - title: String
  - socialLinks: Array<{ platform, url, icon }>
Uso:
  - Rodapé com links de redes sociais
```

---

### 11. Tooltips (Frames 7801:25557 e 7801:25562)

**Figma Nodes**: 
- `Tooltip-` - 182×20px
- `Tooltip-` - 236×24px

**Componente Existente**: ✅ Tooltip (Vuexy Molecules)
- Path: `Vuexy/Molecules/Overlays/Tooltip`

---

## 📋 Sumário de Gaps

### Componentes a Criar (Prioridade Alta)

1. **`ResourceCard`** - Card de material educacional com variantes
2. **`HeroBanner`** - Banner de cabeçalho de seção
3. **`MiniAudioPlayer`** - Player de áudio compacto inline

### Componentes a Criar (Prioridade Média)

4. **`SearchBar`** - Composição de select + input + filtros
5. **`FilterGroup`** - Grupo de filtros toggle
6. **`SocialFooter`** - Rodapé com links sociais

### Componentes Existentes (OK)

- Sidebar ✅
- AppNavbar ✅
- Breadcrumb ✅
- ESelect ✅
- EInput ✅
- FilterChip ✅
- ListTablePagination ✅
- Buttons ✅
- Tooltips ✅

---

## 🎯 Próximos Passos

1. [ ] Criar `ResourceCard.stories.js` com as 4 variantes identificadas
2. [ ] Criar `HeroBanner.stories.js` para cabeçalhos de seção
3. [ ] Criar `MiniAudioPlayer.stories.js` para cards de áudio
4. [ ] Criar composição `SearchBar.stories.js`
5. [ ] Estender `FilterChip` com story de grupo
6. [ ] Criar `SocialFooter.stories.js`

---

## 📎 Referências

- **Frame Figma**: `7801:24711`
- **IDs dos Elementos Principais**:
  - Sidebar: `7801:29568`
  - Header: `7801:25556`
  - Breadcrumb: `7801:24837`
  - Hero: `7802:2962`
  - Filtros: `7801:24992`
  - Cards Grid: `7801:25014`
  - Pagination: `7801:25523`
  - Footer: `7801:25542`
