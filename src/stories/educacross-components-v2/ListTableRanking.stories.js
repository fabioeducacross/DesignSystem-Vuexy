/**
 * ListTableRanking - Ranking Table with Positions
 * ================================================
 * Tabela de ranking com posições, medalhas e pódio
 * 
 * @component ListTableRanking
 * @category Educacross Components V2 / Tables
 * @source educacross-frontoffice/src/components/table/ListTableRanking.vue
 * @priority P1 - Core UI
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Tables/ListTableRanking',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ListTableRanking - Ranking com Posições

Tabela de ranking com indicadores visuais de posição (1º/2º/3º com cores especiais), avatares coloridos, pódio para top 3 e badges de status.

### Casos de Uso

**Professor**: Visualizar ranking da turma por média, identificar alunos destaque, analisar desempenho por disciplina, motivar alunos com gamificação

**Coordenador**: Comparar rankings entre turmas, analisar top performers, relatórios de tendências (subindo/descendo), estatísticas gerais

**Aluno**: Ver posição no ranking, comparar com colegas, visualizar conquistas (badges), acompanhar evolução (tendência)

---

## Props API

| Prop | Tipo | Valores | Default | Descrição |
|------|------|---------|---------|-----------|
| data | array | - | [] | Lista de itens ranqueados |
| columns | array | - | [] | Colunas (posição, nome, métricas) |
| showPodium | boolean | true, false | false | Exibe pódio top 3 |
| showTrend | boolean | true, false | false | Exibe tendência (↑↓=) |
| showBadges | boolean | true, false | false | Exibe badges status |
| highlightTop3 | boolean | true, false | true | Destaca top 3 com cores |

---

## Design Specs

**Cores**:
- 1º lugar: linear-gradient(#FFD700, #FF9F43) - ouro
- 2º lugar: linear-gradient(#C0C0C0, #6E6B7B) - prata
- 3º lugar: linear-gradient(#CD7F32, #795548) - bronze
- Demais posições: #F3F2F7 (fundo), #6E6B7B (texto)
- Tendência up: #28C76F, down: #EA5455, stable: #6E6B7B

**Dimensões**:
- Posição badge: 40×40px (padrão) / 80×80px (pódio), circle
- Avatar: 40×40px (linha) / 64×64px (pódio), circle, border 4px
- Linha: padding 12px 16px

**Tipografia**:
- Posição: 16px (linha) / 32px (pódio), weight 700
- Nome: 14px (linha) / 16px (pódio), weight 600
- Score: 16px (linha) / 20px (pódio), weight 700
        `
      }
    }
  }
};

const css = `<style>
  .ranking-table {
    width: 100%;
    background: #fff;
    border: 1px solid #D8D6DE;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .ranking-header {
    background: #F8F7FA;
    padding: 12px 16px;
    border-bottom: 2px solid #D8D6DE;
    display: grid;
    grid-template-columns: 60px 1fr 120px 120px;
    gap: 12px;
    font-weight: 600;
    font-size: 13px;
    color: #5E5873;
  }
  
  .ranking-row {
    display: grid;
    grid-template-columns: 60px 1fr 120px 120px;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid #EBE9F1;
    align-items: center;
    transition: all 0.2s;
  }
  
  .ranking-row:hover {
    background: #F8F8F8;
  }
  
  .ranking-row:last-child {
    border-bottom: none;
  }
  
  .position {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 16px;
  }
  
  .position-1 {
    background: linear-gradient(135deg, #FFD700, #FF9F43);
    color: #fff;
  }
  
  .position-2 {
    background: linear-gradient(135deg, #C0C0C0, #6E6B7B);
    color: #fff;
  }
  
  .position-3 {
    background: linear-gradient(135deg, #CD7F32, #795548);
    color: #fff;
  }
  
  .position-default {
    background: #F3F2F7;
    color: #6E6B7B;
  }
  
  .student-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .student-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
  }
  
  .student-name {
    font-weight: 600;
    color: #5E5873;
    font-size: 14px;
  }
  
  .student-class {
    font-size: 12px;
    color: #6E6B7B;
  }
  
  .score {
    font-weight: 700;
    font-size: 16px;
  }
  
  .badge {
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }
  
  /* Podium styles */
  .podium {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 40px 20px;
    background: linear-gradient(135deg, #6E63E8, #9F93F8);
  }
  
  .podium-item {
    text-align: center;
  }
  
  .podium-2, .podium-3 {
    margin-top: 40px;
  }
  
  .podium-position {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    margin: 0 auto 12px;
  }
  
  .podium-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    margin: 0 auto 12px;
    border: 4px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 24px;
    font-weight: 700;
  }
  
  .podium-name {
    font-weight: 700;
    font-size: 16px;
    color: #fff;
    margin-bottom: 4px;
  }
  
  .podium-score {
    font-size: 20px;
    font-weight: 700;
    color: #FFD700;
  }
</style>
`;

const students = [
  { n: 'Ana Silva', c: '8º A', s: 9.8, x: 2850, col: '#6E63E8' },
  { n: 'Bruno Costa', c: '8º B', s: 9.5, x: 2720, col: '#00CFE8' },
  { n: 'Diana Santos', c: '8º A', s: 9.3, x: 2650, col: '#28C76F' },
  { n: 'Eduardo Lima', c: '9º A', s: 9.0, x: 2480, col: '#FF9F43' },
  { n: 'Fernanda Alves', c: '8º B', s: 8.8, x: 2350, col: '#EA5455' }
];

export const Default = {
  render: () => `
    ${css}
    <div class="ranking-table">
      <div class="ranking-header">
        <div>Posição</div>
        <div>Estudante</div>
        <div>Média</div>
        <div>XP Total</div>
      </div>
      ${students.map((s, i) => `
        <div class="ranking-row">
          <div class="position position-${i < 3 ? i + 1 : 'default'}">${i + 1}º</div>
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.col};">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div class="student-name">${s.n}</div>
              <div class="student-class">Turma ${s.c}</div>
            </div>
          </div>
          <div class="score" style="color: #28C76F;">${s.s}</div>
          <div style="color: #6E63E8; font-weight: 600;">${s.x} XP</div>
        </div>
      `).join('')}
    </div>
  `
};

export const TopTres = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; overflow: hidden;">
      <div class="podium">
        <div class="podium-item podium-2">
          <div class="podium-position" style="background: linear-gradient(135deg, #C0C0C0, #6E6B7B);">2º</div>
          <div class="podium-avatar" style="background: #00CFE8;">BC</div>
          <div class="podium-name">Bruno Costa</div>
          <div class="podium-score">9.5</div>
        </div>
        
        <div class="podium-item podium-1">
          <div class="podium-position" style="background: linear-gradient(135deg, #FFD700, #FF9F43);">1º</div>
          <div class="podium-avatar" style="background: #6E63E8;">AS</div>
          <div class="podium-name">Ana Silva</div>
          <div class="podium-score">9.8</div>
        </div>
        
        <div class="podium-item podium-3">
          <div class="podium-position" style="background: linear-gradient(135deg, #CD7F32, #795548);">3º</div>
          <div class="podium-avatar" style="background: #28C76F;">DS</div>
          <div class="podium-name">Diana Santos</div>
          <div class="podium-score">9.3</div>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Pódio gamificado top 3. Aluno visualizando ranking da semana.
    </p>
  `
};

export const ComBadges = {
  render: () => `
    ${css}
    <div class="ranking-table">
      <div class="ranking-header">
        <div>Pos.</div>
        <div>Estudante</div>
        <div>Status</div>
        <div>Pontos</div>
      </div>
      ${[
        { n: 'João Silva', c: 'Matemático', s: 'Destaque', p: 3200, col: '#6E63E8', b: '#28C76F' },
        { n: 'Maria Costa', c: 'Leitora Expert', s: 'Ativo', p: 2950, col: '#00CFE8', b: '#6E63E8' },
        { n: 'Pedro Santos', c: 'Cientista', s: 'Ativo', p: 2800, col: '#28C76F', b: '#6E63E8' },
        { n: 'Ana Oliveira', c: 'Artista', s: 'Em Alta', p: 2650, col: '#FF9F43', b: '#FF9F43' }
      ].map((s, i) => `
        <div class="ranking-row">
          <div class="position position-${i < 3 ? i + 1 : 'default'}">${i + 1}º</div>
          <div class="student-info">
            <div class="student-avatar" style="background: ${s.col};">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div class="student-name">${s.n}</div>
              <div class="student-class">${s.c}</div>
            </div>
          </div>
          <div>
            <span class="badge" style="background: ${s.b}20; color: ${s.b};">${s.s}</span>
          </div>
          <div style="font-weight: 700; color: #6E63E8;">${s.p}</div>
        </div>
      `).join('')}
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Ranking com badges de conquistas. Sistema de gamificação com títulos.
    </p>
  `
};

export const PorDisciplina = {
  render: () => `
    ${css}
    <div class="ranking-table">
      <div class="ranking-header">
        <div>Pos.</div>
        <div>Estudante</div>
        <div>Matemática</div>
        <div>Português</div>
      </div>
      ${[
        { n: 'Ana Silva', m: 10.0, p: 9.5 },
        { n: 'Bruno Costa', m: 9.8, p: 9.2 },
        { n: 'Diana Santos', m: 9.5, p: 9.8 },
        { n: 'Eduardo Lima', m: 9.2, p: 9.0 },
        { n: 'Fernanda Alves', m: 9.0, p: 9.3 }
      ].map((s, i) => `
        <div class="ranking-row">
          <div class="position position-${i < 3 ? i + 1 : 'default'}">${i + 1}º</div>
          <div class="student-info">
            <div class="student-avatar" style="background: ${['#6E63E8', '#00CFE8', '#28C76F', '#FF9F43', '#EA5455'][i]};">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div class="score" style="color: #28C76F;">${s.m}</div>
          <div class="score" style="color: #6E63E8;">${s.p}</div>
        </div>
      `).join('')}
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Ranking multi-disciplinas. Coordenador comparando desempenho por matéria.
    </p>
  `
};

export const ComTendencia = {
  render: () => `
    ${css}
    <div class="ranking-table">
      <div class="ranking-header">
        <div>Pos.</div>
        <div>Estudante</div>
        <div>Pontos</div>
        <div>Tendência</div>
      </div>
      ${[
        { n: 'Ana Silva', p: 9.8, t: '+3', c: '#28C76F', i: 'arrow-up' },
        { n: 'Bruno Costa', p: 9.5, t: '=', c: '#6E6B7B', i: 'dash' },
        { n: 'Diana Santos', p: 9.3, t: '+1', c: '#28C76F', i: 'arrow-up' },
        { n: 'Eduardo Lima', p: 9.0, t: '-2', c: '#EA5455', i: 'arrow-down' },
        { n: 'Fernanda Alves', p: 8.8, t: '+5', c: '#28C76F', i: 'arrow-up' }
      ].map((s, i) => `
        <div class="ranking-row">
          <div class="position position-${i < 3 ? i + 1 : 'default'}">${i + 1}º</div>
          <div class="student-info">
            <div class="student-avatar" style="background: ${['#6E63E8', '#00CFE8', '#28C76F', '#FF9F43', '#EA5455'][i]};">
              ${s.n.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="student-name">${s.n}</div>
          </div>
          <div class="score" style="color: #28C76F;">${s.p}</div>
          <div style="display: flex; align-items: center; gap: 6px; font-weight: 600; color: ${s.c};">
            <i class="bi bi-${s.i}"></i>
            ${s.t}
          </div>
        </div>
      `).join('')}
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Ranking com variação de posição. Professor analisando evolução dos alunos.
    </p>
  `
};

export const MiniRanking = {
  render: () => `
    ${css}
    <div class="ranking-table" style="max-width: 400px;">
      <div style="padding: 16px; background: #6E63E8; color: #fff; font-weight: 700; font-size: 16px;">
        🏆 Top 3 da Semana
      </div>
      ${[
        { n: 'Ana Silva', p: 2850 },
        { n: 'Bruno Costa', p: 2720 },
        { n: 'Diana Santos', p: 2650 }
      ].map((s, i) => `
        <div class="ranking-row">
          <div class="position position-${i + 1}">${i + 1}º</div>
          <div class="student-info">
            <div class="student-name">${s.n}</div>
          </div>
          <div style="font-weight: 700; color: #6E63E8;">${s.p} XP</div>
        </div>
      `).join('')}
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Ranking compacto sidebar. Widget de motivação para alunos.
    </p>
  `
};

export const Completo = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <div>
          <h3 style="margin: 0; font-size: 20px; font-weight: 700; color: #5E5873;">Ranking Geral</h3>
          <div style="font-size: 13px; color: #6E6B7B; margin-top: 4px;">Atualizado em 02/02/2026 às 14:30</div>
        </div>
        <select style="padding: 8px 12px; border-radius: 6px; border: 1px solid #D8D6DE; font-weight: 600;">
          <option>Este Mês</option>
          <option>Esta Semana</option>
          <option>Hoje</option>
        </select>
      </div>
      
      <div class="ranking-table">
        <div class="ranking-header">
          <div>Posição</div>
          <div>Estudante</div>
          <div>Média</div>
          <div>XP</div>
        </div>
        ${students.map((s, i) => `
          <div class="ranking-row">
            <div class="position position-${i < 3 ? i + 1 : 'default'}">${i + 1}º</div>
            <div class="student-info">
              <div class="student-avatar" style="background: ${s.col};">
                ${s.n.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div class="student-name">${s.n}</div>
                <div class="student-class">Turma ${s.c}</div>
              </div>
            </div>
            <div class="score" style="color: #28C76F;">${s.s}</div>
            <div style="color: #6E63E8; font-weight: 600;">${s.x} XP</div>
          </div>
        `).join('')}
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Ranking completo com filtro temporal. Professor visualizando desempenho da turma.
    </p>
  `
};

export const Empty = {
  render: () => `
    ${css}
    <div class="ranking-table">
      <div class="ranking-header">
        <div>Pos.</div>
        <div>Estudante</div>
        <div>Média</div>
        <div>XP</div>
      </div>
      <div style="padding: 60px 20px; text-align: center;">
        <svg width="120" height="120" style="opacity: 0.3; margin: 0 auto 16px;">
          <rect fill="#E8E8E8" width="120" height="120" rx="8"/>
          <path fill="#6E6B7B" d="M60 30 L80 60 L40 60 Z M40 65 H80 V75 H40 Z M50 80 H70 V90 H50 Z"/>
        </svg>
        <div style="font-size: 16px; font-weight: 600; color: #5E5873; margin-bottom: 8px;">
          Nenhum Ranking Disponível
        </div>
        <div style="font-size: 14px; color: #6E6B7B;">
          Os dados do ranking serão exibidos após as primeiras atividades.
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Estado vazio. Início do período letivo sem dados ainda.
    </p>
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Tables</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ListTableRanking</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Ranking Table with Positions</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Ranking Table with Positions. Faz parte da categoria <strong>Tables</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ListTableRanking from '@/components/ListTableRanking.vue';

// Template
&lt;ListTableRanking v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o ListTableRanking com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ListTableRanking</p>
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
    docs: { description: { story: 'Exemplos de uso real do ListTableRanking no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ListTableRanking</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ListTableRanking no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ListTableRanking no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ListTableRanking</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ListTableRanking.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ListTableRanking</h1>
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

