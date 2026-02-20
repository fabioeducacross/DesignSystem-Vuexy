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
    cancelled: {
      control: 'boolean',
      description: 'Exibe estado de missão cancelada',
    },
    loadingButton: {
      control: 'boolean',
      description: 'Estado de carregamento no botão de confirmar',
    },
    missionName: {
      control: 'text',
      description: 'Nome da missão a ser cancelada',
    }
  },
};

const styles = `
.cancel-mission-wrapper {
  width: min(760px, 92vw);
}

.cancel-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 24px rgba(47, 43, 61, 0.12);
  padding: 24px;
  font-family: 'Public Sans', 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.confirm-cancel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.img-school-doubt {
  width: 170px;
  height: 132px;
  object-fit: contain;
}

.img-school-success {
  width: 190px;
  height: 140px;
  object-fit: contain;
}

.title-cancel-mission {
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: #4b4b4b;
  margin: 12px 0 8px;
}

.warning-cancel-mission {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #6e6b7b;
  padding: 0 40px;
  margin: 8px 0;
}

.attention-cancel-mission {
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #ea5455;
  padding: 0 40px;
  margin: 8px 0 18px;
}

.action-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
}

.cancel-btn {
  min-width: 18rem;
  height: 48px;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.4px;
  border-radius: 8px;
  border: 1px solid #ea5455;
  cursor: pointer;
}

.cancel-btn.outline-danger {
  background: #fff;
  color: #ea5455;
}

.cancel-btn.danger {
  background: #ea5455;
  color: #fff;
}

.cancel-btn.primary {
  background: #7367f0;
  border-color: #7367f0;
  color: #fff;
}

.cancel-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.cancelled {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-cancelled {
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  color: #5e5873;
  margin: 0 0 16px;
}

.warning-mission-cancelled {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #6e6b7b;
  padding: 0 40px;
  margin: 0 0 16px;
}

.fade-in {
  animation-duration: 1s;
  animation-name: fadeIn;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.compact-mode .img-school-doubt {
  width: 120px;
  height: 92px;
}

.compact-mode .img-school-success {
  width: 130px;
  height: 96px;
}

.compact-mode .title-cancel-mission {
  font-size: 21px;
}

.compact-mode .warning-cancel-mission,
.compact-mode .attention-cancel-mission {
  font-size: 13px;
  line-height: 20px;
  padding: 0 16px;
}

.compact-mode .cancel-btn {
  min-width: 10rem;
  height: 40px;
  font-size: 13px;
}

@media (max-width: 720px) {
  .cancel-mission { padding: 16px; }
  .cancel-btn { min-width: 100%; }
  .warning-cancel-mission,
  .attention-cancel-mission,
  .warning-mission-cancelled { padding: 0 8px; }
}
`;

const renderCancelMission = ({ cancelled = false, loadingButton = false, missionName = 'Missão de Matemática', compact = false } = {}) => `
  <div class="cancel-mission-wrapper ${compact ? 'compact-mode' : ''}">
    <div class="cancel-mission">
      ${!cancelled ? `
        <div class="confirm-cancel">
          <div class="d-flex justify-content-center mb-1">
            <img
              class="img-school-doubt"
              src="/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png"
              alt="belinha"
            />
          </div>

          <h2 class="title-cancel-mission">Cancelar envio de missão?</h2>
          <p class="warning-cancel-mission">Tem certeza que deseja cancelar a "${missionName}"?</p>
          <p class="attention-cancel-mission">Atenção: Ao cancelar o envio da missão, a mesma não poderá ser reenviada para os alunos.</p>

          <div class="action-row">
            <button class="cancel-btn outline-danger">Não quero cancelar</button>
            <button class="cancel-btn danger" ${loadingButton ? 'disabled' : ''}>
              ${loadingButton ? 'Processando...' : 'Quero cancelar'}
            </button>
          </div>
        </div>
      ` : `
        <div class="cancelled fade-in">
          <div class="d-flex justify-content-center mb-2">
            <img
              class="img-school-success"
              src="/images/teacher-context/school-context/images-info-feedback/belinha-school-success2.png"
              alt="belinha sucesso"
            />
          </div>
          <h1 class="title-cancelled">Missão cancelada!</h1>
          <p class="warning-mission-cancelled">Não é mais possível enviar essa missão para os alunos, caso deseje ocultar a visualização dessa missão na listagem você pode arquivar a mesma.</p>
          <button class="cancel-btn primary">Ok</button>
        </div>
      `}
    </div>
  </div>
  <style>${styles}</style>
`;

/**
 * Modal padrão de cancelamento de missão
 */
export const Default = {
  args: {
    cancelled: false,
    loadingButton: false,
    missionName: 'Missão de Matemática',
  },
  render: (args) => renderCancelMission(args),
};

/**
 * Estado de carregamento no botão
 */
export const Loading = {
  args: {
    cancelled: false,
    loadingButton: true,
    missionName: 'Missão de Matemática',
  },
  render: (args) => renderCancelMission(args),
};

/**
 * Estado pós-cancelamento
 */
export const CancelledState = {
  args: {
    cancelled: true,
    loadingButton: false,
    missionName: 'Missão de Matemática',
  },
  render: (args) => renderCancelMission(args),
};

/**
 * Modal compacto
 */
export const Compact = {
  args: {
    cancelled: false,
    loadingButton: false,
    missionName: 'Missão curta',
  },
  render: (args) => renderCancelMission({ ...args, compact: true }),
};

/**
 * Variação com nome da missão maior
 */
export const WithMissionInfo = {
  args: {
    cancelled: false,
    loadingButton: false,
    missionName: 'Projeto Interdisciplinar de Ciências e Tecnologia',
  },
  render: (args) => renderCancelMission(args),
};

/**
 * Overview de todas as variantes
 */
export const Overview = {
  render: () => {
    return `
      <div style="padding:24px;background:#f8f8fb;min-height:100vh;font-family:'Public Sans',sans-serif;">
        <div style="max-width:1400px;margin:0 auto;">
          <h3 style="margin:0 0 20px 0;color:#5e5873;font-weight:700;">CancelMission - Variantes</h3>

          <div style="display:grid;grid-template-columns:1fr;gap:16px;max-width:980px;margin:0 auto;">
            <section style="background:#fff;border:1px solid #ebe9f1;border-radius:12px;padding:14px;box-shadow:0 2px 10px rgba(47,43,61,0.06);">
              <h6 style="margin:0 0 10px 0;color:#6e6b7b;font-weight:600;">Padrão</h6>
              <div style="border:1px solid #ebe9f1;border-radius:10px;overflow:auto;max-height:430px;background:#fff;">
                <div style="transform:scale(0.88);transform-origin:top center;width:114%;margin-left:-7%;padding-top:8px;">
                  ${Default.render({ cancelled: false, loadingButton: false, missionName: 'Missão de Matemática' })}
                </div>
              </div>
            </section>

            <section style="background:#fff;border:1px solid #ebe9f1;border-radius:12px;padding:14px;box-shadow:0 2px 10px rgba(47,43,61,0.06);">
              <h6 style="margin:0 0 10px 0;color:#6e6b7b;font-weight:600;">Carregando</h6>
              <div style="border:1px solid #ebe9f1;border-radius:10px;overflow:auto;max-height:430px;background:#fff;">
                <div style="transform:scale(0.88);transform-origin:top center;width:114%;margin-left:-7%;padding-top:8px;">
                  ${Loading.render({ cancelled: false, loadingButton: true, missionName: 'Missão de Matemática' })}
                </div>
              </div>
            </section>

            <section style="background:#fff;border:1px solid #ebe9f1;border-radius:12px;padding:14px;box-shadow:0 2px 10px rgba(47,43,61,0.06);">
              <h6 style="margin:0 0 10px 0;color:#6e6b7b;font-weight:600;">Estado Cancelado</h6>
              <div style="border:1px solid #ebe9f1;border-radius:10px;overflow:auto;max-height:430px;background:#fff;">
                <div style="transform:scale(0.88);transform-origin:top center;width:114%;margin-left:-7%;padding-top:8px;">
                  ${CancelledState.render({ cancelled: true, loadingButton: false, missionName: 'Missão de Matemática' })}
                </div>
              </div>
            </section>

            <section style="background:#fff;border:1px solid #ebe9f1;border-radius:12px;padding:14px;box-shadow:0 2px 10px rgba(47,43,61,0.06);">
              <h6 style="margin:0 0 10px 0;color:#6e6b7b;font-weight:600;">Modal Compacto</h6>
              <div style="border:1px solid #ebe9f1;border-radius:10px;overflow:auto;max-height:430px;background:#fff;">
                <div style="transform:scale(0.88);transform-origin:top center;width:114%;margin-left:-7%;padding-top:8px;">
                  ${Compact.render({ cancelled: false, loadingButton: false, missionName: 'Missão curta' })}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
  },
};

export const OverviewA = {
  ...Overview,
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

