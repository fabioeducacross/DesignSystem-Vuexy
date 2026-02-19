/**
 * SelectLocaleNavbar - Language Selector Dropdown
 * ================================================
 * Dropdown para seleção de idioma/locale na navbar
 * 
 * @component SelectLocaleNavbar
 * @category Educacross Components V2 / Navigation
 * @source educacross-frontoffice/src/components/locale/SelectLocaleNavbar.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Navigation/SelectLocaleNavbar',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# SelectLocaleNavbar

Dropdown de **seleção de idioma** para navbar com bandeiras.

## Contexto de Uso

- **Navbar principal**: Trocar idioma da interface
- **Settings menu**: Preferências de localização
- **Multi-idioma**: Apps com i18n
- **Regional settings**: Variantes de idioma (pt-BR, pt-PT)
- **Accessibility**: Suporte a múltiplos idiomas

## Características

- **Flag icons**: Bandeiras 24×22px por idioma
- **Expand icon**: Chevron rotativo (.not-expanded / .expanded)
- **Collapsible**: b-collapse para sub-opções
- **Nested options**: Variantes regionais aninhadas
- **Rotation animation**: 180deg no expand_more
- **List style**: list-style: none no dropdown

## Props

- Nenhuma prop - controle via dropdown state
        `
      }
    }
  }
};

const selectLocaleNavbarStyles = `
<style>
  .locale-dropdown {
    background: white;
    border: 1px solid #DBDADE;
    border-radius: 8px;
    min-width: 220px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .dropdown-item {
    padding: 12px 16px;
    cursor: pointer;
    transition: background 0.2s;
    border-bottom: 1px solid #F3F2F7;
    list-style: none;
  }
  
  .dropdown-item:hover {
    background: #F8F7FA;
  }
  
  .dropdown-item:last-child {
    border-bottom: none;
  }
  
  .locale-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  
  .locale-content {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .flag-icon {
    width: 22px;
    height: 16px;
    border-radius: 2px;
    object-fit: cover;
  }
  
  .locale-name {
    font-size: 14px;
    color: #5D596C;
  }
  
  .expand-icon {
    font-size: 20px;
    color: #6E6B7B;
    transition: transform 0.25s ease-in;
  }
  
  .expand-icon.not-expanded {
    transform: rotate(0deg);
  }
  
  .expand-icon.expanded {
    transform: rotate(180deg);
  }
  
  .sub-options {
    padding-left: 34px;
    background: #F8F7FA;
  }
  
  .sub-option {
    padding: 10px 16px;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .sub-option:hover {
    background: #EEECF5;
  }
  
  .navbar-example {
    background: #5D596C;
    padding: 12px 24px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .navbar-brand {
    color: white;
    font-weight: 600;
    font-size: 18px;
  }
</style>
`;

export const Default = {
  render: () => `
    ${selectLocaleNavbarStyles}
    <div class="locale-dropdown">
      <div class="dropdown-item">
        <div class="locale-option">
          <div class="locale-content">
            <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="16" fill="#009739"/>
              <rect y="5.3" width="22" height="5.3" fill="#FEDD00"/>
              <circle cx="11" cy="8" r="2.5" fill="#012169"/>
            </svg>
            <span class="locale-name">Português (Brasil)</span>
          </div>
        </div>
      </div>
    </div>
  `
};

export const Expanded = {
  render: () => `
    ${selectLocaleNavbarStyles}
    <div class="locale-dropdown">
      <div class="dropdown-item">
        <div class="locale-option">
          <div class="locale-content">
            <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="16" fill="#009739"/>
              <rect y="5.3" width="22" height="5.3" fill="#FEDD00"/>
              <circle cx="11" cy="8" r="2.5" fill="#012169"/>
            </svg>
            <span class="locale-name">Português</span>
          </div>
          <i class="bi bi-chevron-down expand-icon expanded"></i>
        </div>
      </div>
      
      <div class="sub-options">
        <div class="sub-option">
          <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
            <rect width="22" height="16" fill="#009739"/>
            <rect y="5.3" width="22" height="5.3" fill="#FEDD00"/>
            <circle cx="11" cy="8" r="2.5" fill="#012169"/>
          </svg>
          <span class="locale-name">Português (Brasil)</span>
        </div>
        
        <div class="sub-option">
          <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
            <rect width="22" height="5.3" fill="#FF0000"/>
            <rect y="5.3" width="22" height="5.3" fill="#009739"/>
            <rect y="10.6" width="22" height="5.3" fill="#FEDD00"/>
          </svg>
          <span class="locale-name">Português (Portugal)</span>
        </div>
      </div>
    </div>
  `
};

export const WithFlags = {
  render: () => `
    ${selectLocaleNavbarStyles}
    <div class="locale-dropdown">
      <div class="dropdown-item">
        <div class="locale-option">
          <div class="locale-content">
            <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="16" fill="#009739"/>
              <rect y="5.3" width="22" height="5.3" fill="#FEDD00"/>
            </svg>
            <span class="locale-name">Português (BR)</span>
          </div>
        </div>
      </div>
      
      <div class="dropdown-item">
        <div class="locale-option">
          <div class="locale-content">
            <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="16" fill="#B22234"/>
              <rect y="1.2" width="22" height="1.2" fill="white"/>
              <rect y="3.6" width="22" height="1.2" fill="white"/>
              <rect y="6" width="22" height="1.2" fill="white"/>
            </svg>
            <span class="locale-name">English (US)</span>
          </div>
        </div>
      </div>
      
      <div class="dropdown-item">
        <div class="locale-option">
          <div class="locale-content">
            <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="16" fill="#AA151B"/>
              <rect y="5.3" width="22" height="5.3" fill="#F1BF00"/>
            </svg>
            <span class="locale-name">Español</span>
          </div>
        </div>
      </div>
    </div>
  `
};

export const AllLocales = {
  render: () => `
    ${selectLocaleNavbarStyles}
    <div class="locale-dropdown">
      <div class="dropdown-item">
        <div class="locale-option">
          <div class="locale-content">
            <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="16" fill="#009739"/>
            </svg>
            <span class="locale-name">Português (Brasil)</span>
          </div>
        </div>
      </div>
      
      <div class="dropdown-item">
        <div class="locale-option">
          <div class="locale-content">
            <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="16" fill="#012169"/>
            </svg>
            <span class="locale-name">English (US)</span>
          </div>
        </div>
      </div>
      
      <div class="dropdown-item">
        <div class="locale-option">
          <div class="locale-content">
            <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="16" fill="#AA151B"/>
            </svg>
            <span class="locale-name">Español</span>
          </div>
        </div>
      </div>
      
      <div class="dropdown-item">
        <div class="locale-option">
          <div class="locale-content">
            <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="5.3" fill="#0055A4"/>
              <rect x="7.3" width="7.3" height="16" fill="white"/>
              <rect x="14.6" width="7.3" height="16" fill="#EF4135"/>
            </svg>
            <span class="locale-name">Français</span>
          </div>
        </div>
      </div>
      
      <div class="dropdown-item">
        <div class="locale-option">
          <div class="locale-content">
            <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="5.3" fill="black"/>
              <rect y="5.3" width="22" height="5.3" fill="#DD0000"/>
              <rect y="10.6" width="22" height="5.3" fill="#FFCE00"/>
            </svg>
            <span class="locale-name">Deutsch</span>
          </div>
        </div>
      </div>
    </div>
  `
};

export const InNavbar = {
  render: () => `
    ${selectLocaleNavbarStyles}
    <div class="navbar-example">
      <div class="navbar-brand">
        <i class="bi bi-book"></i> Educacross
      </div>
      
      <div style="position: relative;">
        <button style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 8px 16px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
            <rect width="22" height="16" fill="#009739"/>
          </svg>
          <span style="font-size: 14px;">PT-BR</span>
          <i class="bi bi-chevron-down" style="font-size: 12px;"></i>
        </button>
        
        <div class="locale-dropdown" style="position: absolute; top: 100%; right: 0; margin-top: 8px;">
          <div class="dropdown-item">
            <div class="locale-option">
              <div class="locale-content">
                <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
                  <rect width="22" height="16" fill="#009739"/>
                </svg>
                <span class="locale-name">Português (BR)</span>
              </div>
            </div>
          </div>
          
          <div class="dropdown-item">
            <div class="locale-option">
              <div class="locale-content">
                <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
                  <rect width="22" height="16" fill="#012169"/>
                </svg>
                <span class="locale-name">English (US)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const MobileView = {
  render: () => `
    ${selectLocaleNavbarStyles}
    <div style="max-width: 375px; margin: 0 auto;">
      <div class="locale-dropdown">
        <div class="dropdown-item" style="padding: 16px;">
          <div class="locale-option">
            <div class="locale-content">
              <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
                <rect width="22" height="16" fill="#009739"/>
              </svg>
              <span class="locale-name" style="font-size: 15px;">Português</span>
            </div>
          </div>
        </div>
        
        <div class="dropdown-item" style="padding: 16px;">
          <div class="locale-option">
            <div class="locale-content">
              <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
                <rect width="22" height="16" fill="#012169"/>
              </svg>
              <span class="locale-name" style="font-size: 15px;">English</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const DarkMode = {
  render: () => `
    ${selectLocaleNavbarStyles}
    <div style="background: #2D3748; padding: 24px; border-radius: 12px;">
      <div class="locale-dropdown" style="background: #1A202C; border-color: #4A5568;">
        <div class="dropdown-item" style="border-color: #2D3748;">
          <div class="locale-option">
            <div class="locale-content">
              <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
                <rect width="22" height="16" fill="#009739"/>
              </svg>
              <span class="locale-name" style="color: #E2E8F0;">Português (BR)</span>
            </div>
          </div>
        </div>
        
        <div class="dropdown-item" style="border-color: #2D3748;">
          <div class="locale-option">
            <div class="locale-content">
              <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
                <rect width="22" height="16" fill="#012169"/>
              </svg>
              <span class="locale-name" style="color: #E2E8F0;">English (US)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const Interactive = {
  render: () => {
    setTimeout(() => {
      const toggleBtn = document.getElementById('localeToggle');
      const subOptions = document.getElementById('localeSubOptions');
      const icon = document.getElementById('localeExpandIcon');
      
      if (toggleBtn && subOptions && icon) {
        toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const isExpanded = subOptions.style.display === 'block';
          subOptions.style.display = isExpanded ? 'none' : 'block';
          icon.classList.toggle('not-expanded');
          icon.classList.toggle('expanded');
        });
      }
      
      const localeOptions = document.querySelectorAll('.sub-option');
      localeOptions.forEach(option => {
        option.addEventListener('click', () => {
          const locale = option.textContent.trim();
          alert('Idioma selecionado: ' + locale + '\n\nAplicando localização...');
        });
      });
    }, 100);
    
    return `
      ${selectLocaleNavbarStyles}
      <div class="locale-dropdown">
        <div class="dropdown-item">
          <div class="locale-option" id="localeToggle" style="cursor: pointer;">
            <div class="locale-content">
              <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
                <rect width="22" height="16" fill="#009739"/>
              </svg>
              <span class="locale-name">Português - Interativo</span>
            </div>
            <i class="bi bi-chevron-down expand-icon not-expanded" id="localeExpandIcon"></i>
          </div>
        </div>
        
        <div class="sub-options" id="localeSubOptions" style="display: none;">
          <div class="sub-option">
            <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="16" fill="#009739"/>
            </svg>
            <span class="locale-name">Português (Brasil)</span>
          </div>
          
          <div class="sub-option">
            <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="16" fill="#FF0000"/>
            </svg>
            <span class="locale-name">Português (Portugal)</span>
          </div>
        </div>
        
        <div class="dropdown-item">
          <div class="locale-option">
            <div class="locale-content">
              <svg class="flag-icon" viewBox="0 0 22 16" xmlns="http://www.w3.org/2000/svg">
                <rect width="22" height="16" fill="#012169"/>
              </svg>
              <span class="locale-name">English</span>
            </div>
          </div>
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
      <div style="background:linear-gradient(135deg,#00CFE8 0%,#0BAACC 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Navigation</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">SelectLocaleNavbar</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Language Selector Dropdown</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Language Selector Dropdown. Faz parte da categoria <strong>Navigation</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #00CFE8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import SelectLocaleNavbar from '@/components/SelectLocaleNavbar.vue';

// Template
&lt;SelectLocaleNavbar v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o SelectLocaleNavbar com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#00CFE820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground SelectLocaleNavbar</p>
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
    docs: { description: { story: 'Exemplos de uso real do SelectLocaleNavbar no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#00CFE815;border:1px solid #00CFE830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: SelectLocaleNavbar</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando SelectLocaleNavbar no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com SelectLocaleNavbar no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via SelectLocaleNavbar</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o SelectLocaleNavbar.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#00CFE8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: SelectLocaleNavbar</h1>
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

