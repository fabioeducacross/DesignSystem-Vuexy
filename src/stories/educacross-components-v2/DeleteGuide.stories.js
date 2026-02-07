import { 
  createDocPage, 
  createExampleCard, 
  createPropsTable, 
  createUsageSection 
} from '../_helpers/docTemplate.js';
import { getDeleteGuideMascot } from '../_helpers/mascots.js';

/**
 * DeleteGuide - Mission Deletion Confirmation Component
 * =========================================
 * 
 * Confirmation dialog for deleting missions with Belinha mascot guidance.
 * Includes loading states and destructive action patterns.
 * 
 * @component DeleteGuide
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\mission-plus\DeleteGuide.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Modals/DeleteGuide',
  parameters: {
    layout: 'fullscreen',
    docs: { page: null },
    options: { showPanel: false }
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

// Documentação principal
export const Documentation = {
  render: () => createDocPage({
    title: 'DeleteGuide',
    subtitle: 'Modal de confirmação para exclusão de missões com orientação da mascote Belinha',
    badge: 'Front-office / Modals',
    badgeIcon: 'delete_forever',
    showStats: true,
    stats: {
      'Tipo': 'Confirmation',
      'Ação': 'Destructive',
      'Loading': '✓'
    },
    colors: {
      primary: '#EA5455',
      secondary: '#f39c12'
    },
    content: `
      ${createUsageSection({
        title: 'Fluxo de Exclusão',
        icon: 'rule',
        steps: [
          'Professor clica "Excluir missão"',
          'Modal DeleteGuide aparece com Belinha',
          'Exibe nome da missão a ser excluída',
          'Professor pode "Não quero excluir" (cancela)',
          'Ou clica "Quero excluir" (confirma)',
          'Botão exibe loading durante processamento',
          'Modal fecha e missão é excluída'
        ]
      })}

      ${createExampleCard({
        title: 'Modal Padrão',
        description: 'Confirmação básica de exclusão com mascote Belinha',
        showTitle: true,
        wrapPreview: false,
        preview: `
          <style>
            .delete-guide-modal {
              background: white;
              border-radius: 12px;
              padding: 2rem;
              box-shadow: 0 10px 40px rgba(0,0,0,0.15);
              width: 400px;
              text-align: center;
              border: 1px solid #e5e3f3;
              max-width: calc(100vw - 2rem);
            }

            .mascot-belinha {
              width: 100px;
              height: 100px;
              margin: 0 auto 1.5rem auto;
              display: block;
            }

            .delete-title {
              font-size: 1.375rem;
              font-weight: 700;
              color: #2f2b3d;
              margin: 0 0 1.5rem 0;
              line-height: 1.3;
            }

            .delete-subtitle {
              font-size: 0.875rem;
              color: #6e6b7b;
              margin: 0 0 2rem 0;
              line-height: 1.4;
            }

            .delete-actions {
              display: flex;
              gap: 1rem;
              justify-content: center;
              flex-wrap: wrap;
            }

            .btn {
              padding: 0.75rem 1.5rem;
              border-radius: 8px;
              font-size: 0.875rem;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              border: 2px solid transparent;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 0.5rem;
              min-height: 44px;
              min-width: 140px;
              white-space: nowrap;
            }

            .btn-outline-danger {
              background: transparent;
              color: #EA5455;
              border-color: #EA5455;
            }

            .btn-outline-danger:hover:not(:disabled) {
              background: #EA5455;
              color: white;
              transform: translateY(-1px);
            }

            .btn-danger {
              background: #EA5455;
              color: white;
              border-color: #EA5455;
            }

            .btn-danger:hover:not(:disabled) {
              background: #d63384;
              border-color: #d63384;
              transform: translateY(-1px);
            }
          </style>
          <div style="display: flex; justify-content: center; padding: 2rem; background: rgba(0,0,0,0.5);">
            <div class="delete-guide-modal">
              <img src="/educacross-assets/belinha/belinha-school-enable-script.png" class="mascot-belinha" alt="Belinha - excluir missão" />
              
              <h3 class="delete-title">Deseja excluir a missão "Matemática Básica"?</h3>
              <p class="delete-subtitle">Esta ação não pode ser desfeita.</p>
              
              <div class="delete-actions">
                <button class="btn btn-outline-danger">Não quero excluir</button>
                <button class="btn btn-danger">Quero excluir</button>
              </div>
            </div>
          </div>
        `,
        codes: {
          html: `<!-- Modal DeleteGuide -->
<div class="delete-guide-modal">
  <div class="mascot-belinha">
    <!-- SVG Belinha preocupada -->
  </div>
  
  <h3>Deseja excluir a missão "{{missionName}}"?</h3>
  <p>Esta ação não pode ser desfeita.</p>
  
  <div class="delete-actions">
    <button class="btn btn-outline-danger" onclick="cancelDelete()">
      Não quero excluir
    </button>
    <button class="btn btn-danger" onclick="confirmDelete()">
      Quero excluir
    </button>
  </div>
</div>`,
          react: `import { useState } from 'react'

function DeleteGuideModal({ missionName, isOpen, onClose, onConfirm }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
      onClose()
    } catch (error) {
      console.error('Error deleting mission:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="delete-guide-modal">
        <BelinhaSvg className="mascot-belinha" />
        
        <h3 className="delete-title">
          Deseja excluir a missão "{missionName}"?
        </h3>
        <p className="delete-subtitle">
          Esta ação não pode ser desfeita.
        </p>
        
        <div className="delete-actions">
          <button 
            className="btn btn-outline-danger"
            onClick={onClose}
            disabled={isLoading}
          >
            Não quero excluir
          </button>
          <button 
            className={\`btn btn-danger \${isLoading ? 'btn-loading' : ''}\`}
            onClick={handleConfirm}
            disabled={isLoading}
          >
            Quero excluir
          </button>
        </div>
      </div>
    </div>
  )
}`,
          vue2: `<template>
  <b-modal
    v-model="visible"
    hide-header
    hide-footer
    centered
    size="md"
  >
    <div class="delete-guide-modal">
      <BelinhaSvg class="mascot-belinha" />
      
      <h3 class="delete-title">
        Deseja excluir a missão "{{ missionName }}"?
      </h3>
      <p class="delete-subtitle">
        Esta ação não pode ser desfeita.
      </p>
      
      <div class="delete-actions">
        <b-button
          variant="outline-danger"
          @click="$emit('close')"
          :disabled="isLoading"
        >
          Não quero excluir
        </b-button>
        <b-button
          variant="danger"
          @click="handleConfirm"
          :disabled="isLoading"
          :class="{ 'btn-loading': isLoading }"
        >
          Quero excluir
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    missionName: String
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    async handleConfirm() {
      this.isLoading = true
      try {
        await this.$emit('confirm')
        this.$emit('close')
      } catch (error) {
        console.error('Error:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>`
        }
      })}

      ${createPropsTable([
        {
          prop: 'visible',
          type: 'Boolean',
          default: 'false',
          description: 'Controla a visibilidade do modal'
        },
        {
          prop: 'missionName',
          type: 'String',
          default: '""',
          description: 'Nome da missão a ser excluída (exibido no título)'
        },
        {
          prop: 'studentsCount',
          type: 'Number',
          default: '0',
          description: 'Número de alunos impactados (exibe aviso se > 0)'
        },
        {
          prop: 'isLoading',
          type: 'Boolean',
          default: 'false',
          description: 'Estado de carregamento (desabilita botões e exibe spinner)'
        }
      ])}

      <div class="doc-section">
        <h3 class="doc-section-title">
          <span class="material-symbols-outlined">psychology</span>
          <span>Design Behavior</span>
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin: 1.5rem 0;">
          <div style="flex: 1; min-width: 240px; border: 1px solid #e5e3f3; padding: 1rem; border-radius: 8px; background: #fff3cd;">
            <h4 style="color: #856404; margin: 0 0 0.5rem 0;">Belinha Preocupada</h4>
            <p style="font-size: 0.875rem; color: #6e6b7b; margin: 0;">Mascote com expressão preocupada humaniza a seriedade da ação</p>
          </div>
          <div style="flex: 1; min-width: 240px; border: 1px solid #e5e3f3; padding: 1rem; border-radius: 8px; background: #ffe6e6;">
            <h4 style="color: #EA5455; margin: 0 0 0.5rem 0;">Ação Destrutiva</h4>
            <p style="font-size: 0.875rem; color: #6e6b7b; margin: 0;">Botão vermelho indica perigo, outline-danger para cancelar é menos proeminente</p>
          </div>
          <div style="flex: 1; min-width: 240px; border: 1px solid #e5e3f3; padding: 1rem; border-radius: 8px; background: #f0f9ff;">
            <h4 style="color: #0ea5e9; margin: 0 0 0.5rem 0;">Feedback Claro</h4>
            <p style="font-size: 0.875rem; color: #6e6b7b; margin: 0;">Loading spinner e texto "não pode ser desfeita" informam sobre a ação</p>
          </div>
        </div>
      </div>
    `
  })
};

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
      <img src="/educacross-assets/belinha/belinha-school-enable-script.png" class="mascot-image" alt="Belinha - excluir missão" />
      
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
      <img src="/educacross-assets/belinha/belinha-school-enable-script.png" class="mascot-image" alt="Belinha - excluir missão" />
      
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
      <img src="/educacross-assets/belinha/belinha-school-enable-script.png" class="mascot-image" alt="Belinha - excluir missão" />
      
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
      <img src="/educacross-assets/belinha/belinha-school-enable-script.png" class="mascot-image" alt="Belinha - excluir missão" />
      
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
      <img src="/educacross-assets/belinha/belinha-school-enable-script.png" class="mascot-image" alt="Belinha - excluir missão" />
      
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
          <img src="/educacross-assets/belinha/belinha-school-enable-script.png" class="mascot-image" alt="Belinha - excluir missão" />
          
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
          <img src="/educacross-assets/belinha/belinha-school-enable-script.png" class="mascot-image" alt="Belinha - excluir missão" />
          
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
            <img src="/educacross-assets/belinha/belinha-school-enable-script.png" class="mascot-image" alt="Belinha - excluir missão" />
            
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


