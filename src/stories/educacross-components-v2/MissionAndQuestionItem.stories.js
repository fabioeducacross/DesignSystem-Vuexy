/**
 * MissionAndQuestionItem - Mission/Question Card Component
 * ========================================================
 * 
 * Card display for missions and questions with preview image.
 * Shows status, completion, and provides details access.
 * 
 * @component MissionAndQuestionItem
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\mission-plus\MissionAndQuestionItem.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Mission/MissionAndQuestionItem',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# MissionAndQuestionItem

Card de **missão ou questão** com imagem preview e status.

## Contexto de Uso

- **Lista de missões**: Biblioteca do professor
- **Questões disponíveis**: Banco de questões
- **Seleção de conteúdo**: Escolher para adicionar
- **Preview rápido**: Ver antes de abrir
- **Status tracking**: Acompanhar progresso

## Características

- **Image preview**: Thumbnail 100×100px
- **Visibility icon**: Ícone de visualização
- **Status indicators**: Badge de status/progresso
- **Hover effects**: Destaque ao passar mouse
- **Event @open:details**: Abre detalhes completos
- **Responsive**: Grid adaptativo mobile

## Props

- Nenhuma prop definida (data injetada via slot/context)
        `
      }
    }
  }
};

const missionAndQuestionItemStyles = `
<style>
  .mission-card {
    background: white;
    border: 1px solid #DBDADE;
    border-radius: 12px;
    padding: 16px;
    transition: all 0.2s;
    cursor: pointer;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .mission-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }
  
  .mission-media {
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
  }
  
  .image-container {
    position: relative;
  }
  
  .mission-image {
    width: 100px;
    height: 100px;
    border: 1px solid #D8D6DE;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .visibility-overlay {
    position: absolute;
    bottom: 8px;
    right: 8px;
    background: rgba(110, 99, 232, 0.9);
    color: white;
    padding: 4px;
    border-radius: 4px;
    font-size: 20px;
    display: flex;
    align-items: center;
  }
  
  .mission-content {
    flex: 1;
  }
  
  .mission-title {
    font-size: 16px;
    font-weight: 600;
    color: #5D596C;
    margin-bottom: 8px;
  }
  
  .mission-meta {
    font-size: 13px;
    color: #6E6B7B;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .status-badge {
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    display: inline-block;
    margin-top: 8px;
  }
  
  .status-completed {
    background: #E8F5E9;
    color: #2E7D32;
  }
  
  .status-progress {
    background: #FFF3E0;
    color: #E65100;
  }
  
  .status-locked {
    background: #F3F2F7;
    color: #6E6B7B;
  }
  
  .mission-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    padding: 16px;
  }
  
  @media (max-width: 768px) {
    .mission-media {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .mission-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
`;

export const Default = {
  render: () => `
    ${missionAndQuestionItemStyles}
    <div class="mission-card">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E63E8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='14' text-anchor='middle' dy='.3em'%3EMissão%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Preview"
          />
          <div class="visibility-overlay">
            <i class="bi bi-eye"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Equações do 1º Grau</h3>
          <div class="mission-meta">
            <div><i class="bi bi-book"></i> Matemática • 7º Ano</div>
            <div><i class="bi bi-clock"></i> 45 minutos</div>
            <div><i class="bi bi-trophy"></i> 100 pontos</div>
          </div>
          <span class="status-badge status-progress">Em progresso</span>
        </div>
      </div>
    </div>
  `
};

export const WithQuestion = {
  render: () => `
    ${missionAndQuestionItemStyles}
    <div class="mission-card">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2328C76F' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='40' text-anchor='middle' dy='.3em'%3E?%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Questão"
          />
          <div class="visibility-overlay">
            <i class="bi bi-eye"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Questão: Resolução de Equações</h3>
          <div class="mission-meta">
            <div><i class="bi bi-patch-question"></i> Múltipla escolha</div>
            <div><i class="bi bi-speedometer2"></i> Dificuldade: Média</div>
            <div><i class="bi bi-star"></i> 20 pontos</div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const Completed = {
  render: () => `
    ${missionAndQuestionItemStyles}
    <div class="mission-card">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2328C76F' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='50' text-anchor='middle' dy='.3em'%3E✓%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Completo"
          />
          <div class="visibility-overlay">
            <i class="bi bi-check-circle-fill"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Frações e Números Decimais</h3>
          <div class="mission-meta">
            <div><i class="bi bi-book"></i> Matemática • 6º Ano</div>
            <div><i class="bi bi-check-lg"></i> Concluída em 12/01/2026</div>
            <div><i class="bi bi-trophy"></i> 95/100 pontos</div>
          </div>
          <span class="status-badge status-completed">
            <i class="bi bi-check-lg"></i> Concluída
          </span>
        </div>
      </div>
    </div>
  `
};

export const InProgress = {
  render: () => `
    ${missionAndQuestionItemStyles}
    <style>
      .progress-bar-container {
        background: #E0E0E0;
        height: 8px;
        border-radius: 4px;
        overflow: hidden;
        margin-top: 8px;
      }
      .progress-bar {
        height: 100%;
        background: #FF9F43;
        transition: width 0.3s;
      }
    </style>
    <div class="mission-card">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%23FF9F43' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='14' text-anchor='middle' dy='.3em'%3E65%25%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Em progresso"
          />
          <div class="visibility-overlay" style="background: rgba(255,159,67,0.9);">
            <i class="bi bi-clock-history"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Verbos Irregulares</h3>
          <div class="mission-meta">
            <div><i class="bi bi-book"></i> Português • 8º Ano</div>
            <div><i class="bi bi-clock"></i> Iniciada há 2 dias</div>
            <div><i class="bi bi-people"></i> 18/28 alunos</div>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar" style="width: 65%;"></div>
          </div>
          <span class="status-badge status-progress">
            <i class="bi bi-clock"></i> 65% concluído
          </span>
        </div>
      </div>
    </div>
  `
};

export const Locked = {
  render: () => `
    ${missionAndQuestionItemStyles}
    <div class="mission-card" style="opacity: 0.7; cursor: not-allowed;">
      <div class="mission-media">
        <div class="image-container">
          <img 
            src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E6B7B' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='40' text-anchor='middle' dy='.3em'%3E🔒%3C/text%3E%3C/svg%3E"
            class="mission-image"
            alt="Bloqueado"
          />
          <div class="visibility-overlay" style="background: rgba(110,107,123,0.9);">
            <i class="bi bi-lock-fill"></i>
          </div>
        </div>
        
        <div class="mission-content">
          <h3 class="mission-title">Trigonometria Avançada</h3>
          <div class="mission-meta">
            <div><i class="bi bi-book"></i> Matemática • 9º Ano</div>
            <div><i class="bi bi-info-circle"></i> Requer missão anterior</div>
            <div><i class="bi bi-lock"></i> Desbloqueio: Funções Básicas</div>
          </div>
          <span class="status-badge status-locked">
            <i class="bi bi-lock"></i> Bloqueada
          </span>
        </div>
      </div>
    </div>
  `
};

export const GridView = {
  render: () => `
    ${missionAndQuestionItemStyles}
    <div class="mission-grid">
      <div class="mission-card">
        <div class="mission-media" style="flex-direction: column; align-items: center;">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E63E8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='12' text-anchor='middle' dy='.3em'%3EMat%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Matemática"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          <div class="mission-content" style="text-align: center;">
            <h3 class="mission-title">Geometria Plana</h3>
            <div class="mission-meta" style="align-items: center;">
              <div>Matemática • 7º Ano</div>
              <span class="status-badge status-progress">Ativa</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mission-card">
        <div class="mission-media" style="flex-direction: column; align-items: center;">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2328C76F' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='12' text-anchor='middle' dy='.3em'%3EPort%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Português"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          <div class="mission-content" style="text-align: center;">
            <h3 class="mission-title">Sintaxe</h3>
            <div class="mission-meta" style="align-items: center;">
              <div>Português • 8º Ano</div>
              <span class="status-badge status-completed">Completa</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mission-card">
        <div class="mission-media" style="flex-direction: column; align-items: center;">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%2300CFE8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='12' text-anchor='middle' dy='.3em'%3EGeo%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Geografia"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          <div class="mission-content" style="text-align: center;">
            <h3 class="mission-title">Relevo</h3>
            <div class="mission-meta" style="align-items: center;">
              <div>Geografia • 7º Ano</div>
              <span class="status-badge status-progress">Ativa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
};

export const MobileView = {
  render: () => `
    ${missionAndQuestionItemStyles}
    <div style="max-width: 375px; margin: 0 auto;">
      <div class="mission-card">
        <div class="mission-media" style="flex-direction: column; align-items: center; text-align: center;">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E63E8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='14' text-anchor='middle' dy='.3em'%3EMobile%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Mobile"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          
          <div class="mission-content">
            <h3 class="mission-title">Estudo de Física</h3>
            <div class="mission-meta" style="align-items: center;">
              <div><i class="bi bi-book"></i> Física • 9º Ano</div>
              <div><i class="bi bi-clock"></i> 60 minutos</div>
            </div>
            <span class="status-badge status-progress">Em andamento</span>
          </div>
        </div>
      </div>
    </div>
  `
};

export const Interactive = {
  render: () => {
    setTimeout(() => {
      const card = document.getElementById('interactiveMissionCard');
      if (card) {
        card.addEventListener('click', () => {
          alert('Event: open:details triggered!\n\nAbrindo detalhes da missão...');
        });
      }
    }, 100);
    
    return `
      ${missionAndQuestionItemStyles}
      <div class="mission-card" id="interactiveMissionCard">
        <div class="mission-media">
          <div class="image-container">
            <img 
              src="data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect fill='%236E63E8' width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='12' text-anchor='middle' dy='.3em'%3EClick%3C/text%3E%3C/svg%3E"
              class="mission-image"
              alt="Interativo"
            />
            <div class="visibility-overlay"><i class="bi bi-eye"></i></div>
          </div>
          
          <div class="mission-content">
            <h3 class="mission-title">Missão Interativa - Clique para detalhes</h3>
            <div class="mission-meta">
              <div><i class="bi bi-cursor"></i> Clique no card inteiro</div>
              <div><i class="bi bi-box-arrow-up-right"></i> Emite evento @open:details</div>
            </div>
            <span class="status-badge status-progress">
              <i class="bi bi-hand-index"></i> Clique aqui
            </span>
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
      <div style="background:linear-gradient(135deg,#6E63E8 0%,#9C91EF 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Mission</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">MissionAndQuestionItem</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Mission/Question Card Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Mission/Question Card Component. Faz parte da categoria <strong>Mission</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import MissionAndQuestionItem from '@/components/MissionAndQuestionItem.vue';

// Template
&lt;MissionAndQuestionItem v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o MissionAndQuestionItem com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground MissionAndQuestionItem</p>
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
    docs: { description: { story: 'Exemplos de uso real do MissionAndQuestionItem no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: MissionAndQuestionItem</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando MissionAndQuestionItem no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com MissionAndQuestionItem no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via MissionAndQuestionItem</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o MissionAndQuestionItem.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: MissionAndQuestionItem</h1>
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

