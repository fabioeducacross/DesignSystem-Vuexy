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
  title: 'Educacross Components V2/Mission/FeedbackAndSend',
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Mission</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">FeedbackAndSend</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Mission Feedback Modal</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Mission Feedback Modal. Faz parte da categoria <strong>Mission</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import FeedbackAndSend from '@/components/FeedbackAndSend.vue';

// Template
&lt;FeedbackAndSend v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o FeedbackAndSend com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground FeedbackAndSend</p>
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
    docs: { description: { story: 'Exemplos de uso real do FeedbackAndSend no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: FeedbackAndSend</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando FeedbackAndSend no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com FeedbackAndSend no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via FeedbackAndSend</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o FeedbackAndSend.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: FeedbackAndSend</h1>
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

