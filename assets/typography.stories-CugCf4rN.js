const L={title:"Educacross/Foundations/Typography",parameters:{layout:"padded",docs:{description:{component:`Educacross Components - Typography

Sistema tipográfico baseado na fonte Montserrat
Usada em toda a identidade visual Educacross`}}}},e={render:()=>`
    <style>
      .typography-demo {
        font-family: var(--edu-font-brand);
      }
      
      .font-sample {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 0.5rem;
      }
      
      .font-label {
        font-size: 0.75rem;
        color: #6c757d;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      
      .font-preview {
        font-size: 2rem;
        line-height: 1.4;
        color: var(--edu-primary, #0C5257);
      }
    </style>
    
    <div class="typography-demo">
      <h4 class="mb-4">Montserrat - Fonte Principal</h4>
      
      <div class="font-sample">
        <div class="font-label">Font Family: Montserrat</div>
        <div class="font-preview">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
          abcdefghijklmnopqrstuvwxyz<br>
          0123456789
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <div class="font-sample">
            <div class="font-label">Especial Characters</div>
            <div class="font-preview" style="font-size: 1.5rem;">
              !@#$%^&*()_+-=[]{}|;':"./<>?
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="font-sample">
            <div class="font-label">Acentos Português</div>
            <div class="font-preview" style="font-size: 1.5rem;">
              áàâãéèêíìîóòôõúùûç
            </div>
          </div>
        </div>
      </div>
      
      <div class="alert alert-info mt-3">
        <strong>Variável CSS:</strong> <code>font-family: var(--edu-font-brand);</code><br>
        <strong>Import:</strong> Google Fonts (Montserrat 400, 500, 600, 700)
      </div>
    </div>
  `},s={render:()=>`
    <style>
      .weight-demo {
        font-family: var(--edu-font-brand);
      }
      
      .weight-item {
        display: flex;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid #e9ecef;
      }
      
      .weight-value {
        width: 80px;
        font-size: 0.875rem;
        color: #6c757d;
      }
      
      .weight-name {
        width: 120px;
        font-size: 0.875rem;
        color: var(--edu-primary, #0C5257);
      }
      
      .weight-preview {
        flex: 1;
        font-size: 1.5rem;
        color: #333;
      }
    </style>
    
    <div class="weight-demo">
      <h4 class="mb-4">Font Weights - Pesos Disponíveis</h4>
      
      <div class="weight-item">
        <span class="weight-value">400</span>
        <span class="weight-name">Regular</span>
        <span class="weight-preview" style="font-weight: 400;">
          Educacross - Aprendizado que transforma
        </span>
      </div>
      
      <div class="weight-item">
        <span class="weight-value">500</span>
        <span class="weight-name">Medium</span>
        <span class="weight-preview" style="font-weight: 500;">
          Educacross - Aprendizado que transforma
        </span>
      </div>
      
      <div class="weight-item">
        <span class="weight-value">600</span>
        <span class="weight-name">SemiBold</span>
        <span class="weight-preview" style="font-weight: 600;">
          Educacross - Aprendizado que transforma
        </span>
      </div>
      
      <div class="weight-item">
        <span class="weight-value">700</span>
        <span class="weight-name">Bold</span>
        <span class="weight-preview" style="font-weight: 700;">
          Educacross - Aprendizado que transforma
        </span>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>Variáveis CSS:</strong>
        <ul class="mb-0 mt-2">
          <li><code>--edu-font-normal: 400</code></li>
          <li><code>--edu-font-medium: 500</code></li>
          <li><code>--edu-font-semibold: 600</code></li>
          <li><code>--edu-font-bold: 700</code></li>
        </ul>
      </div>
    </div>
  `},a={render:()=>`
    <style>
      .scale-demo {
        font-family: var(--edu-font-brand);
      }
      
      .scale-item {
        display: flex;
        align-items: baseline;
        padding: 1rem 0;
        border-bottom: 1px solid #e9ecef;
      }
      
      .scale-label {
        width: 100px;
        font-size: 0.75rem;
        color: #6c757d;
      }
      
      .scale-size {
        width: 80px;
        font-size: 0.75rem;
        color: var(--edu-gold, #FAB84A);
        font-weight: 600;
      }
      
      .scale-preview {
        flex: 1;
        color: var(--edu-primary, #0C5257);
        font-weight: 600;
      }
    </style>
    
    <div class="scale-demo">
      <h4 class="mb-4">Type Scale - Escala Tipográfica</h4>
      
      <div class="scale-item">
        <span class="scale-label">text-5xl</span>
        <span class="scale-size">48px / 3rem</span>
        <span class="scale-preview" style="font-size: 3rem;">Título Hero</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-4xl</span>
        <span class="scale-size">36px / 2.25rem</span>
        <span class="scale-preview" style="font-size: 2.25rem;">Título Principal</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-3xl</span>
        <span class="scale-size">30px / 1.875rem</span>
        <span class="scale-preview" style="font-size: 1.875rem;">Título de Seção</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-2xl</span>
        <span class="scale-size">24px / 1.5rem</span>
        <span class="scale-preview" style="font-size: 1.5rem;">Subtítulo Grande</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-xl</span>
        <span class="scale-size">20px / 1.25rem</span>
        <span class="scale-preview" style="font-size: 1.25rem;">Subtítulo</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-lg</span>
        <span class="scale-size">18px / 1.125rem</span>
        <span class="scale-preview" style="font-size: 1.125rem;">Texto Destacado</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-base</span>
        <span class="scale-size">16px / 1rem</span>
        <span class="scale-preview" style="font-size: 1rem;">Texto Base - Parágrafo principal do corpo de texto</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-sm</span>
        <span class="scale-size">14px / 0.875rem</span>
        <span class="scale-preview" style="font-size: 0.875rem;">Texto Secundário - Labels, captions</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-xs</span>
        <span class="scale-size">12px / 0.75rem</span>
        <span class="scale-preview" style="font-size: 0.75rem;">Texto Menor - Metadados, timestamps</span>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>Variáveis CSS:</strong> <code>--edu-text-xs</code> até <code>--edu-text-5xl</code>
      </div>
    </div>
  `},n={render:()=>`
    <style>
      .headings-demo {
        font-family: var(--edu-font-brand);
      }
      
      .heading-item {
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
      }
      
      .heading-item h1,
      .heading-item h2,
      .heading-item h3,
      .heading-item h4,
      .heading-item h5,
      .heading-item h6 {
        margin: 0;
        color: var(--edu-primary, #0C5257);
        font-family: var(--edu-font-brand);
      }
      
      .tag-label {
        font-size: 0.75rem;
        color: #6c757d;
        font-weight: 400;
        margin-top: 0.5rem;
      }
    </style>
    
    <div class="headings-demo">
      <h4 class="mb-4">Headings - HTML Semantic Tags</h4>
      
      <div class="heading-item">
        <h1>H1 - Título Principal da Página</h1>
        <div class="tag-label">&lt;h1&gt; - 2.5rem / 40px</div>
      </div>
      
      <div class="heading-item">
        <h2>H2 - Título de Seção</h2>
        <div class="tag-label">&lt;h2&gt; - 2rem / 32px</div>
      </div>
      
      <div class="heading-item">
        <h3>H3 - Título de Subseção</h3>
        <div class="tag-label">&lt;h3&gt; - 1.75rem / 28px</div>
      </div>
      
      <div class="heading-item">
        <h4>H4 - Título de Card ou Bloco</h4>
        <div class="tag-label">&lt;h4&gt; - 1.5rem / 24px</div>
      </div>
      
      <div class="heading-item">
        <h5>H5 - Título Menor</h5>
        <div class="tag-label">&lt;h5&gt; - 1.25rem / 20px</div>
      </div>
      
      <div class="heading-item">
        <h6>H6 - Label ou Caption Title</h6>
        <div class="tag-label">&lt;h6&gt; - 1rem / 16px</div>
      </div>
    </div>
  `},o={render:()=>`
    <style>
      .body-demo {
        font-family: var(--edu-font-brand);
      }
      
      .text-sample {
        padding: 1.5rem;
        background: #fff;
        border: 1px solid #e9ecef;
        border-radius: 0.5rem;
        margin-bottom: 1.5rem;
      }
      
      .text-sample p {
        font-family: var(--edu-font-brand);
        line-height: 1.6;
        color: #333;
      }
      
      .sample-label {
        font-size: 0.75rem;
        color: var(--edu-gold, #FAB84A);
        font-weight: 600;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
      }
    </style>
    
    <div class="body-demo">
      <h4 class="mb-4">Body Text - Exemplos de Uso</h4>
      
      <div class="text-sample">
        <div class="sample-label">Parágrafo Regular</div>
        <p style="font-weight: 400;">
          A Educacross é uma plataforma de aprendizado adaptativo que transforma a educação 
          através de jogos educacionais e inteligência artificial. Nossa missão é democratizar 
          o acesso à educação de qualidade para todas as crianças do Brasil.
        </p>
      </div>
      
      <div class="text-sample">
        <div class="sample-label">Parágrafo com Destaque (Medium)</div>
        <p style="font-weight: 500;">
          Os professores têm acesso a relatórios detalhados de proficiência, permitindo 
          acompanhar o progresso de cada aluno em tempo real. A plataforma identifica 
          automaticamente gaps de aprendizado e sugere atividades personalizadas.
        </p>
      </div>
      
      <div class="text-sample">
        <div class="sample-label">Texto Pequeno (Captions)</div>
        <p style="font-size: 0.875rem; color: #6c757d;">
          Última atualização: 01 de fevereiro de 2026 • Versão 2.5.3 • 
          Todos os direitos reservados © Educacross
        </p>
      </div>
      
      <div class="text-sample">
        <div class="sample-label">Lista com Bullets</div>
        <ul style="color: #333; line-height: 1.8;">
          <li>Matemática adaptativa para ensino fundamental</li>
          <li>Língua Portuguesa com foco em leitura e escrita</li>
          <li>Jogos educacionais com mecânicas de gamificação</li>
          <li>Relatórios de proficiência para professores</li>
        </ul>
      </div>
    </div>
  `},l={render:()=>`
    <style>
      .colors-demo {
        font-family: var(--edu-font-brand);
      }
      
      .color-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        background: #fff;
        border: 1px solid #e9ecef;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
      }
      
      .color-swatch {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        margin-right: 1rem;
        border: 1px solid rgba(0,0,0,0.1);
      }
      
      .color-text {
        flex: 1;
        font-size: 1.125rem;
        font-weight: 500;
      }
      
      .color-code {
        font-size: 0.75rem;
        color: #6c757d;
        font-family: monospace;
      }
    </style>
    
    <div class="colors-demo">
      <h4 class="mb-4">Text Colors - Cores para Texto</h4>
      
      <div class="color-item">
        <div class="color-swatch" style="background: #0C5257;"></div>
        <span class="color-text" style="color: #0C5257;">Texto Primary - Títulos e destaques</span>
        <span class="color-code">--edu-primary</span>
      </div>
      
      <div class="color-item">
        <div class="color-swatch" style="background: #333;"></div>
        <span class="color-text" style="color: #333;">Texto Body - Conteúdo principal</span>
        <span class="color-code">#333333</span>
      </div>
      
      <div class="color-item">
        <div class="color-swatch" style="background: #6c757d;"></div>
        <span class="color-text" style="color: #6c757d;">Texto Muted - Secundário e captions</span>
        <span class="color-code">text-muted</span>
      </div>
      
      <div class="color-item">
        <div class="color-swatch" style="background: #FAB84A;"></div>
        <span class="color-text" style="color: #FAB84A;">Texto Gold - Destaques e CTAs</span>
        <span class="color-code">--edu-gold</span>
      </div>
      
      <div class="color-item">
        <div class="color-swatch" style="background: #DF2B3C;"></div>
        <span class="color-text" style="color: #DF2B3C;">Texto Red - Alertas e erros</span>
        <span class="color-code">--edu-red</span>
      </div>
      
      <div class="color-item">
        <div class="color-swatch" style="background: #28C76F;"></div>
        <span class="color-text" style="color: #28C76F;">Texto Success - Confirmações</span>
        <span class="color-code">--edu-success</span>
      </div>
      
      <div class="color-item" style="background: #0C5257;">
        <div class="color-swatch" style="background: #fff;"></div>
        <span class="color-text" style="color: #fff;">Texto White - Sobre fundos escuros</span>
        <span class="color-code">#FFFFFF</span>
      </div>
    </div>
  `};var i,t,r,d,c;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => \`
    <style>
      .typography-demo {
        font-family: var(--edu-font-brand);
      }
      
      .font-sample {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 0.5rem;
      }
      
      .font-label {
        font-size: 0.75rem;
        color: #6c757d;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      
      .font-preview {
        font-size: 2rem;
        line-height: 1.4;
        color: var(--edu-primary, #0C5257);
      }
    </style>
    
    <div class="typography-demo">
      <h4 class="mb-4">Montserrat - Fonte Principal</h4>
      
      <div class="font-sample">
        <div class="font-label">Font Family: Montserrat</div>
        <div class="font-preview">
          ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
          abcdefghijklmnopqrstuvwxyz<br>
          0123456789
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-6">
          <div class="font-sample">
            <div class="font-label">Especial Characters</div>
            <div class="font-preview" style="font-size: 1.5rem;">
              !@#$%^&*()_+-=[]{}|;':"./<>?
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="font-sample">
            <div class="font-label">Acentos Português</div>
            <div class="font-preview" style="font-size: 1.5rem;">
              áàâãéèêíìîóòôõúùûç
            </div>
          </div>
        </div>
      </div>
      
      <div class="alert alert-info mt-3">
        <strong>Variável CSS:</strong> <code>font-family: var(--edu-font-brand);</code><br>
        <strong>Import:</strong> Google Fonts (Montserrat 400, 500, 600, 700)
      </div>
    </div>
  \`
}`,...(r=(t=e.parameters)==null?void 0:t.docs)==null?void 0:r.source},description:{story:`Montserrat Font Family
Fonte principal da marca Educacross`,...(c=(d=e.parameters)==null?void 0:d.docs)==null?void 0:c.description}}};var p,m,v,g,f;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => \`
    <style>
      .weight-demo {
        font-family: var(--edu-font-brand);
      }
      
      .weight-item {
        display: flex;
        align-items: center;
        padding: 1rem 0;
        border-bottom: 1px solid #e9ecef;
      }
      
      .weight-value {
        width: 80px;
        font-size: 0.875rem;
        color: #6c757d;
      }
      
      .weight-name {
        width: 120px;
        font-size: 0.875rem;
        color: var(--edu-primary, #0C5257);
      }
      
      .weight-preview {
        flex: 1;
        font-size: 1.5rem;
        color: #333;
      }
    </style>
    
    <div class="weight-demo">
      <h4 class="mb-4">Font Weights - Pesos Disponíveis</h4>
      
      <div class="weight-item">
        <span class="weight-value">400</span>
        <span class="weight-name">Regular</span>
        <span class="weight-preview" style="font-weight: 400;">
          Educacross - Aprendizado que transforma
        </span>
      </div>
      
      <div class="weight-item">
        <span class="weight-value">500</span>
        <span class="weight-name">Medium</span>
        <span class="weight-preview" style="font-weight: 500;">
          Educacross - Aprendizado que transforma
        </span>
      </div>
      
      <div class="weight-item">
        <span class="weight-value">600</span>
        <span class="weight-name">SemiBold</span>
        <span class="weight-preview" style="font-weight: 600;">
          Educacross - Aprendizado que transforma
        </span>
      </div>
      
      <div class="weight-item">
        <span class="weight-value">700</span>
        <span class="weight-name">Bold</span>
        <span class="weight-preview" style="font-weight: 700;">
          Educacross - Aprendizado que transforma
        </span>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>Variáveis CSS:</strong>
        <ul class="mb-0 mt-2">
          <li><code>--edu-font-normal: 400</code></li>
          <li><code>--edu-font-medium: 500</code></li>
          <li><code>--edu-font-semibold: 600</code></li>
          <li><code>--edu-font-bold: 700</code></li>
        </ul>
      </div>
    </div>
  \`
}`,...(v=(m=s.parameters)==null?void 0:m.docs)==null?void 0:v.source},description:{story:"Font Weights - Pesos disponíveis",...(f=(g=s.parameters)==null?void 0:g.docs)==null?void 0:f.description}}};var x,u,h,b,y;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    <style>
      .scale-demo {
        font-family: var(--edu-font-brand);
      }
      
      .scale-item {
        display: flex;
        align-items: baseline;
        padding: 1rem 0;
        border-bottom: 1px solid #e9ecef;
      }
      
      .scale-label {
        width: 100px;
        font-size: 0.75rem;
        color: #6c757d;
      }
      
      .scale-size {
        width: 80px;
        font-size: 0.75rem;
        color: var(--edu-gold, #FAB84A);
        font-weight: 600;
      }
      
      .scale-preview {
        flex: 1;
        color: var(--edu-primary, #0C5257);
        font-weight: 600;
      }
    </style>
    
    <div class="scale-demo">
      <h4 class="mb-4">Type Scale - Escala Tipográfica</h4>
      
      <div class="scale-item">
        <span class="scale-label">text-5xl</span>
        <span class="scale-size">48px / 3rem</span>
        <span class="scale-preview" style="font-size: 3rem;">Título Hero</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-4xl</span>
        <span class="scale-size">36px / 2.25rem</span>
        <span class="scale-preview" style="font-size: 2.25rem;">Título Principal</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-3xl</span>
        <span class="scale-size">30px / 1.875rem</span>
        <span class="scale-preview" style="font-size: 1.875rem;">Título de Seção</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-2xl</span>
        <span class="scale-size">24px / 1.5rem</span>
        <span class="scale-preview" style="font-size: 1.5rem;">Subtítulo Grande</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-xl</span>
        <span class="scale-size">20px / 1.25rem</span>
        <span class="scale-preview" style="font-size: 1.25rem;">Subtítulo</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-lg</span>
        <span class="scale-size">18px / 1.125rem</span>
        <span class="scale-preview" style="font-size: 1.125rem;">Texto Destacado</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-base</span>
        <span class="scale-size">16px / 1rem</span>
        <span class="scale-preview" style="font-size: 1rem;">Texto Base - Parágrafo principal do corpo de texto</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-sm</span>
        <span class="scale-size">14px / 0.875rem</span>
        <span class="scale-preview" style="font-size: 0.875rem;">Texto Secundário - Labels, captions</span>
      </div>
      
      <div class="scale-item">
        <span class="scale-label">text-xs</span>
        <span class="scale-size">12px / 0.75rem</span>
        <span class="scale-preview" style="font-size: 0.75rem;">Texto Menor - Metadados, timestamps</span>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>Variáveis CSS:</strong> <code>--edu-text-xs</code> até <code>--edu-text-5xl</code>
      </div>
    </div>
  \`
}`,...(h=(u=a.parameters)==null?void 0:u.docs)==null?void 0:h.source},description:{story:"Type Scale - Escala de tamanhos",...(y=(b=a.parameters)==null?void 0:b.docs)==null?void 0:y.description}}};var w,E,z,T,F;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => \`
    <style>
      .headings-demo {
        font-family: var(--edu-font-brand);
      }
      
      .heading-item {
        padding: 1.5rem;
        background: #f8f9fa;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
      }
      
      .heading-item h1,
      .heading-item h2,
      .heading-item h3,
      .heading-item h4,
      .heading-item h5,
      .heading-item h6 {
        margin: 0;
        color: var(--edu-primary, #0C5257);
        font-family: var(--edu-font-brand);
      }
      
      .tag-label {
        font-size: 0.75rem;
        color: #6c757d;
        font-weight: 400;
        margin-top: 0.5rem;
      }
    </style>
    
    <div class="headings-demo">
      <h4 class="mb-4">Headings - HTML Semantic Tags</h4>
      
      <div class="heading-item">
        <h1>H1 - Título Principal da Página</h1>
        <div class="tag-label">&lt;h1&gt; - 2.5rem / 40px</div>
      </div>
      
      <div class="heading-item">
        <h2>H2 - Título de Seção</h2>
        <div class="tag-label">&lt;h2&gt; - 2rem / 32px</div>
      </div>
      
      <div class="heading-item">
        <h3>H3 - Título de Subseção</h3>
        <div class="tag-label">&lt;h3&gt; - 1.75rem / 28px</div>
      </div>
      
      <div class="heading-item">
        <h4>H4 - Título de Card ou Bloco</h4>
        <div class="tag-label">&lt;h4&gt; - 1.5rem / 24px</div>
      </div>
      
      <div class="heading-item">
        <h5>H5 - Título Menor</h5>
        <div class="tag-label">&lt;h5&gt; - 1.25rem / 20px</div>
      </div>
      
      <div class="heading-item">
        <h6>H6 - Label ou Caption Title</h6>
        <div class="tag-label">&lt;h6&gt; - 1rem / 16px</div>
      </div>
    </div>
  \`
}`,...(z=(E=n.parameters)==null?void 0:E.docs)==null?void 0:z.source},description:{story:"Headings - Títulos e cabeçalhos",...(F=(T=n.parameters)==null?void 0:T.docs)==null?void 0:F.description}}};var C,S,A,B,D;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => \`
    <style>
      .body-demo {
        font-family: var(--edu-font-brand);
      }
      
      .text-sample {
        padding: 1.5rem;
        background: #fff;
        border: 1px solid #e9ecef;
        border-radius: 0.5rem;
        margin-bottom: 1.5rem;
      }
      
      .text-sample p {
        font-family: var(--edu-font-brand);
        line-height: 1.6;
        color: #333;
      }
      
      .sample-label {
        font-size: 0.75rem;
        color: var(--edu-gold, #FAB84A);
        font-weight: 600;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
      }
    </style>
    
    <div class="body-demo">
      <h4 class="mb-4">Body Text - Exemplos de Uso</h4>
      
      <div class="text-sample">
        <div class="sample-label">Parágrafo Regular</div>
        <p style="font-weight: 400;">
          A Educacross é uma plataforma de aprendizado adaptativo que transforma a educação 
          através de jogos educacionais e inteligência artificial. Nossa missão é democratizar 
          o acesso à educação de qualidade para todas as crianças do Brasil.
        </p>
      </div>
      
      <div class="text-sample">
        <div class="sample-label">Parágrafo com Destaque (Medium)</div>
        <p style="font-weight: 500;">
          Os professores têm acesso a relatórios detalhados de proficiência, permitindo 
          acompanhar o progresso de cada aluno em tempo real. A plataforma identifica 
          automaticamente gaps de aprendizado e sugere atividades personalizadas.
        </p>
      </div>
      
      <div class="text-sample">
        <div class="sample-label">Texto Pequeno (Captions)</div>
        <p style="font-size: 0.875rem; color: #6c757d;">
          Última atualização: 01 de fevereiro de 2026 • Versão 2.5.3 • 
          Todos os direitos reservados © Educacross
        </p>
      </div>
      
      <div class="text-sample">
        <div class="sample-label">Lista com Bullets</div>
        <ul style="color: #333; line-height: 1.8;">
          <li>Matemática adaptativa para ensino fundamental</li>
          <li>Língua Portuguesa com foco em leitura e escrita</li>
          <li>Jogos educacionais com mecânicas de gamificação</li>
          <li>Relatórios de proficiência para professores</li>
        </ul>
      </div>
    </div>
  \`
}`,...(A=(S=o.parameters)==null?void 0:S.docs)==null?void 0:A.source},description:{story:"Body Text - Texto corrido",...(D=(B=o.parameters)==null?void 0:B.docs)==null?void 0:D.description}}};var P,k,M,H,q;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => \`
    <style>
      .colors-demo {
        font-family: var(--edu-font-brand);
      }
      
      .color-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        background: #fff;
        border: 1px solid #e9ecef;
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
      }
      
      .color-swatch {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        margin-right: 1rem;
        border: 1px solid rgba(0,0,0,0.1);
      }
      
      .color-text {
        flex: 1;
        font-size: 1.125rem;
        font-weight: 500;
      }
      
      .color-code {
        font-size: 0.75rem;
        color: #6c757d;
        font-family: monospace;
      }
    </style>
    
    <div class="colors-demo">
      <h4 class="mb-4">Text Colors - Cores para Texto</h4>
      
      <div class="color-item">
        <div class="color-swatch" style="background: #0C5257;"></div>
        <span class="color-text" style="color: #0C5257;">Texto Primary - Títulos e destaques</span>
        <span class="color-code">--edu-primary</span>
      </div>
      
      <div class="color-item">
        <div class="color-swatch" style="background: #333;"></div>
        <span class="color-text" style="color: #333;">Texto Body - Conteúdo principal</span>
        <span class="color-code">#333333</span>
      </div>
      
      <div class="color-item">
        <div class="color-swatch" style="background: #6c757d;"></div>
        <span class="color-text" style="color: #6c757d;">Texto Muted - Secundário e captions</span>
        <span class="color-code">text-muted</span>
      </div>
      
      <div class="color-item">
        <div class="color-swatch" style="background: #FAB84A;"></div>
        <span class="color-text" style="color: #FAB84A;">Texto Gold - Destaques e CTAs</span>
        <span class="color-code">--edu-gold</span>
      </div>
      
      <div class="color-item">
        <div class="color-swatch" style="background: #DF2B3C;"></div>
        <span class="color-text" style="color: #DF2B3C;">Texto Red - Alertas e erros</span>
        <span class="color-code">--edu-red</span>
      </div>
      
      <div class="color-item">
        <div class="color-swatch" style="background: #28C76F;"></div>
        <span class="color-text" style="color: #28C76F;">Texto Success - Confirmações</span>
        <span class="color-code">--edu-success</span>
      </div>
      
      <div class="color-item" style="background: #0C5257;">
        <div class="color-swatch" style="background: #fff;"></div>
        <span class="color-text" style="color: #fff;">Texto White - Sobre fundos escuros</span>
        <span class="color-code">#FFFFFF</span>
      </div>
    </div>
  \`
}`,...(M=(k=l.parameters)==null?void 0:k.docs)==null?void 0:M.source},description:{story:"Text Colors - Cores de texto",...(q=(H=l.parameters)==null?void 0:H.docs)==null?void 0:q.description}}};const R=["FontFamily","FontWeights","TypeScale","Headings","BodyText","TextColors"];export{o as BodyText,e as FontFamily,s as FontWeights,n as Headings,l as TextColors,a as TypeScale,R as __namedExportsOrder,L as default};
