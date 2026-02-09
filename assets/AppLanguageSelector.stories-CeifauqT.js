const Y={title:"Educacross Components V2/Navigation/AppLanguageSelector",tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}}}},e=`<style>
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
</style>`,a=[{code:"pt-BR",flag:"🇧🇷",name:"Português"},{code:"en-US",flag:"🇺🇸",name:"English"},{code:"es-ES",flag:"🇪🇸",name:"Español"}],s={render:()=>`
    ${e}
    <div class="lang-selector">
      <button class="lang-trigger" onclick="this.nextElementSibling.classList.toggle('open')" aria-haspopup="true" aria-expanded="false">
        <span class="lang-flag" role="img" aria-label="Bandeira Brasil">🇧🇷</span>
        <i class="bi bi-chevron-down" style="font-size: 12px"></i>
      </button>
      <div class="lang-dropdown" role="menu">
        ${a.map((n,o)=>`
          <div class="lang-option ${o===0?"selected":""}" role="menuitem" onclick="alert('Idioma: ${n.name}')">
            <span class="lang-option-flag" role="img" aria-label="Bandeira ${n.name}">${n.flag}</span>
            <div class="lang-option-info">
              <p class="lang-option-name">${n.name}</p>
              <p class="lang-option-code">${n.code}</p>
            </div>
            ${o===0?'<i class="bi bi-check lang-check"></i>':""}
          </div>
        `).join("")}
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Seletor básico com flag. Clique para abrir dropdown.
    </p>
  `},i={render:()=>`
    ${e}
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
            ${a.map((n,o)=>`
              <div class="lang-option ${o===0?"selected":""}">
                <span class="lang-option-flag">${n.flag}</span>
                <div class="lang-option-info">
                  <p class="lang-option-name">${n.name}</p>
                  <p class="lang-option-code">${n.code}</p>
                </div>
                ${o===0?'<i class="bi bi-check lang-check"></i>':""}
              </div>
            `).join("")}
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
  `},t={render:()=>`
    ${e}
    <div class="lang-selector">
      <button class="lang-trigger">
        <span class="lang-flag">🇧🇷</span>
        <i class="bi bi-chevron-down" style="font-size: 12px"></i>
      </button>
      <div class="lang-dropdown open">
        ${a.map((n,o)=>`
          <div class="lang-option ${o===0?"selected":""}">
            <span class="lang-option-flag">${n.flag}</span>
            <div class="lang-option-info">
              <p class="lang-option-name">${n.name}</p>
              <p class="lang-option-code">${n.code}</p>
            </div>
            ${o===0?'<i class="bi bi-check lang-check"></i>':""}
          </div>
        `).join("")}
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Dropdown aberto mostrando 3 idiomas disponíveis.
    </p>
  `},l={render:()=>`
    ${e}
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
  `},r={render:()=>`
    ${e}
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
          ${a.map((n,o)=>`
            <div class="lang-option ${o===0?"selected":""}">
              <span class="lang-option-flag">${n.flag}</span>
              <div class="lang-option-info">
                <p class="lang-option-name">${n.name}</p>
                <p class="lang-option-code">${n.code}</p>
              </div>
              ${o===0?'<i class="bi bi-check lang-check"></i>':""}
            </div>
          `).join("")}
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
  `},c={render:()=>`
    ${e}
    <div class="lang-selector">
      <button class="lang-trigger" id="lang-btn" onclick="document.getElementById('lang-dd').classList.toggle('open')">
        <span class="lang-flag" id="flag">🇧🇷</span>
        <span class="lang-code" id="code">PT-BR</span>
        <i class="bi bi-chevron-down" style="font-size: 12px"></i>
      </button>
      <div class="lang-dropdown" id="lang-dd">
        ${a.map((n,o)=>`
          <div class="lang-option ${o===0?"selected":""}" 
               onclick="
                 document.getElementById('flag').textContent = '${n.flag}';
                 document.getElementById('code').textContent = '${n.code}';
                 document.querySelectorAll('.lang-option').forEach((o, j) => {
                   o.classList.toggle('selected', j === ${o});
                   const check = o.querySelector('.lang-check');
                   if (check) check.style.display = j === ${o} ? 'block' : 'none';
                 });
                 document.getElementById('lang-dd').classList.remove('open');
                 document.getElementById('fb').innerHTML = '<strong style=color:#28C76F><i class=bi bi-check-circle-fill></i> ${n.name} selecionado</strong>';
               ">
            <span class="lang-option-flag">${n.flag}</span>
            <div class="lang-option-info">
              <p class="lang-option-name">${n.name}</p>
              <p class="lang-option-code">${n.code}</p>
            </div>
            <i class="bi bi-check lang-check" style="display: ${o===0?"block":"none"}"></i>
          </div>
        `).join("")}
      </div>
    </div>
    
    <div id="fb" style="margin-top: 16px; font-size: 14px; color: #6E6B7B; min-height: 20px"></div>
    
    <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B">
      <strong>Interação:</strong> Clique para trocar idioma. Flag e código atualizam + feedback verde.
    </p>
  `},p={render:()=>`
    ${e}
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
        ${a.map((n,o)=>`
          <div class="lang-option ${o===0?"selected":""}" 
               tabindex="0" 
               role="option" 
               aria-selected="${o===0}"
               onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); alert('${n.name} selecionado'); }">
            <span class="lang-option-flag">${n.flag}</span>
            <div class="lang-option-info">
              <p class="lang-option-name">${n.name}</p>
              <p class="lang-option-code">${n.code}</p>
            </div>
            ${o===0?'<i class="bi bi-check lang-check"></i>':""}
          </div>
        `).join("")}
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
  `},d={render:()=>`
    ${e}
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
              ${a.map((n,o)=>`
                <div class="lang-option ${o===0?"selected":""}">
                  <span class="lang-option-flag">${n.flag}</span>
                  <div class="lang-option-info">
                    <p class="lang-option-name">${n.name}</p>
                    <p class="lang-option-code">${n.code}</p>
                  </div>
                  ${o===0?'<i class="bi bi-check lang-check"></i>':""}
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </footer>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Footer global com seletor de idioma (multi-tenant app internacional).
    </p>
  `};var g,x,f,u,m;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="lang-selector">
      <button class="lang-trigger" onclick="this.nextElementSibling.classList.toggle('open')" aria-haspopup="true" aria-expanded="false">
        <span class="lang-flag" role="img" aria-label="Bandeira Brasil">🇧🇷</span>
        <i class="bi bi-chevron-down" style="font-size: 12px"></i>
      </button>
      <div class="lang-dropdown" role="menu">
        \${langs.map((l, i) => \`
          <div class="lang-option \${i === 0 ? 'selected' : ''}" role="menuitem" onclick="alert('Idioma: \${l.name}')">
            <span class="lang-option-flag" role="img" aria-label="Bandeira \${l.name}">\${l.flag}</span>
            <div class="lang-option-info">
              <p class="lang-option-name">\${l.name}</p>
              <p class="lang-option-code">\${l.code}</p>
            </div>
            \${i === 0 ? '<i class="bi bi-check lang-check"></i>' : ''}
          </div>
        \`).join('')}
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Seletor básico com flag. Clique para abrir dropdown.
    </p>
  \`
}`,...(f=(x=s.parameters)==null?void 0:x.docs)==null?void 0:f.source},description:{story:`Story: Default

Trigger apenas com flag 🇧🇷 + chevron. Dropdown toggle ao clicar.

Educational context: Navbar minimalista com seletor de idioma compacto.`,...(m=(u=s.parameters)==null?void 0:u.docs)==null?void 0:m.description}}};var b,v,y,E,h;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
            \${langs.map((l, i) => \`
              <div class="lang-option \${i === 0 ? 'selected' : ''}">
                <span class="lang-option-flag">\${l.flag}</span>
                <div class="lang-option-info">
                  <p class="lang-option-name">\${l.name}</p>
                  <p class="lang-option-code">\${l.code}</p>
                </div>
                \${i === 0 ? '<i class="bi bi-check lang-check"></i>' : ''}
              </div>
            \`).join('')}
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
  \`
}`,...(y=(v=i.parameters)==null?void 0:v.docs)==null?void 0:y.source},description:{story:`Story: InNavbar

Integrado em navbar completa com logo Educacross + language selector + avatar professora.

Educational context: Navbar da aplicação (professora Mariana Silva).`,...(h=(E=i.parameters)==null?void 0:E.docs)==null?void 0:h.description}}};var D,$,k,w,B;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="lang-selector">
      <button class="lang-trigger">
        <span class="lang-flag">🇧🇷</span>
        <i class="bi bi-chevron-down" style="font-size: 12px"></i>
      </button>
      <div class="lang-dropdown open">
        \${langs.map((l, i) => \`
          <div class="lang-option \${i === 0 ? 'selected' : ''}">
            <span class="lang-option-flag">\${l.flag}</span>
            <div class="lang-option-info">
              <p class="lang-option-name">\${l.name}</p>
              <p class="lang-option-code">\${l.code}</p>
            </div>
            \${i === 0 ? '<i class="bi bi-check lang-check"></i>' : ''}
          </div>
        \`).join('')}
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Dropdown aberto mostrando 3 idiomas disponíveis.
    </p>
  \`
}`,...(k=($=t.parameters)==null?void 0:$.docs)==null?void 0:k.source},description:{story:`Story: Opened

Dropdown aberto mostrando 3 opções de idioma (PT, EN, ES) com Português selecionado.

Educational context: Estado dropdown visível para visualização das opções.`,...(B=(w=t.parameters)==null?void 0:w.docs)==null?void 0:B.description}}};var F,z,C,S,I;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
  \`
}`,...(C=(z=l.parameters)==null?void 0:z.docs)==null?void 0:C.source},description:{story:`Story: AllVariants

Grid com 3 variantes: Navbar (só flag), Compact (flag + code PT-BR), Full (flag + label "Português (Brasil)").

Educational context: Demonstração de diferentes estilos de trigger.`,...(I=(S=l.parameters)==null?void 0:S.docs)==null?void 0:I.description}}};var A,j,P,T,N;r.parameters={...r.parameters,docs:{...(A=r.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
          \${langs.map((l, i) => \`
            <div class="lang-option \${i === 0 ? 'selected' : ''}">
              <span class="lang-option-flag">\${l.flag}</span>
              <div class="lang-option-info">
                <p class="lang-option-name">\${l.name}</p>
                <p class="lang-option-code">\${l.code}</p>
              </div>
              \${i === 0 ? '<i class="bi bi-check lang-check"></i>' : ''}
            </div>
          \`).join('')}
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
  \`
}`,...(P=(j=r.parameters)==null?void 0:j.docs)==null?void 0:P.source},description:{story:`Story: ConfiguracoesDeConta

Card de configuração com label "Idioma da Interface", descrição, seletor full-width e botão Salvar roxo.

Educational context: Painel de configurações de conta (professora).`,...(N=(T=r.parameters)==null?void 0:T.docs)==null?void 0:N.description}}};var L,R,q,M,O;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="lang-selector">
      <button class="lang-trigger" id="lang-btn" onclick="document.getElementById('lang-dd').classList.toggle('open')">
        <span class="lang-flag" id="flag">🇧🇷</span>
        <span class="lang-code" id="code">PT-BR</span>
        <i class="bi bi-chevron-down" style="font-size: 12px"></i>
      </button>
      <div class="lang-dropdown" id="lang-dd">
        \${langs.map((l, i) => \`
          <div class="lang-option \${i === 0 ? 'selected' : ''}" 
               onclick="
                 document.getElementById('flag').textContent = '\${l.flag}';
                 document.getElementById('code').textContent = '\${l.code}';
                 document.querySelectorAll('.lang-option').forEach((o, j) => {
                   o.classList.toggle('selected', j === \${i});
                   const check = o.querySelector('.lang-check');
                   if (check) check.style.display = j === \${i} ? 'block' : 'none';
                 });
                 document.getElementById('lang-dd').classList.remove('open');
                 document.getElementById('fb').innerHTML = '<strong style=color:#28C76F><i class=bi bi-check-circle-fill></i> \${l.name} selecionado</strong>';
               ">
            <span class="lang-option-flag">\${l.flag}</span>
            <div class="lang-option-info">
              <p class="lang-option-name">\${l.name}</p>
              <p class="lang-option-code">\${l.code}</p>
            </div>
            <i class="bi bi-check lang-check" style="display: \${i === 0 ? 'block' : 'none'}"></i>
          </div>
        \`).join('')}
      </div>
    </div>
    
    <div id="fb" style="margin-top: 16px; font-size: 14px; color: #6E6B7B; min-height: 20px"></div>
    
    <p style="margin-top: 20px; font-size: 13px; color: #6E6B7B">
      <strong>Interação:</strong> Clique para trocar idioma. Flag e código atualizam + feedback verde.
    </p>
  \`
}`,...(q=(R=c.parameters)==null?void 0:R.docs)==null?void 0:q.source},description:{story:`Story: Interactive

Dropdown funcional que atualiza flag e code ao selecionar idioma, com feedback verde "✓ English" ao trocar.

Educational context: Demonstração de interação real com feedback visual.`,...(O=(M=c.parameters)==null?void 0:M.docs)==null?void 0:O.description}}};var V,G,U,K,W;p.parameters={...p.parameters,docs:{...(V=p.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
        \${langs.map((l, i) => \`
          <div class="lang-option \${i === 0 ? 'selected' : ''}" 
               tabindex="0" 
               role="option" 
               aria-selected="\${i === 0}"
               onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); alert('\${l.name} selecionado'); }">
            <span class="lang-option-flag">\${l.flag}</span>
            <div class="lang-option-info">
              <p class="lang-option-name">\${l.name}</p>
              <p class="lang-option-code">\${l.code}</p>
            </div>
            \${i === 0 ? '<i class="bi bi-check lang-check"></i>' : ''}
          </div>
        \`).join('')}
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
  \`
}`,...(U=(G=p.parameters)==null?void 0:G.docs)==null?void 0:U.source},description:{story:`Story: KeyboardNavigation

Dropdown com Tab navigation, focus visible (outline 2px roxo) e ARIA attributes (role, aria-selected, tabindex).

Educational context: Acessibilidade WCAG 2.1 AA com suporte teclado.`,...(W=(K=p.parameters)==null?void 0:K.docs)==null?void 0:W.description}}};var _,H,Q,J,X;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
              \${langs.map((l, i) => \`
                <div class="lang-option \${i === 0 ? 'selected' : ''}">
                  <span class="lang-option-flag">\${l.flag}</span>
                  <div class="lang-option-info">
                    <p class="lang-option-name">\${l.name}</p>
                    <p class="lang-option-code">\${l.code}</p>
                  </div>
                  \${i === 0 ? '<i class="bi bi-check lang-check"></i>' : ''}
                </div>
              \`).join('')}
            </div>
          </div>
        </div>
      </div>
    </footer>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Footer global com seletor de idioma (multi-tenant app internacional).
    </p>
  \`
}`,...(Q=(H=d.parameters)==null?void 0:H.docs)==null?void 0:Q.source},description:{story:`Story: FooterIntegration

Footer da aplicação com seletor de idioma + links + copyright.

Educational context: Footer global com troca de idioma (multi-tenant app).`,...(X=(J=d.parameters)==null?void 0:J.docs)==null?void 0:X.description}}};const Z=["Default","InNavbar","Opened","AllVariants","ConfiguracoesDeConta","Interactive","KeyboardNavigation","FooterIntegration"];export{l as AllVariants,r as ConfiguracoesDeConta,s as Default,d as FooterIntegration,i as InNavbar,c as Interactive,p as KeyboardNavigation,t as Opened,Z as __namedExportsOrder,Y as default};
