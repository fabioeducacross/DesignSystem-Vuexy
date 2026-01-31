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
    <div class="text-muted small">2024</div>
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

/**
 * ====================================
 * INTERACTIVE STORY - ApexCharts Real
 * ====================================
 */

export const Interactive = {
  parameters: {
    docs: {
      description: {
        story: `
### Charts com ApexCharts Real

Implementação oficial usando ApexCharts do Vuexy:

- ✅ **Line Chart** - tendências ao longo do tempo
- ✅ **Bar Chart** - comparação de categorias
- ✅ **Pie Chart** - distribuição percentual
- ✅ **Donut Chart** - composição com centro vazio
- ✅ **Area Chart** - volume ao longo do tempo
- ✅ **Mixed Chart** - combinação de tipos
- ✅ **Responsive** - adapta ao tamanho da tela
- ✅ **Interactive** - hover para detalhes
- ✅ **Animations** - transições suaves
- ✅ **Toolbar** - zoom, pan, download

**Casos de uso:**
- Dashboards executivos
- Analytics/métricas
- Relatórios de vendas
- Performance tracking
- KPIs visualizados

### Como testar:
1. Passe o mouse sobre os gráficos
2. Use toolbar (zoom, pan, download)
3. Clique nas legendas para ocultar séries
        `
      }
    }
  },
  loaders: [
    async () => {
      if (typeof window !== 'undefined') {
        // Load ApexCharts
        if (!window.ApexCharts) {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '/vuexy/vendors/libs/apex-charts/apexcharts.js';
            script.onload = () => {
              console.log('✅ ApexCharts JS carregado');
              resolve({ apexChartsLoaded: true });
            };
            script.onerror = () => reject(new Error('Failed to load ApexCharts'));
            document.head.appendChild(script);
          });
        }
        return { apexChartsLoaded: true };
      }
      return {};
    }
  ],
  render: () => {
    // Initialize ApexCharts after render
    setTimeout(() => {
      if (window.ApexCharts) {
        // 1. Line Chart - Sales Trend
        const lineChart = new ApexCharts(document.querySelector("#chart-line"), {
          series: [{
            name: 'Vendas 2025',
            data: [28000, 32000, 29000, 42000, 38000, 50000, 48000, 61000, 59000, 67000, 73000, 78000]
          }, {
            name: 'Vendas 2024',
            data: [24000, 28000, 26000, 35000, 33000, 42000, 40000, 51000, 48000, 55000, 60000, 65000]
          }],
          chart: {
            height: 300,
            type: 'line',
            toolbar: { show: true },
            zoom: { enabled: true }
          },
          colors: ['#696cff', '#8592a3'],
          dataLabels: { enabled: false },
          stroke: {
            curve: 'smooth',
            width: 3
          },
          xaxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
          },
          yaxis: {
            labels: {
              formatter: function(val) {
                return 'R$ ' + (val / 1000) + 'k';
              }
            }
          },
          tooltip: {
            y: {
              formatter: function(val) {
                return 'R$ ' + val.toLocaleString('pt-BR');
              }
            }
          }
        });
        lineChart.render();
        
        // 2. Bar Chart - Monthly Revenue
        const barChart = new ApexCharts(document.querySelector("#chart-bar"), {
          series: [{
            name: 'Receita',
            data: [44, 55, 41, 67, 22, 43, 21, 49, 65, 72, 68, 84]
          }],
          chart: {
            height: 300,
            type: 'bar',
            toolbar: { show: false }
          },
          colors: ['#71dd37'],
          plotOptions: {
            bar: {
              borderRadius: 8,
              dataLabels: { position: 'top' }
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function(val) {
              return val + "k";
            },
            offsetY: -20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },
          xaxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
          },
          yaxis: {
            labels: {
              formatter: function(val) {
                return val + "k";
              }
            }
          }
        });
        barChart.render();
        
        // 3. Pie Chart - Product Distribution
        const pieChart = new ApexCharts(document.querySelector("#chart-pie"), {
          series: [44, 55, 41, 17, 15],
          chart: {
            height: 300,
            type: 'pie'
          },
          labels: ['Eletrônicos', 'Roupas', 'Alimentos', 'Livros', 'Outros'],
          colors: ['#696cff', '#71dd37', '#ffab00', '#ff3e1d', '#8592a3'],
          legend: {
            position: 'bottom'
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        });
        pieChart.render();
        
        // 4. Donut Chart - User Status
        const donutChart = new ApexCharts(document.querySelector("#chart-donut"), {
          series: [1234, 567, 89],
          chart: {
            height: 300,
            type: 'donut'
          },
          labels: ['Ativos', 'Inativos', 'Bloqueados'],
          colors: ['#71dd37', '#ffab00', '#ff3e1d'],
          plotOptions: {
            pie: {
              donut: {
                size: '65%',
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: '22px'
                  },
                  value: {
                    show: true,
                    fontSize: '16px',
                    formatter: function(val) {
                      return parseInt(val).toLocaleString('pt-BR');
                    }
                  },
                  total: {
                    show: true,
                    label: 'Total',
                    formatter: function(w) {
                      return w.globals.seriesTotals.reduce((a, b) => a + b, 0).toLocaleString('pt-BR');
                    }
                  }
                }
              }
            }
          },
          legend: {
            position: 'bottom'
          }
        });
        donutChart.render();
        
        // 5. Area Chart - Traffic Volume
        const areaChart = new ApexCharts(document.querySelector("#chart-area"), {
          series: [{
            name: 'Visitantes',
            data: [31, 40, 28, 51, 42, 109, 100]
          }, {
            name: 'Pageviews',
            data: [11, 32, 45, 32, 34, 52, 41]
          }],
          chart: {
            height: 300,
            type: 'area',
            toolbar: { show: false }
          },
          colors: ['#696cff', '#71dd37'],
          dataLabels: { enabled: false },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            categories: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy'
            }
          },
          fill: {
            type: 'gradient',
            gradient: {
              opacityFrom: 0.6,
              opacityTo: 0.1
            }
          }
        });
        areaChart.render();
        
        // 6. Mixed Chart - Sales & Revenue
        const mixedChart = new ApexCharts(document.querySelector("#chart-mixed"), {
          series: [{
            name: 'Vendas',
            type: 'column',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 35]
          }, {
            name: 'Receita',
            type: 'line',
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51]
          }],
          chart: {
            height: 300,
            type: 'line',
            toolbar: { show: false }
          },
          colors: ['#71dd37', '#696cff'],
          stroke: {
            width: [0, 3]
          },
          dataLabels: {
            enabled: true,
            enabledOnSeries: [1]
          },
          xaxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
          },
          yaxis: [{
            title: {
              text: 'Vendas (unidades)'
            }
          }, {
            opposite: true,
            title: {
              text: 'Receita (R$ mil)'
            }
          }]
        });
        mixedChart.render();
        
        console.log('✅ ApexCharts: 6 gráficos renderizados');
      }
    }, 100);

    return `
      <div style="padding: 30px;">
        <h5 class="mb-4">
          <i class="ti ti-chart-line me-2 text-primary"></i>
          Charts Interativos com ApexCharts
        </h5>
        
        <div class="row g-4">
          <!-- 1. Line Chart -->
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">
                  <i class="ti ti-trending-up me-2 text-primary"></i>
                  Line Chart - Tendência de Vendas
                </h6>
              </div>
              <div class="card-body">
                <div id="chart-line"></div>
                <p class="text-muted small mt-2 mb-0">Comparação anual - 2024 vs 2025</p>
              </div>
            </div>
          </div>

          <!-- 2. Bar Chart -->
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">
                  <i class="ti ti-chart-bar me-2 text-success"></i>
                  Bar Chart - Receita Mensal
                </h6>
              </div>
              <div class="card-body">
                <div id="chart-bar"></div>
                <p class="text-muted small mt-2 mb-0">Receita em milhares (k) por mês</p>
              </div>
            </div>
          </div>

          <!-- 3. Pie Chart -->
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">
                  <i class="ti ti-chart-pie me-2 text-warning"></i>
                  Pie Chart - Distribuição de Produtos
                </h6>
              </div>
              <div class="card-body">
                <div id="chart-pie"></div>
                <p class="text-muted small mt-2 mb-0">Participação por categoria</p>
              </div>
            </div>
          </div>

          <!-- 4. Donut Chart -->
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">
                  <i class="ti ti-chart-donut me-2 text-danger"></i>
                  Donut Chart - Status de Usuários
                </h6>
              </div>
              <div class="card-body">
                <div id="chart-donut"></div>
                <p class="text-muted small mt-2 mb-0">Total de usuários por status</p>
              </div>
            </div>
          </div>

          <!-- 5. Area Chart -->
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">
                  <i class="ti ti-chart-area-line me-2 text-info"></i>
                  Area Chart - Volume de Tráfego
                </h6>
              </div>
              <div class="card-body">
                <div id="chart-area"></div>
                <p class="text-muted small mt-2 mb-0">Visitantes vs Pageviews por dia</p>
              </div>
            </div>
          </div>

          <!-- 6. Mixed Chart -->
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">
                  <i class="ti ti-chart-dots me-2 text-purple"></i>
                  Mixed Chart - Vendas & Receita
                </h6>
              </div>
              <div class="card-body">
                <div id="chart-mixed"></div>
                <p class="text-muted small mt-2 mb-0">Combinação de colunas e linha</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Features -->
        <div class="row g-3 mt-2">
          <div class="col-md-4">
            <div class="card border-primary">
              <div class="card-body">
                <h6 class="text-primary mb-2">
                  <i class="ti ti-cursor-text me-1"></i>
                  Interatividade
                </h6>
                <ul class="list-unstyled small mb-0">
                  <li>• Hover para tooltip com detalhes</li>
                  <li>• Click na legenda para ocultar série</li>
                  <li>• Toolbar com zoom/pan/download</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border-success">
              <div class="card-body">
                <h6 class="text-success mb-2">
                  <i class="ti ti-device-mobile me-1"></i>
                  Responsive
                </h6>
                <ul class="list-unstyled small mb-0">
                  <li>• Adapta ao tamanho da tela</li>
                  <li>• Touch-friendly em mobile</li>
                  <li>• Legenda repositionada</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card border-info">
              <div class="card-body">
                <h6 class="text-info mb-2">
                  <i class="ti ti-sparkles me-1"></i>
                  Animações
                </h6>
                <ul class="list-unstyled small mb-0">
                  <li>• Transições suaves ao renderizar</li>
                  <li>• Animações ao atualizar dados</li>
                  <li>• Efeitos ao hover</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="alert alert-info mt-4">
          <strong>💡 Teste a interatividade:</strong>
          <ul class="mb-0 mt-2">
            <li><strong>Tooltip:</strong> Passe o mouse sobre qualquer ponto/barra/fatia para ver detalhes</li>
            <li><strong>Legenda:</strong> Clique nos itens da legenda para ocultar/exibir série</li>
            <li><strong>Zoom (Line):</strong> Use toolbar ou arraste uma área no gráfico</li>
            <li><strong>Download:</strong> Menu hamburguer na toolbar → Download SVG/PNG/CSV</li>
            <li><strong>Line Chart:</strong> 2 séries comparativas (2024 vs 2025)</li>
            <li><strong>Bar Chart:</strong> Data labels no topo das barras</li>
            <li><strong>Pie Chart:</strong> Clique numa fatia para destacá-la</li>
            <li><strong>Donut Chart:</strong> Centro mostra total e atualiza ao hover</li>
            <li><strong>Area Chart:</strong> Gradiente preenchido sob as linhas</li>
            <li><strong>Mixed Chart:</strong> Combina colunas (vendas) + linha (receita), 2 eixos Y</li>
            <li><strong>Cores:</strong> Palette consistente do Vuexy (#696cff, #71dd37, #ffab00, etc)</li>
          </ul>
        </div>
      </div>
    `;
  }
};
