import{f as W,a as X,d as Z}from"./snippets-m8t1HIl1.js";const ta={title:"Organisms/Forms/FormValidation",tags:["autodocs"],parameters:{docs:{description:{component:`
# Form Validation

Formulário completo do Vuexy com validação visual usando Bootstrap 5.

## Quando usar
- Cadastro de usuários
- Formulários de configuração
- Coleta de dados com validação
- Submissões que requerem verificação

## Composição
- **Form Groups** - Inputs com labels e feedback
- **Validation States** - .is-valid e .is-invalid
- **Feedback Messages** - .valid-feedback e .invalid-feedback
- **Submit Button** - Desabilitado até validação passar

## Estados de Validação
- **Default**: Nenhuma validação aplicada
- **Invalid**: Erros visíveis com mensagens
- **Valid**: Sucesso com checkmarks verdes
- **Mixed**: Alguns campos válidos, outros inválidos

## Validação Bootstrap
- \`.was-validated\` - Aplica estilos após submit
- \`.is-valid\` / \`.is-invalid\` - Estados manuais
- \`:valid\` / \`:invalid\` - Pseudo-classes CSS

## Acessibilidade
- \`aria-describedby\` aponta para mensagem de erro
- \`aria-invalid="true"\` em campos com erro
- \`required\` em campos obrigatórios
- Labels associados com \`for\` e \`id\`
        `}}},argTypes:{validationState:{control:"select",options:["none","invalid","valid","mixed"],description:"Estado geral de validação",table:{defaultValue:{summary:"none"}}},showFeedback:{control:"boolean",description:"Mostra mensagens de feedback",table:{defaultValue:{summary:!0}}},useFloatingLabels:{control:"boolean",description:"Usa floating labels",table:{defaultValue:{summary:!1}}},submitDisabled:{control:"boolean",description:"Desabilita botão submit",table:{defaultValue:{summary:!1}}}}},p={firstName:{label:"First Name",type:"text",required:!0,placeholder:"John"},lastName:{label:"Last Name",type:"text",required:!0,placeholder:"Doe"},email:{label:"Email",type:"email",required:!0,placeholder:"john.doe@example.com"},role:{label:"Role",type:"select",required:!0,options:["","Admin","Editor","Viewer"]},password:{label:"Password",type:"password",required:!0,placeholder:"••••••••"},confirmPassword:{label:"Confirm Password",type:"password",required:!0,placeholder:"••••••••"},terms:{label:"I agree to terms and conditions",type:"checkbox",required:!0}},aa={firstName:{valid:"Looks good!",invalid:"Please provide a valid first name."},lastName:{valid:"Looks good!",invalid:"Please provide a valid last name."},email:{valid:"Email is valid!",invalid:"Please provide a valid email address."},role:{valid:"Great choice!",invalid:"Please select a role."},password:{valid:"Strong password!",invalid:"Password must be at least 8 characters."},confirmPassword:{valid:"Passwords match!",invalid:"Passwords do not match."},terms:{valid:"Thank you!",invalid:"You must agree before submitting."}},ea=(i,s)=>s==="none"?"":s==="valid"?"is-valid":s==="invalid"?"is-invalid":["firstName","email","role"].includes(i)?"is-valid":"is-invalid",h=({validationState:i="none",showFeedback:s=!0,useFloatingLabels:c=!1,submitDisabled:r=!1})=>{const w=i!=="none"?"was-validated":"",n=(t,a)=>{const b=ea(t,i),m=b||"",d=aa[t],v=s&&b==="is-valid"?`<div class="valid-feedback">${d.valid}</div>`:"",u=s&&b==="is-invalid"?`<div class="invalid-feedback">${d.invalid}</div>`:"";if(a.type==="checkbox")return`
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input ${m}" id="${t}" ${a.required?"required":""}>
          <label class="form-check-label" for="${t}">${a.label}</label>
          ${u}
          ${v}
        </div>`;if(a.type==="select"){const e=a.options.map(l=>`<option value="${l.toLowerCase()}">${l}</option>`).join("");return c?`
          <div class="form-floating mb-3">
            <select class="form-select ${m}" id="${t}" ${a.required?"required":""}>
              ${e}
            </select>
            <label for="${t}">${a.label}</label>
            ${u}
            ${v}
          </div>`:`
        <div class="mb-3">
          <label for="${t}" class="form-label">${a.label}</label>
          <select class="form-select ${m}" id="${t}" ${a.required?"required":""}>
            ${e}
          </select>
          ${u}
          ${v}
        </div>`}return c?`
        <div class="form-floating mb-3">
          <input type="${a.type}" class="form-control ${m}" id="${t}" placeholder="${a.placeholder}" ${a.required?"required":""}>
          <label for="${t}">${a.label}</label>
          ${u}
          ${v}
        </div>`:`
      <div class="mb-3">
        <label for="${t}" class="form-label">${a.label}</label>
        <input type="${a.type}" class="form-control ${m}" id="${t}" placeholder="${a.placeholder}" ${a.required?"required":""}>
        ${u}
        ${v}
      </div>`};return`<div class="card">
  <div class="card-body">
    <h5 class="card-title mb-4">User Registration</h5>
    
    <form class="${w}" novalidate>
      <div class="row">
        <div class="col-md-6">
          ${n("firstName",p.firstName)}
        </div>
        <div class="col-md-6">
          ${n("lastName",p.lastName)}
        </div>
      </div>
      
      ${n("email",p.email)}
      ${n("role",p.role)}
      
      <div class="row">
        <div class="col-md-6">
          ${n("password",p.password)}
        </div>
        <div class="col-md-6">
          ${n("confirmPassword",p.confirmPassword)}
        </div>
      </div>
      
      ${n("terms",p.terms)}
      
      <div class="d-flex justify-content-between align-items-center">
        <button type="submit" class="btn btn-primary" ${r?"disabled":""}>
          ${r?"Validating...":"Submit"}
        </button>
        <button type="reset" class="btn btn-label-secondary">Reset</button>
      </div>
    </form>
  </div>
</div>`},f=i=>{const s=h(i);return`
    <div>
      ${s}
    </div>
    
    <div class="mt-4">
      <div class="alert alert-${i.validationState==="valid"?"success":i.validationState==="invalid"||i.validationState==="mixed"?"danger":"info"}">
        <strong>Validation State:</strong> ${i.validationState==="none"?"Not validated yet":i.validationState==="valid"?"All fields valid ✓":i.validationState==="invalid"?"All fields invalid ✗":"Some fields invalid"}
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${W(s).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${X(s,"FormValidation").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>${Z(s,"FormValidation").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},F=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Default (No Validation)</h5>
      ${h({validationState:"none"})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>All Invalid</h5>
      ${h({validationState:"invalid"})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>All Valid</h5>
      ${h({validationState:"valid"})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>Mixed State</h5>
      ${h({validationState:"mixed"})}
    </div>
  </div>
`,o=f.bind({});o.args={validationState:"none",showFeedback:!0,useFloatingLabels:!1,submitDisabled:!1};const S=f.bind({});S.args={...o.args,validationState:"invalid"};const g=f.bind({});g.args={...o.args,validationState:"valid"};const y=f.bind({});y.args={...o.args,validationState:"mixed"};const $=f.bind({});$.args={...o.args,useFloatingLabels:!0,validationState:"mixed"};const k=f.bind({});k.args={...g.args,submitDisabled:!0};const V=()=>{const i="form-validation-interactive-"+Math.random().toString(36).substr(2,9),s=`
    <div id="${i}">
      <form novalidate>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">User Registration</h5>
            
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label" for="firstName">First Name *</label>
                <input type="text" class="form-control" id="firstName" name="firstName" placeholder="John" required>
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please provide your first name.</div>
              </div>
              
              <div class="col-md-6">
                <label class="form-label" for="lastName">Last Name *</label>
                <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Doe" required>
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please provide your last name.</div>
              </div>
              
              <div class="col-12">
                <label class="form-label" for="email">Email *</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="john.doe@example.com" required>
                <div class="valid-feedback">Email is valid!</div>
                <div class="invalid-feedback">Please provide a valid email (must contain @).</div>
              </div>
              
              <div class="col-12">
                <label class="form-label" for="password">Password *</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="••••••••" required minlength="8">
                <div class="valid-feedback">Strong password!</div>
                <div class="invalid-feedback">Password must be at least 8 characters.</div>
              </div>
              
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="terms" name="terms" required>
                  <label class="form-check-label" for="terms">
                    I agree to terms and conditions *
                  </label>
                  <div class="valid-feedback">Thank you!</div>
                  <div class="invalid-feedback">You must agree before submitting.</div>
                </div>
              </div>
              
              <div class="col-12">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-label-secondary ms-2" data-action="reset">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      
      <div class="alert alert-secondary mt-3" data-status-message>
        Fill the form and click Submit to validate
      </div>
    </div>
  `;return setTimeout(()=>{const c=document.getElementById(i);if(!c)return;const r=c.querySelector("form"),w=r.querySelector("#firstName"),n=r.querySelector("#lastName"),t=r.querySelector("#email"),a=r.querySelector("#password"),b=r.querySelector("#terms"),m=c.querySelector('[data-action="reset"]'),d=c.querySelector("[data-status-message]"),v=e=>{let l=!1;return e.type==="checkbox"?l=e.checked:e.name==="email"?l=e.value.includes("@")&&e.value.length>3:e.name==="password"?l=e.value.length>=8:l=e.value.trim().length>0,e.classList.remove("is-valid","is-invalid"),e.classList.add(l?"is-valid":"is-invalid"),l},u=()=>[w,n,t,a,b].map(v).every(K=>K===!0);r.addEventListener("submit",e=>{e.preventDefault(),u()?(d.className="alert alert-success mt-3",d.innerHTML='<i class="bx bx-check-circle me-2"></i><strong>Success!</strong> All fields are valid. Form would be submitted.'):(d.className="alert alert-danger mt-3",d.innerHTML='<i class="bx bx-error-circle me-2"></i><strong>Error!</strong> Please fix the invalid fields above.')}),m.addEventListener("click",()=>{r.reset(),r.querySelectorAll(".form-control, .form-check-input").forEach(l=>l.classList.remove("is-valid","is-invalid")),d.className="alert alert-secondary mt-3",d.textContent="Fill the form and click Submit to validate"})},100),s};V.parameters={docs:{description:{story:"Interactive form validation demo. Submit the form to trigger validation. Rules: First/Last name required, Email must contain @, Password min 8 chars, Terms must be checked."}}};var N,q,x;F.parameters={...F.parameters,docs:{...(N=F.parameters)==null?void 0:N.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Default (No Validation)</h5>
      \${createFormValidation({
  validationState: 'none'
})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>All Invalid</h5>
      \${createFormValidation({
  validationState: 'invalid'
})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>All Valid</h5>
      \${createFormValidation({
  validationState: 'valid'
})}
    </div>
    
    <div class="col-12 mt-5">
      <h5>Mixed State</h5>
      \${createFormValidation({
  validationState: 'mixed'
})}
    </div>
  </div>
\``,...(x=(q=F.parameters)==null?void 0:q.docs)==null?void 0:x.source}}};var L,M,P;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  const markup = createFormValidation(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <div class="mt-4">
      <div class="alert alert-\${args.validationState === 'valid' ? 'success' : args.validationState === 'invalid' || args.validationState === 'mixed' ? 'danger' : 'info'}">
        <strong>Validation State:</strong> \${args.validationState === 'none' ? 'Not validated yet' : args.validationState === 'valid' ? 'All fields valid ✓' : args.validationState === 'invalid' ? 'All fields invalid ✗' : 'Some fields invalid'}
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(P=(M=o.parameters)==null?void 0:M.docs)==null?void 0:P.source}}};var A,E,R;S.parameters={...S.parameters,docs:{...(A=S.parameters)==null?void 0:A.docs,source:{originalSource:`args => {
  const markup = createFormValidation(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <div class="mt-4">
      <div class="alert alert-\${args.validationState === 'valid' ? 'success' : args.validationState === 'invalid' || args.validationState === 'mixed' ? 'danger' : 'info'}">
        <strong>Validation State:</strong> \${args.validationState === 'none' ? 'Not validated yet' : args.validationState === 'valid' ? 'All fields valid ✓' : args.validationState === 'invalid' ? 'All fields invalid ✗' : 'Some fields invalid'}
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(R=(E=S.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};var T,H,I;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  const markup = createFormValidation(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <div class="mt-4">
      <div class="alert alert-\${args.validationState === 'valid' ? 'success' : args.validationState === 'invalid' || args.validationState === 'mixed' ? 'danger' : 'info'}">
        <strong>Validation State:</strong> \${args.validationState === 'none' ? 'Not validated yet' : args.validationState === 'valid' ? 'All fields valid ✓' : args.validationState === 'invalid' ? 'All fields invalid ✗' : 'Some fields invalid'}
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(I=(H=g.parameters)==null?void 0:H.docs)==null?void 0:I.source}}};var C,D,B;y.parameters={...y.parameters,docs:{...(C=y.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const markup = createFormValidation(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <div class="mt-4">
      <div class="alert alert-\${args.validationState === 'valid' ? 'success' : args.validationState === 'invalid' || args.validationState === 'mixed' ? 'danger' : 'info'}">
        <strong>Validation State:</strong> \${args.validationState === 'none' ? 'Not validated yet' : args.validationState === 'valid' ? 'All fields valid ✓' : args.validationState === 'invalid' ? 'All fields invalid ✗' : 'Some fields invalid'}
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(B=(D=y.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};var j,O,U;$.parameters={...$.parameters,docs:{...(j=$.parameters)==null?void 0:j.docs,source:{originalSource:`args => {
  const markup = createFormValidation(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <div class="mt-4">
      <div class="alert alert-\${args.validationState === 'valid' ? 'success' : args.validationState === 'invalid' || args.validationState === 'mixed' ? 'danger' : 'info'}">
        <strong>Validation State:</strong> \${args.validationState === 'none' ? 'Not validated yet' : args.validationState === 'valid' ? 'All fields valid ✓' : args.validationState === 'invalid' ? 'All fields invalid ✗' : 'Some fields invalid'}
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(U=(O=$.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};var J,Y,_;k.parameters={...k.parameters,docs:{...(J=k.parameters)==null?void 0:J.docs,source:{originalSource:`args => {
  const markup = createFormValidation(args);
  return \`
    <div>
      \${markup}
    </div>
    
    <div class="mt-4">
      <div class="alert alert-\${args.validationState === 'valid' ? 'success' : args.validationState === 'invalid' || args.validationState === 'mixed' ? 'danger' : 'info'}">
        <strong>Validation State:</strong> \${args.validationState === 'none' ? 'Not validated yet' : args.validationState === 'valid' ? 'All fields valid ✓' : args.validationState === 'invalid' ? 'All fields invalid ✗' : 'Some fields invalid'}
      </div>
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>Vue 3</h6>
        <pre><code>\${formatVue3Snippet(markup, 'FormValidation').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(_=(Y=k.parameters)==null?void 0:Y.docs)==null?void 0:_.source}}};var G,Q,z;V.parameters={...V.parameters,docs:{...(G=V.parameters)==null?void 0:G.docs,source:{originalSource:`() => {
  const containerId = 'form-validation-interactive-' + Math.random().toString(36).substr(2, 9);
  const markup = \`
    <div id="\${containerId}">
      <form novalidate>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">User Registration</h5>
            
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label" for="firstName">First Name *</label>
                <input type="text" class="form-control" id="firstName" name="firstName" placeholder="John" required>
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please provide your first name.</div>
              </div>
              
              <div class="col-md-6">
                <label class="form-label" for="lastName">Last Name *</label>
                <input type="text" class="form-control" id="lastName" name="lastName" placeholder="Doe" required>
                <div class="valid-feedback">Looks good!</div>
                <div class="invalid-feedback">Please provide your last name.</div>
              </div>
              
              <div class="col-12">
                <label class="form-label" for="email">Email *</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="john.doe@example.com" required>
                <div class="valid-feedback">Email is valid!</div>
                <div class="invalid-feedback">Please provide a valid email (must contain @).</div>
              </div>
              
              <div class="col-12">
                <label class="form-label" for="password">Password *</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="••••••••" required minlength="8">
                <div class="valid-feedback">Strong password!</div>
                <div class="invalid-feedback">Password must be at least 8 characters.</div>
              </div>
              
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="terms" name="terms" required>
                  <label class="form-check-label" for="terms">
                    I agree to terms and conditions *
                  </label>
                  <div class="valid-feedback">Thank you!</div>
                  <div class="invalid-feedback">You must agree before submitting.</div>
                </div>
              </div>
              
              <div class="col-12">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-label-secondary ms-2" data-action="reset">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      
      <div class="alert alert-secondary mt-3" data-status-message>
        Fill the form and click Submit to validate
      </div>
    </div>
  \`;
  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (!container) return;
    const form = container.querySelector('form');
    const firstName = form.querySelector('#firstName');
    const lastName = form.querySelector('#lastName');
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    const terms = form.querySelector('#terms');
    const resetBtn = container.querySelector('[data-action="reset"]');
    const statusMessage = container.querySelector('[data-status-message]');
    const validateField = field => {
      let isValid = false;
      if (field.type === 'checkbox') {
        isValid = field.checked;
      } else if (field.name === 'email') {
        isValid = field.value.includes('@') && field.value.length > 3;
      } else if (field.name === 'password') {
        isValid = field.value.length >= 8;
      } else {
        isValid = field.value.trim().length > 0;
      }
      field.classList.remove('is-valid', 'is-invalid');
      field.classList.add(isValid ? 'is-valid' : 'is-invalid');
      return isValid;
    };
    const validateForm = () => {
      const fields = [firstName, lastName, email, password, terms];
      const results = fields.map(validateField);
      return results.every(result => result === true);
    };
    form.addEventListener('submit', e => {
      e.preventDefault();
      const isValid = validateForm();
      if (isValid) {
        statusMessage.className = 'alert alert-success mt-3';
        statusMessage.innerHTML = '<i class="bx bx-check-circle me-2"></i><strong>Success!</strong> All fields are valid. Form would be submitted.';
      } else {
        statusMessage.className = 'alert alert-danger mt-3';
        statusMessage.innerHTML = '<i class="bx bx-error-circle me-2"></i><strong>Error!</strong> Please fix the invalid fields above.';
      }
    });
    resetBtn.addEventListener('click', () => {
      form.reset();
      const fields = form.querySelectorAll('.form-control, .form-check-input');
      fields.forEach(field => field.classList.remove('is-valid', 'is-invalid'));
      statusMessage.className = 'alert alert-secondary mt-3';
      statusMessage.textContent = 'Fill the form and click Submit to validate';
    });
  }, 100);
  return markup;
}`,...(z=(Q=V.parameters)==null?void 0:Q.docs)==null?void 0:z.source}}};const sa=["Overview","Default","Invalid","Valid","Mixed","FloatingLabels","Submitting","Interactive"];export{o as Default,$ as FloatingLabels,V as Interactive,S as Invalid,y as Mixed,F as Overview,k as Submitting,g as Valid,sa as __namedExportsOrder,ta as default};
