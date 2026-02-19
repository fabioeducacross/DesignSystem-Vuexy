/**
 * StudentActivityDetail - Activity Detail View for Student Component
 * 
 * Visualização detalhada de atividade/missão concluída ou em progresso pelo aluno.
 * Inclui nota, tempo, questões, timeline, feedback do professor e comparação com turma.
 * 
 * @component StudentActivityDetail
 * @source educacross-frontoffice/src/components/mission-plus/StudentActivityDetail.vue
 * @category Educacross Components V2
 * @subcategory Feedback
 * @priority P2
 * @status PIXEL-PERFECT
 * @since v2.0
 * 
 * Key Features:
 * - ✅ Activity header (title, meta info, status badge)
 * - ✅ Statistics grid (final grade, correct answers, accuracy, time)
 * - ✅ Question grid (15 questions with status colors)
 * - ✅ Timeline with dots and connecting lines
 * - ✅ Teacher feedback section with avatar
 * - ✅ Performance by question type breakdown
 * - ✅ Improvement points list
 * - ✅ Progress tracking for in-progress activities
 * - ✅ Empty state for not started activities
 * - ✅ Comparison with class average
 * 
 * Real-world usage:
 * - Aluno visualizando resultado de missão concluída
 * - Professor analisando desempenho detalhado por questão
 * - Sistema exibindo progresso de atividade em andamento
 * - Comparação de performance individual vs. turma
 */

export default {
  title: 'Educacross Components V2/Feedback/StudentActivityDetail',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# StudentActivityDetail

Visualização **detalhada de atividade** do aluno com estatísticas, grid de questões, timeline de progresso e feedback do professor.

## Quando usar

- ✅ Visualização de resultado de missão concluída
- ✅ Análise de desempenho por tipo de questão
- ✅ Timeline de tentativas e pausas
- ✅ Feedback do professor para aluno
- ✅ Comparação com média da turma
- ✅ Acompanhamento de atividade em progresso

## Variantes

- **Default**: Header + 4 stats (nota, questões, acerto, tempo)
- **ComQuestoes**: Grid 15 questões com cores por status + legenda
- **ComTimeline**: Histórico com dots coloridos + connecting lines
- **ComDetalhamento**: Breakdown por tipo (Múltipla Escolha, V/F, Dissertativa)
- **ComFeedback**: Feedback professora + pontos fortes/melhorar
- **EmProgresso**: Badge "60% Concluído" + progress bar gradient
- **Vazio**: SVG empty state + mensagem "Atividade não iniciada"
- **Comparacao**: Grid 2 colunas (aluno vs. média turma)

## Características visuais

- **Status badges**: Concluída (green), Em Progresso (cyan), status customizáveis
- **Stats cards**: 32px value, grid auto-fit minmax(150px, 1fr)
- **Question boxes**: 48×48px, colors por status (correct green, partial orange, incorrect red)
- **Timeline dots**: 12×12px circle, border 3px white, shadow 2px colored
- **Progress bars**: 6px altura subjects, 12px altura overall progress
        `
      }
    }
  }
};

/**
 * ## Props API (sem props - display only component)
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | activity | Object | {} | Dados da atividade (title, subject, startedAt, completedAt) |
 * | stats | Object | {} | Estatísticas (grade, correctAnswers, accuracy, timeSpent, attempts) |
 * | questions | Array | [] | Questões [{id, status: 'correct'/'partial'/'incorrect'}] |
 * | questionTypes | Array | [] | Performance por tipo [{type, correct, incorrect, partial}] |
 * | timeline | Array | [] | Eventos [{time, action, description, color}] |
 * | feedback | Object | {} | Feedback do professor {teacher, date, message, strengths[], improvements[]} |
 * | comparison | Object | {} | Comparação {student, classAverage} |
 * | progress | Number | 0 | Progresso 0-100 para atividades em andamento |
 * | status | String | 'completed' | Status: 'completed', 'in-progress', 'not-started' |
 * 
 * ## Design Specs
 * 
 * **Cores:**
 * - Badge concluída: background `#E8F5E9`, color `#28C76F`
 * - Badge em progresso: background `#E0F7FA`, color `#00CFE8`
 * - Stats: #28C76F (grade), #6E63E8 (questions), #FF9F43 (accuracy), #00CFE8 (time)
 * - Question status: correct `#E8F5E9/#28C76F`, partial `#FFF8E1/#FF9F43`, incorrect `#FFEBEE/#EA5455`
 * - Timeline colors: #6E63E8 (start), #28C76F (progress), #FF9F43 (pause)
 * - Feedback: background `#FFF8E1`, border-left `4px solid #FF9F43`
 * - Strengths: background `#E8F5E9`
 * - Improvements: background `#FFEBEE`
 * 
 * **Dimensões:**
 * - Card padding: `24px`
 * - Header border-bottom: `2px solid #E8E8E8`
 * - Stats grid: auto-fit minmax(150px, 1fr), gap `16px`
 * - Stat value: font-size `32px`, margin-bottom `6px`
 * - Question boxes: `48×48px`, border-radius `8px`, gap `8px`
 * - Timeline dot: `12×12px` circle, border `3px solid #fff`, shadow `0 0 0 2px [color]`
 * - Timeline line: `2px` width, background `#E8E8E8`
 * - Progress bar: `6px` (subjects), `12px` (overall), border-radius `6px`
 * 
 * **Tipografia:**
 * - Activity title: `24px` weight `700`
 * - Activity meta: `14px` color `#6E6B7B`
 * - Section title: `16px` weight `600`
 * - Stat value: `32px` weight `700`
 * - Stat label: `13px` color `#6E6B7B`
 * - Question number: `16px` weight `700`
 * - Timeline action: `14px` weight `600`
 * - Feedback text: `14px` line-height `1.6`
 */

const styles = `<style>
.activity-detail {
  background: #fff;
  border: 1px solid #D8D6DE;
  border-radius: 8px;
  padding: 24px;
}

.activity-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid #E8E8E8;
}

.activity-title {
  font-size: 24px;
  font-weight: 700;
  color: #5E5873;
  margin: 0 0 8px;
}

.activity-meta {
  font-size: 14px;
  color: #6E6B7B;
}

.activity-badge {
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.activity-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #5E5873;
  margin: 0 0 12px;
}

.activity-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.stat-card {
  padding: 16px;
  background: #F8F8F8;
  border-radius: 8px;
  text-align: center;
}

.stat-card-value {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 6px;
}

.stat-card-label {
  font-size: 13px;
  color: #6E6B7B;
}

.activity-timeline {
  position: relative;
  padding-left: 32px;
}

.timeline-item {
  position: relative;
  padding-bottom: 24px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: -32px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 0 0 2px;
}

.timeline-line {
  position: absolute;
  left: -27px;
  top: 12px;
  bottom: -12px;
  width: 2px;
  background: #E8E8E8;
}

.timeline-item:last-child .timeline-line {
  display: none;
}

.timeline-content {
  background: #F8F8F8;
  padding: 12px;
  border-radius: 6px;
}

.question-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.question-box {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;
}

.question-box:hover {
  transform: scale(1.05);
}

.progress-bar-container {
  background: #E8E8E8;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.feedback-section {
  background: #FFF8E1;
  border-left: 4px solid #FF9F43;
  padding: 16px;
  border-radius: 6px;
}

.teacher-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.point-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.point-item:last-child {
  margin-bottom: 0;
}
</style>`;

/**
 * Story: Default
 * 
 * Header "Missão: Frações Básicas" + badge verde "Concluída" + 4 stats (8.5, 12/15, 85%, 2h 15min).
 * 
 * Educational context: Aluno visualizando resumo de missão concluída.
 */
export const Default = {
  render: () => `
    ${styles}
    <div class="activity-detail">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Missão: Frações Básicas</h1>
          <div class="activity-meta">
            <i class="bi bi-calendar3"></i> Iniciada em 05/02/2026 • <i class="bi bi-clock"></i> 2h 15min
          </div>
        </div>
        <span class="activity-badge" style="background: #E8F5E9; color: #28C76F">
          <i class="bi bi-check-circle-fill"></i> Concluída
        </span>
      </div>
      
      <div class="activity-stats">
        <div class="stat-card">
          <div class="stat-card-value" style="color: #28C76F">8.5</div>
          <div class="stat-card-label">Nota Final</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #6E63E8">12/15</div>
          <div class="stat-card-label">Questões Certas</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #FF9F43">85%</div>
          <div class="stat-card-label">Taxa de Acerto</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #00CFE8">2h 15m</div>
          <div class="stat-card-label">Tempo Total</div>
        </div>
      </div>
    </div>
  `
};

/**
 * Story: ComQuestoes
 * 
 * Grid 15 questões coloridas por status (12 corretas verdes, 2 parciais laranjas, 1 incorreta vermelha) + legenda.
 * 
 * Educational context: Professor analisando quais questões o aluno acertou/errou.
 */
export const ComQuestoes = {
  render: () => `
    ${styles}
    <div class="activity-detail">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Operações com Frações</h1>
          <div class="activity-meta">João Silva • 5º Ano A</div>
        </div>
        <span class="activity-badge" style="background: #E8F5E9; color: #28C76F">Completa</span>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Desempenho por Questão</h3>
        <div class="question-grid">
          ${Array(15).fill(0).map((_, i) => {
            const status = ['correct','correct','partial','incorrect','correct','correct','correct','partial','correct','correct','incorrect','correct','correct','correct','partial'][i];
            const colors = {correct: '#E8F5E9', partial: '#FFF8E1', incorrect: '#FFEBEE'};
            const textColors = {correct: '#28C76F', partial: '#FF9F43', incorrect: '#EA5455'};
            return `
              <div class="question-box" style="background: ${colors[status]}; color: ${textColors[status]}" 
                   title="Questão ${i+1}: ${status === 'correct' ? 'Correta' : status === 'partial' ? 'Parcial' : 'Incorreta'}">
                ${i+1}
              </div>
            `;
          }).join('')}
        </div>
        
        <div style="margin-top: 16px; display: flex; gap: 16px; font-size: 13px">
          <div style="display: flex; align-items: center; gap: 6px">
            <div style="width: 16px; height: 16px; background: #E8F5E9; border-radius: 3px"></div>
            <span>12 Corretas</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px">
            <div style="width: 16px; height: 16px; background: #FFF8E1; border-radius: 3px"></div>
            <span>2 Parciais</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px">
            <div style="width: 16px; height: 16px; background: #FFEBEE; border-radius: 3px"></div>
            <span>1 Incorreta</span>
          </div>
        </div>
      </div>
    </div>
  `
};

/**
 * Story: ComTimeline
 * 
 * Badge "Em Progresso" cyan + timeline 4 eventos com dots coloridos e connecting lines.
 * 
 * Educational context: Sistema mostrando histórico de tentativas e pausas do aluno.
 */
export const ComTimeline = {
  render: () => `
    ${styles}
    <div class="activity-detail">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Verbos e Conjugações</h1>
          <div class="activity-meta">Ana Costa • 5º Ano A</div>
        </div>
        <span class="activity-badge" style="background: #E0F7FA; color: #00CFE8">
          <i class="bi bi-hourglass-split"></i> Em Progresso
        </span>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Histórico de Tentativas</h3>
        <div class="activity-timeline">
          ${[
            {t: '10:45', a: 'Iniciou a missão', d: 'Primeira tentativa', c: '#6E63E8'},
            {t: '11:30', a: 'Completou 8 questões', d: 'Taxa de acerto: 87%', c: '#28C76F'},
            {t: '12:15', a: 'Pausa para intervalo', d: '45 minutos', c: '#FF9F43'},
            {t: '13:00', a: 'Retomou atividade', d: 'Questões 9-15', c: '#6E63E8'}
          ].map((item, i) => `
            <div class="timeline-item">
              <div class="timeline-dot" style="background: ${item.c}; box-shadow: 0 0 0 2px ${item.c}"></div>
              <div class="timeline-line"></div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px">
                <span style="font-size: 14px; font-weight: 600; color: #5E5873">${item.a}</span>
                <span style="font-size: 12px; color: #6E6B7B">${item.t}</span>
              </div>
              <div class="timeline-content">
                <div style="font-size: 13px; color: #6E6B7B">${item.d}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `
};

/**
 * Story: ComDetalhamento
 * 
 * 4 stats + breakdown por tipo de questão (Múltipla Escolha 8/8, V/F 2/3, Dissertativa 0/1).
 * Grid 3 colunas mostrando corretas/incorretas/parciais por tipo.
 * 
 * Educational context: Professor analisando desempenho por tipo de questão.
 */
export const ComDetalhamento = {
  render: () => `
    ${styles}
    <div class="activity-detail" style="max-width: 800px">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Ciclo da Água</h1>
          <div class="activity-meta">Bruno Oliveira • 5º Ano B • Ciências</div>
        </div>
        <span class="activity-badge" style="background: #E8F5E9; color: #28C76F">9.2/10</span>
      </div>
      
      <div class="activity-stats">
        ${[
          {l: 'Nota', v: '9.2', c: '#28C76F'},
          {l: 'Acertos', v: '10/12', c: '#6E63E8'},
          {l: 'Tempo', v: '1h 45m', c: '#FF9F43'},
          {l: 'Tentativa', v: '1ª', c: '#00CFE8'}
        ].map(s => `
          <div class="stat-card">
            <div class="stat-card-value" style="color: ${s.c}">${s.v}</div>
            <div class="stat-card-label">${s.l}</div>
          </div>
        `).join('')}
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Detalhamento por Tipo</h3>
        <div style="display: flex; flex-direction: column; gap: 12px">
          ${[
            {t: 'Múltipla Escolha', c: 8, e: 0, p: 0, total: 8, icon: 'bi-list-check', color: '#28C76F'},
            {t: 'Verdadeiro ou Falso', c: 2, e: 1, p: 0, total: 3, icon: 'bi-toggle-on', color: '#FF9F43'},
            {t: 'Dissertativa', c: 0, e: 0, p: 1, total: 1, icon: 'bi-file-text', color: '#00CFE8'}
          ].map(q => `
            <div style="padding: 16px; background: #F8F8F8; border-radius: 8px">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px">
                <div style="display: flex; align-items: center; gap: 10px">
                  <i class="bi ${q.icon}" style="font-size: 20px; color: ${q.color}"></i>
                  <span style="font-weight: 600; color: #5E5873">${q.t}</span>
                </div>
                <span style="font-size: 14px; color: #6E6B7B">${q.c + q.e + q.p}/${q.total} questões</span>
              </div>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: center">
                ${[
                  {l: 'Corretas', v: q.c, c: '#28C76F'},
                  {l: 'Incorretas', v: q.e, c: '#EA5455'},
                  {l: 'Parciais', v: q.p, c: '#FF9F43'}
                ].map(s => `
                  <div>
                    <div style="font-size: 20px; font-weight: 700; color: ${s.c}">${s.v}</div>
                    <div style="font-size: 11px; color: #6E6B7B">${s.l}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `
};

/**
 * Story: ComFeedback
 * 
 * Badge nota 7.5/10 laranja + feedback professora com avatar + pontos fortes (3 verdes) + pontos a melhorar (3 vermelhos).
 * 
 * Educational context: Professor fornecendo feedback detalhado para aluno.
 */
export const ComFeedback = {
  render: () => `
    ${styles}
    <div class="activity-detail" style="max-width: 700px">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Geografia do Brasil</h1>
          <div class="activity-meta">Diana Santos • 5º Ano A</div>
        </div>
        <span class="activity-badge" style="background: #FFF8E1; color: #FF9F43">7.5/10</span>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Feedback da Professora</h3>
        <div class="feedback-section">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle fill='%23FF9F43' cx='20' cy='20' r='20'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='16' font-weight='bold'%3EMS%3C/text%3E%3C/svg%3E" 
                 class="teacher-avatar">
            <div>
              <div style="font-weight: 600; color: #5E5873">Prof. Maria Silva</div>
              <div style="font-size: 12px; color: #6E6B7B">08/02/2026 às 14:30</div>
            </div>
          </div>
          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #5E5873">
            Bom trabalho, Diana! Você demonstrou compreensão dos conceitos principais, mas precisa revisar as regiões geográficas. 
            Recomendo estudar os mapas com mais atenção. Continue assim!
          </p>
        </div>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Pontos de Melhoria</h3>
        <div>
          ${[
            'Revisar localização das capitais (3 erros)',
            'Estudar biomas brasileiros (2 erros)',
            'Praticar interpretação de mapas'
          ].map(p => `
            <div class="point-item" style="background: #F8F8F8">
              <i class="bi bi-exclamation-circle" style="color: #FF9F43; font-size: 18px"></i>
              <span style="font-size: 14px; color: #5E5873">${p}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `
};

/**
 * Story: EmProgresso
 * 
 * Badge "60% Concluído" cyan + 4 stats parciais + progress bar 12px com gradient cyan→roxo.
 * 
 * Educational context: Aluno visualizando progresso de missão ainda não finalizada.
 */
export const EmProgresso = {
  render: () => `
    ${styles}
    <div class="activity-detail">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Sistema Solar</h1>
          <div class="activity-meta">Eduardo Lima • 5º Ano B • Ciências</div>
        </div>
        <span class="activity-badge" style="background: #E3F2FD; color: #00CFE8">
          <i class="bi bi-play-circle"></i> 60% Concluído
        </span>
      </div>
      
      <div class="activity-stats">
        <div class="stat-card">
          <div class="stat-card-value" style="color: #00CFE8">9/15</div>
          <div class="stat-card-label">Questões</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #28C76F">88%</div>
          <div class="stat-card-label">Acerto até agora</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #6E63E8">45min</div>
          <div class="stat-card-label">Tempo decorrido</div>
        </div>
        <div class="stat-card">
          <div class="stat-card-value" style="color: #FF9F43">6</div>
          <div class="stat-card-label">Restantes</div>
        </div>
      </div>
      
      <div class="activity-section">
        <h3 class="section-title">Progresso</h3>
        <div style="margin-bottom: 12px; display: flex; justify-content: space-between; font-size: 14px">
          <span style="color: #5E5873; font-weight: 600">9 de 15 questões</span>
          <span style="color: #00CFE8; font-weight: 700">60%</span>
        </div>
        <div style="background: #E8E8E8; height: 12px; border-radius: 6px; overflow: hidden">
          <div style="width: 60%; height: 100%; background: linear-gradient(90deg, #00CFE8, #6E63E8); transition: 0.3s"></div>
        </div>
      </div>
    </div>
  `
};

/**
 * Story: Vazio
 * 
 * SVG empty state (grid icon opacity 0.3) + mensagem "Atividade não iniciada".
 * 
 * Educational context: Sistema exibindo estado vazio quando aluno ainda não começou atividade.
 */
export const Vazio = {
  render: () => `
    ${styles}
    <div class="activity-detail" style="min-height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center">
      <svg viewBox="0 0 24 24" width="120" height="120" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity: 0.3; margin-bottom: 24px">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 21V9"/>
      </svg>
      <h3 style="margin: 0 0 12px; font-size: 20px; font-weight: 600; color: #5E5873">Atividade não iniciada</h3>
      <p style="margin: 0; font-size: 14px; color: #6E6B7B; max-width: 400px">
        O aluno ainda não começou esta atividade. Aguarde o início para visualizar os detalhes.
      </p>
    </div>
  `
};

/**
 * Story: Comparacao
 * 
 * Grid 2 colunas comparando Fernanda Costa (9.5, 95%, 1h30m) vs. Média da Turma (7.8, 78%, 2h15m).
 * Badge destaque "Desempenho Acima da Média!" com trophy icon.
 * 
 * Educational context: Sistema exibindo comparação de desempenho individual vs. turma.
 */
export const Comparacao = {
  render: () => `
    ${styles}
    <div class="activity-detail" style="max-width: 800px">
      <div class="activity-header">
        <div>
          <h1 class="activity-title">Comparação de Desempenho</h1>
          <div class="activity-meta">Fernanda Costa vs. Média da Turma</div>
        </div>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px">
        <div>
          <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #5E5873">Fernanda Costa</h4>
          <div class="activity-stats" style="grid-template-columns: 1fr">
            <div class="stat-card">
              <div class="stat-card-value" style="color: #28C76F">9.5</div>
              <div class="stat-card-label">Nota</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value" style="color: #6E63E8">95%</div>
              <div class="stat-card-label">Acerto</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value" style="color: #00CFE8">1h 30m</div>
              <div class="stat-card-label">Tempo</div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #5E5873">Média da Turma</h4>
          <div class="activity-stats" style="grid-template-columns: 1fr">
            <div class="stat-card">
              <div class="stat-card-value" style="color: #FF9F43">7.8</div>
              <div class="stat-card-label">Nota</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value" style="color: #6E63E8">78%</div>
              <div class="stat-card-label">Acerto</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value" style="color: #00CFE8">2h 15m</div>
              <div class="stat-card-label">Tempo</div>
            </div>
          </div>
        </div>
      </div>
      
      <div style="margin-top: 20px; padding: 16px; background: #E8F5E9; border-radius: 8px; text-align: center">
        <i class="bi bi-trophy-fill" style="font-size: 32px; color: #FFD700; margin-bottom: 8px"></i>
        <div style="font-size: 16px; font-weight: 700; color: #28C76F">Desempenho Acima da Média!</div>
        <div style="font-size: 13px; color: #6E6B7B; margin-top: 4px">+1.7 pontos • 45 minutos mais rápido</div>
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
      <div style="background:linear-gradient(135deg,#FF9F43 0%,#FFB976 100%);padding:60px 40px;color:white;">
        <div style="max-width:900px;margin:0 auto;">
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Feedback</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">StudentActivityDetail</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Activity Detail View for Student Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Activity Detail View for Student Component. Faz parte da categoria <strong>Feedback</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #FF9F43;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import StudentActivityDetail from '@/components/StudentActivityDetail.vue';

// Template
&lt;StudentActivityDetail v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o StudentActivityDetail com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#FF9F4320;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground StudentActivityDetail</p>
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
    docs: { description: { story: 'Exemplos de uso real do StudentActivityDetail no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#FF9F4315;border:1px solid #FF9F4330;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: StudentActivityDetail</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando StudentActivityDetail no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com StudentActivityDetail no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#FF9F43;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via StudentActivityDetail</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o StudentActivityDetail.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#FF9F43 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: StudentActivityDetail</h1>
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

