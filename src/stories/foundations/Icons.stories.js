/**
 * @component Icons
 * @description Sistema de iconografia oficial do Design System Educacross
 * @category Foundations
 * @status DONE
 * 
 * Status: ✅ DONE
 */

import feather from 'feather-icons';

export default {
  title: 'Vuexy/Foundations/Icons',
  parameters: {
    docs: {
      description: {
        component: `
# Sistema de Iconografia Educacross

O Design System Educacross utiliza **Feather Icons** como biblioteca oficial de ícones.

## Feather Icons - Biblioteca Oficial ⭐

Biblioteca minimalista e moderna com 280+ ícones em estilo outline consistente.

### Componente Vue: FeatherIcon.vue

\`\`\`vue
<template>
  <FeatherIcon icon="home" size="24" />
</template>

<script setup>
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
</script>
\`\`\`

### Documentação Completa

Para ver todos os ícones Feather disponíveis, acesse:
**Vuexy → Atoms → Data Display → Icon**

## Outras Bibliotecas Disponíveis

O tema Vuexy inclui bibliotecas adicionais de ícones para casos especiais:

- **Bootstrap Icons**: via CDN, útil para componentes legados
- **Font Awesome**: ícones de marcas (social media, logos)
- **Tabler Icons**: via Iconify, para ícones específicos não disponíveis no Feather
- **Flag Icons**: bandeiras de países

⚠️ **Importante**: Novos componentes devem usar **Feather Icons** para consistência.
        `,
      },
    },
  },
};

// ========================================
// FEATHER ICONS - BIBLIOTECA OFICIAL
// ========================================

export const OfficialLibrary = {
  render: () => `
    <div style="padding: 2rem;">
      <div style="padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; color: white; margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem;">
          ${feather.icons.feather.toSvg({ width: 48, height: 48 })}
          <div>
            <h2 style="margin: 0; color: white;">Feather Icons</h2>
            <p style="margin: 0; opacity: 0.9; font-size: 1.1rem;">Biblioteca Oficial Educacross ⭐</p>
          </div>
        </div>
        <p style="font-size: 1.1rem; opacity: 0.95; margin-bottom: 1.5rem;">
          280+ ícones minimalistas em estilo outline consistente. Simples, bonitos e com design moderno.
        </p>
        <div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px;">
          <strong>Componente Vue:</strong>
          <code style="background: rgba(0,0,0,0.2); padding: 0.5rem 1rem; border-radius: 4px; display: inline-block; margin-top: 0.5rem; color: white;">
            educacross-frontoffice/src/@core/components/feather-icon/FeatherIcon.vue
          </code>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div style="padding: 1.5rem; background: #f8f7fa; border-radius: 12px; border-left: 4px solid #28c76f;">
          <h4 style="color: #28c76f; margin-bottom: 1rem;">
            ${feather.icons.check.toSvg({ width: 24, height: 24, class: 'me-2' })}
            Vantagens
          </h4>
          <ul style="line-height: 1.8; color: #6c757d;">
            <li>Design consistente e minimalista</li>
            <li>Componente Vue nativo</li>
            <li>Suporte a badges e notificações</li>
            <li>Tamanhos customizáveis</li>
            <li>280+ ícones essenciais</li>
          </ul>
        </div>

        <div style="padding: 1.5rem; background: #f8f7fa; border-radius: 12px; border-left: 4px solid #7367f0;">
          <h4 style="color: #7367f0; margin-bottom: 1rem;">
            ${feather.icons.code.toSvg({ width: 24, height: 24, class: 'me-2' })}
            Como Usar
          </h4>
          <div style="background: white; padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 0.9rem;">
            &lt;FeatherIcon<br>
            &nbsp;&nbsp;icon="home"<br>
            &nbsp;&nbsp;size="24"<br>
            /&gt;
          </div>
          <a href="?path=/docs/vuexy-atoms-data-display-icon--docs" style="display: inline-block; margin-top: 1rem; color: #7367f0; text-decoration: none; font-weight: 600;">
            ${feather.icons['external-link'].toSvg({ width: 16, height: 16 })}
            Ver documentação completa →
          </a>
        </div>
      </div>

      <div style="margin-top: 2rem; padding: 1.5rem; background: #fff3cd; border-radius: 12px; border-left: 4px solid #ff9f43;">
        <h4 style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
          ${feather.icons['alert-circle'].toSvg({ width: 24, height: 24 })}
          Migração de Projetos Antigos
        </h4>
        <p style="margin-bottom: 1rem;">
          Se você está migrando um projeto que usa Bootstrap Icons, confira o guia de migração abaixo.
        </p>
        <button class="btn btn-warning" onclick="window.location.href='?path=/docs/vuexy-foundations-icons--migration-guide'">
          Ver Guia de Migração
        </button>
      </div>
    </div>
  `,
};

// ========================================
// OUTRAS BIBLIOTECAS DISPONÍVEIS
// ========================================

export const OtherLibraries = {
  render: () => `
    <div style="padding: 2rem;">
      <h2 style="margin-bottom: 1rem;">Bibliotecas Adicionais</h2>
      <p style="color: #6c757d; margin-bottom: 3rem;">
        Disponíveis no tema Vuexy para casos de uso específicos. Use apenas quando necessário.
      </p>

      <div style="display: grid; gap: 2rem;">
        <!-- Bootstrap Icons -->
        <div style="padding: 2rem; background: #f8f7fa; border-radius: 12px; border-left: 4px solid #7367f0; opacity: 0.7;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <i class="bi bi-bootstrap" style="font-size: 2rem; color: #7367f0;"></i>
            <div>
              <h3 style="margin: 0;">Bootstrap Icons</h3>
              <p style="margin: 0; color: #6c757d; font-size: 0.875rem;">Via CDN • 2000+ ícones • Componentes legados</p>
            </div>
          </div>
          <p style="color: #6c757d; margin-bottom: 1rem;">
            Biblioteca oficial do Bootstrap. Usado em componentes legados. <strong>Não recomendado para novos projetos.</strong>
          </p>
          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <code style="background: white; padding: 0.5rem 1rem; border-radius: 6px;">&lt;i class="bi bi-heart"&gt;&lt;/i&gt;</code>
            <div style="display: flex; gap: 0.5rem; font-size: 1.5rem;">
              <i class="bi bi-heart-fill" style="color: #ff4c51;"></i>
              <i class="bi bi-star-fill" style="color: #ff9f43;"></i>
              <i class="bi bi-check-circle-fill" style="color: #28c76f;"></i>
            </div>
          </div>
        </div>

        <!-- Font Awesome -->
        <div style="padding: 2rem; background: #f8f7fa; border-radius: 12px; border-left: 4px solid #00bad1;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <i class="fa-brands fa-font-awesome" style="font-size: 2rem; color: #00bad1;"></i>
            <div>
              <h3 style="margin: 0;">Font Awesome 6.7.2</h3>
              <p style="margin: 0; color: #6c757d; font-size: 0.875rem;">Local • Ícones de marcas (brands)</p>
            </div>
          </div>
          <p style="color: #6c757d; margin-bottom: 1rem;">
            Use <strong>apenas para ícones de marcas</strong> (GitHub, Twitter, Facebook, etc) não disponíveis no Feather.
          </p>
          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <code style="background: white; padding: 0.5rem 1rem; border-radius: 6px;">&lt;i class="fa-brands fa-github"&gt;&lt;/i&gt;</code>
            <div style="display: flex; gap: 0.5rem; font-size: 1.5rem;">
              <i class="fa-brands fa-github"></i>
              <i class="fa-brands fa-twitter" style="color: #1da1f2;"></i>
              <i class="fa-brands fa-facebook" style="color: #1877f2;"></i>
              <i class="fa-brands fa-linkedin" style="color: #0a66c2;"></i>
            </div>
          </div>
        </div>

        <!-- Flag Icons -->
        <div style="padding: 2rem; background: #f8f7fa; border-radius: 12px; border-left: 4px solid #ff9f43;">
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <span class="fi fi-br" style="font-size: 2rem;"></span>
            <div>
              <h3 style="margin: 0;">Flag Icons</h3>
              <p style="margin: 0; color: #6c757d; font-size: 0.875rem;">Local • 250+ bandeiras</p>
            </div>
          </div>
          <p style="color: #6c757d; margin-bottom: 1rem;">
            Use <strong>apenas para seletores de país/idioma</strong>.
          </p>
          <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
            <code style="background: white; padding: 0.5rem 1rem; border-radius: 6px;">&lt;span class="fi fi-br"&gt;&lt;/span&gt;</code>
            <div style="display: flex; gap: 0.5rem; font-size: 1.5rem;">
              <span class="fi fi-br"></span>
              <span class="fi fi-us"></span>
              <span class="fi fi-gb"></span>
              <span class="fi fi-fr"></span>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 3rem; padding: 1.5rem; background: #e9e7fd; border-radius: 12px;">
        <h4 style="margin-bottom: 1rem;">📋 Regras de Uso</h4>
        <ul style="line-height: 1.8;">
          <li><strong>Feather Icons:</strong> Use como padrão para TODOS os novos componentes</li>
          <li><strong>Bootstrap Icons:</strong> Apenas em componentes legados (não modificar)</li>
          <li><strong>Font Awesome:</strong> Apenas para ícones de marcas (social media, logos)</li>
          <li><strong>Flag Icons:</strong> Apenas para seletores de país/idioma</li>
        </ul>
      </div>
    </div>
  `,
};

// ========================================
// GUIA DE MIGRAÇÃO
// ========================================

const bootstrapToFeatherMap = {
  // Ações
  'plus': 'plus',
  'x': 'x',
  'trash': 'trash-2',
  'pencil': 'edit-2',
  'check': 'check',
  'download': 'download',
  'upload': 'upload',
  'search': 'search',

  // Navegação
  'chevron-left': 'chevron-left',
  'chevron-right': 'chevron-right',
  'chevron-up': 'chevron-up',
  'chevron-down': 'chevron-down',
  'arrow-left': 'arrow-left',
  'arrow-right': 'arrow-right',
  'house': 'home',
  'list': 'menu',

  // Usuário
  'person': 'user',
  'people': 'users',
  'person-circle': 'user',
  'box-arrow-right': 'log-out',

  // Comunicação
  'bell': 'bell',
  'envelope': 'mail',
  'chat': 'message-circle',
  'telephone': 'phone',

  // Status
  'check-circle': 'check-circle',
  'x-circle': 'x-circle',
  'exclamation-triangle': 'alert-triangle',
  'info-circle': 'info',

  // Configuração
  'gear': 'settings',
  'sliders': 'sliders',
  'three-dots-vertical': 'more-vertical',

  // Arquivos
  'file-earmark': 'file-text',
  'folder': 'folder',
  'image': 'image',

  // Interface
  'eye': 'eye',
  'eye-slash': 'eye-off',
  'star': 'star',
  'heart': 'heart',
  'share': 'share-2',
  'lock': 'lock',
  'unlock': 'unlock',
};

export const MigrationGuide = {
  render: () => `
    <div class="p-4">
      <h2 class="mb-4">
        ${feather.icons['git-branch'].toSvg({ width: 32, height: 32, class: 'me-2' })}
        Guia de Migração: Bootstrap Icons → Feather Icons
      </h2>

      <div class="alert alert-info mb-4">
        <h5 class="alert-heading">
          ${feather.icons.info.toSvg({ width: 20, height: 20, class: 'me-2' })}
          Quando migrar?
        </h5>
        <ul class="mb-0">
          <li>Ao criar <strong>novos componentes</strong></li>
          <li>Ao fazer <strong>refatoração</strong> de componentes existentes</li>
          <li><strong>Não é necessário</strong> migrar componentes legados funcionais</li>
        </ul>
      </div>

      <h4 class="mb-3">Tabela de Equivalências</h4>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="table-light">
            <tr>
              <th>Bootstrap Icons</th>
              <th>Feather Icons</th>
              <th>Visualização</th>
            </tr>
          </thead>
          <tbody>
            ${Object.entries(bootstrapToFeatherMap).map(([bootstrap, feather_icon]) => `
              <tr>
                <td><code>bi bi-${bootstrap}</code></td>
                <td><code>${feather_icon}</code></td>
                <td>
                  <i class="bi bi-${bootstrap}" style="font-size: 1.5rem; color: #dc3545; margin-right: 1rem;"></i>
                  ${feather.icons[feather_icon] ? feather.icons[feather_icon].toSvg({ width: 24, height: 24 }) : ''}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <h4 class="mt-5 mb-3">Exemplos de Migração</h4>

      <div class="row g-4">
        <div class="col-md-6">
          <div class="card border-danger">
            <div class="card-header bg-danger text-white">
              ${feather.icons.x.toSvg({ width: 16, height: 16, class: 'me-2' })}
              <strong>Antes (Bootstrap Icons)</strong>
            </div>
            <div class="card-body">
              <pre class="mb-0"><code>&lt;i class="bi bi-heart"&gt;&lt;/i&gt;
&lt;i class="bi bi-star"&gt;&lt;/i&gt;
&lt;i class="bi bi-check-circle"&gt;&lt;/i&gt;</code></pre>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card border-success">
            <div class="card-header bg-success text-white">
              ${feather.icons.check.toSvg({ width: 16, height: 16, class: 'me-2' })}
              <strong>Depois (Feather Icons - Vue)</strong>
            </div>
            <div class="card-body">
              <pre class="mb-0"><code>&lt;FeatherIcon icon="heart" size="24" /&gt;
&lt;FeatherIcon icon="star" size="24" /&gt;
&lt;FeatherIcon icon="check-circle" size="24" /&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-warning mt-4">
        <h6 class="alert-heading">
          ${feather.icons['alert-triangle'].toSvg({ width: 20, height: 20, class: 'me-2' })}
          Importante
        </h6>
        <ul class="mb-0">
          <li>Sempre importe o componente: <code>import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'</code></li>
          <li>Tamanho padrão é <code>14px</code>, ajuste conforme necessário</li>
          <li>Use badges para notificações: <code>&lt;FeatherIcon icon="bell" badge="5" /&gt;</code></li>
        </ul>
      </div>

      <div class="mt-4 p-3 bg-light rounded">
        <strong>Links Úteis:</strong>
        <ul class="mb-0 mt-2">
          <li><a href="?path=/docs/vuexy-atoms-data-display-icon--docs">Documentação Completa Feather Icons</a></li>
          <li><a href="https://feathericons.com/" target="_blank">Site Oficial Feather Icons</a></li>
          <li><a href="https://github.com/egoist/vue-feather-icons" target="_blank">Vue Feather Icons no GitHub</a></li>
        </ul>
      </div>
    </div>
  `,
};

// ========================================
// EXEMPLOS PRÁTICOS
// ========================================

export const PracticalExamples = {
  render: () => `
    <div class="p-4">
      <h4 class="mb-4">Exemplos Práticos com Feather Icons</h4>

      <h5 class="mb-3">Em Botões</h5>
      <div class="d-flex flex-wrap gap-2 mb-5">
        <button class="btn btn-primary">
          ${feather.icons.plus.toSvg({ width: 16, height: 16, class: 'me-2' })}
          Adicionar
        </button>
        <button class="btn btn-success">
          ${feather.icons.check.toSvg({ width: 16, height: 16, class: 'me-2' })}
          Confirmar
        </button>
        <button class="btn btn-danger">
          ${feather.icons['trash-2'].toSvg({ width: 16, height: 16, class: 'me-2' })}
          Deletar
        </button>
        <button class="btn btn-icon btn-primary">
          ${feather.icons.settings.toSvg({ width: 20, height: 20 })}
        </button>
      </div>

      <h5 class="mb-3">Em Input Groups</h5>
      <div class="mb-3" style="max-width: 400px;">
        <div class="input-group">
          <span class="input-group-text">
            ${feather.icons.search.toSvg({ width: 16, height: 16 })}
          </span>
          <input type="text" class="form-control" placeholder="Buscar...">
        </div>
      </div>

      <div class="mb-5" style="max-width: 400px;">
        <div class="input-group">
          <span class="input-group-text">
            ${feather.icons.mail.toSvg({ width: 16, height: 16 })}
          </span>
          <input type="email" class="form-control" placeholder="seu@email.com">
        </div>
      </div>

      <h5 class="mb-3">Em Cards</h5>
      <div class="row g-3 mb-5">
        ${['users', 'activity', 'star', 'heart'].map(icon => `
          <div class="col-6 col-md-3">
            <div class="card text-center">
              <div class="card-body">
                ${feather.icons[icon].toSvg({ width: 48, height: 48, class: 'text-primary mb-3' })}
                <h6 class="card-title text-capitalize">${icon}</h6>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="alert alert-success">
        ${feather.icons['check-circle'].toSvg({ width: 20, height: 20, class: 'me-2' })}
        <strong>Dica:</strong> Para mais exemplos, visite a documentação completa em
        <a href="?path=/docs/vuexy-atoms-data-display-icon--docs" class="alert-link">Atoms → Data Display → Icon</a>
      </div>
    </div>
  `,
};
