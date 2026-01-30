/**
 * Profile Page - Template (User)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/page-profile.css
 * Priority: P1 (Important)
 * Status: ✅ DONE
 * 
 * Template de página de perfil de usuário.
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Templates/User/Profile',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Profile Page Template

Template completo de página de perfil de usuário.

## Características
- Informações pessoais
- Avatar/foto de perfil
- Abas de conteúdo (About, Activity, Posts, etc)
- Cards de estatísticas
- Timeline de atividades
- Social links
- Edição de perfil

## Seções
- Header com cover photo
- Avatar e info básica
- Tabs de navegação
- About (bio, info pessoal)
- Activity (timeline)
- Connections (amigos/seguidores)
- Projects/Posts

## Elementos incluídos
- Cover photo
- Avatar upload
- Bio/description
- Contact info
- Social links
- Stats cards
- Activity timeline
- Connection grid

## Variações
- Public profile
- Own profile (com edição)
- Team member profile
- Company profile
        `
      }
    },
    layout: 'fullscreen'
  },
  argTypes: {
    viewMode: {
      control: 'select',
      options: ['view', 'edit'],
      description: 'Modo de visualização',
      table: { defaultValue: { summary: 'view' } }
    }
  }
};

const createProfilePage = ({ viewMode = 'view' }) => {
  return `<div class="content-wrapper">
  <!-- Profile Header -->
  <div class="card mb-4">
    <div class="position-relative">
      <!-- Cover Photo -->
      <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/pages/profile-banner.png" 
           class="card-img-top" 
           alt="user-cover" 
           style="height: 250px; object-fit: cover;">
      ${viewMode === 'edit' ? `
      <div class="position-absolute top-0 end-0 p-3">
        <button class="btn btn-sm btn-primary">
          <i class="bx bx-camera me-1"></i> Change Cover
        </button>
      </div>
      ` : ''}
    </div>
    
    <div class="card-body">
      <div class="d-flex align-items-start flex-column flex-md-row">
        <!-- Avatar -->
        <div class="position-relative mb-3 mb-md-0">
          <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/1.png" 
               alt="user-avatar" 
               class="rounded border border-4 border-white"
               style="width: 120px; height: 120px; margin-top: -60px;">
          ${viewMode === 'edit' ? `
          <button class="btn btn-sm btn-icon btn-primary rounded-circle position-absolute bottom-0 end-0">
            <i class="bx bx-camera"></i>
          </button>
          ` : ''}
        </div>
        
        <!-- User Info -->
        <div class="ms-md-4 flex-grow-1">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div>
              <h4 class="mb-1">John Doe</h4>
              <p class="text-muted mb-0">
                <i class="bx bx-briefcase me-1"></i> Senior Developer
              </p>
              <p class="text-muted">
                <i class="bx bx-map me-1"></i> San Francisco, CA
              </p>
            </div>
            ${viewMode === 'view' ? `
            <div>
              <button class="btn btn-primary me-2">
                <i class="bx bx-user-plus me-1"></i> Follow
              </button>
              <button class="btn btn-outline-secondary">
                <i class="bx bx-envelope me-1"></i> Message
              </button>
            </div>
            ` : `
            <div>
              <button class="btn btn-primary">
                <i class="bx bx-save me-1"></i> Save Changes
              </button>
            </div>
            `}
          </div>
          
          <!-- Stats -->
          <div class="d-flex gap-4 mt-3">
            <div>
              <h5 class="mb-0">1.2k</h5>
              <small class="text-muted">Posts</small>
            </div>
            <div>
              <h5 class="mb-0">8.9k</h5>
              <small class="text-muted">Followers</small>
            </div>
            <div>
              <h5 class="mb-0">526</h5>
              <small class="text-muted">Following</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Profile Content -->
  <div class="row">
    <div class="col-lg-4">
      <!-- About Card -->
      <div class="card mb-4">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">About</h5>
          ${viewMode === 'edit' ? '<i class="bx bx-edit cursor-pointer"></i>' : ''}
        </div>
        <div class="card-body">
          <p class="mb-4">
            Passionate software engineer with 5+ years of experience in full-stack development.
          </p>
          
          <div class="mb-3">
            <h6 class="mb-2">
              <i class="bx bx-user me-2"></i> Full Name
            </h6>
            <p class="text-muted">John Doe</p>
          </div>
          
          <div class="mb-3">
            <h6 class="mb-2">
              <i class="bx bx-envelope me-2"></i> Email
            </h6>
            <p class="text-muted">john.doe@example.com</p>
          </div>
          
          <div class="mb-3">
            <h6 class="mb-2">
              <i class="bx bx-phone me-2"></i> Phone
            </h6>
            <p class="text-muted">+1 (234) 567-8900</p>
          </div>
          
          <div class="mb-3">
            <h6 class="mb-2">
              <i class="bx bx-globe me-2"></i> Website
            </h6>
            <p class="text-muted">www.johndoe.com</p>
          </div>
          
          <div>
            <h6 class="mb-2">Social Links</h6>
            <div class="d-flex gap-2">
              <a href="#" class="btn btn-icon btn-label-facebook">
                <i class="bx bxl-facebook"></i>
              </a>
              <a href="#" class="btn btn-icon btn-label-twitter">
                <i class="bx bxl-twitter"></i>
              </a>
              <a href="#" class="btn btn-icon btn-label-linkedin">
                <i class="bx bxl-linkedin"></i>
              </a>
              <a href="#" class="btn btn-icon btn-label-github">
                <i class="bx bxl-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Skills Card -->
      <div class="card mb-4">
        <div class="card-header">
          <h5 class="mb-0">Skills</h5>
        </div>
        <div class="card-body">
          <div class="mb-2">
            <div class="d-flex justify-content-between mb-1">
              <span>JavaScript</span>
              <span class="text-muted">90%</span>
            </div>
            <div class="progress" style="height: 6px;">
              <div class="progress-bar bg-primary" style="width: 90%"></div>
            </div>
          </div>
          
          <div class="mb-2">
            <div class="d-flex justify-content-between mb-1">
              <span>React</span>
              <span class="text-muted">85%</span>
            </div>
            <div class="progress" style="height: 6px;">
              <div class="progress-bar bg-success" style="width: 85%"></div>
            </div>
          </div>
          
          <div class="mb-2">
            <div class="d-flex justify-content-between mb-1">
              <span>Node.js</span>
              <span class="text-muted">75%</span>
            </div>
            <div class="progress" style="height: 6px;">
              <div class="progress-bar bg-info" style="width: 75%"></div>
            </div>
          </div>
          
          <div class="mb-2">
            <div class="d-flex justify-content-between mb-1">
              <span>UI/UX Design</span>
              <span class="text-muted">70%</span>
            </div>
            <div class="progress" style="height: 6px;">
              <div class="progress-bar bg-warning" style="width: 70%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-lg-8">
      <!-- Tabs -->
      <ul class="nav nav-pills mb-3" role="tablist">
        <li class="nav-item">
          <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#activity">
            <i class="bx bx-rss me-1"></i> Activity
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#posts">
            <i class="bx bx-file me-1"></i> Posts
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" data-bs-toggle="tab" data-bs-target="#connections">
            <i class="bx bx-user me-1"></i> Connections
          </button>
        </li>
      </ul>
      
      <!-- Tab Content -->
      <div class="tab-content">
        <!-- Activity Tab -->
        <div class="tab-pane fade show active" id="activity">
          <div class="card">
            <div class="card-body">
              <ul class="list-group list-group-timeline list-group-timeline-primary">
                <li class="list-group-item list-group-timeline-primary">
                  <div class="d-flex align-items-start">
                    <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/1.png" 
                         alt="avatar" 
                         class="rounded-circle me-3"
                         style="width: 40px; height: 40px;">
                    <div class="flex-grow-1">
                      <h6 class="mb-1">Updated profile picture</h6>
                      <p class="text-muted small mb-0">2 hours ago</p>
                    </div>
                  </div>
                </li>
                
                <li class="list-group-item list-group-timeline-primary">
                  <div class="d-flex align-items-start">
                    <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/1.png" 
                         alt="avatar" 
                         class="rounded-circle me-3"
                         style="width: 40px; height: 40px;">
                    <div class="flex-grow-1">
                      <h6 class="mb-1">Published a new post</h6>
                      <p class="text-muted small">5 hours ago</p>
                      <div class="card bg-light">
                        <div class="card-body">
                          <p class="mb-0">Just finished an amazing project using React and TypeScript! 🚀</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                
                <li class="list-group-item list-group-timeline-primary">
                  <div class="d-flex align-items-start">
                    <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/1.png" 
                         alt="avatar" 
                         class="rounded-circle me-3"
                         style="width: 40px; height: 40px;">
                    <div class="flex-grow-1">
                      <h6 class="mb-1">Joined 3 new groups</h6>
                      <p class="text-muted small mb-0">1 day ago</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Posts Tab -->
        <div class="tab-pane fade" id="posts">
          <div class="card mb-3">
            <div class="card-body">
              <h6 class="mb-2">Getting Started with React Hooks</h6>
              <p class="text-muted small mb-2">Posted 2 days ago</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
              <div class="d-flex gap-3">
                <span class="text-muted small"><i class="bx bx-heart"></i> 245 likes</span>
                <span class="text-muted small"><i class="bx bx-comment"></i> 32 comments</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Connections Tab -->
        <div class="tab-pane fade" id="connections">
          <div class="card">
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="d-flex align-items-center">
                    <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/2.png" 
                         alt="avatar" 
                         class="rounded-circle me-3"
                         style="width: 50px; height: 50px;">
                    <div class="flex-grow-1">
                      <h6 class="mb-0">Jane Smith</h6>
                      <p class="text-muted small mb-0">Designer</p>
                    </div>
                    <button class="btn btn-sm btn-primary">Follow</button>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="d-flex align-items-center">
                    <img src="https://demos.themeselection.com/materio-vuetify-vuejs-admin-template/demo-1/img/avatars/3.png" 
                         alt="avatar" 
                         class="rounded-circle me-3"
                         style="width: 50px; height: 50px;">
                    <div class="flex-grow-1">
                      <h6 class="mb-0">Bob Johnson</h6>
                      <p class="text-muted small mb-0">Developer</p>
                    </div>
                    <button class="btn btn-sm btn-outline-secondary">Following</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.content-wrapper {
  padding: 1.5rem;
  background-color: #f5f5f9;
  min-height: 100vh;
}

.btn-label-facebook { color: #3b5998; background-color: rgba(59, 89, 152, 0.1); }
.btn-label-twitter { color: #1da1f2; background-color: rgba(29, 161, 242, 0.1); }
.btn-label-linkedin { color: #0077b5; background-color: rgba(0, 119, 181, 0.1); }
.btn-label-github { color: #333; background-color: rgba(51, 51, 51, 0.1); }
</style>`;
};

const Template = (args) => {
  const markup = createProfilePage(args);
  
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

export const Overview = () => createProfilePage({ viewMode: 'view' });

export const ViewMode = Template.bind({});
ViewMode.args = {
  viewMode: 'view'
};

export const EditMode = Template.bind({});
EditMode.args = {
  viewMode: 'edit'
};
