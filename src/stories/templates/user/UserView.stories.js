/**
 * User View - Template (User)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/page-user-view.css
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Template de visualização detalhada de usuário (admin view).
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Templates/User/UserView',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# User View Template

Template de visualização detalhada de usuário para administradores.

## Características
- Visão administrativa completa
- Informações pessoais detalhadas
- Estatísticas do usuário
- Histórico de atividades
- Ações administrativas
- Timeline de eventos
- Plano/assinatura

## Elementos incluídos
- User card com avatar
- Info pessoal completa
- Stats cards (posts, followers, etc)
- Plan/subscription info
- Activity timeline
- Edit/delete actions
- Security settings
- Billing info

## Diferença do Profile
- Profile: visualização pública/própria
- UserView: visualização administrativa
- Mais detalhes técnicos
- Ações de moderação

## Ações administrativas
- Edit user
- Suspend/activate
- Delete user
- Reset password
- View billing
- Change plan
        `
      }
    },
    layout: 'fullscreen'
  },
  argTypes: {
    userStatus: {
      control: 'select',
      options: ['active', 'inactive', 'suspended'],
      description: 'Status do usuário',
      table: { defaultValue: { summary: 'active' } }
    }
  }
};

const createUserViewPage = ({ userStatus = 'active' }) => {
  const statusBadge = {
    active: '<span class="badge bg-success">Active</span>',
    inactive: '<span class="badge bg-secondary">Inactive</span>',
    suspended: '<span class="badge bg-danger">Suspended</span>'
  };
  
  return `<div class="content-wrapper">
  <div class="container-xxl flex-grow-1 container-p-y">
    
    <!-- User Header -->
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-body">
            <div class="d-flex align-items-start align-items-sm-center gap-4">
              <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/1.png" 
                   alt="user-avatar" 
                   class="d-block rounded" 
                   height="100" 
                   width="100">
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h4 class="mb-1">John Doe</h4>
                    <div class="mb-2">
                      ${statusBadge[userStatus]}
                      <span class="badge bg-label-primary ms-2">Customer</span>
                    </div>
                    <div class="d-flex gap-3 text-muted">
                      <span><i class="bx bx-calendar-alt me-1"></i> Joined Jan 2024</span>
                      <span><i class="bx bx-map me-1"></i> San Francisco, CA</span>
                    </div>
                  </div>
                  <div class="d-flex gap-2">
                    <button class="btn btn-primary">
                      <i class="bx bx-edit me-1"></i> Edit
                    </button>
                    <button class="btn btn-label-danger">
                      <i class="bx bx-trash me-1"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- User Details -->
    <div class="row">
      <!-- Left Column -->
      <div class="col-xl-4 col-lg-5 col-md-5">
        <!-- User Details Card -->
        <div class="card mb-4">
          <div class="card-header">
            <h5 class="mb-0">User Details</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <span class="fw-semibold me-1">Username:</span>
              <span>johndoe</span>
            </div>
            <div class="mb-3">
              <span class="fw-semibold me-1">Email:</span>
              <span>john.doe@example.com</span>
            </div>
            <div class="mb-3">
              <span class="fw-semibold me-1">Status:</span>
              ${statusBadge[userStatus]}
            </div>
            <div class="mb-3">
              <span class="fw-semibold me-1">Role:</span>
              <span>Customer</span>
            </div>
            <div class="mb-3">
              <span class="fw-semibold me-1">Tax ID:</span>
              <span>Tax-8965</span>
            </div>
            <div class="mb-3">
              <span class="fw-semibold me-1">Contact:</span>
              <span>+1 (234) 567-8900</span>
            </div>
            <div class="mb-3">
              <span class="fw-semibold me-1">Language:</span>
              <span>English</span>
            </div>
            <div class="mb-3">
              <span class="fw-semibold me-1">Country:</span>
              <span>United States</span>
            </div>
            <div>
              <span class="fw-semibold me-1">2FA:</span>
              <span class="badge bg-label-success">Enabled</span>
            </div>
          </div>
        </div>
        
        <!-- Plan Card -->
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between">
            <h5 class="mb-0">Plan Details</h5>
            <button class="btn btn-sm btn-primary">Upgrade Plan</button>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h6 class="mb-0">Standard</h6>
                <span class="text-muted">$49/month</span>
              </div>
              <span class="badge bg-label-primary">Active</span>
            </div>
            
            <div class="mb-3">
              <span class="fw-semibold d-block mb-1">Next billing date:</span>
              <span class="text-muted">Feb 15, 2024</span>
            </div>
            
            <div class="d-flex justify-content-between border-bottom pb-2 mb-2">
              <span>Storage</span>
              <span class="fw-semibold">50 GB / 100 GB</span>
            </div>
            
            <div class="d-flex justify-content-between border-bottom pb-2 mb-2">
              <span>API Calls</span>
              <span class="fw-semibold">8.5k / 10k</span>
            </div>
            
            <div class="d-flex justify-content-between">
              <span>Team Members</span>
              <span class="fw-semibold">5 / 10</span>
            </div>
            
            <button class="btn btn-outline-danger w-100 mt-3">Cancel Subscription</button>
          </div>
        </div>
      </div>
      
      <!-- Right Column -->
      <div class="col-xl-8 col-lg-7 col-md-7">
        <!-- Stats Cards -->
        <div class="row g-3 mb-4">
          <div class="col-sm-6 col-xl-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="avatar flex-shrink-0 me-3">
                    <div class="avatar-initial bg-label-primary rounded">
                      <i class="bx bx-dollar"></i>
                    </div>
                  </div>
                  <div>
                    <small class="text-muted d-block">Total Spent</small>
                    <h5 class="mb-0">$2,456</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-sm-6 col-xl-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="avatar flex-shrink-0 me-3">
                    <div class="avatar-initial bg-label-success rounded">
                      <i class="bx bx-shopping-bag"></i>
                    </div>
                  </div>
                  <div>
                    <small class="text-muted d-block">Orders</small>
                    <h5 class="mb-0">42</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-sm-6 col-xl-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="avatar flex-shrink-0 me-3">
                    <div class="avatar-initial bg-label-warning rounded">
                      <i class="bx bx-file"></i>
                    </div>
                  </div>
                  <div>
                    <small class="text-muted d-block">Projects</small>
                    <h5 class="mb-0">12</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-sm-6 col-xl-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex align-items-center">
                  <div class="avatar flex-shrink-0 me-3">
                    <div class="avatar-initial bg-label-info rounded">
                      <i class="bx bx-star"></i>
                    </div>
                  </div>
                  <div>
                    <small class="text-muted d-block">Reviews</small>
                    <h5 class="mb-0">28</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Activity Timeline -->
        <div class="card mb-4">
          <div class="card-header d-flex justify-content-between">
            <h5 class="mb-0">Activity Timeline</h5>
            <button class="btn btn-sm btn-label-secondary">View All</button>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-timeline list-group-timeline-primary">
              <li class="list-group-item list-group-timeline-primary">
                <div class="d-flex align-items-start">
                  <div class="timeline-icon bg-label-primary">
                    <i class="bx bx-check"></i>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <h6 class="mb-0">Completed purchase</h6>
                      <small class="text-muted">2 hours ago</small>
                    </div>
                    <p class="text-muted mb-0">Purchased Standard plan subscription</p>
                  </div>
                </div>
              </li>
              
              <li class="list-group-item list-group-timeline-primary">
                <div class="d-flex align-items-start">
                  <div class="timeline-icon bg-label-success">
                    <i class="bx bx-user-check"></i>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <h6 class="mb-0">Profile updated</h6>
                      <small class="text-muted">5 hours ago</small>
                    </div>
                    <p class="text-muted mb-0">Updated profile picture and bio</p>
                  </div>
                </div>
              </li>
              
              <li class="list-group-item list-group-timeline-primary">
                <div class="d-flex align-items-start">
                  <div class="timeline-icon bg-label-info">
                    <i class="bx bx-envelope"></i>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <h6 class="mb-0">Email verified</h6>
                      <small class="text-muted">1 day ago</small>
                    </div>
                    <p class="text-muted mb-0">Confirmed email address</p>
                  </div>
                </div>
              </li>
              
              <li class="list-group-item list-group-timeline-primary">
                <div class="d-flex align-items-start">
                  <div class="timeline-icon bg-label-warning">
                    <i class="bx bx-user-plus"></i>
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                      <h6 class="mb-0">Account created</h6>
                      <small class="text-muted">Jan 15, 2024</small>
                    </div>
                    <p class="text-muted mb-0">Registered new account</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Invoice Table -->
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <h5 class="mb-0">Invoice List</h5>
            <button class="btn btn-sm btn-label-secondary">View All</button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><a href="#">#5089</a></td>
                    <td>Jan 15, 2024</td>
                    <td>$49.00</td>
                    <td><span class="badge bg-success">Paid</span></td>
                    <td>
                      <button class="btn btn-sm btn-icon btn-label-primary">
                        <i class="bx bx-download"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><a href="#">#5088</a></td>
                    <td>Dec 15, 2023</td>
                    <td>$49.00</td>
                    <td><span class="badge bg-success">Paid</span></td>
                    <td>
                      <button class="btn btn-sm btn-icon btn-label-primary">
                        <i class="bx bx-download"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td><a href="#">#5087</a></td>
                    <td>Nov 15, 2023</td>
                    <td>$49.00</td>
                    <td><span class="badge bg-success">Paid</span></td>
                    <td>
                      <button class="btn btn-sm btn-icon btn-label-primary">
                        <i class="bx bx-download"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.content-wrapper {
  background-color: #f5f5f9;
  min-height: 100vh;
}

.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.375rem;
  height: 2.375rem;
  border-radius: 50%;
}

.avatar-initial {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.bg-label-primary {
  background-color: rgba(105, 108, 255, 0.12) !important;
  color: #696cff !important;
}

.bg-label-success {
  background-color: rgba(40, 199, 111, 0.12) !important;
  color: #28c76f !important;
}

.bg-label-warning {
  background-color: rgba(255, 159, 67, 0.12) !important;
  color: #ff9f43 !important;
}

.bg-label-info {
  background-color: rgba(0, 207, 232, 0.12) !important;
  color: #00cfe8 !important;
}

.bg-label-danger {
  background-color: rgba(234, 84, 85, 0.12) !important;
  color: #ea5455 !important;
}

.timeline-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.125rem;
}
</style>`;
};

const Template = (args) => {
  const markup = createUserViewPage(args);
  
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

export const Overview = () => createUserViewPage({ userStatus: 'active' });

export const ActiveUser = Template.bind({});
ActiveUser.args = {
  userStatus: 'active'
};

export const InactiveUser = Template.bind({});
InactiveUser.args = {
  userStatus: 'inactive'
};

export const SuspendedUser = Template.bind({});
SuspendedUser.args = {
  userStatus: 'suspended'
};

export const Interactive = () => {
  return `
    <div class="content-wrapper p-4">
      <!-- User Header Card -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="d-flex gap-3 mb-3">
            <button class="btn btn-sm btn-primary" onclick="
              const tabs = document.querySelectorAll('.user-tab');
              tabs.forEach(t => t.classList.remove('active'));
              this.classList.add('active');
              document.querySelector('.tab-overview').style.display = 'block';
              document.querySelector('.tab-activity').style.display = 'none';
              document.querySelector('.tab-security').style.display = 'none';
            " class="user-tab active">📊 Overview</button>
            <button class="btn btn-sm btn-outline-secondary" onclick="
              const tabs = document.querySelectorAll('.user-tab');
              tabs.forEach(t => t.classList.remove('active'));
              this.classList.add('active');
              document.querySelector('.tab-overview').style.display = 'none';
              document.querySelector('.tab-activity').style.display = 'block';
              document.querySelector('.tab-security').style.display = 'none';
            " class="user-tab">📝 Activity</button>
            <button class="btn btn-sm btn-outline-secondary" onclick="
              const tabs = document.querySelectorAll('.user-tab');
              tabs.forEach(t => t.classList.remove('active'));
              this.classList.add('active');
              document.querySelector('.tab-overview').style.display = 'none';
              document.querySelector('.tab-activity').style.display = 'none';
              document.querySelector('.tab-security').style.display = 'block';
            " class="user-tab">🔒 Security</button>
            <button class="btn btn-sm btn-success ms-auto" onclick="
              const isEdit = this.textContent.includes('Cancel');
              this.textContent = isEdit ? '✏️ Edit User' : '❌ Cancel';
              this.className = isEdit ? 'btn btn-sm btn-success ms-auto' : 'btn btn-sm btn-danger ms-auto';
              const inputs = document.querySelectorAll('.editable-input');
              inputs.forEach(i => {
                i.disabled = isEdit;
                i.style.background = isEdit ? 'transparent' : '#fff3cd';
              });
            ">✏️ Edit User</button>
          </div>
          
          <div class="d-flex align-items-center gap-3">
            <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/1.png" 
                 class="rounded" width="100" height="100" alt="avatar">
            <div class="flex-grow-1">
              <h4 class="mb-1">John Doe</h4>
              <span class="badge bg-success">Active</span>
              <span class="badge bg-label-primary ms-2">Customer</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tab: Overview -->
      <div class="tab-overview">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mb-3">User Information</h5>
                <div class="row g-3">
                  <div class="col-12">
                    <label class="form-label">Full Name</label>
                    <input type="text" class="form-control editable-input" value="John Doe" disabled>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control editable-input" value="john@example.com" disabled>
                  </div>
                  <div class="col-12">
                    <label class="form-label">Phone</label>
                    <input type="tel" class="form-control editable-input" value="+1 234 567 8900" disabled>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title mb-3">Statistics</h5>
                <div class="d-flex justify-content-between mb-2">
                  <span>Orders</span>
                  <strong>234</strong>
                </div>
                <div class="d-flex justify-content-between mb-2">
                  <span>Revenue</span>
                  <strong>$12,450</strong>
                </div>
                <div class="d-flex justify-content-between">
                  <span>Last Login</span>
                  <strong>2 hours ago</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Tab: Activity -->
      <div class="tab-activity" style="display: none;">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-3">Recent Activity</h5>
            <ul class="list-group">
              <li class="list-group-item">✅ Placed order #1234 - 2 hours ago</li>
              <li class="list-group-item">💬 Left a review - 5 hours ago</li>
              <li class="list-group-item">🛍️ Added items to cart - 1 day ago</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- Tab: Security -->
      <div class="tab-security" style="display: none;">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-3">Security Settings</h5>
            <button class="btn btn-warning mb-2 w-100">Reset Password</button>
            <button class="btn btn-danger w-100">Suspend Account</button>
          </div>
        </div>
      </div>
    </div>
  `;
};
