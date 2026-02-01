/**
 * Educacross Components - Icons
 * 
 * Catálogo de ícones disponíveis no Design System
 * Bootstrap Icons (bi-), Tabler Icons (ti-), Font Awesome (fa-)
 */

export default {
  title: 'Educacross/Foundations/Icons',
  parameters: {
    layout: 'padded',
  },
};

/**
 * Bootstrap Icons - Ícones principais
 * Biblioteca completa com 2000+ ícones
 */
export const BootstrapIcons = {
  render: () => `
    <style>
      .icons-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 1rem;
      }
      
      .icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 0.5rem;
        text-align: center;
        transition: all 0.2s;
      }
      
      .icon-item:hover {
        background: var(--edu-primary-50, #E8F5F5);
        transform: translateY(-2px);
      }
      
      .icon-item i {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        color: var(--edu-primary, #0C5257);
      }
      
      .icon-name {
        font-size: 0.625rem;
        color: #6c757d;
        word-break: break-all;
      }
      
      .section-title {
        font-family: var(--edu-font-brand);
        font-weight: 600;
        color: var(--edu-primary, #0C5257);
        margin: 1.5rem 0 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--edu-gold, #FAB84A);
      }
    </style>
    
    <div>
      <h4 class="mb-4">Bootstrap Icons (bi-)</h4>
      <p class="text-muted mb-4">Prefixo: <code>bi bi-{nome}</code> • 2000+ ícones disponíveis</p>
      
      <h6 class="section-title">Navegação</h6>
      <div class="icons-grid">
        <div class="icon-item">
          <i class="bi bi-house"></i>
          <span class="icon-name">house</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-arrow-left"></i>
          <span class="icon-name">arrow-left</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-arrow-right"></i>
          <span class="icon-name">arrow-right</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-chevron-down"></i>
          <span class="icon-name">chevron-down</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-chevron-up"></i>
          <span class="icon-name">chevron-up</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-list"></i>
          <span class="icon-name">list</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-grid"></i>
          <span class="icon-name">grid</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-three-dots"></i>
          <span class="icon-name">three-dots</span>
        </div>
      </div>
      
      <h6 class="section-title">Ações</h6>
      <div class="icons-grid">
        <div class="icon-item">
          <i class="bi bi-search"></i>
          <span class="icon-name">search</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-plus"></i>
          <span class="icon-name">plus</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-pencil"></i>
          <span class="icon-name">pencil</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-trash"></i>
          <span class="icon-name">trash</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-download"></i>
          <span class="icon-name">download</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-upload"></i>
          <span class="icon-name">upload</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-share"></i>
          <span class="icon-name">share</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-filter"></i>
          <span class="icon-name">filter</span>
        </div>
      </div>
      
      <h6 class="section-title">Status</h6>
      <div class="icons-grid">
        <div class="icon-item">
          <i class="bi bi-check-circle" style="color: #28C76F;"></i>
          <span class="icon-name">check-circle</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-x-circle" style="color: #EA5455;"></i>
          <span class="icon-name">x-circle</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-exclamation-triangle" style="color: #FF9F43;"></i>
          <span class="icon-name">exclamation-triangle</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-info-circle" style="color: #00CFE8;"></i>
          <span class="icon-name">info-circle</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-question-circle"></i>
          <span class="icon-name">question-circle</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-clock"></i>
          <span class="icon-name">clock</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-hourglass-split"></i>
          <span class="icon-name">hourglass-split</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-bell"></i>
          <span class="icon-name">bell</span>
        </div>
      </div>
      
      <h6 class="section-title">Educação</h6>
      <div class="icons-grid">
        <div class="icon-item">
          <i class="bi bi-book"></i>
          <span class="icon-name">book</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-mortarboard"></i>
          <span class="icon-name">mortarboard</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-journal-text"></i>
          <span class="icon-name">journal-text</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-people"></i>
          <span class="icon-name">people</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-person"></i>
          <span class="icon-name">person</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-trophy"></i>
          <span class="icon-name">trophy</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-star-fill" style="color: #FAB84A;"></i>
          <span class="icon-name">star-fill</span>
        </div>
        <div class="icon-item">
          <i class="bi bi-award"></i>
          <span class="icon-name">award</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * Tabler Icons - Ícones alternativos
 * 5000+ ícones via Iconify
 */
export const TablerIcons = {
  render: () => `
    <div>
      <h4 class="mb-4">Tabler Icons (ti-)</h4>
      <p class="text-muted mb-4">Prefixo: <code>ti ti-{nome}</code> • 5000+ ícones disponíveis</p>
      
      <h6 class="section-title">Interface</h6>
      <div class="icons-grid">
        <div class="icon-item">
          <i class="ti ti-home"></i>
          <span class="icon-name">home</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-settings"></i>
          <span class="icon-name">settings</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-user"></i>
          <span class="icon-name">user</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-users"></i>
          <span class="icon-name">users</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-mail"></i>
          <span class="icon-name">mail</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-calendar"></i>
          <span class="icon-name">calendar</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-chart-bar"></i>
          <span class="icon-name">chart-bar</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-file"></i>
          <span class="icon-name">file</span>
        </div>
      </div>
      
      <h6 class="section-title">Gamificação</h6>
      <div class="icons-grid">
        <div class="icon-item">
          <i class="ti ti-trophy" style="color: #FAB84A;"></i>
          <span class="icon-name">trophy</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-star" style="color: #FAB84A;"></i>
          <span class="icon-name">star</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-medal" style="color: #CD7F32;"></i>
          <span class="icon-name">medal</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-flame" style="color: #FF9F43;"></i>
          <span class="icon-name">flame</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-rocket"></i>
          <span class="icon-name">rocket</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-target"></i>
          <span class="icon-name">target</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-crown" style="color: #FFD700;"></i>
          <span class="icon-name">crown</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-confetti"></i>
          <span class="icon-name">confetti</span>
        </div>
      </div>
      
      <h6 class="section-title">Player / Mídia</h6>
      <div class="icons-grid">
        <div class="icon-item">
          <i class="ti ti-player-play"></i>
          <span class="icon-name">player-play</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-player-pause"></i>
          <span class="icon-name">player-pause</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-player-stop"></i>
          <span class="icon-name">player-stop</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-volume"></i>
          <span class="icon-name">volume</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-microphone"></i>
          <span class="icon-name">microphone</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-headphones"></i>
          <span class="icon-name">headphones</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-video"></i>
          <span class="icon-name">video</span>
        </div>
        <div class="icon-item">
          <i class="ti ti-photo"></i>
          <span class="icon-name">photo</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * Font Awesome - Ícones adicionais
 * Biblioteca completa (solid, regular, brands)
 */
export const FontAwesome = {
  render: () => `
    <div>
      <h4 class="mb-4">Font Awesome 6 (fa-)</h4>
      <p class="text-muted mb-4">Prefixos: <code>fa-solid</code>, <code>fa-regular</code>, <code>fa-brands</code></p>
      
      <h6 class="section-title">Solid Icons</h6>
      <div class="icons-grid">
        <div class="icon-item">
          <i class="fa-solid fa-house"></i>
          <span class="icon-name">fa-house</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-user"></i>
          <span class="icon-name">fa-user</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-gear"></i>
          <span class="icon-name">fa-gear</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-magnifying-glass"></i>
          <span class="icon-name">fa-magnifying-glass</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-check"></i>
          <span class="icon-name">fa-check</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-xmark"></i>
          <span class="icon-name">fa-xmark</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-plus"></i>
          <span class="icon-name">fa-plus</span>
        </div>
        <div class="icon-item">
          <i class="fa-solid fa-minus"></i>
          <span class="icon-name">fa-minus</span>
        </div>
      </div>
      
      <h6 class="section-title">Brands</h6>
      <div class="icons-grid">
        <div class="icon-item">
          <i class="fa-brands fa-google" style="color: #4285F4;"></i>
          <span class="icon-name">fa-google</span>
        </div>
        <div class="icon-item">
          <i class="fa-brands fa-facebook" style="color: #1877F2;"></i>
          <span class="icon-name">fa-facebook</span>
        </div>
        <div class="icon-item">
          <i class="fa-brands fa-instagram" style="color: #E4405F;"></i>
          <span class="icon-name">fa-instagram</span>
        </div>
        <div class="icon-item">
          <i class="fa-brands fa-youtube" style="color: #FF0000;"></i>
          <span class="icon-name">fa-youtube</span>
        </div>
        <div class="icon-item">
          <i class="fa-brands fa-whatsapp" style="color: #25D366;"></i>
          <span class="icon-name">fa-whatsapp</span>
        </div>
        <div class="icon-item">
          <i class="fa-brands fa-linkedin" style="color: #0A66C2;"></i>
          <span class="icon-name">fa-linkedin</span>
        </div>
        <div class="icon-item">
          <i class="fa-brands fa-apple"></i>
          <span class="icon-name">fa-apple</span>
        </div>
        <div class="icon-item">
          <i class="fa-brands fa-android" style="color: #3DDC84;"></i>
          <span class="icon-name">fa-android</span>
        </div>
      </div>
    </div>
  `,
};

/**
 * Icon Sizes - Tamanhos de ícones
 */
export const IconSizes = {
  render: () => `
    <style>
      .size-demo {
        display: flex;
        align-items: flex-end;
        gap: 2rem;
        flex-wrap: wrap;
      }
      
      .size-item {
        text-align: center;
      }
      
      .size-item i {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--edu-primary, #0C5257);
      }
      
      .size-label {
        font-size: 0.75rem;
        color: #6c757d;
      }
    </style>
    
    <div>
      <h4 class="mb-4">Icon Sizes - Tamanhos</h4>
      
      <div class="size-demo mb-4">
        <div class="size-item">
          <i class="bi bi-star-fill" style="font-size: 12px;"></i>
          <span class="size-label">12px</span>
        </div>
        <div class="size-item">
          <i class="bi bi-star-fill" style="font-size: 16px;"></i>
          <span class="size-label">16px</span>
        </div>
        <div class="size-item">
          <i class="bi bi-star-fill" style="font-size: 20px;"></i>
          <span class="size-label">20px</span>
        </div>
        <div class="size-item">
          <i class="bi bi-star-fill" style="font-size: 24px;"></i>
          <span class="size-label">24px</span>
        </div>
        <div class="size-item">
          <i class="bi bi-star-fill" style="font-size: 32px;"></i>
          <span class="size-label">32px</span>
        </div>
        <div class="size-item">
          <i class="bi bi-star-fill" style="font-size: 40px;"></i>
          <span class="size-label">40px</span>
        </div>
        <div class="size-item">
          <i class="bi bi-star-fill" style="font-size: 48px;"></i>
          <span class="size-label">48px</span>
        </div>
        <div class="size-item">
          <i class="bi bi-star-fill" style="font-size: 64px;"></i>
          <span class="size-label">64px</span>
        </div>
      </div>
      
      <div class="alert alert-info">
        <strong>Uso recomendado:</strong>
        <ul class="mb-0 mt-2">
          <li><strong>12-16px:</strong> Inline com texto, badges</li>
          <li><strong>20-24px:</strong> Botões, navegação, listas</li>
          <li><strong>32-40px:</strong> Cards, destaques</li>
          <li><strong>48-64px:</strong> Empty states, ilustrações</li>
        </ul>
      </div>
    </div>
  `,
};

/**
 * Icon Colors - Cores de ícones
 */
export const IconColors = {
  render: () => `
    <style>
      .color-icons {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
      }
      
      .color-icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }
      
      .color-icon-item i {
        font-size: 2rem;
      }
      
      .color-icon-label {
        font-size: 0.75rem;
        color: #6c757d;
      }
    </style>
    
    <div>
      <h4 class="mb-4">Icon Colors - Cores Semânticas</h4>
      
      <div class="color-icons">
        <div class="color-icon-item">
          <i class="bi bi-circle-fill" style="color: var(--edu-primary, #0C5257);"></i>
          <span class="color-icon-label">Primary</span>
        </div>
        <div class="color-icon-item">
          <i class="bi bi-circle-fill" style="color: var(--edu-gold, #FAB84A);"></i>
          <span class="color-icon-label">Gold</span>
        </div>
        <div class="color-icon-item">
          <i class="bi bi-circle-fill" style="color: var(--edu-red, #DF2B3C);"></i>
          <span class="color-icon-label">Red</span>
        </div>
        <div class="color-icon-item">
          <i class="bi bi-circle-fill" style="color: #28C76F;"></i>
          <span class="color-icon-label">Success</span>
        </div>
        <div class="color-icon-item">
          <i class="bi bi-circle-fill" style="color: #FF9F43;"></i>
          <span class="color-icon-label">Warning</span>
        </div>
        <div class="color-icon-item">
          <i class="bi bi-circle-fill" style="color: #EA5455;"></i>
          <span class="color-icon-label">Danger</span>
        </div>
        <div class="color-icon-item">
          <i class="bi bi-circle-fill" style="color: #00CFE8;"></i>
          <span class="color-icon-label">Info</span>
        </div>
        <div class="color-icon-item">
          <i class="bi bi-circle-fill" style="color: #6c757d;"></i>
          <span class="color-icon-label">Muted</span>
        </div>
      </div>
      
      <h6 class="section-title mt-4">Ícones com Background</h6>
      
      <div class="d-flex gap-3 flex-wrap">
        <div class="d-flex align-items-center justify-content-center rounded" style="width: 48px; height: 48px; background: rgba(12, 82, 87, 0.12);">
          <i class="bi bi-house" style="font-size: 1.25rem; color: #0C5257;"></i>
        </div>
        <div class="d-flex align-items-center justify-content-center rounded" style="width: 48px; height: 48px; background: rgba(40, 199, 111, 0.12);">
          <i class="bi bi-check-lg" style="font-size: 1.25rem; color: #28C76F;"></i>
        </div>
        <div class="d-flex align-items-center justify-content-center rounded" style="width: 48px; height: 48px; background: rgba(255, 159, 67, 0.12);">
          <i class="bi bi-exclamation-lg" style="font-size: 1.25rem; color: #FF9F43;"></i>
        </div>
        <div class="d-flex align-items-center justify-content-center rounded" style="width: 48px; height: 48px; background: rgba(234, 84, 85, 0.12);">
          <i class="bi bi-x-lg" style="font-size: 1.25rem; color: #EA5455;"></i>
        </div>
        <div class="d-flex align-items-center justify-content-center rounded" style="width: 48px; height: 48px; background: rgba(0, 207, 232, 0.12);">
          <i class="bi bi-info-lg" style="font-size: 1.25rem; color: #00CFE8;"></i>
        </div>
        <div class="d-flex align-items-center justify-content-center rounded" style="width: 48px; height: 48px; background: rgba(250, 184, 74, 0.12);">
          <i class="bi bi-star-fill" style="font-size: 1.25rem; color: #FAB84A;"></i>
        </div>
      </div>
    </div>
  `,
};

/**
 * Material Symbols - Usados no frontoffice
 */
export const MaterialSymbols = {
  render: () => `
    <div>
      <h4 class="mb-4">Material Symbols (Frontoffice)</h4>
      <p class="text-muted mb-4">
        Os componentes do frontoffice usam <code>material-symbols-outlined</code>. 
        Para compatibilidade, esses ícones podem ser substituídos por equivalentes Bootstrap Icons ou Tabler.
      </p>
      
      <div class="alert alert-warning">
        <strong>⚠️ Atenção:</strong> Material Symbols não estão carregados localmente. 
        Use os equivalentes Bootstrap Icons (bi-) ou Tabler (ti-) nas stories.
      </div>
      
      <h6 class="section-title">Mapeamento de Ícones</h6>
      
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Material Symbol</th>
            <th>Bootstrap Icon</th>
            <th>Tabler Icon</th>
            <th>Preview (bi)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>search</code></td>
            <td><code>bi-search</code></td>
            <td><code>ti-search</code></td>
            <td><i class="bi bi-search"></i></td>
          </tr>
          <tr>
            <td><code>close</code></td>
            <td><code>bi-x</code></td>
            <td><code>ti-x</code></td>
            <td><i class="bi bi-x"></i></td>
          </tr>
          <tr>
            <td><code>info</code></td>
            <td><code>bi-info-circle</code></td>
            <td><code>ti-info-circle</code></td>
            <td><i class="bi bi-info-circle"></i></td>
          </tr>
          <tr>
            <td><code>help</code></td>
            <td><code>bi-question-circle</code></td>
            <td><code>ti-help</code></td>
            <td><i class="bi bi-question-circle"></i></td>
          </tr>
          <tr>
            <td><code>expand_more</code></td>
            <td><code>bi-chevron-down</code></td>
            <td><code>ti-chevron-down</code></td>
            <td><i class="bi bi-chevron-down"></i></td>
          </tr>
          <tr>
            <td><code>chevron_left</code></td>
            <td><code>bi-chevron-left</code></td>
            <td><code>ti-chevron-left</code></td>
            <td><i class="bi bi-chevron-left"></i></td>
          </tr>
          <tr>
            <td><code>chevron_right</code></td>
            <td><code>bi-chevron-right</code></td>
            <td><code>ti-chevron-right</code></td>
            <td><i class="bi bi-chevron-right"></i></td>
          </tr>
          <tr>
            <td><code>check_box</code></td>
            <td><code>bi-check-square</code></td>
            <td><code>ti-square-check</code></td>
            <td><i class="bi bi-check-square"></i></td>
          </tr>
          <tr>
            <td><code>person_edit</code></td>
            <td><code>bi-person-gear</code></td>
            <td><code>ti-user-edit</code></td>
            <td><i class="bi bi-person-gear"></i></td>
          </tr>
          <tr>
            <td><code>import_contacts</code></td>
            <td><code>bi-journal-text</code></td>
            <td><code>ti-address-book</code></td>
            <td><i class="bi bi-journal-text"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
};
