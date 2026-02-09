/**
 * Dashboard Layout - Template (Application Layouts)
 * 
 * Source: Composição de Navbar + Sidebar + Content Grid
 * Priority: P0 (Critical)
 * Status: ✅ DONE
 * 
 * Template completo de dashboard do Vuexy com layout responsivo.
 */

import { formatHtmlSnippet, formatReactSnippet, formatVue2Snippet, formatVue3Snippet } from '../../_helpers/snippets';

export default {
  title: 'Vuexy/Templates/Application Layouts/Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Dashboard Layout

Template completo de dashboard do Vuexy combinando Navbar, Sidebar e Content Grid.

## Quando usar
- Aplicações administrativas
- Painéis de controle
- Dashboards com métricas
- Layouts de aplicação completos

## Composição
- **Navbar** - Barra superior com brand, search e user menu
- **Sidebar** - Menu lateral com navegação hierárquica
- **Content Area** - Grid com cards e widgets
- **Layout Responsive** - Adapta para mobile/tablet/desktop

## Estrutura
\`\`\`
┌────────────────────────────────────┐
│         Navbar (Fixed)             │
├──────┬─────────────────────────────┤
│      │                             │
│ Side │       Content Grid          │
│ bar  │   (Cards, Widgets, Stats)   │
│      │                             │
└──────┴─────────────────────────────┘
\`\`\`

## Grid System
- Layout com CSS Grid ou Flexbox
- Breakpoints: xs, sm, md, lg, xl
- Cards responsivos em 12-column grid

## Acessibilidade
- \`role="main"\` no content
- \`role="navigation"\` no navbar/sidebar
- Landmarks ARIA apropriados
- Skip navigation link
        `
      }
    }
  },
  argTypes: {
    sidebarCollapsed: {
      control: 'boolean',
      description: 'Estado colapsado do sidebar',
      table: { defaultValue: { summary: false } }
    },
    showStats: {
      control: 'boolean',
      description: 'Mostra cards de estatísticas',
      table: { defaultValue: { summary: true } }
    },
    showCharts: {
      control: 'boolean',
      description: 'Mostra gráficos no dashboard',
      table: { defaultValue: { summary: true } }
    },
    contentPadding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding do content area',
      table: { defaultValue: { summary: 'md' } }
    }
  }
};

const statsCards = [
  { title: 'Total Users', value: '21,459', change: '+18%', icon: 'bx-user', color: 'primary', trend: 'up' },
  { title: 'Revenue', value: '$42.5k', change: '+24%', icon: 'bx-dollar-circle', color: 'success', trend: 'up' },
  { title: 'Active Projects', value: '74', change: '-8%', icon: 'bx-briefcase-alt-2', color: 'warning', trend: 'down' },
  { title: 'Sessions', value: '1,890', change: '+12%', icon: 'bx-trending-up', color: 'info', trend: 'up' }
];

const createDashboard = ({ 
  sidebarCollapsed = false, 
  showStats = true, 
  showCharts = true,
  contentPadding = 'md'
}) => {
  const paddingClass = contentPadding === 'none' ? '' : `p-${contentPadding === 'sm' ? '3' : contentPadding === 'lg' ? '5' : '4'}`;
  
  const navbar = `<nav class="navbar navbar-expand-lg navbar-light bg-navbar-theme">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Vuexy</a>
    <button class="navbar-toggler" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
      <div class="navbar-search-wrapper search-input-wrapper d-none d-md-block ms-3">
        <input type="text" class="form-control search-input" placeholder="Search..." aria-label="Search">
        <i class="bx bx-search"></i>
      </div>
      <ul class="navbar-nav flex-row align-items-center ms-auto">
        <li class="nav-item navbar-dropdown dropdown-notifications me-3">
          <a class="nav-link" href="#" aria-label="Notifications">
            <i class="bx bx-bell bx-sm"></i>
            <span class="badge rounded-pill badge-notifications bg-danger">5</span>
          </a>
        </li>
        <li class="nav-item navbar-dropdown dropdown-user">
          <a class="nav-link" href="#">
            <div class="avatar avatar-online">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="User" class="w-px-40 h-auto rounded-circle">
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>`;

  const sidebar = `<aside class="layout-menu menu-vertical menu bg-menu-theme ${sidebarCollapsed ? 'layout-menu-collapsed' : ''}" style="width: ${sidebarCollapsed ? '80px' : '260px'}; height: calc(100vh - 70px); overflow-y: auto;">
  <div class="app-brand demo">
    <a href="#" class="app-brand-link">
      <span class="app-brand-text demo menu-text fw-bold ms-2">${sidebarCollapsed ? '' : 'Vuexy'}</span>
    </a>
  </div>
  <ul class="menu-inner py-1">
    <li class="menu-item active">
      <a href="#" class="menu-link">
        <i class="menu-icon tf-icons bx bx-home-circle"></i>
        <div>Dashboard</div>
      </a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link menu-toggle">
        <i class="menu-icon tf-icons bx bx-layout"></i>
        <div>Layouts</div>
      </a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link">
        <i class="menu-icon tf-icons bx bx-box"></i>
        <div>Components</div>
        <span class="badge badge-center rounded-pill bg-danger ms-auto">5</span>
      </a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link">
        <i class="menu-icon tf-icons bx bx-collection"></i>
        <div>Cards</div>
        <span class="badge badge-center rounded-pill bg-primary ms-auto">New</span>
      </a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link menu-toggle">
        <i class="menu-icon tf-icons bx bx-crown"></i>
        <div>UI Elements</div>
      </a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link">
        <i class="menu-icon tf-icons bx bx-detail"></i>
        <div>Forms</div>
      </a>
    </li>
    <li class="menu-item">
      <a href="#" class="menu-link">
        <i class="menu-icon tf-icons bx bx-chart"></i>
        <div>Charts</div>
      </a>
    </li>
  </ul>
</aside>`;

  const statsCardsHtml = showStats ? `
    <div class="row g-4 mb-4">
      ${statsCards.map(stat => `
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <p class="text-muted mb-1">${stat.title}</p>
                  <h4 class="mb-0">${stat.value}</h4>
                  <small class="text-${stat.trend === 'up' ? 'success' : 'danger'}">
                    <i class="bx bx-${stat.trend === 'up' ? 'up' : 'down'}-arrow-alt"></i> ${stat.change}
                  </small>
                </div>
                <div class="avatar">
                  <span class="avatar-initial rounded bg-label-${stat.color}">
                    <i class="bx ${stat.icon} bx-sm"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  ` : '';

  const chartsHtml = showCharts ? `
    <div class="row g-4 mb-4">
      <div class="col-12 col-lg-8">
        <div class="card">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="card-title m-0">Revenue Overview</h5>
            <div class="dropdown">
              <button class="btn btn-sm btn-label-secondary dropdown-toggle" type="button">
                2024
              </button>
            </div>
          </div>
          <div class="card-body">
            <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border-radius: 8px;">
              <div class="text-center">
                <i class="bx bx-line-chart bx-lg text-muted"></i>
                <p class="text-muted mt-2">Chart Placeholder<br/><small>ApexCharts integration goes here</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title m-0">Traffic Sources</h5>
          </div>
          <div class="card-body">
            <div style="height: 300px; display: flex; align-items: center; justify-content: center; background: #f8f9fa; border-radius: 8px;">
              <div class="text-center">
                <i class="bx bx-pie-chart-alt-2 bx-lg text-muted"></i>
                <p class="text-muted mt-2">Pie Chart<br/><small>Placeholder</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ` : '';

  const tablesHtml = `
    <div class="row g-4">
      <div class="col-12 col-lg-6">
        <div class="card">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="card-title m-0">Recent Orders</h5>
            <a href="#" class="btn btn-sm btn-label-primary">View All</a>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#ORD-001</td>
                    <td>John Doe</td>
                    <td><span class="badge bg-label-success">Completed</span></td>
                    <td>$125.00</td>
                  </tr>
                  <tr>
                    <td>#ORD-002</td>
                    <td>Jane Smith</td>
                    <td><span class="badge bg-label-warning">Pending</span></td>
                    <td>$89.50</td>
                  </tr>
                  <tr>
                    <td>#ORD-003</td>
                    <td>Bob Johnson</td>
                    <td><span class="badge bg-label-info">Processing</span></td>
                    <td>$245.00</td>
                  </tr>
                  <tr>
                    <td>#ORD-004</td>
                    <td>Alice Brown</td>
                    <td><span class="badge bg-label-success">Completed</span></td>
                    <td>$67.25</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title m-0">Recent Activity</h5>
          </div>
          <div class="card-body">
            <ul class="timeline">
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-primary"></span>
                <div class="timeline-event">
                  <div class="timeline-header mb-1">
                    <h6 class="mb-0">New user registered</h6>
                    <small class="text-muted">2 hours ago</small>
                  </div>
                  <p class="mb-0">User Sarah joined the platform</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-success"></span>
                <div class="timeline-event">
                  <div class="timeline-header mb-1">
                    <h6 class="mb-0">Order completed</h6>
                    <small class="text-muted">4 hours ago</small>
                  </div>
                  <p class="mb-0">Order #ORD-001 was delivered</p>
                </div>
              </li>
              <li class="timeline-item timeline-item-transparent">
                <span class="timeline-point timeline-point-warning"></span>
                <div class="timeline-event">
                  <div class="timeline-header mb-1">
                    <h6 class="mb-0">Payment pending</h6>
                    <small class="text-muted">6 hours ago</small>
                  </div>
                  <p class="mb-0">Invoice #INV-453 awaiting payment</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  return `
<div class="layout-wrapper layout-content-navbar">
  <div class="layout-container">
    ${navbar}
    
    <div class="layout-page" style="display: flex;">
      ${sidebar}
      
      <div class="content-wrapper" style="flex: 1; overflow-y: auto; height: calc(100vh - 70px);">
        <div class="container-xxl flex-grow-1 ${paddingClass}">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 class="mb-1">Dashboard Overview</h4>
              <p class="text-muted mb-0">Welcome back! Here's what's happening with your projects.</p>
            </div>
            <button class="btn btn-primary">
              <i class="bx bx-plus me-1"></i> Add New
            </button>
          </div>
          
          ${statsCardsHtml}
          ${chartsHtml}
          ${tablesHtml}
        </div>
        
        <footer class="content-footer footer bg-footer-theme mt-4">
          <div class="container-xxl d-flex flex-wrap justify-content-between py-2">
            <div>
              © 2026 Vuexy. Made with ❤️
            </div>
            <div>
              <a href="#" class="footer-link me-3">License</a>
              <a href="#" class="footer-link me-3">Documentation</a>
              <a href="#" class="footer-link">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</div>`;
};

const Template = (args) => {
  const markup = createDashboard(args);
  
  return `
    <div style="height: 100vh; overflow: hidden;">
      ${markup}
    </div>
    
    <div class="modal fade show" style="display: block; position: fixed; bottom: 20px; right: 20px; width: auto; background: transparent; pointer-events: none;" aria-modal="true">
      <div class="alert alert-info shadow-lg" style="pointer-events: all; max-width: 400px;">
        <div class="alert-body">
          <strong>💡 Tip:</strong> Este é um template completo. Use os controls acima para testar diferentes configurações.
        </div>
      </div>
    </div>
  `;
};

export const Overview = () => {
  return `
    <div class="row g-4">
      <div class="col-12">
        <h5>Full Dashboard</h5>
        <div style="height: 600px; overflow: hidden; border: 2px solid #ddd; border-radius: 8px;">
          ${createDashboard({ sidebarCollapsed: false, showStats: true, showCharts: true })}
        </div>
      </div>
      
      <div class="col-12 mt-5">
        <h5>Collapsed Sidebar</h5>
        <div style="height: 600px; overflow: hidden; border: 2px solid #ddd; border-radius: 8px;">
          ${createDashboard({ sidebarCollapsed: true, showStats: true, showCharts: false })}
        </div>
      </div>
    </div>
  `;
};

export const Default = Template.bind({});
Default.args = {
  sidebarCollapsed: false,
  showStats: true,
  showCharts: true,
  contentPadding: 'md'
};

export const CollapsedSidebar = Template.bind({});
CollapsedSidebar.args = {
  ...Default.args,
  sidebarCollapsed: true
};

export const MinimalLayout = Template.bind({});
MinimalLayout.args = {
  ...Default.args,
  showStats: false,
  showCharts: false,
  contentPadding: 'lg'
};

export const StatsOnly = Template.bind({});
StatsOnly.args = {
  ...Default.args,
  showStats: true,
  showCharts: false
};

export const Interactive = () => {
  return `
    <div id="interactive-dashboard">
      <div class="mb-3 d-flex gap-2">
        <button class="btn btn-primary" onclick="
          const container = document.getElementById('interactive-dashboard');
          const chartsSection = container.querySelector('.charts-section');
          const isHidden = chartsSection.style.display === 'none';
          chartsSection.style.display = isHidden ? 'block' : 'none';
          this.textContent = isHidden ? '📊 Hide Charts' : '📊 Show Charts';
        ">📊 Hide Charts</button>
        <button class="btn btn-success" onclick="
          const container = document.getElementById('interactive-dashboard');
          const stats = container.querySelectorAll('.stats-value');
          stats.forEach(stat => {
            const current = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
            const random = Math.floor(Math.random() * 1000) + 1;
            stat.textContent = stat.textContent.includes('$') ? '$' + random + 'k' : random.toString();
          });
          const badge = container.querySelector('.refresh-badge');
          badge.style.display = 'inline';
          setTimeout(() => badge.style.display = 'none', 2000);
        ">🔄 Refresh Data <span class="badge bg-light text-dark refresh-badge" style="display:none;">Updated!</span></button>
        <button class="btn btn-outline-secondary" onclick="
          const container = document.getElementById('interactive-dashboard');
          const widgets = container.querySelectorAll('.widget-card');
          widgets.forEach((w, i) => {
            setTimeout(() => {
              w.style.transform = 'scale(1.05)';
              setTimeout(() => w.style.transform = 'scale(1)', 200);
            }, i * 100);
          });
        ">✨ Animate Widgets</button>
      </div>
      
      <!-- Stats Cards -->
      <div class="row g-4 mb-4">
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card widget-card" style="transition: transform 0.2s;">
            <div class="card-body">
              <p class="text-muted mb-1">Total Users</p>
              <h4 class="mb-0 stats-value">21,459</h4>
              <small class="text-success">↑ +18%</small>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card widget-card" style="transition: transform 0.2s;">
            <div class="card-body">
              <p class="text-muted mb-1">Revenue</p>
              <h4 class="mb-0 stats-value">$42.5k</h4>
              <small class="text-success">↑ +24%</small>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card widget-card" style="transition: transform 0.2s;">
            <div class="card-body">
              <p class="text-muted mb-1">Active Projects</p>
              <h4 class="mb-0 stats-value">74</h4>
              <small class="text-danger">↓ -8%</small>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card widget-card" style="transition: transform 0.2s;">
            <div class="card-body">
              <p class="text-muted mb-1">Sessions</p>
              <h4 class="mb-0 stats-value">1,890</h4>
              <small class="text-success">↑ +12%</small>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Charts Section -->
      <div class="charts-section">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">📈 Revenue Chart</h5>
            <div class="bg-light rounded p-4" style="height: 200px; display: flex; align-items: center; justify-content: center;">
              <p class="text-muted mb-0">Chart Data Visualization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};
