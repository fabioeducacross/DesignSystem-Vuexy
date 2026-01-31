/**
 * Error 404 - Template (Misc)
 * 
 * Source: packages/vuexy_theme/public/vuexy/css/pages/page-misc.css
 * Priority: P2 (Nice-to-have)
 * Status: ✅ DONE
 * 
 * Página de erro 404 (página não encontrada).
 */

import { formatHtmlSnippet } from '../../_helpers/snippets';

export default {
  title: 'Templates/Misc/Error404',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Error 404 Page

Página de erro 404 (Not Found) amigável e branded.

## Quando usar
- Rotas não encontradas
- Páginas deletadas
- URLs incorretas
- Links quebrados

## Características
- Visual atrativo
- Mensagem clara
- CTA para home
- Busca opcional
- Ilustração/imagem
- Branded design

## Elementos incluídos
- Grande número "404"
- Título descritivo
- Mensagem de ajuda
- Botão "Back to Home"
- Link de busca
- Ilustração

## Variantes
- Simples (só texto)
- Com ilustração
- Com busca
- Branded (com logo)

## Acessibilidade
- Heading hierarchy
- Alt text para imagens
- Focus visible
- Clear navigation
        `
      }
    },
    layout: 'fullscreen'
  },
  argTypes: {
    withSearch: {
      control: 'boolean',
      description: 'Incluir barra de busca',
      table: { defaultValue: { summary: false } }
    }
  }
};

const createError404Page = ({ withSearch = false }) => {
  return `<div class="misc-wrapper">
  <div class="misc-inner p-2 p-sm-3">
    <div class="w-100 text-center">
      <!-- Error Number -->
      <h1 class="mb-2 mx-2" style="font-size: 6rem; font-weight: 800; line-height: 1; color: #696cff;">
        404
      </h1>
      
      <!-- Title -->
      <h3 class="mb-2">Page Not Found ⚠️</h3>
      
      <!-- Description -->
      <p class="mb-4 mx-2">
        Oops! 😖 The requested URL was not found on this server.
      </p>
      
      ${withSearch ? `
      <!-- Search Box -->
      <div class="d-flex justify-content-center mb-4">
        <div class="input-group" style="max-width: 500px;">
          <input type="text" class="form-control" placeholder="Search for pages...">
          <button class="btn btn-primary" type="button">
            <i class="bx bx-search"></i>
          </button>
        </div>
      </div>
      ` : ''}
      
      <!-- Back to Home Button -->
      <a href="/" class="btn btn-primary mb-4">
        <i class="bx bx-home-alt me-1"></i>
        Back to Home
      </a>
      
      <!-- Illustration -->
      <div class="mt-4">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23f5f5f9'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial' font-size='120' fill='%23e7e7ff' text-anchor='middle'%3E404%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial' font-size='24' fill='%2399a1b7' text-anchor='middle'%3EPage Not Found%3C/text%3E%3C/svg%3E" 
             alt="page-misc-error-light" 
             width="500" 
             class="img-fluid"
             style="max-width: 100%;">
      </div>
    </div>
  </div>
</div>

<style>
.misc-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(105, 108, 255, 0.08) 0%, rgba(105, 108, 255, 0) 100%);
}

.misc-inner {
  width: 100%;
  max-width: 900px;
}

@media (max-width: 576px) {
  .misc-wrapper h1 {
    font-size: 4rem !important;
  }
  
  .misc-wrapper .img-fluid {
    max-width: 90% !important;
  }
}
</style>`;
};

const Template = (args) => {
  const markup = createError404Page(args);
  
  return `
    ${markup}
    
    <hr class="my-5" />
    
    <details>
      <summary><strong>Code Snippets</strong></summary>
      <div class="mt-3">
        <h6>HTML</h6>
        <pre><code>${formatHtmlSnippet(markup).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </details>
  `;
};

export const Overview = () => createError404Page({ withSearch: false });

export const Simple = Template.bind({});
Simple.args = {
  withSearch: false
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  withSearch: true
};

export const Interactive = () => {
  return `
    <div class="misc-wrapper">
      <div class="misc-inner p-2 p-sm-3">
        <div class="w-100 text-center">
          <h1 class="mb-2" style="font-size: 6rem; font-weight: 800; color: #696cff;">404</h1>
          <h3 class="mb-2">Page Not Found ⚠️</h3>
          <p class="text-muted mb-4">Oops! The requested URL was not found on this server.</p>
          
          <div class="d-flex justify-content-center mb-4">
            <div class="input-group" style="max-width: 500px;">
              <input type="text" id="search-input" class="form-control" placeholder="Search for pages...">
              <button class="btn btn-primary" onclick="
                const query = document.getElementById('search-input').value;
                const results = document.getElementById('search-results');
                const suggestions = [
                  { title: 'Dashboard', url: '/dashboard', icon: 'bx-home-circle' },
                  { title: 'User Profile', url: '/profile', icon: 'bx-user' },
                  { title: 'Settings', url: '/settings', icon: 'bx-cog' },
                  { title: 'Help Center', url: '/help', icon: 'bx-help-circle' }
                ];
                
                if (query.length > 0) {
                  const filtered = suggestions.filter(s => 
                    s.title.toLowerCase().includes(query.toLowerCase())
                  );
                  
                  if (filtered.length > 0) {
                    results.innerHTML = '<div class=\"alert alert-info mt-3\"><strong>🔍 Search Results:</strong><ul class=\"mb-0 mt-2 text-start\">' + 
                      filtered.map(s => '<li><i class=\"bx ' + s.icon + '\"></i> <a href=\"#\">' + s.title + '</a></li>').join('') + 
                      '</ul></div>';
                  } else {
                    results.innerHTML = '<div class=\"alert alert-warning mt-3\">⚠️ No results found for \"' + query + '\"</div>';
                  }
                } else {
                  results.innerHTML = '';
                }
              "><i class="bx bx-search"></i></button>
            </div>
          </div>
          
          <div id="search-results"></div>
          
          <a href="#" class="btn btn-primary">Back to Home</a>
          
          <div class="mt-4">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect width='600' height='400' fill='%23f5f5f9'/%3E%3Ctext x='50%25' y='40%25' font-family='Arial' font-size='120' fill='%23e7e7ff' text-anchor='middle'%3E404%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial' font-size='24' fill='%2399a1b7' text-anchor='middle'%3EPage Not Found%3C/text%3E%3C/svg%3E" 
                 alt="page-misc-error-light" 
                 class="img-fluid" 
                 style="max-width: 500px;">
          </div>
        </div>
      </div>
    </div>
    
    <style>
    .misc-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background: linear-gradient(180deg, rgba(105, 108, 255, 0.08) 0%, rgba(105, 108, 255, 0) 100%);
    }
    </style>
  `;
};
