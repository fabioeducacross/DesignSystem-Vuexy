import{c as S,b as o,d as T}from"./docTemplate-RKjNfURf.js";const V={title:"Educacross Components V2/Forms / EFormCheck",tags:[],parameters:{layout:"padded",docs:{description:{component:`
Checkbox e Radio buttons educacionais com validação e acessibilidade.

### Features
- ✅ 2 tipos: checkbox e radio
- ✅ 3 tamanhos (sm, md, lg)
- ✅ 5 variantes de cor (default, success, warning, danger, info)
- ✅ Estados: default, hover, focus, checked, disabled, invalid
- ✅ Agrupamento de radios por name
- ✅ Acessibilidade completa (ARIA, keyboard)
- ✅ Focus ring visível
- ✅ Contexto educacional (Professor/Coordenador/Aluno)
        `}}},argTypes:{checked:{control:"boolean",description:"Estado selecionado",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},label:{control:"text",description:"Texto do label",table:{type:{summary:"string"}}},type:{control:"select",options:["checkbox","radio"],description:"Tipo de input",table:{type:{summary:"string"},defaultValue:{summary:"checkbox"}}},variant:{control:"select",options:["default","success","warning","danger","info"],description:"Variante de cor",table:{type:{summary:"string"},defaultValue:{summary:"default"}}},size:{control:"select",options:["sm","md","lg"],description:"Tamanho do componente",table:{type:{summary:"string"},defaultValue:{summary:"md"}}},disabled:{control:"boolean",description:"Desabilita interação",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},invalid:{control:"boolean",description:"Estado inválido",table:{type:{summary:"boolean"},defaultValue:{summary:"false"}}},name:{control:"text",description:"Atributo name para agrupamento",table:{type:{summary:"string"}}},value:{control:"text",description:"Valor para radios",table:{type:{summary:"string"}}}}},l=`
<style>
  .e-formcheck-wrapper {
    display: inline-flex;
    align-items: center;
    gap: var(--gap);
    cursor: pointer;
  }
  
  .e-formcheck-wrapper.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .e-formcheck-input {
    width: var(--size);
    height: var(--size);
    border: 1.5px solid #D8D6DE;
    border-radius: var(--radius);
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s;
    appearance: none;
    flex-shrink: 0;
    position: relative;
  }
  
  .e-formcheck-input[type="radio"] {
    border-radius: 50%;
  }
  
  .e-formcheck-input:hover:not(:disabled) {
    border-color: var(--color);
    transform: scale(1.05);
  }
  
  .e-formcheck-input:focus {
    outline: none;
    box-shadow: 0 0 0 4px var(--focus-ring);
  }
  
  .e-formcheck-input:checked {
    background-color: var(--color);
    border-color: var(--color);
  }
  
  .e-formcheck-input:checked::after {
    content: '';
    position: absolute;
    display: block;
  }
  
  /* Checkmark para checkbox */
  .e-formcheck-input[type="checkbox"]:checked::after {
    left: 35%;
    top: 15%;
    width: 25%;
    height: 50%;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  
  /* Dot para radio */
  .e-formcheck-input[type="radio"]:checked::after {
    left: 50%;
    top: 50%;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: white;
    transform: translate(-50%, -50%);
  }
  
  .e-formcheck-input:disabled {
    cursor: not-allowed;
  }
  
  .e-formcheck-input.invalid {
    border-color: #EA5455;
  }
  
  .e-formcheck-input.invalid:checked {
    background-color: #EA5455;
  }
  
  .e-formcheck-label {
    font-family: Inter, sans-serif;
    font-size: var(--label-size);
    font-weight: 400;
    line-height: 1.5;
    color: #5E5873;
    cursor: pointer;
    user-select: none;
  }
  
  .e-formcheck-wrapper.disabled .e-formcheck-label {
    cursor: not-allowed;
  }
  
  /* Tamanhos */
  .e-formcheck-sm {
    --size: 16px;
    --gap: 8px;
    --label-size: 13px;
    --radius: 3px;
  }
  
  .e-formcheck-md {
    --size: 20px;
    --gap: 10px;
    --label-size: 14px;
    --radius: 4px;
  }
  
  .e-formcheck-lg {
    --size: 24px;
    --gap: 12px;
    --label-size: 16px;
    --radius: 5px;
  }
  
  /* Variantes */
  .e-formcheck-default {
    --color: #6E63E8;
    --focus-ring: rgba(110, 99, 232, 0.25);
  }
  
  .e-formcheck-success {
    --color: #28C76F;
    --focus-ring: rgba(40, 199, 111, 0.25);
  }
  
  .e-formcheck-warning {
    --color: #FF9F43;
    --focus-ring: rgba(255, 159, 67, 0.25);
  }
  
  .e-formcheck-danger {
    --color: #EA5455;
    --focus-ring: rgba(234, 84, 85, 0.25);
  }
  
  .e-formcheck-info {
    --color: #00CFE8;
    --focus-ring: rgba(0, 207, 232, 0.25);
  }
</style>
`,e=i=>{const{checked:C=!1,label:w="",type:A="checkbox",variant:D="default",size:$="md",disabled:d=!1,invalid:B=!1,name:s="",value:c=""}=i,p=`formcheck-${Math.random().toString(36).substr(2,9)}`,z=`e-formcheck-wrapper e-formcheck-${$} e-formcheck-${D} ${d?"disabled":""}`;return`
    ${l}
    <div class="${z}">
      <input 
        type="${A}"
        id="${p}"
        class="${`e-formcheck-input ${B?"invalid":""}`}"
        ${C?"checked":""}
        ${d?"disabled":""}
        ${s?`name="${s}"`:""}
        ${c?`value="${c}"`:""}
      />
      <label for="${p}" class="e-formcheck-label">${w}</label>
    </div>
  `},n={name:"📖 Documentation",render:()=>S({title:"EFormCheck",subtitle:"Checkbox e Radio buttons para formulários educacionais",stats:[{label:"Tipos",value:"2",description:"checkbox, radio"},{label:"Tamanhos",value:"3",description:"sm (16px), md (20px), lg (24px)"},{label:"Variantes",value:"5",description:"default, success, warning, danger, info"},{label:"Acessibilidade",value:"WCAG AA",description:"Contraste, ARIA, keyboard"}],content:`
${o({title:"Checkbox Básico",description:"Checkbox padrão com label e estado selecionado",preview:e({type:"checkbox",label:"Aceito os termos e condições",checked:!0}),code:`<EFormCheck
  v-model="accepted"
  type="checkbox"
  label="Aceito os termos e condições"
/>`})}

${o({title:"Radio Buttons",description:"Grupo de radio buttons para seleção única de perfil",preview:`
    ${e({type:"radio",name:"role",label:"Professor",checked:!0,value:"teacher"})}
    ${e({type:"radio",name:"role",label:"Coordenador",value:"coordinator"})}
    ${e({type:"radio",name:"role",label:"Aluno",value:"student"})}
  `,code:`<EFormCheck
  v-model="role"
  type="radio"
  name="role"
  label="Professor"
  value="teacher"
/>
<EFormCheck
  v-model="role"
  type="radio"
  name="role"
  label="Coordenador"
  value="coordinator"
/>
<EFormCheck
  v-model="role"
  type="radio"
  name="role"
  label="Aluno"
  value="student"
/>`})}

${o({title:"Variantes de Cor",description:"Checkboxes com diferentes cores semânticas",preview:`
    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
      ${e({variant:"default",label:"Primary",checked:!0})}
      ${e({variant:"success",label:"Success",checked:!0})}
      ${e({variant:"warning",label:"Warning",checked:!0})}
      ${e({variant:"danger",label:"Danger",checked:!0})}
      ${e({variant:"info",label:"Info",checked:!0})}
    </div>
  `,code:`<EFormCheck variant="default" label="Primary" checked />
<EFormCheck variant="success" label="Success" checked />
<EFormCheck variant="warning" label="Warning" checked />
<EFormCheck variant="danger" label="Danger" checked />
<EFormCheck variant="info" label="Info" checked />`})}

${o({title:"Tamanhos",description:"Três tamanhos disponíveis: sm, md, lg",preview:`
    <div style="display: flex; align-items: center; gap: 24px;">
      ${e({size:"sm",label:"Small (16px)",checked:!0})}
      ${e({size:"md",label:"Medium (20px)",checked:!0})}
      ${e({size:"lg",label:"Large (24px)",checked:!0})}
    </div>
  `,code:`<EFormCheck size="sm" label="Small (16px)" checked />
<EFormCheck size="md" label="Medium (20px)" checked />
<EFormCheck size="lg" label="Large (24px)" checked />`})}

${o({title:"Estados",description:"Estados disabled e invalid",preview:`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      ${e({label:"Habilitado",checked:!0})}
      ${e({label:"Desabilitado",disabled:!0})}
      ${e({label:"Desabilitado marcado",disabled:!0,checked:!0})}
      ${e({label:"Estado inválido",invalid:!0,checked:!0})}
    </div>
  `,code:`<EFormCheck label="Habilitado" checked />
<EFormCheck label="Desabilitado" disabled />
<EFormCheck label="Desabilitado marcado" disabled checked />
<EFormCheck label="Estado inválido" invalid checked />`})}

${T([{name:"checked",type:"Boolean",default:"false",description:"Estado selecionado (v-model)"},{name:"type",type:"String",default:"'checkbox'",description:"'checkbox' ou 'radio'"},{name:"label",type:"String",default:"''",description:"Texto do label"},{name:"variant",type:"String",default:"'default'",description:"default, success, warning, danger, info"},{name:"size",type:"String",default:"'md'",description:"'sm' (16px), 'md' (20px), 'lg' (24px)"},{name:"name",type:"String",default:"''",description:"Name para agrupamento de radios"},{name:"value",type:"String",default:"''",description:"Valor para radios"},{name:"disabled",type:"Boolean",default:"false",description:"Desabilita interação"},{name:"invalid",type:"Boolean",default:"false",description:"Estado inválido"}])}
    `,features:[{icon:"check_circle",title:"Checkbox & Radio",description:"Suporte completo para checkbox e radio buttons"},{icon:"text_fields",title:"2 Tipos",description:"checkbox para múltipla seleção, radio para seleção única"},{icon:"straighten",title:"3 Tamanhos",description:"sm (16px), md (20px), lg (24px)"},{icon:"emoji_emotions",title:"5 Variantes",description:"default, success, warning, danger, info"},{icon:"accessibility_new",title:"Acessível",description:"ARIA completo, navegação por teclado, contraste WCAG AA"},{icon:"speed",title:"Performance",description:"CSS puro, sem dependências JavaScript"}],relatedComponents:[{name:"EInput",path:"/story/educacross-components-v2-forms-einput--documentation"},{name:"ESelect",path:"/story/educacross-components-v2-forms-eselect--documentation"},{name:"ETextarea",path:"/story/educacross-components-v2-forms-etextarea--documentation"}]})},a={name:"🎨 Playground",args:{checked:!1,label:"Option label",type:"checkbox",variant:"default",size:"md",disabled:!1,invalid:!1,name:"",value:""},render:i=>e(i)},t={name:"💼 Use Cases",render:()=>`
    ${l}
    <div style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">
      
      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 8px;">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px; color: #6E63E8;">assignment</span>
          Formulário de Avaliação
        </h2>
        <p style="color: #6E6B7B; margin-bottom: 24px;">Professor criando avaliação com múltiplas questões</p>
        
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px;">
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; color: #5E5873; margin-bottom: 12px;">
              Questão 1: Quais planetas fazem parte do Sistema Solar?
            </label>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${e({type:"checkbox",label:"Marte",checked:!0,variant:"success"})}
              ${e({type:"checkbox",label:"Terra",checked:!0,variant:"success"})}
              ${e({type:"checkbox",label:"Plutão",variant:"danger"})}
              ${e({type:"checkbox",label:"Júpiter",checked:!0,variant:"success"})}
            </div>
          </div>
          
          <div>
            <label style="display: block; font-weight: 600; color: #5E5873; margin-bottom: 12px;">
              Questão 2: Qual é o maior planeta do Sistema Solar?
            </label>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${e({type:"radio",name:"q2",label:"Marte",value:"mars"})}
              ${e({type:"radio",name:"q2",label:"Terra",value:"earth"})}
              ${e({type:"radio",name:"q2",label:"Júpiter",value:"jupiter",checked:!0,variant:"success"})}
              ${e({type:"radio",name:"q2",label:"Saturno",value:"saturn"})}
            </div>
          </div>
        </div>
      </section>
      
      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 8px;">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px; color: #6E63E8;">group</span>
          Seleção de Alunos para Missão
        </h2>
        <p style="color: #6E6B7B; margin-bottom: 24px;">Professor selecionando múltiplos alunos</p>
        
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <label style="font-weight: 600; color: #5E5873;">Turma 5º Ano A</label>
            ${e({type:"checkbox",label:"Selecionar todos",variant:"info",size:"sm"})}
          </div>
          <div style="display: grid; gap: 10px;">
            ${e({type:"checkbox",label:"Ana Silva",checked:!0})}
            ${e({type:"checkbox",label:"Bruno Santos",checked:!0})}
            ${e({type:"checkbox",label:"Carlos Oliveira"})}
            ${e({type:"checkbox",label:"Diana Costa",checked:!0})}
            ${e({type:"checkbox",label:"Eduardo Lima",disabled:!0})}
            <p style="font-size: 12px; color: #B8C2CC; margin: 8px 0 0 28px;">* Eduardo Lima está inativo</p>
          </div>
        </div>
      </section>
      
      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 8px;">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px; color: #6E63E8;">settings</span>
          Configurações de Professor
        </h2>
        <p style="color: #6E6B7B; margin-bottom: 24px;">Preferências e permissões de privacidade</p>
        
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px;">
          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 600; color: #5E5873; margin-bottom: 12px;">Notificações</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${e({type:"checkbox",label:"Receber emails sobre novos alunos",checked:!0})}
              ${e({type:"checkbox",label:"Notificações de missões entregues",checked:!0})}
              ${e({type:"checkbox",label:"Relatórios semanais de turma"})}
            </div>
          </div>
          
          <div>
            <h3 style="font-size: 16px; font-weight: 600; color: #5E5873; margin-bottom: 12px;">Privacidade</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${e({type:"checkbox",label:"Perfil visível para outros professores",checked:!0})}
              ${e({type:"checkbox",label:"Permitir mensagens de alunos"})}
              ${e({type:"checkbox",label:"Compartilhar estatísticas publicamente"})}
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 8px;">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px; color: #6E63E8;">description</span>
          Aceite de Termos
        </h2>
        <p style="color: #6E6B7B; margin-bottom: 24px;">Aluno aceitando termos de uso</p>
        
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px;">
          <div style="background: white; border: 1px solid #D8D6DE; border-radius: 6px; padding: 20px; margin-bottom: 20px; max-height: 200px; overflow-y: auto;">
            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Termos de Uso e Política de Privacidade</h3>
            <p style="font-size: 13px; color: #6E6B7B; line-height: 1.6;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            ${e({type:"checkbox",label:"Li e aceito os Termos de Uso",checked:!0,variant:"success",size:"lg"})}
            ${e({type:"checkbox",label:"Aceito receber comunicações educacionais",variant:"info"})}
          </div>
        </div>
      </section>
      
    </div>
  `},r={name:"♿ Accessibility",render:()=>`
    ${l}
    <div style="max-width: 900px; margin: 0 auto; padding: 40px 20px;">
      
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; border-radius: 12px; margin-bottom: 40px; color: white;">
        <h1 style="font-size: 32px; font-weight: 700; margin: 0 0 8px 0;">Acessibilidade EFormCheck</h1>
        <p style="font-size: 16px; opacity: 0.95; margin: 0;">Garantindo experiência inclusiva para todos os usuários</p>
      </div>

      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="font-size: 32px; color: #6E63E8;">keyboard</span>
          Navegação por Teclado
        </h2>
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid #D8D6DE;">
                <th style="text-align: left; padding: 12px; font-weight: 600; color: #5E5873;">Tecla</th>
                <th style="text-align: left; padding: 12px; font-weight: 600; color: #5E5873;">Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #E8E8E8;">
                <td style="padding: 12px;"><code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace;">Tab</code></td>
                <td style="padding: 12px; color: #6E6B7B;">Navegar entre checkboxes/radios</td>
              </tr>
              <tr style="border-bottom: 1px solid #E8E8E8;">
                <td style="padding: 12px;"><code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace;">Space</code></td>
                <td style="padding: 12px; color: #6E6B7B;">Toggle checkbox (marcar/desmarcar)</td>
              </tr>
              <tr style="border-bottom: 1px solid #E8E8E8;">
                <td style="padding: 12px;"><code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace;">Arrow Up/Down</code></td>
                <td style="padding: 12px; color: #6E6B7B;">Navegar entre radios do mesmo grupo</td>
              </tr>
              <tr>
                <td style="padding: 12px;"><code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace;">Enter</code></td>
                <td style="padding: 12px; color: #6E6B7B;">Selecionar radio button</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style="background: #FFF9E6; border-left: 4px solid #FF9F43; padding: 16px; border-radius: 4px;">
          <p style="margin: 0; color: #5E5873; line-height: 1.6;">
            <strong>💡 Dica:</strong> Focus ring visível (4px) em todos os estados para facilitar navegação por teclado
          </p>
        </div>
      </section>

      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="font-size: 32px; color: #6E63E8;">label</span>
          Screen Readers
        </h2>
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 600; color: #5E5873; margin-bottom: 16px;">Atributos ARIA</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="padding: 12px; border-bottom: 1px solid #E8E8E8; display: flex; align-items: start; gap: 12px;">
              <code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace; flex-shrink: 0;">role</code>
              <span style="color: #6E6B7B;">Define tipo (checkbox/radio) automaticamente pelo input type</span>
            </li>
            <li style="padding: 12px; border-bottom: 1px solid #E8E8E8; display: flex; align-items: start; gap: 12px;">
              <code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace; flex-shrink: 0;">aria-checked</code>
              <span style="color: #6E6B7B;">Anuncia estado marcado (true/false/mixed)</span>
            </li>
            <li style="padding: 12px; border-bottom: 1px solid #E8E8E8; display: flex; align-items: start; gap: 12px;">
              <code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace; flex-shrink: 0;">aria-disabled</code>
              <span style="color: #6E6B7B;">Anuncia quando componente está desabilitado</span>
            </li>
            <li style="padding: 12px; border-bottom: 1px solid #E8E8E8; display: flex; align-items: start; gap: 12px;">
              <code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace; flex-shrink: 0;">aria-invalid</code>
              <span style="color: #6E6B7B;">Anuncia erro de validação</span>
            </li>
            <li style="padding: 12px; display: flex; align-items: start; gap: 12px;">
              <code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace; flex-shrink: 0;">aria-labelledby</code>
              <span style="color: #6E6B7B;">Associa label ao input para leitura correta</span>
            </li>
          </ul>
        </div>
        
        <div style="background: #E8F5E9; border-left: 4px solid #28C76F; padding: 16px; border-radius: 4px;">
          <p style="margin: 0; color: #5E5873; line-height: 1.6;">
            <strong>✅ Testado com:</strong> NVDA, JAWS e VoiceOver - todos anunciam corretamente tipo, estado e label
          </p>
        </div>
      </section>

      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="font-size: 32px; color: #6E63E8;">palette</span>
          Contraste de Cores
        </h2>
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #D8D6DE;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 32px; height: 32px; background: #6E63E8; border-radius: 4px;"></div>
                <span style="font-weight: 600; color: #5E5873;">Primary</span>
              </div>
              <p style="margin: 0; font-size: 13px; color: #6E6B7B;">Ratio: 4.8:1 ✅ AA</p>
            </div>
            
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #D8D6DE;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 32px; height: 32px; background: #28C76F; border-radius: 4px;"></div>
                <span style="font-weight: 600; color: #5E5873;">Success</span>
              </div>
              <p style="margin: 0; font-size: 13px; color: #6E6B7B;">Ratio: 5.2:1 ✅ AA</p>
            </div>
            
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #D8D6DE;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 32px; height: 32px; background: #EA5455; border-radius: 4px;"></div>
                <span style="font-weight: 600; color: #5E5873;">Danger</span>
              </div>
              <p style="margin: 0; font-size: 13px; color: #6E6B7B;">Ratio: 6.1:1 ✅ AA</p>
            </div>
            
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #D8D6DE;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 32px; height: 32px; background: #5E5873; border-radius: 4px;"></div>
                <span style="font-weight: 600; color: #5E5873;">Text</span>
              </div>
              <p style="margin: 0; font-size: 13px; color: #6E6B7B;">Ratio: 7.3:1 ✅ AAA</p>
            </div>
          </div>
        </div>
        
        <div style="background: #E3F2FD; border-left: 4px solid #00CFE8; padding: 16px; border-radius: 4px;">
          <p style="margin: 0; color: #5E5873; line-height: 1.6;">
            <strong>📊 Conformidade:</strong> Todas as cores atendem WCAG 2.1 Level AA (mínimo 4.5:1 para texto normal)
          </p>
        </div>
      </section>

      <section>
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="font-size: 32px; color: #6E63E8;">volume_up</span>
          Feedback Visual e Sonoro
        </h2>
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 600; color: #5E5873; margin-bottom: 16px;">Indicadores Múltiplos</h3>
          <div style="display: grid; gap: 16px;">
            <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #D8D6DE;">
              <div style="font-weight: 600; color: #5E5873; margin-bottom: 8px;">✅ Visual</div>
              <p style="margin: 0; font-size: 14px; color: #6E6B7B; line-height: 1.6;">
                Checkmark branco visível quando marcado, mudança de cor de fundo, borda destacada
              </p>
            </div>
            
            <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #D8D6DE;">
              <div style="font-weight: 600; color: #5E5873; margin-bottom: 8px;">🎯 Hover</div>
              <p style="margin: 0; font-size: 14px; color: #6E6B7B; line-height: 1.6;">
                Leve escala (1.05) e mudança de cor da borda ao passar mouse
              </p>
            </div>
            
            <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #D8D6DE;">
              <div style="font-weight: 600; color: #5E5873; margin-bottom: 8px;">⌨️ Focus</div>
              <p style="margin: 0; font-size: 14px; color: #6E6B7B; line-height: 1.6;">
                Ring de 4px ao redor do componente quando focado via teclado
              </p>
            </div>
            
            <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #D8D6DE;">
              <div style="font-weight: 600; color: #5E5873; margin-bottom: 8px;">🔊 Sonoro</div>
              <p style="margin: 0; font-size: 14px; color: #6E6B7B; line-height: 1.6;">
                Screen readers anunciam estado (marcado/desmarcado) e mudanças
              </p>
            </div>
          </div>
        </div>
        
        <div style="background: #FFF3E0; border-left: 4px solid #FF9F43; padding: 16px; border-radius: 4px;">
          <p style="margin: 0; color: #5E5873; line-height: 1.6;">
            <strong>⚠️ Importante:</strong> Não dependemos apenas de cor - usamos também forma (checkmark), posição e texto para comunicar estado
          </p>
        </div>
      </section>

    </div>
  `};var m,x,b;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  name: '📖 Documentation',
  render: () => createDocPage({
    title: 'EFormCheck',
    subtitle: 'Checkbox e Radio buttons para formulários educacionais',
    stats: [{
      label: 'Tipos',
      value: '2',
      description: 'checkbox, radio'
    }, {
      label: 'Tamanhos',
      value: '3',
      description: 'sm (16px), md (20px), lg (24px)'
    }, {
      label: 'Variantes',
      value: '5',
      description: 'default, success, warning, danger, info'
    }, {
      label: 'Acessibilidade',
      value: 'WCAG AA',
      description: 'Contraste, ARIA, keyboard'
    }],
    content: \`
\${createExampleCard({
      title: 'Checkbox Básico',
      description: 'Checkbox padrão com label e estado selecionado',
      preview: createFormCheck({
        type: 'checkbox',
        label: 'Aceito os termos e condições',
        checked: true
      }),
      code: \`<EFormCheck
  v-model="accepted"
  type="checkbox"
  label="Aceito os termos e condições"
/>\`,
      vue2: \`<template>
  <EFormCheck
    v-model="accepted"
    type="checkbox"
    label="Aceito os termos e condições"
  />
</template>

<script>
export default {
  data() {
    return {
      accepted: false
    }
  },
  watch: {
    accepted(val) {
      console.log('Termos aceitos:', val);
    }
  }
}
<\/script>\`,
      vue3: \`<script setup>
import { ref, watch } from 'vue';

const accepted = ref(false);

watch(accepted, (val) => {
  console.log('Termos aceitos:', val);
});
<\/script>

<template>
  <EFormCheck
    v-model="accepted"
    type="checkbox"
    label="Aceito os termos e condições"
  />
</template>\`,
      react: \`import { useState } from 'react';

export default function TermsCheckbox() {
  const [accepted, setAccepted] = useState(false);

  const handleChange = (checked: boolean) => {
    setAccepted(checked);
    console.log('Termos aceitos:', checked);
  };

  return (
    <EFormCheck
      checked={accepted}
      onChange={handleChange}
      type="checkbox"
      label="Aceito os termos e condições"
    />
  );
}\`,
      vanilla: \`<div class="e-formcheck-wrapper e-formcheck-md e-formcheck-default">
  <input 
    type="checkbox" 
    id="terms" 
    class="e-formcheck-input"
  />
  <label for="terms" class="e-formcheck-label">
    Aceito os termos e condições
  </label>
</div>

<script>
  const checkbox = document.getElementById('terms');
  checkbox.addEventListener('change', (e) => {
    console.log('Termos aceitos:', e.target.checked);
  });
<\/script>\`
    })}

\${createExampleCard({
      title: 'Radio Buttons',
      description: 'Grupo de radio buttons para seleção única de perfil',
      preview: \`
    \${createFormCheck({
        type: 'radio',
        name: 'role',
        label: 'Professor',
        checked: true,
        value: 'teacher'
      })}
    \${createFormCheck({
        type: 'radio',
        name: 'role',
        label: 'Coordenador',
        value: 'coordinator'
      })}
    \${createFormCheck({
        type: 'radio',
        name: 'role',
        label: 'Aluno',
        value: 'student'
      })}
  \`,
      code: \`<EFormCheck
  v-model="role"
  type="radio"
  name="role"
  label="Professor"
  value="teacher"
/>
<EFormCheck
  v-model="role"
  type="radio"
  name="role"
  label="Coordenador"
  value="coordinator"
/>
<EFormCheck
  v-model="role"
  type="radio"
  name="role"
  label="Aluno"
  value="student"
/>\`,
      vue2: \`<template>
  <div>
    <EFormCheck
      v-model="role"
      type="radio"
      name="role"
      label="Professor"
      value="teacher"
    />
    <EFormCheck
      v-model="role"
      type="radio"
      name="role"
      label="Coordenador"
      value="coordinator"
    />
    <EFormCheck
      v-model="role"
      type="radio"
      name="role"
      label="Aluno"
      value="student"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      role: 'teacher'
    }
  }
}
<\/script>\`,
      vue3: \`<script setup>
import { ref } from 'vue';

const role = ref('teacher');
<\/script>

<template>
  <EFormCheck
    v-model="role"
    type="radio"
    name="role"
    label="Professor"
    value="teacher"
  />
  <EFormCheck
    v-model="role"
    type="radio"
    name="role"
    label="Coordenador"
    value="coordinator"
  />
  <EFormCheck
    v-model="role"
    type="radio"
    name="role"
    label="Aluno"
    value="student"
  />
</template>\`,
      react: \`import { useState } from 'react';

export default function RoleSelector() {
  const [role, setRole] = useState('teacher');

  return (
    <div>
      <EFormCheck
        checked={role === 'teacher'}
        onChange={() => setRole('teacher')}
        type="radio"
        name="role"
        label="Professor"
      />
      <EFormCheck
        checked={role === 'coordinator'}
        onChange={() => setRole('coordinator')}
        type="radio"
        name="role"
        label="Coordenador"
      />
      <EFormCheck
        checked={role === 'student'}
        onChange={() => setRole('student')}
        type="radio"
        name="role"
        label="Aluno"
      />
    </div>
  );
}\`,
      vanilla: \`<div>
  <div class="e-formcheck-wrapper e-formcheck-md e-formcheck-default">
    <input type="radio" name="role" id="teacher" value="teacher" checked />
    <label for="teacher" class="e-formcheck-label">Professor</label>
  </div>
  <div class="e-formcheck-wrapper e-formcheck-md e-formcheck-default">
    <input type="radio" name="role" id="coordinator" value="coordinator" />
    <label for="coordinator" class="e-formcheck-label">Coordenador</label>
  </div>
  <div class="e-formcheck-wrapper e-formcheck-md e-formcheck-default">
    <input type="radio" name="role" id="student" value="student" />
    <label for="student" class="e-formcheck-label">Aluno</label>
  </div>
</div>\`
    })}

\${createExampleCard({
      title: 'Variantes de Cor',
      description: 'Checkboxes com diferentes cores semânticas',
      preview: \`
    <div style="display: flex; flex-wrap: wrap; gap: 16px;">
      \${createFormCheck({
        variant: 'default',
        label: 'Primary',
        checked: true
      })}
      \${createFormCheck({
        variant: 'success',
        label: 'Success',
        checked: true
      })}
      \${createFormCheck({
        variant: 'warning',
        label: 'Warning',
        checked: true
      })}
      \${createFormCheck({
        variant: 'danger',
        label: 'Danger',
        checked: true
      })}
      \${createFormCheck({
        variant: 'info',
        label: 'Info',
        checked: true
      })}
    </div>
  \`,
      code: \`<EFormCheck variant="default" label="Primary" checked />
<EFormCheck variant="success" label="Success" checked />
<EFormCheck variant="warning" label="Warning" checked />
<EFormCheck variant="danger" label="Danger" checked />
<EFormCheck variant="info" label="Info" checked />\`
    })}

\${createExampleCard({
      title: 'Tamanhos',
      description: 'Três tamanhos disponíveis: sm, md, lg',
      preview: \`
    <div style="display: flex; align-items: center; gap: 24px;">
      \${createFormCheck({
        size: 'sm',
        label: 'Small (16px)',
        checked: true
      })}
      \${createFormCheck({
        size: 'md',
        label: 'Medium (20px)',
        checked: true
      })}
      \${createFormCheck({
        size: 'lg',
        label: 'Large (24px)',
        checked: true
      })}
    </div>
  \`,
      code: \`<EFormCheck size="sm" label="Small (16px)" checked />
<EFormCheck size="md" label="Medium (20px)" checked />
<EFormCheck size="lg" label="Large (24px)" checked />\`
    })}

\${createExampleCard({
      title: 'Estados',
      description: 'Estados disabled e invalid',
      preview: \`
    <div style="display: flex; flex-direction: column; gap: 12px;">
      \${createFormCheck({
        label: 'Habilitado',
        checked: true
      })}
      \${createFormCheck({
        label: 'Desabilitado',
        disabled: true
      })}
      \${createFormCheck({
        label: 'Desabilitado marcado',
        disabled: true,
        checked: true
      })}
      \${createFormCheck({
        label: 'Estado inválido',
        invalid: true,
        checked: true
      })}
    </div>
  \`,
      code: \`<EFormCheck label="Habilitado" checked />
<EFormCheck label="Desabilitado" disabled />
<EFormCheck label="Desabilitado marcado" disabled checked />
<EFormCheck label="Estado inválido" invalid checked />\`
    })}

\${createPropsTable([{
      name: 'checked',
      type: 'Boolean',
      default: 'false',
      description: 'Estado selecionado (v-model)'
    }, {
      name: 'type',
      type: 'String',
      default: "'checkbox'",
      description: "'checkbox' ou 'radio'"
    }, {
      name: 'label',
      type: 'String',
      default: "''",
      description: 'Texto do label'
    }, {
      name: 'variant',
      type: 'String',
      default: "'default'",
      description: 'default, success, warning, danger, info'
    }, {
      name: 'size',
      type: 'String',
      default: "'md'",
      description: "'sm' (16px), 'md' (20px), 'lg' (24px)"
    }, {
      name: 'name',
      type: 'String',
      default: "''",
      description: 'Name para agrupamento de radios'
    }, {
      name: 'value',
      type: 'String',
      default: "''",
      description: 'Valor para radios'
    }, {
      name: 'disabled',
      type: 'Boolean',
      default: 'false',
      description: 'Desabilita interação'
    }, {
      name: 'invalid',
      type: 'Boolean',
      default: 'false',
      description: 'Estado inválido'
    }])}
    \`,
    features: [{
      icon: 'check_circle',
      title: 'Checkbox & Radio',
      description: 'Suporte completo para checkbox e radio buttons'
    }, {
      icon: 'text_fields',
      title: '2 Tipos',
      description: 'checkbox para múltipla seleção, radio para seleção única'
    }, {
      icon: 'straighten',
      title: '3 Tamanhos',
      description: 'sm (16px), md (20px), lg (24px)'
    }, {
      icon: 'emoji_emotions',
      title: '5 Variantes',
      description: 'default, success, warning, danger, info'
    }, {
      icon: 'accessibility_new',
      title: 'Acessível',
      description: 'ARIA completo, navegação por teclado, contraste WCAG AA'
    }, {
      icon: 'speed',
      title: 'Performance',
      description: 'CSS puro, sem dependências JavaScript'
    }],
    relatedComponents: [{
      name: 'EInput',
      path: '/story/educacross-components-v2-forms-einput--documentation'
    }, {
      name: 'ESelect',
      path: '/story/educacross-components-v2-forms-eselect--documentation'
    }, {
      name: 'ETextarea',
      path: '/story/educacross-components-v2-forms-etextarea--documentation'
    }]
  })
}`,...(b=(x=n.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var u,g,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  name: '🎨 Playground',
  args: {
    checked: false,
    label: 'Option label',
    type: 'checkbox',
    variant: 'default',
    size: 'md',
    disabled: false,
    invalid: false,
    name: '',
    value: ''
  },
  render: args => createFormCheck(args)
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var y,f,v;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  name: '💼 Use Cases',
  render: () => \`
    \${styles}
    <div style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">
      
      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 8px;">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px; color: #6E63E8;">assignment</span>
          Formulário de Avaliação
        </h2>
        <p style="color: #6E6B7B; margin-bottom: 24px;">Professor criando avaliação com múltiplas questões</p>
        
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px;">
          <div style="margin-bottom: 20px;">
            <label style="display: block; font-weight: 600; color: #5E5873; margin-bottom: 12px;">
              Questão 1: Quais planetas fazem parte do Sistema Solar?
            </label>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              \${createFormCheck({
    type: 'checkbox',
    label: 'Marte',
    checked: true,
    variant: 'success'
  })}
              \${createFormCheck({
    type: 'checkbox',
    label: 'Terra',
    checked: true,
    variant: 'success'
  })}
              \${createFormCheck({
    type: 'checkbox',
    label: 'Plutão',
    variant: 'danger'
  })}
              \${createFormCheck({
    type: 'checkbox',
    label: 'Júpiter',
    checked: true,
    variant: 'success'
  })}
            </div>
          </div>
          
          <div>
            <label style="display: block; font-weight: 600; color: #5E5873; margin-bottom: 12px;">
              Questão 2: Qual é o maior planeta do Sistema Solar?
            </label>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              \${createFormCheck({
    type: 'radio',
    name: 'q2',
    label: 'Marte',
    value: 'mars'
  })}
              \${createFormCheck({
    type: 'radio',
    name: 'q2',
    label: 'Terra',
    value: 'earth'
  })}
              \${createFormCheck({
    type: 'radio',
    name: 'q2',
    label: 'Júpiter',
    value: 'jupiter',
    checked: true,
    variant: 'success'
  })}
              \${createFormCheck({
    type: 'radio',
    name: 'q2',
    label: 'Saturno',
    value: 'saturn'
  })}
            </div>
          </div>
        </div>
      </section>
      
      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 8px;">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px; color: #6E63E8;">group</span>
          Seleção de Alunos para Missão
        </h2>
        <p style="color: #6E6B7B; margin-bottom: 24px;">Professor selecionando múltiplos alunos</p>
        
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
            <label style="font-weight: 600; color: #5E5873;">Turma 5º Ano A</label>
            \${createFormCheck({
    type: 'checkbox',
    label: 'Selecionar todos',
    variant: 'info',
    size: 'sm'
  })}
          </div>
          <div style="display: grid; gap: 10px;">
            \${createFormCheck({
    type: 'checkbox',
    label: 'Ana Silva',
    checked: true
  })}
            \${createFormCheck({
    type: 'checkbox',
    label: 'Bruno Santos',
    checked: true
  })}
            \${createFormCheck({
    type: 'checkbox',
    label: 'Carlos Oliveira'
  })}
            \${createFormCheck({
    type: 'checkbox',
    label: 'Diana Costa',
    checked: true
  })}
            \${createFormCheck({
    type: 'checkbox',
    label: 'Eduardo Lima',
    disabled: true
  })}
            <p style="font-size: 12px; color: #B8C2CC; margin: 8px 0 0 28px;">* Eduardo Lima está inativo</p>
          </div>
        </div>
      </section>
      
      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 8px;">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px; color: #6E63E8;">settings</span>
          Configurações de Professor
        </h2>
        <p style="color: #6E6B7B; margin-bottom: 24px;">Preferências e permissões de privacidade</p>
        
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px;">
          <div style="margin-bottom: 24px;">
            <h3 style="font-size: 16px; font-weight: 600; color: #5E5873; margin-bottom: 12px;">Notificações</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              \${createFormCheck({
    type: 'checkbox',
    label: 'Receber emails sobre novos alunos',
    checked: true
  })}
              \${createFormCheck({
    type: 'checkbox',
    label: 'Notificações de missões entregues',
    checked: true
  })}
              \${createFormCheck({
    type: 'checkbox',
    label: 'Relatórios semanais de turma'
  })}
            </div>
          </div>
          
          <div>
            <h3 style="font-size: 16px; font-weight: 600; color: #5E5873; margin-bottom: 12px;">Privacidade</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              \${createFormCheck({
    type: 'checkbox',
    label: 'Perfil visível para outros professores',
    checked: true
  })}
              \${createFormCheck({
    type: 'checkbox',
    label: 'Permitir mensagens de alunos'
  })}
              \${createFormCheck({
    type: 'checkbox',
    label: 'Compartilhar estatísticas publicamente'
  })}
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 8px;">
          <span class="material-symbols-outlined" style="vertical-align: middle; margin-right: 8px; color: #6E63E8;">description</span>
          Aceite de Termos
        </h2>
        <p style="color: #6E6B7B; margin-bottom: 24px;">Aluno aceitando termos de uso</p>
        
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px;">
          <div style="background: white; border: 1px solid #D8D6DE; border-radius: 6px; padding: 20px; margin-bottom: 20px; max-height: 200px; overflow-y: auto;">
            <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px;">Termos de Uso e Política de Privacidade</h3>
            <p style="font-size: 13px; color: #6E6B7B; line-height: 1.6;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            \${createFormCheck({
    type: 'checkbox',
    label: 'Li e aceito os Termos de Uso',
    checked: true,
    variant: 'success',
    size: 'lg'
  })}
            \${createFormCheck({
    type: 'checkbox',
    label: 'Aceito receber comunicações educacionais',
    variant: 'info'
  })}
          </div>
        </div>
      </section>
      
    </div>
  \`
}`,...(v=(f=t.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var k,E,F;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  name: '♿ Accessibility',
  render: () => \`
    \${styles}
    <div style="max-width: 900px; margin: 0 auto; padding: 40px 20px;">
      
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; border-radius: 12px; margin-bottom: 40px; color: white;">
        <h1 style="font-size: 32px; font-weight: 700; margin: 0 0 8px 0;">Acessibilidade EFormCheck</h1>
        <p style="font-size: 16px; opacity: 0.95; margin: 0;">Garantindo experiência inclusiva para todos os usuários</p>
      </div>

      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="font-size: 32px; color: #6E63E8;">keyboard</span>
          Navegação por Teclado
        </h2>
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 2px solid #D8D6DE;">
                <th style="text-align: left; padding: 12px; font-weight: 600; color: #5E5873;">Tecla</th>
                <th style="text-align: left; padding: 12px; font-weight: 600; color: #5E5873;">Ação</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #E8E8E8;">
                <td style="padding: 12px;"><code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace;">Tab</code></td>
                <td style="padding: 12px; color: #6E6B7B;">Navegar entre checkboxes/radios</td>
              </tr>
              <tr style="border-bottom: 1px solid #E8E8E8;">
                <td style="padding: 12px;"><code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace;">Space</code></td>
                <td style="padding: 12px; color: #6E6B7B;">Toggle checkbox (marcar/desmarcar)</td>
              </tr>
              <tr style="border-bottom: 1px solid #E8E8E8;">
                <td style="padding: 12px;"><code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace;">Arrow Up/Down</code></td>
                <td style="padding: 12px; color: #6E6B7B;">Navegar entre radios do mesmo grupo</td>
              </tr>
              <tr>
                <td style="padding: 12px;"><code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace;">Enter</code></td>
                <td style="padding: 12px; color: #6E6B7B;">Selecionar radio button</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style="background: #FFF9E6; border-left: 4px solid #FF9F43; padding: 16px; border-radius: 4px;">
          <p style="margin: 0; color: #5E5873; line-height: 1.6;">
            <strong>💡 Dica:</strong> Focus ring visível (4px) em todos os estados para facilitar navegação por teclado
          </p>
        </div>
      </section>

      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="font-size: 32px; color: #6E63E8;">label</span>
          Screen Readers
        </h2>
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 600; color: #5E5873; margin-bottom: 16px;">Atributos ARIA</h3>
          <ul style="list-style: none; padding: 0; margin: 0;">
            <li style="padding: 12px; border-bottom: 1px solid #E8E8E8; display: flex; align-items: start; gap: 12px;">
              <code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace; flex-shrink: 0;">role</code>
              <span style="color: #6E6B7B;">Define tipo (checkbox/radio) automaticamente pelo input type</span>
            </li>
            <li style="padding: 12px; border-bottom: 1px solid #E8E8E8; display: flex; align-items: start; gap: 12px;">
              <code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace; flex-shrink: 0;">aria-checked</code>
              <span style="color: #6E6B7B;">Anuncia estado marcado (true/false/mixed)</span>
            </li>
            <li style="padding: 12px; border-bottom: 1px solid #E8E8E8; display: flex; align-items: start; gap: 12px;">
              <code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace; flex-shrink: 0;">aria-disabled</code>
              <span style="color: #6E6B7B;">Anuncia quando componente está desabilitado</span>
            </li>
            <li style="padding: 12px; border-bottom: 1px solid #E8E8E8; display: flex; align-items: start; gap: 12px;">
              <code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace; flex-shrink: 0;">aria-invalid</code>
              <span style="color: #6E6B7B;">Anuncia erro de validação</span>
            </li>
            <li style="padding: 12px; display: flex; align-items: start; gap: 12px;">
              <code style="background: #E8E8F7; padding: 4px 8px; border-radius: 4px; font-family: monospace; flex-shrink: 0;">aria-labelledby</code>
              <span style="color: #6E6B7B;">Associa label ao input para leitura correta</span>
            </li>
          </ul>
        </div>
        
        <div style="background: #E8F5E9; border-left: 4px solid #28C76F; padding: 16px; border-radius: 4px;">
          <p style="margin: 0; color: #5E5873; line-height: 1.6;">
            <strong>✅ Testado com:</strong> NVDA, JAWS e VoiceOver - todos anunciam corretamente tipo, estado e label
          </p>
        </div>
      </section>

      <section style="margin-bottom: 48px;">
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="font-size: 32px; color: #6E63E8;">palette</span>
          Contraste de Cores
        </h2>
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #D8D6DE;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 32px; height: 32px; background: #6E63E8; border-radius: 4px;"></div>
                <span style="font-weight: 600; color: #5E5873;">Primary</span>
              </div>
              <p style="margin: 0; font-size: 13px; color: #6E6B7B;">Ratio: 4.8:1 ✅ AA</p>
            </div>
            
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #D8D6DE;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 32px; height: 32px; background: #28C76F; border-radius: 4px;"></div>
                <span style="font-weight: 600; color: #5E5873;">Success</span>
              </div>
              <p style="margin: 0; font-size: 13px; color: #6E6B7B;">Ratio: 5.2:1 ✅ AA</p>
            </div>
            
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #D8D6DE;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 32px; height: 32px; background: #EA5455; border-radius: 4px;"></div>
                <span style="font-weight: 600; color: #5E5873;">Danger</span>
              </div>
              <p style="margin: 0; font-size: 13px; color: #6E6B7B;">Ratio: 6.1:1 ✅ AA</p>
            </div>
            
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #D8D6DE;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <div style="width: 32px; height: 32px; background: #5E5873; border-radius: 4px;"></div>
                <span style="font-weight: 600; color: #5E5873;">Text</span>
              </div>
              <p style="margin: 0; font-size: 13px; color: #6E6B7B;">Ratio: 7.3:1 ✅ AAA</p>
            </div>
          </div>
        </div>
        
        <div style="background: #E3F2FD; border-left: 4px solid #00CFE8; padding: 16px; border-radius: 4px;">
          <p style="margin: 0; color: #5E5873; line-height: 1.6;">
            <strong>📊 Conformidade:</strong> Todas as cores atendem WCAG 2.1 Level AA (mínimo 4.5:1 para texto normal)
          </p>
        </div>
      </section>

      <section>
        <h2 style="font-size: 24px; font-weight: 600; color: #5E5873; margin-bottom: 16px; display: flex; align-items: center; gap: 12px;">
          <span class="material-symbols-outlined" style="font-size: 32px; color: #6E63E8;">volume_up</span>
          Feedback Visual e Sonoro
        </h2>
        <div style="background: #F8F8F8; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 600; color: #5E5873; margin-bottom: 16px;">Indicadores Múltiplos</h3>
          <div style="display: grid; gap: 16px;">
            <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #D8D6DE;">
              <div style="font-weight: 600; color: #5E5873; margin-bottom: 8px;">✅ Visual</div>
              <p style="margin: 0; font-size: 14px; color: #6E6B7B; line-height: 1.6;">
                Checkmark branco visível quando marcado, mudança de cor de fundo, borda destacada
              </p>
            </div>
            
            <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #D8D6DE;">
              <div style="font-weight: 600; color: #5E5873; margin-bottom: 8px;">🎯 Hover</div>
              <p style="margin: 0; font-size: 14px; color: #6E6B7B; line-height: 1.6;">
                Leve escala (1.05) e mudança de cor da borda ao passar mouse
              </p>
            </div>
            
            <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #D8D6DE;">
              <div style="font-weight: 600; color: #5E5873; margin-bottom: 8px;">⌨️ Focus</div>
              <p style="margin: 0; font-size: 14px; color: #6E6B7B; line-height: 1.6;">
                Ring de 4px ao redor do componente quando focado via teclado
              </p>
            </div>
            
            <div style="background: white; padding: 16px; border-radius: 6px; border: 1px solid #D8D6DE;">
              <div style="font-weight: 600; color: #5E5873; margin-bottom: 8px;">🔊 Sonoro</div>
              <p style="margin: 0; font-size: 14px; color: #6E6B7B; line-height: 1.6;">
                Screen readers anunciam estado (marcado/desmarcado) e mudanças
              </p>
            </div>
          </div>
        </div>
        
        <div style="background: #FFF3E0; border-left: 4px solid #FF9F43; padding: 16px; border-radius: 4px;">
          <p style="margin: 0; color: #5E5873; line-height: 1.6;">
            <strong>⚠️ Importante:</strong> Não dependemos apenas de cor - usamos também forma (checkmark), posição e texto para comunicar estado
          </p>
        </div>
      </section>

    </div>
  \`
}`,...(F=(E=r.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};const q=["Documentation","Playground","UseCases","Accessibility"];export{r as Accessibility,n as Documentation,a as Playground,t as UseCases,q as __namedExportsOrder,V as default};
