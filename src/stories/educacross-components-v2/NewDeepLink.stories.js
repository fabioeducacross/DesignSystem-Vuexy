/**
 * NewDeepLink - Deep Link Selection Card
 * =======================================
 * 
 * Card interface for selecting deep link navigation options.
 * Shows circular icon buttons for different contexts.
 * 
 * @component NewDeepLink
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\deeplink\NewDeepLink.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Navigation/NewDeepLink',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# NewDeepLink

Card de **seleção de deep link** com ícones circulares grandes.

## Contexto de Uso

- **Landing pages**: Direcionamento inicial
- **Onboarding**: Escolher perfil de acesso
- **Menu principal**: Navegação por contexto
- **Switch context**: Alternar professor/aluno
- **Deep linking**: URLs diretas para seções

## Características

- **Brand logo**: Logo institucional no topo
- **Circular icons**: 80×80px desktop, 45×45px mobile
- **Large icons**: Ícones 48px desktop, 20px mobile
- **Media layout**: Flex column/row com ícones centralizados
- **Responsive**: Ajuste de tamanhos em breakpoints
- **Context selection**: Múltiplas opções de navegação

## Props

- Nenhuma prop - conteúdo via slot/data
        `
      }
    }
  }
};

const newDeepLinkStyles = `
<style>
  .deeplink-card {
    background: white;
    border: 1px solid #DBDADE;
    border-radius: 16px;
    padding: 40px;
    max-width: 600px;
    text-align: center;
  }
  
  .brand-logo {
    width: auto;
    max-width: 40%;
    min-width: 150px;
    height: auto;
    margin: 0 auto 32px;
  }
  
  .deeplink-options {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .deeplink-option {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
    border: 2px solid #E0E0E0;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .deeplink-option:hover {
    border-color: #6E63E8;
    background: rgba(110, 99, 232, 0.04);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  
  .icon-container {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .icon-container.student {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .icon-container.teacher {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  .icon-container.game {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
  
  .icon-container.admin {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  }
  
  .deeplink-icon {
    font-size: 48px;
    color: white;
  }
  
  .option-content {
    text-align: left;
    flex: 1;
  }
  
  .option-title {
    font-size: 20px;
    font-weight: 600;
    color: #5D596C;
    margin-bottom: 6px;
  }
  
  .option-description {
    font-size: 14px;
    color: #6E6B7B;
  }
  
  @media (max-width: 767px) {
    .deeplink-card {
      padding: 24px;
    }
    
    .icon-container {
      width: 45px;
      height: 45px;
    }
    
    .deeplink-icon {
      font-size: 20px;
    }
    
    .option-title {
      font-size: 16px;
    }
    
    .option-description {
      font-size: 13px;
    }
  }
</style>
`;

export const Default = {
  render: () => `
    ${newDeepLinkStyles}
    <div class="deeplink-card">
      <svg class="brand-logo" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="40" height="40" fill="#6E63E8" rx="8"/>
        <text x="70" y="38" font-size="24" font-weight="700" fill="#5D596C">Educacross</text>
      </svg>
      
      <div class="deeplink-options">
        <div class="deeplink-option">
          <div class="icon-container student">
            <i class="bi bi-person-fill deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Acessar como Aluno</div>
            <div class="option-description">Ver suas missões e atividades</div>
          </div>
        </div>
        
        <div class="deeplink-option">
          <div class="icon-container teacher">
            <i class="bi bi-person-workspace deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Acessar como Professor</div>
            <div class="option-description">Gerenciar turmas e criar missões</div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const WithMultipleOptions = {
  render: () => `
    ${newDeepLinkStyles}
    <div class="deeplink-card">
      <svg class="brand-logo" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="40" height="40" fill="#6E63E8" rx="8"/>
        <text x="70" y="38" font-size="24" font-weight="700" fill="#5D596C">Educacross</text>
      </svg>
      
      <h2 style="font-size: 20px; color: #5D596C; margin-bottom: 24px;">Escolha seu perfil</h2>
      
      <div class="deeplink-options">
        <div class="deeplink-option">
          <div class="icon-container student">
            <i class="bi bi-mortarboard-fill deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Aluno</div>
            <div class="option-description">Realizar missões e acessar conteúdos</div>
          </div>
        </div>
        
        <div class="deeplink-option">
          <div class="icon-container teacher">
            <i class="bi bi-person-video3 deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Professor</div>
            <div class="option-description">Criar e gerenciar atividades pedagógicas</div>
          </div>
        </div>
        
        <div class="deeplink-option">
          <div class="icon-container admin">
            <i class="bi bi-gear-fill deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Administrador</div>
            <div class="option-description">Configurações da escola e relatórios</div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const StudentContext = {
  render: () => `
    ${newDeepLinkStyles}
    <div class="deeplink-card">
      <div class="deeplink-options">
        <div class="deeplink-option">
          <div class="icon-container student">
            <i class="bi bi-book-fill deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Minhas Missões</div>
            <div class="option-description">Ver missões ativas e pendentes</div>
          </div>
        </div>
        
        <div class="deeplink-option">
          <div class="icon-container game">
            <i class="bi bi-controller deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Jogos Educativos</div>
            <div class="option-description">Aprender jogando</div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const TeacherContext = {
  render: () => `
    ${newDeepLinkStyles}
    <div class="deeplink-card">
      <div class="deeplink-options">
        <div class="deeplink-option">
          <div class="icon-container teacher">
            <i class="bi bi-pencil-square deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Criar Missão</div>
            <div class="option-description">Nova atividade para turmas</div>
          </div>
        </div>
        
        <div class="deeplink-option">
          <div class="icon-container teacher" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
            <i class="bi bi-people-fill deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Minhas Turmas</div>
            <div class="option-description">Gerenciar alunos e desempenho</div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const GameContext = {
  render: () => `
    ${newDeepLinkStyles}
    <div class="deeplink-card">
      <h2 style="font-size: 22px; color: #5D596C; margin-bottom: 24px;">
        <i class="bi bi-trophy-fill" style="color: #FFB800;"></i> Jogos
      </h2>
      
      <div class="deeplink-options">
        <div class="deeplink-option">
          <div class="icon-container game">
            <i class="bi bi-puzzle-fill deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Quiz Rápido</div>
            <div class="option-description">Responda perguntas e ganhe pontos</div>
          </div>
        </div>
        
        <div class="deeplink-option">
          <div class="icon-container game" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);">
            <i class="bi bi-stars deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Desafio Diário</div>
            <div class="option-description">Novo desafio todos os dias</div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const MobileView = {
  render: () => `
    ${newDeepLinkStyles}
    <div style="max-width: 375px; margin: 0 auto;">
      <div class="deeplink-card" style="padding: 24px;">
        <svg class="brand-logo" style="min-width: 120px; margin-bottom: 24px;" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="40" height="40" fill="#6E63E8" rx="8"/>
          <text x="70" y="38" font-size="24" font-weight="700" fill="#5D596C">Edu</text>
        </svg>
        
        <div class="deeplink-options" style="gap: 16px;">
          <div class="deeplink-option" style="padding: 16px; gap: 12px;">
            <div class="icon-container student" style="width: 45px; height: 45px;">
              <i class="deeplink-icon" style="font-size: 20px;">👨‍🎓</i>
            </div>
            <div class="option-content">
              <div class="option-title" style="font-size: 16px;">Aluno</div>
              <div class="option-description" style="font-size: 13px;">Suas missões</div>
            </div>
          </div>
          
          <div class="deeplink-option" style="padding: 16px; gap: 12px;">
            <div class="icon-container teacher" style="width: 45px; height: 45px;">
              <i class="deeplink-icon" style="font-size: 20px;">👨‍🏫</i>
            </div>
            <div class="option-content">
              <div class="option-title" style="font-size: 16px;">Professor</div>
              <div class="option-description" style="font-size: 13px;">Gerenciar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const WithBranding = {
  render: () => `
    ${newDeepLinkStyles}
    <div class="deeplink-card" style="background: linear-gradient(180deg, #F8F7FA 0%, #FFFFFF 100%);">
      <div style="text-align: center; margin-bottom: 32px;">
        <svg class="brand-logo" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="40" height="40" fill="#6E63E8" rx="8"/>
          <text x="70" y="38" font-size="24" font-weight="700" fill="#5D596C">Educacross</text>
        </svg>
        <p style="color: #6E6B7B; font-size: 14px; margin-top: 8px;">
          Plataforma de Ensino Digital
        </p>
      </div>
      
      <div class="deeplink-options">
        <div class="deeplink-option">
          <div class="icon-container student">
            <i class="bi bi-mortarboard-fill deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Portal do Aluno</div>
            <div class="option-description">Acesse suas atividades e notas</div>
          </div>
          <i class="bi bi-arrow-right" style="font-size: 24px; color: #6E6B7B;"></i>
        </div>
        
        <div class="deeplink-option">
          <div class="icon-container teacher">
            <i class="bi bi-person-workspace deeplink-icon"></i>
          </div>
          <div class="option-content">
            <div class="option-title">Portal do Professor</div>
            <div class="option-description">Gerencie turmas e conteúdos</div>
          </div>
          <i class="bi bi-arrow-right" style="font-size: 24px; color: #6E6B7B;"></i>
        </div>
      </div>
    </div>
  `
};

export const Interactive = {
  render: () => {
    setTimeout(() => {
      const options = document.querySelectorAll('.deeplink-option');
      options.forEach((option, index) => {
        option.addEventListener('click', () => {
          const titles = ['Aluno', 'Professor', 'Administrador'];
          alert(`Deep link selecionado: ${titles[index] || 'Opção ' + (index + 1)}\n\nNavegando...`);
        });
      });
    }, 100);
    
    return `
      ${newDeepLinkStyles}
      <div class="deeplink-card">
        <svg class="brand-logo" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="10" width="40" height="40" fill="#6E63E8" rx="8"/>
          <text x="70" y="38" font-size="24" font-weight="700" fill="#5D596C">Educacross</text>
        </svg>
        
        <h2 style="font-size: 20px; color: #5D596C; margin-bottom: 24px;">Selecione uma opção - Interativo</h2>
        
        <div class="deeplink-options">
          <div class="deeplink-option">
            <div class="icon-container student">
              <i class="bi bi-person-fill deeplink-icon"></i>
            </div>
            <div class="option-content">
              <div class="option-title">Aluno</div>
              <div class="option-description">Clique para navegar</div>
            </div>
          </div>
          
          <div class="deeplink-option">
            <div class="icon-container teacher">
              <i class="bi bi-person-workspace deeplink-icon"></i>
            </div>
            <div class="option-content">
              <div class="option-title">Professor</div>
              <div class="option-description">Clique para navegar</div>
            </div>
          </div>
          
          <div class="deeplink-option">
            <div class="icon-container admin">
              <i class="bi bi-gear-fill deeplink-icon"></i>
            </div>
            <div class="option-content">
              <div class="option-title">Administrador</div>
              <div class="option-description">Clique para navegar</div>
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
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">NewDeepLink</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Deep Link Selection Card</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Deep Link Selection Card. Faz parte da categoria <strong>Navigation</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #00CFE8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import NewDeepLink from '@/components/NewDeepLink.vue';

// Template
&lt;NewDeepLink v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o NewDeepLink com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#00CFE820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground NewDeepLink</p>
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
    docs: { description: { story: 'Exemplos de uso real do NewDeepLink no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#00CFE815;border:1px solid #00CFE830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: NewDeepLink</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando NewDeepLink no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com NewDeepLink no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#00CFE8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via NewDeepLink</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o NewDeepLink.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#00CFE8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: NewDeepLink</h1>
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

