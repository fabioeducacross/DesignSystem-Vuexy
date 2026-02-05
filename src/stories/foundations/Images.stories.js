import { 
  AvatarPlaceholder, 
  ThumbnailPlaceholder, 
  BannerPlaceholder, 
  EmptyStateIllustration,
  ProductPlaceholder,
  CardImagePlaceholder,
  AvatarPresets
} from '../_helpers/placeholders';

export default {
  title: 'Vuexy/Foundations/Images',
  parameters: {
    docs: {
      description: {
        component: 'Placeholders SVG inline para imagens. Zero dependências externas, zero 404s.',
      },
    },
  },
};

export const Avatars = {
  render: () => `
    <div class="p-4">
      <h5 class="mb-4">Avatar Placeholders</h5>
      
      <h6 class="mb-3">Tamanhos</h6>
      <div class="d-flex align-items-end gap-3 mb-4">
        <div class="text-center">
          <img src="${AvatarPlaceholder('XS', '#696cff', 24)}" class="rounded-circle" alt="XS">
          <p class="small mb-0 mt-1">24px</p>
        </div>
        <div class="text-center">
          <img src="${AvatarPlaceholder('SM', '#696cff', 32)}" class="rounded-circle" alt="SM">
          <p class="small mb-0 mt-1">32px</p>
        </div>
        <div class="text-center">
          <img src="${AvatarPlaceholder('MD', '#696cff', 40)}" class="rounded-circle" alt="MD">
          <p class="small mb-0 mt-1">40px (default)</p>
        </div>
        <div class="text-center">
          <img src="${AvatarPlaceholder('LG', '#696cff', 56)}" class="rounded-circle" alt="LG">
          <p class="small mb-0 mt-1">56px</p>
        </div>
        <div class="text-center">
          <img src="${AvatarPlaceholder('XL', '#696cff', 80)}" class="rounded-circle" alt="XL">
          <p class="small mb-0 mt-1">80px</p>
        </div>
      </div>

      <h6 class="mb-3">Cores (Presets)</h6>
      <div class="d-flex gap-3 mb-4">
        <img src="${AvatarPresets.primary('AB', 40)}" class="rounded-circle" alt="Primary" title="Primary">
        <img src="${AvatarPresets.success('CD', 40)}" class="rounded-circle" alt="Success" title="Success">
        <img src="${AvatarPresets.warning('EF', 40)}" class="rounded-circle" alt="Warning" title="Warning">
        <img src="${AvatarPresets.danger('GH', 40)}" class="rounded-circle" alt="Danger" title="Danger">
        <img src="${AvatarPresets.info('IJ', 40)}" class="rounded-circle" alt="Info" title="Info">
        <img src="${AvatarPresets.secondary('KL', 40)}" class="rounded-circle" alt="Secondary" title="Secondary">
      </div>

      <h6 class="mb-3">Exemplo em Lista</h6>
      <ul class="list-group" style="max-width: 400px;">
        <li class="list-group-item d-flex align-items-center">
          <img src="${AvatarPlaceholder('JD', '#696cff', 40)}" class="rounded-circle me-3" alt="Avatar">
          <div>
            <div class="fw-semibold">John Doe</div>
            <div class="small text-muted">john@example.com</div>
          </div>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <img src="${AvatarPresets.success('AS', 40)}" class="rounded-circle me-3" alt="Avatar">
          <div>
            <div class="fw-semibold">Anna Smith</div>
            <div class="small text-muted">anna@example.com</div>
          </div>
        </li>
        <li class="list-group-item d-flex align-items-center">
          <img src="${AvatarPresets.warning('BJ', 40)}" class="rounded-circle me-3" alt="Avatar">
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
  `,
};

export const Thumbnails = {
  render: () => `
    <div class="p-4">
      <h5 class="mb-4">Thumbnail Placeholders</h5>
      
      <div class="row g-3 mb-4">
        <div class="col-6 col-md-4">
          <img src="${ThumbnailPlaceholder(200, 150)}" class="img-fluid rounded" alt="Thumbnail">
          <p class="small text-muted mt-2">200×150 (default)</p>
        </div>
        <div class="col-6 col-md-4">
          <img src="${ThumbnailPlaceholder(300, 200, 'Product')}" class="img-fluid rounded" alt="Product">
          <p class="small text-muted mt-2">300×200 custom text</p>
        </div>
        <div class="col-6 col-md-4">
          <img src="${ThumbnailPlaceholder(250, 250)}" class="img-fluid rounded" alt="Square">
          <p class="small text-muted mt-2">250×250 quadrado</p>
        </div>
      </div>

      <h6 class="mb-3">Em Cards</h6>
      <div class="row g-3">
        <div class="col-md-4">
          <div class="card">
            <img src="${CardImagePlaceholder(350, 200)}" class="card-img-top" alt="Card">
            <div class="card-body">
              <h6 class="card-title">Card Title</h6>
              <p class="card-text small">Card com imagem placeholder.</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <img src="${CardImagePlaceholder(350, 200)}" class="card-img-top" alt="Card">
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
  `,
};

export const Banners = {
  render: () => `
    <div class="p-4">
      <h5 class="mb-4">Banner Placeholders</h5>
      
      <div class="mb-4">
        <img src="${BannerPlaceholder(1200, 400)}" class="img-fluid rounded" alt="Hero Banner">
        <p class="small text-muted mt-2">1200×400 - Hero/Carousel</p>
      </div>

      <div class="mb-4">
        <img src="${BannerPlaceholder(800, 300)}" class="img-fluid rounded" alt="Medium Banner">
        <p class="small text-muted mt-2">800×300 - Medium banner</p>
      </div>

      <div class="mb-4">
        <img src="${BannerPlaceholder(600, 200)}" class="img-fluid rounded" alt="Small Banner">
        <p class="small text-muted mt-2">600×200 - Small banner</p>
      </div>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>import { BannerPlaceholder } from '../_helpers/placeholders';

&lt;img src="\${BannerPlaceholder(1200, 400)}" class="img-fluid"&gt;</code></pre>
      </div>
    </div>
  `,
};

export const EmptyStates = {
  render: () => `
    <div class="p-4">
      <h5 class="mb-4">Empty State Illustrations</h5>
      
      <div class="row g-4">
        <div class="col-md-4">
          <div class="text-center p-4 border rounded">
            <img src="${EmptyStateIllustration(120)}" alt="Empty" class="mb-3">
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
            <img src="${EmptyStateIllustration(120)}" alt="Empty" class="mb-3">
            <h6>Busca sem resultados</h6>
            <p class="text-muted small mb-3">Tente outros termos de busca.</p>
            <button class="btn btn-sm btn-outline-secondary">Limpar filtros</button>
          </div>
        </div>

        <div class="col-md-4">
          <div class="text-center p-4 border rounded">
            <img src="${EmptyStateIllustration(120)}" alt="Empty" class="mb-3">
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
  `,
};

export const Products = {
  render: () => `
    <div class="p-4">
      <h5 class="mb-4">Product Placeholders (Ecommerce)</h5>
      
      <div class="row g-3">
        ${[1, 2, 3, 4, 5, 6].map(i => `
          <div class="col-6 col-md-4 col-lg-2">
            <div class="card">
              <img src="${ProductPlaceholder(150)}" class="card-img-top" alt="Product ${i}">
              <div class="card-body p-2">
                <p class="small mb-1 fw-semibold">Produto ${i}</p>
                <p class="small text-muted mb-0">R$ 99,90</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="alert alert-secondary mt-4">
        <strong>Código:</strong>
        <pre class="mb-0 mt-2"><code>import { ProductPlaceholder } from '../_helpers/placeholders';

&lt;img src="\${ProductPlaceholder(150)}" alt="Product"&gt;</code></pre>
      </div>
    </div>
  `,
};

export const AllPlaceholders = {
  render: () => `
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
              <td><img src="${AvatarPlaceholder('DS', '#696cff', 32)}" class="rounded-circle" alt="Avatar"></td>
              <td>Perfil, lista de usuários</td>
              <td><code>AvatarPlaceholder(initials, color, size)</code></td>
            </tr>
            <tr>
              <td><strong>Thumbnail</strong></td>
              <td><img src="${ThumbnailPlaceholder(80, 60)}" class="rounded" alt="Thumb"></td>
              <td>Galeria, miniatura</td>
              <td><code>ThumbnailPlaceholder(w, h, text)</code></td>
            </tr>
            <tr>
              <td><strong>Banner</strong></td>
              <td><img src="${BannerPlaceholder(200, 60)}" class="rounded" alt="Banner" style="max-width: 200px;"></td>
              <td>Hero, carousel</td>
              <td><code>BannerPlaceholder(w, h)</code></td>
            </tr>
            <tr>
              <td><strong>Empty State</strong></td>
              <td><img src="${EmptyStateIllustration(60)}" alt="Empty"></td>
              <td>Listas vazias, sem resultados</td>
              <td><code>EmptyStateIllustration(size)</code></td>
            </tr>
            <tr>
              <td><strong>Product</strong></td>
              <td><img src="${ProductPlaceholder(60)}" alt="Product"></td>
              <td>Ecommerce, catálogo</td>
              <td><code>ProductPlaceholder(size)</code></td>
            </tr>
            <tr>
              <td><strong>Card Image</strong></td>
              <td><img src="${CardImagePlaceholder(120, 60)}" class="rounded" alt="Card" style="max-width: 120px;"></td>
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
  `,
};

export const Interactive = {
  render: () => {
    setTimeout(() => {
      const form = document.getElementById('placeholder-generator');
      const preview = document.getElementById('placeholder-preview');
      const codeOutput = document.getElementById('placeholder-code');

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('type').value;
        const initials = document.getElementById('initials').value;
        const color = document.getElementById('color').value;
        const size = document.getElementById('size').value;

        let placeholder, code;
        
        if (type === 'avatar') {
          placeholder = AvatarPlaceholder(initials, color, parseInt(size));
          code = `AvatarPlaceholder('${initials}', '${color}', ${size})`;
        } else if (type === 'empty') {
          placeholder = EmptyStateIllustration(parseInt(size));
          code = `EmptyStateIllustration(${size})`;
        }

        preview.innerHTML = `<img src="${placeholder}" class="rounded-circle" alt="Preview">`;
        codeOutput.textContent = code;
      });
    }, 100);

    return `
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
                <img src="${AvatarPlaceholder('DS', '#696cff', 80)}" class="rounded-circle" alt="Preview">
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
    `;
  },
};
