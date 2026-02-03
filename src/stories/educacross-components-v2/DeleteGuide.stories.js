/**
 * DeleteGuide - Mission Deletion Confirmation Component
 * =========================================
 * 
 * Confirmation dialog for deleting missions with Belinha mascot guidance.
 * Includes loading states and destructive action patterns.
 * 
 * @component DeleteGuide
 * @source educacross-frontoffice\src\components\mission-plus\DeleteGuide.vue
 */

export default {
  title: 'Educacross Components V2/Guides/DeleteGuide',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# DeleteGuide

Componente de **confirmação para excluir missões** com orientação visual da mascote Belinha.

## Contexto de Uso

- **Exclusão de missões**: Confirmar antes de deletar missão/atividade
- **Ação destrutiva**: Padrão para ações irreversíveis
- **Feedback visual**: Mascote Belinha fornece contexto amigável
- **Estados de loading**: Spinner durante processamento
- **Prevenção de erros**: Confirmação dupla antes da exclusão

## Estrutura

\`\`\`
+----------------------------------------+
|        [Belinha mascote]               |  ← Imagem contexto
|                                        |
| Deseja excluir a missão "Matemática"? |  ← Título confirmação
|                                        |
| [Não quero excluir] [Quero excluir]   |  ← Actions buttons
+----------------------------------------+
\`\`\`

## Características

- **Mascote Belinha**: Imagem contextual que humaniza diálogo
- **Título dinâmico**: Exibe nome da missão a ser excluída
- **Botões opostos**: "Não quero" outline-danger vs "Quero" filled danger
- **Loading state**: Spinner branco no botão durante processamento
- **Disabled states**: Previne múltiplos cliques durante loading
- **Gap 4 (24px)**: Espaçamento entre botões
- **Centered layout**: Tudo centralizado para foco na decisão

## Events

- **@close**: Quando clica "Não quero excluir" (cancela)
- **@close-and-update**: Quando clica "Quero excluir" (confirma e atualiza)

## Estados do Componente

1. **Idle (padrão)**: Ambos botões habilitados, sem spinner
2. **Loading delete**: Botão "Quero excluir" com spinner, ambos disabled
3. **Loading cancel**: Ambos botões disabled (previne cliques)

## Padrão de Ação Destrutiva

- **Danger variant**: Vermelho #EA5455 para indicar perigo
- **Outline primeiro**: Ação segura (não excluir) é outline
- **Filled segundo**: Ação destrutiva (excluir) é filled, mais proeminente
- **Confirmação explícita**: Texto claro "Quero excluir" sem ambiguidade
- **Visual feedback**: Spinner durante processamento confirma ação

## Quando usar

- **Exclusões permanentes**: Deletar missões, provas, questões
- **Ações irreversíveis**: Qualquer operação que não pode ser desfeita
- **Confirmação crítica**: Operações que impactam múltiplos usuários
- **Context awareness**: Quando precisa humanizar diálogo sério
        `
      }
    }
  }
};

/**
 * Design Specs
 * 
 * Cores:
 * - Danger: #EA5455 (vermelho destrutivo)
 * - Outline danger: border #EA5455, text #EA5455
 * - Filled danger: background #EA5455, text white
 * - Spinner: white (contrasta com danger background)
 * 
 * Dimensões:
 * - Belinha image: mb-1 (margin-bottom 8px)
 * - Gap buttons: gap-4 (24px)
 * - Button padding: Bootstrap padrão ~10px 20px
 * - Spinner: small variant (16×16px)
 * 
 * Tipografia:
 * - Título h1: font-size ~24px (Bootstrap default)
 * - Button text: font-size 14px
 * 
 * Layout:
 * - Container: d-flex flex-col align-items-center
 * - Buttons: d-flex justify-content-center gap-4
 */

// Estilos base
const deleteGuideStyles = `
<style>
  .delete-guide-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;
    max-width: 500px;
  }
  
  .mascot-image {
    margin-bottom: 16px;
    max-width: 200px;
    height: auto;
  }
  
  .delete-title {
    font-size: 20px;
    font-weight: 600;
    color: #5D596C;
    text-align: center;
    margin-bottom: 24px;
    line-height: 1.4;
  }
  
  .mission-name {
    color: #EA5455;
    font-weight: 700;
  }
  
  .actions-container {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  .btn {
    padding: 10px 20px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  
  .btn-outline-danger {
    background: transparent;
    color: #EA5455;
    border-color: #EA5455;
  }
  
  .btn-outline-danger:hover:not(:disabled) {
    background: #EA5455;
    color: white;
  }
  
  .btn-danger {
    background: #EA5455;
    color: white;
    border-color: #EA5455;
  }
  
  .btn-danger:hover:not(:disabled) {
    background: #D63E3F;
    border-color: #D63E3F;
  }
  
  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  .warning-box {
    background: #FFF3CD;
    border-left: 4px solid #FF9F43;
    padding: 12px 16px;
    border-radius: 6px;
    margin-bottom: 20px;
    max-width: 400px;
  }
  
  .warning-text {
    font-size: 13px;
    color: #856404;
    margin: 0;
  }
  
  @media (max-width: 576px) {
    .actions-container {
      flex-direction: column;
      width: 100%;
    }
    
    .btn {
      width: 100%;
      justify-content: center;
    }
    
    .delete-title {
      font-size: 18px;
    }
  }
</style>
`;

// Story: Default
export const Default = {
  render: () => `
    ${deleteGuideStyles}
    <div class="delete-guide-container">
      <svg width="120" height="120" viewBox="0 0 120 120" class="mascot-image">
        <circle cx="60" cy="60" r="50" fill="#FFE5CC"/>
        <circle cx="45" cy="55" r="5" fill="#5D596C"/>
        <circle cx="75" cy="55" r="5" fill="#5D596C"/>
        <path d="M 45 75 Q 60 85 75 75" stroke="#5D596C" stroke-width="3" fill="none" stroke-linecap="round"/>
        <text x="60" y="25" text-anchor="middle" font-size="40" fill="#EA5455">?</text>
      </svg>
      
      <h1 class="delete-title">
        Deseja excluir a missão <span class="mission-name">"Matemática Básica"</span>?
      </h1>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger">
          Não quero excluir
        </button>
        <button class="btn btn-danger">
          Quero excluir
        </button>
      </div>
    </div>
  `
};

// Story: WithLoading
export const WithLoading = {
  render: () => `
    ${deleteGuideStyles}
    <div class="delete-guide-container">
      <svg width="120" height="120" viewBox="0 0 120 120" class="mascot-image">
        <circle cx="60" cy="60" r="50" fill="#FFE5CC"/>
        <circle cx="45" cy="55" r="5" fill="#5D596C"/>
        <circle cx="75" cy="55" r="5" fill="#5D596C"/>
        <path d="M 45 75 Q 60 70 75 75" stroke="#5D596C" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>
      
      <h1 class="delete-title">
        Deseja excluir a missão <span class="mission-name">"Geografia Mundial"</span>?
      </h1>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger" disabled>
          Não quero excluir
        </button>
        <button class="btn btn-danger" disabled>
          Quero excluir
          <span class="spinner"></span>
        </button>
      </div>
    </div>
  `
};

// Story: WithWarning
export const WithWarning = {
  render: () => `
    ${deleteGuideStyles}
    <div class="delete-guide-container">
      <svg width="120" height="120" viewBox="0 0 120 120" class="mascot-image">
        <circle cx="60" cy="60" r="50" fill="#FFE5CC"/>
        <circle cx="45" cy="55" r="5" fill="#5D596C"/>
        <circle cx="75" cy="55" r="5" fill="#5D596C"/>
        <path d="M 45 75 Q 60 68 75 75" stroke="#5D596C" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M 50 45 L 45 50" stroke="#5D596C" stroke-width="2" stroke-linecap="round"/>
        <path d="M 70 45 L 75 50" stroke="#5D596C" stroke-width="2" stroke-linecap="round"/>
      </svg>
      
      <h1 class="delete-title">
        Deseja excluir a missão <span class="mission-name">"Português Avançado"</span>?
      </h1>
      
      <div class="warning-box">
        <p class="warning-text">
          <i class="bi bi-exclamation-triangle-fill" style="margin-right: 8px;"></i>
          <strong>Atenção:</strong> Esta ação não pode ser desfeita. Todos os dados da missão serão perdidos permanentemente.
        </p>
      </div>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger">
          Não quero excluir
        </button>
        <button class="btn btn-danger">
          Quero excluir
        </button>
      </div>
    </div>
  `
};

// Story: MultipleMissions
export const MultipleMissions = {
  render: () => `
    ${deleteGuideStyles}
    <style>
      .missions-list {
        background: #F8F7FA;
        border: 1px solid #DBDADE;
        border-radius: 6px;
        padding: 16px;
        margin: 16px 0;
        max-width: 400px;
      }
      
      .mission-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 0;
        border-bottom: 1px solid #E0E0E0;
      }
      
      .mission-item:last-child {
        border-bottom: none;
      }
      
      .mission-icon {
        color: #EA5455;
        font-size: 16px;
      }
    </style>
    
    <div class="delete-guide-container">
      <svg width="120" height="120" viewBox="0 0 120 120" class="mascot-image">
        <circle cx="60" cy="60" r="50" fill="#FFE5CC"/>
        <circle cx="45" cy="55" r="5" fill="#5D596C"/>
        <circle cx="75" cy="55" r="5" fill="#5D596C"/>
        <path d="M 45 75 Q 60 68 75 75" stroke="#5D596C" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>
      
      <h1 class="delete-title">
        Deseja excluir <span class="mission-name">3 missões</span>?
      </h1>
      
      <div class="missions-list">
        <div class="mission-item">
          <i class="bi bi-trash mission-icon"></i>
          <span style="font-size: 14px; color: #5D596C;">Matemática Básica</span>
        </div>
        <div class="mission-item">
          <i class="bi bi-trash mission-icon"></i>
          <span style="font-size: 14px; color: #5D596C;">Geografia Mundial</span>
        </div>
        <div class="mission-item">
          <i class="bi bi-trash mission-icon"></i>
          <span style="font-size: 14px; color: #5D596C;">Português Avançado</span>
        </div>
      </div>
      
      <div class="warning-box">
        <p class="warning-text">
          <strong>Atenção:</strong> Todas as 3 missões e seus dados serão excluídos permanentemente.
        </p>
      </div>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger">
          Cancelar
        </button>
        <button class="btn btn-danger">
          Excluir 3 missões
        </button>
      </div>
    </div>
  `
};

// Story: WithStudentsImpact
export const WithStudentsImpact = {
  render: () => `
    ${deleteGuideStyles}
    <style>
      .impact-box {
        background: #FFF3E0;
        border-left: 4px solid #FF9F43;
        padding: 12px 16px;
        border-radius: 6px;
        margin: 16px 0;
        max-width: 400px;
      }
      
      .impact-stat {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0;
        font-size: 14px;
        color: #5D596C;
      }
      
      .impact-number {
        font-weight: 700;
        color: #FF9F43;
        font-size: 18px;
      }
    </style>
    
    <div class="delete-guide-container">
      <svg width="120" height="120" viewBox="0 0 120 120" class="mascot-image">
        <circle cx="60" cy="60" r="50" fill="#FFE5CC"/>
        <circle cx="45" cy="55" r="5" fill="#5D596C"/>
        <circle cx="75" cy="55" r="5" fill="#5D596C"/>
        <path d="M 45 75 Q 60 68 75 75" stroke="#5D596C" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="50" cy="45" r="2" fill="#5D596C"/>
        <circle cx="70" cy="45" r="2" fill="#5D596C"/>
      </svg>
      
      <h1 class="delete-title">
        Deseja excluir a missão <span class="mission-name">"Ciências Naturais"</span>?
      </h1>
      
      <div class="impact-box">
        <div class="impact-stat">
          <i class="bi bi-people-fill" style="color: #FF9F43; font-size: 20px;"></i>
          <span class="impact-number">28</span>
          <span>alunos têm esta missão atribuída</span>
        </div>
        <div class="impact-stat">
          <i class="bi bi-check-circle-fill" style="color: #28C76F; font-size: 18px;"></i>
          <span class="impact-number">12</span>
          <span>já concluíram</span>
        </div>
        <div class="impact-stat">
          <i class="bi bi-clock-fill" style="color: #00CFE8; font-size: 18px;"></i>
          <span class="impact-number">16</span>
          <span>em andamento</span>
        </div>
      </div>
      
      <div class="warning-box">
        <p class="warning-text">
          <strong>Cuidado:</strong> Ao excluir, os alunos perderão acesso à missão e todo o progresso será apagado.
        </p>
      </div>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger">
          Manter missão
        </button>
        <button class="btn btn-danger">
          Confirmar exclusão
        </button>
      </div>
    </div>
  `
};

// Story: SimpleConfirmation
export const SimpleConfirmation = {
  render: () => `
    ${deleteGuideStyles}
    <div class="delete-guide-container">
      <svg width="80" height="80" viewBox="0 0 80 80" style="margin-bottom: 16px;">
        <circle cx="40" cy="40" r="35" fill="#FFEBEE"/>
        <path d="M 25 25 L 55 55 M 55 25 L 25 55" stroke="#EA5455" stroke-width="4" stroke-linecap="round"/>
      </svg>
      
      <h1 class="delete-title" style="font-size: 18px;">
        Excluir missão <span class="mission-name">"História do Brasil"</span>?
      </h1>
      
      <div class="actions-container">
        <button class="btn btn-outline-danger">
          Cancelar
        </button>
        <button class="btn btn-danger">
          Excluir
        </button>
      </div>
    </div>
  `
};

// Story: InModal
export const InModal = {
  render: () => `
    ${deleteGuideStyles}
    <style>
      .modal-overlay {
        background: rgba(0,0,0,0.5);
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .modal-content {
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        max-width: 550px;
        width: 100%;
        position: relative;
      }
      
      .modal-close {
        position: absolute;
        top: 16px;
        right: 16px;
        background: transparent;
        border: none;
        font-size: 24px;
        color: #6E6B7B;
        cursor: pointer;
        padding: 4px 8px;
        line-height: 1;
        transition: color 0.2s;
      }
      
      .modal-close:hover {
        color: #5D596C;
      }
    </style>
    
    <div class="modal-overlay" style="position: relative; height: 500px;">
      <div class="modal-content">
        <button class="modal-close">×</button>
        
        <div class="delete-guide-container">
          <svg width="100" height="100" viewBox="0 0 120 120" class="mascot-image">
            <circle cx="60" cy="60" r="50" fill="#FFE5CC"/>
            <circle cx="45" cy="55" r="5" fill="#5D596C"/>
            <circle cx="75" cy="55" r="5" fill="#5D596C"/>
            <path d="M 45 75 Q 60 85 75 75" stroke="#5D596C" stroke-width="3" fill="none" stroke-linecap="round"/>
            <text x="60" y="25" text-anchor="middle" font-size="40" fill="#EA5455">!</text>
          </svg>
          
          <h1 class="delete-title">
            Deseja excluir a missão <span class="mission-name">"Física Moderna"</span>?
          </h1>
          
          <div class="warning-box">
            <p class="warning-text">
              Esta ação é permanente e não pode ser revertida.
            </p>
          </div>
          
          <div class="actions-container">
            <button class="btn btn-outline-danger">
              Não, voltar
            </button>
            <button class="btn btn-danger">
              Sim, excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story: Responsive
export const Responsive = {
  render: () => `
    ${deleteGuideStyles}
    <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px; max-width: 700px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
        <i class="bi bi-phone"></i> DeleteGuide: Responsivo
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
        <li><strong>Buttons mobile:</strong> &lt;576px empilham verticalmente (flex-column)</li>
        <li><strong>Full-width buttons:</strong> Botões ocupam 100% width em mobile</li>
        <li><strong>Font ajustado:</strong> Título reduz de 20px → 18px em telas pequenas</li>
        <li><strong>Mascot responsivo:</strong> max-width: 200px adapta ao container</li>
      </ul>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 900px;">
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px; text-align: center;">
          Desktop
        </h4>
        <div class="delete-guide-container">
          <svg width="100" height="100" viewBox="0 0 120 120" class="mascot-image">
            <circle cx="60" cy="60" r="50" fill="#FFE5CC"/>
            <circle cx="45" cy="55" r="5" fill="#5D596C"/>
            <circle cx="75" cy="55" r="5" fill="#5D596C"/>
            <path d="M 45 75 Q 60 85 75 75" stroke="#5D596C" stroke-width="3" fill="none" stroke-linecap="round"/>
          </svg>
          
          <h1 class="delete-title" style="font-size: 18px;">
            Excluir missão <span class="mission-name">"Química"</span>?
          </h1>
          
          <div class="actions-container">
            <button class="btn btn-outline-danger">Não</button>
            <button class="btn btn-danger">Sim</button>
          </div>
        </div>
      </div>
      
      <div>
        <h4 style="font-size: 13px; font-weight: 600; color: #5D596C; margin-bottom: 12px; text-align: center;">
          Mobile (&lt;576px)
        </h4>
        <div style="max-width: 300px;">
          <div class="delete-guide-container">
            <svg width="80" height="80" viewBox="0 0 120 120" class="mascot-image">
              <circle cx="60" cy="60" r="50" fill="#FFE5CC"/>
              <circle cx="45" cy="55" r="5" fill="#5D596C"/>
              <circle cx="75" cy="55" r="5" fill="#5D596C"/>
              <path d="M 45 75 Q 60 85 75 75" stroke="#5D596C" stroke-width="3" fill="none" stroke-linecap="round"/>
            </svg>
            
            <h1 class="delete-title" style="font-size: 16px;">
              Excluir <span class="mission-name">"Química"</span>?
            </h1>
            
            <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
              <button class="btn btn-outline-danger" style="width: 100%; justify-content: center;">Não</button>
              <button class="btn btn-danger" style="width: 100%; justify-content: center;">Sim</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};


