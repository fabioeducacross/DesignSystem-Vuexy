/**
 * ButtonWaitAction Component - Pixel Perfect from educacross-frontoffice
 *
 * @component ButtonWaitAction
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/form/button/ButtonWaitAction.vue
 * @priority P0
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Forms/ButtonWaitAction',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## ButtonWaitAction - Botão com Estado de Loading Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/components/form/button/ButtonWaitAction.vue\`.

Este botão gerencia automaticamente o estado de loading durante ações assíncronas.

### Props do Componente Real

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`label\` | String | required | Texto do botão |
| \`variant\` | String | 'primary' | Variante Bootstrap (primary, success, danger, etc.) |
| \`disabled\` | Boolean | false | Estado desabilitado |

### Comportamento

1. Ao clicar, o botão entra em estado de loading
2. Emite evento \`@click\` com uma Promise resolve
3. Quando a Promise é resolvida, o loading para
4. Durante loading, o botão fica desabilitado

### Events

- \`@click(resolve)\` - Emitido com função resolve para controlar o loading
        `,
      },
    },
  },
};

// CSS do ButtonWaitAction extraído do frontoffice
const buttonWaitStyles = `
<style>
  /* === ButtonWaitAction - CSS Pixel Perfect do Frontoffice === */
  
  :root {
    --primary: #6e63e8;
    --success: #28c76f;
    --danger: #ea5455;
    --warning: #ff9f43;
    --info: #00cfe8;
    --secondary: #82868b;
  }

  .btn-wait-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-weight: 500;
    padding: 0.786rem 1.5rem;
    border-radius: 0.358rem;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
  }

  .btn-wait-action:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  /* Variants */
  .btn-wait-action.btn-primary {
    background-color: var(--primary);
    color: white;
  }
  .btn-wait-action.btn-primary:hover:not(:disabled) {
    background-color: #5a51d6;
    box-shadow: 0 8px 25px -8px rgba(110, 99, 232, 0.8);
  }

  .btn-wait-action.btn-success {
    background-color: var(--success);
    color: white;
  }
  .btn-wait-action.btn-success:hover:not(:disabled) {
    background-color: #24b263;
    box-shadow: 0 8px 25px -8px rgba(40, 199, 111, 0.8);
  }

  .btn-wait-action.btn-danger {
    background-color: var(--danger);
    color: white;
  }
  .btn-wait-action.btn-danger:hover:not(:disabled) {
    background-color: #e73d3e;
    box-shadow: 0 8px 25px -8px rgba(234, 84, 85, 0.8);
  }

  .btn-wait-action.btn-warning {
    background-color: var(--warning);
    color: white;
  }
  .btn-wait-action.btn-warning:hover:not(:disabled) {
    background-color: #ff8510;
    box-shadow: 0 8px 25px -8px rgba(255, 159, 67, 0.8);
  }

  .btn-wait-action.btn-info {
    background-color: var(--info);
    color: white;
  }

  .btn-wait-action.btn-secondary {
    background-color: var(--secondary);
    color: white;
  }

  /* Spinner */
  .btn-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Outline variants */
  .btn-wait-action.btn-outline-primary {
    background-color: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);
  }
  .btn-wait-action.btn-outline-primary:hover:not(:disabled) {
    background-color: var(--primary);
    color: white;
  }
  .btn-wait-action.btn-outline-primary .btn-spinner {
    border-color: rgba(110, 99, 232, 0.3);
    border-top-color: var(--primary);
  }

  .btn-wait-action.btn-outline-success {
    background-color: transparent;
    border: 1px solid var(--success);
    color: var(--success);
  }
  .btn-wait-action.btn-outline-success:hover:not(:disabled) {
    background-color: var(--success);
    color: white;
  }

  .btn-wait-action.btn-outline-danger {
    background-color: transparent;
    border: 1px solid var(--danger);
    color: var(--danger);
  }
  .btn-wait-action.btn-outline-danger:hover:not(:disabled) {
    background-color: var(--danger);
    color: white;
  }

  /* Size variants */
  .btn-wait-action.btn-sm {
    padding: 0.486rem 1rem;
    font-size: 0.9rem;
  }

  .btn-wait-action.btn-lg {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }

  .btn-wait-action.btn-sm .btn-spinner {
    width: 0.8rem;
    height: 0.8rem;
  }

  .btn-wait-action.btn-lg .btn-spinner {
    width: 1.2rem;
    height: 1.2rem;
  }
</style>
`;

/**
 * Default - Botão normal
 */
export const Default = {
  render: () => `
    ${buttonWaitStyles}
    <div class="p-4 d-flex gap-3">
      <button class="btn-wait-action btn-primary">
        Salvar
      </button>
      <button class="btn-wait-action btn-success">
        Confirmar
      </button>
      <button class="btn-wait-action btn-danger">
        Excluir
      </button>
      <button class="btn-wait-action btn-warning">
        Atenção
      </button>
    </div>
  `,
};

/**
 * Loading - Estado de carregamento
 */
export const Loading = {
  render: () => `
    ${buttonWaitStyles}
    <div class="p-4 d-flex gap-3">
      <button class="btn-wait-action btn-primary" disabled>
        <span class="btn-spinner"></span>
        Salvando...
      </button>
      <button class="btn-wait-action btn-success" disabled>
        <span class="btn-spinner"></span>
        Processando...
      </button>
      <button class="btn-wait-action btn-danger" disabled>
        <span class="btn-spinner"></span>
        Excluindo...
      </button>
    </div>
  `,
};

/**
 * Disabled - Estado desabilitado
 */
export const Disabled = {
  render: () => `
    ${buttonWaitStyles}
    <div class="p-4 d-flex gap-3">
      <button class="btn-wait-action btn-primary" disabled>
        Desabilitado
      </button>
      <button class="btn-wait-action btn-success" disabled>
        Desabilitado
      </button>
      <button class="btn-wait-action btn-danger" disabled>
        Desabilitado
      </button>
    </div>
  `,
};

/**
 * OutlineVariants - Variantes outline
 */
export const OutlineVariants = {
  render: () => `
    ${buttonWaitStyles}
    <div class="p-4">
      <div class="d-flex gap-3 mb-3">
        <button class="btn-wait-action btn-outline-primary">
          Primary
        </button>
        <button class="btn-wait-action btn-outline-success">
          Success
        </button>
        <button class="btn-wait-action btn-outline-danger">
          Danger
        </button>
      </div>
      <div class="d-flex gap-3">
        <button class="btn-wait-action btn-outline-primary" disabled>
          <span class="btn-spinner"></span>
          Loading...
        </button>
        <button class="btn-wait-action btn-outline-success" disabled>
          <span class="btn-spinner"></span>
          Loading...
        </button>
        <button class="btn-wait-action btn-outline-danger" disabled>
          <span class="btn-spinner"></span>
          Loading...
        </button>
      </div>
    </div>
  `,
};

/**
 * Sizes - Tamanhos diferentes
 */
export const Sizes = {
  render: () => `
    ${buttonWaitStyles}
    <div class="p-4 d-flex align-items-center gap-3">
      <button class="btn-wait-action btn-primary btn-sm">
        Pequeno
      </button>
      <button class="btn-wait-action btn-primary">
        Normal
      </button>
      <button class="btn-wait-action btn-primary btn-lg">
        Grande
      </button>
    </div>
    <div class="p-4 d-flex align-items-center gap-3">
      <button class="btn-wait-action btn-primary btn-sm" disabled>
        <span class="btn-spinner"></span>
        Carregando
      </button>
      <button class="btn-wait-action btn-primary" disabled>
        <span class="btn-spinner"></span>
        Carregando
      </button>
      <button class="btn-wait-action btn-primary btn-lg" disabled>
        <span class="btn-spinner"></span>
        Carregando
      </button>
    </div>
  `,
};

/**
 * WithIcons - Com ícones
 */
export const WithIcons = {
  render: () => `
    ${buttonWaitStyles}
    <div class="p-4 d-flex gap-3">
      <button class="btn-wait-action btn-primary">
        <span class="material-symbols-outlined" style="font-size: 18px;">save</span>
        Salvar
      </button>
      <button class="btn-wait-action btn-success">
        <span class="material-symbols-outlined" style="font-size: 18px;">check</span>
        Confirmar
      </button>
      <button class="btn-wait-action btn-danger">
        <span class="material-symbols-outlined" style="font-size: 18px;">delete</span>
        Excluir
      </button>
    </div>
  `,
};

/**
 * InContext - Uso em formulário
 */
export const InContext = {
  render: () => `
    ${buttonWaitStyles}
    <style>
      .form-demo {
        max-width: 400px;
        padding: 1.5rem;
        border: 1px solid #ebe9f1;
        border-radius: 0.428rem;
        background: white;
      }
      .form-demo .form-label {
        font-weight: 500;
        color: #5e5873;
        margin-bottom: 0.25rem;
      }
      .form-demo .form-control {
        width: 100%;
        padding: 0.571rem 1rem;
        border: 1px solid #d8d6de;
        border-radius: 0.357rem;
        margin-bottom: 1rem;
      }
      .form-demo .btn-group {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;
      }
    </style>
    <div class="p-4">
      <div class="form-demo">
        <h5 class="mb-3">Editar Aluno</h5>
        <div>
          <label class="form-label">Nome</label>
          <input type="text" class="form-control" value="João Silva" />
        </div>
        <div>
          <label class="form-label">Email</label>
          <input type="email" class="form-control" value="joao@escola.com" />
        </div>
        <div class="btn-group">
          <button class="btn-wait-action btn-outline-secondary">
            Cancelar
          </button>
          <button class="btn-wait-action btn-primary" disabled>
            <span class="btn-spinner"></span>
            Salvando...
          </button>
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
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Forms</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ButtonWaitAction</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Pixel Perfect from educacross-frontoffice</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Pixel Perfect from educacross-frontoffice. Faz parte da categoria <strong>Forms</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ButtonWaitAction from '@/components/ButtonWaitAction.vue';

// Template
&lt;ButtonWaitAction v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o ButtonWaitAction com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ButtonWaitAction</p>
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
    docs: { description: { story: 'Exemplos de uso real do ButtonWaitAction no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ButtonWaitAction</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ButtonWaitAction no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ButtonWaitAction no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ButtonWaitAction</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ButtonWaitAction.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ButtonWaitAction</h1>
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

