/**
 * Register Page - Template (Authentication)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/page-auth.css
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Template completo de página de registro.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Templates/Auth/Register',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Register Page Template

Template completo de página de registro/criação de conta.

## Características
- Layout centrado e responsivo
- Formulário com validação
- Campos: username, email, senha
- Checkbox de termos de uso
- Registro social (Google, Facebook, Twitter)
- Link para login
- Branding customizável

## Elementos incluídos
- Logo/Branding
- Formulário de registro
- Checkbox "I agree to privacy policy & terms"
- Botão de submit
- Divider "or"
- Botões de registro social
- Link para página de login

## Validação
- Email válido
- Senha forte
- Username único
- Aceite de termos obrigatório

## Acessibilidade
- Labels descritivos
- Validação de formulário
- Foco visível
- Navegação por teclado
        `
      }
    },
    layout: 'fullscreen'
  },
  argTypes: {
    withSocial: {
      control: 'boolean',
      description: 'Incluir botões de registro social',
      table: { defaultValue: { summary: true } }
    },
    variant: {
      control: 'select',
      options: ['basic', 'card', 'illustration'],
      description: 'Estilo do layout',
      table: { defaultValue: { summary: 'card' } }
    }
  }
};

const createRegisterPage = ({ withSocial = true, variant = 'card' }) => {
  const isCard = variant === 'card';
  const hasIllustration = variant === 'illustration';
  
  return `<div class="authentication-wrapper authentication-${variant} container-p-y">
  <div class="authentication-inner ${isCard ? 'row' : ''}">
    
    ${hasIllustration ? `
    <div class="d-none d-lg-flex col-lg-7 p-0">
      <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
        <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/illustrations/auth-register-illustration-light.png" 
             alt="auth-register-cover" 
             class="img-fluid">
      </div>
    </div>
    ` : ''}
    
    <div class="${hasIllustration ? 'col-lg-5' : isCard ? 'col-12 col-md-8 col-lg-6 col-xl-5' : 'col-12'} mx-auto ${isCard ? 'card' : ''}">
      <div class="${isCard ? 'card-body' : ''} p-4 p-sm-5">
        
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
        
        <h4 class="mb-1">Adventure starts here 🚀</h4>
        <p class="mb-4">Make your app management easy and fun!</p>
        
        <!-- Register Form -->
        <form id="formAuthentication" class="mb-3">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" 
                   class="form-control" 
                   id="username" 
                   name="username" 
                   placeholder="Enter your username" 
                   autofocus>
          </div>
          
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" 
                   class="form-control" 
                   id="email" 
                   name="email" 
                   placeholder="Enter your email">
          </div>
          
          <div class="mb-3 form-password-toggle">
            <label class="form-label" for="password">Password</label>
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
              <input class="form-check-input" type="checkbox" id="terms-conditions">
              <label class="form-check-label" for="terms-conditions">
                I agree to <a href="javascript:void(0);">privacy policy & terms</a>
              </label>
            </div>
          </div>
          
          <button class="btn btn-primary d-grid w-100 mb-3" type="submit">
            Sign up
          </button>
        </form>
        
        <p class="text-center">
          <span>Already have an account?</span>
          <a href="/auth/login">
            <span>Sign in instead</span>
          </a>
        </p>
        
        ${withSocial ? `
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
        ` : ''}
        
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
</style>`;
};

const Template = (args) => {
  const markup = createRegisterPage(args);
  
  return `
    ${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Full Page Template:</strong> Este template deve ser usado em página dedicada, não dentro de um layout com navbar/sidebar.
        </div>
      </div>
    </details>
  `;
};

export const Overview = () => `
  <div style="background: #f5f5f9; padding: 3rem;">
    ${createRegisterPage({ withSocial: true, variant: 'card' })}
  </div>
`;

export const CardLayout = Template.bind({});
CardLayout.args = {
  withSocial: true,
  variant: 'card'
};

export const BasicLayout = Template.bind({});
BasicLayout.args = {
  withSocial: false,
  variant: 'basic'
};

export const WithIllustration = Template.bind({});
WithIllustration.args = {
  withSocial: true,
  variant: 'illustration'
};

export const NoSocialLogin = Template.bind({});
NoSocialLogin.args = {
  withSocial: false,
  variant: 'card'
};

export const Interactive = () => {
  return `
    <div style="background: #f5f5f9; padding: 3rem; min-height: 100vh;">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body p-4">
              <h3 class="mb-4 text-center">Register</h3>
              
              <div class="mb-3">
                <label class="form-label">Username</label>
                <input type="text" class="form-control" placeholder="Enter username">
              </div>
              
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" placeholder="Enter email">
              </div>
              
              <div class="mb-3">
                <label class="form-label">Password</label>
                <input type="password" id="reg-password" class="form-control" placeholder="Enter password" oninput="
                  const pwd = this.value;
                  const meter = document.getElementById('strength-meter');
                  const text = document.getElementById('strength-text');
                  let strength = 0;
                  if (pwd.length >= 8) strength++;
                  if (/[A-Z]/.test(pwd)) strength++;
                  if (/[0-9]/.test(pwd)) strength++;
                  if (/[^A-Za-z0-9]/.test(pwd)) strength++;
                  
                  const colors = ['danger', 'warning', 'info', 'success'];
                  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
                  const width = (strength * 25);
                  
                  meter.className = 'progress-bar bg-' + (colors[strength - 1] || 'secondary');
                  meter.style.width = width + '%';
                  text.textContent = pwd.length > 0 ? labels[strength - 1] || 'Too Short' : '';
                  text.className = 'small text-' + (colors[strength - 1] || 'muted');
                ">
                <div class="progress mt-2" style="height: 5px;">
                  <div id="strength-meter" class="progress-bar" style="width: 0%"></div>
                </div>
                <small id="strength-text" class="text-muted"></small>
              </div>
              
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="terms-check">
                <label class="form-check-label" for="terms-check">
                  I agree to <a href="#">terms & conditions</a>
                </label>
              </div>
              
              <button class="btn btn-primary w-100" onclick="
                const terms = document.getElementById('terms-check');
                if (!terms.checked) {
                  alert('⚠️ Please accept terms & conditions');
                  return;
                }
                alert('✅ Registration successful!');
              ">Create Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
