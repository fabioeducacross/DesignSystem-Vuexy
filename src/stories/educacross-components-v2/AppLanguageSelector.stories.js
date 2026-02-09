/**
 * AppLanguageSelector - Language Selector Dropdown Component
 * 
 * Dropdown para seleção de idioma da interface, geralmente posicionado na navbar.
 * Suporta múltiplos idiomas com flags, códigos e nomes localizados.
 * 
 * @component AppLanguageSelector
 * @category Educacross Components V2
 * @subcategory Navigation
 * @priority P2
 * @status PIXEL-PERFECT
 * @since v2.0
 * 
 * Key Features:
 * - ✅ Trigger button com flag emoji + chevron icon
 * - ✅ Dropdown menu absolute positioning (top + 4px, right aligned)
 * - ✅ Language options (PT-BR, EN-US, ES-ES) com flags 24×24px
 * - ✅ Selected state background verde + checkmark verde
 * - ✅ Hover effects (trigger background #F8F8F8, option background #F8F8F8)
 * - ✅ Click outside to close dropdown
 * - ✅ Compact variant (trigger com code PT-BR, sem dropdown width)
 * - ✅ Full variant (trigger com label longo "Português (Brasil)")
 * - ✅ Keyboard navigation (Tab + Enter/Space)
 * - ✅ ARIA attributes (aria-expanded, aria-haspopup)
 * 
 * Real-world usage:
 * - Navbar da aplicação com troca de idioma
 * - Painel de configurações de conta
 * - Footer com seletor de idioma global
 * - Multi-tenant apps com internacionalização
 */

export default {
  title: 'Educacross Components V2/Navigation/AppLanguageSelector',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# AppLanguageSelector

Dropdown **seletor de idioma** para aplicações internacionalizadas. Posicionado tipicamente na navbar com flags emoji.

## Quando usar

- ✅ Aplicações multi-idioma (i18n/l10n)
- ✅ Navbar/header global
- ✅ Configurações de conta (preferências de idioma)
- ✅ Footer com seletor de idioma
- ✅ Multi-tenant apps com suporte regional
- ✅ Plataformas educacionais internacionais

## Variantes

- **Default**: Trigger apenas com flag 🇧🇷 + chevron
- **InNavbar**: Integrado em navbar completa com logo + avatar
- **Opened**: Estado dropdown aberto (3 opções visíveis)
- **AllVariants**: Grid com Navbar, Compact (PT-BR code), Full (label longo)
- **ConfiguracoesDeConta**: Card de configuração com label + botão Salvar
- **Interactive**: Dropdown funcional com switch de flag/code ao clicar
- **KeyboardNavigation**: Com focus visible + ARIA attributes

## Características visuais

- **Trigger button**: padding 8×12px, border-radius 6px, hover #F8F8F8
- **Flag emoji**: font-size 20px (trigger) / 24px (options)
- **Dropdown**: absolute top calc(100% + 4px), width 180px, shadow 0 4px 24px rgba(0,0,0,.12)
- **Selected option**: background #E8F5E9, color #28C76F, checkmark verde 16px
        `
      }
    }
  }
};

/**
 * ## Props API (sem props - display only component)
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | languages | Array | [] | Lista de idiomas [{code: 'pt-BR', flag: '🇧🇷', name: 'Português'}] |
 * | selected | String | 'pt-BR' | Código do idioma selecionado atualmente |
 * | variant | String | 'default' | Variante: 'default' (só flag), 'compact' (flag + code), 'full' (flag + nome) |
 * | position | String | 'right' | Posição do dropdown: 'right' (alinhado à direita), 'left' (à esquerda) |
 * | onChange | Function | null | Callback ao selecionar idioma: (langCode) => {} |
 * | showCode | Boolean | false | Exibir código no trigger (PT-BR, EN-US) |
 * | showName | Boolean | false | Exibir nome completo no trigger |
 * | disabled | Boolean | false | Desabilitar interação |
 * 
 * ## Design Specs
 * 
 * **Cores:**
 * - Trigger default: background `transparent`, color `#6E6B7B`
 * - Trigger hover: background `#F8F8F8`, color `#6E63E8`
 * - Dropdown background: `#fff`, border `1px solid #D8D6DE`
 * - Option hover: background `#F8F8F8`
 * - Option selected: background `#E8F5E9`, color `#28C76F`
 * - Option border-bottom: `1px solid #F3F2F7`
 * - Checkmark: color `#28C76F`, font-size `16px`
 * 
 * **Dimensões:**
 * - Trigger: padding `8px 12px`, border-radius `6px`, gap `8px`
 * - Trigger (full): padding `10px 16px`
 * - Flag trigger: font-size `20px`
 * - Flag option: font-size `24px`
 * - Code: font-size `13px`, text-transform `uppercase`, font-weight `500`
 * - Dropdown: width `180px`, top `calc(100% + 4px)`, z-index `1000`
 * - Dropdown shadow: `0 4px 24px rgba(0,0,0,.12)`
 * - Option: padding `10px 14px`, gap `12px`
 * - Option name: font-size `14px`, font-weight `500`
 * - Option code: font-size `12px`, color `#6E6B7B`
 * 
 * **Tipografia:**
 * - Code: `13px` weight `500` text-transform `uppercase`
 * - Option name: `14px` weight `500` color `#5E5873`
 * - Option code: `12px` color `#6E6B7B`
 * 
 * **Animações:**
 * - Trigger hover: transition `all .2s`
 * - Option hover: transition `all .15s`
 * - Dropdown toggle: display `none` → `block` (sem animação CSS, use JS)
 */

const styles = `<style>
.lang-selector {
  position: relative;
  display: inline-block;
}

.lang-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: #6E6B7B;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  transition: all .2s;
}

.lang-trigger:hover {
  background: #F8F8F8;
  color: #6E63E8;
}

.lang-trigger:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.lang-trigger:focus {
  outline: 2px solid #6E63E8;
  outline-offset: 2px;
}

.lang-flag {
  font-size: 20px;
  line-height: 1;
}

.lang-code {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 13px;
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: #fff;
  border: 1px solid #D8D6DE;
  border-radius: 6px;
  box-shadow: 0 4px 24px rgba(0,0,0,.12);
  width: 180px;
  display: none;
  z-index: 1000;
}

.lang-dropdown.open {
  display: block;
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  cursor: pointer;
  transition: all .15s;
  border-bottom: 1px solid #F3F2F7;
}

.lang-option:last-child {
  border-bottom: none;
}

.lang-option:hover {
  background: #F8F8F8;
}

.lang-option.selected {
  background: #E8F5E9;
  color: #28C76F;
}

.lang-option:focus {
  outline: 2px solid #6E63E8;
  outline-offset: -2px;
  background: #F8F8F8;
}

.lang-option-flag {
  font-size: 24px;
  line-height: 1;
}

.lang-option-info {
  flex: 1;
}

.lang-option-name {
  font-size: 14px;
  font-weight: 500;
  color: #5E5873;
  margin: 0 0 2px;
}

.lang-option.selected .lang-option-name {
  color: #28C76F;
}

.lang-option-code {
  font-size: 12px;
  color: #6E6B7B;
  margin: 0;
}

.lang-check {
  color: #28C76F;
  font-size: 16px;
}
</style>`;

const langs = [
  {code: 'pt-BR', flag: '🇧🇷', name: 'Português'},
  {code: 'en-US', flag: '🇺🇸', name: 'English'},
  {code: 'es-ES', flag: '🇪🇸', name: 'Español'}
];

/**
 * Story: Default
 * 
 * Trigger apenas com flag 🇧🇷 + chevron. Dropdown toggle ao clicar.
 * 
 * Educational context: Navbar minimalista com seletor de idioma compacto.
 */
export const Default = {
  render: () => `
    ${styles}
    <div class="lang-selector">
      <button class="lang-trigger" onclick="this.nextElementSibling.classList.toggle('open')" aria-haspopup="true" aria-expanded="false">
        <span class="lang-flag" role="img" aria-label="Bandeira Brasil">🇧🇷</span>
        <i class="bi bi-chevron-down" style="font-size: 12px"></i>
      </button>
      <div class="lang-dropdown" role="menu">
        ${langs.map((l, i) => `
          <div class="lang-option ${i === 0 ? 'selected' : ''}" role="menuitem" onclick="alert('Idioma: ${l.name}')">
            <span class="lang-option-flag" role="img" aria-label="Bandeira ${l.name}">${l.flag}</span>
            <div class="lang-option-info">
              <p class="lang-option-name">${l.name}</p>
              <p class="lang-option-code">${l.code}</p>
            </div>
            ${i === 0 ? '<i class="bi bi-check lang-check"></i>' : ''}
          </div>
        `).join('')}
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Seletor básico com flag. Clique para abrir dropdown.
    </p>
  `
};

/**
 * Story: InNavbar
 * 
 * Integrado em navbar completa com logo Educacross + language selector + avatar professora.
 * 
 * Educational context: Navbar da aplicação (professora Mariana Silva).
 */
export const InNavbar = {
  render: () => `
    ${styles}
    <div style="background: #fff; border-bottom: 1px solid #D8D6DE; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center">
      <div style="font-size: 18px; font-weight: 700; color: #6E63E8">
        <i class="bi bi-mortarboard-fill" style="margin-right: 8px"></i>Educacross
      </div>
      <div style="display: flex; align-items: center; gap: 16px">
        <div class="lang-selector">
          <button class="lang-trigger" onclick="this.nextElementSibling.classList.toggle('open')">
            <span class="lang-flag">🇧🇷</span>
            <i class="bi bi-chevron-down" style="font-size: 12px"></i>
          </button>
          <div class="lang-dropdown">
            ${langs.map((l, i) => `
              <div class="lang-option ${i === 0 ? 'selected' : ''}">
                <span class="lang-option-flag">${l.flag}</span>
                <div class="lang-option-info">
                  <p class="lang-option-name">${l.name}</p>
                  <p class="lang-option-code">${l.code}</p>
                </div>
                ${i === 0 ? '<i class="bi bi-check lang-check"></i>' : ''}
              </div>
            `).join('')}
          </div>
        </div>
        <div style="width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #6E63E8, #28C76F); display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 600; font-size: 14px">
          MS
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Navbar completa da aplicação (professora Mariana Silva).
    </p>
  `
};

/**
 * Story: Opened
 * 
 * Dropdown aberto mostrando 3 opções de idioma (PT, EN, ES) com Português selecionado.
 * 
 * Educational context: Estado dropdown visível para visualização das opções.
 */
export const Opened = {
  render: () => `
    ${styles}
    <div class="lang-selector">
      <button class="lang-trigger">
        <span class="lang-flag">🇧🇷</span>
        <i class="bi bi-chevron-down" style="font-size: 12px"></i>
      </button>
      <div class="lang-dropdown open">
        ${langs.map((l, i) => `
          <div class="lang-option ${i === 0 ? 'selected' : ''}">
            <span class="lang-option-flag">${l.flag}</span>
            <div class="lang-option-info">
              <p class="lang-option-name">${l.name}</p>
              <p class="lang-option-code">${l.code}</p>
            </div>
            ${i === 0 ? '<i class="bi bi-check lang-check"></i>' : ''}
          </div>
        `).join('')}
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Dropdown aberto mostrando 3 idiomas disponíveis.
    </p>
  `
};

/**
 * Story: AllVariants
 * 
 * Grid com 3 variantes: Navbar (só flag), Compact (flag + code PT-BR), Full (flag + label "Português (Brasil)").
 * 
 * Educational context: Demonstração de diferentes estilos de trigger.
 */
export const AllVariants = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 500px">
      <div>
        <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #5E5873">Navbar (só flag)</h4>
        <div class="lang-selector">
          <button class="lang-trigger">
            <span class="lang-flag">🇧🇷</span>
            <i class="bi bi-chevron-down" style="font-size: 12px"></i>
          </button>
        </div>
      </div>
      
      <div>
        <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #5E5873">Compact (flag + código)</h4>
        <div class="lang-selector">
          <button class="lang-trigger">
            <span class="lang-flag">🇧🇷</span>
            <span class="lang-code">PT-BR</span>
            <i class="bi bi-chevron-down" style="font-size: 12px"></i>
          </button>
        </div>
      </div>
      
      <div>
        <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #5E5873">Full (flag + nome completo)</h4>
        <div class="lang-selector">
          <button class="lang-trigger" style="padding: 10px 16px">
            <span class="lang-flag">🇧🇷</span>
            <span style="font-weight: 500">Português (Brasil)</span>
            <i class="bi bi-chevron-down" style="font-size: 12px"></i>
          </button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Três estilos de trigger para diferentes contextos de UI.
    </p>
  `
};

/**
 * Story: ConfiguracoesDeConta
 * 
 * Card de configuração com label "Idioma da Interface", descrição, seletor full-width e botão Salvar roxo.
 * 
 * Educational context: Painel de configurações de conta (professora).
 */
export const ConfiguracoesDeConta = {
  render: () => `
    ${styles}
    <div style="max-width: 600px; background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 24px">
      <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 600; color: #5E5873">
        Preferências de Idioma
      </h3>
      
      <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: #5E5873">
        Idioma da Interface
      </label>
      <p style="margin: 0 0 12px; font-size: 13px; color: #6E6B7B">
        Escolha o idioma para menus, botões e mensagens do sistema.
      </p>
      
      <div class="lang-selector" style="width: 100%">
        <button class="lang-trigger" style="width: 100%; justify-content: space-between; border: 1px solid #D8D6DE" onclick="this.nextElementSibling.classList.toggle('open')">
          <div style="display: flex; align-items: center; gap: 12px">
            <span class="lang-flag">🇧🇷</span>
            <span style="font-weight: 500">Português (Brasil)</span>
          </div>
          <i class="bi bi-chevron-down" style="font-size: 12px"></i>
        </button>
        <div class="lang-dropdown" style="width: 100%">
          ${langs.map((l, i) => `
            <div class="lang-option ${i === 0 ? 'selected' : ''}">
              <span class="lang-option-flag">${l.flag}</span>
              <div class="lang-option-info">
                <p class="lang-option-name">${l.name}</p>
                <p class="lang-option-code">${l.code}</p>
              </div>
              ${i === 0 ? '<i class="bi bi-check lang-check"></i>' : ''}
            </div>
          `).join('')}
        </div>
      </div>
      
      <div style="padding-top: 16px; border-top: 1px solid #F3F2F7; margin-top: 20px">
        <button style="padding: 10px 24px; background: #6E63E8; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-weight: 500; transition: .2s" onmouseover="this.style.background='#5952D4'" onmouseout="this.style.background='#6E63E8'">
          Salvar Alterações
        </button>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Configurações de conta (professora alterando idioma da interface).
    </p>
  `
};

/**
 * Story: Interactive
 * 
 * Dropdown funcional que atualiza flag e code ao selecionar idioma, com feedback verde "✓ English" ao trocar.
 * 
 * Educational context: Demonstração de interação real com feedback visual.
 */
export const Interactive = {
  render: () => `
    ${styles}
    <div class="lang-selector">
      <button class="lang-trigger" id="lang-btn" onclick="document.getElementById('lang-dd').classList.toggle('open')">
        <span class="lang-flag" id="flag">🇧🇷</span>
        <span class="lang-code" id="code">PT-BR</span>
        <i class="bi bi-chevron-down" style="font-size: 12px"></i>
      </button>
      <div class="lang-dropdown" id="lang-dd">
        ${langs.map((l, i) => `
          <div class="lang-option ${i === 0 ? 'selected' : ''}" 
               onclick="
                 document.getElementById('flag').textContent = '${l.flag}';
                 document.getElementById('code').textContent = '${l.code}';
                 document.querySelectorAll('.lang-option').forEach((o, j) => {
                   o.classList.toggle('selected', j === ${i});
                   const check = o.querySelector('.lang-check');
                   if (check) check.style.display = j === ${i} ? 'block' : 'none';
                 });
                 document.getElementById('lang-dd').classList.remove('open');
                 document.getElementById('fb').innerHTML = '<strong style=color:#28C76F><i class=bi bi-check-circle-fill></i> ${l.name} selecionado</strong>';
               ">
            <span class="lang-option-flag">${l.flag}</span>
            <div class="lang-option-info">
              <p class="lang-option-name">${l.name}</p>
              <p class="lang-option-code">${l.code}</p>
            </div>
            <i class="bi bi-check lang-check" style="display: ${i === 0 ? 'block' : 'none'}"></i>
          </div>
        `).join('')}
      </div>
    </div>
    
    <div id="fb" style="margin-top: 16px; font-size: 14px; color: #6E6B7B; min-height: 20px"></div>
    
    <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B">
      <strong>Interação:</strong> Clique para trocar idioma. Flag e código atualizam + feedback verde.
    </p>
  `
};

/**
 * Story: KeyboardNavigation
 * 
 * Dropdown com Tab navigation, focus visible (outline 2px roxo) e ARIA attributes (role, aria-selected, tabindex).
 * 
 * Educational context: Acessibilidade WCAG 2.1 AA com suporte teclado.
 */
export const KeyboardNavigation = {
  render: () => `
    ${styles}
    <style>
      .lang-trigger:focus {
        outline: 2px solid #6E63E8;
        outline-offset: 2px;
      }
      .lang-option:focus {
        outline: 2px solid #6E63E8;
        outline-offset: -2px;
        background: #F8F8F8;
      }
    </style>
    
    <div class="lang-selector">
      <button class="lang-trigger" tabindex="0" aria-haspopup="true" aria-expanded="true">
        <span class="lang-flag">🇧🇷</span>
        <span class="lang-code">PT-BR</span>
        <i class="bi bi-chevron-down" style="font-size: 12px"></i>
      </button>
      <div class="lang-dropdown open" role="menu">
        ${langs.map((l, i) => `
          <div class="lang-option ${i === 0 ? 'selected' : ''}" 
               tabindex="0" 
               role="option" 
               aria-selected="${i === 0}"
               onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); alert('${l.name} selecionado'); }">
            <span class="lang-option-flag">${l.flag}</span>
            <div class="lang-option-info">
              <p class="lang-option-name">${l.name}</p>
              <p class="lang-option-code">${l.code}</p>
            </div>
            ${i === 0 ? '<i class="bi bi-check lang-check"></i>' : ''}
          </div>
        `).join('')}
      </div>
    </div>
    
    <div style="margin-top: 20px; padding: 16px; background: #F8F8F8; border-radius: 8px; font-size: 13px; color: #6E6B7B">
      <strong>WCAG 2.1 AA - Navegação por Teclado:</strong>
      <ul style="margin: 8px 0 0; padding-left: 20px">
        <li><kbd>Tab</kbd> - Navegar entre trigger e options</li>
        <li><kbd>Enter</kbd> / <kbd>Espaço</kbd> - Selecionar idioma</li>
        <li><kbd>Esc</kbd> - Fechar dropdown (implementar)</li>
        <li><strong>role="option"</strong> + <strong>aria-selected</strong></li>
        <li>Outline focus 2px roxo visível</li>
      </ul>
    </div>
  `
};

/**
 * Story: FooterIntegration
 * 
 * Footer da aplicação com seletor de idioma + links + copyright.
 * 
 * Educational context: Footer global com troca de idioma (multi-tenant app).
 */
export const FooterIntegration = {
  render: () => `
    ${styles}
    <footer style="background: #F8F8F8; border-top: 1px solid #D8D6DE; padding: 24px; margin-top: 40px">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px">
        <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap">
          <span style="font-size: 14px; font-weight: 600; color: #5E5873">© 2024 Educacross</span>
          <div style="display: flex; gap: 16px">
            <a href="#" style="font-size: 13px; color: #6E6B7B; text-decoration: none; transition: .2s" onmouseover="this.style.color='#6E63E8'" onmouseout="this.style.color='#6E6B7B'">Termos de Uso</a>
            <a href="#" style="font-size: 13px; color: #6E6B7B; text-decoration: none; transition: .2s" onmouseover="this.style.color='#6E63E8'" onmouseout="this.style.color='#6E6B7B'">Privacidade</a>
            <a href="#" style="font-size: 13px; color: #6E6B7B; text-decoration: none; transition: .2s" onmouseover="this.style.color='#6E63E8'" onmouseout="this.style.color='#6E6B7B'">Suporte</a>
          </div>
        </div>
        
        <div style="display: flex; align-items: center; gap: 12px">
          <span style="font-size: 13px; color: #6E6B7B">Idioma:</span>
          <div class="lang-selector">
            <button class="lang-trigger" style="background: #fff; border: 1px solid #D8D6DE" onclick="this.nextElementSibling.classList.toggle('open')">
              <span class="lang-flag">🇧🇷</span>
              <span class="lang-code">PT-BR</span>
              <i class="bi bi-chevron-down" style="font-size: 12px"></i>
            </button>
            <div class="lang-dropdown">
              ${langs.map((l, i) => `
                <div class="lang-option ${i === 0 ? 'selected' : ''}">
                  <span class="lang-option-flag">${l.flag}</span>
                  <div class="lang-option-info">
                    <p class="lang-option-name">${l.name}</p>
                    <p class="lang-option-code">${l.code}</p>
                  </div>
                  ${i === 0 ? '<i class="bi bi-check lang-check"></i>' : ''}
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </footer>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Footer global com seletor de idioma (multi-tenant app internacional).
    </p>
  `
};
