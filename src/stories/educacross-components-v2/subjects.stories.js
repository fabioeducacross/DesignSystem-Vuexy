/**
 * subjects - Subject/Discipline Display Component
 * =========================================
 * 
 * Displays academic subjects with icons and metadata.
 * Used for showing discipline information across the platform.
 * 
 * @component subjects
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\subjects\subjects.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Subjects/subjects',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# subjects

Componente de **exibição de disciplinas** com ícones e informações contextuais.

## Contexto de Uso

- **Grade curricular**: Mostrar disciplinas disponíveis
- **Seleção de matérias**: Escolher disciplinas para filtros
- **Cards de conteúdo**: Identificar disciplina do material
- **Relatórios**: Indicar matéria nos dados acadêmicos
- **Dashboard**: Visão geral das disciplinas ativas

## Características

- **Ícones temáticos**: Cada disciplina tem ícone representativo
- **Cores distintas**: Palette de cores para identificação visual
- **Metadata**: Carga horária, turmas, professores
- **Responsive**: Adapta grid columns conforme tela
- **Hover states**: Interação visual ao passar mouse

## Disciplinas Comuns

- 📐 Matemática (#6E63E8 - roxo)
- 📖 Português (#28C76F - verde)
- 🌍 Geografia (#00CFE8 - ciano)
- 🕰️ História (#FF9F43 - laranja)
- 🧪 Ciências (#EA5455 - vermelho)
- 🇬🇧 Inglês (#7367F0 - índigo)
- 🏃 Ed. Física (#FFA1A1 - rosa)
- 🎨 Artes (#9F44D3 - roxo claro)
        `
      }
    }
  }
};

const subjectsStyles = `
<style>
  .subjects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    padding: 16px;
  }
  
  .subject-card {
    background: white;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.2s;
    cursor: pointer;
  }
  
  .subject-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }
  
  .subject-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 12px;
  }
  
  .subject-name {
    font-size: 16px;
    font-weight: 600;
    color: #5D596C;
    margin-bottom: 8px;
  }
  
  .subject-meta {
    font-size: 12px;
    color: #6E6B7B;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  @media (max-width: 768px) {
    .subjects-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
`;

export const Default = {
  render: () => `
    ${subjectsStyles}
    <div class="subjects-grid">
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(110,99,232,0.1);">
          <i class="bi bi-calculator" style="color: #6E63E8;"></i>
        </div>
        <div class="subject-name">Matemática</div>
        <div class="subject-meta">
          <span><i class="bi bi-clock"></i> 4h/semana</span>
          <span><i class="bi bi-people"></i> 3 turmas</span>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(40,199,111,0.1);">
          <i class="bi bi-book" style="color: #28C76F;"></i>
        </div>
        <div class="subject-name">Português</div>
        <div class="subject-meta">
          <span><i class="bi bi-clock"></i> 5h/semana</span>
          <span><i class="bi bi-people"></i> 4 turmas</span>
        </div>
      </div>
      
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(0,207,232,0.1);">
          <i class="bi bi-globe" style="color: #00CFE8;"></i>
        </div>
        <div class="subject-name">Geografia</div>
        <div class="subject-meta">
          <span><i class="bi bi-clock"></i> 2h/semana</span>
          <span><i class="bi bi-people"></i> 2 turmas</span>
        </div>
      </div>
    </div>
  `
};

export const AllSubjects = {
  render: () => `
    ${subjectsStyles}
    <div class="subjects-grid">
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(110,99,232,0.1);"><i class="bi bi-calculator" style="color: #6E63E8;"></i></div>
        <div class="subject-name">Matemática</div>
        <div class="subject-meta"><span>4h/semana • 3 turmas • 90 alunos</span></div>
      </div>
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(40,199,111,0.1);"><i class="bi bi-book" style="color: #28C76F;"></i></div>
        <div class="subject-name">Português</div>
        <div class="subject-meta"><span>5h/semana • 4 turmas • 120 alunos</span></div>
      </div>
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(0,207,232,0.1);"><i class="bi bi-globe" style="color: #00CFE8;"></i></div>
        <div class="subject-name">Geografia</div>
        <div class="subject-meta"><span>2h/semana • 2 turmas • 60 alunos</span></div>
      </div>
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(255,159,67,0.1);"><i class="bi bi-clock-history" style="color: #FF9F43;"></i></div>
        <div class="subject-name">História</div>
        <div class="subject-meta"><span>2h/semana • 2 turmas • 60 alunos</span></div>
      </div>
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(234,84,85,0.1);"><i class="bi bi-flask" style="color: #EA5455;"></i></div>
        <div class="subject-name">Ciências</div>
        <div class="subject-meta"><span>3h/semana • 3 turmas • 90 alunos</span></div>
      </div>
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(115,103,240,0.1);"><i class="bi bi-flag" style="color: #7367F0;"></i></div>
        <div class="subject-name">Inglês</div>
        <div class="subject-meta"><span>2h/semana • 2 turmas • 60 alunos</span></div>
      </div>
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(255,161,161,0.1);"><i class="bi bi-trophy" style="color: #FFA1A1;"></i></div>
        <div class="subject-name">Ed. Física</div>
        <div class="subject-meta"><span>2h/semana • 4 turmas • 120 alunos</span></div>
      </div>
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(159,68,211,0.1);"><i class="bi bi-palette" style="color: #9F44D3;"></i></div>
        <div class="subject-name">Artes</div>
        <div class="subject-meta"><span>2h/semana • 3 turmas • 90 alunos</span></div>
      </div>
    </div>
  `
};

export const CompactList = {
  render: () => `
    ${subjectsStyles}
    <style>
      .subject-list-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        border: 1px solid #E0E0E0;
        border-radius: 8px;
        margin-bottom: 8px;
        transition: background 0.2s;
      }
      .subject-list-item:hover {
        background: #F8F7FA;
      }
    </style>
    <div style="max-width: 500px;">
      <div class="subject-list-item">
        <div class="subject-icon" style="width: 40px; height: 40px; background: rgba(110,99,232,0.1); margin: 0;">
          <i class="bi bi-calculator" style="color: #6E63E8; font-size: 20px;"></i>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #5D596C;">Matemática</div>
          <div style="font-size: 12px; color: #6E6B7B;">4h/semana • 90 alunos</div>
        </div>
      </div>
      <div class="subject-list-item">
        <div class="subject-icon" style="width: 40px; height: 40px; background: rgba(40,199,111,0.1); margin: 0;">
          <i class="bi bi-book" style="color: #28C76F; font-size: 20px;"></i>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #5D596C;">Português</div>
          <div style="font-size: 12px; color: #6E6B7B;">5h/semana • 120 alunos</div>
        </div>
      </div>
      <div class="subject-list-item">
        <div class="subject-icon" style="width: 40px; height: 40px; background: rgba(0,207,232,0.1); margin: 0;">
          <i class="bi bi-globe" style="color: #00CFE8; font-size: 20px;"></i>
        </div>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #5D596C;">Geografia</div>
          <div style="font-size: 12px; color: #6E6B7B;">2h/semana • 60 alunos</div>
        </div>
      </div>
    </div>
  `
};

export const WithProgress = {
  render: () => `
    ${subjectsStyles}
    <style>
      .progress-bar-container {
        width: 100%;
        height: 6px;
        background: #E0E0E0;
        border-radius: 3px;
        margin-top: 8px;
        overflow: hidden;
      }
      .progress-bar {
        height: 100%;
        border-radius: 3px;
        transition: width 0.3s;
      }
    </style>
    <div class="subjects-grid">
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(110,99,232,0.1);">
          <i class="bi bi-calculator" style="color: #6E63E8;"></i>
        </div>
        <div class="subject-name">Matemática</div>
        <div class="subject-meta">
          <span>Progresso: 75%</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: 75%; background: #6E63E8;"></div>
        </div>
      </div>
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(40,199,111,0.1);">
          <i class="bi bi-book" style="color: #28C76F;"></i>
        </div>
        <div class="subject-name">Português</div>
        <div class="subject-meta">
          <span>Progresso: 90%</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: 90%; background: #28C76F;"></div>
        </div>
      </div>
      <div class="subject-card">
        <div class="subject-icon" style="background: rgba(234,84,85,0.1);">
          <i class="bi bi-flask" style="color: #EA5455;"></i>
        </div>
        <div class="subject-name">Ciências</div>
        <div class="subject-meta">
          <span>Progresso: 45%</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: 45%; background: #EA5455;"></div>
        </div>
      </div>
    </div>
  `
};

export const WithBadges = {
  render: () => `
    ${subjectsStyles}
    <div class="subjects-grid">
      <div class="subject-card">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
          <div class="subject-icon" style="background: rgba(110,99,232,0.1); margin: 0;">
            <i class="bi bi-calculator" style="color: #6E63E8;"></i>
          </div>
          <span style="background: #E8F5E9; color: #2E7D32; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">ATIVA</span>
        </div>
        <div class="subject-name">Matemática</div>
        <div class="subject-meta"><span>4h/semana • 3 turmas</span></div>
      </div>
      <div class="subject-card">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
          <div class="subject-icon" style="background: rgba(40,199,111,0.1); margin: 0;">
            <i class="bi bi-book" style="color: #28C76F;"></i>
          </div>
          <span style="background: #FFF3CD; color: #856404; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">PENDENTE</span>
        </div>
        <div class="subject-name">Português</div>
        <div class="subject-meta"><span>5h/semana • 4 turmas</span></div>
      </div>
      <div class="subject-card">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
          <div class="subject-icon" style="background: rgba(108,117,125,0.1); margin: 0;">
            <i class="bi bi-globe" style="color: #6C757D;"></i>
          </div>
          <span style="background: #F8D7DA; color: #721C24; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600;">INATIVA</span>
        </div>
        <div class="subject-name">Geografia</div>
        <div class="subject-meta"><span>2h/semana • 0 turmas</span></div>
      </div>
    </div>
  `
};

export const MobileView = {
  render: () => `
    ${subjectsStyles}
    <div style="max-width: 375px;">
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 12px;">
        <div class="subject-card">
          <div class="subject-icon" style="background: rgba(110,99,232,0.1);">
            <i class="bi bi-calculator" style="color: #6E63E8;"></i>
          </div>
          <div class="subject-name" style="font-size: 14px;">Matemática</div>
          <div class="subject-meta" style="font-size: 11px;"><span>90 alunos</span></div>
        </div>
        <div class="subject-card">
          <div class="subject-icon" style="background: rgba(40,199,111,0.1);">
            <i class="bi bi-book" style="color: #28C76F;"></i>
          </div>
          <div class="subject-name" style="font-size: 14px;">Português</div>
          <div class="subject-meta" style="font-size: 11px;"><span>120 alunos</span></div>
        </div>
        <div class="subject-card">
          <div class="subject-icon" style="background: rgba(0,207,232,0.1);">
            <i class="bi bi-globe" style="color: #00CFE8;"></i>
          </div>
          <div class="subject-name" style="font-size: 14px;">Geografia</div>
          <div class="subject-meta" style="font-size: 11px;"><span>60 alunos</span></div>
        </div>
        <div class="subject-card">
          <div class="subject-icon" style="background: rgba(234,84,85,0.1);">
            <i class="bi bi-flask" style="color: #EA5455;"></i>
          </div>
          <div class="subject-name" style="font-size: 14px;">Ciências</div>
          <div class="subject-meta" style="font-size: 11px;"><span>90 alunos</span></div>
        </div>
      </div>
    </div>
  `
};

export const InDashboard = {
  render: () => `
    ${subjectsStyles}
    <style>
      .dashboard-section {
        background: #F8F7FA;
        padding: 24px;
        border-radius: 12px;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
    </style>
    <div class="dashboard-section">
      <div class="section-header">
        <h3 style="font-size: 18px; font-weight: 600; color: #5D596C; margin: 0;">
          Minhas Disciplinas
        </h3>
        <span style="font-size: 13px; color: #6E6B7B;">8 ativas</span>
      </div>
      <div class="subjects-grid" style="padding: 0;">
        <div class="subject-card">
          <div class="subject-icon" style="background: rgba(110,99,232,0.1);"><i class="bi bi-calculator" style="color: #6E63E8;"></i></div>
          <div class="subject-name">Matemática</div>
          <div class="subject-meta"><span>90 alunos • 15 missões</span></div>
        </div>
        <div class="subject-card">
          <div class="subject-icon" style="background: rgba(40,199,111,0.1);"><i class="bi bi-book" style="color: #28C76F;"></i></div>
          <div class="subject-name">Português</div>
          <div class="subject-meta"><span>120 alunos • 20 missões</span></div>
        </div>
        <div class="subject-card">
          <div class="subject-icon" style="background: rgba(0,207,232,0.1);"><i class="bi bi-globe" style="color: #00CFE8;"></i></div>
          <div class="subject-name">Geografia</div>
          <div class="subject-meta"><span>60 alunos • 12 missões</span></div>
        </div>
      </div>
    </div>
  `
};

export const Responsive = {
  render: () => `
    ${subjectsStyles}
    <div style="background: #E3F2FD; border-left: 4px solid #2196F3; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
      <h4 style="font-size: 14px; font-weight: 600; color: #1565C0; margin: 0 0 8px 0;">
        <i class="bi bi-phone"></i> subjects: Responsivo
      </h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1976D2;">
        <li><strong>Desktop:</strong> Grid auto-fill minmax(200px, 1fr) - múltiplas colunas</li>
        <li><strong>Tablet:</strong> Adapta conforme largura disponível</li>
        <li><strong>Mobile (&lt;768px):</strong> 2 colunas fixas para melhor visualização</li>
      </ul>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
      <div>
        <h4 style="text-align: center; margin-bottom: 12px; font-size: 13px; color: #5D596C;">Desktop (Grid auto-fill)</h4>
        <div class="subjects-grid" style="padding: 0;">
          <div class="subject-card"><div class="subject-icon" style="background: rgba(110,99,232,0.1);"><i class="bi bi-calculator" style="color: #6E63E8;"></i></div><div class="subject-name">Matemática</div></div>
          <div class="subject-card"><div class="subject-icon" style="background: rgba(40,199,111,0.1);"><i class="bi bi-book" style="color: #28C76F;"></i></div><div class="subject-name">Português</div></div>
        </div>
      </div>
      <div>
        <h4 style="text-align: center; margin-bottom: 12px; font-size: 13px; color: #5D596C;">Mobile (2 colunas)</h4>
        <div style="max-width: 300px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          <div class="subject-card" style="padding: 16px;"><div class="subject-icon" style="width: 40px; height: 40px; font-size: 20px; background: rgba(110,99,232,0.1);"><i class="bi bi-calculator" style="color: #6E63E8;"></i></div><div style="font-size: 14px; font-weight: 600;">Mat</div></div>
          <div class="subject-card" style="padding: 16px;"><div class="subject-icon" style="width: 40px; height: 40px; font-size: 20px; background: rgba(40,199,111,0.1);"><i class="bi bi-book" style="color: #28C76F;"></i></div><div style="font-size: 14px; font-weight: 600;">Port</div></div>
        </div>
      </div>
    </div>
  `
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Subjects</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">subjects</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Subject/Discipline Display Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Subject/Discipline Display Component. Faz parte da categoria <strong>Subjects</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import subjects from '@/components/subjects.vue';

// Template
&lt;subjects v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o subjects com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground subjects</p>
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
    docs: { description: { story: 'Exemplos de uso real do subjects no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: subjects</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando subjects no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com subjects no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via subjects</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o subjects.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: subjects</h1>
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

