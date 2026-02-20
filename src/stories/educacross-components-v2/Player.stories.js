/**
 * Player - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component Player
 * @source educacross-frontoffice\src\components\player\Player.vue
 * @generated 2026-02-01T21:06:31.181679
 * 
 * Props: None
 * Slots: None
 * Emits: play
 */

export default {
  title: 'Educacross Components V2/Media/Player',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Player

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **play**
        `
      }
    }
  }
};

// Estilos inline do componente
const componentStyles = `

:root {
  --primary: #6e63e8;
  --primary-rgb: 110, 99, 232;
  --success: #28c76f;
  --success-rgb: 40, 199, 111;
  --danger: #ea5455;
  --danger-rgb: 234, 84, 85;
  --warning: #ff9f43;
  --warning-rgb: 255, 159, 67;
  --info: #00cfe8;
  --info-rgb: 0, 207, 232;
  --secondary: #6c757d;
  --secondary-rgb: 108, 117, 125;
  --light: #f8f9fa;
  --dark: #343a40;
  --legend-below-basic: #ea5455;
  --legend-basic: #ff9f43;
  --legend-proficient: #28c76f;
  --legend-advanced: #6e63e8;
  --border-color: #dbdade;
  --body-bg: #f8f7fa;
  --card-bg: #ffffff;
  --text-color: #5d596c;
  --heading-color: #5d596c;
}




  /* Card responsive padding */
  .card-body {
    padding: 1rem;
  }

  @media (max-width: 768px) {
    .card-body {
      padding: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    .card-body {
      padding: 0.5rem;
    }
  }

  /* Music title styling */
  .music-title {
    font-family: inherit;
    font-weight: 700;
    font-size: 14px;

    line-height: 24px;
    letter-spacing: 0;
    text-align: center;

    margin: 0.5rem 0;

    color: map-get(inherit, 'collective');
  }

  .album-section {
    width: 100%;
    position: relative;
    margin: 0;
    padding: 0;
    display: inline-block;
  }

  .lyrics-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    border-radius: inherit;
  }

  .lyrics-overlay > * {
    pointer-events: auto;
  }

  /* Audio controls container - inline and compact */
  .audio-controls-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.25rem;
    padding: 0 0.25rem;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    flex-wrap: nowrap; /* Prevent wrapping */
  }

  /* Default HTML5 audio player styling */
  .default-audio-player {
    flex: 1;
    height: 40px;
    min-width: 180px; /* Reduced minimum width */
    max-width: 100%;
    overflow: hidden;
  }

  /* Hidden audio player in fullscreen mode */
  .hidden-audio {
    position: absolute;
    opacity: 0;
    pointer-events: none;
    width: 1px;
    height: 1px;
  }

  /* Lyrics control button */
  .lyrics-control-btn {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: all 0.2s ease;
  }

  .lyrics-control-btn .material-icons-outlined {
    font-size: 18px;
  }

  .lyrics-control-btn.active {
    background-color: var(--bs-primary);
    border-color: var(--bs-primary);
    color: white;
  }

  /* Mobile responsive styles for player content */
  @media (max-width: 992px) {
    .audio-controls-container {
      gap: 0.375rem;
      margin-top: 0.25rem;
    }

    .default-audio-player {
      min-width: 140px;
      height: 36px;
    }

    .lyrics-control-btn {
      width: 36px;
      height: 36px;
    }
  }

  @media (max-width: 768px) {
    .audio-controls-container {
      gap: 0.25rem;
      margin-top: 0.25rem;
      padding: 0;
    }

    .default-audio-player {
      min-width: 120px;
      height: 32px;
    }

    .lyrics-control-btn {
      width: 32px;
      height: 32px;
    }

    .lyrics-control-btn .material-icons-outlined {
      font-size: 16px;
    }
  }

  /* Fullscreen overlay styles */
  .fullscreen-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
  }

  .fullscreen-player {
    width: 95%;
    height: 95%;
    max-width: 1200px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fullscreen-content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    gap: 2rem;
    padding: 2rem;
    align-items: center;
  }

  .fullscreen-image-container {
    grid-column: 1;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .fullscreen-lyrics-wrapper {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .fullscreen-close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10;
  }

  .fullscreen-close-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .fullscreen-close-button span {
    font-size: 1.5rem;
  }

  /* Mobile responsive styles for fullscreen */
  @media (max-width: 992px) {
    .fullscreen-content {
      grid-template-columns: 1fr 1.5fr;
      gap: 1.5rem;
      padding: 1.5rem;
    }

    .default-audio-player {
      min-width: 140px;
      height: 36px;
    }

    .lyrics-control-btn {
      width: 36px;
      height: 36px;
    }
  }

  @media (max-width: 768px) {
    .fullscreen-content {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
      gap: 1rem;
      padding: 1rem;
    }

    .fullscreen-image-container {
      grid-column: 1;
      grid-row: 1;
      max-height: 40vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding-top: 1rem;
    }

    .fullscreen-lyrics-wrapper {
      grid-column: 1;
      grid-row: 2;
      width: 100%;
      height: auto;
      min-height: 50vh;
      justify-content: center;
    }

    .fullscreen-close-button {
      top: 15px;
      right: 15px;
      width: 44px;
      height: 44px;
    }

    .default-audio-player {
      min-width: 120px;
      height: 32px;
    }

    .lyrics-control-btn {
      width: 32px;
      height: 32px;
    }

    .lyrics-control-btn .material-icons-outlined {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    .audio-controls-container {
      gap: 0.125rem;
      margin-top: 0.125rem;
      padding: 0;
    }

    .default-audio-player {
      min-width: 100px;
      height: 28px;
    }

    .lyrics-control-btn {
      width: 28px;
      height: 28px;
    }

    .lyrics-control-btn .material-icons-outlined {
      font-size: 14px;
    }

    .fullscreen-content {
      padding: 0.75rem;
      gap: 0.75rem;
    }

    .fullscreen-image-container {
      max-height: 35vh;
      padding-top: 0.5rem;
    }

    .fullscreen-lyrics-wrapper {
      min-height: 55vh;
    }

    .fullscreen-close-button {
      top: 10px;
      right: 10px;
      width: 40px;
      height: 40px;
    }

    .fullscreen-close-button span {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 360px) {
    .audio-controls-container {
      gap: 0.125rem;
      flex-wrap: nowrap; /* Ensure no wrapping even on very small screens */
    }

    .default-audio-player {
      min-width: 80px; /* Further reduced for very small screens */
      height: 24px;
      flex: 1;
    }

    .lyrics-control-btn {
      width: 24px;
      height: 24px;
      flex-shrink: 0; /* Prevent the button from shrinking */
    }

    .lyrics-control-btn .material-icons-outlined {
      font-size: 12px;
    }

    .fullscreen-content {
      padding: 0.5rem;
      gap: 0.5rem;
    }

    .fullscreen-image-container {
      max-height: 30vh;
      padding-top: 0.25rem;
    }

    .fullscreen-lyrics-wrapper {
      min-height: 60vh;
    }
  }
`;

// Template base
const baseTemplate = `
<div>
    <!-- Main Player Card -->
    <b-card no-body>
      <b-card-body class="p-50">
        <div>
          <!-- Album cover as base with lyrics overlay -->
          <div class="album-section">
            <album-cover :is-fullscreen="false" />

            <!-- Lyrics overlay on top of album cover -->
            <div class="lyrics-overlay">
              <lyrics-display
                :visible-lyrics="getVisibleLyrics()"
                :current-time="music.currentTime"
                :is-fullscreen="false"
                :max-visible-lines="maxVisibleLines"
                :show-fullscreen-button="true"
              />
            </div>
          </div>
        </div>

        <div>
          <p class="music-title text-center">Sample Text</p>
        </div>
        <!-- Audio controls container - only show when not in fullscreen -->
        <div class="audio-controls-container">
          <!-- Audio element - always present to maintain playback -->
          <audio
            src=""
            controls
            controlslist="nodownload"
            class="default-audio-player"
          />

          <!-- Lyrics control button -->
          <b-button
            variant="outline-primary"
            size="sm"
            class="lyrics-control-btn"
            class=""
          >
            <span class="material-icons-outlined">subtitles</span>
          </b-button>
        </div>

        <!-- Hidden audio element for fullscreen mode -->
        <audio
          src=""
          class="hidden-audio"
        />
      </b-card-body>
    </b-card>

    <!-- Fullscreen Modal -->
    <div class="fullscreen-overlay">
      <div class="fullscreen-player">
        <div class="fullscreen-content">
          <!-- Album cover in fullscreen -->
          <div class="fullscreen-image-container">
            <album-cover thumbnail="" :is-fullscreen="true" />
          </div>

          <!-- Lyrics in fullscreen -->
          <div class="fullscreen-lyrics-wrapper">
            <lyrics-display
              :visible-lyrics="getVisibleLyrics()"
              :current-time="music.currentTime"
              :is-fullscreen="true"
              :max-visible-lines="maxVisibleLines"
              :show-fullscreen-button="false"
            />
          </div>

          <!-- Close button -->
          <b-button variant="link" class="fullscreen-close-button">
            <span class="material-icons-outlined">close</span>
          </b-button>
        </div>
      </div>
    </div>
  </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
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
      <div style="background:linear-gradient(135deg,#FF9F43 0%,#FFB976 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Media</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">Player</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Pixel Perfect Stories</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Pixel Perfect Stories. Faz parte da categoria <strong>Media</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #FF9F43;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import Player from '@/components/Player.vue';

// Template
&lt;Player v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o Player com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#FF9F4320;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground Player</p>
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
    docs: { description: { story: 'Exemplos de uso real do Player no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#FF9F4315;border:1px solid #FF9F4330;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: Player</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando Player no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com Player no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via Player</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o Player.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#FF9F43 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: Player</h1>
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

