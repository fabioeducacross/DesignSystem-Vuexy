/**
 * subjects - Subject/Discipline Display Component
 * =========================================
 * 
 * Displays academic subjects with icons and metadata.
 * Used for showing discipline information across the platform.
 * 
 * @component subjects
 * @source educacross-frontoffice\src\components\subjects\subjects.vue
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
