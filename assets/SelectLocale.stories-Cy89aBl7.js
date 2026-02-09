const W={title:"Educacross Components V2/Forms/SelectLocale",tags:["autodocs"],parameters:{layout:"padded",docs:{description:{component:`
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
        `}}},argTypes:{variant:{control:"select",options:["default","compact","navbar"],description:"Variante"},showFlag:{control:"boolean",description:"Exibir bandeira"}}},l=`
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
`,e=[{code:"pt-BR",flag:"🇧🇷",native:"Português",english:"Portuguese (Brazil)"},{code:"en-US",flag:"🇺🇸",native:"English",english:"English (United States)"},{code:"es-ES",flag:"🇪🇸",native:"Español",english:"Spanish (Spain)"}],s={args:{variant:"default",showFlag:!0},render:a=>{const n=e[0];return`
      ${l}
      <div class="locale-selector">
        <div class="locale-control variant-${a.variant}" tabindex="0" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
          ${a.showFlag?`<span class="locale-flag">${n.flag}</span>`:""}
          <span class="locale-text">${n.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
        <div class="locale-dropdown">
          ${e.map((o,f)=>`
            <div class="locale-item ${f===0?"selected":""}">
              <span class="locale-flag">${o.flag}</span>
              <span class="locale-item-native">${o.native}</span>
              <span class="locale-item-code">${o.code}</span>
            </div>
          `).join("")}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Seletor idioma padrão com bandeira.
      </p>
    `}},t={args:{variant:"default",showFlag:!0},render:a=>{const n=e[0];return`
      ${l}
      <div class="locale-selector">
        <div class="locale-control variant-${a.variant} open" tabindex="0">
          ${a.showFlag?`<span class="locale-flag">${n.flag}</span>`:""}
          <span class="locale-text">${n.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
        <div class="locale-dropdown open">
          ${e.map((o,f)=>`
            <div class="locale-item ${f===0?"selected":""}">
              <span class="locale-flag">${o.flag}</span>
              <span class="locale-item-native">${o.native}</span>
              <span class="locale-item-code">${o.code}</span>
            </div>
          `).join("")}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Dropdown aberto com 3 idiomas.
      </p>
    `}},i={render:()=>`
    ${l}
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      ${e.map(a=>`
        <div class="locale-selector">
          <div class="locale-control variant-default" tabindex="0">
            <span class="locale-flag">${a.flag}</span>
            <span class="locale-text">${a.native}</span>
            <i class="locale-icon bi bi-chevron-down"></i>
          </div>
        </div>
      `).join("")}
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> pt-BR, en-US, es-ES disponíveis.
    </p>
  `},c={render:()=>{const a=e[0];return`
      ${l}
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500;">Default (38px)</label>
          <div class="locale-selector">
            <div class="locale-control variant-default" tabindex="0">
              <span class="locale-flag">${a.flag}</span>
              <span class="locale-text">${a.native}</span>
              <i class="locale-icon bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500;">Compact (32px)</label>
          <div class="locale-selector">
            <div class="locale-control variant-compact" tabindex="0">
              <span class="locale-flag">${a.flag}</span>
              <span class="locale-text">${a.native}</span>
              <i class="locale-icon bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500;">Navbar (só flag)</label>
          <div class="locale-selector">
            <div class="locale-control variant-navbar" tabindex="0">
              <span class="locale-flag">${a.flag}</span>
              <span class="locale-text">${a.native}</span>
              <i class="locale-icon bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    `}},r={args:{showFlag:!1},render:a=>{const n=e[0];return`
      ${l}
      <div class="locale-selector">
        <div class="locale-control variant-default" tabindex="0">
          <span class="locale-text">${n.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Versão minimalista sem bandeira.
      </p>
    `}},d={args:{disabled:!0},render:a=>{const n=e[0];return`
      ${l}
      <div class="locale-selector">
        <div class="locale-control variant-default disabled">
          <span class="locale-flag">${n.flag}</span>
          <span class="locale-text">${n.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Desabilitado quando escola tem idioma fixo.
      </p>
    `}},p={render:()=>{const a=e[0];return`
      ${l}
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
            <span class="locale-flag">${a.flag}</span>
            <span class="locale-text" style="color: #fff;">BR</span>
            <i class="locale-icon bi bi-chevron-down" style="color: #fff;"></i>
          </div>
          <div class="locale-dropdown">
            ${e.map((n,o)=>`
              <div class="locale-item ${o===0?"selected":""}">
                <span class="locale-flag">${n.flag}</span>
                <span class="locale-item-native">${n.native}</span>
                <span class="locale-item-code">${n.code}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Integrado na navbar.
      </p>
    `}},g={render:()=>{const a=e[0];return`
      ${l}
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
                <span class="locale-flag">${a.flag}</span>
                <span class="locale-text">${a.native}</span>
                <i class="locale-icon bi bi-chevron-down"></i>
              </div>
              <div class="locale-dropdown">
                ${e.map((n,o)=>`
                  <div class="locale-item ${o===0?"selected":""}">
                    <span class="locale-flag">${n.flag}</span>
                    <span class="locale-item-native">${n.native}</span>
                    <span class="locale-item-code">${n.code}</span>
                  </div>
                `).join("")}
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
    `}},v={render:()=>`
    ${l}
    <div style="max-width: 500px; text-align: center;">
      <div style="background: #fff; padding: 40px 32px; border-radius: 8px; border: 1px solid #D8D6DE;">
        <div style="width: 80px; height: 80px; background: #E8F5E9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
          <i class="bi bi-translate" style="font-size: 40px; color: #28C76F;"></i>
        </div>
        <h2 style="margin: 0 0 12px; font-size: 24px; font-weight: 600;">Bem-vindo!</h2>
        <p style="margin: 0 0 24px; font-size: 14px; color: #6E6B7B;">Escolha seu idioma</p>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px;">
          ${e.map(a=>`
            <div class="locale-selector" style="width: 100%;">
              <div class="locale-control variant-default" tabindex="0" style="width: 100%;">
                <span class="locale-flag">${a.flag}</span>
                <span class="locale-text">${a.native}</span>
                <i class="locale-icon bi bi-chevron-right"></i>
              </div>
            </div>
          `).join("")}
        </div>
        <button style="width: 100%; padding: 12px 24px; border: none; background: #6E63E8; color: #fff; border-radius: 6px; font-size: 16px; font-weight: 500; cursor: pointer;">
          Continuar
        </button>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Onboarding de novo usuário.
    </p>
  `},x={render:()=>{const a=e[1];return`
      ${l}
      <div class="locale-selector">
        <div class="locale-control variant-default open" tabindex="0">
          <span class="locale-flag">${a.flag}</span>
          <span class="locale-text">${a.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
        <div class="locale-dropdown open">
          ${e.map((n,o)=>`
            <div class="locale-item ${o===1?"selected":""}">
              <span class="locale-flag">${n.flag}</span>
              <span class="locale-item-native">${n.native}</span>
              <span class="locale-item-code">${n.code}</span>
            </div>
          `).join("")}
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
    `}};var b,u,m;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    showFlag: true
  },
  render: args => {
    const current = locales[0];
    return \`
      \${styles}
      <div class="locale-selector">
        <div class="locale-control variant-\${args.variant}" tabindex="0" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open')">
          \${args.showFlag ? \`<span class="locale-flag">\${current.flag}</span>\` : ''}
          <span class="locale-text">\${current.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
        <div class="locale-dropdown">
          \${locales.map((loc, i) => \`
            <div class="locale-item \${i === 0 ? 'selected' : ''}">
              <span class="locale-flag">\${loc.flag}</span>
              <span class="locale-item-native">\${loc.native}</span>
              <span class="locale-item-code">\${loc.code}</span>
            </div>
          \`).join('')}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Seletor idioma padrão com bandeira.
      </p>
    \`;
  }
}`,...(m=(u=s.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var y,h,$;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    showFlag: true
  },
  render: args => {
    const current = locales[0];
    return \`
      \${styles}
      <div class="locale-selector">
        <div class="locale-control variant-\${args.variant} open" tabindex="0">
          \${args.showFlag ? \`<span class="locale-flag">\${current.flag}</span>\` : ''}
          <span class="locale-text">\${current.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
        <div class="locale-dropdown open">
          \${locales.map((loc, i) => \`
            <div class="locale-item \${i === 0 ? 'selected' : ''}">
              <span class="locale-flag">\${loc.flag}</span>
              <span class="locale-item-native">\${loc.native}</span>
              <span class="locale-item-code">\${loc.code}</span>
            </div>
          \`).join('')}
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Dropdown aberto com 3 idiomas.
      </p>
    \`;
  }
}`,...($=(h=t.parameters)==null?void 0:h.docs)==null?void 0:$.source}}};var w,E,z;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="display: flex; flex-direction: column; gap: 16px; width: 300px;">
      \${locales.map(loc => \`
        <div class="locale-selector">
          <div class="locale-control variant-default" tabindex="0">
            <span class="locale-flag">\${loc.flag}</span>
            <span class="locale-text">\${loc.native}</span>
            <i class="locale-icon bi bi-chevron-down"></i>
          </div>
        </div>
      \`).join('')}
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> pt-BR, en-US, es-ES disponíveis.
    </p>
  \`
}`,...(z=(E=i.parameters)==null?void 0:E.docs)==null?void 0:z.source}}};var B,k,D;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => {
    const current = locales[0];
    return \`
      \${styles}
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500;">Default (38px)</label>
          <div class="locale-selector">
            <div class="locale-control variant-default" tabindex="0">
              <span class="locale-flag">\${current.flag}</span>
              <span class="locale-text">\${current.native}</span>
              <i class="locale-icon bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500;">Compact (32px)</label>
          <div class="locale-selector">
            <div class="locale-control variant-compact" tabindex="0">
              <span class="locale-flag">\${current.flag}</span>
              <span class="locale-text">\${current.native}</span>
              <i class="locale-icon bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
        <div>
          <label style="display: block; margin-bottom: 8px; font-size: 13px; font-weight: 500;">Navbar (só flag)</label>
          <div class="locale-selector">
            <div class="locale-control variant-navbar" tabindex="0">
              <span class="locale-flag">\${current.flag}</span>
              <span class="locale-text">\${current.native}</span>
              <i class="locale-icon bi bi-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    \`;
  }
}`,...(D=(k=c.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var S,C,F;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    showFlag: false
  },
  render: args => {
    const current = locales[0];
    return \`
      \${styles}
      <div class="locale-selector">
        <div class="locale-control variant-default" tabindex="0">
          <span class="locale-text">\${current.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Versão minimalista sem bandeira.
      </p>
    \`;
  }
}`,...(F=(C=r.parameters)==null?void 0:C.docs)==null?void 0:F.source}}};var j,L,N;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => {
    const current = locales[0];
    return \`
      \${styles}
      <div class="locale-selector">
        <div class="locale-control variant-default disabled">
          <span class="locale-flag">\${current.flag}</span>
          <span class="locale-text">\${current.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Desabilitado quando escola tem idioma fixo.
      </p>
    \`;
  }
}`,...(N=(L=d.parameters)==null?void 0:L.docs)==null?void 0:N.source}}};var A,I,P;p.parameters={...p.parameters,docs:{...(A=p.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => {
    const current = locales[0];
    return \`
      \${styles}
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
            <span class="locale-flag">\${current.flag}</span>
            <span class="locale-text" style="color: #fff;">BR</span>
            <i class="locale-icon bi bi-chevron-down" style="color: #fff;"></i>
          </div>
          <div class="locale-dropdown">
            \${locales.map((loc, i) => \`
              <div class="locale-item \${i === 0 ? 'selected' : ''}">
                <span class="locale-flag">\${loc.flag}</span>
                <span class="locale-item-native">\${loc.native}</span>
                <span class="locale-item-code">\${loc.code}</span>
              </div>
            \`).join('')}
          </div>
        </div>
      </div>
      <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
        <strong>Contexto:</strong> Integrado na navbar.
      </p>
    \`;
  }
}`,...(P=(I=p.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};var O,R,U;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    const current = locales[0];
    return \`
      \${styles}
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
                <span class="locale-flag">\${current.flag}</span>
                <span class="locale-text">\${current.native}</span>
                <i class="locale-icon bi bi-chevron-down"></i>
              </div>
              <div class="locale-dropdown">
                \${locales.map((loc, i) => \`
                  <div class="locale-item \${i === 0 ? 'selected' : ''}">
                    <span class="locale-flag">\${loc.flag}</span>
                    <span class="locale-item-native">\${loc.native}</span>
                    <span class="locale-item-code">\${loc.code}</span>
                  </div>
                \`).join('')}
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
    \`;
  }
}`,...(U=(R=g.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var V,M,T;v.parameters={...v.parameters,docs:{...(V=v.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="max-width: 500px; text-align: center;">
      <div style="background: #fff; padding: 40px 32px; border-radius: 8px; border: 1px solid #D8D6DE;">
        <div style="width: 80px; height: 80px; background: #E8F5E9; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px;">
          <i class="bi bi-translate" style="font-size: 40px; color: #28C76F;"></i>
        </div>
        <h2 style="margin: 0 0 12px; font-size: 24px; font-weight: 600;">Bem-vindo!</h2>
        <p style="margin: 0 0 24px; font-size: 14px; color: #6E6B7B;">Escolha seu idioma</p>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px;">
          \${locales.map(loc => \`
            <div class="locale-selector" style="width: 100%;">
              <div class="locale-control variant-default" tabindex="0" style="width: 100%;">
                <span class="locale-flag">\${loc.flag}</span>
                <span class="locale-text">\${loc.native}</span>
                <i class="locale-icon bi bi-chevron-right"></i>
              </div>
            </div>
          \`).join('')}
        </div>
        <button style="width: 100%; padding: 12px 24px; border: none; background: #6E63E8; color: #fff; border-radius: 6px; font-size: 16px; font-weight: 500; cursor: pointer;">
          Continuar
        </button>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Onboarding de novo usuário.
    </p>
  \`
}`,...(T=(M=v.parameters)==null?void 0:M.docs)==null?void 0:T.source}}};var _,q,K;x.parameters={...x.parameters,docs:{...(_=x.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => {
    const current = locales[1];
    return \`
      \${styles}
      <div class="locale-selector">
        <div class="locale-control variant-default open" tabindex="0">
          <span class="locale-flag">\${current.flag}</span>
          <span class="locale-text">\${current.native}</span>
          <i class="locale-icon bi bi-chevron-down"></i>
        </div>
        <div class="locale-dropdown open">
          \${locales.map((loc, i) => \`
            <div class="locale-item \${i === 1 ? 'selected' : ''}">
              <span class="locale-flag">\${loc.flag}</span>
              <span class="locale-item-native">\${loc.native}</span>
              <span class="locale-item-code">\${loc.code}</span>
            </div>
          \`).join('')}
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
    \`;
  }
}`,...(K=(q=x.parameters)==null?void 0:q.docs)==null?void 0:K.source}}};const G=["Default","Opened","AllLanguages","AllVariants","WithoutFlag","Disabled","InNavbar","ConfiguracoesDeConta","OnboardingDeNovoUsuario","KeyboardNavigation"];export{i as AllLanguages,c as AllVariants,g as ConfiguracoesDeConta,s as Default,d as Disabled,p as InNavbar,x as KeyboardNavigation,v as OnboardingDeNovoUsuario,t as Opened,r as WithoutFlag,G as __namedExportsOrder,W as default};
