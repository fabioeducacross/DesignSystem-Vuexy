/**
 * FeedbackAndSend - Mission Feedback Modal
 * =========================================
 * Modal de confirmação após criação de missão com opção de envio imediato
 * 
 * @component FeedbackAndSend
 * @category Educacross Components V2 / Modals
 * @source educacross-frontoffice/src/components/mission-plus/FeedbackAndSend.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Mission/FeedbackAndSend',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# FeedbackAndSend

Modal de **feedback pós-criação** com opção de envio imediato.

## Contexto de Uso

- **Criar missão**: Confirmação após salvar
- **Publicar guia**: Feedback de publicação
- **Envio opcional**: Decidir enviar agora ou depois
- **Preview rápido**: Ver resumo do criado
- **Workflow completo**: Criar → confirmar → enviar

## Características

- **Success icon**: Ícone task_alt verde grande
- **Title display**: "Missão criada com sucesso!"
- **Divider lines**: Separação visual entre seções
- **MissionDetails slot**: Preview da missão criada
- **Action buttons**: "Sair" vs "Enviar agora"
- **Loading state**: Spinner durante envio

## Events

- **@close**: Fecha sem enviar
- **@close-and-update**: Fecha após enviar e atualiza lista
        `
      }
    }
  }
};

const feedbackAndSendStyles = `
<style>
  .feedback-modal {
    background: white;
    border-radius: 16px;
    padding: 40px;
    max-width: 600px;
    text-align: center;
  }
  
  .modal-icon {
    font-size: 80px;
    margin-bottom: 20px;
  }
  
  .icon-success {
    color: #28C76F;
  }
  
  .modal-title {
    font-size: 24px;
    font-weight: 600;
    color: #5D596C;
    margin-bottom: 24px;
  }
  
  .title-success {
    color: #28C76F;
  }
  
  .divider {
    border: none;
    border-top: 1px solid #E0E0E0;
    margin: 24px auto;
    width: 75%;
  }
  
  .mission-preview {
    background: #F8F7FA;
    border-radius: 12px;
    padding: 20px;
    margin: 24px 0;
    text-align: left;
  }
  
  .preview-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 14px;
  }
  
  .preview-label {
    color: #6E6B7B;
  }
  
  .preview-value {
    font-weight: 600;
    color: #5D596C;
  }
  
  .action-buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
  }
  
  .btn {
    padding: 12px 32px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .btn-outline {
    background: transparent;
    color: #6E6B7B;
    border: 1px solid #DBDADE;
  }
  
  .btn-outline:hover:not(:disabled) {
    background: #F8F7FA;
  }
  
  .btn-primary {
    background: #6E63E8;
    color: white;
  }
  
  .btn-primary:hover:not(:disabled) {
    background: #5951D4;
  }
  
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
`;

export const Default = {
  render: () => `
    ${feedbackAndSendStyles}
    <div class="feedback-modal">
      <h1 class="modal-title">Deseja enviar missão?</h1>
      
      <div class="mission-preview">
        <div class="preview-row">
          <span class="preview-label">Título:</span>
          <span class="preview-value">Equações do 1º Grau</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Disciplina:</span>
          <span class="preview-value">Matemática</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Turmas:</span>
          <span class="preview-value">7º A, 7º B</span>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="btn btn-outline">
          Sair sem enviar
        </button>
        <button class="btn btn-primary">
          Enviar missão agora
        </button>
      </div>
    </div>
  `
};

export const Success = {
  render: () => `
    ${feedbackAndSendStyles}
    <div class="feedback-modal">
      <i class="bi bi-check-circle-fill modal-icon icon-success"></i>
      <h1 class="modal-title title-success">Missão criada com sucesso!</h1>
      
      <hr class="divider" />
      
      <div class="mission-preview">
        <div class="preview-row">
          <span class="preview-label">Título:</span>
          <span class="preview-value">Verbos Irregulares</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Disciplina:</span>
          <span class="preview-value">Português</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Turma:</span>
          <span class="preview-value">8º A</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Alunos:</span>
          <span class="preview-value">28 alunos</span>
        </div>
      </div>
      
      <hr class="divider" />
      
      <div class="action-buttons">
        <button class="btn btn-outline">
          Sair sem enviar
        </button>
        <button class="btn btn-primary">
          Enviar missão agora
        </button>
      </div>
    </div>
  `
};

export const WithDetails = {
  render: () => `
    ${feedbackAndSendStyles}
    <div class="feedback-modal" style="max-width: 700px;">
      <i class="bi bi-check-circle-fill modal-icon icon-success"></i>
      <h1 class="modal-title title-success">Missão criada com sucesso!</h1>
      
      <hr class="divider" />
      
      <div class="mission-preview">
        <h3 style="margin-bottom: 16px; color: #5D596C;">Resumo da Missão</h3>
        <div class="preview-row">
          <span class="preview-label">Título:</span>
          <span class="preview-value">Frações e Decimais</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Disciplina:</span>
          <span class="preview-value">Matemática</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Ano:</span>
          <span class="preview-value">6º Ano</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Turmas:</span>
          <span class="preview-value">6º A, 6º B (52 alunos)</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Questões:</span>
          <span class="preview-value">15 questões</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Pontuação:</span>
          <span class="preview-value">100 pontos</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Prazo:</span>
          <span class="preview-value">10/02/2026</span>
        </div>
      </div>
      
      <hr class="divider" />
      
      <div class="action-buttons">
        <button class="btn btn-outline">
          Sair sem enviar
        </button>
        <button class="btn btn-primary">
          Enviar para 52 alunos
        </button>
      </div>
    </div>
  `
};

export const Loading = {
  render: () => `
    ${feedbackAndSendStyles}
    <div class="feedback-modal">
      <i class="bi bi-check-circle-fill modal-icon icon-success"></i>
      <h1 class="modal-title title-success">Missão criada com sucesso!</h1>
      
      <hr class="divider" />
      
      <div class="mission-preview">
        <div class="preview-row">
          <span class="preview-label">Título:</span>
          <span class="preview-value">Geografia do Brasil</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Turmas:</span>
          <span class="preview-value">7º A</span>
        </div>
      </div>
      
      <hr class="divider" />
      
      <div class="action-buttons">
        <button class="btn btn-outline" disabled>
          Sair sem enviar
        </button>
        <button class="btn btn-primary" disabled>
          <div class="spinner"></div>
          Enviando missão...
        </button>
      </div>
    </div>
  `
};

export const Sent = {
  render: () => `
    ${feedbackAndSendStyles}
    <div class="feedback-modal">
      <i class="bi bi-send-check-fill modal-icon icon-success"></i>
      <h1 class="modal-title title-success">Missão enviada com sucesso!</h1>
      
      <div style="background: #E8F5E9; border: 1px solid #A5D6A7; border-radius: 12px; padding: 16px; margin: 24px 0;">
        <p style="margin: 0; color: #2E7D32; font-size: 14px;">
          <i class="bi bi-check-circle-fill"></i> A missão foi enviada para 28 alunos do 8º A
        </p>
      </div>
      
      <div class="mission-preview">
        <div class="preview-row">
          <span class="preview-label">Enviado em:</span>
          <span class="preview-value">03/02/2026 às 14:30</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Prazo:</span>
          <span class="preview-value">10/02/2026</span>
        </div>
        <div class="preview-row">
          <span class="preview-label">Status:</span>
          <span class="preview-value" style="color: #28C76F;">
            <i class="bi bi-check-lg"></i> Ativa
          </span>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="btn btn-outline">
          Ver missões
        </button>
        <button class="btn btn-primary">
          Criar nova missão
        </button>
      </div>
    </div>
  `
};

export const WithError = {
  render: () => `
    ${feedbackAndSendStyles}
    <div class="feedback-modal">
      <i class="bi bi-exclamation-triangle-fill modal-icon" style="color: #EA5455;"></i>
      <h1 class="modal-title" style="color: #EA5455;">Erro ao enviar missão</h1>
      
      <div style="background: #FFEBEE; border: 1px solid #FFCDD2; border-radius: 12px; padding: 16px; margin: 24px 0;">
        <p style="margin: 0; color: #C62828; font-size: 14px;">
          <i class="bi bi-exclamation-circle-fill"></i> Não foi possível enviar a missão. Verifique sua conexão.
        </p>
      </div>
      
      <div class="action-buttons">
        <button class="btn btn-outline">
          Cancelar
        </button>
        <button class="btn btn-primary">
          <i class="bi bi-arrow-repeat"></i>
          Tentar novamente
        </button>
      </div>
    </div>
  `
};

export const MobileView = {
  render: () => `
    ${feedbackAndSendStyles}
    <div style="max-width: 375px; margin: 0 auto;">
      <div class="feedback-modal" style="padding: 24px;">
        <i class="bi bi-check-circle-fill modal-icon icon-success" style="font-size: 60px;"></i>
        <h1 class="modal-title title-success" style="font-size: 20px;">Missão criada!</h1>
        
        <div class="mission-preview">
          <div class="preview-row">
            <span class="preview-label">Título:</span>
            <span class="preview-value" style="font-size: 13px;">História do Brasil</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">Turma:</span>
            <span class="preview-value">9º A</span>
          </div>
        </div>
        
        <div class="action-buttons" style="flex-direction: column; width: 100%;">
          <button class="btn btn-primary" style="width: 100%; justify-content: center;">
            Enviar agora
          </button>
          <button class="btn btn-outline" style="width: 100%; justify-content: center;">
            Sair
          </button>
        </div>
      </div>
    </div>
  `
};

export const Interactive = {
  render: () => {
    setTimeout(() => {
      const sendBtn = document.getElementById('sendMissionBtn');
      const exitBtn = document.getElementById('exitBtn');
      
      if (sendBtn) {
        sendBtn.addEventListener('click', () => {
          sendBtn.disabled = true;
          exitBtn.disabled = true;
          sendBtn.innerHTML = '<div class="spinner"></div> Enviando...';
          
          setTimeout(() => {
            const modal = document.querySelector('.feedback-modal');
            modal.innerHTML = `
              <i class="bi bi-send-check-fill modal-icon icon-success"></i>
              <h1 class="modal-title title-success">Enviado com sucesso!</h1>
              <div style="background: #E8F5E9; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; color: #2E7D32;">Event: @close-and-update emitido!</p>
              </div>
              <button class="btn btn-primary" onclick="location.reload()">Fechar</button>
            `;
          }, 2000);
        });
      }
      
      if (exitBtn) {
        exitBtn.addEventListener('click', () => {
          alert('Event: @close emitido!\n\nFechando modal sem enviar...');
        });
      }
    }, 100);
    
    return `
      ${feedbackAndSendStyles}
      <div class="feedback-modal">
        <i class="bi bi-check-circle-fill modal-icon icon-success"></i>
        <h1 class="modal-title title-success">Missão criada - Interativo</h1>
        
        <div class="mission-preview">
          <div class="preview-row">
            <span class="preview-label">Título:</span>
            <span class="preview-value">Missão Interativa</span>
          </div>
          <div class="preview-row">
            <span class="preview-label">Turma:</span>
            <span class="preview-value">7º A (28 alunos)</span>
          </div>
        </div>
        
        <hr class="divider" />
        
        <div class="action-buttons">
          <button class="btn btn-outline" id="exitBtn">
            Sair sem enviar
          </button>
          <button class="btn btn-primary" id="sendMissionBtn">
            Enviar missão agora
          </button>
        </div>
      </div>
    `;
  }
};
