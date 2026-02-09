/**
 * CancelMission - Modal de Cancelamento de Missão
 * ================================================
 * Modal de confirmação para cancelar missão ativa com justificativa
 * 
 * @component CancelMission
 * @category Educacross Components V2 / Modals
 * @source educacross-frontoffice (gestão de missões)
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
