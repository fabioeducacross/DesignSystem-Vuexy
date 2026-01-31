/**
 * Bar Chart - Organism (Charts)
 * 
 * Source: packages/vuexy_theme/public/vuexy/vendors/libs/apex-charts
 * Priority: P2 (Nice-to-have)
 * Status: ✅ DONE
 * 
 * Gráfico de barras usando ApexCharts.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Charts/BarChart',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Bar Chart

Gráfico de barras para comparação de dados categóricos.

## Quando usar
- Comparação entre categorias
- Rankings
- Distribuições
- Dados categóricos
- Performance por grupo
- Sales by region/product

## Características
- Barras verticais ou horizontais
- Múltiplas séries
- Stacked bars
- Grouped bars
- Custom colors
- Tooltips
- Responsivo

## Tipos de bar chart
- Vertical (column)
- Horizontal
- Stacked (empilhado)
- Grouped (agrupado)
- Negative values

## ApexCharts
Este componente utiliza ApexCharts library.
Requer apex-charts.js e inicialização JavaScript.

## Casos de uso
- Sales by product
- Revenue by region
- User activity by day
- Performance comparison
- Survey results

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
      options: ['vertical', 'horizontal', 'stacked'],
      description: 'Variante do gráfico',
      table: { defaultValue: { summary: 'vertical' } }
    }
  }
};

const createBarChart = ({ variant = 'vertical' }) => {
  const chartId = `barChart${variant}`;
  
  const verticalChart = `
    <div id="${chartId}" style="min-height: 350px;"></div>
    
    <script>
      // Vertical Bar Chart
      var options = {
        series: [{
          name: 'Sales',
          data: [44000, 55000, 57000, 56000, 61000, 58000, 63000, 60000, 66000, 70000, 68000, 72000]
        }],
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 8,
            dataLabels: {
              position: 'top',
            },
          }
        },
        colors: ['#696cff'],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          position: 'bottom'
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return '$' + (value / 1000) + 'k';
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
  
  const horizontalChart = `
    <div id="${chartId}" style="min-height: 350px;"></div>
    
    <script>
      // Horizontal Bar Chart
      var options = {
        series: [{
          name: 'Revenue',
          data: [120000, 98000, 85000, 72000, 65000, 58000]
        }],
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 8,
            horizontal: true,
          }
        },
        colors: ['#28c76f'],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F'],
          labels: {
            formatter: function (value) {
              return '$' + (value / 1000) + 'k';
            }
          }
        },
        grid: {
          borderColor: '#f0f2f8',
        },
        tooltip: {
          x: {
            formatter: function (value) {
              return value;
            }
          },
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
  
  const stackedChart = `
    <div id="${chartId}" style="min-height: 350px;"></div>
    
    <script>
      // Stacked Bar Chart
      var options = {
        series: [{
          name: 'Online Sales',
          data: [35000, 41000, 36000, 42000, 39000, 48000, 45000, 52000, 49000, 56000, 58000, 62000]
        }, {
          name: 'Store Sales',
          data: [25000, 29000, 27000, 31000, 28000, 35000, 32000, 38000, 36000, 42000, 44000, 48000]
        }, {
          name: 'Wholesale',
          data: [15000, 18000, 16000, 19000, 17000, 21000, 20000, 24000, 22000, 26000, 28000, 30000]
        }],
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: true
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 8,
          }
        },
        colors: ['#696cff', '#28c76f', '#ff9f43'],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return '$' + (value / 1000) + 'k';
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left'
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
  
  const charts = {
    vertical: verticalChart,
    horizontal: horizontalChart,
    stacked: stackedChart
  };
  
  return `<div class="card">
  <div class="card-header d-flex justify-content-between align-items-center">
    <h5 class="mb-0">
      ${variant === 'vertical' ? 'Monthly Sales' : variant === 'horizontal' ? 'Revenue by Product' : 'Sales by Channel'}
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
  const markup = createBarChart(args);
  
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

export const Overview = () => createBarChart({ variant: 'vertical' });

export const Vertical = Template.bind({});
Vertical.args = {
  variant: 'vertical'
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  variant: 'horizontal'
};

export const Stacked = Template.bind({});
Stacked.args = {
  variant: 'stacked'
};

// Interactive Story (ApexCharts real)
export const Interactive = {
  render: () => {
    return `
      <div class="p-4">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Interactive Bar Chart</h5>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-sm btn-outline-primary active" onclick="updateChart('monthly')">Monthly</button>
              <button type="button" class="btn btn-sm btn-outline-primary" onclick="updateChart('quarterly')">Quarterly</button>
              <button type="button" class="btn btn-sm btn-outline-primary" onclick="updateChart('yearly')">Yearly</button>
            </div>
          </div>
          <div class="card-body">
            <div id="interactiveBarChart" style="min-height: 350px;"></div>
          </div>
        </div>
      </div>
    `;
  },
  play: async ({ canvasElement }) => {
    // Load ApexCharts dynamically
    if (typeof window.ApexCharts === 'undefined') {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = '/vuexy/vendors/libs/apex-charts/apexcharts.js';
        script.onload = () => {
          console.log('✅ ApexCharts loaded for BarChart Interactive');
          resolve();
        };
        script.onerror = () => {
          console.error('❌ Failed to load ApexCharts');
          reject();
        };
        document.head.appendChild(script);
      });
    }

    // Chart data
    const datasets = {
      monthly: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [44000, 55000, 57000, 56000, 61000, 58000, 63000, 60000, 66000, 70000, 68000, 72000]
      },
      quarterly: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [156000, 175000, 189000, 210000]
      },
      yearly: {
        categories: ['2020', '2021', '2022', '2023', '2024'],
        data: [520000, 680000, 730000, 750000, 820000]
      }
    };

    // Chart options
    const options = {
      series: [{
        name: 'Sales',
        data: datasets.monthly.data
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: true
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          dataLabels: {
            position: 'top',
          },
        }
      },
      colors: ['#696cff'],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: datasets.monthly.categories,
        position: 'bottom'
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return '$' + (value / 1000) + 'k';
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

    // Create chart
    const chartElement = canvasElement.querySelector('#interactiveBarChart');
    if (chartElement) {
      const chart = new window.ApexCharts(chartElement, options);
      chart.render();

      // Update function
      window.updateChart = function(period) {
        const data = datasets[period];
        chart.updateOptions({
          xaxis: {
            categories: data.categories
          }
        });
        chart.updateSeries([{
          name: 'Sales',
          data: data.data
        }]);

        // Update button states
        const buttons = canvasElement.querySelectorAll('.btn-group button');
        buttons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = Array.from(buttons).find(btn => 
          btn.textContent.toLowerCase().includes(period.replace('ly', ''))
        );
        if (activeBtn) activeBtn.classList.add('active');
      };
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interativo com ApexCharts real. Clique nos botões para alternar entre visualizações mensal, trimestral e anual.'
      }
    }
  }
};
