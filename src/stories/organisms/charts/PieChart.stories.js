/**
 * Pie Chart - Organism (Charts)
 * 
 * Source: packages/vuexy_theme/public/vuexy/vendors/libs/apex-charts
 * Priority: P2 (Nice-to-have)
 * Status: ✅ DONE
 * 
 * Gráfico de pizza usando ApexCharts.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Organisms/Charts/PieChart',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Pie Chart

Gráfico de pizza para visualização de proporções e percentuais.

## Quando usar
- Mostrar proporções de um todo
- Distribuição percentual
- Market share
- Budget allocation
- Category distribution
- Composição de valores

## Características
- Fatias coloridas
- Labels com valores
- Legend
- Hover effects
- Donut variant
- Percentuais automáticos
- Responsivo

## Variantes
- Pie (pizza completa)
- Donut (com buraco central)
- Semi-donut

## Boas práticas
- Use até 6-7 categorias
- Cores contrastantes
- Labels claros
- Totais visíveis

## ApexCharts
Este componente utiliza ApexCharts library.
Requer apex-charts.js e inicialização JavaScript.

## Casos de uso
- Traffic sources
- Device usage
- Budget distribution
- Market segments
- Survey responses

## Acessibilidade
- Color contrast
- Alt text with percentages
- Data table alternative
- ARIA labels
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['pie', 'donut', 'semi-donut'],
      description: 'Variante do gráfico',
      table: { defaultValue: { summary: 'pie' } }
    }
  }
};

const createPieChart = ({ variant = 'pie' }) => {
  const chartId = `pieChart${variant}`;
  
  const pieChart = `
    <div id="${chartId}" style="min-height: 350px;"></div>
    
    <script>
      // Pie Chart
      var options = {
        series: [44, 25, 18, 13],
        chart: {
          type: 'pie',
          height: 350
        },
        labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
        colors: ['#696cff', '#28c76f', '#ff9f43', '#ea5455'],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center'
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toFixed(1) + '%';
          }
        },
        tooltip: {
          y: {
            formatter: function (value) {
              return value + '%';
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              height: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
      
      var chart = new ApexCharts(document.querySelector("#${chartId}"), options);
      chart.render();
    </script>
  `;
  
  const donutChart = `
    <div id="${chartId}" style="min-height: 350px;"></div>
    
    <script>
      // Donut Chart
      var options = {
        series: [35, 28, 22, 15],
        chart: {
          type: 'donut',
          height: 350
        },
        labels: ['Direct', 'Organic Search', 'Social Media', 'Referral'],
        colors: ['#696cff', '#28c76f', '#00cfe8', '#ff9f43'],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center'
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toFixed(1) + '%';
          }
        },
        plotOptions: {
          pie: {
            donut: {
              size: '65%',
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '18px',
                  fontWeight: 600,
                  offsetY: -10
                },
                value: {
                  show: true,
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#566a7f',
                  offsetY: 10,
                  formatter: function (val) {
                    return val + '%';
                  }
                },
                total: {
                  show: true,
                  label: 'Total Traffic',
                  fontSize: '14px',
                  color: '#a5acb8',
                  formatter: function (w) {
                    return '100%';
                  }
                }
              }
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (value) {
              return value + '%';
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              height: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
      
      var chart = new ApexCharts(document.querySelector("#${chartId}"), options);
      chart.render();
    </script>
  `;
  
  const semiDonutChart = `
    <div id="${chartId}" style="min-height: 300px;"></div>
    
    <script>
      // Semi-Donut Chart
      var options = {
        series: [65, 25, 10],
        chart: {
          type: 'donut',
          height: 300
        },
        labels: ['Completed', 'In Progress', 'Not Started'],
        colors: ['#28c76f', '#ff9f43', '#ea5455'],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center'
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val.toFixed(1) + '%';
          }
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 10,
            donut: {
              size: '75%',
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: '16px',
                  fontWeight: 600,
                  offsetY: -10
                },
                value: {
                  show: true,
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#566a7f',
                  offsetY: 0,
                  formatter: function (val) {
                    return val + '%';
                  }
                },
                total: {
                  show: true,
                  label: 'Overall',
                  fontSize: '14px',
                  color: '#a5acb8',
                  formatter: function (w) {
                    return '65%';
                  }
                }
              }
            }
          }
        },
        grid: {
          padding: {
            bottom: -80
          }
        },
        tooltip: {
          y: {
            formatter: function (value) {
              return value + '%';
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              height: 250
            }
          }
        }]
      };
      
      var chart = new ApexCharts(document.querySelector("#${chartId}"), options);
      chart.render();
    </script>
  `;
  
  const charts = {
    pie: pieChart,
    donut: donutChart,
    'semi-donut': semiDonutChart
  };
  
  return `<div class="card">
  <div class="card-header d-flex justify-content-between align-items-center">
    <h5 class="mb-0">
      ${variant === 'pie' ? 'Device Usage' : variant === 'donut' ? 'Traffic Sources' : 'Project Progress'}
    </h5>
    <div class="dropdown">
      <button class="btn btn-sm btn-label-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
        Last 30 Days
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Last 30 Days</a></li>
        <li><a class="dropdown-item" href="#">Last 90 Days</a></li>
        <li><a class="dropdown-item" href="#">Last Year</a></li>
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
  const markup = createPieChart(args);
  
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

export const Overview = () => createPieChart({ variant: 'pie' });

export const Pie = Template.bind({});
Pie.args = {
  variant: 'pie'
};

export const Donut = Template.bind({});
Donut.args = {
  variant: 'donut'
};

export const SemiDonut = Template.bind({});
SemiDonut.args = {
  variant: 'semi-donut'
};

// Interactive Story (ApexCharts real)
export const Interactive = {
  render: () => {
    return `
      <div class="p-4">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Interactive Donut Chart</h5>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-sm btn-outline-primary active" onclick="updatePieData('devices')">Devices</button>
              <button type="button" class="btn btn-sm btn-outline-primary" onclick="updatePieData('traffic')">Traffic</button>
              <button type="button" class="btn btn-sm btn-outline-primary" onclick="updatePieData('sales')">Sales</button>
            </div>
          </div>
          <div class="card-body">
            <div id="interactivePieChart" style="min-height: 350px;"></div>
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
          console.log('✅ ApexCharts loaded for PieChart Interactive');
          resolve();
        };
        script.onerror = () => {
          console.error('❌ Failed to load ApexCharts');
          reject();
        };
        document.head.appendChild(script);
      });
    }

    // Chart datasets
    const datasets = {
      devices: {
        labels: ['Desktop', 'Mobile', 'Tablet', 'Other'],
        series: [44, 25, 18, 13],
        title: 'Device Distribution'
      },
      traffic: {
        labels: ['Organic', 'Direct', 'Referral', 'Social', 'Email'],
        series: [35, 28, 20, 12, 5],
        title: 'Traffic Sources'
      },
      sales: {
        labels: ['Product A', 'Product B', 'Product C', 'Product D'],
        series: [40, 30, 20, 10],
        title: 'Sales by Product'
      }
    };

    // Chart options
    const options = {
      series: datasets.devices.series,
      chart: {
        type: 'donut',
        height: 350
      },
      labels: datasets.devices.labels,
      colors: ['#696cff', '#28c76f', '#ff9f43', '#ea5455', '#00cfe8'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center'
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1) + '%';
        }
      },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '18px',
                fontWeight: 600,
                offsetY: -10
              },
              value: {
                show: true,
                fontSize: '32px',
                fontWeight: 700,
                color: '#566a7f',
                offsetY: 10,
                formatter: function (val) {
                  return val + '%';
                }
              },
              total: {
                show: true,
                label: datasets.devices.title,
                fontSize: '14px',
                color: '#a5acb8',
                formatter: function (w) {
                  return '100%';
                }
              }
            }
          }
        }
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return value + '%';
          }
        }
      }
    };

    // Create chart
    const chartElement = canvasElement.querySelector('#interactivePieChart');
    if (chartElement) {
      const chart = new window.ApexCharts(chartElement, options);
      chart.render();

      // Update function
      window.updatePieData = function(datasetName) {
        const data = datasets[datasetName];
        chart.updateOptions({
          labels: data.labels,
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  total: {
                    label: data.title
                  }
                }
              }
            }
          }
        });
        chart.updateSeries(data.series);

        // Update button states
        const buttons = canvasElement.querySelectorAll('.btn-group button');
        buttons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = Array.from(buttons).find(btn => 
          btn.textContent.toLowerCase().includes(datasetName)
        );
        if (activeBtn) activeBtn.classList.add('active');
      };
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo interativo com ApexCharts real (Donut). Clique nos botões para alternar entre diferentes datasets.'
      }
    }
  }
};
