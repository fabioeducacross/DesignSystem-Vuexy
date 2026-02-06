import { 
  createDocPage, 
  createExampleCard, 
  createPropsTable, 
  createUsageSection 
} from '../_helpers/docTemplate.js';
import { getCopyLinkMascot } from '../_helpers/mascots.js';

// Estilos específicos para o CopyLink modal
const copyLinkStyles = `
<style>
  .copy-link-modal {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    width: 380px;
    text-align: center;
    border: 1px solid #e5e3f3;
  }

  .mascot-image {
    width: 80px;
    height: 80px;
    margin: 0 auto 1rem auto;
    display: block;
  }

  .modal-title {
    font-size: 1.375rem;
    font-weight: 700;
    color: #2f2b3d;
    margin: 0 0 1.5rem 0;
    line-height: 1.2;
  }

  .link-container {
    display: flex;
    margin-bottom: 1rem;
    border-radius: 8px;
    border: 1px solid #d8d6de;
    overflow: hidden;
  }

  .link-input {
    flex: 1;
    border: none;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: #2f2b3d;
    background: #f8f7fa;
    font-family: 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;
    outline: none;
    line-height: 1.5;
  }

  .copy-button {
    width: 44px;
    height: 44px;
    border: none;
    background: #6e63e8;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .copy-button:hover {
    background: #5a52d5;
    transform: scale(1.05);
  }

  .copy-button:active {
    transform: scale(0.95);
  }

  .copy-button-success {
    background: #28c76f !important;
  }

  .copy-button .material-symbols-outlined {
    font-size: 20px;
    line-height: 1;
  }

  .help-text {
    font-size: 0.875rem;
    color: #6e6b7b;
    margin: 0;
    line-height: 1.4;
  }

  .toast-notification {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #28c76f;
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(40, 199, 111, 0.3);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    animation: slideInRight 0.3s ease-out;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .toast-notification .material-symbols-outlined {
    font-size: 18px;
  }

  /* Responsive adjustments */
  @media (max-width: 480px) {
    .copy-link-modal {
      width: 320px;
      padding: 1.5rem;
    }
    
    .modal-title {
      font-size: 1.25rem;
    }
    
    .mascot-image {
      width: 60px;
      height: 60px;
    }
  }
</style>
`;

/**
 * CopyLink - Link Copy Component with Clipboard
 * ==============================================
 * 
 * Modal for copying mission/guide links to clipboard.
 * Shows feedback on successful copy.
 */

export default {
  title: 'Front-office/Modals/CopyLink',
  parameters: {
    layout: 'fullscreen',
    previewTabs: {
      canvas: { hidden: true },
    },
    viewMode: 'docs',
    docs: {
      story: {
        inline: true,
        iframeHeight: 0,
      },
      canvas: {
        sourceState: 'none',
      },
    },
    controls: {
      disable: true,
    },
    actions: {
      disable: true,
    },
    toolbar: {
      zoom: { hidden: true },
      eject: { hidden: true },
      copy: { hidden: true },
    },
  }
};

// Existing styles for legacy stories
const legacyCopyLinkStyles = `
<style>
  .copy-link-modal {
    background: white;
    border-radius: 16px;
    padding: 32px;
    max-width: 500px;
    text-align: center;
  }
  
  .mascot-image {
    width: 120px;
    height: 120px;
    margin-bottom: 24px;
  }
  
  .modal-title {
    color: #5E5873;
    font-size: 24px;
    line-height: 29px;
    font-weight: 500;
    margin-bottom: 24px;
  }
  
  .copy-input-container {
    position: relative;
    margin-bottom: 24px;
  }
  
  .copy-input {
    width: 100%;
    padding: 12px 48px 12px 16px;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    font-size: 14px;
    color: #5D596C;
    background: #F8F7FA;
    pointer-events: none;
    cursor: default;
    text-overflow: ellipsis;
  }
  
  .copy-button {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: #6E63E8;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 12px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .copy-button:hover {
    background: #5951D4;
  }
  
  .copy-button:active {
    transform: translateY(-50%) scale(0.95);
  }
  
  .copy-button.copied {
    background: #28C76F;
  }
  
  .btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
  }
  
  .btn-primary {
    background: #6E63E8;
    color: white;
  }
  
  .btn-outline {
    background: transparent;
    color: #6E6B7B;
    border: 1px solid #DBDADE;
  }
  
  .success-toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #28C76F;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 8px;
    animation: slideIn 0.3s ease;
    z-index: 9999;
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
`;

// Documentação principal
export const Documentation = {
  render: () => createDocPage({
    title: 'CopyLink',
    subtitle: 'Modal para copiar links de missões/guias com feedback visual e integração de clipboard',
    badge: 'Front-office / Modals',
    badgeIcon: 'content_copy',
    showStats: true,
    stats: {
      'Tipo': 'Utility',
      'Links': 'Multi-format',
      'Feedback': '✓'
    },
    colors: {
      primary: '#6e63e8',
      secondary: '#FFE082'
    },
    content: `
      ${createUsageSection({
        title: 'Contexto de Uso',
        icon: 'share',
        steps: [
          'Professor acessa missão ou guia',
          'Clica em "Compartilhar link"',
          'Modal exibe URL completa',
          'Clica no botão copiar',
          'Recebe feedback "Link copiado!" via toast',
          'Pode colar em WhatsApp, email, LMS, etc.'
        ]
      })}

      \${createExampleCard({
        title: 'Modal Padrão',
        description: 'Link de missão com botão de copiar e mascote Belinha',
        showTitle: true,
        wrapPreview: false,
        preview: \`
          \${copyLinkStyles}
          <div style="display: flex; justify-content: center; padding: 2rem; background: rgba(0,0,0,0.5);">
            <div class="copy-link-modal">
              <img src="/educacross-assets/belinha/belinha-school-copy_link.png" class="mascot-image" alt="Belinha - copiar link" />
              
              <h3 class="modal-title">Compartilhar Link</h3>
              
              <div class="link-container">
                <input 
                  type="text" 
                  class="link-input" 
                  value="https://app.educacross.com.br/mission/abc123-def456" 
                  readonly
                />
                <button class="copy-button" title="Copiar link">
                  <i class="material-symbols-outlined">content_copy</i>
                </button>
              </div>
              
              <p class="help-text">
                Compartilhe este link com seus alunos para que eles acessem a missão diretamente.
              </p>
            </div>
          </div>
        \`,
        codes: {
          html: \`<!-- Modal CopyLink -->
<div class="copy-link-modal">
  <div class="mascot-image">
    <!-- SVG Belinha -->
  </div>
  
  <h3>Compartilhar Link</h3>
  
  <div class="link-container">
    <input type="text" value="https://..." readonly />
    <button class="copy-btn" onclick="copyToClipboard()">
      <i class="material-symbols-outlined">content_copy</i>
    </button>
  </div>
  
  <p class="help-text">
    Compartilhe este link com seus alunos.
  </p>
</div>

<script>
async function copyToClipboard() {
  const input = document.querySelector('.link-container input')
  try {
    await navigator.clipboard.writeText(input.value)
    showToast('Link copiado!')
  } catch (err) {
    // Fallback for older browsers
    input.select()
    document.execCommand('copy')
    showToast('Link copiado!')
  }
}
</script>\`,
          react: \`import { useState } from 'react'

function CopyLinkModal({ link, isOpen, onClose }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      // Show toast notification
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = link
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="copy-link-modal">
        <div className="mascot-image">
          <BelinhaSvg />
        </div>
        
        <h3>Compartilhar Link</h3>
        
        <div className="link-container">
          <input 
            type="text" 
            value={link} 
            readOnly 
            className="link-input"
          />
          <button 
            className="copy-button"
            onClick={copyToClipboard}
            title="Copiar link"
          >
            <span className="material-symbols-outlined">
              {copied ? 'check' : 'content_copy'}
            </span>
          </button>
        </div>
        
        <p className="help-text">
          Compartilhe este link com seus alunos para que acessem a missão.
        </p>
        
        {copied && (
          <div className="success-message">
            Link copiado com sucesso!
          </div>
        )}
      </div>
    </div>
  )
}\`,
          vue2: \`<template>
  <b-modal 
    v-model="visible"
    hide-header
    hide-footer
    centered
    size="md"
  >
    <div class="copy-link-modal">
      <div class="mascot-image">
        <BelinhaSvg />
      </div>
      
      <h3>Compartilhar Link</h3>
      
      <div class="link-container">
        <b-form-input 
          :value="link"
          readonly
          class="link-input"
        />
        <b-button
          @click="copyToClipboard"
          variant="primary"
          class="copy-button"
        >
          <i class="material-symbols-outlined">
            {{ copied ? 'check' : 'content_copy' }}
          </i>
        </b-button>
      </div>
      
      <p class="help-text">
        Compartilhe este link com seus alunos para que acessem a missão.
      </p>
      
      <b-toast
        v-model="showToast"
        title="Sucesso"
        variant="success"
        auto-hide-delay="3000"
      >
        Link copiado com sucesso!
      </b-toast>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    link: String
  },
  data() {
    return {
      copied: false,
      showToast: false
    }
  },
  methods: {
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.link)
        this.copied = true
        this.showToast = true
        setTimeout(() => { this.copied = false }, 2000)
      } catch (err) {
        // Fallback
        const textArea = document.createElement('textarea')
        textArea.value = this.link
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        this.copied = true
        this.showToast = true
        setTimeout(() => { this.copied = false }, 2000)
      }
    }
  }
}
</script>\`
        }
      })}

      \${createExampleCard({
        title: 'Com Toast de Sucesso',
        description: 'Feedback visual após copiar link com toast notification',
        showTitle: true,
        wrapPreview: false,
        preview: \`
          \${copyLinkStyles}
          <div style="display: flex; justify-content: center; padding: 2rem; background: rgba(0,0,0,0.5); position: relative;">
            <div class="copy-link-modal">
              <svg class="mascot-image" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="50" fill="#FFE082"/>
                <circle cx="45" cy="45" r="8" fill="#333"/>
                <circle cx="75" cy="45" r="8" fill="#333"/>
                <path d="M 40 70 Q 60 85 80 70" stroke="#333" stroke-width="3" fill="none"/>
              </svg>
              
              <h3 class="modal-title">Compartilhar Link</h3>
              
              <div class="link-container">
                <input 
                  type="text" 
                  class="link-input" 
                  value="https://app.educacross.com.br/guide/xyz789-abc123" 
                  readonly
                />
                <button class="copy-button copy-button-success" title="Copiado!">
                  <i class="material-symbols-outlined">check</i>
                </button>
              </div>
              
              <p class="help-text">
                Compartilhe este link do guia de estudos com seus alunos.
              </p>
            </div>
            
            <!-- Toast notification -->
            <div class="toast-notification">
              <i class="material-symbols-outlined">check_circle</i>
              <span>Link copiado com sucesso!</span>
            </div>
          </div>
        \`,
        codes: {
          html: \`<!-- Toast Success -->
<div class="toast show" role="alert">
  <div class="toast-header">
    <strong>Sucesso</strong>
  </div>
  <div class="toast-body">
    Link copiado com sucesso!
  </div>
</div>\`,
          react: \`{copied && (
  <div className="toast-notification">
    ✅ Link copiado!
  </div>
)}\`,
          vue2: \`<b-toast 
  v-model="showToast"
  title="Sucesso"
  variant="success"
>
  Link copiado!
</b-toast>\`
        }
      })}

      \${createExampleCard({
        title: 'Link com QR Code',
        description: 'Modal com QR Code adicional para compartilhamento mobile',
        showTitle: true,
        wrapPreview: false,
        preview: \`
          \${copyLinkStyles}
          <div style="display: flex; justify-content: center; padding: 2rem; background: rgba(0,0,0,0.5);">
            <div class="copy-link-modal" style="width: 400px;">
              <svg class="mascot-image" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="50" fill="#FFE082"/>
                <circle cx="45" cy="45" r="8" fill="#333"/>
                <circle cx="75" cy="45" r="8" fill="#333"/>
                <path d="M 40 70 Q 60 85 80 70" stroke="#333" stroke-width="3" fill="none"/>
              </svg>
              
              <h3 class="modal-title">Compartilhar Link</h3>
              
              <div class="link-container">
                <input 
                  type="text" 
                  class="link-input" 
                  value="https://app.educacross.com.br/mission/qr-abc123" 
                  readonly
                />
                <button class="copy-button" title="Copiar link">
                  <i class="material-symbols-outlined">content_copy</i>
                </button>
              </div>
              
              <div style="margin-top: 1rem; text-align: center;">
                <p style="margin-bottom: 0.5rem; font-size: 0.875rem; color: #6e6b7b;">Ou escaneie o QR Code:</p>
                <div style="width: 120px; height: 120px; margin: 0 auto; border: 2px solid #e5e3f3; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: #fff;">
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="white"/>
                    <!-- QR Code pattern -->
                    <rect x="10" y="10" width="20" height="20" fill="black"/>
                    <rect x="70" y="10" width="20" height="20" fill="black"/>
                    <rect x="10" y="70" width="20" height="20" fill="black"/>
                    <!-- More QR pattern squares... -->
                  </svg>
                </div>
              </div>
            </div>
          </div>
        \`,
        codes: {
          html: \`<div class="qr-section">
  <p>Ou escaneie o QR Code:</p>
  <div class="qr-code">
    <img src="/qr-code.png" alt="QR Code" />
  </div>
</div>\`,
          react: \`import QRCode from 'qrcode-generator'

function QRCodeSection({ link }) {
  const qr = QRCode(0, 'M')
  qr.addData(link)
  qr.make()
  
  return (
    <div className="qr-section">
      <p>Ou escaneie o QR Code:</p>
      <div 
        className="qr-code"
        dangerouslySetInnerHTML={{ __html: qr.createImgTag() }}
      />
    </div>
  )
}\`,
          vue2: \`<div class="qr-section">
  <p>Ou escaneie o QR Code:</p>
  <qrcode-vue 
    :value="link" 
    :size="120"
    level="M"
  />
</div>\`
        }
      })}

      ${createPropsTable([
        {
          prop: 'link',
          type: 'String',
          default: '""',
          description: 'URL completa a ser copiada para o clipboard'
        },
        {
          prop: 'visible',
          type: 'Boolean',
          default: 'false',
          description: 'Controla a visibilidade do modal'
        },
        {
          prop: 'type',
          type: 'String',
          default: '"mission"',
          description: 'Tipo do link: "mission", "guide", "activity" para personalizar título'
        },
        {
          prop: 'showQRCode',
          type: 'Boolean',
          default: 'false',
          description: 'Exibe QR Code adicional para compartilhamento mobile'
        }
      ])}

      <div class="doc-section">
        <h3 class="doc-section-title">
          <span class="material-symbols-outlined">share</span>
          <span>Casos de Uso</span>
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin: 1.5rem 0;">
          <div style="flex: 1; min-width: 240px; border: 1px solid #e5e3f3; padding: 1rem; border-radius: 8px; background: #f0f9ff;">
            <h4 style="color: #6e63e8; margin: 0 0 0.5rem 0;">Compartilhar Missão</h4>
            <p style="font-size: 0.875rem; color: #6e6b7b; margin: 0;">Professor compartilha link direto da missão com alunos</p>
          </div>
          <div style="flex: 1; min-width: 240px; border: 1px solid #e5e3f3; padding: 1rem; border-radius: 8px; background: #fff9f5;">
            <h4 style="color: #ff9f43; margin: 0 0 0.5rem 0;">Guia de Estudos</h4>
            <p style="font-size: 0.875rem; color: #6e6b7b; margin: 0;">Distribuir material de apoio via WhatsApp ou email</p>
          </div>
          <div style="flex: 1; min-width: 240px; border: 1px solid #e5e3f3; padding: 1rem; border-radius: 8px; background: #f0fdf4;">
            <h4 style="color: #28c76f; margin: 0 0 0.5rem 0;">Integração LMS</h4>
            <p style="font-size: 0.875rem; color: #6e6b7b; margin: 0;">Incorporar links em plataformas educacionais externas</p>
          </div>
        </div>
      </div>

      <div class="doc-section">
        <h3 class="doc-section-title">
          <span class="material-symbols-outlined">rule</span>
          <span>Funcionalidades</span>
        </h3>
        <ul style="margin: 1rem 0; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem;"><strong>Clipboard API:</strong> navigator.clipboard.writeText() com fallback para document.execCommand()</li>
          <li style="margin-bottom: 0.5rem;"><strong>Feedback visual:</strong> Ícone muda para check e toast de sucesso aparece</li>
          <li style="margin-bottom: 0.5rem;"><strong>URL completa:</strong> Input readonly mostra link completo e formatado</li>
          <li style="margin-bottom: 0.5rem;"><strong>Auto-close:</strong> Modal pode fechar automaticamente após cópia bem-sucedida</li>
          <li style="margin-bottom: 0.5rem;"><strong>Acessibilidade:</strong> Botão com título explicativo e aria-labels apropriados</li>
        </ul>
      </div>

      <div class="doc-section">
        <h3 class="doc-section-title">
          <span class="material-symbols-outlined">palette</span>
          <span>Especificações Visuais</span>
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin: 1.5rem 0;">
          <div style="flex: 1; min-width: 140px; border: 1px solid #e5e3f3; padding: 1rem; border-radius: 8px; background: #fbfaff;">
            <div style="font-size: 0.75rem; color: #6e6b7b; text-transform: uppercase; font-weight: 600; margin-bottom: 0.5rem;">Largura Modal</div>
            <div style="font-size: 1.25rem; font-weight: 700; color: #2f2b3d;">380px</div>
          </div>
          <div style="flex: 1; min-width: 140px; border: 1px solid #e5e3f3; padding: 1rem; border-radius: 8px; background: #fbfaff;">
            <div style="font-size: 0.75rem; color: #6e6b7b; text-transform: uppercase; font-weight: 600; margin-bottom: 0.5rem;">Mascote Belinha</div>
            <div style="font-size: 1.25rem; font-weight: 700; color: #2f2b3d;">80×80px</div>
          </div>
          <div style="flex: 1; min-width: 140px; border: 1px solid #e5e3f3; padding: 1rem; border-radius: 8px; background: #fbfaff;">
            <div style="font-size: 0.75rem; color: #6e6b7b; text-transform: uppercase; font-weight: 600; margin-bottom: 0.5rem;">Input Height</div>
            <div style="font-size: 1.25rem; font-weight: 700; color: #2f2b3d;">44px</div>
          </div>
          <div style="flex: 1; min-width: 140px; border: 1px solid #e5e3f3; padding: 1rem; border-radius: 8px; background: #fbfaff;">
            <div style="font-size: 0.75rem; color: #6e6b7b; text-transform: uppercase; font-weight: 600; margin-bottom: 0.5rem;">Botão Copy</div>
            <div style="font-size: 1.25rem; font-weight: 700; color: #2f2b3d;">44×44px</div>
          </div>
          <div style="flex: 1; min-width: 140px; border: 1px solid #FFE082; padding: 1rem; border-radius: 8px; background: #fffbf0;">
            <div style="font-size: 0.75rem; color: #ca8a04; text-transform: uppercase; font-weight: 600; margin-bottom: 0.5rem;">Cor Belinha</div>
            <div style="font-size: 1.25rem; font-weight: 700; color: #ca8a04;">#FFE082</div>
          </div>
          <div style="flex: 1; min-width: 140px; border: 1px solid #6e63e8; padding: 1rem; border-radius: 8px; background: #f8f7ff;">
            <div style="font-size: 0.75rem; color: #6e63e8; text-transform: uppercase; font-weight: 600; margin-bottom: 0.5rem;">Cor Primary</div>
            <div style="font-size: 1.25rem; font-weight: 700; color: #6e63e8;">#6e63e8</div>
          </div>
        </div>
      </div>
    `
  })
};

export const Default = {
  render: () => `
    ${legacyCopyLinkStyles}
    <div class="copy-link-modal">
      <svg class="mascot-image" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#FFE082"/>
        <circle cx="45" cy="55" r="5" fill="#5D596C"/>
        <circle cx="75" cy="55" r="5" fill="#5D596C"/>
        <path d="M 45 75 Q 60 85, 75 75" stroke="#5D596C" stroke-width="3" fill="none"/>
      </svg>
      
      <h1 class="modal-title">Copiar link da missão</h1>
      
      <div class="copy-input-container">
        <input 
          type="text" 
          class="copy-input" 
          value="https://educacross.com.br/missao/123456" 
          readonly 
        />
        <button class="copy-button" onclick="
          navigator.clipboard.writeText('https://educacross.com.br/missao/123456');
          this.classList.add('copied');
          this.innerHTML = '<i class=\\'bi bi-check-lg\\'></i>';
          setTimeout(() => {
            this.classList.remove('copied');
            this.innerHTML = '<i class=\\'bi bi-clipboard\\'></i>';
          }, 2000);
        ">
          <i class="bi bi-clipboard"></i>
        </button>
      </div>
      
      <button class="btn btn-primary" style="width: 233px;">Fechar</button>
    </div>
  `
};

export const WithToast = {
  render: () => `
    ${legacyCopyLinkStyles}
    <div class="copy-link-modal">
      <svg class="mascot-image" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#FFE082"/>
        <circle cx="45" cy="55" r="5" fill="#5D596C"/>
        <circle cx="75" cy="55" r="5" fill="#5D596C"/>
        <path d="M 45 75 Q 60 85, 75 75" stroke="#5D596C" stroke-width="3" fill="none"/>
      </svg>
      
      <h1 class="modal-title">Copiar link da missão</h1>
      
      <div class="copy-input-container">
        <input 
          type="text" 
          class="copy-input" 
          value="https://educacross.com.br/missao/matematica-equacoes" 
          readonly 
        />
        <button class="copy-button" id="copyBtnWithToast">
          <i class="bi bi-clipboard"></i>
        </button>
      </div>
      
      <button class="btn btn-primary" style="width: 233px;">Fechar</button>
    </div>
    
    <script>
      document.getElementById('copyBtnWithToast').addEventListener('click', function() {
        const url = 'https://educacross.com.br/missao/matematica-equacoes';
        navigator.clipboard.writeText(url);
        
        this.classList.add('copied');
        this.innerHTML = '<i class="bi bi-check-lg"></i>';
        
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.innerHTML = '<i class="bi bi-check-circle-fill"></i> Link copiado!';
        document.body.appendChild(toast);
        
        setTimeout(() => {
          toast.remove();
          this.classList.remove('copied');
          this.innerHTML = '<i class="bi bi-clipboard"></i>';
        }, 2000);
      });
    </script>
  `
};

export const GuideLink = {
  render: () => `
    ${legacyCopyLinkStyles}
    <div class="copy-link-modal">
      <svg class="mascot-image" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#A5D6A7"/>
        <circle cx="45" cy="55" r="5" fill="#2E7D32"/>
        <circle cx="75" cy="55" r="5" fill="#2E7D32"/>
        <path d="M 45 70 Q 60 80, 75 70" stroke="#2E7D32" stroke-width="3" fill="none"/>
      </svg>
      
      <h1 class="modal-title">Copiar link do guia</h1>
      
      <p style="color: #6E6B7B; font-size: 14px; margin-bottom: 24px;">
        Compartilhe este guia de estudos com seus alunos
      </p>
      
      <div class="copy-input-container">
        <input 
          type="text" 
          class="copy-input" 
          value="https://educacross.com.br/guia/portugues-verbos" 
          readonly 
        />
        <button class="copy-button">
          <i class="bi bi-clipboard"></i>
        </button>
      </div>
      
      <div style="display: flex; gap: 12px; justify-content: center;">
        <button class="btn btn-outline">Cancelar</button>
        <button class="btn btn-primary">Fechar</button>
      </div>
    </div>
  `
};

export const ShortLink = {
  render: () => `
    ${legacyCopyLinkStyles}
    <div class="copy-link-modal">
      <svg class="mascot-image" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#FFE082"/>
        <circle cx="45" cy="55" r="5" fill="#5D596C"/>
        <circle cx="75" cy="55" r="5" fill="#5D596C"/>
        <path d="M 45 75 Q 60 85, 75 75" stroke="#5D596C" stroke-width="3" fill="none"/>
      </svg>
      
      <h1 class="modal-title">Link curto gerado</h1>
      
      <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 12px; border-radius: 6px; margin-bottom: 16px; text-align: left;">
        <p style="margin: 0; font-size: 13px; color: #1565C0;">
          <i class="bi bi-info-circle"></i> Link curto facilita o compartilhamento
        </p>
      </div>
      
      <div class="copy-input-container">
        <input 
          type="text" 
          class="copy-input" 
          value="https://educ.rs/m/abc123" 
          readonly 
        />
        <button class="copy-button">
          <i class="bi bi-clipboard"></i>
        </button>
      </div>
      
      <button class="btn btn-primary" style="width: 233px;">Fechar</button>
    </div>
  `
};

export const WithQRCode = {
  render: () => `
    ${legacyCopyLinkStyles}
    <div class="copy-link-modal">
      <h1 class="modal-title" style="margin-bottom: 16px;">Compartilhar missão</h1>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
        <div>
          <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: #5D596C;">Link direto</h3>
          <div class="copy-input-container">
            <input 
              type="text" 
              class="copy-input" 
              value="https://educacross.com.br/m/xyz789" 
              readonly 
            />
            <button class="copy-button">
              <i class="bi bi-clipboard"></i>
            </button>
          </div>
        </div>
        
        <div>
          <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: #5D596C;">QR Code</h3>
          <div style="width: 120px; height: 120px; background: white; border: 2px solid #E0E0E0; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <rect width="100" height="100" fill="white"/>
              <rect x="10" y="10" width="15" height="15" fill="black"/>
              <rect x="75" y="10" width="15" height="15" fill="black"/>
              <rect x="10" y="75" width="15" height="15" fill="black"/>
              <rect x="40" y="40" width="20" height="20" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
      
      <button class="btn btn-primary" style="width: 100%;">Fechar</button>
    </div>
  `
};

export const MobileView = {
  render: () => `
    ${legacyCopyLinkStyles}
    <div style="max-width: 375px; margin: 0 auto;">
      <div class="copy-link-modal" style="padding: 24px;">
        <svg class="mascot-image" style="width: 80px; height: 80px; margin-bottom: 16px;" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" fill="#FFE082"/>
          <circle cx="45" cy="55" r="5" fill="#5D596C"/>
          <circle cx="75" cy="55" r="5" fill="#5D596C"/>
          <path d="M 45 75 Q 60 85, 75 75" stroke="#5D596C" stroke-width="3" fill="none"/>
        </svg>
        
        <h1 class="modal-title" style="font-size: 20px; margin-bottom: 16px;">Copiar link</h1>
        
        <div class="copy-input-container">
          <input 
            type="text" 
            class="copy-input" 
            style="font-size: 12px; padding-right: 48px;"
            value="https://educacross.com.br/missao/123" 
            readonly 
          />
          <button class="copy-button">
            <i class="bi bi-clipboard"></i>
          </button>
        </div>
        
        <button class="btn btn-primary" style="width: 100%;">Fechar</button>
      </div>
    </div>
  `
};

export const MultipleLinks = {
  render: () => `
    ${legacyCopyLinkStyles}
    <div class="copy-link-modal" style="max-width: 600px;">
      <h1 class="modal-title">Compartilhar recursos</h1>
      
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
        <div>
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #5D596C; text-align: left;">
            Link da missão
          </label>
          <div class="copy-input-container">
            <input 
              type="text" 
              class="copy-input" 
              value="https://educacross.com.br/missao/matematica-fracoes" 
              readonly 
            />
            <button class="copy-button">
              <i class="bi bi-clipboard"></i>
            </button>
          </div>
        </div>
        
        <div>
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #5D596C; text-align: left;">
            Link do vídeo complementar
          </label>
          <div class="copy-input-container">
            <input 
              type="text" 
              class="copy-input" 
              value="https://educacross.com.br/video/fracoes-intro" 
              readonly 
            />
            <button class="copy-button">
              <i class="bi bi-clipboard"></i>
            </button>
          </div>
        </div>
        
        <div>
          <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #5D596C; text-align: left;">
            Link do exercício extra
          </label>
          <div class="copy-input-container">
            <input 
              type="text" 
              class="copy-input" 
              value="https://educacross.com.br/exercicio/fracoes-pratica" 
              readonly 
            />
            <button class="copy-button">
              <i class="bi bi-clipboard"></i>
            </button>
          </div>
        </div>
      </div>
      
      <button class="btn btn-primary" style="width: 100%;">Fechar</button>
    </div>
  `
};

export const Interactive = {
  render: () => {
    setTimeout(() => {
      const copyBtn = document.getElementById('interactiveCopy');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          const input = document.getElementById('interactiveInput');
          navigator.clipboard.writeText(input.value);
          
          copyBtn.classList.add('copied');
          copyBtn.innerHTML = '<i class="bi bi-check-lg"></i> Copiado';
          
          const toast = document.createElement('div');
          toast.className = 'success-toast';
          toast.innerHTML = '<i class="bi bi-check-circle-fill"></i> Link copiado com sucesso!';
          document.body.appendChild(toast);
          
          setTimeout(() => {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
            copyBtn.classList.remove('copied');
            copyBtn.innerHTML = '<i class="bi bi-clipboard"></i>';
          }, 2000);
        });
      }
    }, 100);
    
    return `
      ${copyLinkStyles}
      <div class="copy-link-modal">
        <svg class="mascot-image" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="60" cy="60" r="50" fill="#FFE082"/>
          <circle cx="45" cy="55" r="5" fill="#5D596C"/>
          <circle cx="75" cy="55" r="5" fill="#5D596C"/>
          <path d="M 45 75 Q 60 85, 75 75" stroke="#5D596C" stroke-width="3" fill="none"/>
        </svg>
        
        <h1 class="modal-title">Copiar link - Interativo</h1>
        
        <p style="color: #6E6B7B; font-size: 14px; margin-bottom: 16px;">
          Clique no botão para copiar o link e ver o feedback
        </p>
        
        <div class="copy-input-container">
          <input 
            type="text" 
            class="copy-input" 
            id="interactiveInput"
            value="https://educacross.com.br/missao/interativa-123" 
            readonly 
          />
          <button class="copy-button" id="interactiveCopy">
            <i class="bi bi-clipboard"></i>
          </button>
        </div>
        
        <button class="btn btn-primary" style="width: 233px;">Fechar</button>
      </div>
    `;
  }
};


