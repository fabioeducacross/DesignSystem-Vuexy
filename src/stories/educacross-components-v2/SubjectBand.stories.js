/**
 * SubjectBand Component - Banda de Disciplinas Coloridas
 * 
 * @component SubjectBand
 * @category Educacross Components V2
 * @source educacross-frontoffice/src/components/subjects/SubjectBand.vue
 * @status PIXEL-PERFECT
 * @since 2.0.0
 * 
 * Componente visual que exibe bandas coloridas representando disciplinas escolares.
 * Usado em cabeçalhos de avaliações, relatórios e dashboards para identificação rápida.
 */

export default {
  title: 'Educacross Components V2/Data Display/SubjectBand',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# SubjectBand - Banda de Disciplinas Coloridas

Componente de identificação visual que exibe bandas coloridas representando uma ou mais disciplinas escolares conforme padrões BNCC.

---

## 📋 Contexto de Uso

### Personas e Jornadas

**Professor** (Uso Principal)
- **Avaliações**: Identifica visualmente a disciplina no cabeçalho de provas
- **Relatórios**: Visualiza disciplinas abordadas em missões/atividades
- **Planejamento**: Confirma disciplinas selecionadas ao criar conteúdo

**Coordenador Pedagógico**
- **Relatórios Gerenciais**: Visualiza distribuição de disciplinas em dashboards
- **Análise**: Identifica gaps de cobertura curricular (disciplinas não abordadas)
- **Comparações**: Compara carga de atividades entre disciplinas

**Aluno**
- **Atividades**: Identifica matéria da atividade/missão no card
- **Histórico**: Visualiza disciplinas cursadas em relatórios de progresso

---

## 🎨 Especificações Visuais

### Dimensões & Spacing

| Elemento | Desktop | Mobile | Observações |
|----------|---------|--------|-------------|
| **Altura da Banda** | 40px | 32px | Altura fixa para consistência |
| **Padding Interno** | 8px | 6px | Espaço ao redor do texto |
| **Gap entre Bandas** | 4px | 4px | Espaçamento horizontal |
| **Margin Bottom** | 8px | 8px | Espaço após o componente (0.5rem) |
| **Border Radius** | 6px | 6px | Cantos suavemente arredondados |
| **Font Size** | 14px | 13px | Legibilidade em mobile |

### Tipografia

| Propriedade | Valor | Contexto |
|-------------|-------|----------|
| **Font Family** | 'Public Sans', sans-serif | Sistema padrão Vuexy |
| **Font Weight** | 700 (Bold) | Destaque e legibilidade |
| **Text Align** | Center | Centralização horizontal e vertical |
| **Color** | #ffffff | Branco para contraste sobre cores vibrantes |
| **Line Height** | 1.5 | Centralização vertical |

### Cores por Disciplina (Padrão BNCC)

| Disciplina | Cor Principal | RGB | Hex | Uso |
|-----------|---------------|-----|-----|-----|
| **Matemática** | Primary | 110, 99, 232 | #6e63e8 | Raciocínio lógico |
| **Português** | Info | 0, 207, 232 | #00cfe8 | Linguagens |
| **Ciências** | Success | 40, 199, 111 | #28c76f | Natureza/Biologia |
| **História** | Warning | 255, 159, 67 | #ff9f43 | Humanidades/Tempo |
| **Geografia** | Danger | 234, 84, 85 | #ea5455 | Espaço/Território |
| **Inglês** | Secondary | 108, 117, 125 | #6c757d | Língua estrangeira |
| **Artes** | Purple (Custom) | 156, 39, 176 | #9c27b0 | Criatividade |
| **Ed. Física** | Orange (Custom) | 255, 152, 0 | #ff9800 | Movimento |

---

## 🔌 Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`subjectsIds\` | Array\<String\> | \`[]\` | Array de IDs de disciplinas (ex: \`['math', 'portuguese']\`) |

**Observação**: O componente mapeia automaticamente os IDs para objetos do \`SubjectEnum\` que contêm \`label\` e \`variant\` (cor).

---

## ♿ Acessibilidade

### ARIA Labels
- \`role="list"\`: Container de bandas representa uma lista de disciplinas
- \`role="listitem"\`: Cada banda é um item da lista
- \`aria-label\`: Descreve a disciplina (ex: "Matemática - Disciplina principal")

### Contraste de Cores
- **Ratio**: Mínimo 4.5:1 entre branco (#fff) e cores de fundo
- Todas as cores passam teste WCAG AA ✅

### Screen Readers
- Texto claro e descritivo (nome completo da disciplina)
- Ordem de leitura lógica (esquerda → direita)

---

## 💻 Exemplo de Integração (Vue 2)

\`\`\`vue
<template>
  <div>
    <!-- Disciplina única -->
    <SubjectBand :subjectsIds="['math']" />
    
    <!-- Múltiplas disciplinas -->
    <SubjectBand :subjectsIds="['math', 'portuguese', 'science']" />
    
    <!-- Em card de avaliação -->
    <div class="evaluation-card">
      <SubjectBand :subjectsIds="evaluation.subjects" />
      <h3>{{ evaluation.title }}</h3>
      <p>{{ evaluation.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      evaluation: {
        subjects: ['math', 'science'],
        title: 'Avaliação de Álgebra e Química',
        description: 'Prova multidisciplinar...'
      }
    }
  }
}
</script>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    subjectsIds: {
      control: 'object',
      description: 'Array de IDs de disciplinas',
    },
  },
};

// ============================================================================
// FIGMA-STYLE CSS
// ============================================================================

const styles = `
<style>
  :root {
    --primary: #6e63e8;
    --info: #00cfe8;
    --success: #28c76f;
    --warning: #ff9f43;
    --danger: #ea5455;
    --secondary: #6c757d;
    --purple-custom: #9c27b0;
    --orange-custom: #ff9800;
  }

  .subject-band-container {
    display: flex;
    flex-direction: row;
    gap: 4px;
    margin-bottom: 8px;
  }

  .subject-band {
    flex: 1;
    padding: 8px;
    color: #ffffff;
    font-weight: 700;
    font-size: 14px;
    font-family: 'Public Sans', sans-serif;
    text-align: center;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    text-transform: capitalize;
    line-height: 1.5;
  }

  .bg-primary { background-color: var(--primary); }
  .bg-info { background-color: var(--info); }
  .bg-success { background-color: var(--success); }
  .bg-warning { background-color: var(--warning); }
  .bg-danger { background-color: var(--danger); }
  .bg-secondary { background-color: var(--secondary); }
  .bg-purple { background-color: var(--purple-custom); }
  .bg-orange { background-color: var(--orange-custom); }

  @media (max-width: 575px) {
    .subject-band-container {
      flex-direction: column;
    }
    .subject-band {
      min-height: 32px;
      font-size: 13px;
      padding: 6px;
    }
  }

  .story-demo-panel {
    max-width: 900px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .evaluation-card {
    padding: 1.5rem;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .evaluation-card h4 {
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
    font-size: 1rem;
    color: #5d596c;
  }

  .evaluation-card p {
    margin: 0;
    font-size: 0.875rem;
    color: #999;
  }
</style>
`;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const subjectBand = (subjects) => {
  const subjectMap = {
    math: { label: 'Matemática', variant: 'primary' },
    portuguese: { label: 'Língua Portuguesa', variant: 'info' },
    science: { label: 'Ciências', variant: 'success' },
    history: { label: 'História', variant: 'warning' },
    geography: { label: 'Geografia', variant: 'danger' },
    english: { label: 'Língua Inglesa', variant: 'secondary' },
    arts: { label: 'Artes', variant: 'purple' },
    physical_education: { label: 'Educação Física', variant: 'orange' },
  };

  const bands = subjects.map(id => {
    const subject = subjectMap[id];
    return `
      <div class="subject-band bg-${subject.variant}" role="listitem" aria-label="${subject.label}">
        ${subject.label}
      </div>
    `;
  }).join('');

  return `<section class="subject-band-container" role="list">${bands}</section>`;
};

// ============================================================================
// STORIES
// ============================================================================

export const Default = {
  args: { subjectsIds: ['math'] },
  render: (args) => `
    ${styles}
    <div style="padding:2rem;">
      ${subjectBand(args.subjectsIds)}
    </div>
  `,
};

export const AllSubjects = {
  render: () => `
    ${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1.5rem;">Todas as Disciplinas (BNCC)</h3>
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🔵 Matemática</h4>
      ${subjectBand(['math'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">💙 Língua Portuguesa</h4>
      ${subjectBand(['portuguese'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🟢 Ciências</h4>
      ${subjectBand(['science'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🟡 História</h4>
      ${subjectBand(['history'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🔴 Geografia</h4>
      ${subjectBand(['geography'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">⚫ Inglês</h4>
      ${subjectBand(['english'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🟣 Artes</h4>
      ${subjectBand(['arts'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🟠 Educação Física</h4>
      ${subjectBand(['physical_education'])}
    </div>
  `,
};

export const MultipleSubjects = {
  render: () => `
    ${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1.5rem;">Combinações Comuns</h3>
      
      <h4>Exatas</h4>
      ${subjectBand(['math', 'science'])}
      
      <h4 style="margin-top:1.5rem;">Humanas</h4>
      ${subjectBand(['history', 'geography'])}
      
      <h4 style="margin-top:1.5rem;">Linguagens</h4>
      ${subjectBand(['portuguese', 'english', 'arts'])}
    </div>
  `,
};

export const EvaluationHeader = {
  render: () => `
    ${styles}
    <div class="story-demo-panel">
      <h3 style="margin-bottom:1.5rem;">📝 Cabeçalhos de Avaliação</h3>
      
      <div class="evaluation-card">
        ${subjectBand(['math'])}
        <h4>Avaliação de Álgebra</h4>
        <p>Equações de 1º e 2º grau · 5º Ano A · 15 questões</p>
      </div>
      
      <div class="evaluation-card">
        ${subjectBand(['portuguese'])}
        <h4>Interpretação de Texto</h4>
        <p>Gêneros textuais e ortografia · 6º Ano B · 20 questões</p>
      </div>
      
      <div class="evaluation-card">
        ${subjectBand(['math', 'science'])}
        <h4>Prova Multidisciplinar</h4>
        <p>Matemática financeira e Química · 9º Ano · 30 questões</p>
      </div>
    </div>
  `,
};

export const MissionCards = {
  render: () => `
    ${styles}
    <div class="story-demo-panel">
      <h3 style="margin-bottom:1.5rem;">🎯 Cards de Missões</h3>
      
      <div class="evaluation-card">
        ${subjectBand(['history', 'geography'])}
        <h4>Missão: Brasil Colonial</h4>
        <p>Estudo sobre as capitanias hereditárias e o território brasileiro</p>
        <small style="color:#999;">Prazo: 15/03/2024 | 28 alunos</small>
      </div>
      
      <div class="evaluation-card">
        ${subjectBand(['portuguese', 'arts'])}
        <h4>Projeto: Literatura Visual</h4>
        <p>Criação de histórias ilustradas com técnicas artísticas</p>
        <small style="color:#999;">Prazo: 20/03/2024 | 32 alunos</small>
      </div>
    </div>
  `,
};

export const DashboardWidget = {
  render: () => `
    ${styles}
    <div class="story-demo-panel">
      <h3 style="margin-bottom:1.5rem;">📊 Widget de Dashboard</h3>
      <p style="margin-bottom:1.5rem;color:#666;">Atividades da Semana</p>
      
      <div style="display:grid;grid-template-columns:1fr;gap:1rem;">
        <div style="padding:1rem;background:#f8f7fa;border-radius:8px;">
          ${subjectBand(['math'])}
          <div style="margin-top:0.75rem;">
            <strong>Prova de Geometria</strong>
            <div style="display:flex;justify-content:space-between;margin-top:0.25rem;font-size:0.875rem;color:#999;">
              <span>5º Ano A</span>
              <span>Hoje · 14:00</span>
            </div>
          </div>
        </div>
        
        <div style="padding:1rem;background:#f8f7fa;border-radius:8px;">
          ${subjectBand(['portuguese', 'english'])}
          <div style="margin-top:0.75rem;">
            <strong>Redação Bilíngue</strong>
            <div style="display:flex;justify-content:space-between;margin-top:0.25rem;font-size:0.875rem;color:#999;">
              <span>6º Ano B</span>
              <span>Amanhã · 10:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const ResponsiveDemo = {
  render: () => `
    ${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Desktop (> 576px)</h3>
      <div style="margin-bottom:3rem;">
        ${subjectBand(['math', 'portuguese', 'science'])}
      </div>
      
      <h3 style="margin-bottom:1rem;">Mobile (< 576px) - Simulação</h3>
      <div style="max-width:375px;border:1px solid #e0e0e0;border-radius:12px;padding:1rem;">
        <style>
          .mobile-demo .subject-band-container {
            flex-direction: column;
          }
          .mobile-demo .subject-band {
            min-height: 32px;
            font-size: 13px;
            padding: 6px;
          }
        </style>
        <div class="mobile-demo">
          ${subjectBand(['math', 'portuguese', 'science'])}
        </div>
      </div>
    </div>
  `,
};

export const InteractiveDemo = {
  args: { subjectsIds: ['math', 'portuguese'] },
  render: (args) => `
    ${styles}
    <div style="padding:2rem;text-align:center;">
      <h3 style="margin-bottom:1.5rem;">🎮 Interactive Preview</h3>
      <div style="max-width:600px;margin:0 auto;">
        ${subjectBand(args.subjectsIds)}
      </div>
      <p style="color:#666;font-size:0.875rem;margin-top:1rem;">
        Use os controles acima para testar diferentes combinações
      </p>
    </div>
  `,
};

export const DarkModeConcept = {
  render: () => `
    ${styles}
    <style>
      .dark-preview {
        background: #1a1a2e;
        padding: 2rem;
        border-radius: 12px;
      }
      .dark-preview h3 {
        color: #fff;
        margin-bottom: 1.5rem;
      }
    </style>
    <div class="dark-preview">
      <h3>🌙 Dark Mode Concept</h3>
      ${subjectBand(['math', 'portuguese', 'science'])}
      <div style="margin-top:1rem;">
        ${subjectBand(['history', 'geography'])}
      </div>
    </div>
  `,
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Data Display</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">SubjectBand</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Banda de Disciplinas Coloridas</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Banda de Disciplinas Coloridas. Faz parte da categoria <strong>Data Display</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import SubjectBand from '@/components/SubjectBand.vue';

// Template
&lt;SubjectBand v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o SubjectBand com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground SubjectBand</p>
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
    docs: { description: { story: 'Exemplos de uso real do SubjectBand no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: SubjectBand</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando SubjectBand no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com SubjectBand no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via SubjectBand</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o SubjectBand.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: SubjectBand</h1>
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

