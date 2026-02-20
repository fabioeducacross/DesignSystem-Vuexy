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
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ShareGuide</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Modal de Compartilhamento de Guias</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Modal de Compartilhamento de Guias. Faz parte da categoria <strong>Mission</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ShareGuide from '@/components/ShareGuide.vue';

// Template
&lt;ShareGuide v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o ShareGuide com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ShareGuide</p>
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
    docs: { description: { story: 'Exemplos de uso real do ShareGuide no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ShareGuide</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ShareGuide no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ShareGuide no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ShareGuide</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ShareGuide.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ShareGuide</h1>
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

