/**
 * ShareGuide - Modal de Compartilhamento de Guias
 * ================================================
 * Modal para compartilhar guias via link, cópia ou download
 * 
 * @component ShareGuide
 * @category Educacross Components V2 / Modals
 * @source educacross-frontoffice/src/components/mission-plus/ShareGuide.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Mission/ShareGuide',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# ShareGuide

Modal para **compartilhar guias** com múltiplas opções de distribuição.

## Contexto de Uso

- **Compartilhar guia**: Professor distribui material de estudo
- **Opções múltiplas**: Link, copiar, download PDF
- **Seleção de turmas**: Compartilhar com turmas específicas
- **WhatsApp/Email**: Integração com apps externos
- **Biblioteca**: Adicionar à biblioteca do aluno

## Características

- **Radio options**: Escolher método de compartilhamento
- **Spinner loading**: Indica processamento
- **Belinha mascote**: Imagem institucional
- **Success feedback**: Confirmação de compartilhamento
- **Disabled states**: Botões desabilitados até seleção

## Events

- **@close**: Fecha modal sem ação
- **@close-and-update**: Fecha e atualiza lista
        `
      }
    }
  }
};

const shareGuideStyles = `
<style>
  .share-guide-modal {
    background: white;
    border-radius: 16px;
    padding: 40px;
    max-width: 600px;
    text-align: center;
  }
  
  .mascot-img {
    width: 140px;
    height: 140px;
    margin-bottom: 24px;
  }
  
  .modal-title {
    font-size: 24px;
    font-weight: 600;
    color: #5D596C;
    margin-bottom: 16px;
  }
  
  .modal-subtitle {
    font-size: 16px;
    color: #6E6B7B;
    margin-bottom: 32px;
  }
  
  .share-options {
    text-align: left;
    margin-bottom: 32px;
  }
  
  .radio-option {
    display: flex;
    align-items: center;
    padding: 16px;
    border: 2px solid #E0E0E0;
    border-radius: 12px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .radio-option:hover {
    background: #F8F7FA;
    border-color: #6E63E8;
  }
  
  .radio-option.selected {
    background: rgba(110, 99, 232, 0.08);
    border-color: #6E63E8;
  }
  
  .radio-option input[type="radio"] {
    width: 20px;
    height: 20px;
    margin-right: 16px;
    cursor: pointer;
    accent-color: #6E63E8;
  }
  
  .option-content {
    flex: 1;
  }
  
  .option-title {
    font-size: 15px;
    font-weight: 600;
    color: #5D596C;
    margin-bottom: 4px;
  }
  
  .option-description {
    font-size: 13px;
    color: #6E6B7B;
  }
  
  .option-icon {
    font-size: 24px;
    color: #6E63E8;
    margin-left: 12px;
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
    opacity: 0.5;
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
    ${shareGuideStyles}
    <div class="share-guide-modal">
      <svg class="mascot-img" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="60" fill="#A5D6A7"/>
        <circle cx="55" cy="65" r="6" fill="#2E7D32"/>
        <circle cx="85" cy="65" r="6" fill="#2E7D32"/>
        <path d="M 50 85 Q 70 100, 90 85" stroke="#2E7D32" stroke-width="4" fill="none"/>
        <path d="M 50 50 Q 55 45, 60 50" stroke="#2E7D32" stroke-width="3" fill="none"/>
        <path d="M 80 50 Q 85 45, 90 50" stroke="#2E7D32" stroke-width="3" fill="none"/>
      </svg>
      
      <h1 class="modal-title">Compartilhar a missão "Equações do 1º Grau"</h1>
      <p class="modal-subtitle">Selecione como você deseja compartilhar essa missão:</p>
      
      <div class="share-options">
        <label class="radio-option selected">
          <input type="radio" name="share-method" value="link" checked />
          <div class="option-content">
            <div class="option-title">Copiar link</div>
            <div class="option-description">Compartilhe o link direto da missão</div>
          </div>
          <i class="bi bi-link-45deg option-icon"></i>
        </label>
        
        <label class="radio-option">
          <input type="radio" name="share-method" value="whatsapp" />
          <div class="option-content">
            <div class="option-title">WhatsApp</div>
            <div class="option-description">Enviar link via WhatsApp</div>
          </div>
          <i class="bi bi-whatsapp option-icon"></i>
        </label>
        
        <label class="radio-option">
          <input type="radio" name="share-method" value="email" />
          <div class="option-content">
            <div class="option-title">E-mail</div>
            <div class="option-description">Enviar convite por e-mail</div>
          </div>
          <i class="bi bi-envelope option-icon"></i>
        </label>
      </div>
      
      <div class="action-buttons">
        <button class="btn btn-outline">Cancelar</button>
        <button class="btn btn-primary">
          Compartilhar
        </button>
      </div>
    </div>
  `
};

export const WithLoading = {
  render: () => `
    ${shareGuideStyles}
    <div class="share-guide-modal">
      <svg class="mascot-img" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="60" fill="#A5D6A7"/>
        <circle cx="55" cy="65" r="6" fill="#2E7D32"/>
        <circle cx="85" cy="65" r="6" fill="#2E7D32"/>
        <path d="M 50 85 Q 70 100, 90 85" stroke="#2E7D32" stroke-width="4" fill="none"/>
      </svg>
      
      <h1 class="modal-title">Compartilhar guia "Verbos Irregulares"</h1>
      <p class="modal-subtitle">Selecione como você deseja compartilhar:</p>
      
      <div class="share-options">
        <label class="radio-option selected">
          <input type="radio" name="share-method" checked />
          <div class="option-content">
            <div class="option-title">Adicionar à biblioteca do aluno</div>
            <div class="option-description">Guia aparecerá na biblioteca pessoal</div>
          </div>
          <i class="bi bi-book option-icon"></i>
        </label>
      </div>
      
      <div class="action-buttons">
        <button class="btn btn-outline" disabled>Cancelar</button>
        <button class="btn btn-primary" disabled>
          Compartilhando
          <div class="spinner"></div>
        </button>
      </div>
    </div>
  `
};

export const WithClasses = {
  render: () => `
    ${shareGuideStyles}
    <style>
      .class-checkbox {
        display: flex;
        align-items: center;
        padding: 12px;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        margin-bottom: 8px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .class-checkbox:hover {
        background: #F8F7FA;
      }
      .class-checkbox input {
        margin-right: 12px;
        width: 18px;
        height: 18px;
        accent-color: #6E63E8;
      }
    </style>
    <div class="share-guide-modal" style="max-width: 650px;">
      <svg class="mascot-img" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="60" fill="#A5D6A7"/>
        <circle cx="55" cy="65" r="6" fill="#2E7D32"/>
        <circle cx="85" cy="65" r="6" fill="#2E7D32"/>
        <path d="M 50 85 Q 70 100, 90 85" stroke="#2E7D32" stroke-width="4" fill="none"/>
      </svg>
      
      <h1 class="modal-title">Compartilhar com turmas</h1>
      <p class="modal-subtitle">Selecione as turmas que receberão o guia:</p>
      
      <div style="text-align: left; margin-bottom: 24px;">
        <label class="class-checkbox">
          <input type="checkbox" checked />
          <div>
            <div style="font-weight: 600; color: #5D596C;">7º A - Matemática</div>
            <div style="font-size: 13px; color: #6E6B7B;">28 alunos</div>
          </div>
        </label>
        
        <label class="class-checkbox">
          <input type="checkbox" checked />
          <div>
            <div style="font-weight: 600; color: #5D596C;">7º B - Matemática</div>
            <div style="font-size: 13px; color: #6E6B7B;">30 alunos</div>
          </div>
        </label>
        
        <label class="class-checkbox">
          <input type="checkbox" />
          <div>
            <div style="font-weight: 600; color: #5D596C;">8º A - Matemática</div>
            <div style="font-size: 13px; color: #6E6B7B;">25 alunos</div>
          </div>
        </label>
      </div>
      
      <div class="action-buttons">
        <button class="btn btn-outline">Cancelar</button>
        <button class="btn btn-primary">
          Compartilhar com 2 turmas (58 alunos)
        </button>
      </div>
    </div>
  `
};

export const DownloadOption = {
  render: () => `
    ${shareGuideStyles}
    <div class="share-guide-modal">
      <svg class="mascot-img" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="60" fill="#BBDEFB"/>
        <circle cx="55" cy="65" r="6" fill="#1565C0"/>
        <circle cx="85" cy="65" r="6" fill="#1565C0"/>
        <path d="M 50 85 Q 70 95, 90 85" stroke="#1565C0" stroke-width="4" fill="none"/>
      </svg>
      
      <h1 class="modal-title">Compartilhar guia de estudos</h1>
      <p class="modal-subtitle">Escolha o formato de compartilhamento:</p>
      
      <div class="share-options">
        <label class="radio-option">
          <input type="radio" name="format" />
          <div class="option-content">
            <div class="option-title">Link online</div>
            <div class="option-description">Acesso pelo navegador</div>
          </div>
          <i class="bi bi-globe option-icon"></i>
        </label>
        
        <label class="radio-option selected">
          <input type="radio" name="format" checked />
          <div class="option-content">
            <div class="option-title">Download PDF</div>
            <div class="option-description">Baixar arquivo para impressão</div>
          </div>
          <i class="bi bi-file-earmark-pdf option-icon"></i>
        </label>
        
        <label class="radio-option">
          <input type="radio" name="format" />
          <div class="option-content">
            <div class="option-title">Apresentação</div>
            <div class="option-description">Modo apresentação em tela cheia</div>
          </div>
          <i class="bi bi-easel option-icon"></i>
        </label>
      </div>
      
      <div class="action-buttons">
        <button class="btn btn-outline">Cancelar</button>
        <button class="btn btn-primary">
          <i class="bi bi-download"></i>
          Baixar PDF
        </button>
      </div>
    </div>
  `
};

export const SocialMedia = {
  render: () => `
    ${shareGuideStyles}
    <div class="share-guide-modal">
      <svg class="mascot-img" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="60" fill="#FFE082"/>
        <circle cx="55" cy="65" r="6" fill="#F57C00"/>
        <circle cx="85" cy="65" r="6" fill="#F57C00"/>
        <path d="M 50 85 Q 70 100, 90 85" stroke="#F57C00" stroke-width="4" fill="none"/>
      </svg>
      
      <h1 class="modal-title">Compartilhar nas redes sociais</h1>
      <p class="modal-subtitle">Divulgue seu conteúdo educacional:</p>
      
      <div class="share-options">
        <label class="radio-option">
          <input type="radio" name="social" />
          <div class="option-content">
            <div class="option-title">WhatsApp</div>
            <div class="option-description">Compartilhar em grupos ou contatos</div>
          </div>
          <i class="bi bi-whatsapp option-icon" style="color: #25D366;"></i>
        </label>
        
        <label class="radio-option">
          <input type="radio" name="social" />
          <div class="option-content">
            <div class="option-title">Facebook</div>
            <div class="option-description">Publicar no feed ou grupos</div>
          </div>
          <i class="bi bi-facebook option-icon" style="color: #1877F2;"></i>
        </label>
        
        <label class="radio-option">
          <input type="radio" name="social" />
          <div class="option-content">
            <div class="option-title">Twitter / X</div>
            <div class="option-description">Tweet com link do guia</div>
          </div>
          <i class="bi bi-twitter-x option-icon" style="color: #000000;"></i>
        </label>
        
        <label class="radio-option selected">
          <input type="radio" name="social" checked />
          <div class="option-content">
            <div class="option-title">Copiar link</div>
            <div class="option-description">Compartilhar em qualquer lugar</div>
          </div>
          <i class="bi bi-link-45deg option-icon"></i>
        </label>
      </div>
      
      <div class="action-buttons">
        <button class="btn btn-outline">Cancelar</button>
        <button class="btn btn-primary">Copiar link</button>
      </div>
    </div>
  `
};

export const SuccessState = {
  render: () => `
    ${shareGuideStyles}
    <div class="share-guide-modal">
      <svg class="mascot-img" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        <circle cx="70" cy="70" r="60" fill="#A5D6A7"/>
        <circle cx="55" cy="65" r="6" fill="#2E7D32"/>
        <circle cx="85" cy="65" r="6" fill="#2E7D32"/>
        <path d="M 50 85 Q 70 100, 90 85" stroke="#2E7D32" stroke-width="4" fill="none"/>
        <circle cx="95" cy="35" r="15" fill="#28C76F"/>
        <path d="M 88 35 L 93 40 L 102 31" stroke="white" stroke-width="3" fill="none"/>
      </svg>
      
      <h1 class="modal-title" style="color: #28C76F;">Guia compartilhado com sucesso!</h1>
      <p class="modal-subtitle">O guia foi enviado para 2 turmas (58 alunos)</p>
      
      <div style="background: #E8F5E9; border: 1px solid #A5D6A7; border-radius: 12px; padding: 20px; margin-bottom: 24px; text-align: left;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <i class="bi bi-check-circle-fill" style="color: #28C76F; font-size: 24px;"></i>
          <div style="font-weight: 600; color: #2E7D32;">Compartilhamento concluído</div>
        </div>
        <ul style="margin: 0; padding-left: 40px; color: #2E7D32; font-size: 14px;">
          <li>7º A - Matemática (28 alunos)</li>
          <li>7º B - Matemática (30 alunos)</li>
        </ul>
      </div>
      
      <div class="action-buttons">
        <button class="btn btn-outline">Compartilhar mais turmas</button>
        <button class="btn btn-primary">Fechar</button>
      </div>
    </div>
  `
};

export const MobileView = {
  render: () => `
    ${shareGuideStyles}
    <div style="max-width: 375px; margin: 0 auto;">
      <div class="share-guide-modal" style="padding: 24px;">
        <svg class="mascot-img" style="width: 100px; height: 100px; margin-bottom: 16px;" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
          <circle cx="70" cy="70" r="60" fill="#A5D6A7"/>
          <circle cx="55" cy="65" r="6" fill="#2E7D32"/>
          <circle cx="85" cy="65" r="6" fill="#2E7D32"/>
          <path d="M 50 85 Q 70 100, 90 85" stroke="#2E7D32" stroke-width="4" fill="none"/>
        </svg>
        
        <h1 class="modal-title" style="font-size: 20px; margin-bottom: 12px;">Compartilhar guia</h1>
        <p class="modal-subtitle" style="font-size: 14px; margin-bottom: 24px;">Escolha uma opção:</p>
        
        <div class="share-options">
          <label class="radio-option selected" style="padding: 12px;">
            <input type="radio" name="share" checked />
            <div class="option-content">
              <div class="option-title" style="font-size: 14px;">Copiar link</div>
            </div>
            <i class="bi bi-link-45deg option-icon" style="font-size: 20px;"></i>
          </label>
          
          <label class="radio-option" style="padding: 12px;">
            <input type="radio" name="share" />
            <div class="option-content">
              <div class="option-title" style="font-size: 14px;">WhatsApp</div>
            </div>
            <i class="bi bi-whatsapp option-icon" style="font-size: 20px;"></i>
          </label>
        </div>
        
        <div class="action-buttons" style="flex-direction: column; width: 100%;">
          <button class="btn btn-primary" style="width: 100%; justify-content: center;">Compartilhar</button>
          <button class="btn btn-outline" style="width: 100%; justify-content: center;">Cancelar</button>
        </div>
      </div>
    </div>
  `
};

export const Interactive = {
  render: () => {
    setTimeout(() => {
      const options = document.querySelectorAll('.radio-option');
      options.forEach(option => {
        option.addEventListener('click', () => {
          options.forEach(opt => opt.classList.remove('selected'));
          option.classList.add('selected');
          option.querySelector('input').checked = true;
        });
      });
      
      const shareBtn = document.getElementById('interactiveShareBtn');
      if (shareBtn) {
        shareBtn.addEventListener('click', () => {
          shareBtn.disabled = true;
          shareBtn.innerHTML = 'Compartilhando <div class="spinner"></div>';
          
          setTimeout(() => {
            shareBtn.innerHTML = '<i class="bi bi-check-lg"></i> Compartilhado!';
            shareBtn.style.background = '#28C76F';
          }, 1500);
        });
      }
    }, 100);
    
    return `
      ${shareGuideStyles}
      <div class="share-guide-modal">
        <svg class="mascot-img" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
          <circle cx="70" cy="70" r="60" fill="#A5D6A7"/>
          <circle cx="55" cy="65" r="6" fill="#2E7D32"/>
          <circle cx="85" cy="65" r="6" fill="#2E7D32"/>
          <path d="M 50 85 Q 70 100, 90 85" stroke="#2E7D32" stroke-width="4" fill="none"/>
        </svg>
        
        <h1 class="modal-title">Compartilhar - Interativo</h1>
        <p class="modal-subtitle">Clique nas opções e no botão para testar:</p>
        
        <div class="share-options">
          <label class="radio-option selected">
            <input type="radio" name="interactive-share" checked />
            <div class="option-content">
              <div class="option-title">Copiar link</div>
              <div class="option-description">Link direto</div>
            </div>
            <i class="bi bi-link-45deg option-icon"></i>
          </label>
          
          <label class="radio-option">
            <input type="radio" name="interactive-share" />
            <div class="option-content">
              <div class="option-title">WhatsApp</div>
              <div class="option-description">Enviar mensagem</div>
            </div>
            <i class="bi bi-whatsapp option-icon"></i>
          </label>
        </div>
        
        <div class="action-buttons">
          <button class="btn btn-outline">Cancelar</button>
          <button class="btn btn-primary" id="interactiveShareBtn">Compartilhar</button>
        </div>
      </div>
    `;
  }
};
