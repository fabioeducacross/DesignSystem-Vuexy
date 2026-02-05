/**
 * @component GuidesLimitAlert
 * @description Alert modal warning about monthly mission creation limits per class
 * @source educacross-frontoffice/src/components/GuidesLimitAlert.vue
 * @generated 2026-02-03
 */

const componentStyles = `
<style>
.guides-limit-alert {
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 16px;
  border: 1px solid;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.guides-limit-alert.alert-info {
  background-color: rgba(0, 207, 232, 0.12);
  border-color: #00CFE8;
  color: #00A0B8;
}

.guides-limit-alert.alert-warning {
  background-color: rgba(255, 159, 67, 0.12);
  border-color: #FF9F43;
  color: #E08A2C;
}

.guides-limit-alert.alert-danger {
  background-color: rgba(234, 84, 85, 0.12);
  border-color: #EA5455;
  color: #C13536;
}

.alert-icon {
  font-size: 24px;
  flex-shrink: 0;
  line-height: 1;
  margin-top: 2px;
}

.alert-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-grow: 1;
}

.alert-title {
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 4px;
}

.alert-text {
  font-size: 14px;
  line-height: 1.5;
}

.info-icon {
  font-size: 18px;
  cursor: help;
  color: inherit;
  vertical-align: middle;
  margin-left: 6px;
  position: relative;
  display: inline-block;
}

.info-icon:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

.tooltip-text {
  visibility: hidden;
  width: 280px;
  background-color: #5D596C;
  color: #fff;
  text-align: left;
  border-radius: 6px;
  padding: 10px 12px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -140px;
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.4;
}

.tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #5D596C transparent transparent transparent;
}

.turmas-card {
  background: white;
  padding: 24px;
  border: 1px solid #DBDADE;
  border-radius: 12px;
  max-width: 700px;
}

.turmas-card h5 {
  margin-bottom: 20px;
  color: #5D596C;
  font-weight: 600;
  font-size: 18px;
}

.alert-close-btn {
  background: none;
  border: none;
  color: inherit;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.alert-close-btn:hover {
  opacity: 1;
}

.demo-container {
  padding: 24px;
  background: #F8F7FA;
  border-radius: 12px;
}

.demo-label {
  font-size: 13px;
  font-weight: 600;
  color: #6E6B7B;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.responsive-layout-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.layout-label {
  font-size: 12px;
  font-weight: 600;
  color: #6E6B7B;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.desktop-view {
  width: 100%;
}

.mobile-view {
  max-width: 375px;
}

@media (max-width: 991px) {
  .guides-limit-alert {
    flex-direction: column;
  }

  .alert-icon {
    font-size: 20px;
  }
}

/* Material Symbols Outlined font */
.material-symbols-outlined {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
}
</style>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
`;

export default {
  title: 'Front-office/Feedback/GuidesLimitAlert',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Alert modal warning about monthly mission creation limits per class. Supports info, warning, and danger states with tooltips for limit calculation rules.',
      },
    },
  },
};

/**
 * Info alert showing "5 de 40 missões criadas" in blue info variant
 */
export const Default = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Alerta Informativo Padrão</div>
      <div class="guides-limit-alert alert-info">
        <span class="material-symbols-outlined alert-icon">edit_calendar</span>
        <div class="alert-content">
          <div class="alert-text">
            É permitida a criação de até <strong>40 missões ao mês</strong> por turma. 
            Você criou <strong>5 de 40</strong> missões neste mês.
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Warning alert showing "35 de 40 missões" in orange warning variant, "Atenção:" prefix
 */
export const Warning = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Alerta de Atenção - Limite Próximo</div>
      <div class="guides-limit-alert alert-warning">
        <span class="material-symbols-outlined alert-icon">edit_calendar</span>
        <div class="alert-content">
          <div class="alert-title">Atenção:</div>
          <div class="alert-text">
            Você está próximo do limite mensal. Foram criadas <strong>35 de 40 missões</strong> 
            permitidas para a Turma 7A este mês. Restam apenas 5 missões disponíveis.
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Danger alert "As missões dessa turma se esgotaram" in red, suggesting deletion
 */
export const Danger = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Alerta de Perigo - Limite Atingido</div>
      <div class="guides-limit-alert alert-danger">
        <span class="material-symbols-outlined alert-icon">edit_calendar</span>
        <div class="alert-content">
          <div class="alert-title">Limite Atingido!</div>
          <div class="alert-text">
            As missões dessa turma se esgotaram. Você atingiu o limite de <strong>40 missões 
            criadas</strong> para a Turma 8B Matemática neste mês. Para criar novas missões, 
            aguarde o próximo mês ou exclua missões antigas que não estão mais em uso.
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Alert with info icon showing hover tooltip explaining calculation rules
 */
export const WithTooltip = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Alerta com Tooltip Explicativo</div>
      <div class="guides-limit-alert alert-info">
        <span class="material-symbols-outlined alert-icon">edit_calendar</span>
        <div class="alert-content">
          <div class="alert-text">
            É permitida a criação de até <strong>40 missões ao mês</strong> por turma. 
            Você criou <strong>12 de 40</strong> missões neste mês.
            <span class="info-icon">
              <span class="material-symbols-outlined">info</span>
              <span class="tooltip-text">
                O limite de 40 missões é calculado por turma e renovado mensalmente. 
                Missões criadas em meses anteriores não contam para o limite atual. 
                Missões excluídas não liberam vagas no limite mensal.
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Shows flex-column mobile → flex-lg-row desktop layout transformation
 */
export const ResponsiveLayout = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Layout Responsivo - Desktop vs Mobile</div>
      <div class="responsive-layout-demo">
        <div class="desktop-view">
          <div class="layout-label">Desktop (> 991px)</div>
          <div class="guides-limit-alert alert-warning">
            <span class="material-symbols-outlined alert-icon">edit_calendar</span>
            <div class="alert-content">
              <div class="alert-title">Atenção:</div>
              <div class="alert-text">
                Layout horizontal com ícone à esquerda e conteúdo ao lado. 
                Você criou <strong>28 de 40 missões</strong> neste mês.
              </div>
            </div>
          </div>
        </div>

        <div class="mobile-view">
          <div class="layout-label">Mobile (≤ 991px)</div>
          <div class="guides-limit-alert alert-warning" style="flex-direction: column;">
            <span class="material-symbols-outlined alert-icon">edit_calendar</span>
            <div class="alert-content">
              <div class="alert-title">Atenção:</div>
              <div class="alert-text">
                Layout vertical com ícone no topo e conteúdo abaixo. 
                Você criou <strong>28 de 40 missões</strong> neste mês.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Card showing 3 alerts for different classes (Turma A info, Turma B warning, Turma C danger)
 */
export const MultipleTurmas = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Múltiplas Turmas com Estados Diferentes</div>
      <div class="turmas-card">
        <h5>Status de Limites por Turma</h5>
        
        <div class="guides-limit-alert alert-info">
          <span class="material-symbols-outlined alert-icon">edit_calendar</span>
          <div class="alert-content">
            <div class="alert-title">Turma 7A - Matemática</div>
            <div class="alert-text">
              Criadas <strong>8 de 40 missões</strong> neste mês. Limite confortável.
            </div>
          </div>
        </div>

        <div class="guides-limit-alert alert-warning">
          <span class="material-symbols-outlined alert-icon">edit_calendar</span>
          <div class="alert-content">
            <div class="alert-title">Turma 8B - Português</div>
            <div class="alert-text">
              Criadas <strong>33 de 40 missões</strong> neste mês. Aproximando-se do limite.
            </div>
          </div>
        </div>

        <div class="guides-limit-alert alert-danger">
          <span class="material-symbols-outlined alert-icon">edit_calendar</span>
          <div class="alert-content">
            <div class="alert-title">Turma 9C - Ciências</div>
            <div class="alert-text">
              <strong>Limite atingido!</strong> Criadas <strong>40 de 40 missões</strong> neste mês. 
              Aguarde o próximo mês ou exclua missões antigas.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Enlarged edit_calendar icon (32px) with prominent display
 */
export const WithIcon = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Alerta com Ícone Grande</div>
      <div class="guides-limit-alert alert-info">
        <span class="material-symbols-outlined alert-icon" style="font-size: 32px;">edit_calendar</span>
        <div class="alert-content">
          <div class="alert-title">Gerenciamento de Missões</div>
          <div class="alert-text">
            É permitida a criação de até <strong>40 missões ao mês</strong> por turma para 
            garantir qualidade pedagógica e evitar sobrecarga dos alunos. 
            Você criou <strong>15 de 40 missões</strong> neste mês para a Turma 6B.
          </div>
        </div>
      </div>
    </div>
  `,
};

/**
 * Alert with close button emitting @input event with setTimeout alert
 */
export const Interactive = {
  render: () => {
    setTimeout(() => {
      const closeBtn = document.getElementById('close-alert-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          const alert = document.getElementById('interactive-alert');
          if (alert) {
            alert.style.opacity = '0';
            alert.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
              alert.style.display = 'none';
              alert('Alerta fechado! Evento @input emitido.');
            }, 300);
          }
        });
      }
    }, 100);

    return `
      ${componentStyles}
      <div class="demo-container">
        <div class="demo-label">Alerta Interativo com Botão Fechar</div>
        <div id="interactive-alert" class="guides-limit-alert alert-warning">
          <span class="material-symbols-outlined alert-icon">edit_calendar</span>
          <div class="alert-content">
            <div class="alert-title">Atenção: Limite Próximo</div>
            <div class="alert-text">
              Você criou <strong>36 de 40 missões</strong> para a Turma 7A neste mês. 
              Restam apenas 4 missões disponíveis. Clique no X para fechar este alerta.
            </div>
          </div>
          <button id="close-alert-btn" class="alert-close-btn" aria-label="Fechar alerta">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    `;
  },
};
