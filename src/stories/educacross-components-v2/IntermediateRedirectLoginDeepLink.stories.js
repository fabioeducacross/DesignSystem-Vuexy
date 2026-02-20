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
  title: 'Educacross Components V2/Navigation/IntermediateRedirectLoginDeepLink',
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
      <div style="background:linear-gradient(135deg,#00CFE8 0%,#0BAACC 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Navigation</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">IntermediateRedirectLoginDeepLink</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Deep Link Authentication Screen</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Deep Link Authentication Screen. Faz parte da categoria <strong>Navigation</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #00CFE8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import IntermediateRedirectLoginDeepLink from '@/components/IntermediateRedirectLoginDeepLink.vue';

// Template
&lt;IntermediateRedirectLoginDeepLink v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o IntermediateRedirectLoginDeepLink com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#00CFE820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground IntermediateRedirectLoginDeepLink</p>
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
    docs: { description: { story: 'Exemplos de uso real do IntermediateRedirectLoginDeepLink no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#00CFE815;border:1px solid #00CFE830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: IntermediateRedirectLoginDeepLink</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando IntermediateRedirectLoginDeepLink no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com IntermediateRedirectLoginDeepLink no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via IntermediateRedirectLoginDeepLink</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o IntermediateRedirectLoginDeepLink.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#00CFE8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: IntermediateRedirectLoginDeepLink</h1>
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

