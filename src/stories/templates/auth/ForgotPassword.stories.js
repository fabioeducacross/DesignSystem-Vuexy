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
  title: 'Vuexy/Templates/Auth/ForgotPassword',
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
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500'%3E%3Crect width='500' height='500' fill='%23f5f5f9'/%3E%3Ccircle cx='250' cy='200' r='75' fill='%23e7e7ff'/%3E%3Crect x='175' y='275' width='150' height='175' rx='12' fill='%23e7e7ff'/%3E%3Ctext x='50%25' y='90%25' font-family='Arial' font-size='20' fill='%23696cff' text-anchor='middle'%3EForgot%3C/text%3E%3C/svg%3E" 
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
            <img src="/educacross-assets/logo-educacross.svg" alt="Educacross Logo" style="height: 32px; width: auto;">
          </span>
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

export const Interactive = () => {
  return `
    <div style="background: #f5f5f9; padding: 3rem; min-height: 100vh;">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body p-4">
              <h3 class="mb-2 text-center">Forgot Password? 🔒</h3>
              <p class="text-muted text-center mb-4">Enter your email and we'll send you instructions</p>
              
              <div id="form-section">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <input type="email" id="email-input" class="form-control" placeholder="Enter your email">
                  <div id="email-feedback" class="mt-2" style="display: none;"></div>
                </div>
                
                <button class="btn btn-primary w-100 mb-3" onclick="
                  const email = document.getElementById('email-input').value;
                  const feedback = document.getElementById('email-feedback');
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  
                  if (!email) {
                    feedback.style.display = 'block';
                    feedback.className = 'alert alert-danger py-2';
                    feedback.textContent = '⚠️ Email is required';
                    return;
                  }
                  
                  if (!emailRegex.test(email)) {
                    feedback.style.display = 'block';
                    feedback.className = 'alert alert-warning py-2';
                    feedback.textContent = '⚠️ Please enter a valid email';
                    return;
                  }
                  
                  feedback.style.display = 'block';
                  feedback.className = 'alert alert-success py-2';
                  feedback.textContent = '✅ Valid! Sending reset link...';
                  
                  setTimeout(() => {
                    document.getElementById('form-section').style.display = 'none';
                    document.getElementById('success-section').style.display = 'block';
                  }, 1500);
                ">Send Reset Link</button>
                
                <div class="text-center">
                  <a href="#" class="text-muted"><i class="bx bx-chevron-left"></i> Back to login</a>
                </div>
              </div>
              
              <div id="success-section" style="display: none;" class="text-center">
                <div class="mb-4">
                  <i class="bx bx-envelope" style="font-size: 4rem; color: #56ca00;"></i>
                </div>
                <h5 class="mb-2">Check your email! ✉️</h5>
                <p class="text-muted">We've sent a password reset link to your email address.</p>
                <button class="btn btn-outline-secondary mt-3" onclick="
                  document.getElementById('form-section').style.display = 'block';
                  document.getElementById('success-section').style.display = 'none';
                  document.getElementById('email-feedback').style.display = 'none';
                ">Send Again</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
