const a=(e="DS",l="#696cff",t=40)=>`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${t}' height='${t}' viewBox='0 0 ${t} ${t}'%3E%3Crect width='${t}' height='${t}' fill='${encodeURIComponent(l)}'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial,sans-serif' font-size='${Math.floor(t*.4)}' fill='white' text-anchor='middle' dy='.35em'%3E${e}%3C/text%3E%3C/svg%3E`,u=(e=200,l=150,t=null)=>{const h=t||`${e}×${l}`;return`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${l}' viewBox='0 0 ${e} ${l}'%3E%3Crect width='${e}' height='${l}' fill='%23e7e7ff'/%3E%3Cpath d='M${e*.3} ${l*.4} L${e*.5} ${l*.6} L${e*.7} ${l*.35} L${e*.8} ${l*.7} L${e*.2} ${l*.7} Z' fill='%23696cff' opacity='0.3'/%3E%3Ccircle cx='${e*.3}' cy='${l*.3}' r='${Math.min(e,l)*.08}' fill='%23696cff' opacity='0.5'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial,sans-serif' font-size='14' fill='%23696cff' text-anchor='middle' dy='.35em'%3E${h}%3C/text%3E%3C/svg%3E`},g=(e=800,l=400)=>`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${l}' viewBox='0 0 ${e} ${l}'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23696cff;stop-opacity:1'/%3E%3Cstop offset='100%25' style='stop-color:%23444564;stop-opacity:1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='${e}' height='${l}' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial,sans-serif' font-size='24' font-weight='bold' fill='white' text-anchor='middle' dy='.35em'%3E${e}×${l}%3C/text%3E%3C/svg%3E`,r=(e=200)=>`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${e}' viewBox='0 0 ${e} ${e}'%3E%3Ccircle cx='${e/2}' cy='${e/2}' r='${e*.4}' fill='%23f5f5f9'/%3E%3Cpath d='M${e*.35} ${e*.45} L${e*.65} ${e*.45} L${e*.65} ${e*.55} L${e*.35} ${e*.55} Z' fill='%23d1d1e0'/%3E%3Cpath d='M${e*.4} ${e*.35} L${e*.6} ${e*.35} L${e*.6} ${e*.4} L${e*.4} ${e*.4} Z' fill='%23b8b8d2'/%3E%3Cpath d='M${e*.4} ${e*.6} L${e*.6} ${e*.6} L${e*.6} ${e*.65} L${e*.4} ${e*.65} Z' fill='%23b8b8d2'/%3E%3C/svg%3E`,N=(e=150)=>`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${e}' viewBox='0 0 ${e} ${e}'%3E%3Crect width='${e}' height='${e}' fill='%23ffffff'/%3E%3Crect x='${e*.15}' y='${e*.15}' width='${e*.7}' height='${e*.7}' rx='8' fill='%23f0f0f7'/%3E%3Cpath d='M${e*.35} ${e*.4} L${e*.5} ${e*.3} L${e*.65} ${e*.4} L${e*.65} ${e*.6} L${e*.35} ${e*.6} Z' fill='%23696cff' opacity='0.4'/%3E%3Ccircle cx='${e*.4}' cy='${e*.7}' r='${e*.05}' fill='%23696cff' opacity='0.6'/%3E%3Ccircle cx='${e*.6}' cy='${e*.7}' r='${e*.05}' fill='%23696cff' opacity='0.6'/%3E%3C/svg%3E`,$=(e=350,l=200)=>`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${e}' height='${l}' viewBox='0 0 ${e} ${l}'%3E%3Crect width='${e}' height='${l}' fill='%23f8f7fa'/%3E%3Cg transform='translate(${e/2-30}, ${l/2-30})'%3E%3Crect x='10' y='20' width='40' height='30' rx='2' fill='%23d4d2e1'/%3E%3Ccircle cx='20' cy='30' r='5' fill='%23696cff' opacity='0.5'/%3E%3Cpath d='M15 40 L25 32 L35 38 L45 30 L45 50 L15 50 Z' fill='%23696cff' opacity='0.3'/%3E%3C/g%3E%3C/svg%3E`,s={primary:(e,l)=>a(e,"#696cff",l),success:(e,l)=>a(e,"#56ca00",l),warning:(e,l)=>a(e,"#ffb400",l),danger:(e,l)=>a(e,"#ff4c51",l),info:(e,l)=>a(e,"#16b1ff",l),secondary:(e,l)=>a(e,"#8592a3",l)},V={title:"Foundations/Images",parameters:{docs:{description:{component:"Placeholders SVG inline para imagens. Zero dependências externas, zero 404s."}}}},c={render:()=>`
    <div class="p-4">
      <h5 class="mb-4">Avatar Placeholders</h5>
      
      <h6 class="mb-3">Tamanhos</h6>
      <div class="d-flex align-items-end gap-3 mb-4">
        <div class="text-center">
          <img src="${a("XS","#696cff",24)}" class="rounded-circle" alt="XS">
          <p class="small mb-0 mt-1">24px</p>
        </div>
        <div class="text-center">
          <img src="${a("SM","#696cff",32)}" class="rounded-circle" alt="SM">
          <p class="small mb-0 mt-1">32px</p>
        </div>
        <div class="text-center">
          <img src="${a("MD","#696cff",40)}" class="rounded-circle" alt="MD">
          <p class="small mb-0 mt-1">40px (default)</p>
        </div>
        <div class="text-center">
          <img src="${a("LG","#696cff",56)}" class="rounded-circle" alt="LG">
          <p class="small mb-0 mt-1">56px</p>
        </div>
        <div class="text-center">
          <img src="${a("XL","#696cff",80)}" class="rounded-circle" alt="XL">
          <p class="small mb-0 mt-1">80px</p>
        </div>
      </div>

      <h6 class="mb-3">Cores (Presets)</h6>
      <div class="d-flex gap-3 mb-4">
        <img src="${s.primary("AB",40)}" class="rounded-circle" alt="Primary" title="Primary">
        <img src="${s.success("CD",40)}" class="rounded-circle" alt="Success" title="Success">
        <img src="${s.warning("EF",40)}" class="rounded-circle" alt="Warning" title="Warning">
        <img src="${s.danger("GH",40)}" class="rounded-circle" alt="Danger" title="Danger">
        <img src="${s.info("IJ",40)}" class="rounded-circle" alt="Info" title="Info">
        <img src="${s.secondary("KL",40)}" class="rounded-circle" alt="Secondary" title="Secondary">
      </div>

      <h6 class="mb-3">Exemplo em Lista</h6>
      <ul class="list-group" style="max-width: 400px;">
        <li class="list-group-item d-flex align-items-center">
          <img src="${a("JD","#696cff",40)}" class="rounded-circle me-3" alt="Avatar">
          <div>
            <div class="fw-semibold">John Doe</div>
            <div class="small text-muted">john@example.com</div>
          </div>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <img src="${s.success("AS",40)}" class="rounded-circle me-3" alt="Avatar">
          <div>
            <div class="fw-semibold">Anna Smith</div>
            <div class="small text-muted">anna@example.com</div>
          </div>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <img src="${s.warning("BJ",40)}" class="rounded-circle me-3" alt="Avatar">
          <div>
            <div class="fw-semibold">Bob Johnson</div>
            <div class="small text-muted">bob@example.com</div>
          </div>
        </li>
      </ul>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>import { AvatarPlaceholder } from '../_helpers/placeholders';

&lt;img src="\${AvatarPlaceholder('JD', '#696cff', 40)}" 
     class="rounded-circle" alt="Avatar"&gt;</code></pre>
      </div>
    </div>
  `},n={render:()=>`
    <div class="p-4">
      <h5 class="mb-4">Thumbnail Placeholders</h5>
      
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-4">
          <img src="${u(200,150)}" class="img-fluid rounded" alt="Thumbnail">
          <p class="small text-muted mt-2">200×150 (default)</p>
        </div>
        <div class="col-6 col-md-4">
          <img src="${u(300,200,"Product")}" class="img-fluid rounded" alt="Product">
          <p class="small text-muted mt-2">300×200 custom text</p>
        </div>
        <div class="col-6 col-md-4">
          <img src="${u(250,250)}" class="img-fluid rounded" alt="Square">
          <p class="small text-muted mt-2">250×250 quadrado</p>
        </div>
      </div>

      <h6 class="mb-3">Em Cards</h6>
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card">
            <img src="${$(350,200)}" class="card-img-top" alt="Card">
            <div class="card-body">
              <h6 class="card-title">Card Title</h6>
              <p class="card-text small">Card com imagem placeholder.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="${$(350,200)}" class="card-img-top" alt="Card">
            <div class="card-body">
              <h6 class="card-title">Another Card</h6>
              <p class="card-text small">Sem 404s de imagens.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>import { ThumbnailPlaceholder, CardImagePlaceholder } from '../_helpers/placeholders';

&lt;img src="\${ThumbnailPlaceholder(200, 150)}" class="img-fluid"&gt;
&lt;img src="\${CardImagePlaceholder(350, 200)}" class="card-img-top"&gt;</code></pre>
      </div>
    </div>
  `},o={render:()=>`
    <div class="p-4">
      <h5 class="mb-4">Banner Placeholders</h5>
      
      <div class="mb-4">
        <img src="${g(1200,400)}" class="img-fluid rounded" alt="Hero Banner">
        <p class="small text-muted mt-2">1200×400 - Hero/Carousel</p>
      </div>

      <div class="mb-4">
        <img src="${g(800,300)}" class="img-fluid rounded" alt="Medium Banner">
        <p class="small text-muted mt-2">800×300 - Medium banner</p>
      </div>

      <div class="mb-4">
        <img src="${g(600,200)}" class="img-fluid rounded" alt="Small Banner">
        <p class="small text-muted mt-2">600×200 - Small banner</p>
      </div>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>import { BannerPlaceholder } from '../_helpers/placeholders';

&lt;img src="\${BannerPlaceholder(1200, 400)}" class="img-fluid"&gt;</code></pre>
      </div>
    </div>
  `},i={render:()=>`
    <div class="p-4">
      <h5 class="mb-4">Empty State Illustrations</h5>
      
      <div class="row g-4">
        <div class="col-md-4">
          <div class="text-center p-4 border rounded">
            <img src="${r(120)}" alt="Empty" class="mb-3">
            <h6>Nenhum item encontrado</h6>
            <p class="text-muted small mb-3">Não há dados para exibir no momento.</p>
            <button class="btn btn-sm btn-primary">
              <i class="bi bi-plus me-1"></i>
              Adicionar
            </button>
          </div>
        </div>

        <div class="col-md-4">
          <div class="text-center p-4 border rounded">
            <img src="${r(120)}" alt="Empty" class="mb-3">
            <h6>Busca sem resultados</h6>
            <p class="text-muted small mb-3">Tente outros termos de busca.</p>
            <button class="btn btn-sm btn-outline-secondary">Limpar filtros</button>
          </div>
        </div>

        <div class="col-md-4">
          <div class="text-center p-4 border rounded">
            <img src="${r(120)}" alt="Empty" class="mb-3">
            <h6>Lista vazia</h6>
            <p class="text-muted small mb-3">Comece criando seu primeiro item.</p>
            <button class="btn btn-sm btn-success">Começar</button>
          </div>
        </div>
      </div>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>import { EmptyStateIllustration } from '../_helpers/placeholders';

&lt;img src="\${EmptyStateIllustration(120)}" alt="Empty"&gt;</code></pre>
      </div>
    </div>
  `},m={render:()=>`
    <div class="p-4">
      <h5 class="mb-4">Product Placeholders (Ecommerce)</h5>
      
      <div class="row g-3">
        ${[1,2,3,4,5,6].map(e=>`
          <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
              <img src="${N(150)}" class="card-img-top" alt="Product ${e}">
              <div class="card-body p-2">
                <p class="small mb-1 fw-semibold">Produto ${e}</p>
                <p class="small text-muted mb-0">R$ 99,90</p>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>import { ProductPlaceholder } from '../_helpers/placeholders';

&lt;img src="\${ProductPlaceholder(150)}" alt="Product"&gt;</code></pre>
      </div>
    </div>
  `},v={render:()=>`
    <div class="p-4">
      <h5 class="mb-4">Todos os Placeholders - Guia Rápido</h5>
      
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Preview</th>
              <th>Uso Comum</th>
              <th>Função</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Avatar</strong></td>
              <td><img src="${a("DS","#696cff",32)}" class="rounded-circle" alt="Avatar"></td>
              <td>Perfil, lista de usuários</td>
              <td><code>AvatarPlaceholder(initials, color, size)</code></td>
            </tr>
            <tr>
              <td><strong>Thumbnail</strong></td>
              <td><img src="${u(80,60)}" class="rounded" alt="Thumb"></td>
              <td>Galeria, miniatura</td>
              <td><code>ThumbnailPlaceholder(w, h, text)</code></td>
            </tr>
            <tr>
              <td><strong>Banner</strong></td>
              <td><img src="${g(200,60)}" class="rounded" alt="Banner" style="max-width: 200px;"></td>
              <td>Hero, carousel</td>
              <td><code>BannerPlaceholder(w, h)</code></td>
            </tr>
            <tr>
              <td><strong>Empty State</strong></td>
              <td><img src="${r(60)}" alt="Empty"></td>
              <td>Listas vazias, sem resultados</td>
              <td><code>EmptyStateIllustration(size)</code></td>
            </tr>
            <tr>
              <td><strong>Product</strong></td>
              <td><img src="${N(60)}" alt="Product"></td>
              <td>Ecommerce, catálogo</td>
              <td><code>ProductPlaceholder(size)</code></td>
            </tr>
            <tr>
              <td><strong>Card Image</strong></td>
              <td><img src="${$(120,60)}" class="rounded" alt="Card" style="max-width: 120px;"></td>
              <td>Card header, preview</td>
              <td><code>CardImagePlaceholder(w, h)</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="alert alert-info">
        <h6 class="alert-heading">
          <i class="bi bi-lightbulb me-2"></i>
          Vantagens
        </h6>
        <ul class="mb-0">
          <li>✅ Zero dependências externas</li>
          <li>✅ Zero 404s de imagens</li>
          <li>✅ SVG inline (dataURI) - funciona offline</li>
          <li>✅ Customizável (cores, tamanhos, texto)</li>
          <li>✅ Leve e performático</li>
        </ul>
      </div>

      <div class="card mt-3">
        <div class="card-header">
          <h6 class="mb-0">Como usar em um novo componente</h6>
        </div>
        <div class="card-body">
          <pre class="mb-0"><code>// No seu story:
import { AvatarPlaceholder, ThumbnailPlaceholder } from '../_helpers/placeholders';

export const MyComponent = {
  render: () => \`
    &lt;div class="user-card"&gt;
      &lt;img src="\${AvatarPlaceholder('JD', '#696cff', 40)}" 
           class="rounded-circle" alt="User"&gt;
      &lt;div&gt;John Doe&lt;/div&gt;
    &lt;/div&gt;
  \`;
};</code></pre>
        </div>
      </div>
    </div>
  `},p={render:()=>(setTimeout(()=>{const e=document.getElementById("placeholder-generator"),l=document.getElementById("placeholder-preview"),t=document.getElementById("placeholder-code");e.addEventListener("submit",h=>{h.preventDefault();const x=document.getElementById("type").value,y=document.getElementById("initials").value,P=document.getElementById("color").value,d=document.getElementById("size").value;let b,f;x==="avatar"?(b=a(y,P,parseInt(d)),f=`AvatarPlaceholder('${y}', '${P}', ${d})`):x==="empty"&&(b=r(parseInt(d)),f=`EmptyStateIllustration(${d})`),l.innerHTML=`<img src="${b}" class="rounded-circle" alt="Preview">`,t.textContent=f})},100),`
      <div class="p-4">
        <h5 class="mb-4">
          <i class="bi bi-palette text-primary me-2"></i>
          Gerador Interativo de Placeholders
        </h5>
        
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <form id="placeholder-generator">
                  <div class="mb-3">
                    <label class="form-label">Tipo</label>
                    <select class="form-select" id="type">
                      <option value="avatar">Avatar</option>
                      <option value="empty">Empty State</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Iniciais</label>
                    <input type="text" class="form-control" id="initials" value="DS" maxlength="2">
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Cor</label>
                    <input type="color" class="form-control form-control-color" id="color" value="#696cff">
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Tamanho (px)</label>
                    <input type="number" class="form-control" id="size" value="80" min="20" max="200">
                  </div>

                  <button type="submit" class="btn btn-primary">
                    <i class="bi bi-magic me-1"></i>
                    Gerar
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">Preview</h6>
              </div>
              <div class="card-body text-center" id="placeholder-preview" style="min-height: 200px;">
                <img src="${a("DS","#696cff",80)}" class="rounded-circle" alt="Preview">
              </div>
              <div class="card-footer">
                <small class="text-muted">Código:</small>
                <pre class="mb-0 mt-1"><code id="placeholder-code">AvatarPlaceholder('DS', '#696cff', 80)</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="alert alert-success mt-4">
          <i class="bi bi-check-circle me-2"></i>
          <strong>Experimente:</strong> Ajuste os valores e veja o resultado em tempo real!
        </div>
      </div>
    `)};var E,C,w;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
    <div class="p-4">
      <h5 class="mb-4">Avatar Placeholders</h5>
      
      <h6 class="mb-3">Tamanhos</h6>
      <div class="d-flex align-items-end gap-3 mb-4">
        <div class="text-center">
          <img src="\${AvatarPlaceholder('XS', '#696cff', 24)}" class="rounded-circle" alt="XS">
          <p class="small mb-0 mt-1">24px</p>
        </div>
        <div class="text-center">
          <img src="\${AvatarPlaceholder('SM', '#696cff', 32)}" class="rounded-circle" alt="SM">
          <p class="small mb-0 mt-1">32px</p>
        </div>
        <div class="text-center">
          <img src="\${AvatarPlaceholder('MD', '#696cff', 40)}" class="rounded-circle" alt="MD">
          <p class="small mb-0 mt-1">40px (default)</p>
        </div>
        <div class="text-center">
          <img src="\${AvatarPlaceholder('LG', '#696cff', 56)}" class="rounded-circle" alt="LG">
          <p class="small mb-0 mt-1">56px</p>
        </div>
        <div class="text-center">
          <img src="\${AvatarPlaceholder('XL', '#696cff', 80)}" class="rounded-circle" alt="XL">
          <p class="small mb-0 mt-1">80px</p>
        </div>
      </div>

      <h6 class="mb-3">Cores (Presets)</h6>
      <div class="d-flex gap-3 mb-4">
        <img src="\${AvatarPresets.primary('AB', 40)}" class="rounded-circle" alt="Primary" title="Primary">
        <img src="\${AvatarPresets.success('CD', 40)}" class="rounded-circle" alt="Success" title="Success">
        <img src="\${AvatarPresets.warning('EF', 40)}" class="rounded-circle" alt="Warning" title="Warning">
        <img src="\${AvatarPresets.danger('GH', 40)}" class="rounded-circle" alt="Danger" title="Danger">
        <img src="\${AvatarPresets.info('IJ', 40)}" class="rounded-circle" alt="Info" title="Info">
        <img src="\${AvatarPresets.secondary('KL', 40)}" class="rounded-circle" alt="Secondary" title="Secondary">
      </div>

      <h6 class="mb-3">Exemplo em Lista</h6>
      <ul class="list-group" style="max-width: 400px;">
        <li class="list-group-item d-flex align-items-center">
          <img src="\${AvatarPlaceholder('JD', '#696cff', 40)}" class="rounded-circle me-3" alt="Avatar">
          <div>
            <div class="fw-semibold">John Doe</div>
            <div class="small text-muted">john@example.com</div>
          </div>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <img src="\${AvatarPresets.success('AS', 40)}" class="rounded-circle me-3" alt="Avatar">
          <div>
            <div class="fw-semibold">Anna Smith</div>
            <div class="small text-muted">anna@example.com</div>
          </div>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <img src="\${AvatarPresets.warning('BJ', 40)}" class="rounded-circle me-3" alt="Avatar">
          <div>
            <div class="fw-semibold">Bob Johnson</div>
            <div class="small text-muted">bob@example.com</div>
          </div>
        </li>
      </ul>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>import { AvatarPlaceholder } from '../_helpers/placeholders';

&lt;img src="\\\${AvatarPlaceholder('JD', '#696cff', 40)}" 
     class="rounded-circle" alt="Avatar"&gt;</code></pre>
      </div>
    </div>
  \`
}`,...(w=(C=c.parameters)==null?void 0:C.docs)==null?void 0:w.source}}};var A,S,I;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => \`
    <div class="p-4">
      <h5 class="mb-4">Thumbnail Placeholders</h5>
      
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-4">
          <img src="\${ThumbnailPlaceholder(200, 150)}" class="img-fluid rounded" alt="Thumbnail">
          <p class="small text-muted mt-2">200×150 (default)</p>
        </div>
        <div class="col-6 col-md-4">
          <img src="\${ThumbnailPlaceholder(300, 200, 'Product')}" class="img-fluid rounded" alt="Product">
          <p class="small text-muted mt-2">300×200 custom text</p>
        </div>
        <div class="col-6 col-md-4">
          <img src="\${ThumbnailPlaceholder(250, 250)}" class="img-fluid rounded" alt="Square">
          <p class="small text-muted mt-2">250×250 quadrado</p>
        </div>
      </div>

      <h6 class="mb-3">Em Cards</h6>
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card">
            <img src="\${CardImagePlaceholder(350, 200)}" class="card-img-top" alt="Card">
            <div class="card-body">
              <h6 class="card-title">Card Title</h6>
              <p class="card-text small">Card com imagem placeholder.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="\${CardImagePlaceholder(350, 200)}" class="card-img-top" alt="Card">
            <div class="card-body">
              <h6 class="card-title">Another Card</h6>
              <p class="card-text small">Sem 404s de imagens.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>import { ThumbnailPlaceholder, CardImagePlaceholder } from '../_helpers/placeholders';

&lt;img src="\\\${ThumbnailPlaceholder(200, 150)}" class="img-fluid"&gt;
&lt;img src="\\\${CardImagePlaceholder(350, 200)}" class="card-img-top"&gt;</code></pre>
      </div>
    </div>
  \`
}`,...(I=(S=n.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var B,L,T;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => \`
    <div class="p-4">
      <h5 class="mb-4">Banner Placeholders</h5>
      
      <div class="mb-4">
        <img src="\${BannerPlaceholder(1200, 400)}" class="img-fluid rounded" alt="Hero Banner">
        <p class="small text-muted mt-2">1200×400 - Hero/Carousel</p>
      </div>

      <div class="mb-4">
        <img src="\${BannerPlaceholder(800, 300)}" class="img-fluid rounded" alt="Medium Banner">
        <p class="small text-muted mt-2">800×300 - Medium banner</p>
      </div>

      <div class="mb-4">
        <img src="\${BannerPlaceholder(600, 200)}" class="img-fluid rounded" alt="Small Banner">
        <p class="small text-muted mt-2">600×200 - Small banner</p>
      </div>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>import { BannerPlaceholder } from '../_helpers/placeholders';

&lt;img src="\\\${BannerPlaceholder(1200, 400)}" class="img-fluid"&gt;</code></pre>
      </div>
    </div>
  \`
}`,...(T=(L=o.parameters)==null?void 0:L.docs)==null?void 0:T.source}}};var D,M,G;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => \`
    <div class="p-4">
      <h5 class="mb-4">Empty State Illustrations</h5>
      
      <div class="row g-4">
        <div class="col-md-4">
          <div class="text-center p-4 border rounded">
            <img src="\${EmptyStateIllustration(120)}" alt="Empty" class="mb-3">
            <h6>Nenhum item encontrado</h6>
            <p class="text-muted small mb-3">Não há dados para exibir no momento.</p>
            <button class="btn btn-sm btn-primary">
              <i class="bi bi-plus me-1"></i>
              Adicionar
            </button>
          </div>
        </div>

        <div class="col-md-4">
          <div class="text-center p-4 border rounded">
            <img src="\${EmptyStateIllustration(120)}" alt="Empty" class="mb-3">
            <h6>Busca sem resultados</h6>
            <p class="text-muted small mb-3">Tente outros termos de busca.</p>
            <button class="btn btn-sm btn-outline-secondary">Limpar filtros</button>
          </div>
        </div>

        <div class="col-md-4">
          <div class="text-center p-4 border rounded">
            <img src="\${EmptyStateIllustration(120)}" alt="Empty" class="mb-3">
            <h6>Lista vazia</h6>
            <p class="text-muted small mb-3">Comece criando seu primeiro item.</p>
            <button class="btn btn-sm btn-success">Começar</button>
          </div>
        </div>
      </div>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>import { EmptyStateIllustration } from '../_helpers/placeholders';

&lt;img src="\\\${EmptyStateIllustration(120)}" alt="Empty"&gt;</code></pre>
      </div>
    </div>
  \`
}`,...(G=(M=i.parameters)==null?void 0:M.docs)==null?void 0:G.source}}};var J,_,F;m.parameters={...m.parameters,docs:{...(J=m.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => \`
    <div class="p-4">
      <h5 class="mb-4">Product Placeholders (Ecommerce)</h5>
      
      <div class="row g-3">
        \${[1, 2, 3, 4, 5, 6].map(i => \`
          <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
              <img src="\${ProductPlaceholder(150)}" class="card-img-top" alt="Product \${i}">
              <div class="card-body p-2">
                <p class="small mb-1 fw-semibold">Produto \${i}</p>
                <p class="small text-muted mb-0">R$ 99,90</p>
              </div>
            </div>
          </div>
        \`).join('')}
      </div>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>import { ProductPlaceholder } from '../_helpers/placeholders';

&lt;img src="\\\${ProductPlaceholder(150)}" alt="Product"&gt;</code></pre>
      </div>
    </div>
  \`
}`,...(F=(_=m.parameters)==null?void 0:_.docs)==null?void 0:F.source}}};var Z,H,j;v.parameters={...v.parameters,docs:{...(Z=v.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  render: () => \`
    <div class="p-4">
      <h5 class="mb-4">Todos os Placeholders - Guia Rápido</h5>
      
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Preview</th>
              <th>Uso Comum</th>
              <th>Função</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Avatar</strong></td>
              <td><img src="\${AvatarPlaceholder('DS', '#696cff', 32)}" class="rounded-circle" alt="Avatar"></td>
              <td>Perfil, lista de usuários</td>
              <td><code>AvatarPlaceholder(initials, color, size)</code></td>
            </tr>
            <tr>
              <td><strong>Thumbnail</strong></td>
              <td><img src="\${ThumbnailPlaceholder(80, 60)}" class="rounded" alt="Thumb"></td>
              <td>Galeria, miniatura</td>
              <td><code>ThumbnailPlaceholder(w, h, text)</code></td>
            </tr>
            <tr>
              <td><strong>Banner</strong></td>
              <td><img src="\${BannerPlaceholder(200, 60)}" class="rounded" alt="Banner" style="max-width: 200px;"></td>
              <td>Hero, carousel</td>
              <td><code>BannerPlaceholder(w, h)</code></td>
            </tr>
            <tr>
              <td><strong>Empty State</strong></td>
              <td><img src="\${EmptyStateIllustration(60)}" alt="Empty"></td>
              <td>Listas vazias, sem resultados</td>
              <td><code>EmptyStateIllustration(size)</code></td>
            </tr>
            <tr>
              <td><strong>Product</strong></td>
              <td><img src="\${ProductPlaceholder(60)}" alt="Product"></td>
              <td>Ecommerce, catálogo</td>
              <td><code>ProductPlaceholder(size)</code></td>
            </tr>
            <tr>
              <td><strong>Card Image</strong></td>
              <td><img src="\${CardImagePlaceholder(120, 60)}" class="rounded" alt="Card" style="max-width: 120px;"></td>
              <td>Card header, preview</td>
              <td><code>CardImagePlaceholder(w, h)</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="alert alert-info">
        <h6 class="alert-heading">
          <i class="bi bi-lightbulb me-2"></i>
          Vantagens
        </h6>
        <ul class="mb-0">
          <li>✅ Zero dependências externas</li>
          <li>✅ Zero 404s de imagens</li>
          <li>✅ SVG inline (dataURI) - funciona offline</li>
          <li>✅ Customizável (cores, tamanhos, texto)</li>
          <li>✅ Leve e performático</li>
        </ul>
      </div>

      <div class="card mt-3">
        <div class="card-header">
          <h6 class="mb-0">Como usar em um novo componente</h6>
        </div>
        <div class="card-body">
          <pre class="mb-0"><code>// No seu story:
import { AvatarPlaceholder, ThumbnailPlaceholder } from '../_helpers/placeholders';

export const MyComponent = {
  render: () => \\\`
    &lt;div class="user-card"&gt;
      &lt;img src="\\\${AvatarPlaceholder('JD', '#696cff', 40)}" 
           class="rounded-circle" alt="User"&gt;
      &lt;div&gt;John Doe&lt;/div&gt;
    &lt;/div&gt;
  \\\`;
};</code></pre>
        </div>
      </div>
    </div>
  \`
}`,...(j=(H=v.parameters)==null?void 0:H.docs)==null?void 0:j.source}}};var X,R,U;p.parameters={...p.parameters,docs:{...(X=p.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => {
    setTimeout(() => {
      const form = document.getElementById('placeholder-generator');
      const preview = document.getElementById('placeholder-preview');
      const codeOutput = document.getElementById('placeholder-code');
      form.addEventListener('submit', e => {
        e.preventDefault();
        const type = document.getElementById('type').value;
        const initials = document.getElementById('initials').value;
        const color = document.getElementById('color').value;
        const size = document.getElementById('size').value;
        let placeholder, code;
        if (type === 'avatar') {
          placeholder = AvatarPlaceholder(initials, color, parseInt(size));
          code = \`AvatarPlaceholder('\${initials}', '\${color}', \${size})\`;
        } else if (type === 'empty') {
          placeholder = EmptyStateIllustration(parseInt(size));
          code = \`EmptyStateIllustration(\${size})\`;
        }
        preview.innerHTML = \`<img src="\${placeholder}" class="rounded-circle" alt="Preview">\`;
        codeOutput.textContent = code;
      });
    }, 100);
    return \`
      <div class="p-4">
        <h5 class="mb-4">
          <i class="bi bi-palette text-primary me-2"></i>
          Gerador Interativo de Placeholders
        </h5>
        
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <form id="placeholder-generator">
                  <div class="mb-3">
                    <label class="form-label">Tipo</label>
                    <select class="form-select" id="type">
                      <option value="avatar">Avatar</option>
                      <option value="empty">Empty State</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Iniciais</label>
                    <input type="text" class="form-control" id="initials" value="DS" maxlength="2">
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Cor</label>
                    <input type="color" class="form-control form-control-color" id="color" value="#696cff">
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Tamanho (px)</label>
                    <input type="number" class="form-control" id="size" value="80" min="20" max="200">
                  </div>

                  <button type="submit" class="btn btn-primary">
                    <i class="bi bi-magic me-1"></i>
                    Gerar
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <h6 class="mb-0">Preview</h6>
              </div>
              <div class="card-body text-center" id="placeholder-preview" style="min-height: 200px;">
                <img src="\${AvatarPlaceholder('DS', '#696cff', 80)}" class="rounded-circle" alt="Preview">
              </div>
              <div class="card-footer">
                <small class="text-muted">Código:</small>
                <pre class="mb-0 mt-1"><code id="placeholder-code">AvatarPlaceholder('DS', '#696cff', 80)</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="alert alert-success mt-4">
          <i class="bi bi-check-circle me-2"></i>
          <strong>Experimente:</strong> Ajuste os valores e veja o resultado em tempo real!
        </div>
      </div>
    \`;
  }
}`,...(U=(R=p.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};const q=["Avatars","Thumbnails","Banners","EmptyStates","Products","AllPlaceholders","Interactive"];export{v as AllPlaceholders,c as Avatars,o as Banners,i as EmptyStates,p as Interactive,m as Products,n as Thumbnails,q as __namedExportsOrder,V as default};
