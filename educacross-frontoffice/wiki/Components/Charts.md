# Componentes de Gráficos

Documentação dos componentes de gráficos baseados em ApexCharts para visualização de dados.

## 📋 Visão Geral

Os componentes de gráficos do projeto são baseados na biblioteca ApexCharts e oferecem visualizações modernas e interativas para dados educacionais. Todos os componentes seguem o design system do projeto e são otimizados para performance.

## 🚀 Componentes Disponíveis

### 1. DefaultChart

**Arquivo**: `src/components/chart/DefaultChart.vue`

Gráfico de rosquinha (donut) padrão para exibir dados de progresso dos estudantes.

```vue
<template>
  <DefaultChart
    :series="[15, 85, 30]"
    :labels="['iniciaram', 'finalizaram', 'não iniciaram']"
    :colors="['#28c76f66', '#28c76f', '#28c76f33']"
  />
</template>
```

**Props:**

- `series` (Array, obrigatório): Dados numéricos do gráfico
- `labels` (Array): Rótulos para cada série
- `colors` (Array): Cores customizadas para cada série

### 2. BarChart

**Arquivo**: `src/components/chart/BarChart.vue`

Gráfico de barras para comparações de dados.

```vue
<template>
  <BarChart
    :series="chartData"
    :categories="months"
    title="Progresso Mensal"
  />
</template>
```

### 3. PieChart

**Arquivo**: `src/components/chart/PieChart.vue`

Gráfico de pizza para representação de proporções.

```vue
<template>
  <PieChart
    :series="distributionData"
    :labels="subjects"
  />
</template>
```

### 4. RadialBar / RadialBarChart

**Arquivos**:

- `src/components/chart/RadialBar.vue`
- `src/components/chart/RadialBarChart.vue`

Gráficos radiais para indicadores de progresso ou performance.

```vue
<template>
  <RadialBarChart
    :series="[75]"
    :labels="['Progresso Geral']"
  />
</template>
```

## 💡 Exemplos Práticos

### Gráfico de Progresso de Estudantes

```vue
<template>
  <b-card title="Progresso da Turma">
    <DefaultChart :series="progressData" :labels="progressLabels" :colors="progressColors" />

    <div class="mt-3">
      <div
        v-for="(item, index) in progressSummary"
        :key="index"
        class="d-flex justify-content-between"
      >
        <span>{{ item.label }}:</span>
        <strong>{{ item.value }} estudantes</strong>
      </div>
    </div>
  </b-card>
</template>

<script>
  import DefaultChart from '@/components/chart/DefaultChart.vue'

  export default {
    components: {
      DefaultChart,
    },
    data() {
      return {
        progressData: [12, 35, 8], // [iniciaram, finalizaram, não iniciaram]
        progressLabels: ['Iniciaram', 'Finalizaram', 'Não Iniciaram'],
        progressColors: ['#ffc107', '#28c76f', '#ea5455'],
      }
    },
    computed: {
      progressSummary() {
        return this.progressLabels.map((label, index) => ({
          label,
          value: this.progressData[index],
        }))
      },
    },
  }
</script>
```

### Gráfico de Performance por Matéria

```vue
<template>
  <b-card title="Performance por Matéria">
    <BarChart :series="performanceData" :categories="subjects" height="300" />
  </b-card>
</template>

<script>
  import BarChart from '@/components/chart/BarChart.vue'

  export default {
    components: {
      BarChart,
    },
    data() {
      return {
        performanceData: [
          {
            name: 'Notas Médias',
            data: [8.5, 7.2, 9.1, 6.8, 8.9],
          },
        ],
        subjects: ['Matemática', 'Português', 'Ciências', 'História', 'Geografia'],
      }
    },
  }
</script>
```

### Dashboard com Múltiplos Gráficos

```vue
<template>
  <div>
    <b-row>
      <!-- Progresso Geral -->
      <b-col md="6">
        <b-card title="Progresso Geral" class="mb-3">
          <RadialBarChart :series="[overallProgress]" :labels="['Progresso']" />
          <div class="text-center mt-2">
            <h4>{{ overallProgress }}%</h4>
            <small class="text-muted">Conclusão média</small>
          </div>
        </b-card>
      </b-col>

      <!-- Distribuição por Status -->
      <b-col md="6">
        <b-card title="Status dos Estudantes" class="mb-3">
          <PieChart :series="statusData" :labels="statusLabels" />
        </b-card>
      </b-col>

      <!-- Evolução Mensal -->
      <b-col cols="12">
        <b-card title="Evolução Mensal">
          <BarChart :series="monthlyData" :categories="months" height="400" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import BarChart from '@/components/chart/BarChart.vue'
  import DefaultChart from '@/components/chart/DefaultChart.vue'
  import PieChart from '@/components/chart/PieChart.vue'
  import RadialBarChart from '@/components/chart/RadialBarChart.vue'

  export default {
    components: {
      DefaultChart,
      BarChart,
      PieChart,
      RadialBarChart,
    },
    data() {
      return {
        overallProgress: 78,
        statusData: [25, 15, 10],
        statusLabels: ['Ativo', 'Pausado', 'Inativo'],
        monthlyData: [
          {
            name: 'Atividades Concluídas',
            data: [44, 55, 41, 67, 22, 43, 21, 49],
          },
          {
            name: 'Novos Estudantes',
            data: [13, 23, 20, 8, 13, 27, 33, 12],
          },
        ],
        months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'],
      }
    },
  }
</script>
```

## 🎨 Customização e Temas

### Cores do Tema

Os gráficos automaticamente utilizam as cores do tema definidas em `themeConfig.js`:

```javascript
// Cores padrão disponíveis
const themeColors = {
  primary: '#7367f0',
  success: '#28c76f',
  warning: '#ff9f43',
  danger: '#ea5455',
  info: '#00cfe8',
  secondary: '#82868b',
}
```

### Customização de Cores

```vue
<template>
  <DefaultChart :series="data" :colors="customColors" />
</template>

<script>
  export default {
    data() {
      return {
        customColors: [
          '#FF6B6B', // Vermelho suave
          '#4ECDC4', // Verde água
          '#45B7D1', // Azul claro
          '#96CEB4', // Verde menta
          '#FFEAA7', // Amarelo claro
        ],
      }
    },
  }
</script>
```

## 📊 Tipos de Dados Suportados

### Dados para Gráficos de Pizza/Rosquinha

```javascript
// Formato simples (apenas valores)
series: [30, 40, 35]
labels: ['Categoria A', 'Categoria B', 'Categoria C']

// Dados típicos de progresso educacional
progressData: [
  12, // Estudantes que iniciaram
  35, // Estudantes que finalizaram
  8, // Estudantes que não iniciaram
]
```

### Dados para Gráficos de Barras

```javascript
// Formato de série com múltiplas categorias
series: [
  {
    name: 'Notas Bimestrais',
    data: [8.5, 7.2, 9.1, 6.8], // Valores para cada categoria
  },
]
categories: ['1º Bim', '2º Bim', '3º Bim', '4º Bim']

// Múltiplas séries
series: [
  {
    name: 'Turma A',
    data: [8.5, 7.2, 9.1, 6.8],
  },
  {
    name: 'Turma B',
    data: [7.8, 8.1, 8.5, 7.9],
  },
]
```

## 🔧 Configurações Avançadas

### Responsividade

Todos os gráficos são responsivos por padrão, mas você pode customizar:

```vue
<template>
  <DefaultChart :series="data" :chart-options="customOptions" />
</template>

<script>
  export default {
    data() {
      return {
        customOptions: {
          responsive: [
            {
              breakpoint: 768,
              options: {
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        },
      }
    },
  }
</script>
```

### Animações

```javascript
// Desabilitar animações para melhor performance
chartOptions: {
  chart: {
    animations: {
      enabled: false
    }
  }
}

// Customizar animações
chartOptions: {
  chart: {
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      }
    }
  }
}
```

## 📱 Responsividade

Os componentes de gráfico são totalmente responsivos:

- **Desktop**: Gráficos com tamanho completo e legendas laterais
- **Tablet**: Adaptação automática com legendas reposicionadas
- **Mobile**: Gráficos menores com legendas na parte inferior

## ⚡ Performance

### Otimizações Recomendadas

1. **Lazy Loading**: Carregue gráficos apenas quando necessário
2. **Debounce**: Use debounce para atualizações de dados em tempo real
3. **Limite de Dados**: Evite renderizar muitos pontos de dados simultaneamente
4. **Cache**: Implemente cache para dados que não mudam frequentemente

```vue
<template>
  <div>
    <!-- Carregamento condicional -->
    <DefaultChart v-if="shouldRenderChart" :series="chartData" />
    <b-skeleton v-else height="200px" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        shouldRenderChart: false,
      }
    },
    mounted() {
      // Carrega o gráfico após um delay
      setTimeout(() => {
        this.shouldRenderChart = true
      }, 100)
    },
  }
</script>
```

## ⚠️ Considerações Importantes

1. **Dependências**: Todos os gráficos dependem da biblioteca ApexCharts
2. **Performance**: Gráficos com muitos dados podem impactar a performance
3. **Cores**: Mantenha consistência com o design system do projeto
4. **Acessibilidade**: ApexCharts oferece suporte básico a acessibilidade
5. **Dados**: Sempre valide os dados antes de passar para os componentes

## 🔗 Recursos Adicionais

- [Documentação ApexCharts](https://apexcharts.com/docs/)
- [Exemplos de Configuração](https://apexcharts.com/javascript-chart-demos/)
- [Theme Config do Projeto](../themeConfig.js)
