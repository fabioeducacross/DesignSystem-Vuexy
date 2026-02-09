const _={title:"Educacross Components V2/Overlays/ModalStudentRoundDetails",tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}}}},s=`<style>
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
</style>`,a={render:()=>`
    ${s}
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
  `},i={render:()=>`
    ${s}
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
  `},t={render:()=>`
    ${s}
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
  `},e={render:()=>`
    ${s}
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
  `},n={render:()=>`
    ${s}
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
  `},o={render:()=>`
    ${s}
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
  `},d={render:()=>`
    ${s}
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
  `},l={render:()=>`
    ${s}
    <script>
      function closeModal() {
        document.getElementById('modal').style.display = 'none';
      }
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
      });
    <\/script>
    
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
  `};var r,c,v,p,x;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
  \`
}`,...(v=(c=a.parameters)==null?void 0:c.docs)==null?void 0:v.source},description:{story:`Story: Default

Rodada 1/3 João Silva Frações Básicas + 3 stars filled + 100% Taxa verde + 3 stats + critérios achieved.

Educational context: Modal padrão detalhes rodada (3 estrelas conquistadas).`,...(x=(p=a.parameters)==null?void 0:p.docs)==null?void 0:x.description}}};var m,u,b,g,f;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
  \`
}`,...(b=(u=i.parameters)==null?void 0:u.docs)==null?void 0:b.source},description:{story:`Story: PrimeiraRodada

Ana Costa + 3 stars + banner gold "Primeira Rodada Perfeita" + 4 stats + botão "Próxima Rodada" roxo.

Educational context: Primeira rodada perfeita (banner comemorativo gold).`,...(f=(g=i.parameters)==null?void 0:g.docs)==null?void 0:f.description}}};var E,y,h,F,B;t.parameters={...t.parameters,docs:{...(E=t.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
  \`
}`,...(h=(y=t.parameters)==null?void 0:y.docs)==null?void 0:h.source},description:{story:`Story: TentativaExtra

Bruno Oliveira Rodada 2/3 Tentativa 2 + banner green "Evolução +30%" + grid 2 columns comparação 1ª vs 2ª.

Educational context: Comparação tentativas (evolução detectada).`,...(B=(F=t.parameters)==null?void 0:F.docs)==null?void 0:B.description}}};var D,z,k,C,T;e.parameters={...e.parameters,docs:{...(D=e.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
  \`
}`,...(k=(z=e.parameters)==null?void 0:z.docs)==null?void 0:k.source},description:{story:`Story: ComEstrelas

Diana Santos 2/3 stars + análise por estrela (velocity false "faltou 1:20", precision true, master false "usou 1 dica").

Educational context: Análise detalhada por estrela (critérios não atingidos).`,...(T=(C=e.parameters)==null?void 0:C.docs)==null?void 0:T.description}}};var w,A,Q,S,R;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
  \`
}`,...(Q=(A=n.parameters)==null?void 0:A.docs)==null?void 0:Q.source},description:{story:`Story: ComTempo

Eduardo Lima + banner "11:42 Tempo Total" + badge "3:18 abaixo média" + distribuição Q1-Q4/Q5-Q8/Q9-Q12 progress bars.

Educational context: Análise detalhada de tempo (distribuição por dificuldade).`,...(R=(S=n.parameters)==null?void 0:S.docs)==null?void 0:R.description}}};var M,P,j,U,N;o.parameters={...o.parameters,docs:{...(M=o.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
  \`
}`,...(j=(P=o.parameters)==null?void 0:P.docs)==null?void 0:j.source},description:{story:`Story: ComDicas

Fernanda Costa + banner orange "Dicas 2/3" + seção "Dicas Consultadas" Q3/Q7 + mensagens + 1 dica disponível.

Educational context: Análise uso de dicas (quais consultadas).`,...(N=(U=o.parameters)==null?void 0:U.docs)==null?void 0:N.description}}};var $,O,V,L,H;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
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
  \`
}`,...(V=(O=d.parameters)==null?void 0:O.docs)==null?void 0:V.source},description:{story:`Story: MultiplasTentativas

Gabriel Santos 3 tentativas + grid 3 cards evolução + análise progresso (Melhoria +3.0, Redução -6:15, Aumento +30%, Uso -3).

Educational context: Histórico tentativas (evolução consistente).`,...(H=(L=d.parameters)==null?void 0:L.docs)==null?void 0:H.description}}};var q,G,I,X,J;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <script>
      function closeModal() {
        document.getElementById('modal').style.display = 'none';
      }
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
      });
    <\/script>
    
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
  \`
}`,...(I=(G=l.parameters)==null?void 0:G.docs)==null?void 0:I.source},description:{story:`Story: Interactive

Helena Alves + 3 stars + 9.5 verde + 4 stats + onclick overlay/X/Fechar/ESC para fechar.

Educational context: Modal interativo (clique overlay/X/botão/ESC fecha).`,...(J=(X=l.parameters)==null?void 0:X.docs)==null?void 0:J.description}}};const K=["Default","PrimeiraRodada","TentativaExtra","ComEstrelas","ComTempo","ComDicas","MultiplasTentativas","Interactive"];export{o as ComDicas,e as ComEstrelas,n as ComTempo,a as Default,l as Interactive,d as MultiplasTentativas,i as PrimeiraRodada,t as TentativaExtra,K as __namedExportsOrder,_ as default};
