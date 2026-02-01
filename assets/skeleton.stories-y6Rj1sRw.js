const V={title:"Educacross/Components/Skeleton",parameters:{layout:"padded",docs:{description:{component:`Skeleton Loader - Placeholders de carregamento

Para exibir enquanto o conteúdo está carregando`}}}},e=`
  <style>
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 4px;
    }
    
    @keyframes skeleton-loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    
    .skeleton-circle {
      border-radius: 50%;
    }
    
    .skeleton-text {
      height: 16px;
      margin-bottom: 8px;
    }
    
    .skeleton-text-sm {
      height: 12px;
      margin-bottom: 6px;
    }
    
    .skeleton-heading {
      height: 24px;
      margin-bottom: 12px;
    }
  </style>
`,s={render:()=>`
    ${e}
    <div>
      <h5 class="mb-4">Elementos Básicos de Skeleton</h5>
      
      <div class="d-flex flex-column gap-4" style="max-width: 400px;">
        <!-- Text lines -->
        <div>
          <h6 class="text-muted mb-3">Linhas de Texto</h6>
          <div class="skeleton skeleton-heading" style="width: 60%;"></div>
          <div class="skeleton skeleton-text" style="width: 100%;"></div>
          <div class="skeleton skeleton-text" style="width: 100%;"></div>
          <div class="skeleton skeleton-text" style="width: 80%;"></div>
        </div>
        
        <!-- Circles -->
        <div>
          <h6 class="text-muted mb-3">Círculos (Avatares)</h6>
          <div class="d-flex gap-3">
            <div class="skeleton skeleton-circle" style="width: 32px; height: 32px;"></div>
            <div class="skeleton skeleton-circle" style="width: 40px; height: 40px;"></div>
            <div class="skeleton skeleton-circle" style="width: 48px; height: 48px;"></div>
            <div class="skeleton skeleton-circle" style="width: 64px; height: 64px;"></div>
          </div>
        </div>
        
        <!-- Rectangles -->
        <div>
          <h6 class="text-muted mb-3">Retângulos</h6>
          <div class="d-flex gap-3">
            <div class="skeleton" style="width: 80px; height: 30px; border-radius: 4px;"></div>
            <div class="skeleton" style="width: 100px; height: 30px; border-radius: 20px;"></div>
            <div class="skeleton" style="width: 60px; height: 60px; border-radius: 8px;"></div>
          </div>
        </div>
      </div>
    </div>
  `},t={render:()=>`
    ${e}
    <div>
      <h5 class="mb-4">Cards em Carregamento</h5>
      
      <div class="row g-3">
        <!-- Card simples -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center gap-3 mb-3">
                <div class="skeleton skeleton-circle" style="width: 48px; height: 48px;"></div>
                <div class="flex-grow-1">
                  <div class="skeleton skeleton-text" style="width: 70%;"></div>
                  <div class="skeleton skeleton-text-sm" style="width: 50%;"></div>
                </div>
              </div>
              <div class="skeleton skeleton-text" style="width: 100%;"></div>
              <div class="skeleton skeleton-text" style="width: 90%;"></div>
              <div class="skeleton skeleton-text" style="width: 60%;"></div>
            </div>
          </div>
        </div>
        
        <!-- Card com imagem -->
        <div class="col-md-4">
          <div class="card">
            <div class="skeleton" style="height: 150px; border-radius: 4px 4px 0 0;"></div>
            <div class="card-body">
              <div class="skeleton skeleton-heading" style="width: 80%;"></div>
              <div class="skeleton skeleton-text" style="width: 100%;"></div>
              <div class="skeleton skeleton-text" style="width: 70%;"></div>
              <div class="skeleton" style="width: 100px; height: 36px; margin-top: 12px;"></div>
            </div>
          </div>
        </div>
        
        <!-- Stat card -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-body text-center">
              <div class="skeleton skeleton-circle mx-auto mb-3" style="width: 64px; height: 64px;"></div>
              <div class="skeleton skeleton-heading mx-auto" style="width: 60%;"></div>
              <div class="skeleton skeleton-text mx-auto" style="width: 40%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},i={render:()=>`
    ${e}
    <div style="max-width: 500px;">
      <h5 class="mb-4">Lista em Carregamento</h5>
      
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div class="skeleton" style="width: 120px; height: 20px;"></div>
          <div class="skeleton" style="width: 60px; height: 24px; border-radius: 12px;"></div>
        </div>
        <ul class="list-group list-group-flush">
          ${[1,2,3,4,5].map(()=>`
            <li class="list-group-item d-flex align-items-center gap-3">
              <div class="skeleton skeleton-circle" style="width: 40px; height: 40px;"></div>
              <div class="flex-grow-1">
                <div class="skeleton skeleton-text" style="width: 60%;"></div>
                <div class="skeleton skeleton-text-sm" style="width: 40%;"></div>
              </div>
              <div class="skeleton" style="width: 50px; height: 24px; border-radius: 4px;"></div>
            </li>
          `).join("")}
        </ul>
      </div>
    </div>
  `},d={render:()=>`
    ${e}
    <div>
      <h5 class="mb-4">Tabela em Carregamento</h5>
      
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div class="skeleton" style="width: 150px; height: 20px;"></div>
          <div class="d-flex gap-2">
            <div class="skeleton" style="width: 120px; height: 36px; border-radius: 4px;"></div>
            <div class="skeleton" style="width: 100px; height: 36px; border-radius: 4px;"></div>
          </div>
        </div>
        <table class="table mb-0">
          <thead>
            <tr>
              <th><div class="skeleton" style="width: 100px; height: 16px;"></div></th>
              <th><div class="skeleton" style="width: 80px; height: 16px;"></div></th>
              <th><div class="skeleton" style="width: 100px; height: 16px;"></div></th>
              <th><div class="skeleton" style="width: 60px; height: 16px;"></div></th>
            </tr>
          </thead>
          <tbody>
            ${[1,2,3,4,5].map(()=>`
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <div class="skeleton skeleton-circle" style="width: 32px; height: 32px;"></div>
                    <div class="skeleton" style="width: 120px; height: 14px;"></div>
                  </div>
                </td>
                <td><div class="skeleton" style="width: 80px; height: 14px;"></div></td>
                <td><div class="skeleton" style="width: 100%; height: 8px; border-radius: 4px;"></div></td>
                <td><div class="skeleton" style="width: 60px; height: 24px; border-radius: 12px;"></div></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `},l={render:()=>`
    ${e}
    <div style="max-width: 400px;">
      <h5 class="mb-4">Perfil em Carregamento</h5>
      
      <div class="card">
        <div class="card-body text-center">
          <div class="skeleton skeleton-circle mx-auto mb-3" style="width: 96px; height: 96px;"></div>
          <div class="skeleton skeleton-heading mx-auto mb-1" style="width: 60%;"></div>
          <div class="skeleton skeleton-text mx-auto mb-4" style="width: 40%;"></div>
          
          <hr>
          
          <div class="row text-center">
            <div class="col">
              <div class="skeleton skeleton-heading mx-auto" style="width: 50px;"></div>
              <div class="skeleton skeleton-text-sm mx-auto" style="width: 60px;"></div>
            </div>
            <div class="col">
              <div class="skeleton skeleton-heading mx-auto" style="width: 50px;"></div>
              <div class="skeleton skeleton-text-sm mx-auto" style="width: 60px;"></div>
            </div>
            <div class="col">
              <div class="skeleton skeleton-heading mx-auto" style="width: 50px;"></div>
              <div class="skeleton skeleton-text-sm mx-auto" style="width: 60px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},n={render:()=>`
    ${e}
    <div>
      <h5 class="mb-4">Dashboard em Carregamento</h5>
      
      <!-- Stat cards -->
      <div class="row g-3 mb-4">
        ${[1,2,3,4].map(()=>`
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <div class="skeleton skeleton-text-sm" style="width: 80px;"></div>
                    <div class="skeleton" style="width: 60px; height: 32px; margin-top: 8px;"></div>
                  </div>
                  <div class="skeleton skeleton-circle" style="width: 48px; height: 48px;"></div>
                </div>
                <div class="skeleton" style="width: 100%; height: 4px; margin-top: 16px; border-radius: 2px;"></div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
      
      <!-- Charts -->
      <div class="row g-3">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <div class="skeleton" style="width: 150px; height: 20px;"></div>
            </div>
            <div class="card-body">
              <div class="skeleton" style="width: 100%; height: 250px; border-radius: 8px;"></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <div class="skeleton" style="width: 120px; height: 20px;"></div>
            </div>
            <div class="card-body text-center">
              <div class="skeleton skeleton-circle mx-auto" style="width: 150px; height: 150px;"></div>
              <div class="d-flex justify-content-center gap-3 mt-3">
                <div class="skeleton" style="width: 60px; height: 16px;"></div>
                <div class="skeleton" style="width: 60px; height: 16px;"></div>
                <div class="skeleton" style="width: 60px; height: 16px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},a={render:()=>`
    ${e}
    <div>
      <h5 class="mb-4">Cards de Jogos</h5>
      
      <div class="row g-3">
        ${[1,2,3].map(()=>`
          <div class="col-md-4">
            <div class="card">
              <div class="skeleton" style="height: 160px; border-radius: 4px 4px 0 0;"></div>
              <div class="card-body">
                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="skeleton skeleton-circle" style="width: 24px; height: 24px;"></div>
                  <div class="skeleton" style="width: 80px; height: 16px;"></div>
                </div>
                <div class="skeleton skeleton-heading" style="width: 80%;"></div>
                <div class="skeleton skeleton-text" style="width: 100%;"></div>
                <div class="skeleton skeleton-text" style="width: 60%;"></div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <div class="d-flex gap-1">
                    ${[1,2,3].map(()=>'<div class="skeleton" style="width: 16px; height: 16px;"></div>').join("")}
                  </div>
                  <div class="skeleton" style="width: 80px; height: 32px; border-radius: 4px;"></div>
                </div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `},o={render:()=>`
    ${e}
    <div style="max-width: 500px;">
      <h5 class="mb-4">Skeleton Inline</h5>
      
      <div class="card mb-3">
        <div class="card-body">
          <p>
            O aluno <span class="skeleton d-inline-block" style="width: 100px; height: 16px; vertical-align: middle;"></span>
            completou <span class="skeleton d-inline-block" style="width: 30px; height: 16px; vertical-align: middle;"></span>
            atividades e ganhou <span class="skeleton d-inline-block" style="width: 50px; height: 16px; vertical-align: middle;"></span> pontos.
          </p>
        </div>
      </div>
      
      <div class="d-flex align-items-center gap-3 p-3 bg-light rounded">
        <span>Progresso:</span>
        <div class="skeleton flex-grow-1" style="height: 8px; border-radius: 4px;"></div>
        <span class="skeleton" style="width: 40px; height: 20px;"></span>
      </div>
    </div>
  `};var c,v,r,h,p;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => \`
    \${skeletonStyles}
    <div>
      <h5 class="mb-4">Elementos Básicos de Skeleton</h5>
      
      <div class="d-flex flex-column gap-4" style="max-width: 400px;">
        <!-- Text lines -->
        <div>
          <h6 class="text-muted mb-3">Linhas de Texto</h6>
          <div class="skeleton skeleton-heading" style="width: 60%;"></div>
          <div class="skeleton skeleton-text" style="width: 100%;"></div>
          <div class="skeleton skeleton-text" style="width: 100%;"></div>
          <div class="skeleton skeleton-text" style="width: 80%;"></div>
        </div>
        
        <!-- Circles -->
        <div>
          <h6 class="text-muted mb-3">Círculos (Avatares)</h6>
          <div class="d-flex gap-3">
            <div class="skeleton skeleton-circle" style="width: 32px; height: 32px;"></div>
            <div class="skeleton skeleton-circle" style="width: 40px; height: 40px;"></div>
            <div class="skeleton skeleton-circle" style="width: 48px; height: 48px;"></div>
            <div class="skeleton skeleton-circle" style="width: 64px; height: 64px;"></div>
          </div>
        </div>
        
        <!-- Rectangles -->
        <div>
          <h6 class="text-muted mb-3">Retângulos</h6>
          <div class="d-flex gap-3">
            <div class="skeleton" style="width: 80px; height: 30px; border-radius: 4px;"></div>
            <div class="skeleton" style="width: 100px; height: 30px; border-radius: 20px;"></div>
            <div class="skeleton" style="width: 60px; height: 60px; border-radius: 8px;"></div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(r=(v=s.parameters)==null?void 0:v.docs)==null?void 0:r.source},description:{story:"Basic - Elementos básicos",...(p=(h=s.parameters)==null?void 0:h.docs)==null?void 0:p.description}}};var x,k,m,g,y;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    \${skeletonStyles}
    <div>
      <h5 class="mb-4">Cards em Carregamento</h5>
      
      <div class="row g-3">
        <!-- Card simples -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center gap-3 mb-3">
                <div class="skeleton skeleton-circle" style="width: 48px; height: 48px;"></div>
                <div class="flex-grow-1">
                  <div class="skeleton skeleton-text" style="width: 70%;"></div>
                  <div class="skeleton skeleton-text-sm" style="width: 50%;"></div>
                </div>
              </div>
              <div class="skeleton skeleton-text" style="width: 100%;"></div>
              <div class="skeleton skeleton-text" style="width: 90%;"></div>
              <div class="skeleton skeleton-text" style="width: 60%;"></div>
            </div>
          </div>
        </div>
        
        <!-- Card com imagem -->
        <div class="col-md-4">
          <div class="card">
            <div class="skeleton" style="height: 150px; border-radius: 4px 4px 0 0;"></div>
            <div class="card-body">
              <div class="skeleton skeleton-heading" style="width: 80%;"></div>
              <div class="skeleton skeleton-text" style="width: 100%;"></div>
              <div class="skeleton skeleton-text" style="width: 70%;"></div>
              <div class="skeleton" style="width: 100px; height: 36px; margin-top: 12px;"></div>
            </div>
          </div>
        </div>
        
        <!-- Stat card -->
        <div class="col-md-4">
          <div class="card">
            <div class="card-body text-center">
              <div class="skeleton skeleton-circle mx-auto mb-3" style="width: 64px; height: 64px;"></div>
              <div class="skeleton skeleton-heading mx-auto" style="width: 60%;"></div>
              <div class="skeleton skeleton-text mx-auto" style="width: 40%;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(m=(k=t.parameters)==null?void 0:k.docs)==null?void 0:m.source},description:{story:"CardSkeleton - Card em carregamento",...(y=(g=t.parameters)==null?void 0:g.docs)==null?void 0:y.description}}};var w,b,u,f,S;i.parameters={...i.parameters,docs:{...(w=i.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    \${skeletonStyles}
    <div style="max-width: 500px;">
      <h5 class="mb-4">Lista em Carregamento</h5>
      
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div class="skeleton" style="width: 120px; height: 20px;"></div>
          <div class="skeleton" style="width: 60px; height: 24px; border-radius: 12px;"></div>
        </div>
        <ul class="list-group list-group-flush">
          \${[1, 2, 3, 4, 5].map(() => \`
            <li class="list-group-item d-flex align-items-center gap-3">
              <div class="skeleton skeleton-circle" style="width: 40px; height: 40px;"></div>
              <div class="flex-grow-1">
                <div class="skeleton skeleton-text" style="width: 60%;"></div>
                <div class="skeleton skeleton-text-sm" style="width: 40%;"></div>
              </div>
              <div class="skeleton" style="width: 50px; height: 24px; border-radius: 4px;"></div>
            </li>
          \`).join('')}
        </ul>
      </div>
    </div>
  \`
}`,...(u=(b=i.parameters)==null?void 0:b.docs)==null?void 0:u.source},description:{story:"ListSkeleton - Lista em carregamento",...(S=(f=i.parameters)==null?void 0:f.docs)==null?void 0:S.description}}};var C,$,j,E,P;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => \`
    \${skeletonStyles}
    <div>
      <h5 class="mb-4">Tabela em Carregamento</h5>
      
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div class="skeleton" style="width: 150px; height: 20px;"></div>
          <div class="d-flex gap-2">
            <div class="skeleton" style="width: 120px; height: 36px; border-radius: 4px;"></div>
            <div class="skeleton" style="width: 100px; height: 36px; border-radius: 4px;"></div>
          </div>
        </div>
        <table class="table mb-0">
          <thead>
            <tr>
              <th><div class="skeleton" style="width: 100px; height: 16px;"></div></th>
              <th><div class="skeleton" style="width: 80px; height: 16px;"></div></th>
              <th><div class="skeleton" style="width: 100px; height: 16px;"></div></th>
              <th><div class="skeleton" style="width: 60px; height: 16px;"></div></th>
            </tr>
          </thead>
          <tbody>
            \${[1, 2, 3, 4, 5].map(() => \`
              <tr>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <div class="skeleton skeleton-circle" style="width: 32px; height: 32px;"></div>
                    <div class="skeleton" style="width: 120px; height: 14px;"></div>
                  </div>
                </td>
                <td><div class="skeleton" style="width: 80px; height: 14px;"></div></td>
                <td><div class="skeleton" style="width: 100%; height: 8px; border-radius: 4px;"></div></td>
                <td><div class="skeleton" style="width: 60px; height: 24px; border-radius: 12px;"></div></td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  \`
}`,...(j=($=d.parameters)==null?void 0:$.docs)==null?void 0:j.source},description:{story:"TableSkeleton - Tabela em carregamento",...(P=(E=d.parameters)==null?void 0:E.docs)==null?void 0:P.description}}};var T,L,D,B,I;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
    \${skeletonStyles}
    <div style="max-width: 400px;">
      <h5 class="mb-4">Perfil em Carregamento</h5>
      
      <div class="card">
        <div class="card-body text-center">
          <div class="skeleton skeleton-circle mx-auto mb-3" style="width: 96px; height: 96px;"></div>
          <div class="skeleton skeleton-heading mx-auto mb-1" style="width: 60%;"></div>
          <div class="skeleton skeleton-text mx-auto mb-4" style="width: 40%;"></div>
          
          <hr>
          
          <div class="row text-center">
            <div class="col">
              <div class="skeleton skeleton-heading mx-auto" style="width: 50px;"></div>
              <div class="skeleton skeleton-text-sm mx-auto" style="width: 60px;"></div>
            </div>
            <div class="col">
              <div class="skeleton skeleton-heading mx-auto" style="width: 50px;"></div>
              <div class="skeleton skeleton-text-sm mx-auto" style="width: 60px;"></div>
            </div>
            <div class="col">
              <div class="skeleton skeleton-heading mx-auto" style="width: 50px;"></div>
              <div class="skeleton skeleton-text-sm mx-auto" style="width: 60px;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(D=(L=l.parameters)==null?void 0:L.docs)==null?void 0:D.source},description:{story:"ProfileSkeleton - Perfil em carregamento",...(I=(B=l.parameters)==null?void 0:B.docs)==null?void 0:I.description}}};var R,A,G,O,_;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => \`
    \${skeletonStyles}
    <div>
      <h5 class="mb-4">Dashboard em Carregamento</h5>
      
      <!-- Stat cards -->
      <div class="row g-3 mb-4">
        \${[1, 2, 3, 4].map(() => \`
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <div class="skeleton skeleton-text-sm" style="width: 80px;"></div>
                    <div class="skeleton" style="width: 60px; height: 32px; margin-top: 8px;"></div>
                  </div>
                  <div class="skeleton skeleton-circle" style="width: 48px; height: 48px;"></div>
                </div>
                <div class="skeleton" style="width: 100%; height: 4px; margin-top: 16px; border-radius: 2px;"></div>
              </div>
            </div>
          </div>
        \`).join('')}
      </div>
      
      <!-- Charts -->
      <div class="row g-3">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">
              <div class="skeleton" style="width: 150px; height: 20px;"></div>
            </div>
            <div class="card-body">
              <div class="skeleton" style="width: 100%; height: 250px; border-radius: 8px;"></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <div class="skeleton" style="width: 120px; height: 20px;"></div>
            </div>
            <div class="card-body text-center">
              <div class="skeleton skeleton-circle mx-auto" style="width: 150px; height: 150px;"></div>
              <div class="d-flex justify-content-center gap-3 mt-3">
                <div class="skeleton" style="width: 60px; height: 16px;"></div>
                <div class="skeleton" style="width: 60px; height: 16px;"></div>
                <div class="skeleton" style="width: 60px; height: 16px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(G=(A=n.parameters)==null?void 0:A.docs)==null?void 0:G.source},description:{story:"DashboardSkeleton - Dashboard em carregamento",...(_=(O=n.parameters)==null?void 0:O.docs)==null?void 0:_.description}}};var J,q,z,F,H;a.parameters={...a.parameters,docs:{...(J=a.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => \`
    \${skeletonStyles}
    <div>
      <h5 class="mb-4">Cards de Jogos</h5>
      
      <div class="row g-3">
        \${[1, 2, 3].map(() => \`
          <div class="col-md-4">
            <div class="card">
              <div class="skeleton" style="height: 160px; border-radius: 4px 4px 0 0;"></div>
              <div class="card-body">
                <div class="d-flex align-items-center gap-2 mb-3">
                  <div class="skeleton skeleton-circle" style="width: 24px; height: 24px;"></div>
                  <div class="skeleton" style="width: 80px; height: 16px;"></div>
                </div>
                <div class="skeleton skeleton-heading" style="width: 80%;"></div>
                <div class="skeleton skeleton-text" style="width: 100%;"></div>
                <div class="skeleton skeleton-text" style="width: 60%;"></div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <div class="d-flex gap-1">
                    \${[1, 2, 3].map(() => \`<div class="skeleton" style="width: 16px; height: 16px;"></div>\`).join('')}
                  </div>
                  <div class="skeleton" style="width: 80px; height: 32px; border-radius: 4px;"></div>
                </div>
              </div>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`
}`,...(z=(q=a.parameters)==null?void 0:q.docs)==null?void 0:z.source},description:{story:"GameCardSkeleton - Card de jogo Educacross",...(H=(F=a.parameters)==null?void 0:F.docs)==null?void 0:H.description}}};var K,M,N,Q,U;o.parameters={...o.parameters,docs:{...(K=o.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => \`
    \${skeletonStyles}
    <div style="max-width: 500px;">
      <h5 class="mb-4">Skeleton Inline</h5>
      
      <div class="card mb-3">
        <div class="card-body">
          <p>
            O aluno <span class="skeleton d-inline-block" style="width: 100px; height: 16px; vertical-align: middle;"></span>
            completou <span class="skeleton d-inline-block" style="width: 30px; height: 16px; vertical-align: middle;"></span>
            atividades e ganhou <span class="skeleton d-inline-block" style="width: 50px; height: 16px; vertical-align: middle;"></span> pontos.
          </p>
        </div>
      </div>
      
      <div class="d-flex align-items-center gap-3 p-3 bg-light rounded">
        <span>Progresso:</span>
        <div class="skeleton flex-grow-1" style="height: 8px; border-radius: 4px;"></div>
        <span class="skeleton" style="width: 40px; height: 20px;"></span>
      </div>
    </div>
  \`
}`,...(N=(M=o.parameters)==null?void 0:M.docs)==null?void 0:N.source},description:{story:"InlineSkeleton - Skeleton inline para substituir texto",...(U=(Q=o.parameters)==null?void 0:Q.docs)==null?void 0:U.description}}};const W=["Basic","CardSkeleton","ListSkeleton","TableSkeleton","ProfileSkeleton","DashboardSkeleton","GameCardSkeleton","InlineSkeleton"];export{s as Basic,t as CardSkeleton,n as DashboardSkeleton,a as GameCardSkeleton,o as InlineSkeleton,i as ListSkeleton,l as ProfileSkeleton,d as TableSkeleton,W as __namedExportsOrder,V as default};
