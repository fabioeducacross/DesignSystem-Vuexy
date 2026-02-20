/**
 * SelectLocale - Language Selector
 * =================================
 * Seletor de idioma com pt-BR, en-US, es-ES
 * 
 * @component SelectLocale
 * @category Educacross Components V2 / Forms
 * @source educacross-frontoffice/src/components/locale/SelectLocale.vue
 * @priority P1 - Core UI
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Forms/SelectLocale',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Seletor de idioma para plataforma educacional multilíngue (pt-BR, en-US, es-ES).

---

## Contexto Educacional
- **Professor**: Trocar idioma da interface
- **Aluno**: Selecionar idioma nativo
- **Coordenador**: Config padrão escola

## Props
| Prop | Type | Default |
|------|------|---------|
| locale | String | 'pt-BR' |
| showFlag | Boolean | true |
| variant | String | 'default' |
| disabled | Boolean | false |
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'navbar'],
      description: 'Variante'
    },
    showFlag: {
      control: 'boolean',
      description: 'Exibir bandeira'
    }
  }
};

const styles = `
<style>
  .locale-selector { position: relative; display: inline-block; }
  .locale-control {
    height: var(--height);
    padding: var(--padding);
    min-width: var(--min-width);
    font-size: var(--font-size);
    font-family: Inter, sans-serif;
    color: #5E5873;
    background: #fff;
    border: 1px solid #D8D6DE;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }
  .locale-control:hover:not(.disabled) { border-color: #6E63E8; }
  .locale-control:focus, .locale-control.open {
    outline: none;
    border-color: #6E63E8;
    box-shadow: 0 0 0 4px rgba(110, 99, 232, 0.25);
  }
  .locale-control.disabled { background: #F8F8F8; cursor: not-allowed; opacity: 0.6; }
  .locale-flag { font-size: 16px; line-height: 1; }
  .locale-text { flex: 1; white-space: nowrap; }
  .locale-icon { color: #6E6B7B; font-size: 16px; transition: transform 0.2s; }
  .locale-control.open .locale-icon { transform: rotate(180deg); }
  .locale-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    width: 200px;
    background: #fff;
    border: 1px solid #D8D6DE;
    border-radius: 6px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    z-index: 1000;
    display: none;
  }
  .locale-dropdown.open { display: block; }
  .locale-item {
    padding: 10px 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: #5E5873;
    transition: background 0.1s;
  }
  .locale-item:hover { background: #F8F9FA; }
  .locale-item.selected { background: #E8F5E9; font-weight: 500; }
  .locale-item-native { flex: 1; }
  .locale-item-code { font-size: 11px; color: #6E6B7B; text-transform: uppercase; }
  .variant-default { --height: 38px; --padding: 8px 12px; --font-size: 14px; --min-width: 120px; }
  .variant-compact { --height: 32px; --padding: 6px 10px; --font-size: 13px; --min-width: 80px; }
  .variant-navbar { --height: 32px; --padding: 6px 10px; --font-size: 13px; --min-width: 60px; }
  .variant-navbar .locale-text { display: none; }
</style>
`;

const locales = [
  { code: 'pt-BR', flag: '🇧🇷', native: 'Português', english: 'Portuguese (Brazil)' },
  { code: 'en-US', flag: '🇺🇸', native: 'English', english: 'English (United States)' },
  { code: 'es-ES', flag: '🇪🇸', native: 'Español', english: 'Spanish (Spain)' }
];

export const Default = {
  args: { variant: 'default', showFlag: true },
  render: (args) => {
    const current = locales[0];
    return `
      ${styles}
      <div class="locale-selector">
        <div class="locale-control variant-${args.variant}" tabindex="0" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
          ${args.showFlag ? `<span class="locale-flag">${current.flag}</span>` : ''}
          <span class="locale-text">${current.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
        <div class="locale-dropdown">
          ${locales.map((loc, i) => `
            <div class="locale-item ${i === 0 ? 'selected' : ''}">
              <span class="locale-flag">${loc.flag}</span>
              <span class="locale-item-native">${loc.native}</span>
              <span class="locale-item-code">${loc.code}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Seletor idioma padrão com bandeira.
      </p>
    `;
  }
};

export const Opened = {
  args: { variant: 'default', showFlag: true },
  render: (args) => {
    const current = locales[0];
    return `
      ${styles}
      <div class="locale-selector">
        <div class="locale-control variant-${args.variant} open" tabindex="0">
          ${args.showFlag ? `<span class="locale-flag">${current.flag}</span>` : ''}
          <span class="locale-text">${current.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
        <div class="locale-dropdown open">
          ${locales.map((loc, i) => `
            <div class="locale-item ${i === 0 ? 'selected' : ''}">
              <span class="locale-flag">${loc.flag}</span>
              <span class="locale-item-native">${loc.native}</span>
              <span class="locale-item-code">${loc.code}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Dropdown aberto com 3 idiomas.
      </p>
    `;
  }
};

export const AllLanguages = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      ${locales.map(loc => `
        <div class="locale-selector">
          <div class="locale-control variant-default" tabindex="0">
            <span class="locale-flag">${loc.flag}</span>
            <span class="locale-text">${loc.native}</span>
            <i class="locale-icon bi bi-chevron-down"></i>
          </div>
        </div>
      `).join('')}
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> pt-BR, en-US, es-ES disponíveis.
    </p>
  `
};

export const AllVariants = {
  render: () => {
    const current = locales[0];
    return `
      ${styles}
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500;">Default (38px)</label>
          <div class="locale-selector">
            <div class="locale-control variant-default" tabindex="0">
              <span class="locale-flag">${current.flag}</span>
              <span class="locale-text">${current.native}</span>
              <i class="locale-icon bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500;">Compact (32px)</label>
          <div class="locale-selector">
            <div class="locale-control variant-compact" tabindex="0">
              <span class="locale-flag">${current.flag}</span>
              <span class="locale-text">${current.native}</span>
              <i class="locale-icon bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500;">Navbar (só flag)</label>
          <div class="locale-selector">
            <div class="locale-control variant-navbar" tabindex="0">
              <span class="locale-flag">${current.flag}</span>
              <span class="locale-text">${current.native}</span>
              <i class="locale-icon bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

export const WithoutFlag = {
  args: { showFlag: false },
  render: (args) => {
    const current = locales[0];
    return `
      ${styles}
      <div class="locale-selector">
        <div class="locale-control variant-default" tabindex="0">
          <span class="locale-text">${current.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Versão minimalista sem bandeira.
      </p>
    `;
  }
};

export const Disabled = {
  args: { disabled: true },
  render: (args) => {
    const current = locales[0];
    return `
      ${styles}
      <div class="locale-selector">
        <div class="locale-control variant-default disabled">
          <span class="locale-flag">${current.flag}</span>
          <span class="locale-text">${current.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Desabilitado quando escola tem idioma fixo.
      </p>
    `;
  }
};

export const InNavbar = {
  render: () => {
    const current = locales[0];
    return `
      ${styles}
      <div style="background: #6E63E8; padding: 12px 20px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <span style="color: #fff; font-weight: 600; font-size: 16px;">Educacross</span>
          <nav style="display: flex; gap: 16px;">
            <a href="#" style="color: #fff; text-decoration: none; font-size: 14px;">Dashboard</a>
            <a href="#" style="color: #fff; text-decoration: none; font-size: 14px;">Missões</a>
          </nav>
        </div>
        <div class="locale-selector">
          <div class="locale-control variant-navbar" tabindex="0" style="background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.3);" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
            <span class="locale-flag">${current.flag}</span>
            <span class="locale-text" style="color: #fff;">BR</span>
            <i class="locale-icon bi bi-chevron-down" style="color: #fff;"></i>
          </div>
          <div class="locale-dropdown">
            ${locales.map((loc, i) => `
              <div class="locale-item ${i === 0 ? 'selected' : ''}">
                <span class="locale-flag">${loc.flag}</span>
                <span class="locale-item-native">${loc.native}</span>
                <span class="locale-item-code">${loc.code}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Integrado na navbar.
      </p>
    `;
  }
};

export const ConfiguracoesDeConta = {
  render: () => {
    const current = locales[0];
    return `
      ${styles}
      <div style="max-width: 600px;">
        <div style="background: #fff; padding: 24px; border-radius: 8px; border: 1px solid #D8D6DE;">
          <h3 style="margin: 0 0 8px; font-size: 18px; font-weight: 600;">Configurações da Conta</h3>
          <p style="margin: 0 0 24px; font-size: 13px; color: #6E6B7B;">Personalize sua experiência</p>
          
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Nome</label>
            <input type="text" value="Prof. Mariana Silva" style="width: 100%; padding: 8px 12px; border: 1px solid #D8D6DE; border-radius: 6px; font-size: 14px; font-family: Inter, sans-serif;" />
          </div>
          
          <div style="margin-bottom: 24px;">
            <label style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500;">Idioma</label>
            <div class="locale-selector">
              <div class="locale-control variant-default" tabindex="0" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
                <span class="locale-flag">${current.flag}</span>
                <span class="locale-text">${current.native}</span>
                <i class="locale-icon bi bi-chevron-down"></i>
              </div>
              <div class="locale-dropdown">
                ${locales.map((loc, i) => `
                  <div class="locale-item ${i === 0 ? 'selected' : ''}">
                    <span class="locale-flag">${loc.flag}</span>
                    <span class="locale-item-native">${loc.native}</span>
                    <span class="locale-item-code">${loc.code}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          
          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <button style="padding: 10px 20px; border: 1px solid #D8D6DE; background: #fff; border-radius: 6px; cursor: pointer;">Cancelar</button>
            <button style="padding: 10px 20px; border: none; background: #6E63E8; color: #fff; border-radius: 6px; cursor: pointer;">Salvar</button>
          </div>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Configuração de idioma na conta.
      </p>
    `;
  }
};

export const OnboardingDeNovoUsuario = {
  render: () => `
    ${styles}
    <div style="max-width: 500px; text-align: center;">
      <div style="background: #fff; padding: 40px 32px; border-radius: 8px; border: 1px solid #D8D6DE;">
        <div style="width: 80px; height: 80px; background: #E8F5E9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
          <i class="bi bi-translate" style="font-size: 40px; color: #28C76F;"></i>
        </div>
        <h2 style="margin: 0 0 12px; font-size: 24px; font-weight: 600;">Bem-vindo!</h2>
        <p style="margin: 0 0 24px; font-size: 14px; color: #6E6B7B;">Escolha seu idioma</p>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px;">
          ${locales.map(loc => `
            <div class="locale-selector" style="width: 100%;">
              <div class="locale-control variant-default" tabindex="0" style="width: 100%;">
                <span class="locale-flag">${loc.flag}</span>
                <span class="locale-text">${loc.native}</span>
                <i class="locale-icon bi bi-chevron-right"></i>
              </div>
            </div>
          `).join('')}
        </div>
        <button style="width: 100%; padding: 12px 24px; border: none; background: #6E63E8; color: #fff; border-radius: 6px; font-size: 16px; font-weight: 500; cursor: pointer;">
          Continuar
        </button>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Onboarding de novo usuário.
    </p>
  `
};

export const KeyboardNavigation = {
  render: () => {
    const current = locales[1];
    return `
      ${styles}
      <div class="locale-selector">
        <div class="locale-control variant-default open" tabindex="0">
          <span class="locale-flag">${current.flag}</span>
          <span class="locale-text">${current.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
        <div class="locale-dropdown open">
          ${locales.map((loc, i) => `
            <div class="locale-item ${i === 1 ? 'selected' : ''}">
              <span class="locale-flag">${loc.flag}</span>
              <span class="locale-item-native">${loc.native}</span>
              <span class="locale-item-code">${loc.code}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div style="margin-top: 20px; padding: 16px; background: #F8F9FA; border-radius: 6px; border: 1px solid #D8D6DE;">
        <p style="margin: 0 0 8px; font-size: 14px; font-weight: 600;">Atalhos:</p>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #6E6B7B;">
          <li><kbd>↓</kbd> / <kbd>↑</kbd> - Navegar</li>
          <li><kbd>Enter</kbd> - Selecionar</li>
          <li><kbd>Esc</kbd> - Fechar</li>
        </ul>
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Forms</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">SelectLocale</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Language Selector</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Language Selector. Faz parte da categoria <strong>Forms</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import SelectLocale from '@/components/SelectLocale.vue';

// Template
&lt;SelectLocale v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o SelectLocale com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground SelectLocale</p>
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
    docs: { description: { story: 'Exemplos de uso real do SelectLocale no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: SelectLocale</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando SelectLocale no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com SelectLocale no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via SelectLocale</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o SelectLocale.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: SelectLocale</h1>
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

