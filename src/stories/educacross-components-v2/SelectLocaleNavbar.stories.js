/**
 * SelectLocaleNavbar - Language Selector Dropdown
 * ================================================
 * 
 * Dropdown for language/locale selection in navbar.
 * Features collapsible sub-options with flag icons.
 * 
 * @component SelectLocaleNavbar
 * @source educacross-frontoffice\src\components\locale\SelectLocaleNavbar.vue
 */

export default {
  title: 'Front-office/Navigation/SelectLocaleNavbar',
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
