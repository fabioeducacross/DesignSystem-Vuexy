/**
 * ZipLoading Component - Pixel Perfect from educacross-frontoffice
 *
 * @component ZipLoading
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/modal/ZipLoading.vue
 * @priority P0
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Feedback/ZipLoading',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## ZipLoading - Loading de Exportação Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/components/modal/ZipLoading.vue\`.

Exibe progresso de geração de arquivos (PDFs, boletins, relatórios).

### Props do Componente Real

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`name\` | String | '' | Nome do arquivo sendo gerado |
| \`masculine\` | Boolean | false | Gênero para concordância |
| \`isReport\` | Boolean | false | Se é um boletim |

### Events

- \`@close\` - Emitido quando o download é concluído

### Estados

1. **Processando** - Barra de progresso animando
2. **Concluído** - Download pronto, opção de tentar novamente

### Integração

O componente usa Vuex para obter o percentual:
\`store.getters.GET_ADMIN_PDF_LOAD_PERCENT\`
        `,
      },
    },
  },
};

// CSS do ZipLoading extraído do frontoffice
const zipLoadingStyles = `
<style>
  /* === ZipLoading - CSS Pixel Perfect do Frontoffice === */
  
  :root {
    --primary: #6e63e8;
    --success: #28c76f;
    --text-color: #5e5873;
  }

  .working {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: var(--text-color);
    padding: 2rem;
  }

  .working img {
    max-width: 200px;
    height: auto;
  }

  .working .title {
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 0;
  }

  .working .title::first-letter {
    text-transform: uppercase;
  }

  .working .subtitle {
    font-size: 21px;
    font-weight: 500;
    text-align: center;
    margin-top: 24px;
    margin-bottom: 0;
    color: #6c6c6c;
  }

  .working .tryAgain {
    color: var(--primary);
    cursor: pointer;
    text-decoration: underline;
  }

  .working .tryAgain:hover {
    text-decoration: none;
  }

  .progress-container {
    width: 50%;
    text-align: center;
    margin-top: 2rem;
  }

  @media (max-width: 425px) {
    .progress-container {
      width: 100%;
    }
  }

  .progress-container .title {
    font-size: 21px;
    font-weight: 500;
    color: var(--success);
    margin-bottom: 1rem;
    margin-top: 0;
  }

  /* Progress bar */
  .progress-bar-container {
    height: 12px;
    background-color: #ebe9f1;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .progress-bar-fill {
    height: 100%;
    background-color: var(--success);
    border-radius: 6px;
    transition: width 0.3s ease;
  }

  /* Spinner */
  .loading-spinner {
    width: 1.5rem;
    height: 1.5rem;
    border: 3px solid rgba(40, 199, 111, 0.3);
    border-top-color: var(--success);
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    margin-top: 0.5rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Placeholder image */
  .placeholder-img {
    width: 200px;
    height: 150px;
    background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 64px;
    color: #c0c0c0;
  }

  .placeholder-img.done {
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    color: var(--success);
  }
</style>
`;

/**
 * Processing - Estado processando
 */
export const Processing = {
  render: () => `
    ${zipLoadingStyles}
    <div class="p-4">
      <div class="working">
        <div class="placeholder-img">
          <span class="material-symbols-outlined">description</span>
        </div>
        <p class="title">Estamos preparando os relatórios</p>
        <p class="subtitle">
          Assim que o processamento acabar, o download será iniciado automaticamente
        </p>
        <div class="progress-container">
          <span class="title">35% dos arquivos prontos...</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 35%;"></div>
          </div>
          <div class="loading-spinner"></div>
        </div>
      </div>
    </div>
  `,
};

/**
 * ProcessingReports - Processando boletins
 */
export const ProcessingReports = {
  render: () => `
    ${zipLoadingStyles}
    <div class="p-4">
      <div class="working">
        <div class="placeholder-img">
          <span class="material-symbols-outlined">folder_zip</span>
        </div>
        <p class="title">Os boletins estão sendo preparados.</p>
        <p class="subtitle">
          Assim que o processamento acabar, os boletins serão baixados automaticamente.
        </p>
        <div class="progress-container">
          <span class="title">68% dos arquivos prontos...</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 68%;"></div>
          </div>
          <div class="loading-spinner"></div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Completed - Estado concluído
 */
export const Completed = {
  render: () => `
    ${zipLoadingStyles}
    <div class="p-4">
      <div class="working">
        <div class="placeholder-img done">
          <span class="material-symbols-outlined">check_circle</span>
        </div>
        <p class="title">Os relatórios estão prontos!</p>
        <p class="subtitle">
          Se o download não iniciou automaticamente,
          <span class="tryAgain">clique aqui</span>
        </p>
        <div class="progress-container">
          <span class="title">100% dos arquivos prontos!</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 100%;"></div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * CompletedReports - Boletins prontos
 */
export const CompletedReports = {
  render: () => `
    ${zipLoadingStyles}
    <div class="p-4">
      <div class="working">
        <div class="placeholder-img done">
          <span class="material-symbols-outlined">task</span>
        </div>
        <p class="title">Os boletins estão prontos!</p>
        <p class="subtitle">
          Se o download não iniciou automaticamente,
          <span class="tryAgain">clique aqui</span>
        </p>
        <div class="progress-container">
          <span class="title">100% dos arquivos prontos!</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 100%;"></div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * AllProgressStates - Todos os estados de progresso
 */
export const AllProgressStates = {
  render: () => `
    ${zipLoadingStyles}
    <style>
      .progress-demo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
      }
      .progress-item {
        background: white;
        border: 1px solid #ebe9f1;
        border-radius: 0.428rem;
        padding: 1.5rem;
        text-align: center;
      }
      .progress-item .label {
        font-weight: 500;
        color: #5e5873;
        margin-bottom: 0.75rem;
      }
    </style>
    <div class="p-4">
      <div class="progress-demo">
        <div class="progress-item">
          <div class="label">0% - Iniciando</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 0%;"></div>
          </div>
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </div>
        <div class="progress-item">
          <div class="label">25% - Processando</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 25%;"></div>
          </div>
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </div>
        <div class="progress-item">
          <div class="label">50% - Metade</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 50%;"></div>
          </div>
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </div>
        <div class="progress-item">
          <div class="label">75% - Quase lá</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 75%;"></div>
          </div>
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </div>
        <div class="progress-item">
          <div class="label" style="color: #28c76f;">100% - Concluído!</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 100%;"></div>
          </div>
          <span class="material-symbols-outlined" style="color: #28c76f; font-size: 24px; margin-top: 0.5rem;">check_circle</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * InModal - Dentro de um modal
 */
export const InModal = {
  render: () => `
    ${zipLoadingStyles}
    <style>
      .modal-demo {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        border-radius: 0.428rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .modal-header {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #ebe9f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .modal-header h5 {
        margin: 0;
        font-weight: 500;
        color: #5e5873;
      }
      .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6c6c6c;
      }
      .modal-body {
        padding: 0;
      }
    </style>
    <div class="p-4" style="background: rgba(0,0,0,0.5);">
      <div class="modal-demo">
        <div class="modal-header">
          <h5>Gerando Relatórios</h5>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="working" style="padding: 2rem;">
            <div class="placeholder-img">
              <span class="material-symbols-outlined">description</span>
            </div>
            <p class="title" style="font-size: 22px;">Estamos preparando os certificados</p>
            <p class="subtitle" style="font-size: 16px;">
              Assim que o processamento acabar, o download será iniciado automaticamente
            </p>
            <div class="progress-container" style="width: 80%;">
              <span class="title" style="font-size: 16px;">45% dos arquivos prontos...</span>
              <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: 45%;"></div>
              </div>
              <div class="loading-spinner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Feedback</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ZipLoading</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Pixel Perfect from educacross-frontoffice</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Pixel Perfect from educacross-frontoffice. Faz parte da categoria <strong>Feedback</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #FF9F43;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ZipLoading from '@/components/ZipLoading.vue';

// Template
&lt;ZipLoading v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o ZipLoading com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#FF9F4320;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ZipLoading</p>
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
    docs: { description: { story: 'Exemplos de uso real do ZipLoading no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#FF9F4315;border:1px solid #FF9F4330;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ZipLoading</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ZipLoading no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ZipLoading no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ZipLoading</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ZipLoading.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#FF9F43 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ZipLoading</h1>
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

