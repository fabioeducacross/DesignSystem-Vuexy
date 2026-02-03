/**
 * ListTableRanking - Ranking Table with Positions
 * ================================================
 * Tabela de ranking com posições, medalhas e pódio
 * 
 * @component ListTableRanking
 * @category Educacross Components V2 / Tables
 * @source educacross-frontoffice (rankings de alunos, turmas, disciplinas)
 * @priority P1 - Core UI
 * @status EXPANDED
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
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">`;

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
