/**
 * Forgot Password Page - Template (Authentication)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/page-auth.css
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Template de página de recuperação de senha.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Templates/Auth/ForgotPassword',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Forgot Password Template

Template de página para recuperação/reset de senha.

## Características
- Layout centrado e responsivo
- Formulário simples com email
- Mensagem explicativa
- Link para voltar ao login
- Confirmação de envio
- Branding customizável

## Fluxo
1. Usuário informa email
2. Sistema envia link de reset
3. Confirmação visual
4. Redirecionamento ou mensagem de sucesso

## Elementos incluídos
- Logo/Branding
- Mensagem explicativa
- Input de email
- Botão de envio
- Link para voltar ao login
- Estado de sucesso (opcional)

## Variações
- Estado inicial (formulário)
- Estado de sucesso (confirmação)
- Com/sem ilustração

## Acessibilidade
- Labels descritivos
- Validação de email
- Foco visível
- Mensagens claras
        `
      }
    },
    layout: 'fullscreen'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'card', 'illustration'],
      description: 'Estilo do layout',
      table: { defaultValue: { summary: 'card' } }
    },
    showSuccess: {
      control: 'boolean',
      description: 'Mostrar estado de sucesso',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createForgotPasswordPage = ({ variant = 'card', showSuccess = false }) => {
  const isCard = variant === 'card';
  const hasIllustration = variant === 'illustration';
  
  return `<div class="authentication-wrapper authentication-${variant} container-p-y">
  <div class="authentication-inner ${isCard ? 'row' : ''}">
    
    ${hasIllustration ? `
    <div class="d-none d-lg-flex col-lg-7 p-0">
      <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
        <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/illustrations/auth-forgot-password-illustration-light.png" 
             alt="auth-forgot-password-cover" 
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
        
        ${!showSuccess ? `
        <!-- Initial State -->
        <h4 class="mb-1">Forgot Password? 🔒</h4>
        <p class="mb-4">Enter your email and we'll send you instructions to reset your password</p>
        
        <form id="formAuthentication" class="mb-3">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" 
                   class="form-control" 
                   id="email" 
                   name="email" 
                   placeholder="Enter your email" 
                   autofocus>
          </div>
          
          <button class="btn btn-primary d-grid w-100 mb-3" type="submit">
            Send Reset Link
          </button>
        </form>
        
        <div class="text-center">
          <a href="/auth/login" class="d-flex align-items-center justify-content-center gap-1">
            <i class="bx bx-chevron-left scaleX-n1-rtl"></i>
            Back to login
          </a>
        </div>
        ` : `
        <!-- Success State -->
        <div class="text-center mb-4">
          <div class="mb-4">
            <div class="avatar avatar-xl bg-label-success">
              <i class="bx bx-envelope bx-lg"></i>
            </div>
          </div>
          <h4 class="mb-1">Check your email! 📧</h4>
          <p class="mb-0">We've sent a password reset link to your email</p>
          <p class="mb-4 text-muted">example@email.com</p>
        </div>
        
        <div class="alert alert-primary mb-4">
          <div class="alert-body">
            <p class="mb-0">
              <strong>Didn't receive the email?</strong>
              <br>
              Check your spam folder or 
              <a href="javascript:void(0);" class="alert-link">resend link</a>
            </p>
          </div>
        </div>
        
        <div class="text-center">
          <a href="/auth/login" class="d-flex align-items-center justify-content-center gap-1">
            <i class="bx bx-chevron-left scaleX-n1-rtl"></i>
            Back to login
          </a>
        </div>
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

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.375rem;
  height: 2.375rem;
  border-radius: 50%;
}

.avatar-xl {
  width: 5rem;
  height: 5rem;
  font-size: 2.5rem;
}

.bg-label-success {
  background-color: rgba(40, 199, 111, 0.12) !important;
  color: #28c76f !important;
}
</style>`;
};

const Template = (args) => {
  const markup = createForgotPasswordPage(args);
  
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
  <div class="row g-4" style="background: #f5f5f9; padding: 3rem;">
    <div class="col-md-6">
      <h5 class="mb-3">Initial State</h5>
      ${createForgotPasswordPage({ variant: 'card', showSuccess: false })}
    </div>
    <div class="col-md-6">
      <h5 class="mb-3">Success State</h5>
      ${createForgotPasswordPage({ variant: 'card', showSuccess: true })}
    </div>
  </div>
`;

export const InitialState = Template.bind({});
InitialState.args = {
  variant: 'card',
  showSuccess: false
};

export const SuccessState = Template.bind({});
SuccessState.args = {
  variant: 'card',
  showSuccess: true
};

export const WithIllustration = Template.bind({});
WithIllustration.args = {
  variant: 'illustration',
  showSuccess: false
};

export const BasicLayout = Template.bind({});
BasicLayout.args = {
  variant: 'basic',
  showSuccess: false
};
