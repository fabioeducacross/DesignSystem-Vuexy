/**
 * DynamicMediaCard - Card com Animação de Números
 * =================================================
 * Card de métrica que anima mudanças de valores dinamicamente (CountUp effect)
 * 
 * @component DynamicMediaCard
 * @source educacross-frontoffice/src/components/card/DynamicMediaCard.vue
 * @category Cards
 * @priority P1 - Core UI
 * 
 * ## Contexto Educacional
 * - **Professor**: Dashboard em tempo real com métricas que mudam durante o dia
 * - **Coordenador**: Comparação mensal/anual com animação de diferenças
 * - **Aluno**: Progresso pessoal com feedback visual de evolução
 * 
 * ## Casos de Uso
 * - Dashboard em tempo real (alunos online, missões sendo completadas)
 * - Comparação de períodos (mês atual vs anterior)
 * - Feedback imediato de ações (+ pontos, + conquistas)
 * - Métricas financeiras (investimento por aluno)
 * - Indicadores de performance educacional
 * 
 * ## Props API
 * @prop {string} title - Título da métrica (ex: "Alunos Ativos")
 * @prop {number} value - Valor atual da métrica
 * @prop {number} previousValue - Valor anterior (para animação)
 * @prop {number} animationDuration - Duração da animação em ms (default: 2000)
 * @prop {string} icon - Ícone Bootstrap Icons
 * @prop {string} color - Cor: 'primary', 'success', 'warning', 'danger', 'info'
 * @prop {string} format - Formato: 'number', 'percentage', 'currency'
 * @prop {boolean} loading - Estado de carregamento
 * 
 * ## Figma Design Specs
 * 
 * ### Dimensões
 * - **Card**: Width 100%, min-height 180px, padding 24px
 * - **Icon Container**: 64x64px, border-radius 12px
 * - **Icon**: font-size 32px
 * - **Gap**: 16px entre elementos
 * 
 * ### Cores
 * Mesmas do MediaCardIcon (primary, success, warning, danger, info)
 * 
 * ### Tipografia
 * - **Title**: font-size 14px, font-weight 500, color #6E6B7B
 * - **Value**: font-size 36px, font-weight 700, color #5E5873, line-height 1
 * - **Previous Value**: font-size 12px, font-weight 400, color #B9B9C3
 * 
 * ### Animação
 * - **CountUp**: Número anima de previousValue → value
 * - **Duration**: 2000ms (2 segundos)
 * - **Easing**: ease-out
 * - **Format**: Number (1.234), Percentage (45%), Currency (R$ 1.234,56)
 * 
 * ### Estados
 * - **Default**: Border cinza, fundo branco
 * - **Animating**: Cor da variant com destaque
 * - **Loading**: Skeleton com pulse
 * - **Error**: Border vermelho, ícone de erro
 * 
 * ### Acessibilidade
 * - Role: article
 * - aria-live: polite (anuncia mudanças)
 * - aria-label: descrição completa
 * - Screen reader: anuncia valor final após animação
 * 
 * ## Integração Vue 2.7
 * ```vue
 * <DynamicMediaCard
 *   title="Alunos Ativos"
 *   :value="156"
 *   :previous-value="138"
 *   icon="bi-people"
 *   color="primary"
 *   format="number"
 *   :animation-duration="2000"
 * />
 * 
 * <DynamicMediaCard
 *   title="Taxa de Conclusão"
 *   :value="92.5"
 *   :previous-value="85.3"
 *   icon="bi-check-circle"
 *   color="success"
 *   format="percentage"
 * />
 * ```
 */

export default {
  title: 'Educacross Components V2/Cards/DynamicMediaCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Card de métrica com animação CountUp para mudanças dinâmicas de valores.

### Features
- ✅ Animação CountUp (previousValue → value)
- ✅ 3 formatos (number, percentage, currency)
- ✅ 5 cores (primary, success, warning, danger, info)
- ✅ Duração configurável
- ✅ Loading skeleton
- ✅ Estados: default, animating, loading
- ✅ Acessibilidade (aria-live, screen reader)
- ✅ Contexto educacional (tempo real, comparação)
        `
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título da métrica',
      table: {
        type: { summary: 'string' }
      }
    },
    value: {
      control: 'number',
      description: 'Valor atual',
      table: {
        type: { summary: 'number' }
      }
    },
    previousValue: {
      control: 'number',
      description: 'Valor anterior (para animação)',
      table: {
        type: { summary: 'number' }
      }
    },
    format: {
      control: 'select',
      options: ['number', 'percentage', 'currency'],
      description: 'Formato de exibição',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'number' }
      }
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
      description: 'Cor do card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' }
      }
    },
    icon: {
      control: 'text',
      description: 'Ícone Bootstrap Icons',
      table: {
        type: { summary: 'string' }
      }
    },
    animationDuration: {
      control: 'number',
      description: 'Duração da animação em ms',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2000' }
      }
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    }
  }
};

// Estilos Figma CSS
const componentStyles = `
/* Card Container */
.dynamic-media-card {
  background: white;
  border: 1px solid #EBE9F1;
  border-radius: 8px;
  padding: 24px;
  min-height: 180px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all 0.3s ease;
}

.dynamic-media-card:hover {
  box-shadow: 0 4px 24px rgba(34, 41, 47, 0.12);
}

/* Icon Container */
.dynamic-icon-container {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 32px;
}

.dynamic-icon-container.primary {
  background: rgba(110, 99, 232, 0.12);
  color: #6E63E8;
}

.dynamic-icon-container.success {
  background: rgba(40, 199, 111, 0.12);
  color: #28C76F;
}

.dynamic-icon-container.warning {
  background: rgba(255, 159, 67, 0.12);
  color: #FF9F43;
}

.dynamic-icon-container.danger {
  background: rgba(234, 84, 85, 0.12);
  color: #EA5455;
}

.dynamic-icon-container.info {
  background: rgba(0, 207, 232, 0.12);
  color: #00CFE8;
}

/* Content */
.dynamic-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dynamic-title {
  font-size: 14px;
  font-weight: 500;
  color: #6E6B7B;
  margin: 0;
}

.dynamic-value {
  font-size: 36px;
  font-weight: 700;
  color: #5E5873;
  margin: 0;
  line-height: 1;
  transition: color 0.3s ease;
}

.dynamic-value.animating {
  color: #6E63E8;
}

.dynamic-previous {
  font-size: 12px;
  font-weight: 400;
  color: #B9B9C3;
  margin: 4px 0 0 0;
}

.dynamic-change {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
  margin-top: 8px;
}

.dynamic-change.positive {
  color: #28C76F;
}

.dynamic-change.negative {
  color: #EA5455;
}

.dynamic-change i {
  font-size: 14px;
}

/* Loading Skeleton */
.dynamic-skeleton {
  background: white;
  border: 1px solid #EBE9F1;
  border-radius: 8px;
  padding: 24px;
  min-height: 180px;
  display: flex;
  gap: 16px;
}

.skeleton-icon-dynamic {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-content-dynamic {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-title-dynamic {
  width: 140px;
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-value-dynamic {
  width: 100px;
  height: 36px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-previous-dynamic {
  width: 80px;
  height: 12px;
  border-radius: 4px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
`;

// Função de animação CountUp
const countUpAnimation = (element, start, end, duration, format) => {
  const startTime = performance.now();
  const difference = end - start;
  
  const formatValue = (val) => {
    if (format === 'percentage') {
      return val.toFixed(1) + '%';
    } else if (format === 'currency') {
      return 'R$ ' + val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      return Math.round(val).toLocaleString('pt-BR');
    }
  };
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function: ease-out
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = start + (difference * easeOut);
    
    element.textContent = formatValue(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.classList.remove('animating');
    }
  };
  
  element.classList.add('animating');
  requestAnimationFrame(animate);
};

// Story: Default
export const Default = {
  args: {
    title: 'Alunos Ativos',
    value: 156,
    previousValue: 138,
    format: 'number',
    color: 'primary',
    icon: 'bi-people',
    animationDuration: 2000,
    loading: false
  },
  render: (args) => {
    if (args.loading) {
      return `
        <style>${componentStyles}</style>
        <div class="dynamic-skeleton">
          <div class="skeleton-icon-dynamic"></div>
          <div class="skeleton-content-dynamic">
            <div class="skeleton-title-dynamic"></div>
            <div class="skeleton-value-dynamic"></div>
            <div class="skeleton-previous-dynamic"></div>
          </div>
        </div>
      `;
    }

    const change = args.value - args.previousValue;
    const changePercent = ((change / args.previousValue) * 100).toFixed(1);
    const changeClass = change >= 0 ? 'positive' : 'negative';
    const changeIcon = change >= 0 ? 'bi-arrow-up' : 'bi-arrow-down';
    
    setTimeout(() => {
      const valueElement = document.querySelector('.dynamic-value');
      if (valueElement) {
        countUpAnimation(valueElement, args.previousValue, args.value, args.animationDuration, args.format);
      }
    }, 100);

    return `
      <style>${componentStyles}</style>
      <div class="dynamic-media-card" role="article" aria-live="polite" aria-label="${args.title}: ${args.value}">
        <div class="dynamic-icon-container ${args.color}">
          <i class="${args.icon}"></i>
        </div>
        <div class="dynamic-content">
          <p class="dynamic-title">${args.title}</p>
          <h2 class="dynamic-value">${args.value}</h2>
          <p class="dynamic-previous">Anterior: ${args.previousValue}</p>
          <span class="dynamic-change ${changeClass}">
            <i class="${changeIcon}"></i>
            ${change >= 0 ? '+' : ''}${change} (${changePercent >= 0 ? '+' : ''}${changePercent}%)
          </span>
        </div>
      </div>
    `;
  }
};


