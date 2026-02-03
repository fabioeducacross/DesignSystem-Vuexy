/**
 * NewDeepLink - Deep Link Selection Card
 * =======================================
 * 
 * Card interface for selecting deep link navigation options.
 * Shows circular icon buttons for different contexts.
 * 
 * @component NewDeepLink
 * @source educacross-frontoffice\src\components\deeplink\NewDeepLink.vue
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
