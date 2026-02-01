const F={title:"Molecules/Feedback/RadialProgress",tags:["autodocs"],parameters:{docs:{description:{component:`
## RadialProgress - Progresso Circular

Indicadores de progresso circular (gauge/donut) para dashboards e métricas.

### Composição (Átomos usados)
- SVG circle elements
- Text (valor central)

### Variantes
- **Simple**: Apenas círculo e porcentagem
- **With Label**: Círculo + porcentagem + label
- **Multi-color**: Múltiplos segmentos coloridos
        `}}},argTypes:{value:{control:{type:"range",min:0,max:100},description:"Porcentagem de progresso (0-100)"},size:{control:{type:"range",min:60,max:200},description:"Tamanho em pixels"},color:{control:"select",options:["primary","success","warning","danger","info"],description:"Cor do progresso"},label:{control:"text",description:"Label abaixo do valor"}}},H={primary:"#7367f0",success:"#28c76f",warning:"#ff9f43",danger:"#ea5455",info:"#00cfe8",secondary:"#82868b"},e=({value:s=75,size:m=120,color:v="primary",label:p="",strokeWidth:g=8,showValue:W=!0})=>{const _=H[v]||v,u=15.9155;return`
<div class="d-inline-flex flex-column align-items-center">
  <div class="position-relative" style="width: ${m}px; height: ${m}px;">
    <svg viewBox="0 0 36 36" style="transform: rotate(-90deg); width: 100%; height: 100%;">
      <!-- Background circle -->
      <circle
        cx="18"
        cy="18"
        r="${u}"
        fill="none"
        stroke="#e9ecef"
        stroke-width="${g/2}"
      />
      <!-- Progress circle -->
      <circle
        cx="18"
        cy="18"
        r="${u}"
        fill="none"
        stroke="${_}"
        stroke-width="${g/2}"
        stroke-dasharray="${s}, 100"
        stroke-linecap="round"
        style="transition: stroke-dasharray 0.5s ease;"
      />
    </svg>
    ${W?`
    <div class="position-absolute top-50 start-50 translate-middle text-center">
      <span style="font-size: ${m/5}px; font-weight: 600;">${s}%</span>
    </div>
    `:""}
  </div>
  ${p?`<small class="text-muted mt-2">${p}</small>`:""}
</div>
  `},a={args:{value:75,size:120,color:"primary",label:""},render:s=>e(s)},t={render:()=>`
<div class="d-flex gap-4 flex-wrap">
  ${e({value:85,color:"primary",label:"Primary"})}
  ${e({value:72,color:"success",label:"Success"})}
  ${e({value:45,color:"warning",label:"Warning"})}
  ${e({value:23,color:"danger",label:"Danger"})}
  ${e({value:91,color:"info",label:"Info"})}
</div>
  `},n={render:()=>`
<div class="d-flex gap-4 flex-wrap align-items-end">
  ${e({value:65,size:60,label:"60px"})}
  ${e({value:65,size:90,label:"90px"})}
  ${e({value:65,size:120,label:"120px"})}
  ${e({value:65,size:150,label:"150px"})}
  ${e({value:65,size:180,label:"180px"})}
</div>
  `},r={render:()=>`
<div class="d-flex gap-5 flex-wrap">
  <div class="text-center">
    ${e({value:85,color:"success",size:100})}
    <p class="mt-2 mb-0 fw-semibold">Completed</p>
    <small class="text-muted">Tasks</small>
  </div>
  <div class="text-center">
    ${e({value:42,color:"warning",size:100})}
    <p class="mt-2 mb-0 fw-semibold">In Progress</p>
    <small class="text-muted">Projects</small>
  </div>
  <div class="text-center">
    ${e({value:12,color:"danger",size:100})}
    <p class="mt-2 mb-0 fw-semibold">Overdue</p>
    <small class="text-muted">Items</small>
  </div>
</div>
  `},l={render:()=>`
<div class="row g-4">
  <div class="col-md-4">
    <div class="card">
      <div class="card-body text-center">
        <h6 class="card-title">CPU Usage</h6>
        ${e({value:73,color:"primary",size:100})}
        <p class="mt-3 mb-0">
          <span class="badge bg-label-primary">Normal</span>
        </p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-body text-center">
        <h6 class="card-title">Memory</h6>
        ${e({value:89,color:"warning",size:100})}
        <p class="mt-3 mb-0">
          <span class="badge bg-label-warning">High</span>
        </p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-body text-center">
        <h6 class="card-title">Disk</h6>
        ${e({value:45,color:"success",size:100})}
        <p class="mt-3 mb-0">
          <span class="badge bg-label-success">Good</span>
        </p>
      </div>
    </div>
  </div>
</div>
  `},i={name:"Support Tracker Style",render:()=>`
<div class="card" style="max-width: 400px;">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-start mb-3">
      <div>
        <h5 class="card-title mb-1">Support Tracker</h5>
        <small class="text-muted">Last 7 Days</small>
      </div>
    </div>
    
    <div class="row align-items-center">
      <div class="col-6">
        <h2 class="mb-0">164</h2>
        <p class="text-muted mb-4">Total Tickets</p>
        
        <div class="mb-3">
          <div class="d-flex align-items-center mb-2">
            <i class="ti ti-ticket text-primary me-2"></i>
            <span class="me-auto">New Tickets</span>
            <strong>142</strong>
          </div>
          <div class="d-flex align-items-center mb-2">
            <i class="ti ti-circle-check text-success me-2"></i>
            <span class="me-auto">Open Tickets</span>
            <strong>28</strong>
          </div>
          <div class="d-flex align-items-center">
            <i class="ti ti-clock text-warning me-2"></i>
            <span class="me-auto">Response Time</span>
            <strong>1 Day</strong>
          </div>
        </div>
      </div>
      
      <div class="col-6 text-center">
        <div class="position-relative d-inline-block" style="width: 140px; height: 140px;">
          <svg viewBox="0 0 36 36" style="transform: rotate(-90deg); width: 100%; height: 100%;">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e9ecef" stroke-width="3"/>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#7367f0" stroke-width="3" 
                    stroke-dasharray="85, 100" stroke-linecap="round"/>
          </svg>
          <div class="position-absolute top-50 start-50 translate-middle text-center">
            <h3 class="mb-0">85%</h3>
            <small class="text-muted">Completed</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `},c={render:()=>`
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Project Status</h5>
  </div>
  <div class="card-body">
    <div class="row text-center">
      <div class="col-3">
        ${e({value:100,color:"success",size:80})}
        <p class="mt-2 mb-0 small fw-medium">Done</p>
        <small class="text-muted">12 tasks</small>
      </div>
      <div class="col-3">
        ${e({value:65,color:"primary",size:80})}
        <p class="mt-2 mb-0 small fw-medium">In Progress</p>
        <small class="text-muted">8 tasks</small>
      </div>
      <div class="col-3">
        ${e({value:30,color:"warning",size:80})}
        <p class="mt-2 mb-0 small fw-medium">Review</p>
        <small class="text-muted">5 tasks</small>
      </div>
      <div class="col-3">
        ${e({value:15,color:"danger",size:80})}
        <p class="mt-2 mb-0 small fw-medium">Blocked</p>
        <small class="text-muted">2 tasks</small>
      </div>
    </div>
  </div>
</div>
  `},d={name:"Semi-Circle Gauge",render:()=>`
<div class="d-flex gap-5 flex-wrap">
  <div class="text-center">
    <div style="width: 150px; height: 75px; overflow: hidden;">
      <div style="width: 150px; height: 150px;">
        <svg viewBox="0 0 36 36" style="transform: rotate(-90deg); width: 100%; height: 100%;">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e9ecef" stroke-width="3" 
                  stroke-dasharray="50, 100"/>
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#7367f0" stroke-width="3" 
                  stroke-dasharray="35, 100" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <h4 class="mb-0">70%</h4>
    <small class="text-muted">Completion Rate</small>
  </div>
  
  <div class="text-center">
    <div style="width: 150px; height: 75px; overflow: hidden;">
      <div style="width: 150px; height: 150px;">
        <svg viewBox="0 0 36 36" style="transform: rotate(-90deg); width: 100%; height: 100%;">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e9ecef" stroke-width="3" 
                  stroke-dasharray="50, 100"/>
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#28c76f" stroke-width="3" 
                  stroke-dasharray="45, 100" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <h4 class="mb-0">90%</h4>
    <small class="text-muted">Success Rate</small>
  </div>
</div>
  `},o={render:()=>`
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Ajustar Progresso</h5>
  </div>
  <div class="card-body">
    <div class="row align-items-center">
      <div class="col-md-6 text-center mb-4 mb-md-0">
        <div id="interactive-gauge" class="position-relative d-inline-block" style="width: 180px; height: 180px;">
          <svg viewBox="0 0 36 36" style="transform: rotate(-90deg); width: 100%; height: 100%;">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e9ecef" stroke-width="3"/>
            <circle id="progress-circle" cx="18" cy="18" r="15.9" fill="none" stroke="#7367f0" stroke-width="3" 
                    stroke-dasharray="50, 100" stroke-linecap="round" style="transition: stroke-dasharray 0.3s ease;"/>
          </svg>
          <div class="position-absolute top-50 start-50 translate-middle text-center">
            <h2 id="progress-value" class="mb-0">50%</h2>
            <small class="text-muted">Progress</small>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <label class="form-label">Valor: <span id="range-value">50</span>%</label>
        <input type="range" class="form-range" min="0" max="100" value="50" id="progress-range" oninput="
          const value = this.value;
          document.getElementById('range-value').textContent = value;
          document.getElementById('progress-value').textContent = value + '%';
          document.getElementById('progress-circle').setAttribute('stroke-dasharray', value + ', 100');
        ">
        
        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-outline-primary btn-sm" onclick="
            const range = document.getElementById('progress-range');
            range.value = 25;
            range.dispatchEvent(new Event('input'));
          ">25%</button>
          <button class="btn btn-outline-primary btn-sm" onclick="
            const range = document.getElementById('progress-range');
            range.value = 50;
            range.dispatchEvent(new Event('input'));
          ">50%</button>
          <button class="btn btn-outline-primary btn-sm" onclick="
            const range = document.getElementById('progress-range');
            range.value = 75;
            range.dispatchEvent(new Event('input'));
          ">75%</button>
          <button class="btn btn-outline-primary btn-sm" onclick="
            const range = document.getElementById('progress-range');
            range.value = 100;
            range.dispatchEvent(new Event('input'));
          ">100%</button>
        </div>
      </div>
    </div>
  </div>
</div>
  `};var b,h,x;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    value: 75,
    size: 120,
    color: 'primary',
    label: ''
  },
  render: args => createRadialProgress(args)
}`,...(x=(h=a.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var y,w,f;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex gap-4 flex-wrap">
  \${createRadialProgress({
    value: 85,
    color: 'primary',
    label: 'Primary'
  })}
  \${createRadialProgress({
    value: 72,
    color: 'success',
    label: 'Success'
  })}
  \${createRadialProgress({
    value: 45,
    color: 'warning',
    label: 'Warning'
  })}
  \${createRadialProgress({
    value: 23,
    color: 'danger',
    label: 'Danger'
  })}
  \${createRadialProgress({
    value: 91,
    color: 'info',
    label: 'Info'
  })}
</div>
  \`
}`,...(f=(w=t.parameters)==null?void 0:w.docs)==null?void 0:f.source}}};var k,$,P;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex gap-4 flex-wrap align-items-end">
  \${createRadialProgress({
    value: 65,
    size: 60,
    label: '60px'
  })}
  \${createRadialProgress({
    value: 65,
    size: 90,
    label: '90px'
  })}
  \${createRadialProgress({
    value: 65,
    size: 120,
    label: '120px'
  })}
  \${createRadialProgress({
    value: 65,
    size: 150,
    label: '150px'
  })}
  \${createRadialProgress({
    value: 65,
    size: 180,
    label: '180px'
  })}
</div>
  \`
}`,...(P=($=n.parameters)==null?void 0:$.docs)==null?void 0:P.source}}};var z,R,S;r.parameters={...r.parameters,docs:{...(z=r.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
<div class="d-flex gap-5 flex-wrap">
  <div class="text-center">
    \${createRadialProgress({
    value: 85,
    color: 'success',
    size: 100
  })}
    <p class="mt-2 mb-0 fw-semibold">Completed</p>
    <small class="text-muted">Tasks</small>
  </div>
  <div class="text-center">
    \${createRadialProgress({
    value: 42,
    color: 'warning',
    size: 100
  })}
    <p class="mt-2 mb-0 fw-semibold">In Progress</p>
    <small class="text-muted">Projects</small>
  </div>
  <div class="text-center">
    \${createRadialProgress({
    value: 12,
    color: 'danger',
    size: 100
  })}
    <p class="mt-2 mb-0 fw-semibold">Overdue</p>
    <small class="text-muted">Items</small>
  </div>
</div>
  \`
}`,...(S=(R=r.parameters)==null?void 0:R.docs)==null?void 0:S.source}}};var E,I,B;l.parameters={...l.parameters,docs:{...(E=l.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
<div class="row g-4">
  <div class="col-md-4">
    <div class="card">
      <div class="card-body text-center">
        <h6 class="card-title">CPU Usage</h6>
        \${createRadialProgress({
    value: 73,
    color: 'primary',
    size: 100
  })}
        <p class="mt-3 mb-0">
          <span class="badge bg-label-primary">Normal</span>
        </p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-body text-center">
        <h6 class="card-title">Memory</h6>
        \${createRadialProgress({
    value: 89,
    color: 'warning',
    size: 100
  })}
        <p class="mt-3 mb-0">
          <span class="badge bg-label-warning">High</span>
        </p>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-body text-center">
        <h6 class="card-title">Disk</h6>
        \${createRadialProgress({
    value: 45,
    color: 'success',
    size: 100
  })}
        <p class="mt-3 mb-0">
          <span class="badge bg-label-success">Good</span>
        </p>
      </div>
    </div>
  </div>
</div>
  \`
}`,...(B=(I=l.parameters)==null?void 0:I.docs)==null?void 0:B.source}}};var C,T,D;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  name: 'Support Tracker Style',
  render: () => \`
<div class="card" style="max-width: 400px;">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-start mb-3">
      <div>
        <h5 class="card-title mb-1">Support Tracker</h5>
        <small class="text-muted">Last 7 Days</small>
      </div>
    </div>
    
    <div class="row align-items-center">
      <div class="col-6">
        <h2 class="mb-0">164</h2>
        <p class="text-muted mb-4">Total Tickets</p>
        
        <div class="mb-3">
          <div class="d-flex align-items-center mb-2">
            <i class="ti ti-ticket text-primary me-2"></i>
            <span class="me-auto">New Tickets</span>
            <strong>142</strong>
          </div>
          <div class="d-flex align-items-center mb-2">
            <i class="ti ti-circle-check text-success me-2"></i>
            <span class="me-auto">Open Tickets</span>
            <strong>28</strong>
          </div>
          <div class="d-flex align-items-center">
            <i class="ti ti-clock text-warning me-2"></i>
            <span class="me-auto">Response Time</span>
            <strong>1 Day</strong>
          </div>
        </div>
      </div>
      
      <div class="col-6 text-center">
        <div class="position-relative d-inline-block" style="width: 140px; height: 140px;">
          <svg viewBox="0 0 36 36" style="transform: rotate(-90deg); width: 100%; height: 100%;">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e9ecef" stroke-width="3"/>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#7367f0" stroke-width="3" 
                    stroke-dasharray="85, 100" stroke-linecap="round"/>
          </svg>
          <div class="position-absolute top-50 start-50 translate-middle text-center">
            <h3 class="mb-0">85%</h3>
            <small class="text-muted">Completed</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  \`
}`,...(D=(T=i.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var j,M,A;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Project Status</h5>
  </div>
  <div class="card-body">
    <div class="row text-center">
      <div class="col-3">
        \${createRadialProgress({
    value: 100,
    color: 'success',
    size: 80
  })}
        <p class="mt-2 mb-0 small fw-medium">Done</p>
        <small class="text-muted">12 tasks</small>
      </div>
      <div class="col-3">
        \${createRadialProgress({
    value: 65,
    color: 'primary',
    size: 80
  })}
        <p class="mt-2 mb-0 small fw-medium">In Progress</p>
        <small class="text-muted">8 tasks</small>
      </div>
      <div class="col-3">
        \${createRadialProgress({
    value: 30,
    color: 'warning',
    size: 80
  })}
        <p class="mt-2 mb-0 small fw-medium">Review</p>
        <small class="text-muted">5 tasks</small>
      </div>
      <div class="col-3">
        \${createRadialProgress({
    value: 15,
    color: 'danger',
    size: 80
  })}
        <p class="mt-2 mb-0 small fw-medium">Blocked</p>
        <small class="text-muted">2 tasks</small>
      </div>
    </div>
  </div>
</div>
  \`
}`,...(A=(M=c.parameters)==null?void 0:M.docs)==null?void 0:A.source}}};var G,L,O;d.parameters={...d.parameters,docs:{...(G=d.parameters)==null?void 0:G.docs,source:{originalSource:`{
  name: 'Semi-Circle Gauge',
  render: () => \`
<div class="d-flex gap-5 flex-wrap">
  <div class="text-center">
    <div style="width: 150px; height: 75px; overflow: hidden;">
      <div style="width: 150px; height: 150px;">
        <svg viewBox="0 0 36 36" style="transform: rotate(-90deg); width: 100%; height: 100%;">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e9ecef" stroke-width="3" 
                  stroke-dasharray="50, 100"/>
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#7367f0" stroke-width="3" 
                  stroke-dasharray="35, 100" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <h4 class="mb-0">70%</h4>
    <small class="text-muted">Completion Rate</small>
  </div>
  
  <div class="text-center">
    <div style="width: 150px; height: 75px; overflow: hidden;">
      <div style="width: 150px; height: 150px;">
        <svg viewBox="0 0 36 36" style="transform: rotate(-90deg); width: 100%; height: 100%;">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e9ecef" stroke-width="3" 
                  stroke-dasharray="50, 100"/>
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#28c76f" stroke-width="3" 
                  stroke-dasharray="45, 100" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
    <h4 class="mb-0">90%</h4>
    <small class="text-muted">Success Rate</small>
  </div>
</div>
  \`
}`,...(O=(L=d.parameters)==null?void 0:L.docs)==null?void 0:O.source}}};var N,U,V;o.parameters={...o.parameters,docs:{...(N=o.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => \`
<div class="card">
  <div class="card-header">
    <h5 class="card-title mb-0">Ajustar Progresso</h5>
  </div>
  <div class="card-body">
    <div class="row align-items-center">
      <div class="col-md-6 text-center mb-4 mb-md-0">
        <div id="interactive-gauge" class="position-relative d-inline-block" style="width: 180px; height: 180px;">
          <svg viewBox="0 0 36 36" style="transform: rotate(-90deg); width: 100%; height: 100%;">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e9ecef" stroke-width="3"/>
            <circle id="progress-circle" cx="18" cy="18" r="15.9" fill="none" stroke="#7367f0" stroke-width="3" 
                    stroke-dasharray="50, 100" stroke-linecap="round" style="transition: stroke-dasharray 0.3s ease;"/>
          </svg>
          <div class="position-absolute top-50 start-50 translate-middle text-center">
            <h2 id="progress-value" class="mb-0">50%</h2>
            <small class="text-muted">Progress</small>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <label class="form-label">Valor: <span id="range-value">50</span>%</label>
        <input type="range" class="form-range" min="0" max="100" value="50" id="progress-range" oninput="
          const value = this.value;
          document.getElementById('range-value').textContent = value;
          document.getElementById('progress-value').textContent = value + '%';
          document.getElementById('progress-circle').setAttribute('stroke-dasharray', value + ', 100');
        ">
        
        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-outline-primary btn-sm" onclick="
            const range = document.getElementById('progress-range');
            range.value = 25;
            range.dispatchEvent(new Event('input'));
          ">25%</button>
          <button class="btn btn-outline-primary btn-sm" onclick="
            const range = document.getElementById('progress-range');
            range.value = 50;
            range.dispatchEvent(new Event('input'));
          ">50%</button>
          <button class="btn btn-outline-primary btn-sm" onclick="
            const range = document.getElementById('progress-range');
            range.value = 75;
            range.dispatchEvent(new Event('input'));
          ">75%</button>
          <button class="btn btn-outline-primary btn-sm" onclick="
            const range = document.getElementById('progress-range');
            range.value = 100;
            range.dispatchEvent(new Event('input'));
          ">100%</button>
        </div>
      </div>
    </div>
  </div>
</div>
  \`
}`,...(V=(U=o.parameters)==null?void 0:U.docs)==null?void 0:V.source}}};const q=["Default","AllColors","Sizes","WithLabels","InCards","SupportTrackerStyle","MultipleGauges","SemiCircle","Interactive"];export{t as AllColors,a as Default,l as InCards,o as Interactive,c as MultipleGauges,d as SemiCircle,n as Sizes,i as SupportTrackerStyle,r as WithLabels,q as __namedExportsOrder,F as default};
