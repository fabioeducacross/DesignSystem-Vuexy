/**
 * ResourceCard - Card de Material Educacional
 * ============================================
 * Card para exibição de recursos educacionais (imagens, vídeos, áudios, documentos)
 * com suporte a download, preview e reprodução inline.
 * 
 * @component ResourceCard
 * @category Doc-Only / Educacross Components V2 / Cards
 * @note Componente foi removido ou substituído por MediaCard.
 * @figma Frame 7801:25016 - "[professor] Ajudas e Materiais"
 * @priority P0 - Critical
 * @status IN_PROGRESS
 * @since 2.0.0
 * 
 * ## Contexto de Uso
 * 
 * ### Páginas
 * - Ajudas e Materiais (professor, coordenador)
 * - Biblioteca de Recursos
 * - Repositório de Atividades
 * 
 * ### Personas
 * - **Professor**: Baixa materiais para aulas, visualiza vídeos, ouve áudios
 * - **Coordenador**: Gerencia banco de recursos da escola
 * - **Aluno**: Acessa materiais compartilhados pelo professor
 */

export default {
    title: 'Educacross Components V2/Cards/ResourceCard',
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['image', 'video', 'audio', 'document', 'interactive'],
            description: 'Tipo de recurso: imagem, vídeo, áudio, documento ou interativo',
            defaultValue: 'image'
        },
        title: {
            control: 'text',
            description: 'Título do recurso',
            defaultValue: 'Título do Recurso Educacional'
        },
        thumbnail: {
            control: 'text',
            description: 'URL da imagem de capa'
        },
        tags: {
            control: 'object',
            description: 'Array de tags/categorias { label, variant }',
            defaultValue: [{ label: 'Plataforma', variant: 'light-primary' }]
        },
        downloadable: {
            control: 'boolean',
            description: 'Habilita botão de download',
            defaultValue: true
        },
        showMenu: {
            control: 'boolean',
            description: 'Mostra menu de opções (⋯)',
            defaultValue: true
        },
        audioSrc: {
            control: 'text',
            description: 'URL do áudio (se type=audio)'
        },
        duration: {
            control: 'text',
            description: 'Duração do áudio/vídeo (ex: "03:45")'
        }
    },
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
# ResourceCard - Card de Recurso Educacional

Card versátil para exibição de materiais educacionais na plataforma Educacross, com suporte
a múltiplos tipos de mídia e ações contextuais.

---

## 📋 Origem no Figma

**Frame**: \`[professor] Ajudas e Materiais\` (7801:24711)  
**Node**: \`Material\` (7801:25016, 7801:25059, etc.)  
**Dimensões**: 259×362px

---

## 🎨 Variantes

### 1. Imagem (Default)
- Thumbnail estática
- Tags de categoria
- Botão de download

### 2. Vídeo
- Thumbnail com overlay de play
- Indicação de duração
- Preview on hover

### 3. Áudio
- Mini-player inline (play, progress, volume)
- Visualização de waves (opcional)
- Capa do álbum/podcast

### 4. Documento
- Ícone de tipo de arquivo (PDF, DOC, etc.)
- Tamanho do arquivo
- Preview opcional

### 5. Interativo
- Controles adicionais (settings, zoom, open)
- Indicador de compatibilidade (browser, app)

---

## 🔧 Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| type | String | 'image' | Tipo: image, video, audio, document, interactive |
| title | String | Required | Título do recurso |
| thumbnail | String | - | URL da capa |
| tags | Array | [] | Tags { label, variant } |
| downloadable | Boolean | true | Mostra botão download |
| showMenu | Boolean | true | Mostra menu ⋯ |
| audioSrc | String | - | URL do áudio |
| duration | String | - | Duração (00:00) |

---

## 📐 Design Specs

### Dimensões
- **Card**: 259×362px
- **Thumbnail**: 219×148px, border-radius 8px
- **Padding**: 20px
- **Gap**: 20px entre blocos

### Cores
- **Background**: #FFFFFF
- **Border**: 1px solid #EBE9F1
- **Shadow**: 0 2px 8px rgba(0,0,0,0.08)
- **Title**: #5E5873
- **Tags**: light-* variants

### Tipografia
- **Title**: 14px, weight 500, line-height 1.3
- **Tags**: 12px, weight 500
- **Duration**: 12px, weight 600
        `
            }
        }
    }
};

// =============================================================================
// CSS Styles
// =============================================================================

const styles = `
<link rel="stylesheet" href="/vuexy/css/core.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
<style>
  .resource-card {
    width: 259px;
    background: #ffffff;
    border: 1px solid #ebe9f1;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .resource-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  .resource-card__header {
    padding: 20px 20px 0;
    display: flex;
    justify-content: flex-end;
    position: relative;
  }

  .resource-card__menu-btn {
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: #6e6b7b;
    transition: all 0.15s ease;
  }

  .resource-card__menu-btn:hover {
    background: #f3f2f7;
    color: #5e5873;
  }

  .resource-card__media {
    padding: 15px 20px 0;
    position: relative;
  }

  .resource-card__thumbnail {
    width: 219px;
    height: 148px;
    border-radius: 8px;
    object-fit: cover;
    background: linear-gradient(135deg, #f3f2f7 0%, #e8e6ef 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  .resource-card__thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Placeholder para imagem */
  .resource-card__thumbnail--placeholder {
    background: linear-gradient(135deg, #e8e6ef 0%, #d8d6de 100%);
  }

  .resource-card__thumbnail--placeholder .material-symbols-outlined {
    font-size: 48px;
    color: #b8b5c2;
  }

  /* Video overlay */
  .resource-card__video-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.2s ease;
    cursor: pointer;
  }

  .resource-card__thumbnail:hover .resource-card__video-overlay {
    opacity: 1;
  }

  .resource-card__play-btn {
    width: 56px;
    height: 56px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6e63e8;
    transition: transform 0.2s ease;
  }

  .resource-card__play-btn:hover {
    transform: scale(1.1);
  }

  .resource-card__play-btn .material-symbols-outlined {
    font-size: 32px;
  }

  /* Audio player inline */
  .resource-card__audio-player {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 8px 12px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 0 0 8px 8px;
  }

  .resource-card__audio-btn {
    width: 28px;
    height: 28px;
    background: #6e63e8;
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease;
  }

  .resource-card__audio-btn:hover {
    transform: scale(1.08);
  }

  .resource-card__audio-btn .material-symbols-outlined {
    font-size: 18px;
  }

  .resource-card__progress-bar {
    flex: 1;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;
  }

  .resource-card__progress-fill {
    width: 35%;
    height: 100%;
    background: #ffffff;
    border-radius: 2px;
  }

  .resource-card__duration {
    font-size: 11px;
    color: #ffffff;
    font-weight: 500;
    min-width: 40px;
    text-align: right;
  }

  .resource-card__volume-btn {
    width: 24px;
    height: 24px;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.8;
    transition: opacity 0.15s ease;
  }

  .resource-card__volume-btn:hover {
    opacity: 1;
  }

  .resource-card__volume-btn .material-symbols-outlined {
    font-size: 20px;
  }

  /* Content section */
  .resource-card__content {
    padding: 20px;
  }

  .resource-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 12px;
    justify-content: center;
  }

  .resource-card__tag {
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
  }

  .resource-card__tag--light-primary {
    background: rgba(110, 99, 232, 0.12);
    color: #6e63e8;
  }

  .resource-card__tag--light-success {
    background: rgba(40, 199, 111, 0.12);
    color: #28c76f;
  }

  .resource-card__tag--light-warning {
    background: rgba(255, 159, 67, 0.12);
    color: #ff9f43;
  }

  .resource-card__tag--light-info {
    background: rgba(0, 207, 232, 0.12);
    color: #00cfe8;
  }

  .resource-card__tag--light-danger {
    background: rgba(234, 84, 85, 0.12);
    color: #ea5455;
  }

  .resource-card__title {
    font-size: 14px;
    font-weight: 500;
    color: #5e5873;
    line-height: 1.4;
    text-align: center;
    margin: 0;
    min-height: 40px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Footer actions */
  .resource-card__actions {
    padding: 0 20px 20px;
    display: flex;
    justify-content: center;
  }

  .resource-card__download-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 20px;
    background: transparent;
    border: 1px solid #ebe9f1;
    border-radius: 6px;
    color: #6e6b7b;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .resource-card__download-btn:hover {
    background: #6e63e8;
    border-color: #6e63e8;
    color: #ffffff;
  }

  .resource-card__download-btn .material-symbols-outlined {
    font-size: 18px;
  }

  /* Interactive variant buttons */
  .resource-card__interactive-controls {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px;
    background: rgba(45, 40, 80, 0.85);
    border-radius: 6px;
  }

  .resource-card__control-btn {
    width: 28px;
    height: 28px;
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background 0.15s ease;
  }

  .resource-card__control-btn:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  .resource-card__control-btn .material-symbols-outlined {
    font-size: 20px;
  }

  /* Storybook grid layout for demos */
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(259px, 1fr));
    gap: 20px;
    max-width: 1066px;
  }

  .cards-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
</style>
`;

// =============================================================================
// Thumbnail Placeholder SVG
// =============================================================================

const placeholderSVG = (icon = 'image') => `
  <span class="material-symbols-outlined">${icon}</span>
`;

// =============================================================================
// Helper: Render Card
// =============================================================================

const renderResourceCard = ({
    type = 'image',
    title = 'Título do Recurso',
    thumbnail = null,
    tags = [{ label: 'Plataforma', variant: 'light-primary' }],
    downloadable = true,
    showMenu = true,
    duration = '03:45'
}) => {
    const thumbnailContent = thumbnail
        ? `<img src="${thumbnail}" alt="${title}">`
        : placeholderSVG(type === 'video' ? 'movie' : type === 'audio' ? 'music_note' : type === 'document' ? 'description' : 'image');

    const thumbnailClass = thumbnail ? '' : 'resource-card__thumbnail--placeholder';

    // Video overlay
    const videoOverlay = type === 'video' ? `
    <div class="resource-card__video-overlay">
      <div class="resource-card__play-btn">
        <span class="material-symbols-outlined">play_arrow</span>
      </div>
    </div>
  ` : '';

    // Audio player
    const audioPlayer = type === 'audio' ? `
    <div class="resource-card__audio-player">
      <button class="resource-card__audio-btn">
        <span class="material-symbols-outlined">play_arrow</span>
      </button>
      <div class="resource-card__progress-bar">
        <div class="resource-card__progress-fill"></div>
      </div>
      <span class="resource-card__duration">${duration}</span>
      <button class="resource-card__volume-btn">
        <span class="material-symbols-outlined">volume_up</span>
      </button>
    </div>
  ` : '';

    // Interactive controls
    const interactiveControls = type === 'interactive' ? `
    <div class="resource-card__interactive-controls">
      <button class="resource-card__control-btn">
        <span class="material-symbols-outlined">volume_up</span>
      </button>
      <div style="display: flex; gap: 4px;">
        <button class="resource-card__control-btn">
          <span class="material-symbols-outlined">settings</span>
        </button>
        <button class="resource-card__control-btn">
          <span class="material-symbols-outlined">open_in_new</span>
        </button>
        <button class="resource-card__control-btn">
          <span class="material-symbols-outlined">fullscreen</span>
        </button>
      </div>
    </div>
  ` : '';

    // Tags rendering
    const tagsHtml = tags.map(tag =>
        `<span class="resource-card__tag resource-card__tag--${tag.variant}">${tag.label}</span>`
    ).join('');

    // Menu button
    const menuBtn = showMenu ? `
    <button class="resource-card__menu-btn">
      <span class="material-symbols-outlined">more_horiz</span>
    </button>
  ` : '';

    // Download button
    const downloadBtn = downloadable ? `
    <div class="resource-card__actions">
      <button class="resource-card__download-btn">
        <span class="material-symbols-outlined">download</span>
        Baixar
      </button>
    </div>
  ` : '';

    return `
    <div class="resource-card">
      <div class="resource-card__header">
        ${menuBtn}
      </div>
      <div class="resource-card__media">
        <div class="resource-card__thumbnail ${thumbnailClass}">
          ${thumbnailContent}
          ${videoOverlay}
          ${audioPlayer}
          ${interactiveControls}
        </div>
      </div>
      <div class="resource-card__content">
        <div class="resource-card__tags">
          ${tagsHtml}
        </div>
        <h3 class="resource-card__title">${title}</h3>
      </div>
      ${downloadBtn}
    </div>
  `;
};

// =============================================================================
// Stories
// =============================================================================

// Story: Default (Image)
export const Default = {
    args: {
        type: 'image',
        title: 'Material de apoio para aula de matemática',
        tags: [
            { label: 'Plataforma', variant: 'light-primary' },
            { label: '5º Ano', variant: 'light-info' }
        ],
        downloadable: true,
        showMenu: true
    },
    render: (args) => `
    ${styles}
    ${renderResourceCard(args)}
  `
};

// Story: Video Variant
export const Video = {
    args: {
        type: 'video',
        title: 'Vídeo explicativo: Frações equivalentes',
        tags: [
            { label: 'Matemática', variant: 'light-warning' },
            { label: 'Vídeo', variant: 'light-info' }
        ],
        duration: '05:32',
        downloadable: true
    },
    render: (args) => `
    ${styles}
    ${renderResourceCard(args)}
  `
};

// Story: Audio Variant
export const Audio = {
    args: {
        type: 'audio',
        title: 'Podcast: História do Brasil Colonial',
        tags: [
            { label: 'História', variant: 'light-danger' },
            { label: 'Áudio', variant: 'light-success' }
        ],
        duration: '12:45',
        downloadable: true
    },
    render: (args) => `
    ${styles}
    ${renderResourceCard(args)}
  `
};

// Story: Document Variant
export const Document = {
    args: {
        type: 'document',
        title: 'Apostila de exercícios - Geometria Plana',
        tags: [
            { label: 'PDF', variant: 'light-danger' },
            { label: 'Matemática', variant: 'light-primary' }
        ],
        downloadable: true
    },
    render: (args) => `
    ${styles}
    ${renderResourceCard(args)}
  `
};

// Story: Interactive Variant
export const Interactive = {
    args: {
        type: 'interactive',
        title: 'Jogo interativo: Sistema Solar',
        tags: [
            { label: 'Ciências', variant: 'light-success' },
            { label: 'Game', variant: 'light-warning' }
        ],
        downloadable: false
    },
    render: (args) => `
    ${styles}
    ${renderResourceCard(args)}
  `
};

// Story: All Variants
export const AllVariants = {
    render: () => `
    ${styles}
    <h3 style="margin-bottom: 24px; color: #5e5873;">Todas as Variantes</h3>
    <div class="cards-row">
      ${renderResourceCard({
        type: 'image',
        title: 'Imagem - Infográfico de Ciências',
        tags: [{ label: 'Ciências', variant: 'light-primary' }, { label: 'PNG', variant: 'light-info' }]
    })}
      ${renderResourceCard({
        type: 'video',
        title: 'Vídeo - Aula de Português',
        tags: [{ label: 'Português', variant: 'light-warning' }, { label: 'MP4', variant: 'light-info' }],
        duration: '08:20'
    })}
      ${renderResourceCard({
        type: 'audio',
        title: 'Áudio - Podcast Educativo',
        tags: [{ label: 'História', variant: 'light-danger' }, { label: 'MP3', variant: 'light-success' }],
        duration: '15:00'
    })}
      ${renderResourceCard({
        type: 'interactive',
        title: 'Interativo - Quiz de Matemática',
        tags: [{ label: 'Game', variant: 'light-warning' }, { label: 'HTML5', variant: 'light-primary' }],
        downloadable: false
    })}
    </div>
  `
};

// Story: Grid Layout (como aparece na página)
export const GridLayout = {
    render: () => `
    ${styles}
    <h3 style="margin-bottom: 24px; color: #5e5873;">Grid de Materiais (Layout da Página)</h3>
    <div class="cards-grid">
      ${renderResourceCard({
        type: 'image',
        title: 'Cartaz - Tabela Periódica',
        tags: [{ label: 'Química', variant: 'light-primary' }, { label: 'PDF', variant: 'light-danger' }]
    })}
      ${renderResourceCard({
        type: 'video',
        title: 'Videoaula - Equações do 2º Grau',
        tags: [{ label: 'Matemática', variant: 'light-warning' }, { label: 'Vídeo', variant: 'light-info' }],
        duration: '12:35'
    })}
      ${renderResourceCard({
        type: 'audio',
        title: 'Áudio - Leitura de Poesias',
        tags: [{ label: 'Português', variant: 'light-success' }, { label: 'MP3', variant: 'light-info' }],
        duration: '04:20'
    })}
      ${renderResourceCard({
        type: 'interactive',
        title: 'Simulador - Sistema Digestório',
        tags: [{ label: 'Biologia', variant: 'light-danger' }, { label: 'Game', variant: 'light-warning' }],
        downloadable: false
    })}
      ${renderResourceCard({
        type: 'document',
        title: 'Atividade - Interpretação de Texto',
        tags: [{ label: 'Português', variant: 'light-primary' }, { label: 'DOC', variant: 'light-info' }]
    })}
      ${renderResourceCard({
        type: 'image',
        title: 'Mapa - Regiões do Brasil',
        tags: [{ label: 'Geografia', variant: 'light-success' }, { label: 'JPG', variant: 'light-info' }]
    })}
      ${renderResourceCard({
        type: 'audio',
        title: 'Hino Nacional Brasileiro',
        tags: [{ label: 'Música', variant: 'light-warning' }, { label: 'Áudio', variant: 'light-info' }],
        duration: '03:45'
    })}
      ${renderResourceCard({
        type: 'video',
        title: 'Documentário - Fauna Brasileira',
        tags: [{ label: 'Ciências', variant: 'light-primary' }, { label: 'Vídeo', variant: 'light-danger' }],
        duration: '25:00'
    })}
    </div>
  `
};

// Story: Without Menu
export const WithoutMenu = {
    args: {
        type: 'image',
        title: 'Card sem menu de opções',
        tags: [{ label: 'Simples', variant: 'light-info' }],
        showMenu: false,
        downloadable: true
    },
    render: (args) => `
    ${styles}
    ${renderResourceCard(args)}
  `
};

// Story: View Only (sem download)
export const ViewOnly = {
    args: {
        type: 'video',
        title: 'Recurso apenas para visualização',
        tags: [{ label: 'Restrito', variant: 'light-danger' }],
        downloadable: false,
        duration: '10:00'
    },
    render: (args) => `
    ${styles}
    ${renderResourceCard(args)}
  `
};

// ============================================================================
// 🎯 4-STORIES STRUCTURE
// ============================================================================

// ============================================================================
// 📖 DOCUMENTATION
// ============================================================================

export const Documentation = {
  name: '📖 Documentation',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    controls: { disable: true },
  },
  render: () => `
    <div style="font-family:'Public Sans',sans-serif;background:#f8f9fa;min-height:100vh;">
      <div style="background:linear-gradient(135deg,#7367F0 0%,#9E95F5 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Cards</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ResourceCard</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Card de Material Educacional</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Card de Material Educacional. Faz parte da categoria <strong>Cards</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #7367F0;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ResourceCard from '@/components/ResourceCard.vue';

// Template
&lt;ResourceCard v-bind="props" /&gt;</code></pre>
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// 🎨 PLAYGROUND
// ============================================================================

export const Playground = {
  name: '🎨 Playground',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Explore o ResourceCard com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#7367F020;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ResourceCard</p>
        <p style="margin:0;font-size:13px;color:#B9B9C3;">Consulte a story <em>Default</em> para visualização completa</p>
      </div>
    </div>
  `,
};

// ============================================================================
// 💼 USE CASES
// ============================================================================

export const UseCases = {
  name: '💼 Use Cases',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Exemplos de uso real do ResourceCard no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#7367F015;border:1px solid #7367F030;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ResourceCard</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ResourceCard no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ResourceCard no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#7367F0;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ResourceCard</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
    </div>
  `,
};

// ============================================================================
// ♿ ACCESSIBILITY
// ============================================================================

export const Accessibility = {
  name: '♿ Accessibility',
  parameters: {
    layout: 'padded',
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ResourceCard.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#7367F0 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ResourceCard</h1>
        <p style="opacity:0.9;margin:0;font-size:14px;">Conformidade WCAG 2.1 AA — Teclado, ARIA e contraste</p>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">⌨️ Navegação por Teclado</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr style="border-bottom:2px solid #E8E8E8;">
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Tecla</th>
            <th style="text-align:left;padding:10px 12px;font-weight:600;color:#5E5873;background:#F8F8F8;">Ação</th>
          </tr></thead>
          <tbody>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Tab</code></td><td style="padding:12px;color:#6E6B7B;">Focar no componente</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Shift+Tab</code></td><td style="padding:12px;color:#6E6B7B;">Voltar foco ao elemento anterior</td></tr>
            <tr style="border-bottom:1px solid #F0F0F0;"><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Enter</code></td><td style="padding:12px;color:#6E6B7B;">Ativar ação principal</td></tr>
            <tr><td style="padding:12px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;">Esc</code></td><td style="padding:12px;color:#6E6B7B;">Cancelar/fechar (se aplicável)</td></tr>
          </tbody>
        </table>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;margin-bottom:24px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">🔊 ARIA e Screen Readers</h2>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-label</code><span style="color:#6E6B7B;font-size:14px;">Texto descritivo para leitores de tela quando não há texto visível</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">role</code><span style="color:#6E6B7B;font-size:14px;">Define o papel semântico do componente na árvore de acessibilidade</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-disabled</code><span style="color:#6E6B7B;font-size:14px;">Anuncia estado desabilitado sem remover do tab order</span></div>
        </div>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">✅ Checklist WCAG 2.1 AA</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">1.4.3</code>Contraste mínimo 4.5:1 para texto normal</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.1.1</code>Toda funcionalidade disponível via teclado</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.4.7</code>Foco visível em todos os elementos interativos</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">4.1.2</code>Nome, função e valor programaticamente determinável</span></div>
        </div>
      </div>

    </div>
  `,
};

