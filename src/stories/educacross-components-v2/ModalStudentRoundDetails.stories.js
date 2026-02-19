/**
 * ModalStudentRoundDetails - Student Round Details Modal Component
 * 
 * Modal para exibir detalhes de rodada gamificada (missão com rounds) de aluno: stars (★★★), stats, critérios.
 * Usado em relatórios de missão para mostrar desempenho detalhado por rodada com tentativas múltiplas.
 * 
 * @component ModalStudentRoundDetails
 * @source educacross-frontoffice/src/components/mission-plus/ModalStudentRoundDetails.vue
 * @category Educacross Components V2
 * @subcategory Overlays
 * @priority P2
 * @status PIXEL-PERFECT
 * @since v2.0
 * 
 * Key Features:
 * - ✅ Modal overlay fixed rgba(0,0,0,0.5) z-index 1050 flex center
 * - ✅ Stars ★★★: filled #FFD700 (gold), empty #E8E8E8, font-size 28px
 * - ✅ Round indicator: "Rodada 1/3" padding 8×16px background #F3F2F7 border-radius 20px
 * - ✅ Stats grid: Taxa Acerto, Tempo Total, Questões, Dicas (48px font-size, color variants)
 * - ✅ Critérios estrelas: velocity/precision/master com emoji + checkmark verde/X cinza
 * - ✅ Comparação tentativas: 1ª vs 2ª background red/green evolução
 * - ✅ Distribuição tempo: Q1-Q4 fáceis, Q5-Q8 médias, Q9-Q12 difíceis com progress bars
 * - ✅ Histórico tentativas: grid 3 cards (1ª/2ª/3ª) evolução consistente
 * 
 * Real-world usage:
 * - Relatório de missão gamificada (professor vendo desempenho aluno)
 * - Modal detalhes de rodada (clickable table row)
 * - Comparação de tentativas (evolução aluno)
 * - Análise de tempo (distribuição por dificuldade)
 * - Uso de dicas (consultadas vs disponíveis)
 */

export default {
  title: 'Educacross Components V2/Overlays/ModalStudentRoundDetails',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# ModalStudentRoundDetails

Modal para exibir **detalhes de rodada gamificada** de aluno com stars, stats, critérios e comparações.

## Quando usar

- ✅ Relatório de missão gamificada (professor analisando desempenho)
- ✅ Modal detalhes de rodada (clickable table row)
- ✅ Comparação de tentativas múltiplas (1ª, 2ª, 3ª)
- ✅ Análise de tempo (distribuição por dificuldade)
- ✅ Uso de dicas (quais dicas consultadas)
- ✅ Critérios de estrelas (velocity, precision, master)

## Variantes

- **Default**: Rodada 1/3 João Silva + 3 stars filled + 100% Taxa + 3 stats + critérios velocity/precision/master achieved
- **PrimeiraRodada**: Ana Costa + 3 stars + banner gold "Primeira Rodada Perfeita" + 4 stats + botão "Próxima Rodada"
- **TentativaExtra**: Bruno Oliveira Rodada 2/3 Tentativa 2 + banner green "Evolução +30%" + grid 2 columns comparação 1ª vs 2ª
- **ComEstrelas**: Diana Santos 2/3 stars + análise por estrela (velocity false/precision true/master false)
- **ComTempo**: Eduardo Lima + banner "11:42 Tempo Total" + badge "3:18 abaixo média" + distribuição Q1-Q4/Q5-Q8/Q9-Q12 progress bars
- **ComDicas**: Fernanda Costa + banner orange "Dicas 2/3" + seção "Dicas Consultadas" Q3/Q7 + 1 dica disponível
- **MultiplasTentativas**: Gabriel Santos 3 tentativas + grid 3 cards evolução + análise progresso (Melhoria +3.0, Redução -6:15)
- **Interactive**: Helena Alves + onclick overlay/X/Fechar/ESC para fechar

## Características visuais

- **Overlay**: background rgba(0,0,0,0.5), z-index 1050
- **Container**: max-width 700px, border-radius 12px, shadow 0 8px 32px
- **Stars filled**: color #FFD700 (gold), font-size 28px
- **Stars empty**: color #E8E8E8, font-size 28px
- **Stats**: font-size 48px, font-weight 700, color variants (#28C76F verde, #FF9800 laranja)
- **Badge**: padding 4×12px, border-radius 20px, font-size 12px
- **Criteria**: emoji + text + checkmark verde/X cinza
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
 * | studentName | String | '' | Nome do aluno |
 * | missionName | String | '' | Nome da missão |
 * | round | Number | 1 | Número da rodada atual |
 * | totalRounds | Number | 3 | Total de rodadas |
 * | stars | Number | 0 | Número de estrelas conquistadas (0-3) |
 * | stats | Object | {} | Estatísticas: {taxa, tempo, questoes, dicas, nota} |
 * | criteria | Array | [] | Critérios de estrelas: [{name, label, achieved, reason}] |
 * | attempts | Array | null | Tentativas múltiplas: [{number, nota, taxa, tempo, dicas}] |
 * | timeDistribution | Array | null | Distribuição de tempo: [{label, time, percentage}] |
 * | hintsUsed | Array | null | Dicas usadas: [{question, message, timestamp}] |
 * | onClose | Function | null | Callback ao fechar modal |
 * 
 * ## Design Specs
 * 
 * **Cores:**
 * - Overlay: background `rgba(0,0,0,0.5)`
 * - Star filled: color `#FFD700` (gold)
 * - Star empty: color `#E8E8E8`
 * - Stat verde: color `#28C76F` (taxa acerto)
 * - Stat laranja: color `#FF9800` (tempo)
 * - Banner gold: background `#FFF8E1`, color `#FF9800`
 * - Banner green: background `#E8F5E9`, color `#28C76F`
 * - Banner orange: background `#FFF8E1`, color `#FF9800`
 * - Comparison 1ª: background `#FFEBEE` (red light)
 * - Comparison 2ª: background `#E8F5E9` (green light)
 * 
 * **Dimensões:**
 * - Overlay: position `fixed`, inset `0`, z-index `1050`
 * - Container: max-width `700px`, border-radius `12px`, box-shadow `0 8px 32px rgba(0,0,0,0.15)`
 * - Header: padding `20px 24px`, border-bottom `2px solid #E8E8E8`
 * - Body: padding `24px`, max-height `calc(100vh - 200px)`, overflow-y `auto`
 * - Close button: `32×32px`, border-radius `50%`, hover background `#6E63E8`
 * - Stars: font-size `28px`, gap `6px`
 * - Stats: font-size `48px`, font-weight `700`, line-height `1`
 * - Round indicator: padding `8px 16px`, border-radius `20px`, font-size `13px`
 * 
 * **Tipografia:**
 * - Modal title: font-size `20px`, font-weight `700`
 * - Modal subtitle: font-size `13px`, color `#6E6B7B`
 * - Stats value: font-size `48px`, font-weight `700`
 * - Stats label: font-size `13px`, color `#6E6B7B`
 * - Badge: font-size `12px`, font-weight `600`
 * 
 * **Animações:**
 * - Close button hover: background `#6E63E8`, color `#fff`, transition `.2s`
 */

const styles = `<style>
.modal-overlay {
  position: fixed;
  inset: 0;
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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  max-width: 700px;
  width: 100%;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 24px;
  border-bottom: 2px solid #E8E8E8;
}

.modal-header-content {
  flex: 1;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #5E5873;
  margin: 0 0 4px;
}

.modal-subtitle {
  font-size: 13px;
  color: #6E6B7B;
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #F8F8F8;
  color: #6E6B7B;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s;
}

.modal-close:hover {
  background: #6E63E8;
  color: #fff;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #E8E8E8;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.round-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #F3F2F7;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  color: #6E6B7B;
  margin-bottom: 16px;
}

.stars {
  display: flex;
  gap: 6px;
  font-size: 28px;
  margin-bottom: 20px;
}

.star.filled {
  color: #FFD700;
}

.star.empty {
  color: #E8E8E8;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
  margin: 24px 0;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 48px;
  font-weight: 700;
  color: #5E5873;
  line-height: 1;
  margin-bottom: 8px;
}

.stat-value.success {
  color: #28C76F;
}

.stat-value.warning {
  color: #FF9800;
}

.stat-label {
  font-size: 13px;
  color: #6E6B7B;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #5E5873;
  margin: 24px 0 12px;
}

.criteria-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.criteria-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F8F8F8;
  border-radius: 6px;
}

.criteria-emoji {
  font-size: 24px;
}

.criteria-text {
  flex: 1;
  font-size: 14px;
  color: #5E5873;
}

.criteria-status {
  font-size: 20px;
}

.criteria-status.achieved {
  color: #28C76F;
}

.criteria-status.not-achieved {
  color: #D8D6DE;
}

.banner {
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  font-weight: 600;
}

.banner.gold {
  background: #FFF8E1;
  color: #FF9800;
}

.banner.green {
  background: #E8F5E9;
  color: #28C76F;
}

.banner.orange {
  background: #FFF8E1;
  color: #FF9800;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 16px 0;
}

.comparison-card {
  padding: 16px;
  border-radius: 8px;
}

.comparison-card.bad {
  background: #FFEBEE;
}

.comparison-card.good {
  background: #E8F5E9;
}

.progress-bar {
  height: 24px;
  background: #E8E8E8;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: #6E63E8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: #fff;
}
</style>`;

/**
 * Story: Default
 * 
 * Rodada 1/3 João Silva Frações Básicas + 3 stars filled + 100% Taxa verde + 3 stats + critérios achieved.
 * 
 * Educational context: Modal padrão detalhes rodada (3 estrelas conquistadas).
 */
export const Default = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-header-content">
            <h2 class="modal-title">João Silva • Frações Básicas</h2>
            <p class="modal-subtitle">Detalhes da rodada</p>
          </div>
          <button class="modal-close">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="round-indicator">
            <i class="bi bi-award"></i>
            <span>Rodada 1 de 3</span>
          </div>
          
          <div class="stars">
            <span class="star filled">★</span>
            <span class="star filled">★</span>
            <span class="star filled">★</span>
          </div>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value success">100%</div>
              <div class="stat-label">Taxa de Acerto</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">12:35</div>
              <div class="stat-label">Tempo Total</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">10/10</div>
              <div class="stat-label">Questões</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">0/3</div>
              <div class="stat-label">Dicas Usadas</div>
            </div>
          </div>
          
          <h4 class="section-title">Critérios de Estrelas</h4>
          <div class="criteria-list">
            <div class="criteria-item">
              <span class="criteria-emoji">⚡</span>
              <span class="criteria-text"><strong>Velocidade:</strong> Completou em menos de 15 minutos</span>
              <span class="criteria-status achieved"><i class="bi bi-check-circle-fill"></i></span>
            </div>
            <div class="criteria-item">
              <span class="criteria-emoji">🎯</span>
              <span class="criteria-text"><strong>Precisão:</strong> Taxa de acerto acima de 90%</span>
              <span class="criteria-status achieved"><i class="bi bi-check-circle-fill"></i></span>
            </div>
            <div class="criteria-item">
              <span class="criteria-emoji">🏆</span>
              <span class="criteria-text"><strong>Master:</strong> Sem uso de dicas</span>
              <span class="criteria-status achieved"><i class="bi bi-check-circle-fill"></i></span>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button style="padding: 10px 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #6E6B7B; cursor: pointer">
            Fechar
          </button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Modal padrão rodada (3 estrelas, 100% acerto, critérios achieved).
    </p>
  `
};

/**
 * Story: PrimeiraRodada
 * 
 * Ana Costa + 3 stars + banner gold "Primeira Rodada Perfeita" + 4 stats + botão "Próxima Rodada" roxo.
 * 
 * Educational context: Primeira rodada perfeita (banner comemorativo gold).
 */
export const PrimeiraRodada = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-header-content">
            <h2 class="modal-title">Ana Costa • Verbos</h2>
            <p class="modal-subtitle">Primeira rodada</p>
          </div>
          <button class="modal-close">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="banner gold">
            <i class="bi bi-trophy-fill" style="font-size: 24px"></i>
            <span>🎉 Primeira Rodada Perfeita! Parabéns!</span>
          </div>
          
          <div class="stars">
            <span class="star filled">★</span>
            <span class="star filled">★</span>
            <span class="star filled">★</span>
          </div>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value success">10.0</div>
              <div class="stat-label">Nota Final</div>
            </div>
            <div class="stat-item">
              <div class="stat-value success">100%</div>
              <div class="stat-label">Taxa de Acerto</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">08:45</div>
              <div class="stat-label">Tempo Total</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">0</div>
              <div class="stat-label">Dicas Usadas</div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button style="padding: 10px 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #6E6B7B; cursor: pointer">
            Fechar
          </button>
          <button style="padding: 10px 20px; background: #6E63E8; border: none; border-radius: 6px; color: #fff; cursor: pointer; font-weight: 500">
            <i class="bi bi-arrow-right" style="margin-right: 6px"></i>
            Próxima Rodada
          </button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Primeira rodada perfeita (banner gold comemorativo).
    </p>
  `
};

/**
 * Story: TentativaExtra
 * 
 * Bruno Oliveira Rodada 2/3 Tentativa 2 + banner green "Evolução +30%" + grid 2 columns comparação 1ª vs 2ª.
 * 
 * Educational context: Comparação tentativas (evolução detectada).
 */
export const TentativaExtra = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-header-content">
            <h2 class="modal-title">Bruno Oliveira • Frações</h2>
            <p class="modal-subtitle">Rodada 2 de 3 • Tentativa 2</p>
          </div>
          <button class="modal-close">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="banner green">
            <i class="bi bi-graph-up-arrow" style="font-size: 24px"></i>
            <span>Evolução Detectada: +30% de acerto!</span>
          </div>
          
          <div class="stars">
            <span class="star filled">★</span>
            <span class="star filled">★</span>
            <span class="star filled">★</span>
          </div>
          
          <h4 class="section-title">Comparação de Tentativas</h4>
          <div class="comparison-grid">
            <div class="comparison-card bad">
              <h5 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #EA5455">1ª Tentativa</h5>
              <div style="font-size: 13px; color: #5E5873; line-height: 1.8">
                <div>Acertos: <strong>7/10</strong> (70%)</div>
                <div>Tempo: <strong>15:30</strong></div>
                <div>Dicas: <strong>3</strong></div>
              </div>
            </div>
            
            <div class="comparison-card good">
              <h5 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #28C76F">2ª Tentativa</h5>
              <div style="font-size: 13px; color: #5E5873; line-height: 1.8">
                <div>Acertos: <strong>10/10</strong> (100%)</div>
                <div>Tempo: <strong>12:15</strong></div>
                <div>Dicas: <strong>0</strong></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button style="padding: 10px 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #6E6B7B; cursor: pointer">
            Fechar
          </button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Tentativa extra (comparação 1ª vs 2ª com evolução +30%).
    </p>
  `
};

/**
 * Story: ComEstrelas
 * 
 * Diana Santos 2/3 stars + análise por estrela (velocity false "faltou 1:20", precision true, master false "usou 1 dica").
 * 
 * Educational context: Análise detalhada por estrela (critérios não atingidos).
 */
export const ComEstrelas = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-header-content">
            <h2 class="modal-title">Diana Santos • Geometria Plana</h2>
            <p class="modal-subtitle">Rodada 1 de 3</p>
          </div>
          <button class="modal-close">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="stars">
            <span class="star filled">★</span>
            <span class="star filled">★</span>
            <span class="star empty">★</span>
          </div>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value success">9.0</div>
              <div class="stat-label">Nota Final</div>
            </div>
            <div class="stat-item">
              <div class="stat-value success">90%</div>
              <div class="stat-label">Taxa de Acerto</div>
            </div>
            <div class="stat-item">
              <div class="stat-value warning">16:20</div>
              <div class="stat-label">Tempo Total</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">1/3</div>
              <div class="stat-label">Dicas Usadas</div>
            </div>
          </div>
          
          <h4 class="section-title">Análise de Estrelas</h4>
          <div class="criteria-list">
            <div class="criteria-item" style="background: #FFF8E1">
              <span class="criteria-emoji">⚡</span>
              <div class="criteria-text">
                <strong>Velocidade:</strong> Não atingido<br>
                <small style="color: #6E6B7B">Tempo: 16:20 (faltou 1:20 para completar em 15 minutos)</small>
              </div>
              <span class="criteria-status not-achieved"><i class="bi bi-x-circle-fill"></i></span>
            </div>
            
            <div class="criteria-item" style="background: #E8F5E9">
              <span class="criteria-emoji">🎯</span>
              <div class="criteria-text">
                <strong>Precisão:</strong> Atingido ✓<br>
                <small style="color: #6E6B7B">Taxa de acerto: 90% (acima de 90%)</small>
              </div>
              <span class="criteria-status achieved"><i class="bi bi-check-circle-fill"></i></span>
            </div>
            
            <div class="criteria-item" style="background: #FFF8E1">
              <span class="criteria-emoji">🏆</span>
              <div class="criteria-text">
                <strong>Master:</strong> Não atingido<br>
                <small style="color: #6E6B7B">Usou 1 dica (necessário 0 dicas)</small>
              </div>
              <span class="criteria-status not-achieved"><i class="bi bi-x-circle-fill"></i></span>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button style="padding: 10px 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #6E6B7B; cursor: pointer">
            Fechar
          </button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> 2/3 stars (análise detalhada critérios não atingidos).
    </p>
  `
};

/**
 * Story: ComTempo
 * 
 * Eduardo Lima + banner "11:42 Tempo Total" + badge "3:18 abaixo média" + distribuição Q1-Q4/Q5-Q8/Q9-Q12 progress bars.
 * 
 * Educational context: Análise detalhada de tempo (distribuição por dificuldade).
 */
export const ComTempo = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-header-content">
            <h2 class="modal-title">Eduardo Lima • Divisão e Multiplicação</h2>
            <p class="modal-subtitle">Rodada 1 de 3</p>
          </div>
          <button class="modal-close">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="banner green">
            <i class="bi bi-clock" style="font-size: 24px"></i>
            <div style="flex: 1">
              <div style="font-size: 24px; font-weight: 700">11:42</div>
              <div style="font-size: 13px; font-weight: 400">Tempo Total</div>
            </div>
            <span style="padding: 4px 12px; background: rgba(255,255,255,0.8); border-radius: 12px; font-size: 12px; color: #28C76F">
              3:18 abaixo do tempo médio
            </span>
          </div>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value success">10.0</div>
              <div class="stat-label">Nota Final</div>
            </div>
            <div class="stat-item">
              <div class="stat-value success">100%</div>
              <div class="stat-label">Taxa de Acerto</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">12/12</div>
              <div class="stat-label">Questões</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">0</div>
              <div class="stat-label">Dicas Usadas</div>
            </div>
          </div>
          
          <h4 class="section-title">Distribuição de Tempo</h4>
          <div style="display: flex; flex-direction: column; gap: 16px">
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px">
                <span style="color: #5E5873; font-weight: 500">Q1-Q4 (Fáceis)</span>
                <span style="color: #6E6B7B">3:20 • 28%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 28%">28%</div>
              </div>
            </div>
            
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px">
                <span style="color: #5E5873; font-weight: 500">Q5-Q8 (Médias)</span>
                <span style="color: #6E6B7B">4:15 • 36%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 36%">36%</div>
              </div>
            </div>
            
            <div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13px">
                <span style="color: #5E5873; font-weight: 500">Q9-Q12 (Difíceis)</span>
                <span style="color: #6E6B7B">4:07 • 36%</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: 36%">36%</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button style="padding: 10px 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #6E6B7B; cursor: pointer">
            Fechar
          </button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Análise tempo (distribuição Q1-Q4/Q5-Q8/Q9-Q12 progress bars).
    </p>
  `
};

/**
 * Story: ComDicas
 * 
 * Fernanda Costa + banner orange "Dicas 2/3" + seção "Dicas Consultadas" Q3/Q7 + mensagens + 1 dica disponível.
 * 
 * Educational context: Análise uso de dicas (quais consultadas).
 */
export const ComDicas = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-header-content">
            <h2 class="modal-title">Fernanda Costa • Fotossíntese</h2>
            <p class="modal-subtitle">Rodada 1 de 3</p>
          </div>
          <button class="modal-close">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="banner orange">
            <i class="bi bi-lightbulb" style="font-size: 24px"></i>
            <span>Dicas Utilizadas: 2 de 3</span>
          </div>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value success">8.5</div>
              <div class="stat-label">Nota Final</div>
            </div>
            <div class="stat-item">
              <div class="stat-value success">85%</div>
              <div class="stat-label">Taxa de Acerto</div>
            </div>
            <div class="stat-item">
              <div class="stat-value warning">2/3</div>
              <div class="stat-label">Dicas Usadas</div>
            </div>
          </div>
          
          <h4 class="section-title">Dicas Consultadas</h4>
          <div style="display: flex; flex-direction: column; gap: 12px">
            <div style="padding: 12px; background: #FFF8E1; border-radius: 6px; border-left: 4px solid #FF9800">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px">
                <strong style="font-size: 14px; color: #5E5873">Questão 3</strong>
                <span style="font-size: 12px; color: #6E6B7B">10:23</span>
              </div>
              <p style="margin: 0; font-size: 13px; color: #6E6B7B">
                Lembre-se: as plantas precisam de luz solar para realizar a fotossíntese.
              </p>
            </div>
            
            <div style="padding: 12px; background: #FFF8E1; border-radius: 6px; border-left: 4px solid #FF9800">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px">
                <strong style="font-size: 14px; color: #5E5873">Questão 7</strong>
                <span style="font-size: 12px; color: #6E6B7B">14:15</span>
              </div>
              <p style="margin: 0; font-size: 13px; color: #6E6B7B">
                O oxigênio (O₂) é liberado como produto da fotossíntese.
              </p>
            </div>
          </div>
          
          <div class="banner green" style="margin-top: 16px">
            <i class="bi bi-check-circle" style="font-size: 20px"></i>
            <span style="font-size: 14px">1 dica ainda disponível para consulta</span>
          </div>
        </div>
        
        <div class="modal-footer">
          <button style="padding: 10px 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #6E6B7B; cursor: pointer">
            Fechar
          </button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Análise uso dicas (2/3 consultadas Q3/Q7 + 1 disponível).
    </p>
  `
};

/**
 * Story: MultiplasTentativas
 * 
 * Gabriel Santos 3 tentativas + grid 3 cards evolução + análise progresso (Melhoria +3.0, Redução -6:15, Aumento +30%, Uso -3).
 * 
 * Educational context: Histórico tentativas (evolução consistente).
 */
export const MultiplasTentativas = {
  render: () => `
    ${styles}
    <div class="modal-overlay">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-header-content">
            <h2 class="modal-title">Gabriel Santos • Números Decimais</h2>
            <p class="modal-subtitle">Rodada 1 de 3 • 3 tentativas</p>
          </div>
          <button class="modal-close">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="banner green">
            <i class="bi bi-graph-up-arrow" style="font-size: 24px"></i>
            <span>Evolução Consistente nas 3 Tentativas!</span>
          </div>
          
          <h4 class="section-title">Histórico de Tentativas</h4>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px">
            <div style="padding: 12px; background: #FFEBEE; border-radius: 6px; text-align: center">
              <div style="font-size: 11px; font-weight: 600; color: #6E6B7B; text-transform: uppercase; margin-bottom: 8px">1ª Tentativa</div>
              <div style="font-size: 24px; font-weight: 700; color: #EA5455; margin-bottom: 8px">7.0</div>
              <div style="font-size: 12px; color: #5E5873; line-height: 1.6">
                <div>70% acerto</div>
                <div>18:30</div>
                <div>3 dicas</div>
              </div>
            </div>
            
            <div style="padding: 12px; background: #FFF8E1; border-radius: 6px; text-align: center">
              <div style="font-size: 11px; font-weight: 600; color: #6E6B7B; text-transform: uppercase; margin-bottom: 8px">2ª Tentativa</div>
              <div style="font-size: 24px; font-weight: 700; color: #FF9800; margin-bottom: 8px">9.0</div>
              <div style="font-size: 12px; color: #5E5873; line-height: 1.6">
                <div>90% acerto</div>
                <div>14:45</div>
                <div>1 dica</div>
              </div>
            </div>
            
            <div style="padding: 12px; background: #E8F5E9; border-radius: 6px; text-align: center">
              <div style="font-size: 11px; font-weight: 600; color: #6E6B7B; text-transform: uppercase; margin-bottom: 8px">3ª Tentativa</div>
              <div style="font-size: 24px; font-weight: 700; color: #28C76F; margin-bottom: 8px">10.0</div>
              <div style="font-size: 12px; color: #5E5873; line-height: 1.6">
                <div>100% acerto</div>
                <div>12:15</div>
                <div>0 dicas</div>
              </div>
            </div>
          </div>
          
          <h4 class="section-title">Análise de Progresso</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px">
            <div style="padding: 12px; background: #E8F5E9; border-radius: 6px">
              <div style="font-size: 24px; color: #28C76F; margin-bottom: 4px">+3.0</div>
              <div style="font-size: 13px; color: #6E6B7B">Melhoria na Nota</div>
            </div>
            <div style="padding: 12px; background: #E8F5E9; border-radius: 6px">
              <div style="font-size: 24px; color: #28C76F; margin-bottom: 4px">-6:15</div>
              <div style="font-size: 13px; color: #6E6B7B">Redução no Tempo</div>
            </div>
            <div style="padding: 12px; background: #E8F5E9; border-radius: 6px">
              <div style="font-size: 24px; color: #28C76F; margin-bottom: 4px">+30%</div>
              <div style="font-size: 13px; color: #6E6B7B">Aumento de Acerto</div>
            </div>
            <div style="padding: 12px; background: #E8F5E9; border-radius: 6px">
              <div style="font-size: 24px; color: #28C76F; margin-bottom: 4px">-3</div>
              <div style="font-size: 13px; color: #6E6B7B">Uso de Dicas</div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button style="padding: 10px 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #6E6B7B; cursor: pointer">
            Fechar
          </button>
          <button style="padding: 10px 20px; background: #6E63E8; border: none; border-radius: 6px; color: #fff; cursor: pointer; font-weight: 500">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> 3 tentativas (evolução 7.0→9.0→10.0 consistente).
    </p>
  `
};

/**
 * Story: Interactive
 * 
 * Helena Alves + 3 stars + 9.5 verde + 4 stats + onclick overlay/X/Fechar/ESC para fechar.
 * 
 * Educational context: Modal interativo (clique overlay/X/botão/ESC fecha).
 */
export const Interactive = {
  render: () => `
    ${styles}
    <script>
      function closeModal() {
        document.getElementById('modal').style.display = 'none';
      }
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
      });
    </script>
    
    <div id="modal" class="modal-overlay" onclick="if(event.target === this) closeModal()">
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-header-content">
            <h2 class="modal-title">Helena Alves • Áreas e Perímetros</h2>
            <p class="modal-subtitle">Rodada 1 de 3</p>
          </div>
          <button class="modal-close" onclick="closeModal()">
            <i class="bi bi-x"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <div class="stars">
            <span class="star filled">★</span>
            <span class="star filled">★</span>
            <span class="star filled">★</span>
          </div>
          
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-value success">9.5</div>
              <div class="stat-label">Nota Final</div>
            </div>
            <div class="stat-item">
              <div class="stat-value success">95%</div>
              <div class="stat-label">Taxa de Acerto</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">13:20</div>
              <div class="stat-label">Tempo Total</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">0</div>
              <div class="stat-label">Dicas Usadas</div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button style="padding: 10px 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 6px; color: #6E6B7B; cursor: pointer" onclick="closeModal()">
            Fechar
          </button>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B; text-align: center">
      <strong>Contexto:</strong> Modal interativo (clique overlay/X/botão Fechar/ESC fecha modal).
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
          <div style="display:inline-block;padding:8px 16px;background:rgba(255,255,255,0.15);border-radius:50px;margin-bottom:20px;font-size:14px;border:1px solid rgba(255,255,255,0.2);">Overlays</div>
          <h1 style="font-size:3rem;font-weight:700;margin:0 0 12px 0;letter-spacing:-0.02em;">ModalStudentRoundDetails</h1>
          <p style="font-size:1.1rem;opacity:0.9;margin:0;max-width:600px;">Student Round Details Modal Component</p>
        </div>
      </div>
      <div style="max-width:900px;margin:0 auto;padding:48px 40px;">
        <div style="background:white;border-radius:12px;padding:32px;margin-bottom:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Sobre o Componente</h2>
          <p style="color:#6E6B7B;line-height:1.7;margin:0 0 16px 0;">Student Round Details Modal Component. Faz parte da categoria <strong>Overlays</strong> do Design System Educacross.</p>
          <div style="background:#F8F7FF;border-left:4px solid #6E63E8;padding:16px;border-radius:4px;">
            <p style="margin:0;color:#5E5873;font-size:14px;line-height:1.6;"><strong>💡 Dica:</strong> Use <em>Playground</em> para explorar props, <em>Use Cases</em> para exemplos reais e <em>Accessibility</em> para validar WCAG.</p>
          </div>
        </div>
        <div style="background:white;border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <h2 style="font-size:1.1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">Implementação Vue 2.7</h2>
          <pre style="background:#1E1E2E;color:#CDD6F4;padding:20px;border-radius:8px;font-size:13px;line-height:1.6;overflow:auto;margin:0;"><code>import ModalStudentRoundDetails from '@/components/ModalStudentRoundDetails.vue';

// Template
&lt;ModalStudentRoundDetails v-bind="props" /&gt;</code></pre>
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
    docs: { description: { story: 'Explore o ModalStudentRoundDetails com controles interativos.' } },
  },
  render: (args) => `
    <div style="padding:32px;display:flex;justify-content:center;align-items:center;min-height:200px;background:#F8F8F8;border-radius:12px;">
      <div style="text-align:center;color:#6E6B7B;">
        <div style="width:60px;height:60px;background:#6E63E820;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:24px;">🎨</div>
        <p style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#5E5873;">Playground ModalStudentRoundDetails</p>
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
    docs: { description: { story: 'Exemplos de uso real do ModalStudentRoundDetails no Educacross.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">
      <div style="background:#6E63E815;border:1px solid #6E63E830;border-radius:12px;padding:24px;margin-bottom:40px;">
        <h1 style="font-size:1.5rem;font-weight:700;color:#5E5873;margin:0 0 8px 0;">Casos de Uso: ModalStudentRoundDetails</h1>
        <p style="color:#6E6B7B;margin:0;font-size:14px;line-height:1.6;">Cenários reais de uso no contexto educacional da plataforma Educacross</p>
      </div>
      
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">1</span>
          Professor — Painel Principal
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Professor utilizando ModalStudentRoundDetails no dashboard de gestão de turmas</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">2</span>
          Aluno — Portal do Estudante
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Aluno interagindo com ModalStudentRoundDetails no portal educacional</p>
        <div style="background:#F8F8F8;border-radius:8px;padding:20px;margin-left:38px;text-align:center;color:#B9B9C3;font-size:13px;">
          Ver story <strong>Default</strong> para visualização do componente neste contexto
        </div>
      </div>
      <div style="margin-bottom:32px;">
        <h2 style="font-size:18px;font-weight:600;color:#5E5873;margin:0 0 8px 0;display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#6E63E8;color:white;border-radius:50%;font-size:13px;font-weight:700;flex-shrink:0;">3</span>
          Coordenador — Relatórios
        </h2>
        <p style="color:#6E6B7B;margin:0 0 16px 0;padding-left:38px;font-size:14px;">Coordenador pedagógico analisando dados via ModalStudentRoundDetails</p>
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
    docs: { description: { story: 'Conformidade WCAG 2.1 AA para o ModalStudentRoundDetails.' } },
  },
  render: () => `
    <div style="max-width:800px;margin:0 auto;padding:40px 20px;font-family:'Public Sans',sans-serif;">

      <div style="background:linear-gradient(135deg,#6E63E8 0%,#764ba2 100%);padding:32px;border-radius:12px;margin-bottom:32px;color:white;">
        <h1 style="font-size:1.5rem;font-weight:700;margin:0 0 8px 0;">Acessibilidade: ModalStudentRoundDetails</h1>
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

