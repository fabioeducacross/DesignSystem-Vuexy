const I={title:"Educacross Components V2/Feedback/ZipLoading",tags:["autodocs"],parameters:{docs:{description:{component:`
## ZipLoading - Loading de Exportação Educacross (Pixel Perfect)

Componente extraído diretamente de \`educacross-frontoffice/src/components/modal/ZipLoading.vue\`.

Exibe progresso de geração de arquivos (PDFs, boletins, relatórios).

### Props do Componente Real

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`name\` | String | '' | Nome do arquivo sendo gerado |
| \`masculine\` | Boolean | false | Gênero para concordância |
| \`isReport\` | Boolean | false | Se é um boletim |

### Events

- \`@close\` - Emitido quando o download é concluído

### Estados

1. **Processando** - Barra de progresso animando
2. **Concluído** - Download pronto, opção de tentar novamente

### Integração

O componente usa Vuex para obter o percentual:
\`store.getters.GET_ADMIN_PDF_LOAD_PERCENT\`
        `}}}},s=`
<style>
  /* === ZipLoading - CSS Pixel Perfect do Frontoffice === */
  
  :root {
    --primary: #6e63e8;
    --success: #28c76f;
    --text-color: #5e5873;
  }

  .working {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: var(--text-color);
    padding: 2rem;
  }

  .working img {
    max-width: 200px;
    height: auto;
  }

  .working .title {
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: 0;
  }

  .working .title::first-letter {
    text-transform: uppercase;
  }

  .working .subtitle {
    font-size: 21px;
    font-weight: 500;
    text-align: center;
    margin-top: 24px;
    margin-bottom: 0;
    color: #6c6c6c;
  }

  .working .tryAgain {
    color: var(--primary);
    cursor: pointer;
    text-decoration: underline;
  }

  .working .tryAgain:hover {
    text-decoration: none;
  }

  .progress-container {
    width: 50%;
    text-align: center;
    margin-top: 2rem;
  }

  @media (max-width: 425px) {
    .progress-container {
      width: 100%;
    }
  }

  .progress-container .title {
    font-size: 21px;
    font-weight: 500;
    color: var(--success);
    margin-bottom: 1rem;
    margin-top: 0;
  }

  /* Progress bar */
  .progress-bar-container {
    height: 12px;
    background-color: #ebe9f1;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  .progress-bar-fill {
    height: 100%;
    background-color: var(--success);
    border-radius: 6px;
    transition: width 0.3s ease;
  }

  /* Spinner */
  .loading-spinner {
    width: 1.5rem;
    height: 1.5rem;
    border: 3px solid rgba(40, 199, 111, 0.3);
    border-top-color: var(--success);
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
    margin-top: 0.5rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Placeholder image */
  .placeholder-img {
    width: 200px;
    height: 150px;
    background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 64px;
    color: #c0c0c0;
  }

  .placeholder-img.done {
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    color: var(--success);
  }
</style>
`,e={render:()=>`
    ${s}
    <div class="p-4">
      <div class="working">
        <div class="placeholder-img">
          <span class="material-symbols-outlined">description</span>
        </div>
        <p class="title">Estamos preparando os relatórios</p>
        <p class="subtitle">
          Assim que o processamento acabar, o download será iniciado automaticamente
        </p>
        <div class="progress-container">
          <span class="title">35% dos arquivos prontos...</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 35%;"></div>
          </div>
          <div class="loading-spinner"></div>
        </div>
      </div>
    </div>
  `},i={render:()=>`
    ${s}
    <div class="p-4">
      <div class="working">
        <div class="placeholder-img">
          <span class="material-symbols-outlined">folder_zip</span>
        </div>
        <p class="title">Os boletins estão sendo preparados.</p>
        <p class="subtitle">
          Assim que o processamento acabar, os boletins serão baixados automaticamente.
        </p>
        <div class="progress-container">
          <span class="title">68% dos arquivos prontos...</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 68%;"></div>
          </div>
          <div class="loading-spinner"></div>
        </div>
      </div>
    </div>
  `},a={render:()=>`
    ${s}
    <div class="p-4">
      <div class="working">
        <div class="placeholder-img done">
          <span class="material-symbols-outlined">check_circle</span>
        </div>
        <p class="title">Os relatórios estão prontos!</p>
        <p class="subtitle">
          Se o download não iniciou automaticamente,
          <span class="tryAgain">clique aqui</span>
        </p>
        <div class="progress-container">
          <span class="title">100% dos arquivos prontos!</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 100%;"></div>
          </div>
        </div>
      </div>
    </div>
  `},o={render:()=>`
    ${s}
    <div class="p-4">
      <div class="working">
        <div class="placeholder-img done">
          <span class="material-symbols-outlined">task</span>
        </div>
        <p class="title">Os boletins estão prontos!</p>
        <p class="subtitle">
          Se o download não iniciou automaticamente,
          <span class="tryAgain">clique aqui</span>
        </p>
        <div class="progress-container">
          <span class="title">100% dos arquivos prontos!</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 100%;"></div>
          </div>
        </div>
      </div>
    </div>
  `},r={render:()=>`
    ${s}
    <style>
      .progress-demo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
      }
      .progress-item {
        background: white;
        border: 1px solid #ebe9f1;
        border-radius: 0.428rem;
        padding: 1.5rem;
        text-align: center;
      }
      .progress-item .label {
        font-weight: 500;
        color: #5e5873;
        margin-bottom: 0.75rem;
      }
    </style>
    <div class="p-4">
      <div class="progress-demo">
        <div class="progress-item">
          <div class="label">0% - Iniciando</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 0%;"></div>
          </div>
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </div>
        <div class="progress-item">
          <div class="label">25% - Processando</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 25%;"></div>
          </div>
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </div>
        <div class="progress-item">
          <div class="label">50% - Metade</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 50%;"></div>
          </div>
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </div>
        <div class="progress-item">
          <div class="label">75% - Quase lá</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 75%;"></div>
          </div>
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </div>
        <div class="progress-item">
          <div class="label" style="color: #28c76f;">100% - Concluído!</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 100%;"></div>
          </div>
          <span class="material-symbols-outlined" style="color: #28c76f; font-size: 24px; margin-top: 0.5rem;">check_circle</span>
        </div>
      </div>
    </div>
  `},n={render:()=>`
    ${s}
    <style>
      .modal-demo {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        border-radius: 0.428rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .modal-header {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #ebe9f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .modal-header h5 {
        margin: 0;
        font-weight: 500;
        color: #5e5873;
      }
      .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6c6c6c;
      }
      .modal-body {
        padding: 0;
      }
    </style>
    <div class="p-4" style="background: rgba(0,0,0,0.5);">
      <div class="modal-demo">
        <div class="modal-header">
          <h5>Gerando Relatórios</h5>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="working" style="padding: 2rem;">
            <div class="placeholder-img">
              <span class="material-symbols-outlined">description</span>
            </div>
            <p class="title" style="font-size: 22px;">Estamos preparando os certificados</p>
            <p class="subtitle" style="font-size: 16px;">
              Assim que o processamento acabar, o download será iniciado automaticamente
            </p>
            <div class="progress-container" style="width: 80%;">
              <span class="title" style="font-size: 16px;">45% dos arquivos prontos...</span>
              <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: 45%;"></div>
              </div>
              <div class="loading-spinner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `};var d,t,l,c,p;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => \`
    \${zipLoadingStyles}
    <div class="p-4">
      <div class="working">
        <div class="placeholder-img">
          <span class="material-symbols-outlined">description</span>
        </div>
        <p class="title">Estamos preparando os relatórios</p>
        <p class="subtitle">
          Assim que o processamento acabar, o download será iniciado automaticamente
        </p>
        <div class="progress-container">
          <span class="title">35% dos arquivos prontos...</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 35%;"></div>
          </div>
          <div class="loading-spinner"></div>
        </div>
      </div>
    </div>
  \`
}`,...(l=(t=e.parameters)==null?void 0:t.docs)==null?void 0:l.source},description:{story:"Processing - Estado processando",...(p=(c=e.parameters)==null?void 0:c.docs)==null?void 0:p.description}}};var v,m,g,b,u;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => \`
    \${zipLoadingStyles}
    <div class="p-4">
      <div class="working">
        <div class="placeholder-img">
          <span class="material-symbols-outlined">folder_zip</span>
        </div>
        <p class="title">Os boletins estão sendo preparados.</p>
        <p class="subtitle">
          Assim que o processamento acabar, os boletins serão baixados automaticamente.
        </p>
        <div class="progress-container">
          <span class="title">68% dos arquivos prontos...</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 68%;"></div>
          </div>
          <div class="loading-spinner"></div>
        </div>
      </div>
    </div>
  \`
}`,...(g=(m=i.parameters)==null?void 0:m.docs)==null?void 0:g.source},description:{story:"ProcessingReports - Processando boletins",...(u=(b=i.parameters)==null?void 0:b.docs)==null?void 0:u.description}}};var y,f,h,x,w;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => \`
    \${zipLoadingStyles}
    <div class="p-4">
      <div class="working">
        <div class="placeholder-img done">
          <span class="material-symbols-outlined">check_circle</span>
        </div>
        <p class="title">Os relatórios estão prontos!</p>
        <p class="subtitle">
          Se o download não iniciou automaticamente,
          <span class="tryAgain">clique aqui</span>
        </p>
        <div class="progress-container">
          <span class="title">100% dos arquivos prontos!</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 100%;"></div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(h=(f=a.parameters)==null?void 0:f.docs)==null?void 0:h.source},description:{story:"Completed - Estado concluído",...(w=(x=a.parameters)==null?void 0:x.docs)==null?void 0:w.description}}};var k,E,q,S,P;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => \`
    \${zipLoadingStyles}
    <div class="p-4">
      <div class="working">
        <div class="placeholder-img done">
          <span class="material-symbols-outlined">task</span>
        </div>
        <p class="title">Os boletins estão prontos!</p>
        <p class="subtitle">
          Se o download não iniciou automaticamente,
          <span class="tryAgain">clique aqui</span>
        </p>
        <div class="progress-container">
          <span class="title">100% dos arquivos prontos!</span>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 100%;"></div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(q=(E=o.parameters)==null?void 0:E.docs)==null?void 0:q.source},description:{story:"CompletedReports - Boletins prontos",...(P=(S=o.parameters)==null?void 0:S.docs)==null?void 0:P.description}}};var z,A,C,L,_;r.parameters={...r.parameters,docs:{...(z=r.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
    \${zipLoadingStyles}
    <style>
      .progress-demo {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
      }
      .progress-item {
        background: white;
        border: 1px solid #ebe9f1;
        border-radius: 0.428rem;
        padding: 1.5rem;
        text-align: center;
      }
      .progress-item .label {
        font-weight: 500;
        color: #5e5873;
        margin-bottom: 0.75rem;
      }
    </style>
    <div class="p-4">
      <div class="progress-demo">
        <div class="progress-item">
          <div class="label">0% - Iniciando</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 0%;"></div>
          </div>
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </div>
        <div class="progress-item">
          <div class="label">25% - Processando</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 25%;"></div>
          </div>
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </div>
        <div class="progress-item">
          <div class="label">50% - Metade</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 50%;"></div>
          </div>
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </div>
        <div class="progress-item">
          <div class="label">75% - Quase lá</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 75%;"></div>
          </div>
          <div class="loading-spinner" style="margin: 0 auto;"></div>
        </div>
        <div class="progress-item">
          <div class="label" style="color: #28c76f;">100% - Concluído!</div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 100%;"></div>
          </div>
          <span class="material-symbols-outlined" style="color: #28c76f; font-size: 24px; margin-top: 0.5rem;">check_circle</span>
        </div>
      </div>
    </div>
  \`
}`,...(C=(A=r.parameters)==null?void 0:A.docs)==null?void 0:C.source},description:{story:"AllProgressStates - Todos os estados de progresso",...(_=(L=r.parameters)==null?void 0:L.docs)==null?void 0:_.description}}};var $,R,D,O,F;n.parameters={...n.parameters,docs:{...($=n.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    \${zipLoadingStyles}
    <style>
      .modal-demo {
        max-width: 600px;
        margin: 0 auto;
        background: white;
        border-radius: 0.428rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .modal-header {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid #ebe9f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .modal-header h5 {
        margin: 0;
        font-weight: 500;
        color: #5e5873;
      }
      .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6c6c6c;
      }
      .modal-body {
        padding: 0;
      }
    </style>
    <div class="p-4" style="background: rgba(0,0,0,0.5);">
      <div class="modal-demo">
        <div class="modal-header">
          <h5>Gerando Relatórios</h5>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="working" style="padding: 2rem;">
            <div class="placeholder-img">
              <span class="material-symbols-outlined">description</span>
            </div>
            <p class="title" style="font-size: 22px;">Estamos preparando os certificados</p>
            <p class="subtitle" style="font-size: 16px;">
              Assim que o processamento acabar, o download será iniciado automaticamente
            </p>
            <div class="progress-container" style="width: 80%;">
              <span class="title" style="font-size: 16px;">45% dos arquivos prontos...</span>
              <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: 45%;"></div>
              </div>
              <div class="loading-spinner"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(D=(R=n.parameters)==null?void 0:R.docs)==null?void 0:D.source},description:{story:"InModal - Dentro de um modal",...(F=(O=n.parameters)==null?void 0:O.docs)==null?void 0:F.description}}};const M=["Processing","ProcessingReports","Completed","CompletedReports","AllProgressStates","InModal"];export{r as AllProgressStates,a as Completed,o as CompletedReports,n as InModal,e as Processing,i as ProcessingReports,M as __namedExportsOrder,I as default};
