import{_ as U}from"./iframe-WO2JVUZp.js";import{f as M}from"./snippets-m8t1HIl1.js";const V={title:"Vuexy/Organisms/Apps/KanbanBoard",tags:["autodocs"],parameters:{docs:{description:{component:`
# Kanban Board

Quadro Kanban para visualização e gerenciamento de tarefas.

## Quando usar
- Gerenciamento de projetos
- Sprint planning
- Workflow visualization
- Task tracking
- Agile boards
- Pipeline management

## Características
- Múltiplas colunas (lanes)
- Cards arrastavéis
- Add new task
- Task details
- Labels/tags
- Assignees
- Due dates
- Progress indicators

## Colunas típicas
- Backlog
- To Do
- In Progress
- Review
- Done

## Card elements
- Title
- Description
- Labels
- Avatars
- Due date
- Attachments count
- Comments count

## Interações
- Drag and drop (requer JS)
- Add/edit/delete cards
- Filter por label
- Assign usuários
- Add comments

## Acessibilidade
- Keyboard navigation
- ARIA labels
- Focus management
- Screen reader support
        `}}},argTypes:{columns:{control:"select",options:[3,4,5],description:"Número de colunas",table:{defaultValue:{summary:4}}}}},R=({columns:o=4})=>`<div class="kanban-board">
  <div class="d-flex gap-3 pb-3" style="overflow-x: auto;">
    ${[{title:"Backlog",count:3,color:"secondary"},{title:"To Do",count:5,color:"primary"},{title:"In Progress",count:4,color:"info"},{title:"Review",count:2,color:"warning"},{title:"Done",count:8,color:"success"}].slice(0,o).map((n,s)=>`
    <!-- ${n.title} Column -->
    <div class="kanban-column">
      <div class="kanban-column-header">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 class="mb-0">${n.title}</h6>
            <span class="badge bg-label-${n.color} rounded-pill">${n.count} tasks</span>
          </div>
          <button class="btn btn-sm btn-icon btn-label-secondary">
            <i class="bx bx-plus"></i>
          </button>
        </div>
      </div>
      
      <div class="kanban-cards">
        ${s===0?`
        <!-- Card 1 -->
        <div class="kanban-card">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-danger">Bug</span>
            <button class="btn btn-sm btn-icon" type="button">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
          </div>
          <h6 class="mb-2">Fix login authentication</h6>
          <p class="text-muted small mb-3">Users unable to login with OAuth</p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <span class="badge bg-light text-dark">
                <i class="bx bx-paperclip"></i> 3
              </span>
              <span class="badge bg-light text-dark">
                <i class="bx bx-message-square-dots"></i> 5
              </span>
            </div>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        
        <!-- Card 2 -->
        <div class="kanban-card">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-info">Feature</span>
            <button class="btn btn-sm btn-icon" type="button">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
          </div>
          <h6 class="mb-2">Add dark mode</h6>
          <p class="text-muted small mb-3">Implement theme switcher</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">
              <i class="bx bx-calendar"></i> Jan 30
            </small>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
              </div>
              <div class="avatar avatar-xs">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ffb400'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EMB%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        `:""}
        
        ${s===1?`
        <!-- Card 1 -->
        <div class="kanban-card">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-primary">Enhancement</span>
            <button class="btn btn-sm btn-icon" type="button">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
          </div>
          <h6 class="mb-2">Improve dashboard performance</h6>
          <div class="mb-3">
            <div class="d-flex justify-content-between mb-1">
              <small class="text-muted">Progress</small>
              <small class="text-muted">30%</small>
            </div>
            <div class="progress" style="height: 4px;">
              <div class="progress-bar" role="progressbar" style="width: 30%"></div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <span class="badge bg-light text-dark">
                <i class="bx bx-check-square"></i> 3/10
              </span>
            </div>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ff4c51'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3ERP%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        
        <!-- Card 2 -->
        <div class="kanban-card">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-success">Documentation</span>
            <button class="btn btn-sm btn-icon" type="button">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
          </div>
          <h6 class="mb-2">Update API docs</h6>
          <p class="text-muted small mb-3">Add examples for new endpoints</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-muted">
              <i class="bx bx-calendar"></i> Feb 5
            </small>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2316b1ff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3ESK%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        `:""}
        
        ${s===2?`
        <!-- Card 1 -->
        <div class="kanban-card border-start border-3 border-info">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-warning">In Progress</span>
            <button class="btn btn-sm btn-icon" type="button">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
          </div>
          <h6 class="mb-2">Redesign landing page</h6>
          <div class="mb-3">
            <div class="d-flex justify-content-between mb-1">
              <small class="text-muted">Progress</small>
              <small class="text-muted">65%</small>
            </div>
            <div class="progress" style="height: 4px;">
              <div class="progress-bar bg-info" role="progressbar" style="width: 65%"></div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex gap-2">
              <span class="badge bg-light text-dark">
                <i class="bx bx-paperclip"></i> 8
              </span>
              <span class="badge bg-light text-dark">
                <i class="bx bx-message-square-dots"></i> 12
              </span>
            </div>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23696cff'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJD%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
              </div>
              <div class="avatar avatar-xs">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%2356ca00'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EJS%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        `:""}
        
        ${s===3?`
        <!-- Card 1 -->
        <div class="kanban-card">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-info">Feature</span>
            <button class="btn btn-sm btn-icon" type="button">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
          </div>
          <h6 class="mb-2">Email notifications</h6>
          <p class="text-muted small mb-3">Ready for testing</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-success">
              <i class="bx bx-check"></i> Ready
            </small>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ffb400'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3EMB%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        `:""}
        
        ${s===4?`
        <!-- Card 1 -->
        <div class="kanban-card opacity-75">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <span class="badge bg-label-success">Feature</span>
            <button class="btn btn-sm btn-icon" type="button">
              <i class="bx bx-dots-vertical-rounded"></i>
            </button>
          </div>
          <h6 class="mb-2">User profile settings</h6>
          <p class="text-muted small mb-3">Completed and deployed</p>
          <div class="d-flex justify-content-between align-items-center">
            <small class="text-success">
              <i class="bx bx-check-circle"></i> Done
            </small>
            <div class="avatar-group">
              <div class="avatar avatar-xs">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23ff4c51'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='white' text-anchor='middle' dy='.35em'%3ERP%3C/text%3E%3C/svg%3E" alt="Avatar" class="rounded-circle">
              </div>
            </div>
          </div>
        </div>
        `:""}
        
        <!-- Add New Card Button -->
        <button class="btn btn-outline-secondary w-100 mt-3">
          <i class="bx bx-plus me-1"></i> Add Task
        </button>
      </div>
    </div>
    `).join("")}
  </div>
</div>

<style>
.kanban-board {
  padding: 1rem;
  background-color: #f8f9fa;
  min-height: 600px;
}

.kanban-column {
  min-width: 280px;
  max-width: 320px;
  background-color: #f0f2f8;
  border-radius: 0.375rem;
  padding: 1rem;
}

.kanban-column-header {
  margin-bottom: 1rem;
}

.kanban-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.kanban-card {
  background-color: #fff;
  border-radius: 0.375rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  cursor: move;
  transition: all 0.3s;
}

.kanban-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.avatar-group {
  display: flex;
  margin-left: -8px;
}

.avatar-group .avatar {
  margin-left: -8px;
  border: 2px solid #fff;
}

.avatar-xs {
  width: 28px;
  height: 28px;
}

@media (max-width: 768px) {
  .kanban-column {
    min-width: 260px;
  }
}
</style>`,y=o=>{const t=R(o);return`
    ${t}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${M(t).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Drag & Drop:</strong> This component requires JavaScript library (e.g., jKanban, dragula) for drag-and-drop functionality.
        </div>
      </div>
    </details>
  `},v=()=>R({columns:4}),d=y.bind({});d.args={columns:3};const m=y.bind({});m.args={columns:4};const b=y.bind({});b.args={columns:5};const u=()=>{const o="kanban-interactive-"+Math.random().toString(36).substr(2,9),t={backlog:[{id:1,title:"Design new landing page",label:"Feature",color:"info",attachments:2,comments:3},{id:2,title:"Update API documentation",label:"Documentation",color:"success",attachments:1,comments:5}],todo:[{id:3,title:"Fix login bug",label:"Bug",color:"danger",attachments:0,comments:2},{id:4,title:"Implement search filter",label:"Feature",color:"info",attachments:3,comments:1},{id:5,title:"Add unit tests",label:"Enhancement",color:"primary",attachments:0,comments:0}],progress:[{id:6,title:"User dashboard redesign",label:"Feature",color:"info",attachments:5,comments:8},{id:7,title:"Performance optimization",label:"Enhancement",color:"primary",attachments:2,comments:4}],done:[{id:8,title:"Setup CI/CD pipeline",label:"Enhancement",color:"primary",attachments:1,comments:2},{id:9,title:"Deploy to staging",label:"Enhancement",color:"primary",attachments:0,comments:1}]},w=a=>`
    <div class="kanban-card" data-card-id="${a.id}">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <span class="badge bg-label-${a.color}">${a.label}</span>
        <div class="dropdown">
          <button class="btn btn-sm btn-icon dropdown-toggle hide-arrow" type="button">
            <i class="bx bx-dots-vertical-rounded"></i>
          </button>
        </div>
      </div>
      <h6 class="mb-2">${a.title}</h6>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex gap-2">
          ${a.attachments>0?`
            <small class="text-muted">
              <i class="bx bx-paperclip"></i> ${a.attachments}
            </small>`:""}
          ${a.comments>0?`
            <small class="text-muted">
              <i class="bx bx-message"></i> ${a.comments}
            </small>`:""}
        </div>
      </div>
    </div>
  `,n=(a,x,l,i)=>`
    <div class="kanban-column" style="min-width: 280px; max-width: 280px;">
      <div class="kanban-column-header mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-2">
            <h6 class="mb-0">${x}</h6>
            <span class="badge bg-label-${l} rounded-pill">${i.length}</span>
          </div>
          <button class="btn btn-sm btn-icon">
            <i class="bx bx-plus"></i>
          </button>
        </div>
      </div>
      <div class="kanban-cards" data-column="${a}" style="min-height: 200px; background: #f8f9fa; border-radius: 8px; padding: 12px;">
        ${i.map(w).join("")}
      </div>
    </div>
  `,s=`
    <div id="${o}">
      <style>
        .kanban-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          cursor: move;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .kanban-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .kanban-card.sortable-ghost {
          opacity: 0.4;
          background: #e3f2fd;
        }
        .kanban-card.sortable-drag {
          opacity: 1;
        }
        .kanban-cards {
          min-height: 200px;
        }
        .kanban-cards.sortable-over {
          background: #e8f4f8 !important;
        }
      </style>
      
      <div class="kanban-board" style="padding: 20px; background: #fff; border-radius: 8px;">
        <div class="d-flex gap-3 pb-3" style="overflow-x: auto;" id="kanban-container">
          ${n("backlog","Backlog","secondary",t.backlog)}
          ${n("todo","To Do","primary",t.todo)}
          ${n("progress","In Progress","info",t.progress)}
          ${n("done","Done","success",t.done)}
        </div>
      </div>
      
      <div class="alert alert-info mt-3">
        <strong>🎯 Interactive Drag & Drop:</strong> Drag cards between columns or reorder within a column. Powered by SortableJS.
      </div>
    </div>
  `;return setTimeout(async()=>{const a=document.getElementById(o);if(!a)return;const x=(await U(async()=>{const{default:e}=await import("./sortable.esm-B8rnvHQv.js");return{default:e}},[],import.meta.url)).default;let l=JSON.parse(JSON.stringify(t));const i=[],C=e=>{const c=a.querySelector(`[data-column="${e}"]`);if(!c)return;const r=c.closest(".kanban-column").querySelector(".badge.rounded-pill"),g=c.querySelectorAll(".kanban-card").length;r&&(r.textContent=g)};a.querySelectorAll(".kanban-cards").forEach(e=>{e.getAttribute("data-column");const c=new x(e,{group:"kanban",animation:150,ghostClass:"sortable-ghost",dragClass:"sortable-drag",onEnd:r=>{const g=parseInt(r.item.getAttribute("data-card-id")),p=r.from.getAttribute("data-column"),f=r.to.getAttribute("data-column"),k=r.newIndex,E=l[p].findIndex(h=>h.id===g);if(E>-1){const[h]=l[p].splice(E,1);l[f].splice(k,0,h),C(p),C(f),console.log(`Card ${g} moved from ${p} to ${f} at position ${k}`)}}});i.push(c)});const O=()=>{i.forEach(e=>e.destroy())};a._sortableCleanup=O},100),s};u.parameters={docs:{description:{story:`
# Interactive Kanban Board with Drag & Drop

Full drag & drop functionality using **SortableJS**. Features:

- ✅ Drag cards between columns
- ✅ Reorder cards within a column  
- ✅ Real-time state updates
- ✅ Visual feedback (ghost/drag classes)
- ✅ Column count updates automatically
- ✅ Proper cleanup (no memory leaks)

**Implementation:**
- Uses SortableJS dynamic import
- State managed locally (boardState object)
- Each column is a Sortable instance with shared group
- onEnd handler updates state on every drop
- Cleanup function destroys all instances

**Try it:**
- Drag any card to another column
- Reorder cards within the same column
- Watch the badge counts update
      `}}};var S,$,D;v.parameters={...v.parameters,docs:{...(S=v.parameters)==null?void 0:S.docs,source:{originalSource:`() => createKanbanBoard({
  columns: 4
})`,...(D=($=v.parameters)==null?void 0:$.docs)==null?void 0:D.source}}};var I,A,j;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  const markup = createKanbanBoard(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Drag & Drop:</strong> This component requires JavaScript library (e.g., jKanban, dragula) for drag-and-drop functionality.
        </div>
      </div>
    </details>
  \`;
}`,...(j=(A=d.parameters)==null?void 0:A.docs)==null?void 0:j.source}}};var T,F,B;m.parameters={...m.parameters,docs:{...(T=m.parameters)==null?void 0:T.docs,source:{originalSource:`args => {
  const markup = createKanbanBoard(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Drag & Drop:</strong> This component requires JavaScript library (e.g., jKanban, dragula) for drag-and-drop functionality.
        </div>
      </div>
    </details>
  \`;
}`,...(B=(F=m.parameters)==null?void 0:F.docs)==null?void 0:B.source}}};var P,J,_;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`args => {
  const markup = createKanbanBoard(args);
  return \`
    \${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        
        <div class="alert alert-info mt-3">
          <strong>Drag & Drop:</strong> This component requires JavaScript library (e.g., jKanban, dragula) for drag-and-drop functionality.
        </div>
      </div>
    </details>
  \`;
}`,...(_=(J=b.parameters)==null?void 0:J.docs)==null?void 0:_.source}}};var q,K,z;u.parameters={...u.parameters,docs:{...(q=u.parameters)==null?void 0:q.docs,source:{originalSource:`() => {
  const containerId = 'kanban-interactive-' + Math.random().toString(36).substr(2, 9);

  // Initial state
  const initialData = {
    backlog: [{
      id: 1,
      title: 'Design new landing page',
      label: 'Feature',
      color: 'info',
      attachments: 2,
      comments: 3
    }, {
      id: 2,
      title: 'Update API documentation',
      label: 'Documentation',
      color: 'success',
      attachments: 1,
      comments: 5
    }],
    todo: [{
      id: 3,
      title: 'Fix login bug',
      label: 'Bug',
      color: 'danger',
      attachments: 0,
      comments: 2
    }, {
      id: 4,
      title: 'Implement search filter',
      label: 'Feature',
      color: 'info',
      attachments: 3,
      comments: 1
    }, {
      id: 5,
      title: 'Add unit tests',
      label: 'Enhancement',
      color: 'primary',
      attachments: 0,
      comments: 0
    }],
    progress: [{
      id: 6,
      title: 'User dashboard redesign',
      label: 'Feature',
      color: 'info',
      attachments: 5,
      comments: 8
    }, {
      id: 7,
      title: 'Performance optimization',
      label: 'Enhancement',
      color: 'primary',
      attachments: 2,
      comments: 4
    }],
    done: [{
      id: 8,
      title: 'Setup CI/CD pipeline',
      label: 'Enhancement',
      color: 'primary',
      attachments: 1,
      comments: 2
    }, {
      id: 9,
      title: 'Deploy to staging',
      label: 'Enhancement',
      color: 'primary',
      attachments: 0,
      comments: 1
    }]
  };
  const renderCard = card => \`
    <div class="kanban-card" data-card-id="\${card.id}">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <span class="badge bg-label-\${card.color}">\${card.label}</span>
        <div class="dropdown">
          <button class="btn btn-sm btn-icon dropdown-toggle hide-arrow" type="button">
            <i class="bx bx-dots-vertical-rounded"></i>
          </button>
        </div>
      </div>
      <h6 class="mb-2">\${card.title}</h6>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex gap-2">
          \${card.attachments > 0 ? \`
            <small class="text-muted">
              <i class="bx bx-paperclip"></i> \${card.attachments}
            </small>\` : ''}
          \${card.comments > 0 ? \`
            <small class="text-muted">
              <i class="bx bx-message"></i> \${card.comments}
            </small>\` : ''}
        </div>
      </div>
    </div>
  \`;
  const renderColumn = (columnId, title, color, cards) => \`
    <div class="kanban-column" style="min-width: 280px; max-width: 280px;">
      <div class="kanban-column-header mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center gap-2">
            <h6 class="mb-0">\${title}</h6>
            <span class="badge bg-label-\${color} rounded-pill">\${cards.length}</span>
          </div>
          <button class="btn btn-sm btn-icon">
            <i class="bx bx-plus"></i>
          </button>
        </div>
      </div>
      <div class="kanban-cards" data-column="\${columnId}" style="min-height: 200px; background: #f8f9fa; border-radius: 8px; padding: 12px;">
        \${cards.map(renderCard).join('')}
      </div>
    </div>
  \`;
  const markup = \`
    <div id="\${containerId}">
      <style>
        .kanban-card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          cursor: move;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .kanban-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        .kanban-card.sortable-ghost {
          opacity: 0.4;
          background: #e3f2fd;
        }
        .kanban-card.sortable-drag {
          opacity: 1;
        }
        .kanban-cards {
          min-height: 200px;
        }
        .kanban-cards.sortable-over {
          background: #e8f4f8 !important;
        }
      </style>
      
      <div class="kanban-board" style="padding: 20px; background: #fff; border-radius: 8px;">
        <div class="d-flex gap-3 pb-3" style="overflow-x: auto;" id="kanban-container">
          \${renderColumn('backlog', 'Backlog', 'secondary', initialData.backlog)}
          \${renderColumn('todo', 'To Do', 'primary', initialData.todo)}
          \${renderColumn('progress', 'In Progress', 'info', initialData.progress)}
          \${renderColumn('done', 'Done', 'success', initialData.done)}
        </div>
      </div>
      
      <div class="alert alert-info mt-3">
        <strong>🎯 Interactive Drag & Drop:</strong> Drag cards between columns or reorder within a column. Powered by SortableJS.
      </div>
    </div>
  \`;

  // Import and initialize SortableJS after DOM is ready
  setTimeout(async () => {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Dynamically import SortableJS
    const Sortable = (await import('sortablejs')).default;

    // State management
    let boardState = JSON.parse(JSON.stringify(initialData));
    const sortableInstances = [];
    const updateColumnCount = columnId => {
      const column = container.querySelector(\`[data-column="\${columnId}"]\`);
      if (!column) return;
      const header = column.closest('.kanban-column').querySelector('.badge.rounded-pill');
      const count = column.querySelectorAll('.kanban-card').length;
      if (header) {
        header.textContent = count;
      }
    };

    // Initialize Sortable for each column
    const columns = container.querySelectorAll('.kanban-cards');
    columns.forEach(columnEl => {
      const columnId = columnEl.getAttribute('data-column');
      const sortable = new Sortable(columnEl, {
        group: 'kanban',
        animation: 150,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        onEnd: evt => {
          const cardId = parseInt(evt.item.getAttribute('data-card-id'));
          const fromColumn = evt.from.getAttribute('data-column');
          const toColumn = evt.to.getAttribute('data-column');
          const newIndex = evt.newIndex;

          // Update state
          const cardIndex = boardState[fromColumn].findIndex(c => c.id === cardId);
          if (cardIndex > -1) {
            const [card] = boardState[fromColumn].splice(cardIndex, 1);
            boardState[toColumn].splice(newIndex, 0, card);

            // Update UI counts
            updateColumnCount(fromColumn);
            updateColumnCount(toColumn);
            console.log(\`Card \${cardId} moved from \${fromColumn} to \${toColumn} at position \${newIndex}\`);
          }
        }
      });
      sortableInstances.push(sortable);
    });

    // Cleanup on component unmount/destroy
    const cleanup = () => {
      sortableInstances.forEach(instance => instance.destroy());
    };

    // Store cleanup function (in real app, would be called on unmount)
    container._sortableCleanup = cleanup;
  }, 100);
  return markup;
}`,...(z=(K=u.parameters)==null?void 0:K.docs)==null?void 0:z.source}}};const Y=["Overview","ThreeColumns","FourColumns","FiveColumns","InteractiveDragDrop"];export{b as FiveColumns,m as FourColumns,u as InteractiveDragDrop,v as Overview,d as ThreeColumns,Y as __namedExportsOrder,V as default};
