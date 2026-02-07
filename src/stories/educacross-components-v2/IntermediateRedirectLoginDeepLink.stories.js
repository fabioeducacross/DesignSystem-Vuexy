/**
 * IntermediateRedirectLoginDeepLink - Deep Link Authentication Screen
 * =========================================
 * 
 * Redirect/loading screen during deep link authentication flow.
 * Handles authentication state while redirecting users to target content.
 * 
 * @component IntermediateRedirectLoginDeepLink
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/deeplink/IntermediateRedirectLoginDeepLink.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Navigation/IntermediateRedirectLoginDeepLink',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# IntermediateRedirectLoginDeepLink

Tela intermediária de redirecionamento durante autenticação via deep link.
Exibe mascote da plataforma com mensagem de aguardo durante processamento de login.

## Características
- Container centralizado 670×652px com mascote e logo
- Responsive design com breakpoints 675px/575px/400px
- Suporte a contextos (aluno, professor, admin)
- Animações de loading opciona is

## Uso educacional
- Autenticação de aluno via link enviado por email
- Redirect de professor para painel administrativo
- Acesso a jogo educativo via deep link compartilhado
        `
      }
    }
  }
};

const componentStyles = `
<style>
.BackgroundSpace {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.redirectLogin-container {
  background-color: white;
  border-radius: 12px;
  width: 670px;
  max-width: 100%;
  min-height: 652px;
  padding: 2.5rem 6rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
}

.redirectLogin-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  height: 100%;
  gap: 32px;
}

.redirectLogin-content h3 {
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  color: #5D596C;
  margin: 0;
}

.redirectLogin-content p {
  font-size: 16px;
  line-height: 19px;
  color: #6E6B7B;
  margin: 8px 0 0 0;
}

.mascot-image {
  width: 250px;
  height: 275px;
  object-fit: contain;
}

.logo-image {
  width: 256px;
  height: 42px;
  object-fit: contain;
}

.mascot-pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

.loading-dots {
  display: inline-flex;
  gap: 6px;
  margin-left: 4px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background: #6E63E8;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(1) {
  animation-delay: 0s;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-12px);
  }
}

.context-badge {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 12px;
}

.context-student {
  background: rgba(110, 99, 232, 0.12);
  color: #6E63E8;
}

.context-teacher {
  background: rgba(40, 199, 111, 0.12);
  color: #28C76F;
}

.context-admin {
  background: rgba(255, 159, 67, 0.12);
  color: #FF9F43;
}

@media (max-width: 675px) {
  .redirectLogin-container {
    width: 90%;
  }
}

@media (max-width: 575px) {
  .redirectLogin-container {
    margin: 1rem 0;
    width: 85%;
    padding: 2rem;
  }
  
  .redirectLogin-content h3 {
    font-size: 20px;
  }
  
  .redirectLogin-content p {
    font-size: 14px;
  }
}

@media (max-width: 400px) {
  .mascot-image,
  .logo-image {
    width: 100%;
    height: auto;
  }
  
  .redirectLogin-container {
    padding: 1.5rem;
  }
}
</style>
`;

// SVG placeholder for mascot (owl character)
const mascotSVG = `<svg width="250" height="275" viewBox="0 0 250 275" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="125" cy="140" r="80" fill="#6E63E8" opacity="0.1"/>
  <circle cx="95" cy="120" r="15" fill="#6E63E8"/>
  <circle cx="155" cy="120" r="15" fill="#6E63E8"/>
  <path d="M85 150 Q125 170 165 150" stroke="#6E63E8" stroke-width="4" stroke-linecap="round" fill="none"/>
  <text x="125" y="230" text-anchor="middle" font-size="48" fill="#6E63E8">🦉</text>
</svg>`;

// Logo placeholder
const logoSVG = `<svg width="256" height="42" viewBox="0 0 256 42" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="256" height="42" rx="4" fill="#6E63E8"/>
  <text x="128" y="28" text-anchor="middle" font-size="20" font-weight="700" fill="white">Educacross</text>
</svg>`;

export const Default = {
  render: () => `
    ${componentStyles}
    <div class="BackgroundSpace">
      <div class="redirectLogin-container">
        <div class="redirectLogin-content">
          ${mascotSVG}
          ${logoSVG}
          <div>
            <h3>Aguarde um instante</h3>
            <p>Estamos processando seu acesso...</p>
          </div>
        </div>
      </div>
    </div>
  `
};

export const WithMessage = {
  render: () => `
    ${componentStyles}
    <div class="BackgroundSpace">
      <div class="redirectLogin-container">
        <div class="redirectLogin-content">
          ${mascotSVG}
          ${logoSVG}
          <div>
            <h3>Conectando sua conta<span class="loading-dots"><span></span><span></span><span></span></span></h3>
            <p>Verificando suas credenciais e preparando o ambiente</p>
          </div>
        </div>
      </div>
    </div>
  `
};

export const StudentContext = {
  render: () => `
    ${componentStyles}
    <div class="BackgroundSpace">
      <div class="redirectLogin-container">
        <div class="redirectLogin-content">
          ${mascotSVG}
          ${logoSVG}
          <div>
            <h3>Preparando suas missões</h3>
            <p>Carregando conteúdo personalizado para você</p>
            <span class="context-badge context-student">👨‍🎓 Modo Aluno</span>
          </div>
        </div>
      </div>
    </div>
  `
};

export const TeacherContext = {
  render: () => `
    ${componentStyles}
    <div class="BackgroundSpace">
      <div class="redirectLogin-container">
        <div class="redirectLogin-content">
          ${mascotSVG}
          ${logoSVG}
          <div>
            <h3>Carregando painel do professor</h3>
            <p>Acessando turmas, missões e relatórios de desempenho</p>
            <span class="context-badge context-teacher">👩‍🏫 Modo Professor</span>
          </div>
        </div>
      </div>
    </div>
  `
};

export const LongWaitAnimation = {
  render: () => `
    ${componentStyles}
    <div class="BackgroundSpace">
      <div class="redirectLogin-container">
        <div class="redirectLogin-content">
          <div class="mascot-pulse">
            ${mascotSVG}
          </div>
          ${logoSVG}
          <div>
            <h3>Verificando permissões<span class="loading-dots"><span></span><span></span><span></span></span></h3>
            <p>Este processo pode levar alguns segundos</p>
            <span class="context-badge context-admin">⚙️ Modo Admin</span>
          </div>
        </div>
      </div>
    </div>
  `
};

export const MobileView375 = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  },
  render: () => `
    ${componentStyles}
    <div class="BackgroundSpace">
      <div class="redirectLogin-container" style="width: 85%; padding: 1.5rem;">
        <div class="redirectLogin-content" style="gap: 24px;">
          <div style="width: 100%;">
            ${mascotSVG.replace('width="250"', 'width="100%"').replace('height="275"', 'height="auto"')}
          </div>
          <div style="width: 100%;">
            ${logoSVG.replace('width="256"', 'width="100%"').replace('height="42"', 'height="auto"')}
          </div>
          <div>
            <h3 style="font-size: 20px;">Conectando<span class="loading-dots"><span></span><span></span><span></span></span></h3>
            <p style="font-size: 14px;">Aguarde enquanto preparamos tudo</p>
          </div>
        </div>
      </div>
    </div>
  `
};

export const TabletView768 = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet'
    }
  },
  render: () => `
    ${componentStyles}
    <div class="BackgroundSpace">
      <div class="redirectLogin-container" style="width: 90%;">
        <div class="redirectLogin-content">
          ${mascotSVG}
          ${logoSVG}
          <div>
            <h3>Conectando ao jogo educativo</h3>
            <p>Carregando recursos e verificando progresso</p>
            <span class="context-badge context-student">🎮 Modo Jogo</span>
          </div>
        </div>
      </div>
    </div>
  `
};

export const Interactive = {
  render: () => {
    setTimeout(() => {
      const container = document.querySelector('.redirectLogin-container');
      if (container) {
        container.addEventListener('click', () => {
          alert('Redirecionamento simulado: Você seria levado para o painel principal após autenticação.');
        });
      }
    }, 100);
    
    return `
      ${componentStyles}
      <style>
        .redirectLogin-container {
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .redirectLogin-container:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }
      </style>
      <div class="BackgroundSpace">
        <div class="redirectLogin-container">
          <div class="redirectLogin-content">
            <div class="mascot-pulse">
              ${mascotSVG}
            </div>
            ${logoSVG}
            <div>
              <h3>Autenticando<span class="loading-dots"><span></span><span></span><span></span></span></h3>
              <p>Clique para simular redirecionamento</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
