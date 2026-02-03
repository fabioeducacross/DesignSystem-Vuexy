/**
 * CopyLink - Link Copy Component with Clipboard
 * ==============================================
 * 
 * Modal for copying mission/guide links to clipboard.
 * Shows feedback on successful copy.
 * 
 * @component CopyLink
 * @source educacross-frontoffice\src\components\mission-plus\CopyLink.vue
 */

export default {
  title: 'Educacross Components V2/Mission/CopyLink',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# CopyLink

Modal para **copiar link** de missões/guias com feedback visual.

## Contexto de Uso

- **Compartilhar missão**: Professor compartilha link com alunos
- **Copiar link guia**: Distribuir guia de estudos
- **Deep links**: URLs específicas para recursos
- **Integração LMS**: Compartilhar em plataformas externas
- **WhatsApp/Email**: Copiar para colar em mensagens

## Características

- **Clipboard API**: navigator.clipboard.writeText()
- **Feedback visual**: Toast de sucesso "Link copiado!"
- **Input read-only**: Mostra URL completa
- **Icon button**: Botão com ícone de copiar
- **Modal centered**: Belinha mascote + título
- **Auto-close**: Fecha após 2s do copy

## Events

- **@close-copylink-modal**: Fecha o modal
        `
      }
    }
  }
};

const copyLinkStyles = `
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

export const Default = {
  render: () => `
    ${copyLinkStyles}
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
    ${copyLinkStyles}
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
    ${copyLinkStyles}
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
    ${copyLinkStyles}
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
    ${copyLinkStyles}
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
    ${copyLinkStyles}
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
    ${copyLinkStyles}
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


