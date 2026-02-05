/**
 * AlbumCover Component
 * 
 * Capa de álbum visual para player de áudio/música em lições educacionais
 * 
 * @component AlbumCover
 * @source educacross-frontoffice/src/components/player/AlbumCover.vue
 */

// SVG placeholder inline (evita links externos quebrados)
const musicAlbumPlaceholder = `<svg width="239" height="155" viewBox="0 0 239 155" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.970703" width="237.059" height="155" rx="8.94231" fill="#FFB443"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M149.841 32.7793C149.841 32.7793 137.134 55.6275 134.228 65.8812C134.228 65.8812 131.806 72.1701 135.266 72.3068C135.266 72.3068 137.48 72.1017 139.417 69.5725C139.417 69.5725 142.046 65.9495 143.845 63.9672C143.845 63.9672 151.388 55.0806 152.218 53.5084C152.218 53.5084 154.636 58.7359 155.761 64.1496C155.761 64.1496 156.153 67.1948 157.767 67.0014C157.767 67.0014 160.018 66.9531 160.85 62.3128C160.85 62.3128 161.29 64.633 162.562 64.3429C162.562 64.3429 165.596 64.778 164.421 52.4522C164.421 52.4522 165.498 52.8872 165.693 51.7755C165.693 51.7755 166.329 36.4529 156.544 30.8459C156.544 30.8459 151.945 28.3324 149.841 32.7793Z" fill="#225054"/>
<path d="M139.529 47.7873L143.467 47.7274C146.994 47.6738 149.884 50.4416 149.92 53.9096L150.015 62.7841C150.052 66.2521 147.222 69.1069 143.694 69.1606L139.756 69.2205C136.229 69.2741 133.339 66.5063 133.303 63.0383L133.208 54.1637C133.171 50.6958 136.001 47.841 139.529 47.7873Z" fill="#483737"/>
<path d="M141.073 66.7849L142.468 66.7644C143.133 66.7546 143.679 67.3392 143.687 68.07L144.264 121.983C144.272 122.713 143.739 123.314 143.074 123.324L141.679 123.344C141.014 123.354 140.468 122.769 140.461 122.039L139.883 68.1259C139.875 67.3951 140.408 66.7947 141.073 66.7849Z" fill="#483E37"/>
<path d="M139.926 71.8299L143.645 71.7734C144.384 71.7621 144.99 72.342 144.998 73.0686L145.021 75.2219C145.028 75.9484 144.435 76.5465 143.696 76.5578L139.977 76.6143C139.238 76.6255 138.632 76.0456 138.624 75.3191L138.601 73.1658C138.594 72.4393 139.187 71.8411 139.926 71.8299Z" fill="#A02C2C"/>
<path d="M145.129 86.8176L145.622 129.79C144.635 129.977 143.6 130.08 142.556 130.095C141.512 130.107 140.475 130.031 139.483 129.871L138.99 86.9004L145.129 86.8176Z" fill="#4D4D4D"/>
</svg>`;

const audioIconSVG = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="32" cy="32" r="30" fill="#6e63e8" opacity="0.1"/>
<path d="M32 16C23.168 16 16 23.168 16 32C16 40.832 23.168 48 32 48C40.832 48 48 40.832 48 32C48 23.168 40.832 16 32 16ZM32 44C25.376 44 20 38.624 20 32C20 25.376 25.376 20 32 20C38.624 20 44 25.376 44 32C44 38.624 38.624 44 32 44Z" fill="#6e63e8"/>
<path d="M38 31.732L28 25.732V37.732L38 31.732Z" fill="#6e63e8"/>
</svg>`;

const componentStyles = `
.album-cover-container {
  position: relative;
  width: 100%;
  height: auto;
  display: block;
  background: #f8f7fa;
  border-radius: 12px;
  overflow: hidden;
}

.fullscreen-image-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.fullscreen-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
}

.album-cover-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  display: block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.placeholder-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;
  background: linear-gradient(135deg, #f8f7fa 0%, #e9e7f0 100%);
  border-radius: 12px;
  border: 2px dashed #dbdade;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;
  background: #f8f7fa;
  border-radius: 12px;
}

.spinner {
  border: 3px solid #e9e7f0;
  border-top: 3px solid #6e63e8;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 1rem;
  color: #5d596c;
  font-size: 0.875rem;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 200px;
  background: #fff5f5;
  border-radius: 12px;
  border: 2px solid #ea5455;
  padding: 1.5rem;
}

.error-icon {
  font-size: 3rem;
  color: #ea5455;
  margin-bottom: 0.5rem;
}

.error-text {
  color: #ea5455;
  font-size: 0.875rem;
  text-align: center;
}

@media (max-width: 768px) {
  .fullscreen-image-container {
    padding: 1rem;
  }
  
  .fullscreen-image {
    max-height: 50vh;
  }
}

@media (max-width: 480px) {
  .fullscreen-image {
    max-height: 40vh;
  }
  
  .placeholder-container,
  .loading-container,
  .error-container {
    min-height: 150px;
  }
}
`;

export default {
  title: 'Front-office/Media/AlbumCover',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Capa de álbum para player de áudio em lições musicais e atividades de escuta.

---

## Contexto de Uso

Exibe a capa visual durante reprodução de conteúdos de áudio em lições educacionais:

**Cenários de Aplicação**
- Lições de Língua Portuguesa com músicas e poesias narradas
- Atividades de Arte com obras musicais clássicas
- Exercícios de compreensão auditiva (BNCC EF15LP10)
- Educação Infantil: contação de histórias em áudio
- Player de podcast educacional para professores

**Personas**
- **Aluno (7-14 anos)**: Visualiza capa durante reprodução de atividade musical
- **Professor**: Utiliza player para tocar conteúdo em sala de aula
- **Coordenador Pedagógico**: Acessa materiais de áudio em formação docente

---

## Figma-Style CSS

\`\`\`css
/* Container Normal */
.album-cover-container {
  position: relative;
  width: 100%;          /* Largura: 100% do container pai */
  height: auto;
  display: block;
  background: #f8f7fa;  /* Gray 50 */
  border-radius: 12px;  /* Radius: 12px */
  overflow: hidden;
}

/* Container Fullscreen */
.fullscreen-image-container {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;       /* Spacing: 32px */
}

/* Imagem */
.album-cover-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Fullscreen Image */
.fullscreen-image {
  max-width: 100%;
  max-height: 70vh;    /* Altura máxima: 70% da viewport */
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
}
\`\`\`

**Typography**
- Loading text: Inter 14px Regular, #5d596c
- Error text: Inter 14px Medium, #ea5455

---

## Props API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`isFullscreen\` | Boolean | \`false\` | Ativa modo fullscreen (overlay sobre página) |
| \`src\` | String | — | URL ou base64 da imagem de capa |
| \`alt\` | String | "Album cover" | Texto alternativo para acessibilidade |

**Computed Properties**
- \`containerClass\`: Alterna entre \`.album-cover-container\` e \`.fullscreen-image-container\`
- \`imageClass\`: Aplica classes condicionais (\`.album-cover-image\` ou \`.fullscreen-image\`)

---

## Especificações Técnicas

### Dimensões
| Elemento | Largura | Altura | Proporção |
|----------|---------|--------|-----------|
| Container Normal | 100% | Auto | Mantém aspect ratio |
| Fullscreen | 100vw | 100vh | Fullscreen overlay |
| Imagem Normal | 100% | Auto | 16:10 recomendado |
| Imagem Fullscreen | Max 100% | Max 70vh | Object-fit: contain |

### Cores
| Elemento | Cor | Uso |
|----------|-----|-----|
| Background Normal | #f8f7fa | Fundo container padrão |
| Background Fullscreen | rgba(0,0,0,0.95) | Overlay escuro |
| Placeholder Border | #dbdade | Borda tracejada estado vazio |
| Loading Spinner | #6e63e8 | Primary color |
| Error Border | #ea5455 | Indicação de erro |

### Estados Visuais

**1. Normal (Default)**
- Capa exibida dentro de container com cantos arredondados
- Sombra sutil para profundidade
- Responsivo: largura 100%

**2. Fullscreen**
- Overlay modal escuro cobrindo toda tela
- Imagem centralizada com altura máxima 70vh
- Sombra intensa para destacar do fundo
- Z-index 9999 (acima de todos elementos)

**3. Placeholder (Sem imagem)**
- Ícone de música centralizado
- Borda tracejada cinza
- Gradiente de fundo suave

**4. Loading**
- Spinner animado rotativo
- Texto "Carregando..." abaixo
- Fundo cinza claro

**5. Error**
- Ícone de alerta vermelho
- Mensagem de erro descritiva
- Borda vermelha sólida

---

## Comportamento

### Interações
1. **Clique na capa (modo normal)**: Expande para fullscreen
2. **ESC ou clique fora (fullscreen)**: Retorna ao modo normal
3. **Responsive**: Ajusta altura máxima em dispositivos móveis

### Transições
- Mudança de estado: \`transition: all 0.3s ease\`
- Loading spinner: \`animation: spin 1s linear infinite\`

### Responsividade
\`\`\`
Desktop (≥1200px):  Fullscreen max-height 70vh
Tablet (768-1199px): Fullscreen max-height 50vh
Mobile (<768px):     Fullscreen max-height 40vh
                     Padding lateral reduzido para 1rem
\`\`\`

---

## Acessibilidade

**WCAG 2.1 Level AA**
- ✅ \`alt\` descritivo obrigatório para imagens
- ✅ Contraste 7:1 no texto de erro (vermelho sobre branco)
- ✅ Foco visível ao navegar por teclado
- ✅ Fullscreen fechável por ESC (navegação por teclado)
- ✅ ARIA \`role="img"\` em placeholders SVG
- ✅ \`aria-live="polite"\` em estados de loading

**Keyboard Navigation**
- \`Enter/Space\`: Abre fullscreen
- \`Escape\`: Fecha fullscreen
- \`Tab\`: Navega para próximo elemento interativo

---

## Integração Vue 2

\`\`\`vue
<template>
  <AlbumCover
    :is-fullscreen="isFullscreenMode"
    :src="currentTrack.albumCover"
    :alt="currentTrack.title"
    @click="toggleFullscreen"
  />
</template>

<script>
import AlbumCover from '@/components/player/AlbumCover.vue'

export default {
  components: { AlbumCover },
  data() {
    return {
      isFullscreenMode: false,
      currentTrack: {
        title: 'Hino Nacional - BNCC EF15LP01',
        albumCover: '/assets/audio/hino-nacional-cover.jpg'
      }
    }
  },
  methods: {
    toggleFullscreen() {
      this.isFullscreenMode = !this.isFullscreenMode
    }
  }
}
</script>
\`\`\`

---

## Regras de Negócio

1. **Fallback obrigatório**: Se \`src\` vazio, exibe placeholder com ícone musical
2. **Lazy loading**: Imagens carregam apenas quando necessário (performance)
3. **Cache**: Capas já carregadas são armazenadas em cache do navegador
4. **Formatos suportados**: JPG, PNG, WebP (até 2MB)
5. **Dimensões recomendadas**: 600x600px (1:1) ou 800x500px (16:10)

**Educacional**
- Capas devem ser apropriadas para faixa etária
- Imagens com direitos autorais verificados
- Conteúdos BNCC possuem capas institucionais padronizadas
        `
      }
    }
  },
  argTypes: {
    isFullscreen: {
      control: 'boolean',
      description: 'Ativa modo fullscreen (overlay sobre página)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    imageSrc: {
      control: 'text',
      description: 'URL ou Data URI da imagem de capa',
      table: {
        type: { summary: 'string' }
      }
    },
    state: {
      control: 'select',
      options: ['default', 'placeholder', 'loading', 'error'],
      description: 'Estado visual do componente',
      table: {
        type: { summary: 'string' }
      }
    }
  }
};

// Story: Default
export const Default = {
  args: {
    isFullscreen: false,
    imageSrc: `data:image/svg+xml,${encodeURIComponent(musicAlbumPlaceholder)}`,
    state: 'default'
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div class="${args.isFullscreen ? 'fullscreen-image-container' : 'album-cover-container'}" style="width: 320px;">
      <img 
        src="${args.imageSrc}" 
        alt="Album cover" 
        class="${args.isFullscreen ? 'fullscreen-image' : 'album-cover-image'}"
      />
    </div>
  `
};

// Story: Placeholder (Sem imagem)
export const Placeholder = {
  args: {
    isFullscreen: false,
    state: 'placeholder'
  },
  render: () => `
    <style>${componentStyles}</style>
    <div class="album-cover-container" style="width: 320px;">
      <div class="placeholder-container">
        ${audioIconSVG}
      </div>
    </div>
  `
};

// Story: Loading State
export const Loading = {
  args: {
    isFullscreen: false,
    state: 'loading'
  },
  render: () => `
    <style>${componentStyles}</style>
    <div class="album-cover-container" style="width: 320px;">
      <div class="loading-container">
        <div class="spinner"></div>
        <div class="loading-text">Carregando capa...</div>
      </div>
    </div>
  `
};

// Story: Error State
export const Error = {
  args: {
    isFullscreen: false,
    state: 'error'
  },
  render: () => `
    <style>${componentStyles}</style>
    <div class="album-cover-container" style="width: 320px;">
      <div class="error-container">
        <div class="error-icon">⚠</div>
        <div class="error-text">Erro ao carregar imagem<br>Verifique a URL ou formato do arquivo</div>
      </div>
    </div>
  `
};

// Story: Fullscreen Mode
export const FullscreenMode = {
  args: {
    isFullscreen: true,
    imageSrc: `data:image/svg+xml,${encodeURIComponent(musicAlbumPlaceholder)}`,
    state: 'default'
  },
  parameters: {
    layout: 'fullscreen'
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div class="fullscreen-image-container">
      <img 
        src="${args.imageSrc}" 
        alt="Album cover fullscreen" 
        class="fullscreen-image"
      />
    </div>
  `
};

// Story: With Real Image (External)
export const WithRealImage = {
  args: {
    isFullscreen: false,
    imageSrc: 'https://picsum.photos/600/600?random=music',
    state: 'default'
  },
  render: (args) => `
    <style>${componentStyles}</style>
    <div class="album-cover-container" style="width: 320px;">
      <img 
        src="${args.imageSrc}" 
        alt="Album cover with real image" 
        class="album-cover-image"
        loading="lazy"
      />
    </div>
  `
};

// Story: Educational Content (BNCC)
export const EducationalContent = {
  args: {
    isFullscreen: false,
    imageSrc: `data:image/svg+xml,${encodeURIComponent(musicAlbumPlaceholder)}`,
    state: 'default'
  },
  render: (args) => `
    <style>
      ${componentStyles}
      .lesson-card {
        max-width: 360px;
        background: white;
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 2px 12px rgba(0,0,0,0.08);
      }
      .lesson-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #5d596c;
        margin-top: 1rem;
        margin-bottom: 0.5rem;
      }
      .lesson-meta {
        font-size: 0.875rem;
        color: #9c96a8;
        margin-bottom: 0.25rem;
      }
      .play-button {
        width: 100%;
        margin-top: 1rem;
        padding: 0.75rem;
        background: #6e63e8;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;
      }
      .play-button:hover {
        background: #5850c6;
      }
    </style>
    <div class="lesson-card">
      <div class="album-cover-container">
        <img 
          src="${args.imageSrc}" 
          alt="Hino Nacional Brasileiro" 
          class="album-cover-image"
        />
      </div>
      <div class="lesson-title">Hino Nacional Brasileiro</div>
      <div class="lesson-meta">📚 Língua Portuguesa • BNCC EF15LP01</div>
      <div class="lesson-meta">⏱️ 3:42 min • 🎓 Ensino Fundamental</div>
      <button class="play-button">▶ Reproduzir Áudio</button>
    </div>
  `
};

// Story: Responsive Sizes
export const ResponsiveSizes = {
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-start;">
      <div style="flex: 1; min-width: 180px;">
        <h4 style="margin-bottom: 0.5rem; color: #5d596c;">Mobile (180px)</h4>
        <div class="album-cover-container" style="width: 180px;">
          <img 
            src="data:image/svg+xml,${encodeURIComponent(musicAlbumPlaceholder)}" 
            alt="Mobile size" 
            class="album-cover-image"
          />
        </div>
      </div>
      <div style="flex: 1; min-width: 280px;">
        <h4 style="margin-bottom: 0.5rem; color: #5d596c;">Tablet (280px)</h4>
        <div class="album-cover-container" style="width: 280px;">
          <img 
            src="data:image/svg+xml,${encodeURIComponent(musicAlbumPlaceholder)}" 
            alt="Tablet size" 
            class="album-cover-image"
          />
        </div>
      </div>
      <div style="flex: 1; min-width: 360px;">
        <h4 style="margin-bottom: 0.5rem; color: #5d596c;">Desktop (360px)</h4>
        <div class="album-cover-container" style="width: 360px;">
          <img 
            src="data:image/svg+xml,${encodeURIComponent(musicAlbumPlaceholder)}" 
            alt="Desktop size" 
            class="album-cover-image"
          />
        </div>
      </div>
    </div>
  `
};

// Story: Audio Player Integration
export const AudioPlayerIntegration = {
  render: () => `
    <style>
      ${componentStyles}
      .audio-player {
        max-width: 480px;
        background: white;
        border-radius: 16px;
        padding: 1.5rem;
        box-shadow: 0 4px 16px rgba(0,0,0,0.1);
      }
      .player-info {
        text-align: center;
        margin-top: 1rem;
      }
      .track-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: #5d596c;
        margin-bottom: 0.25rem;
      }
      .track-artist {
        font-size: 0.875rem;
        color: #9c96a8;
        margin-bottom: 1rem;
      }
      .progress-bar {
        width: 100%;
        height: 4px;
        background: #e9e7f0;
        border-radius: 2px;
        position: relative;
        margin-bottom: 0.5rem;
      }
      .progress-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 35%;
        background: #6e63e8;
        border-radius: 2px;
      }
      .time-display {
        display: flex;
        justify-content: space-between;
        font-size: 0.75rem;
        color: #9c96a8;
        margin-bottom: 1rem;
      }
      .player-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
      }
      .control-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: #f8f7fa;
        color: #5d596c;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        transition: all 0.2s;
      }
      .control-btn:hover {
        background: #e9e7f0;
      }
      .control-btn.play {
        width: 56px;
        height: 56px;
        background: #6e63e8;
        color: white;
        font-size: 1.5rem;
      }
      .control-btn.play:hover {
        background: #5850c6;
      }
    </style>
    <div class="audio-player">
      <div class="album-cover-container" style="width: 100%; max-width: 320px; margin: 0 auto;">
        <img 
          src="data:image/svg+xml,${encodeURIComponent(musicAlbumPlaceholder)}" 
          alt="Now playing" 
          class="album-cover-image"
        />
      </div>
      <div class="player-info">
        <div class="track-title">Aquarela</div>
        <div class="track-artist">Toquinho • Lição: Gêneros Textuais</div>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
        <div class="time-display">
          <span>1:18</span>
          <span>3:42</span>
        </div>
        <div class="player-controls">
          <button class="control-btn">⏮</button>
          <button class="control-btn play">▶</button>
          <button class="control-btn">⏭</button>
        </div>
      </div>
    </div>
  `
};

// Story: Interactive (Toggle Fullscreen)
export const Interactive = {
  render: () => {
    let isFullscreen = false;
    
    setTimeout(() => {
      const coverContainer = document.getElementById('interactive-cover');
      const toggleBtn = document.getElementById('toggle-fullscreen-btn');
      
      if (coverContainer && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          isFullscreen = !isFullscreen;
          
          if (isFullscreen) {
            coverContainer.className = 'fullscreen-image-container';
            coverContainer.querySelector('img').className = 'fullscreen-image';
            toggleBtn.textContent = '✕ Fechar Fullscreen (ESC)';
          } else {
            coverContainer.className = 'album-cover-container';
            coverContainer.querySelector('img').className = 'album-cover-image';
            coverContainer.style.width = '320px';
            toggleBtn.textContent = '⛶ Abrir Fullscreen';
          }
        });
        
        // ESC key to close fullscreen
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && isFullscreen) {
            isFullscreen = false;
            coverContainer.className = 'album-cover-container';
            coverContainer.querySelector('img').className = 'album-cover-image';
            coverContainer.style.width = '320px';
            toggleBtn.textContent = '⛶ Abrir Fullscreen';
          }
        });
      }
    }, 100);
    
    return `
      <style>
        ${componentStyles}
        .demo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .toggle-btn {
          padding: 0.75rem 1.5rem;
          background: #6e63e8;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .toggle-btn:hover {
          background: #5850c6;
        }
      </style>
      <div class="demo-container">
        <div id="interactive-cover" class="album-cover-container" style="width: 320px;">
          <img 
            src="data:image/svg+xml,${encodeURIComponent(musicAlbumPlaceholder)}" 
            alt="Interactive album cover" 
            class="album-cover-image"
          />
        </div>
        <button id="toggle-fullscreen-btn" class="toggle-btn">⛶ Abrir Fullscreen</button>
      </div>
    `;
  }
};


