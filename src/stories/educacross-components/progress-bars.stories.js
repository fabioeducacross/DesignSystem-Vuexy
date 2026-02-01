/**
 * Educacross Components - Progress Bars
 * 
 * Barras de progresso extraídas do educacross-frontoffice
 * Usadas para mostrar proficiência, conclusão de atividades, etc
 */

export default {
  title: 'Educacross/Progress Bars',
  parameters: {
    layout: 'padded',
  },
};

/**
 * ProgressBarHorizontal - Barra horizontal com cores dinâmicas
 * Original: educacross-frontoffice/src/components/progessBar/ProgressBarHorizontal.vue
 */
export const ProgressBarHorizontal = {
  render: () => `
    <style>
      .bg-progress-bar-danger {
        background: rgba(234, 84, 85, 0.12);
        border-radius: 0.5rem;
        padding: 0.25rem;
      }
      
      .bg-progress-bar-warning {
        background: rgba(250, 184, 74, 0.12);
        border-radius: 0.5rem;
        padding: 0.25rem;
      }
      
      .bg-progress-bar-success {
        background: rgba(40, 199, 111, 0.12);
        border-radius: 0.5rem;
        padding: 0.25rem;
      }
      
      .text-danger { color: #EA5455 !important; }
      .text-warning { color: #FF9F43 !important; }
      .text-success { color: #28C76F !important; }
      
      .progress-bar-demo .progress-item {
        margin-bottom: 1.5rem;
      }
      
      .progress-bar-demo .progress {
        height: 6px;
        border-radius: 1rem;
      }
    </style>
    
    <div class="progress-bar-demo">
      <h5 class="mb-4">Progress Bars - Cores Dinâmicas por Valor</h5>
      
      <div class="progress-item">
        <div class="d-flex justify-content-between mb-2">
          <span class="fw-bold">Proficiência em Matemática</span>
          <span class="fw-bold text-success">92%</span>
        </div>
        <div class="bg-progress-bar-success">
          <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: 92%"></div>
          </div>
        </div>
      </div>
      
      <div class="progress-item">
        <div class="d-flex justify-content-between mb-2">
          <span class="fw-bold">Conclusão de Atividades</span>
          <span class="fw-bold text-warning">68%</span>
        </div>
        <div class="bg-progress-bar-warning">
          <div class="progress">
            <div class="progress-bar bg-warning" role="progressbar" style="width: 68%"></div>
          </div>
        </div>
      </div>
      
      <div class="progress-item">
        <div class="d-flex justify-content-between mb-2">
          <span class="fw-bold">Frequência</span>
          <span class="fw-bold text-danger">45%</span>
        </div>
        <div class="bg-progress-bar-danger">
          <div class="progress">
            <div class="progress-bar bg-danger" role="progressbar" style="width: 45%"></div>
          </div>
        </div>
      </div>
      
      <h6 class="mt-4 mb-3">Com Sufixo e Info Adicional</h6>
      
      <div class="progress-item">
        <div class="d-flex justify-content-between mb-2">
          <span class="fw-bold">
            Leitura Fluente
            <i class="ti ti-info-circle text-muted ms-1" title="Palavras por minuto"></i>
          </span>
          <span class="fw-bold text-success">85 PPM</span>
        </div>
        <div class="bg-progress-bar-success">
          <div class="progress">
            <div class="progress-bar bg-success" role="progressbar" style="width: 85%"></div>
          </div>
        </div>
        <small class="text-muted">Meta: 80 palavras por minuto</small>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>Regras de Cor (Lógica Original):</strong>
        <ul class="mb-0 mt-2">
          <li><strong class="text-success">Verde:</strong> ≥ 80% (Excelente)</li>
          <li><strong class="text-warning">Amarelo:</strong> 50-79% (Regular)</li>
          <li><strong class="text-danger">Vermelho:</strong> &lt; 50% (Crítico)</li>
        </ul>
        <p class="mb-0 mt-2">
          <strong>Uso Original:</strong> Dashboards de proficiência, relatórios de aluno, 
          métricas de reading meter, e indicadores de desempenho.
        </p>
      </div>
    </div>
  `,
};

/**
 * ProgressBarVertical - Barra vertical para comparações
 * Original: educacross-frontoffice/src/components/progessBar/ProgressBarVertical.vue
 */
export const ProgressBarVertical = {
  render: () => `
    <style>
      .progress-vertical {
        width: 40px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        background: #f8f9fa;
        border-radius: 0.5rem;
        overflow: hidden;
      }
      
      .progress-vertical-fill {
        transition: height 0.3s ease;
        border-radius: 0.5rem 0.5rem 0 0;
      }
    </style>
    
    <div>
      <h5 class="mb-4">Progress Bars Verticais - Comparação de Alunos</h5>
      
      <div class="d-flex align-items-end gap-3">
        <div class="text-center">
          <div class="progress-vertical">
            <div class="progress-vertical-fill bg-success" style="height: 92%"></div>
          </div>
          <small class="d-block mt-2">João<br><strong>92%</strong></small>
        </div>
        
        <div class="text-center">
          <div class="progress-vertical">
            <div class="progress-vertical-fill bg-success" style="height: 85%"></div>
          </div>
          <small class="d-block mt-2">Maria<br><strong>85%</strong></small>
        </div>
        
        <div class="text-center">
          <div class="progress-vertical">
            <div class="progress-vertical-fill bg-warning" style="height: 68%"></div>
          </div>
          <small class="d-block mt-2">Pedro<br><strong>68%</strong></small>
        </div>
        
        <div class="text-center">
          <div class="progress-vertical">
            <div class="progress-vertical-fill bg-danger" style="height: 45%"></div>
          </div>
          <small class="d-block mt-2">Ana<br><strong>45%</strong></small>
        </div>
        
        <div class="text-center">
          <div class="progress-vertical">
            <div class="progress-vertical-fill bg-success" style="height: 78%"></div>
          </div>
          <small class="d-block mt-2">Carlos<br><strong>78%</strong></small>
        </div>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>Uso Original:</strong> Comparação visual de performance entre alunos, 
        gráficos de ranking, e visualizações de turma.
      </div>
    </div>
  `,
};

/**
 * RainbowProgressBar - Barra com gradiente colorido
 * Original: educacross-frontoffice/src/components/progessBar/RainbowProgressBar.vue
 */
export const RainbowProgressBar = {
  render: () => `
    <style>
      .rainbow-progress {
        height: 8px;
        border-radius: 1rem;
        background: linear-gradient(
          90deg,
          #EA5455 0%,
          #FF9F43 25%,
          #FAB84A 50%,
          #28C76F 75%,
          #00CFE8 100%
        );
        position: relative;
        overflow: hidden;
      }
      
      .rainbow-progress::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.3);
        animation: shimmer 2s infinite;
      }
      
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    </style>
    
    <div>
      <h5 class="mb-4">Rainbow Progress Bar - Gamificação</h5>
      
      <div class="mb-4">
        <div class="d-flex justify-content-between mb-2">
          <span class="fw-bold">Nível de Experiência</span>
          <span class="fw-bold text-primary">Nível 12 - 75% para próximo</span>
        </div>
        <div class="rainbow-progress"></div>
        <small class="text-muted">15.000 / 20.000 XP</small>
      </div>
      
      <div class="mb-4">
        <div class="d-flex justify-content-between mb-2">
          <span class="fw-bold">Sequência de Estudos</span>
          <span class="fw-bold text-warning">🔥 12 dias</span>
        </div>
        <div class="rainbow-progress"></div>
        <small class="text-muted">Continue estudando para manter a sequência!</small>
      </div>
      
      <div class="alert alert-info">
        <strong>Uso Original:</strong> Elementos de gamificação, níveis de XP, 
        sequências de estudo (streaks), e progresso de badges/conquistas.
      </div>
    </div>
  `,
};

/**
 * ProgressBarWithLabel - Barra com label interno
 * Original: Variante do ProgressBarHorizontal
 */
export const ProgressBarWithLabel = {
  render: () => `
    <style>
      .progress-with-label .progress {
        height: 1.5rem;
        font-size: 0.75rem;
      }
      
      .progress-with-label .progress-bar {
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
      }
    </style>
    
    <div class="progress-with-label">
      <h5 class="mb-4">Progress Bars com Label Interno</h5>
      
      <div class="mb-4">
        <span class="d-block mb-2 fw-bold">Português</span>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" style="width: 95%">95%</div>
        </div>
      </div>
      
      <div class="mb-4">
        <span class="d-block mb-2 fw-bold">Matemática</span>
        <div class="progress">
          <div class="progress-bar bg-primary" role="progressbar" style="width: 82%">82%</div>
        </div>
      </div>
      
      <div class="mb-4">
        <span class="d-block mb-2 fw-bold">Ciências</span>
        <div class="progress">
          <div class="progress-bar bg-warning" role="progressbar" style="width: 65%">65%</div>
        </div>
      </div>
      
      <div class="mb-4">
        <span class="d-block mb-2 fw-bold">História</span>
        <div class="progress">
          <div class="progress-bar bg-danger" role="progressbar" style="width: 38%">38%</div>
        </div>
      </div>
      
      <div class="alert alert-info">
        <strong>Uso Original:</strong> Relatórios de proficiência por disciplina, 
        visão geral do desempenho do aluno em múltiplas áreas.
      </div>
    </div>
  `,
};

/**
 * MultipleProgressBars - Barras múltiplas agrupadas
 * Original: Usado em dashboards comparativos
 */
export const MultipleProgressBars = {
  render: () => `
    <style>
      .multi-progress-item {
        background: #fff;
        border: 1px solid #e9ecef;
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      
      .multi-progress-item .progress {
        height: 6px;
        margin-bottom: 0.5rem;
      }
    </style>
    
    <div>
      <h5 class="mb-4">Múltiplas Barras - Dashboard de Turma</h5>
      
      <div class="multi-progress-item">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h6 class="mb-0">5º Ano A</h6>
            <small class="text-muted">28 alunos</small>
          </div>
          <span class="badge bg-success">Meta atingida</span>
        </div>
        
        <div class="row">
          <div class="col-md-4">
            <small class="text-muted d-block">Português: 85%</small>
            <div class="progress">
              <div class="progress-bar bg-success" style="width: 85%"></div>
            </div>
          </div>
          <div class="col-md-4">
            <small class="text-muted d-block">Matemática: 78%</small>
            <div class="progress">
              <div class="progress-bar bg-primary" style="width: 78%"></div>
            </div>
          </div>
          <div class="col-md-4">
            <small class="text-muted d-block">Ciências: 82%</small>
            <div class="progress">
              <div class="progress-bar bg-info" style="width: 82%"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="multi-progress-item">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div>
            <h6 class="mb-0">5º Ano B</h6>
            <small class="text-muted">26 alunos</small>
          </div>
          <span class="badge bg-warning">Em progresso</span>
        </div>
        
        <div class="row">
          <div class="col-md-4">
            <small class="text-muted d-block">Português: 72%</small>
            <div class="progress">
              <div class="progress-bar bg-warning" style="width: 72%"></div>
            </div>
          </div>
          <div class="col-md-4">
            <small class="text-muted d-block">Matemática: 68%</small>
            <div class="progress">
              <div class="progress-bar bg-warning" style="width: 68%"></div>
            </div>
          </div>
          <div class="col-md-4">
            <small class="text-muted d-block">Ciências: 75%</small>
            <div class="progress">
              <div class="progress-bar bg-primary" style="width: 75%"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="alert alert-info">
        <strong>Uso Original:</strong> Dashboard de coordenadores para comparar 
        desempenho entre turmas em múltiplas disciplinas.
      </div>
    </div>
  `,
};
