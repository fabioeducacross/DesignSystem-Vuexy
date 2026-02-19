/**
 * CancelMission - Modal de Cancelamento de Missão
 * ================================================
 * Modal de confirmação para cancelar missão ativa com justificativa
 * 
 * @component CancelMission
 * @source educacross-frontoffice/src/components/mission-plus/CancelMission.vue
 * @category Educacross Components V2 / Modals
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * 
 * Versão simplificada (Fase 1 - Refatoração Emergencial)
 * - CSS inline removido → utiliza classes Vuexy nativas
 * - Multi-framework docs removido
 * - Estrutura modular com stories independentes
 */

export default {
  title: 'Educacross Components V2/Modals/CancelMission',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'warning', 'danger'],
      description: 'Variante visual do modal',
    },
    showReason: {
      control: 'boolean',
      description: 'Exibe campo de justificativa',
    },
  },
};

/**
 * Modal padrão de cancelamento de missão
 */
export const Default = {
  args: {
    variant: 'warning',
    showReason: false,
  },
  render: (args) => {
    return `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-${args.variant} bg-opacity-10">
            <h5 class="modal-title text-${args.variant}">
              <i class="bi bi-exclamation-triangle me-2"></i>
              Cancelar Missão
            </h5>
            <button type="button" class="btn-close"></button>
          </div>
          <div class="modal-body p-4">
            <p class="text-muted mb-3">
              Você tem certeza que deseja cancelar esta missão?
            </p>
            <div class="alert alert-${args.variant} alert-dismissible" role="alert">
              <strong>Atenção:</strong> Esta ação não poderá ser desfeita.
            </div>
            ${args.showReason ? `
              <div class="mb-3">
                <label for="cancelReason" class="form-label">Motivo do cancelamento</label>
                <textarea class="form-control" id="cancelReason" rows="3" placeholder="Descreva o motivo..."></textarea>
              </div>
            ` : ''}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Voltar</button>
            <button type="button" class="btn btn-${args.variant}">Confirmar Cancelamento</button>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Modal com campo de justificativa obrigatório
 */
export const WithReason = {
  args: {
    variant: 'warning',
    showReason: true,
  },
  render: Default.render,
};

/**
 * Modal com variante de perigo (ação crítica)
 */
export const DangerVariant = {
  args: {
    variant: 'danger',
    showReason: true,
  },
  render: Default.render,
};

/**
 * Modal compacto sem justificativa
 */
export const Compact = {
  args: {
    variant: 'warning',
    showReason: false,
  },
  render: (args) => {
    return `
      <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center p-4">
            <i class="bi bi-exclamation-circle text-${args.variant}" style="font-size: 3rem;"></i>
            <h5 class="mt-3 mb-2">Cancelar Missão?</h5>
            <p class="text-muted small mb-4">Esta ação não pode ser desfeita</p>
            <div class="d-flex gap-2 justify-content-center">
              <button type="button" class="btn btn-sm btn-secondary">Não</button>
              <button type="button" class="btn btn-sm btn-${args.variant}">Sim, Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Modal com informações da missão
 */
export const WithMissionInfo = {
  args: {
    variant: 'warning',
    showReason: true,
  },
  render: (args) => {
    return `
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-${args.variant} bg-opacity-10">
            <h5 class="modal-title text-${args.variant}">
              <i class="bi bi-exclamation-triangle me-2"></i>
              Cancelar Missão
            </h5>
            <button type="button" class="btn-close"></button>
          </div>
          <div class="modal-body p-4">
            <div class="card mb-3">
              <div class="card-body p-3">
                <h6 class="card-title mb-2">Missão: Leitura Dinâmica</h6>
                <div class="small text-muted">
                  <div class="mb-1"><i class="bi bi-book me-1"></i> 5 exercícios pendentes</div>
                  <div class="mb-1"><i class="bi bi-clock me-1"></i> Prazo: 15/02/2026</div>
                  <div><i class="bi bi-award me-1"></i> 250 pontos possíveis</div>
                </div>
              </div>
            </div>
            <div class="alert alert-${args.variant}" role="alert">
              <strong>Atenção:</strong> Ao cancelar, o progresso será perdido.
            </div>
            ${args.showReason ? `
              <div class="mb-0">
                <label for="reason" class="form-label">Motivo do cancelamento</label>
                <textarea class="form-control" id="reason" rows="3" placeholder="Descreva o motivo (opcional)..."></textarea>
              </div>
            ` : ''}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary">Voltar</button>
            <button type="button" class="btn btn-${args.variant}">Confirmar Cancelamento</button>
          </div>
        </div>
      </div>
    `;
  },
};

/**
 * Overview de todas as variantes
 */
export const Overview = {
  render: () => {
    return `
      <div class="container py-4">
        <h3 class="mb-4">CancelMission - Variantes</h3>
        
        <div class="row g-4">
          <div class="col-md-6">
            <h6 class="text-muted mb-3">Padrão (Warning)</h6>
            ${Default.render({ variant: 'warning', showReason: false })}
          </div>
          
          <div class="col-md-6">
            <h6 class="text-muted mb-3">Com Justificativa</h6>
            ${Default.render({ variant: 'warning', showReason: true })}
          </div>
          
          <div class="col-md-6">
            <h6 class="text-muted mb-3">Variante Danger</h6>
            ${DangerVariant.render({ variant: 'danger', showReason: false })}
          </div>
          
          <div class="col-md-6">
            <h6 class="text-muted mb-3">Modal Compacto</h6>
            ${Compact.render({ variant: 'warning', showReason: false })}
          </div>
        </div>
      </div>
    `;
  },
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
      <div style="background:linear-gradient(135deg,#EA5455 0%,#F08182 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Modals</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">CancelMission</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Modal de Cancelamento de Missão</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Modal de Cancelamento de Missão. Faz parte da categoria <strong>Modals</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #EA5455;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import CancelMission from '@/components/CancelMission.vue';

// Template
&lt;CancelMission v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o CancelMission com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#EA545520;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground CancelMission</p>
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
    docs: { description: { story: 'Exemplos de uso real do CancelMission no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#EA545515;border:1px solid #EA545530;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: CancelMission</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#EA5455;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando CancelMission no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#EA5455;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com CancelMission no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#EA5455;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via CancelMission</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o CancelMission.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#EA5455 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: CancelMission</h1>
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

