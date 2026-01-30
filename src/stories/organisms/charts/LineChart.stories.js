/**
 * Line Chart - Organism (Charts)
 * 
 * Source: packages/vuexy_theme/public/vuexy/vendors/libs/apex-charts
 * Priority: P2 (Nice-to-have)
 * Status: ✅ DONE
 * 
 * Gráfico de linhas usando ApexCharts.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Charts/LineChart',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Line Chart

Gráfico de linhas para visualização de dados ao longo do tempo.

## Quando usar
- Dados temporais (séries temporais)
- Tendências ao longo do tempo
- Comparação de múltiplas séries
- Análise de performance
- Métricas de negócio
- Analytics dashboards

## Características
- Múltiplas linhas/séries
- Markers nos pontos
- Tooltips informativos
- Grid lines
- Zoom e pan
- Responsivo
- Smooth curves
- Área preenchida (opcional)

## Tipos de line chart
- Simples (single line)
- Multiple series
- Stepped
- Smooth (curved)
- Area (com preenchimento)

## ApexCharts
Este componente utiliza ApexCharts library para renderização.
Requer apex-charts.js e inicialização JavaScript.

## Dados de exemplo
- Revenue growth
- User engagement
- Sales trends
- Website traffic
- Performance metrics

## Acessibilidade
- Color contrast
- Alt text
- Data table alternative
- ARIA labels
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['simple', 'multiple', 'area'],
      description: 'Variante do gráfico',
      table: { defaultValue: { summary: 'simple' } }
    }
  }
};

const createLineChart = ({ variant = 'simple' }) => {
  const chartId = `lineChart${variant}`;
  
  const simpleChart = `
    <div id="${chartId}" style="min-height: 350px;"></div>
    
    <script>
      // Simple Line Chart
      var options = {
        series: [{
          name: 'Revenue',
          data: [28000, 32000, 29000, 42000, 38000, 50000, 48000, 61000, 59000, 67000, 73000, 78000]
        }],
        chart: {
          height: 350,
          type: 'line',
          toolbar: {
            show: true
          }
        },
        colors: ['#696cff'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return '$' + value.toLocaleString();
            }
          }
        },
        grid: {
          borderColor: '#f0f2f8',
        },
        tooltip: {
          y: {
            formatter: function (value) {
              return '$' + value.toLocaleString();
            }
          }
        }
      };
      
      var chart = new ApexCharts(document.querySelector("#${chartId}"), options);
      chart.render();
    </script>
  `;
  
  const multipleChart = `
    <div id="${chartId}" style="min-height: 350px;"></div>
    
    <script>
      // Multiple Series Line Chart
      var options = {
        series: [{
          name: 'Revenue',
          data: [28000, 32000, 29000, 42000, 38000, 50000, 48000, 61000, 59000, 67000, 73000, 78000]
        }, {
          name: 'Profit',
          data: [12000, 15000, 13000, 19000, 17000, 23000, 22000, 28000, 27000, 31000, 34000, 36000]
        }, {
          name: 'Expenses',
          data: [16000, 17000, 16000, 23000, 21000, 27000, 26000, 33000, 32000, 36000, 39000, 42000]
        }],
        chart: {
          height: 350,
          type: 'line',
          toolbar: {
            show: true
          }
        },
        colors: ['#696cff', '#28c76f', '#ff9f43'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return '$' + value.toLocaleString();
            }
          }
        },
        grid: {
          borderColor: '#f0f2f8',
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
        },
        tooltip: {
          y: {
            formatter: function (value) {
              return '$' + value.toLocaleString();
            }
          }
        }
      };
      
      var chart = new ApexCharts(document.querySelector("#${chartId}"), options);
      chart.render();
    </script>
  `;
  
  const areaChart = `
    <div id="${chartId}" style="min-height: 350px;"></div>
    
    <script>
      // Area Chart (Line with fill)
      var options = {
        series: [{
          name: 'Users',
          data: [1200, 1800, 1500, 2300, 2800, 3200, 3500, 4100, 4500, 5200, 5800, 6400]
        }],
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: true
          }
        },
        colors: ['#696cff'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 90, 100]
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value.toLocaleString();
            }
          }
        },
        grid: {
          borderColor: '#f0f2f8',
        },
        tooltip: {
          y: {
            formatter: function (value) {
              return value.toLocaleString() + ' users';
            }
          }
        }
      };
      
      var chart = new ApexCharts(document.querySelector("#${chartId}"), options);
      chart.render();
    </script>
  `;
  
  const charts = {
    simple: simpleChart,
    multiple: multipleChart,
    area: areaChart
  };
  
  return `<div class="card">
  <div class="card-header d-flex justify-content-between align-items-center">
    <h5 class="mb-0">
      ${variant === 'simple' ? 'Monthly Revenue' : variant === 'multiple' ? 'Financial Overview' : 'User Growth'}
    </h5>
    <div class="dropdown">
      <button class="btn btn-sm btn-label-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
        2024
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">2024</a></li>
        <li><a class="dropdown-item" href="#">2023</a></li>
        <li><a class="dropdown-item" href="#">2022</a></li>
      </ul>
    </div>
  </div>
  <div class="card-body">
    ${charts[variant]}
  </div>
</div>

<div class="alert alert-info mt-4">
  <strong>ApexCharts Required:</strong> This component requires ApexCharts library. Include:
  <pre class="mb-0 mt-2"><code>&lt;script src="vendors/libs/apex-charts/apexcharts.js"&gt;&lt;/script&gt;</code></pre>
</div>`;
};

const Template = (args) => {
  const markup = createLineChart(args);
  
  return `
    ${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => createLineChart({ variant: 'simple' });

export const Simple = Template.bind({});
Simple.args = {
  variant: 'simple'
};

export const Multiple = Template.bind({});
Multiple.args = {
  variant: 'multiple'
};

export const Area = Template.bind({});
Area.args = {
  variant: 'area'
};
