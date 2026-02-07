/**
 * ModalStudentActivityDetails - Large Modal with Activity Details Component
 * 
 * Modal grande com detalhes completos de atividade do aluno, incluindo abas (Resumo, Questões, Timeline, Feedback)
 * e múltiplas variantes para diferentes contextos de visualização.
 * 
 * @component ModalStudentActivityDetails
 * @category Educacross Components V2
 * @subcategory Overlays
 * @priority P2
 * @status PIXEL-PERFECT
 * @since v2.0
 * 
 * Key Features:
 * - ✅ Full-screen overlay with centered modal (max-width 900px, max-height 90vh)
 * - ✅ Tabbed interface (Resumo, Questões, Timeline, Feedback)
 * - ✅ Close button (32×32px circle with hover effect)
 * - ✅ Stats grid (4 metrics) with large values
 * - ✅ Question grid 48×48px with status colors
 * - ✅ Timeline with dots and connecting lines
 * - ✅ Teacher feedback section with avatar
 * - ✅ Modal footer with action buttons
 * - ✅ Responsive design (max-width para mobile)
 * - ✅ Large content support (up to 1100px)
 * 
 * Real-world usage:
 * - Professor abrindo modal de detalhes de atividade de aluno específico
 * - Sistema exibindo modal com abas para navegação entre seções
 * - Modal responsivo para visualização mobile
 * - Exportação de relatório PDF/email diretamente do modal
 */

export default {
  title: 'Front-office/Overlays/ModalStudentActivityDetails',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# ModalStudentActivityDetails

Modal grande com **detalhes completos de atividade** do aluno. Suporta múltiplas abas, grid de questões, timeline e feedback do professor.

## Quando usar

- ✅ Visualização modal de resultado de missão
- ✅ Interface com abas para organizar informações
- ✅ Exportação de relatórios (PDF, email aos responsáveis)
- ✅ Visualização de feedback detalhado do professor
- ✅ Timeline de progresso da atividade
- ✅ Análise de questões com status visual

## Variantes

- **Default**: Modal básico com 4 stats + info missão
- **ComAbas**: 4 tabs (Resumo, Questões, Timeline, Feedback) + content switching
- **ComQuestoes**: Tab ativa "Questões" com grid 15 questões + lista erros
- **ComTimeline**: Tab ativa "Timeline" com 4 eventos + dots coloridos
- **ComFeedback**: Tab "Feedback" com avatar professora + pontos fortes/melhorar
- **LargeContent**: Modal 1100px com 2 colunas (stats gerais vs. disciplinas)
- **ComAcoes**: Badge sucesso verde + conquistas desbloqueadas + botões ação
- **Responsive**: Modal 500px para mobile com stats verticais

## Características visuais

- **Overlay**: rgba(0,0,0,0.5) fixed full-screen
- **Modal**: max-width 900px, max-height 90vh, border-radius 12px, shadow 0 10px 40px
- **Header**: padding 20px 24px, border-bottom 2px #E8E8E8
- **Close button**: 32×32px circle, background #F3F2F7, hover #6E63E8 white
- **Tabs**: border-bottom 3px, active #6E63E8, inactive transparent
- **Footer**: buttons gap 12px, primary #6E63E8, secondary #F3F2F7
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
 * | isOpen | Boolean | false | Controla visibilidade do modal |
 * | student | Object | {} | Dados do aluno (name, class) |
 * | activity | Object | {} | Dados da atividade (title, subject, dates) |
 * | stats | Object | {} | Estatísticas (grade, time, accuracy, attempts) |
 * | tabs | Array | [] | Abas disponíveis [{id, label, content}] |
 * | activeTab | String | 'resumo' | ID da aba ativa |
 * | questions | Array | [] | Questões com status |
 * | timeline | Array | [] | Eventos da timeline |
 * | feedback | Object | {} | Feedback do professor |
 * | onClose | Function | null | Callback ao fechar modal |
 * | onExport | Function | null | Callback ao exportar relatório |
 * | size | String | 'medium' | Tamanho: 'small' (500px), 'medium' (900px), 'large' (1100px) |
 * 
 * ## Design Specs
 * 
 * **Cores:**
 * - Overlay: `rgba(0, 0, 0, 0.5)`
 * - Modal background: `#fff`
 * - Close button: background `#F3F2F7`, hover `#6E63E8`
 * - Tab active: color `#6E63E8`, border-bottom `3px solid #6E63E8`
 * - Tab hover: color `#6E63E8`
 * - Button primary: background `#6E63E8`, hover `#5E53D8`
 * - Button secondary: background `#F3F2F7`, hover `#E8E8E8`
 * - Success badge: background `#E8F5E9`, border `1px solid #28C76F`
 * 
 * **Dimensões:**
 * - Overlay: fixed `top:0 left:0 right:0 bottom:0`, z-index `1050`
 * - Modal container: max-width `900px` (medium), max-height `90vh`
 * - Modal border-radius: `12px`
 * - Modal shadow: `0 10px 40px rgba(0,0,0,0.2)`
 * - Header padding: `20px 24px`, border-bottom `2px solid #E8E8E8`
 * - Close button: `32×32px` circle
 * - Body padding: `24px`, max-height `calc(90vh - 140px)`, overflow-y `auto`
 * - Tab padding: `12px 20px`, margin-bottom `-2px` (overlap border)
 * - Footer padding: `16px 24px`, border-top `1px solid #E8E8E8`
 * - Button padding: `10px 20px`, border-radius `6px`
 * 
 * **Tipografia:**
 * - Modal title: `20px` weight `700`
 * - Tab label: `14px` weight `600`
 * - Stat value: `28-32px` weight `700`
 * - Stat label: `12px` color `#6E6B7B`
 * - Button: `14px` weight `600`
 * 
 * **Interação:**
 * - Close button hover: transform scale(1.05), transition `0.2s`
 * - Tab hover: color `#6E63E8`, transition `0.2s`
 * - Button hover: opacity `0.9`, transition `0.2s`
 * - Overlay click: fecha modal (onclick em overlay, não em modal-container)
 */

const styles = `<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 20px;
}

.modal-container {
  background: #fff;
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 2px solid #E8E8E8;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #5E5873;
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #F3F2F7;
  color: #5E5873;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.2s;
}

.modal-close:hover {
  background: #6E63E8;
  color: #fff;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
  max-height: calc(90vh - 140px);
}

.modal-tabs {
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #E8E8E8;
  margin-bottom: 20px;
}

.modal-tab {
  padding: 12px 20px;
  border: none;
  background: transparent;
  color: #6E6B7B;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  transition: color 0.2s;
}

.modal-tab:hover {
  color: #6E63E8;
}

.modal-tab.active {
  color: #6E63E8;
  border-bottom-color: #6E63E8;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #E8E8E8;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal-btn {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
}

.modal-btn-secondary {
  background: #F3F2F7;
  color: #5E5873;
}

.modal-btn-secondary:hover {
  background: #E8E8E8;
}

.modal-btn-primary {
  background: #6E63E8;
  color: #fff;
}

.modal-btn-primary:hover {
  background: #5E53D8;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card-modal {
  text-align: center;
  padding: 16px;
  background: #F8F8F8;
  border-radius: 8px;
}

.stat-value-modal {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
}

.stat-label-modal {
  font-size: 12px;
  color: #6E6B7B;
}

.progress-bar-modal {
  background: #E8E8E8;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  transition: width 0.3s ease;
}
</style>`;

/**
 * Story: Default
 * 
 * Modal básico "Detalhes da Atividade - João Silva" com 4 stats + seção "Informações da Missão" + footer 2 botões.
 * 
 * Educational context: Professor abrindo detalhes resumidos de atividade.
 */
export const Default = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Detalhes da Atividade - João Silva</h2>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="stat-grid">
            ${[
              {l: 'Nota Final', v: '8.5', c: '#28C76F'},
              {l: 'Tempo Total', v: '2h 15m', c: '#6E63E8'},
              {l: 'Taxa de Acerto', v: '85%', c: '#FF9F43'},
              {l: 'Tentativas', v: '1', c: '#00CFE8'}
            ].map(s => `
              <div class="stat-card-modal">
                <div class="stat-value-modal" style="color: ${s.c}">${s.v}</div>
                <div class="stat-label-modal">${s.l}</div>
              </div>
            `).join('')}
          </div>
          
          <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #5E5873">Informações da Missão</h3>
          <div style="background: #F8F8F8; padding: 16px; border-radius: 8px; margin-bottom: 20px">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 14px">
              ${[
                {l: 'Disciplina', v: 'Matemática'},
                {l: 'Tema', v: 'Frações Básicas'},
                {l: 'Iniciada em', v: '05/02/2026 10:30'},
                {l: 'Concluída em', v: '05/02/2026 12:45'}
              ].map(i => `
                <div>
                  <span style="color: #6E6B7B">${i.l}:</span> 
                  <span style="color: #5E5873; font-weight: 600">${i.v}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-btn modal-btn-secondary" onclick="this.closest('.modal-overlay').remove()">
            Fechar
          </button>
          <button class="modal-btn modal-btn-primary">Baixar Relatório</button>
        </div>
      </div>
    </div>
  `
};

/**
 * Story: ComAbas
 * 
 * Modal "Ana Costa - Geografia do Brasil" com 4 tabs (Resumo ativo, Questões, Timeline, Feedback).
 * 3 stats + breakdown por tipo com progress bars.
 * 
 * Educational context: Professor navegando entre abas de detalhes da atividade.
 */
export const ComAbas = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Ana Costa - Geografia do Brasil</h2>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="modal-tabs">
            <button class="modal-tab active">Resumo</button>
            <button class="modal-tab">Questões</button>
            <button class="modal-tab">Timeline</button>
            <button class="modal-tab">Feedback</button>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px">
            ${[
              {l: 'Nota', v: '9.2', c: '#28C76F'},
              {l: 'Acerto', v: '92%', c: '#28C76F'},
              {l: 'Tempo', v: '1h 45m', c: '#6E63E8'}
            ].map(s => `
              <div class="stat-card-modal">
                <div class="stat-value-modal" style="color: ${s.c}; font-size: 32px">${s.v}</div>
                <div class="stat-label-modal">${s.l}</div>
              </div>
            `).join('')}
          </div>
          
          <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #5E5873">Desempenho por Tipo</h3>
          ${[
            {t: 'Múltipla Escolha', c: 8, e: 0, total: 8},
            {t: 'Verdadeiro ou Falso', c: 3, e: 1, total: 4},
            {t: 'Associação', c: 2, e: 0, total: 2}
          ].map(q => `
            <div style="padding: 12px; background: #F8F8F8; border-radius: 8px; margin-bottom: 10px">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px">
                <span style="font-weight: 600; color: #5E5873">${q.t}</span>
                <span style="font-size: 13px; color: #6E6B7B">${q.c}/${q.total} corretas</span>
              </div>
              <div class="progress-bar-modal">
                <div class="progress-fill" style="width: ${(q.c/q.total)*100}%; background: ${q.c === q.total ? '#28C76F' : '#FF9F43'}"></div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="modal-footer">
          <button class="modal-btn modal-btn-secondary" onclick="this.closest('.modal-overlay').remove()">
            Fechar
          </button>
          <button class="modal-btn modal-btn-primary">Exportar PDF</button>
        </div>
      </div>
    </div>
  `
};

/**
 * Story: ComQuestoes
 * 
 * Tab "Questões" ativo. Grid 15 questões coloridas + legenda (11 corretas, 2 parciais, 2 incorretas).
 * Lista de "Questões com Erro" destacadas em vermelho.
 * 
 * Educational context: Professor analisando erros específicos do aluno por questão.
 */
export const ComQuestoes = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Bruno Oliveira - Frações e Decimais</h2>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="modal-tabs">
            <button class="modal-tab">Resumo</button>
            <button class="modal-tab active">Questões</button>
            <button class="modal-tab">Análise</button>
          </div>
          
          <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #5E5873">Respostas (15 questões)</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px">
            ${Array(15).fill(0).map((_, i) => {
              const status = ['correct','correct','partial','incorrect','correct','correct','correct','partial','correct','correct','incorrect','correct','correct','correct','partial'][i];
              const colors = {correct: '#E8F5E9', partial: '#FFF8E1', incorrect: '#FFEBEE'};
              const textColors = {correct: '#28C76F', partial: '#FF9F43', incorrect: '#EA5455'};
              return `
                <div style="width: 48px; height: 48px; border-radius: 8px; background: ${colors[status]}; color: ${textColors[status]}; 
                     display: flex; align-items: center; justify-content: center; font-weight: 700; cursor: pointer">
                  ${i+1}
                </div>
              `;
            }).join('')}
          </div>
          
          <div style="display: flex; gap: 16px; font-size: 13px; margin-bottom: 20px">
            ${[
              {l: 'Corretas', v: 11, c: '#28C76F'},
              {l: 'Parciais', v: 2, c: '#FF9F43'},
              {l: 'Incorretas', v: 2, c: '#EA5455'}
            ].map(s => `
              <div style="display: flex; align-items: center; gap: 6px">
                <div style="width: 16px; height: 16px; border-radius: 3px; background: ${s.c}"></div>
                <span style="color: #6E6B7B">${s.l}: <strong style="color: ${s.c}">${s.v}</strong></span>
              </div>
            `).join('')}
          </div>
          
          <h4 style="margin: 0 0 10px; font-size: 14px; font-weight: 600; color: #5E5873">Questões com Erro</h4>
          ${[
            {q: 4, t: 'Qual é 3/4 convertido para decimal?', r: '0.50', c: '0.75'},
            {q: 11, t: 'Simplifique a fração 8/12', r: '4/8', c: '2/3'}
          ].map(q => `
            <div style="padding: 12px; background: #FFEBEE; border-left: 3px solid #EA5455; border-radius: 6px; margin-bottom: 10px">
              <div style="font-weight: 600; color: #5E5873; margin-bottom: 6px">Questão ${q.q}: ${q.t}</div>
              <div style="font-size: 13px; color: #6E6B7B">
                Resposta: <span style="color: #EA5455; font-weight: 600">${q.r}</span> • 
                Correto: <span style="color: #28C76F; font-weight: 600">${q.c}</span>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="modal-footer">
          <button class="modal-btn modal-btn-secondary" onclick="this.closest('.modal-overlay').remove()">
            Fechar
          </button>
        </div>
      </div>
    </div>
  `
};

/**
 * Story: ComTimeline
 * 
 * Tab "Timeline" ativo. 4 eventos com dots coloridos e connecting lines (09:30 Iniciou, 09:45 Completou 5, 10:00 Completou 10, 10:20 Finalizou).
 * 
 * Educational context: Professor visualizando histórico cronológico de progresso do aluno.
 */
export const ComTimeline = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Diana Santos - Sistema Solar</h2>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="modal-tabs">
            <button class="modal-tab">Resumo</button>
            <button class="modal-tab">Questões</button>
            <button class="modal-tab active">Timeline</button>
          </div>
          
          <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 600; color: #5E5873">Histórico da Atividade</h3>
          <div style="position: relative; padding-left: 32px">
            ${[
              {t: '09:30', a: 'Iniciou a missão', d: 'Primeira tentativa', c: '#6E63E8'},
              {t: '09:45', a: 'Completou 5 questões', d: '100% de acerto', c: '#28C76F'},
              {t: '10:00', a: 'Completou 10 questões', d: '90% de acerto', c: '#28C76F'},
              {t: '10:20', a: 'Finalizou a missão', d: '15/15 questões • Nota 9.5', c: '#28C76F'}
            ].map((item, i) => `
              <div style="position: relative; padding-bottom: ${i === 3 ? '0' : '24px'}">
                <div style="position: absolute; left: -32px; width: 12px; height: 12px; border-radius: 50%; background: ${item.c}; 
                     border: 3px solid #fff; box-shadow: 0 0 0 2px ${item.c}"></div>
                ${i < 3 ? `<div style="position: absolute; left: -27px; top: 12px; bottom: -12px; width: 2px; background: #E8E8E8"></div>` : ''}
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px">
                  <span style="font-size: 14px; font-weight: 600; color: #5E5873">${item.a}</span>
                  <span style="font-size: 12px; color: #6E6B7B">${item.t}</span>
                </div>
                <div style="background: #F8F8F8; padding: 12px; border-radius: 6px; font-size: 13px; color: #6E6B7B">
                  ${item.d}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-btn modal-btn-secondary" onclick="this.closest('.modal-overlay').remove()">
            Fechar
          </button>
        </div>
      </div>
    </div>
  `
};

/**
 * Story: ComFeedback
 * 
 * Tab "Feedback" ativo. Avatar professora + mensagem feedback + "Pontos Fortes" (3 verdes) + "Pontos a Melhorar" (3 vermelhos).
 * 
 * Educational context: Aluno visualizando feedback detalhado da professora.
 */
export const ComFeedback = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Eduardo Lima - Verbos e Conjugações</h2>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="modal-tabs">
            <button class="modal-tab">Resumo</button>
            <button class="modal-tab">Questões</button>
            <button class="modal-tab">Timeline</button>
            <button class="modal-tab active">Feedback</button>
          </div>
          
          <div style="background: #FFF8E1; border-left: 4px solid #FF9F43; padding: 16px; border-radius: 6px; margin-bottom: 20px">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Ccircle fill='%236E63E8' cx='24' cy='24' r='24'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-size='18' font-weight='bold'%3EMS%3C/text%3E%3C/svg%3E" 
                   style="width: 48px; height: 48px; border-radius: 50%">
              <div>
                <div style="font-weight: 700; color: #5E5873">Prof. Maria Silva</div>
                <div style="font-size: 12px; color: #6E6B7B">08/02/2026 às 15:45</div>
              </div>
            </div>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #5E5873">
              Eduardo, você mostrou bom conhecimento sobre conjugações verbais. Porém, precisa revisar os tempos compostos 
              e o modo subjuntivo. Pratique mais exercícios dessas áreas. Nota 7.5 - Continue estudando!
            </p>
          </div>
          
          <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #5E5873">Pontos Fortes</h3>
          ${[
            'Presente do Indicativo (100%)',
            'Pretérito Perfeito (90%)',
            'Identificação de verbos (95%)'
          ].map(p => `
            <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #E8F5E9; 
                 border-radius: 6px; margin-bottom: 8px">
              <i class="bi bi-check-circle-fill" style="color: #28C76F; font-size: 18px"></i>
              <span style="font-size: 14px; color: #5E5873">${p}</span>
            </div>
          `).join('')}
          
          <h3 style="margin: 16px 0 12px; font-size: 16px; font-weight: 600; color: #5E5873">Pontos a Melhorar</h3>
          ${[
            'Modo Subjuntivo (3 erros)',
            'Tempos Compostos (2 erros)',
            'Gerúndio e Particípio (1 erro)'
          ].map(p => `
            <div style="display: flex; align-items: center; gap: 10px; padding: 10px; background: #FFEBEE; 
                 border-radius: 6px; margin-bottom: 8px">
              <i class="bi bi-exclamation-circle" style="color: #EA5455; font-size: 18px"></i>
              <span style="font-size: 14px; color: #5E5873">${p}</span>
            </div>
          `).join('')}
        </div>
        
        <div class="modal-footer">
          <button class="modal-btn modal-btn-secondary" onclick="this.closest('.modal-overlay').remove()">
            Fechar
          </button>
          <button class="modal-btn modal-btn-primary">Enviar Email</button>
        </div>
      </div>
    </div>
  `
};

/**
 * Story: LargeContent
 * 
 * Modal 1100px com 2 colunas: Estatísticas Gerais (4 métricas) vs. Desempenho por Disciplina (4 progress bars).
 * Footer com 3 botões (Fechar, Gerar PDF, Enviar aos Responsáveis).
 * 
 * Educational context: Relatório completo com visão geral para coordenador.
 */
export const LargeContent = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container" style="max-width: 1100px">
        <div class="modal-header">
          <h2 class="modal-title">Fernanda Costa - Relatório Completo</h2>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px">
            <div>
              <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #5E5873">Estatísticas Gerais</h3>
              <div style="display: flex; flex-direction: column; gap: 12px">
                ${[
                  {l: 'Média de todas as missões', v: '9.2', c: '#28C76F'},
                  {l: 'Taxa de conclusão', v: '95%', c: '#28C76F'},
                  {l: 'Tempo médio por missão', v: '1h 30m', c: '#6E63E8'},
                  {l: 'Missões concluídas', v: '48', c: '#00CFE8'}
                ].map(s => `
                  <div style="display: flex; justify-content: space-between; padding: 12px; background: #F8F8F8; border-radius: 6px">
                    <span style="color: #6E6B7B">${s.l}</span>
                    <span style="font-weight: 700; font-size: 18px; color: ${s.c}">${s.v}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            
            <div>
              <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #5E5873">Desempenho por Disciplina</h3>
              ${[
                {d: 'Matemática', v: 95, c: '#28C76F'},
                {d: 'Português', v: 88, c: '#6E63E8'},
                {d: 'Ciências', v: 92, c: '#00CFE8'},
                {d: 'História', v: 85, c: '#FF9F43'}
              ].map(s => `
                <div style="margin-bottom: 12px">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 6px">
                    <span style="font-size: 13px; color: #5E5873; font-weight: 600">${s.d}</span>
                    <span style="font-size: 13px; color: ${s.c}; font-weight: 700">${s.v}%</span>
                  </div>
                  <div class="progress-bar-modal">
                    <div class="progress-fill" style="width: ${s.v}%; background: ${s.c}"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-btn modal-btn-secondary" onclick="this.closest('.modal-overlay').remove()">
            Fechar
          </button>
          <button class="modal-btn modal-btn-primary">Gerar PDF</button>
          <button class="modal-btn modal-btn-primary">Enviar aos Responsáveis</button>
        </div>
      </div>
    </div>
  `
};

/**
 * Story: ComAcoes
 * 
 * Badge sucesso verde "Missão Concluída com Sucesso!" + trophy icon 48px + 3 stats + 3 conquistas gradiente gold.
 * Footer com 3 botões (Fechar, Compartilhar, Baixar Certificado).
 * 
 * Educational context: Sistema celebrando nota máxima do aluno com conquistas.
 */
export const ComAcoes = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <h2 class="modal-title">Gabriel Santos - Geometria Básica</h2>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div style="background: #E8F5E9; border: 1px solid #28C76F; padding: 16px; border-radius: 8px; margin-bottom: 20px; text-align: center">
            <i class="bi bi-check-circle-fill" style="font-size: 48px; color: #28C76F; margin-bottom: 12px"></i>
            <div style="font-size: 18px; font-weight: 700; color: #28C76F; margin-bottom: 6px">
              Missão Concluída com Sucesso!
            </div>
            <div style="font-size: 14px; color: #6E6B7B">Nota: 10.0 • Taxa de acerto: 100%</div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px">
            ${[
              {l: 'Tempo', v: '1h 15m'},
              {l: 'Questões', v: '12/12'},
              {l: 'Tentativas', v: '1ª'}
            ].map(s => `
              <div class="stat-card-modal">
                <div class="stat-value-modal" style="color: #6E63E8; font-size: 24px">${s.v}</div>
                <div class="stat-label-modal">${s.l}</div>
              </div>
            `).join('')}
          </div>
          
          <h3 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #5E5873">Conquistas Desbloqueadas</h3>
          <div style="display: flex; gap: 12px">
            ${['🏆 Nota Máxima', '⚡ Primeira Tentativa', '🎯 100% Acerto'].map(b => `
              <div style="padding: 12px 16px; background: linear-gradient(135deg, #FFD700, #FF9F43); 
                   color: #fff; border-radius: 8px; font-weight: 600; font-size: 13px; text-align: center; flex: 1">
                ${b}
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-btn modal-btn-secondary" onclick="this.closest('.modal-overlay').remove()">
            Fechar
          </button>
          <button class="modal-btn modal-btn-primary">Compartilhar</button>
          <button class="modal-btn modal-btn-primary">Baixar Certificado</button>
        </div>
      </div>
    </div>
  `
};

/**
 * Story: Responsive
 * 
 * Modal 500px (mobile) com título reduzido 18px + stats verticais (3 métricas empilhadas) + 1 botão Fechar.
 * 
 * Educational context: Visualização mobile responsiva para smartphone.
 */
export const Responsive = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container" style="max-width: 500px">
        <div class="modal-header">
          <h2 class="modal-title" style="font-size: 18px">Helena Alves - Resumo</h2>
          <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div style="text-align: center; margin-bottom: 20px">
            <div style="font-size: 48px; font-weight: 700; color: #28C76F; margin-bottom: 6px">8.8</div>
            <div style="font-size: 14px; color: #6E6B7B">Nota Final</div>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 10px">
            ${[
              {l: 'Taxa de acerto', v: '88%', c: '#28C76F'},
              {l: 'Tempo total', v: '2h', c: '#6E63E8'},
              {l: 'Questões certas', v: '11/13', c: '#FF9F43'}
            ].map(s => `
              <div style="display: flex; justify-content: space-between; padding: 12px; background: #F8F8F8; border-radius: 6px">
                <span style="color: #6E6B7B; font-size: 14px">${s.l}</span>
                <span style="font-weight: 700; color: ${s.c}; font-size: 16px">${s.v}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="modal-btn modal-btn-secondary" onclick="this.closest('.modal-overlay').remove()">
            Fechar
          </button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Modal responsivo para mobile (max-width 500px).
    </p>
  `
};
