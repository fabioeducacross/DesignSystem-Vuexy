import{f as $}from"./snippets-m8t1HIl1.js";const H={title:"Templates/Auth/Login",tags:["autodocs"],parameters:{docs:{description:{component:`
# Login Page Template

Template completo de página de autenticação para login.

## Características
- Layout centrado e responsivo
- Formulário com validação
- Opções de "Remember Me" e "Forgot Password"
- Login social (Google, Facebook, Twitter)
- Link para registro
- Branding customizável
- Background opcional

## Elementos incluídos
- Logo/Branding
- Formulário de login (email/senha)
- Checkbox "Remember Me"
- Link "Forgot Password"
- Botão de submit
- Divider "or"
- Botões de login social
- Link para página de registro

## Variações
- Com/sem login social
- Com/sem background image
- Layout básico/card
- Dark/Light mode

## Acessibilidade
- Labels descritivos
- Validação de formulário
- Foco visível em campos
- Navegação por teclado
        `}},layout:"fullscreen"},argTypes:{withSocial:{control:"boolean",description:"Incluir botões de login social",table:{defaultValue:{summary:!0}}},variant:{control:"select",options:["basic","card","illustration"],description:"Estilo do layout",table:{defaultValue:{summary:"card"}}}}},P=({withSocial:c=!0,variant:e="card"})=>{const r=e==="card",d=e==="illustration";return`<div class="authentication-wrapper authentication-${e} container-p-y">
  <div class="authentication-inner ${r?"row":""}">
    
    ${d?`
    <div class="d-none d-lg-flex col-lg-7 p-0">
      <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%23f5f5f9'/%3E%3Ccircle cx='250' cy='200' r='75' fill='%23e7e7ff'/%3E%3Crect x='175' y='275' width='150' height='175' rx='12' fill='%23e7e7ff'/%3E%3Ctext x='50%25' y='90%25' font-family='Arial' font-size='20' fill='%23696cff' text-anchor='middle'%3ELogin%3C/text%3E%3C/svg%3E" 
             alt="auth-login-cover" 
             class="img-fluid">
      </div>
    </div>
    `:""}
    
    <div class="${d?"col-lg-5":r?"col-12 col-md-8 col-lg-6 col-xl-5":"col-12"} mx-auto ${r?"card":""}">
      <div class="${r?"card-body":""} p-4 p-sm-5">
        
        <!-- Logo/Brand -->
        <div class="app-brand mb-4 text-center">
          <span class="app-brand-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="6" fill="#696cff"/>
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20" font-weight="bold">V</text>
            </svg>
          </span>
          <span class="app-brand-text demo text-body fw-bold ms-2">Vuexy</span>
        </div>
        
        <h4 class="mb-1">Welcome to Vuexy! 👋</h4>
        <p class="mb-4">Please sign-in to your account and start the adventure</p>
        
        <!-- Login Form -->
        <form id="formAuthentication" class="mb-3">
          <div class="mb-3">
            <label for="email" class="form-label">Email or Username</label>
            <input type="text" 
                   class="form-control" 
                   id="email" 
                   name="email-username" 
                   placeholder="Enter your email or username" 
                   autofocus>
          </div>
          
          <div class="mb-3 form-password-toggle">
            <div class="d-flex justify-content-between">
              <label class="form-label" for="password">Password</label>
              <a href="/auth/forgot-password">
                <small>Forgot Password?</small>
              </a>
            </div>
            <div class="input-group input-group-merge">
              <input type="password" 
                     id="password" 
                     class="form-control" 
                     name="password" 
                     placeholder="············" 
                     aria-describedby="password">
              <span class="input-group-text cursor-pointer">
                <i class="bx bx-hide"></i>
              </span>
            </div>
          </div>
          
          <div class="mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="remember-me">
              <label class="form-check-label" for="remember-me">
                Remember Me
              </label>
            </div>
          </div>
          
          <button class="btn btn-primary d-grid w-100 mb-3" type="submit">
            Sign in
          </button>
        </form>
        
        ${c?`
        <p class="text-center">
          <span>New on our platform?</span>
          <a href="/auth/register">
            <span>Create an account</span>
          </a>
        </p>
        
        <div class="divider my-4">
          <div class="divider-text">or</div>
        </div>
        
        <div class="d-flex justify-content-center gap-2">
          <a href="javascript:;" class="btn btn-icon btn-lg btn-label-facebook">
            <i class="tf-icons bx bxl-facebook"></i>
          </a>
          <a href="javascript:;" class="btn btn-icon btn-lg btn-label-google-plus">
            <i class="tf-icons bx bxl-google"></i>
          </a>
          <a href="javascript:;" class="btn btn-icon btn-lg btn-label-twitter">
            <i class="tf-icons bx bxl-twitter"></i>
          </a>
        </div>
        `:`
        <p class="text-center mt-4">
          <span>New on our platform?</span>
          <a href="/auth/register">
            <span>Create an account</span>
          </a>
        </p>
        `}
        
      </div>
    </div>
  </div>
</div>

<style>
.authentication-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f9;
}

.authentication-wrapper.authentication-basic {
  align-items: center;
}

.authentication-wrapper.authentication-illustration .authentication-inner {
  max-width: 1140px;
}

.auth-cover-bg {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.form-password-toggle {
  position: relative;
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #d9dee3;
}

.divider-text {
  padding: 0 0.5rem;
  color: #a1acb8;
  font-size: 0.8125rem;
}

.btn-label-facebook {
  color: #3b5998;
  border-color: rgba(59, 89, 152, 0.2);
  background-color: rgba(59, 89, 152, 0.08);
}

.btn-label-google-plus {
  color: #dd4b39;
  border-color: rgba(221, 75, 57, 0.2);
  background-color: rgba(221, 75, 57, 0.08);
}

.btn-label-twitter {
  color: #1da1f2;
  border-color: rgba(29, 161, 242, 0.2);
  background-color: rgba(29, 161, 242, 0.08);
}
</style>`},l=c=>{const e=P(c);return`
    ${e}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${$(e).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Full Page Template:</strong> Este template deve ser usado em página dedicada, não dentro de um layout com navbar/sidebar.
        </div>
      </div>
    </details>
  `},o=()=>`
  <div style="background: #f5f5f9; padding: 3rem;">
    ${P({withSocial:!0,variant:"card"})}
  </div>
`,a=l.bind({});a.args={withSocial:!0,variant:"card"};const t=l.bind({});t.args={withSocial:!1,variant:"basic"};const s=l.bind({});s.args={withSocial:!0,variant:"illustration"};const n=l.bind({});n.args={withSocial:!1,variant:"card"};const i=()=>`
    <div style="background: #f5f5f9; padding: 3rem; min-height: 100vh;">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body p-4">
              <h3 class="mb-4 text-center">Login</h3>
              
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" placeholder="Enter your email" value="john@example.com">
              </div>
              
              <div class="mb-3">
                <label class="form-label">Password</label>
                <div class="input-group">
                  <input type="password" id="password-input" class="form-control" placeholder="Enter password" value="password123">
                  <button class="btn btn-outline-secondary" type="button" onclick="
                    const input = document.getElementById('password-input');
                    const icon = this.querySelector('i');
                    if (input.type === 'password') {
                      input.type = 'text';
                      icon.className = 'bx bx-hide';
                      this.innerHTML = '<i class="bx bx-hide"></i>';
                    } else {
                      input.type = 'password';
                      icon.className = 'bx bx-show';
                      this.innerHTML = '<i class="bx bx-show"></i>';
                    }
                  "><i class="bx bx-show"></i></button>
                </div>
              </div>
              
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="remember-me">
                <label class="form-check-label" for="remember-me">Remember me</label>
                <span class="ms-2 badge bg-success" id="remember-badge" style="display: none;">✓ Enabled</span>
              </div>
              
              <button class="btn btn-primary w-100 mb-3" onclick="
                const badge = document.getElementById('remember-badge');
                const checkbox = document.getElementById('remember-me');
                if (checkbox.checked) {
                  badge.style.display = 'inline';
                  setTimeout(() => badge.style.display = 'none', 2000);
                }
                alert('Login demo - Remember me: ' + (checkbox.checked ? 'ON' : 'OFF'));
              ">Sign In</button>
              
              <div class="text-center">
                <a href="#" class="text-muted">Forgot password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;var m,p,b;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`() => \`
  <div style="background: #f5f5f9; padding: 3rem;">
    \${createLoginPage({
  withSocial: true,
  variant: 'card'
})}
  </div>
\``,...(b=(p=o.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var u,g,v;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  const markup = createLoginPage(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Full Page Template:</strong> Este template deve ser usado em página dedicada, não dentro de um layout com navbar/sidebar.
        </div>
      </div>
    </details>
  \`;
}`,...(v=(g=a.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var h,f,y;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const markup = createLoginPage(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Full Page Template:</strong> Este template deve ser usado em página dedicada, não dentro de um layout com navbar/sidebar.
        </div>
      </div>
    </details>
  \`;
}`,...(y=(f=t.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var x,w,k;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const markup = createLoginPage(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Full Page Template:</strong> Este template deve ser usado em página dedicada, não dentro de um layout com navbar/sidebar.
        </div>
      </div>
    </details>
  \`;
}`,...(k=(w=s.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var L,E,S;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  const markup = createLoginPage(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Full Page Template:</strong> Este template deve ser usado em página dedicada, não dentro de um layout com navbar/sidebar.
        </div>
      </div>
    </details>
  \`;
}`,...(S=(E=n.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var T,C,F;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`() => {
  return \`
    <div style="background: #f5f5f9; padding: 3rem; min-height: 100vh;">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body p-4">
              <h3 class="mb-4 text-center">Login</h3>
              
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" placeholder="Enter your email" value="john@example.com">
              </div>
              
              <div class="mb-3">
                <label class="form-label">Password</label>
                <div class="input-group">
                  <input type="password" id="password-input" class="form-control" placeholder="Enter password" value="password123">
                  <button class="btn btn-outline-secondary" type="button" onclick="
                    const input = document.getElementById('password-input');
                    const icon = this.querySelector('i');
                    if (input.type === 'password') {
                      input.type = 'text';
                      icon.className = 'bx bx-hide';
                      this.innerHTML = '<i class=\\"bx bx-hide\\"></i>';
                    } else {
                      input.type = 'password';
                      icon.className = 'bx bx-show';
                      this.innerHTML = '<i class=\\"bx bx-show\\"></i>';
                    }
                  "><i class="bx bx-show"></i></button>
                </div>
              </div>
              
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="remember-me">
                <label class="form-check-label" for="remember-me">Remember me</label>
                <span class="ms-2 badge bg-success" id="remember-badge" style="display: none;">✓ Enabled</span>
              </div>
              
              <button class="btn btn-primary w-100 mb-3" onclick="
                const badge = document.getElementById('remember-badge');
                const checkbox = document.getElementById('remember-me');
                if (checkbox.checked) {
                  badge.style.display = 'inline';
                  setTimeout(() => badge.style.display = 'none', 2000);
                }
                alert('Login demo - Remember me: ' + (checkbox.checked ? 'ON' : 'OFF'));
              ">Sign In</button>
              
              <div class="text-center">
                <a href="#" class="text-muted">Forgot password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`;
}`,...(F=(C=i.parameters)==null?void 0:C.docs)==null?void 0:F.source}}};const I=["Overview","CardLayout","BasicLayout","WithIllustration","NoSocialLogin","Interactive"];export{t as BasicLayout,a as CardLayout,i as Interactive,n as NoSocialLogin,o as Overview,s as WithIllustration,I as __namedExportsOrder,H as default};
