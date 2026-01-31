import{f as _,a as J}from"./snippets-m8t1HIl1.js";const z={title:"Molecules/Feedback/ProgressBar",tags:["autodocs"],parameters:{docs:{description:{component:`
# Progress Bar

Indicador visual de progresso ou conclusão de uma tarefa.

## Quando usar
- Upload/download de arquivos
- Formulários multi-etapa
- Processamento de dados
- Loading de operações longas
- Indicadores de habilidade/skill

## Características
- Classes Bootstrap: \`.progress\`, \`.progress-bar\`
- Variantes: Primary, Secondary, Success, Danger, Warning, Info
- Altura customizável
- Labels (texto interno)
- Striped e Animated
- Múltiplas barras (stacked)

## Acessibilidade
- \`role="progressbar"\`
- \`aria-valuenow\`, \`aria-valuemin\`, \`aria-valuemax\`
- \`aria-label\` para contexto
        `}}},argTypes:{value:{control:{type:"range",min:0,max:100,step:5},description:"Valor do progresso (0-100)",table:{defaultValue:{summary:50}}},variant:{control:{type:"select"},options:["primary","secondary","success","danger","warning","info"],description:"Cor da barra",table:{defaultValue:{summary:"primary"}}},height:{control:{type:"select"},options:["sm","default","lg"],description:"Altura da barra",table:{defaultValue:{summary:"default"}}},striped:{control:"boolean",description:"Estilo listrado",table:{defaultValue:{summary:!1}}},animated:{control:"boolean",description:"Animação listrada",table:{defaultValue:{summary:!1}}},showLabel:{control:"boolean",description:"Mostra porcentagem",table:{defaultValue:{summary:!1}}}}},e=({value:r=50,variant:t="primary",height:u="default",striped:V=!1,animated:p=!1,showLabel:T=!1})=>{const F=u==="sm"?"height: 8px;":u==="lg"?"height: 24px;":"",U=V||p?"progress-bar-striped":"",W=p?"progress-bar-animated":"",O=T?`${r}%`:"";return`<div class="progress" style="${F}">
  <div class="progress-bar bg-${t} ${U} ${W}" 
    role="progressbar" 
    style="width: ${r}%" 
    aria-valuenow="${r}" 
    aria-valuemin="0" 
    aria-valuemax="100">
    ${O}
  </div>
</div>`},s=r=>{const t=e(r);return`
    <div style="max-width: 600px;">
      ${t}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${_(t).replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
        <h6>React</h6>
        <pre><code>${J(t,"ProgressBar").replace(/</g,"&lt;").replace(/>/g,"&gt;")}</code></pre>
      </div>
    </details>
  `},d=()=>`
  <div class="row g-4">
    <div class="col-12">
      <h5>Variantes de Cores</h5>
      <div class="demo-vertical-spacing">
        ${e({value:25,variant:"primary",showLabel:!0})}
        ${e({value:40,variant:"secondary",showLabel:!0})}
        ${e({value:60,variant:"success",showLabel:!0})}
        ${e({value:75,variant:"danger",showLabel:!0})}
        ${e({value:85,variant:"warning",showLabel:!0})}
        ${e({value:95,variant:"info",showLabel:!0})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Alturas</h5>
      <div class="demo-vertical-spacing">
        <div>
          <small class="text-muted">Small (8px)</small>
          ${e({value:50,height:"sm"})}
        </div>
        <div>
          <small class="text-muted">Default (16px)</small>
          ${e({value:50,height:"default"})}
        </div>
        <div>
          <small class="text-muted">Large (24px)</small>
          ${e({value:50,height:"lg",showLabel:!0})}
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Striped & Animated</h5>
      <div class="demo-vertical-spacing">
        <div>
          <small class="text-muted">Striped</small>
          ${e({value:65,variant:"success",striped:!0})}
        </div>
        <div>
          <small class="text-muted">Animated Striped</small>
          ${e({value:75,variant:"primary",animated:!0})}
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Com Labels</h5>
      <div class="demo-vertical-spacing">
        ${e({value:30,variant:"primary",height:"lg",showLabel:!0})}
        ${e({value:60,variant:"success",height:"lg",showLabel:!0})}
        ${e({value:90,variant:"warning",height:"lg",showLabel:!0})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Múltiplas Barras (Stacked)</h5>
      <div class="progress">
        <div class="progress-bar bg-primary" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
        <div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
        <div class="progress-bar bg-info" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Casos de Uso</h5>
      
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="card-title">File Upload Progress</h6>
          <p class="text-muted mb-2">document.pdf (2.5 MB)</p>
          ${e({value:73,variant:"primary",showLabel:!0})}
          <small class="text-muted">73% complete - 27 seconds remaining</small>
        </div>
      </div>
      
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="card-title">Profile Completion</h6>
          <div class="demo-vertical-spacing">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span>Basic Info</span>
              <span class="badge bg-success">Complete</span>
            </div>
            ${e({value:100,variant:"success"})}
            
            <div class="d-flex justify-content-between align-items-center mb-1 mt-3">
              <span>Work Experience</span>
              <span class="badge bg-primary">In Progress</span>
            </div>
            ${e({value:60,variant:"primary"})}
            
            <div class="d-flex justify-content-between align-items-center mb-1 mt-3">
              <span>Skills & Certifications</span>
              <span class="badge bg-label-secondary">Not Started</span>
            </div>
            ${e({value:0,variant:"secondary"})}
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">Skills</h6>
          <div class="demo-vertical-spacing">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span>JavaScript</span>
              <span class="text-muted">90%</span>
            </div>
            ${e({value:90,variant:"primary"})}
            
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span>React</span>
              <span class="text-muted">85%</span>
            </div>
            ${e({value:85,variant:"info"})}
            
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span>Node.js</span>
              <span class="text-muted">75%</span>
            </div>
            ${e({value:75,variant:"success"})}
          </div>
        </div>
      </div>
    </div>
  </div>
`,a=s.bind({});a.args={value:50,variant:"primary",height:"default",striped:!1,animated:!1,showLabel:!1};const n=s.bind({});n.args={...a.args,value:75,showLabel:!0};const l=s.bind({});l.args={...a.args,value:60,variant:"success",striped:!0};const i=s.bind({});i.args={...a.args,value:70,variant:"primary",animated:!0};const c=s.bind({});c.args={...a.args,value:45,height:"sm"};const o=s.bind({});o.args={...a.args,value:80,height:"lg",showLabel:!0};const m=()=>`
    <div class="card" style="max-width: 600px; margin: 0 auto;">
      <div class="card-body">
        <h5 class="card-title mb-4">📊 Interactive Progress Bar</h5>
        
        <div class="mb-4">
          <div class="d-flex justify-content-between mb-2">
            <span>Upload Progress</span>
            <span id="progress-value">0%</span>
          </div>
          <div class="progress" style="height: 20px;">
            <div id="progress-bar" class="progress-bar bg-primary" style="width: 0%" 
                 role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              0%
            </div>
          </div>
        </div>
        
        <div class="d-flex gap-2 mb-4">
          <button class="btn btn-primary" onclick="
            let current = parseInt(document.getElementById('progress-bar').style.width);
            if (current < 100) {
              current = Math.min(100, current + 10);
              const bar = document.getElementById('progress-bar');
              bar.style.width = current + '%';
              bar.textContent = current + '%';
              bar.setAttribute('aria-valuenow', current);
              document.getElementById('progress-value').textContent = current + '%';
              
              if (current >= 100) {
                bar.className = 'progress-bar bg-success';
                document.getElementById('status-message').textContent = '✅ Complete!';
                document.getElementById('status-message').className = 'alert alert-success mt-3';
              } else if (current >= 75) {
                bar.className = 'progress-bar bg-info';
              } else if (current >= 50) {
                bar.className = 'progress-bar bg-warning';
              }
            }
          ">➕ Increase (+10%)</button>
          
          <button class="btn btn-secondary" onclick="
            let current = parseInt(document.getElementById('progress-bar').style.width);
            if (current > 0) {
              current = Math.max(0, current - 10);
              const bar = document.getElementById('progress-bar');
              bar.style.width = current + '%';
              bar.textContent = current + '%';
              bar.setAttribute('aria-valuenow', current);
              document.getElementById('progress-value').textContent = current + '%';
              bar.className = 'progress-bar bg-primary';
              document.getElementById('status-message').textContent = '';
              document.getElementById('status-message').className = 'alert alert-info mt-3 d-none';
            }
          ">➖ Decrease (-10%)</button>
          
          <button class="btn btn-success" onclick="
            let target = 100;
            let current = 0;
            const bar = document.getElementById('progress-bar');
            const interval = setInterval(() => {
              current += 2;
              bar.style.width = current + '%';
              bar.textContent = current + '%';
              bar.setAttribute('aria-valuenow', current);
              document.getElementById('progress-value').textContent = current + '%';
              
              if (current >= 50) bar.className = 'progress-bar bg-warning';
              if (current >= 75) bar.className = 'progress-bar bg-info';
              if (current >= 100) {
                bar.className = 'progress-bar bg-success';
                document.getElementById('status-message').textContent = '🎉 Animation Complete!';
                document.getElementById('status-message').className = 'alert alert-success mt-3';
                clearInterval(interval);
              }
            }, 50);
          ">🎬 Animate</button>
          
          <button class="btn btn-outline-danger" onclick="
            const bar = document.getElementById('progress-bar');
            bar.style.width = '0%';
            bar.textContent = '0%';
            bar.className = 'progress-bar bg-primary';
            bar.setAttribute('aria-valuenow', 0);
            document.getElementById('progress-value').textContent = '0%';
            document.getElementById('status-message').textContent = '';
            document.getElementById('status-message').className = 'alert alert-info mt-3 d-none';
          ">🔄 Reset</button>
        </div>
        
        <div id="status-message" class="alert alert-info mt-3 d-none"></div>
      </div>
    </div>
  `;var g,v,b;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`() => \`
  <div class="row g-4">
    <div class="col-12">
      <h5>Variantes de Cores</h5>
      <div class="demo-vertical-spacing">
        \${createProgressBar({
  value: 25,
  variant: 'primary',
  showLabel: true
})}
        \${createProgressBar({
  value: 40,
  variant: 'secondary',
  showLabel: true
})}
        \${createProgressBar({
  value: 60,
  variant: 'success',
  showLabel: true
})}
        \${createProgressBar({
  value: 75,
  variant: 'danger',
  showLabel: true
})}
        \${createProgressBar({
  value: 85,
  variant: 'warning',
  showLabel: true
})}
        \${createProgressBar({
  value: 95,
  variant: 'info',
  showLabel: true
})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Alturas</h5>
      <div class="demo-vertical-spacing">
        <div>
          <small class="text-muted">Small (8px)</small>
          \${createProgressBar({
  value: 50,
  height: 'sm'
})}
        </div>
        <div>
          <small class="text-muted">Default (16px)</small>
          \${createProgressBar({
  value: 50,
  height: 'default'
})}
        </div>
        <div>
          <small class="text-muted">Large (24px)</small>
          \${createProgressBar({
  value: 50,
  height: 'lg',
  showLabel: true
})}
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Striped & Animated</h5>
      <div class="demo-vertical-spacing">
        <div>
          <small class="text-muted">Striped</small>
          \${createProgressBar({
  value: 65,
  variant: 'success',
  striped: true
})}
        </div>
        <div>
          <small class="text-muted">Animated Striped</small>
          \${createProgressBar({
  value: 75,
  variant: 'primary',
  animated: true
})}
        </div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Com Labels</h5>
      <div class="demo-vertical-spacing">
        \${createProgressBar({
  value: 30,
  variant: 'primary',
  height: 'lg',
  showLabel: true
})}
        \${createProgressBar({
  value: 60,
  variant: 'success',
  height: 'lg',
  showLabel: true
})}
        \${createProgressBar({
  value: 90,
  variant: 'warning',
  height: 'lg',
  showLabel: true
})}
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Múltiplas Barras (Stacked)</h5>
      <div class="progress">
        <div class="progress-bar bg-primary" role="progressbar" style="width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
        <div class="progress-bar bg-success" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
        <div class="progress-bar bg-info" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
    
    <div class="col-12 mt-5">
      <h5>Casos de Uso</h5>
      
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="card-title">File Upload Progress</h6>
          <p class="text-muted mb-2">document.pdf (2.5 MB)</p>
          \${createProgressBar({
  value: 73,
  variant: 'primary',
  showLabel: true
})}
          <small class="text-muted">73% complete - 27 seconds remaining</small>
        </div>
      </div>
      
      <div class="card mb-4">
        <div class="card-body">
          <h6 class="card-title">Profile Completion</h6>
          <div class="demo-vertical-spacing">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span>Basic Info</span>
              <span class="badge bg-success">Complete</span>
            </div>
            \${createProgressBar({
  value: 100,
  variant: 'success'
})}
            
            <div class="d-flex justify-content-between align-items-center mb-1 mt-3">
              <span>Work Experience</span>
              <span class="badge bg-primary">In Progress</span>
            </div>
            \${createProgressBar({
  value: 60,
  variant: 'primary'
})}
            
            <div class="d-flex justify-content-between align-items-center mb-1 mt-3">
              <span>Skills & Certifications</span>
              <span class="badge bg-label-secondary">Not Started</span>
            </div>
            \${createProgressBar({
  value: 0,
  variant: 'secondary'
})}
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-body">
          <h6 class="card-title">Skills</h6>
          <div class="demo-vertical-spacing">
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span>JavaScript</span>
              <span class="text-muted">90%</span>
            </div>
            \${createProgressBar({
  value: 90,
  variant: 'primary'
})}
            
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span>React</span>
              <span class="text-muted">85%</span>
            </div>
            \${createProgressBar({
  value: 85,
  variant: 'info'
})}
            
            <div class="d-flex justify-content-between align-items-center mb-1">
              <span>Node.js</span>
              <span class="text-muted">75%</span>
            </div>
            \${createProgressBar({
  value: 75,
  variant: 'success'
})}
          </div>
        </div>
      </div>
    </div>
  </div>
\``,...(b=(v=d.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var h,y,f;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const markup = createProgressBar(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'ProgressBar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(f=(y=a.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var x,w,B;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  const markup = createProgressBar(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'ProgressBar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(B=(w=n.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};var $,C,I;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`args => {
  const markup = createProgressBar(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'ProgressBar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(I=(C=l.parameters)==null?void 0:C.docs)==null?void 0:I.source}}};var S,P,k;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
  const markup = createProgressBar(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'ProgressBar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(k=(P=i.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};var L,E,A;c.parameters={...c.parameters,docs:{...(L=c.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  const markup = createProgressBar(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'ProgressBar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(A=(E=c.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var N,D,H;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
  const markup = createProgressBar(args);
  return \`
    <div style="max-width: 600px;">
      \${markup}
    </div>
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>\${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        <h6>React</h6>
        <pre><code>\${formatReactSnippet(markup, 'ProgressBar').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  \`;
}`,...(H=(D=o.parameters)==null?void 0:D.docs)==null?void 0:H.source}}};var M,R,j;m.parameters={...m.parameters,docs:{...(M=m.parameters)==null?void 0:M.docs,source:{originalSource:`() => {
  return \`
    <div class="card" style="max-width: 600px; margin: 0 auto;">
      <div class="card-body">
        <h5 class="card-title mb-4">📊 Interactive Progress Bar</h5>
        
        <div class="mb-4">
          <div class="d-flex justify-content-between mb-2">
            <span>Upload Progress</span>
            <span id="progress-value">0%</span>
          </div>
          <div class="progress" style="height: 20px;">
            <div id="progress-bar" class="progress-bar bg-primary" style="width: 0%" 
                 role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              0%
            </div>
          </div>
        </div>
        
        <div class="d-flex gap-2 mb-4">
          <button class="btn btn-primary" onclick="
            let current = parseInt(document.getElementById('progress-bar').style.width);
            if (current < 100) {
              current = Math.min(100, current + 10);
              const bar = document.getElementById('progress-bar');
              bar.style.width = current + '%';
              bar.textContent = current + '%';
              bar.setAttribute('aria-valuenow', current);
              document.getElementById('progress-value').textContent = current + '%';
              
              if (current >= 100) {
                bar.className = 'progress-bar bg-success';
                document.getElementById('status-message').textContent = '✅ Complete!';
                document.getElementById('status-message').className = 'alert alert-success mt-3';
              } else if (current >= 75) {
                bar.className = 'progress-bar bg-info';
              } else if (current >= 50) {
                bar.className = 'progress-bar bg-warning';
              }
            }
          ">➕ Increase (+10%)</button>
          
          <button class="btn btn-secondary" onclick="
            let current = parseInt(document.getElementById('progress-bar').style.width);
            if (current > 0) {
              current = Math.max(0, current - 10);
              const bar = document.getElementById('progress-bar');
              bar.style.width = current + '%';
              bar.textContent = current + '%';
              bar.setAttribute('aria-valuenow', current);
              document.getElementById('progress-value').textContent = current + '%';
              bar.className = 'progress-bar bg-primary';
              document.getElementById('status-message').textContent = '';
              document.getElementById('status-message').className = 'alert alert-info mt-3 d-none';
            }
          ">➖ Decrease (-10%)</button>
          
          <button class="btn btn-success" onclick="
            let target = 100;
            let current = 0;
            const bar = document.getElementById('progress-bar');
            const interval = setInterval(() => {
              current += 2;
              bar.style.width = current + '%';
              bar.textContent = current + '%';
              bar.setAttribute('aria-valuenow', current);
              document.getElementById('progress-value').textContent = current + '%';
              
              if (current >= 50) bar.className = 'progress-bar bg-warning';
              if (current >= 75) bar.className = 'progress-bar bg-info';
              if (current >= 100) {
                bar.className = 'progress-bar bg-success';
                document.getElementById('status-message').textContent = '🎉 Animation Complete!';
                document.getElementById('status-message').className = 'alert alert-success mt-3';
                clearInterval(interval);
              }
            }, 50);
          ">🎬 Animate</button>
          
          <button class="btn btn-outline-danger" onclick="
            const bar = document.getElementById('progress-bar');
            bar.style.width = '0%';
            bar.textContent = '0%';
            bar.className = 'progress-bar bg-primary';
            bar.setAttribute('aria-valuenow', 0);
            document.getElementById('progress-value').textContent = '0%';
            document.getElementById('status-message').textContent = '';
            document.getElementById('status-message').className = 'alert alert-info mt-3 d-none';
          ">🔄 Reset</button>
        </div>
        
        <div id="status-message" class="alert alert-info mt-3 d-none"></div>
      </div>
    </div>
  \`;
}`,...(j=(R=m.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};const Q=["Overview","Default","WithLabel","Striped","Animated","SmallHeight","LargeHeight","Interactive"];export{i as Animated,a as Default,m as Interactive,o as LargeHeight,d as Overview,c as SmallHeight,l as Striped,n as WithLabel,Q as __namedExportsOrder,z as default};
