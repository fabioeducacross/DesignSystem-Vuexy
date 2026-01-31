import{f as x}from"./snippets-m8t1HIl1.js";const C={title:"Templates/User/Profile",tags:["autodocs"],parameters:{docs:{description:{component:`
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
        `}},layout:"fullscreen"},argTypes:{viewMode:{control:"select",options:["view","edit"],description:"Modo de visualização",table:{defaultValue:{summary:"view"}}}}},f=({viewMode:t="view"})=>`<div class="content-wrapper">
  <!-- Profile Header -->
  <div class="card mb-4">
    <div class="position-relative">
      <!-- Cover Photo -->
      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='300'%3E%3Cdefs%3E%3ClinearGradient id='profGrad' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%238e92fd;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='300' fill='url(%23profGrad)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='32' fill='white' text-anchor='middle' dy='.35em'%3EProfile Banner%3C/text%3E%3C/svg%3E" 
           class="card-img-top" 
           alt="user-cover" 
           style="height: 250px; object-fit: cover;">
      ${t==="edit"?`
      <div class="position-absolute top-0 end-0 p-3">
        <button class="btn btn-sm btn-primary">
          <i class="bx bx-camera me-1"></i> Change Cover
        </button>
      </div>
      `:""}
    </div>
    
    <div class="card-body">
      <div class="d-flex align-items-start flex-column flex-md-row">
        <!-- Avatar -->
        <div class="position-relative mb-3 mb-md-0">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" 
               alt="user-avatar" 
               class="rounded border border-4 border-white"
               style="width: 120px; height: 120px; margin-top: -60px;">
          ${t==="edit"?`
          <button class="btn btn-sm btn-icon btn-primary rounded-circle position-absolute bottom-0 end-0">
            <i class="bx bx-camera"></i>
          </button>
          `:""}
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
            ${t==="view"?`
            <div>
              <button class="btn btn-primary me-2">
                <i class="bx bx-user-plus me-1"></i> Follow
              </button>
              <button class="btn btn-outline-secondary">
                <i class="bx bx-envelope me-1"></i> Message
              </button>
            </div>
            `:`
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
          ${t==="edit"?'<i class="bx bx-edit cursor-pointer"></i>':""}
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
          <button class="nav-link active" onclick="
            document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('show', 'active'));
            document.getElementById('activity').classList.add('show', 'active');
          ">
            <i class="bx bx-rss me-1"></i> Activity
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" onclick="
            document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('show', 'active'));
            document.getElementById('posts').classList.add('show', 'active');
          ">
            <i class="bx bx-file me-1"></i> Posts
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" onclick="
            document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            document.querySelectorAll('.tab-pane').forEach(el => el.classList.remove('show', 'active'));
            document.getElementById('connections').classList.add('show', 'active');
          ">
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
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" 
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
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" 
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
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" 
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
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" 
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
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ffb400'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EMB%3C/text%3E%3C/svg%3E" 
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
</style>`,y=t=>{const l=f(t);return`
    ${l}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${x(l).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},i=()=>f({viewMode:"view"}),e=y.bind({});e.args={viewMode:"view"};const s=y.bind({});s.args={viewMode:"edit"};const a=()=>`
    <div id="interactive-profile">
      <div class="mb-3 d-flex gap-2">
        <button class="btn btn-primary" onclick="
          const container = document.getElementById('interactive-profile');
          const editBtn = container.querySelector('.edit-toggle');
          const isEdit = editBtn.textContent.includes('Cancel');
          editBtn.textContent = isEdit ? '✏️ Edit Profile' : '❌ Cancel Edit';
          editBtn.className = isEdit ? 'btn btn-primary edit-toggle' : 'btn btn-danger edit-toggle';
          const inputs = container.querySelectorAll('.editable-field');
          inputs.forEach(input => {
            input.disabled = isEdit;
            input.style.background = isEdit ? 'transparent' : '#fff3cd';
          });
        ">✏️ Edit Profile</button>
        <button class="btn btn-outline-secondary tab-about" onclick="
          const tabs = document.querySelectorAll('.profile-tab');
          tabs.forEach(t => t.classList.remove('active'));
          document.querySelector('.tab-about').classList.add('active');
          document.querySelector('.tab-content-about').style.display = 'block';
          document.querySelector('.tab-content-activity').style.display = 'none';
        ">📝 About</button>
        <button class="btn btn-outline-secondary tab-activity profile-tab" onclick="
          const tabs = document.querySelectorAll('.profile-tab');
          tabs.forEach(t => t.classList.remove('active'));
          document.querySelector('.tab-activity').classList.add('active');
          document.querySelector('.tab-content-about').style.display = 'none';
          document.querySelector('.tab-content-activity').style.display = 'block';
        ">📊 Activity</button>
      </div>
      
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center mb-4">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" 
                 class="rounded-circle me-3" width="80" height="80" alt="avatar">
            <div class="flex-grow-1">
              <h4 class="mb-1">John Doe</h4>
              <p class="text-muted mb-0">Full Stack Developer</p>
            </div>
            <button class="btn btn-primary edit-toggle">✏️ Edit Profile</button>
          </div>
          
          <!-- Tab Content: About -->
          <div class="tab-content-about">
            <h5 class="mb-3">About</h5>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control editable-field" value="John Doe" disabled>
              </div>
              <div class="col-md-6">
                <label class="form-label">Email</label>
                <input type="email" class="form-control editable-field" value="john@example.com" disabled>
              </div>
              <div class="col-md-6">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-control editable-field" value="+1 234 567 8900" disabled>
              </div>
              <div class="col-md-6">
                <label class="form-label">Location</label>
                <input type="text" class="form-control editable-field" value="San Francisco, CA" disabled>
              </div>
            </div>
          </div>
          
          <!-- Tab Content: Activity -->
          <div class="tab-content-activity" style="display: none;">
            <h5 class="mb-3">Recent Activity</h5>
            <ul class="list-group">
              <li class="list-group-item">✅ Completed project milestone - 2 hours ago</li>
              <li class="list-group-item">💬 Commented on issue #123 - 5 hours ago</li>
              <li class="list-group-item">🎉 Joined the team - 1 day ago</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;var c,o,n;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`() => createProfilePage({
  viewMode: 'view'
})`,...(n=(o=i.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};var d,r,m;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  const markup = createProfilePage(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(m=(r=e.parameters)==null?void 0:r.docs)==null?void 0:m.source}}};var b,v,p;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
  const markup = createProfilePage(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(p=(v=s.parameters)==null?void 0:v.docs)==null?void 0:p.source}}};var u,g,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
  return \`
    <div id="interactive-profile">
      <div class="mb-3 d-flex gap-2">
        <button class="btn btn-primary" onclick="
          const container = document.getElementById('interactive-profile');
          const editBtn = container.querySelector('.edit-toggle');
          const isEdit = editBtn.textContent.includes('Cancel');
          editBtn.textContent = isEdit ? '✏️ Edit Profile' : '❌ Cancel Edit';
          editBtn.className = isEdit ? 'btn btn-primary edit-toggle' : 'btn btn-danger edit-toggle';
          const inputs = container.querySelectorAll('.editable-field');
          inputs.forEach(input => {
            input.disabled = isEdit;
            input.style.background = isEdit ? 'transparent' : '#fff3cd';
          });
        ">✏️ Edit Profile</button>
        <button class="btn btn-outline-secondary tab-about" onclick="
          const tabs = document.querySelectorAll('.profile-tab');
          tabs.forEach(t => t.classList.remove('active'));
          document.querySelector('.tab-about').classList.add('active');
          document.querySelector('.tab-content-about').style.display = 'block';
          document.querySelector('.tab-content-activity').style.display = 'none';
        ">📝 About</button>
        <button class="btn btn-outline-secondary tab-activity profile-tab" onclick="
          const tabs = document.querySelectorAll('.profile-tab');
          tabs.forEach(t => t.classList.remove('active'));
          document.querySelector('.tab-activity').classList.add('active');
          document.querySelector('.tab-content-about').style.display = 'none';
          document.querySelector('.tab-content-activity').style.display = 'block';
        ">📊 Activity</button>
      </div>
      
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center mb-4">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" 
                 class="rounded-circle me-3" width="80" height="80" alt="avatar">
            <div class="flex-grow-1">
              <h4 class="mb-1">John Doe</h4>
              <p class="text-muted mb-0">Full Stack Developer</p>
            </div>
            <button class="btn btn-primary edit-toggle">✏️ Edit Profile</button>
          </div>
          
          <!-- Tab Content: About -->
          <div class="tab-content-about">
            <h5 class="mb-3">About</h5>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control editable-field" value="John Doe" disabled>
              </div>
              <div class="col-md-6">
                <label class="form-label">Email</label>
                <input type="email" class="form-control editable-field" value="john@example.com" disabled>
              </div>
              <div class="col-md-6">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-control editable-field" value="+1 234 567 8900" disabled>
              </div>
              <div class="col-md-6">
                <label class="form-label">Location</label>
                <input type="text" class="form-control editable-field" value="San Francisco, CA" disabled>
              </div>
            </div>
          </div>
          
          <!-- Tab Content: Activity -->
          <div class="tab-content-activity" style="display: none;">
            <h5 class="mb-3">Recent Activity</h5>
            <ul class="list-group">
              <li class="list-group-item">✅ Completed project milestone - 2 hours ago</li>
              <li class="list-group-item">💬 Commented on issue #123 - 5 hours ago</li>
              <li class="list-group-item">🎉 Joined the team - 1 day ago</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  \`;
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};const E=["Overview","ViewMode","EditMode","Interactive"];export{s as EditMode,a as Interactive,i as Overview,e as ViewMode,E as __namedExportsOrder,C as default};
