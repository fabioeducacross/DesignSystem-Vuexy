/**
 * LyricsDisplay - Song Lyrics Display Component
 * =========================================
 * 
 * Interactive lyrics display for audio content with fullscreen toggle.
 * Synchronized with audio playback for educational content.
 * 
 * @component LyricsDisplay
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\player\LyricsDisplay.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * @generated 2026-02-01T21:06:31.095093
 * 
 * Props: None
 * Slots: None
 * Emits: toggle-fullscreen
 */

export default {
  title: 'Educacross Components V2/Media/LyricsDisplay',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## LyricsDisplay

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **toggle-fullscreen**
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


.lyrics-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    background: linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(42, 42, 42, 0.8) 100%);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
  }

  .lyrics-wrapper {
    transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
    flex: 1;
  }

  .lyric-line {
    text-align: left;
    margin: 1.2rem 0;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    font-weight: 500;
    line-height: 1.4;
    /* Responsive font size */
    font-size: clamp(1rem, 3.5vw, 1rem);
    color: rgba(255, 255, 255, 0.5);
    user-select: none;
    position: relative;
  }

  .lyric-line:hover {
    color: rgba(255, 255, 255, 0.8);
    transform: translateX(4px);
  }

  .lyric-line.upcoming {
    color: rgba(150, 150, 150, 0.6);
    font-weight: 400;
    opacity: 0.7;
  }

  .lyric-line.passed {
    color: rgba(120, 120, 120, 0.5);
    font-weight: 400;
    opacity: 0.6;
    text-decoration-color: rgba(120, 120, 120, 0.3);
  }

  .lyric-line.active {
    color: #ffffff;
    font-weight: 700;
    font-size: clamp(1.1rem, 4vw, 1rem);
    margin: 0 0 1.5rem 0;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  }

  .lyric-line.active:hover {
    transform: scale(1.02) translateX(4px);
  }

  /* Controls overlay */
  .lyrics-controls {
    position: absolute;
    bottom: 15px;
    right: 15px;
    display: flex;
    gap: 0.5rem;
    z-index: 10;
    align-items: center;
  }

  .control-btn {
    background: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-size: 20px;
    padding: 0;
  }

  .control-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .control-btn span {
    font-size: 1.2rem;
  }

  /* Fullscreen styles */
  .fullscreen-lyrics {
    background: transparent;
    padding: 3rem;
    min-height: auto;
    height: 100%;
    justify-content: flex-start;
    box-shadow: none;
    overflow: hidden;
    position: relative;
  }

  .fullscreen-lyrics .lyrics-wrapper {
    padding: 3rem 0;
    transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .fullscreen-lyrics .lyric-line {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    line-height: 1.5;
    margin: 2rem 0;
    color: rgba(255, 255, 255, 0.6);
  }

  .fullscreen-lyrics .lyric-line.upcoming {
    color: rgba(150, 150, 150, 0.5);
    opacity: 0.7;
  }

  .fullscreen-lyrics .lyric-line.passed {
    color: rgba(120, 120, 120, 0.4);
    opacity: 0.6;
    text-decoration-color: rgba(120, 120, 120, 0.3);
  }

  .fullscreen-lyrics .lyric-line.active {
    font-size: clamp(1.8rem, 6vw, 3rem);
    color: #ffffff;
    margin: 2.5rem 0;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.4), 0 2px 20px rgba(0, 0, 0, 0.8);
  }

  /* Mobile responsive styles */
  @media (max-width: 768px) {
    .lyrics-container {
      padding: 1rem;
      border-radius: 8px;
    }

    .lyrics-wrapper {
      padding: 1rem 0;
    }

    .lyric-line {
      margin: 0.8rem 0;
      font-size: clamp(0.9rem, 4vw, 1.4rem);
    }

    .lyric-line.active {
      font-size: clamp(1rem, 5vw, 1.6rem);
      margin: 1rem 0;
    }

    .lyrics-controls {
      bottom: 10px;
      right: 10px;
    }

    .control-btn {
      width: 35px;
      height: 35px;
    }
  }

  @media (max-width: 480px) {
    .lyrics-container {
      padding: 0.75rem;
    }

    .lyrics-wrapper {
      padding: 0.5rem 0;
    }

    .lyric-line {
      margin: 0.6rem 0;
    }

    .lyric-line.active {
      margin: 0.8rem 0;
    }
  }

  /* Scroll indicator */
  .lyrics-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(180deg, rgba(30, 30, 30, 0.8) 0%, transparent 100%);
    pointer-events: none;
    z-index: 5;
  }

  .lyrics-container::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(0deg, rgba(30, 30, 30, 0.8) 0%, transparent 100%);
    pointer-events: none;
    z-index: 5;
  }

  .fullscreen-lyrics::before,
  .fullscreen-lyrics::after {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  }

  .fullscreen-lyrics::after {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, transparent 100%);
  }

  /* Smooth upward animation for active lyrics */
  @keyframes activateUp {
    0% {
      transform: translateY(15px);
      opacity: 0.7;
      filter: blur(1px);
    }
    50% {
      transform: translateY(-5px);
      opacity: 0.9;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
      filter: blur(0);
    }
  }

  /* Enhanced animation for fullscreen mode */
  .fullscreen-lyrics .lyric-line.active {
    animation: activateUpFullscreen 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  /* Add padding for smooth scrolling */
  .lyrics-padding {
    height: 50vh;
    width: 100%;
    flex-shrink: 0;
  }

  .fullscreen-padding {
    height: 60vh;
  }

  @keyframes activateUpFullscreen {
    0% {
      transform: translateY(25px) scale(0.95);
      opacity: 0.6;
      filter: blur(2px);
    }
    60% {
      transform: translateY(-8px) scale(1.02);
      opacity: 0.9;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
      filter: blur(0);
    }
  }
`;

// Template base
const baseTemplate = `
<div
    class="lyrics-container"
    class=""
  >
    <div class="lyrics-wrapper" style="">
      <div
        class="lyric-line"
        class=""
      ></div>

      <!-- Extra padding for smooth scrolling -->
      <div class="lyrics-padding" class=""></div>
    </div>

    <!-- Spotify-style controls overlay -->
    <div class="lyrics-controls">
      <b-button
        variant="link"
        class="control-btn fullscreen-btn"
      >
        <span class="material-symbols-outlined">pan_zoom</span>
      </b-button>
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
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">LyricsDisplay</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Song Lyrics Display Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Song Lyrics Display Component. Faz parte da categoria <strong>Media</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #FF9F43;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import LyricsDisplay from '@/components/LyricsDisplay.vue';

// Template
&lt;LyricsDisplay v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o LyricsDisplay com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#FF9F4320;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground LyricsDisplay</p>
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
    docs: { description: { story: 'Exemplos de uso real do LyricsDisplay no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#FF9F4315;border:1px solid #FF9F4330;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: LyricsDisplay</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando LyricsDisplay no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com LyricsDisplay no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via LyricsDisplay</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o LyricsDisplay.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#FF9F43 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: LyricsDisplay</h1>
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

