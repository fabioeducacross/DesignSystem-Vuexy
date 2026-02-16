/**
 * ResourceCard - Card de Material Educacional
 * ============================================
 * Card para exibição de recursos educacionais (imagens, vídeos, áudios, documentos)
 * com suporte a download, preview e reprodução inline.
 * 
 * @component ResourceCard
 * @category Educacross Components V2 / Cards
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
