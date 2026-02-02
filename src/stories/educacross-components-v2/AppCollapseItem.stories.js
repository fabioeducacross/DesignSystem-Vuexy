/**
 * AppCollapseItem - Professional Documentation
 * ===========================================
 * 
 * @component AppCollapseItem
 * @source educacross-frontoffice/src/components/app-collapse/AppCollapseItem.vue
 * @reconstructed 2026-02-02
 * 
 * Item de acordeão expansível para FAQ, navegação de relatórios e listas colapsáveis.
 * Usado em SupportMaterials, SkillReport, MissionReports e listagens de missões.
 */

export default {
  title: 'Educacross Components V2/Navigation/AppCollapseItem',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Item de acordeão expansível para navegação e FAQ na plataforma.

---

## Contexto de Uso

**Onde é usado:**
- **Materiais de Apoio (SupportMaterials)** - FAQ com vídeos, documentos e imagens para download
- **Relatórios de Habilidades (SkillReport)** - Expandir/colapsar dados de habilidades por aluno
- **Relatórios de Missões (ActivityDetailMissionReport)** - Detalhar performance por atividade
- **Listas de Missões do Professor** - Organizar missões Educacross/Inclusão/Livros

**Personas:**
- **Professor** - Navegar relatórios e acessar materiais de apoio
- **Coordenador** - Visualizar dados consolidados de múltiplas turmas
- **Formador** - Explorar FAQs de uso da plataforma

---

## Parent Component

Sempre usado dentro de \`<AppCollapse>\` (wrapper container):

\`\`\`vue
<AppCollapse type="margin" accordion>
  <AppCollapseItem title="Seção 1">Conteúdo 1</AppCollapseItem>
  <AppCollapseItem title="Seção 2">Conteúdo 2</AppCollapseItem>
</AppCollapse>
\`\`\`

**AppCollapse Props:**
- \`type\`: "default" | "border" | "shadow" | "margin" (espaçamento entre itens)
- \`accordion\`: Boolean (fecha outros ao abrir um)
- \`hover\`: Boolean (abre/fecha no hover)

---

## Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`isVisible\` | Boolean | \`false\` | Estado inicial (aberto/fechado) |
| \`title\` | String | \`''\` | Título do header (fallback se slot vazio) |
| \`cardClass\` | String | \`''\` | Classes customizadas no card wrapper |
| \`cardHeaderClass\` | String | \`''\` | Classes no header clicável |
| \`bodyClass\` | String | \`''\` | Classes no corpo do collapse |
| \`left\` | Boolean | \`false\` | Ícone chevron à esquerda (padrão: direita) |

---

## Slots

| Slot | Descrição |
|------|-----------|
| \`header\` | Conteúdo customizado do header (substitui title) |
| \`default\` | Corpo do collapse (conteúdo expansível) |

---

## Events

| Event | Payload | Descrição |
|-------|---------|-----------|
| \`visible\` | \`Boolean\` | Emitido ao abrir/fechar (true = aberto, false = fechado) |

---

## Especificações Técnicas

### Dimensões
- **Header Padding**: 1rem (default) | 1rem 1rem 1rem 3.8rem (left icon)
- **Body Padding**: 1.5rem (card-body padrão Bootstrap)
- **Min Height Header**: 56px (garantir clique confortável)
- **Chevron Icon**: 1.286rem (tamanho do ícone ::after)

### Cores
- **Header Background (Fechado)**: transparent
- **Header Background (Aberto)**: rgba(110, 99, 232, 0.05) (destaque)
- **Chevron Icon**: #5d596c (text color)
- **Border (type="border")**: 1px solid #dbdade
- **Shadow (type="shadow")**: 0 4px 24px 0 rgba(34,41,47,.1)

### Tipografia
- **Title (lead)**: 1.25rem / 1.5 (20px line-height), weight 500
- **Body Content**: 1rem / 1.5, color #5d596c

### Estados
1. **Collapsed (fechado)**: chevron rotacionado 0deg, body display:none
2. **Open (aberto)**: chevron rotacionado -180deg, body animado (slide down)
3. **Hover**: cursor pointer, background rgba(0,0,0,0.025)
4. **Focus**: outline 2px solid #6e63e8 (keyboard navegação)

### Animação
- **Transition**: transform 0.35s ease, opacity 0.35s ease
- **Chevron Rotation**: 0deg → -180deg (smooth)
- **Body Slide**: max-height 0 → auto (CSS transition)

---

## Comportamento

### Click/Touch
- **Header Click**: Toggle open/close + emit 'visible' event
- **Body Click**: Não fecha (apenas header é clicável)
- **Accordion Mode**: Fecha outros AppCollapseItem ao abrir um

### Keyboard
- **Enter/Space**: Toggle collapse (header com role="tab")
- **Tab**: Navegar entre headers
- **Arrow Down/Up**: Navegar entre accordions (ARIA navigation)

### Hover (opcional)
- Se \`AppCollapse hover=true\`: abre no mouseenter, fecha no mouseleave
- Uso: menus de navegação rápida

---

## Acessibilidade

- **role="tab"** no header (ARIA tablist pattern)
- **role="tabpanel"** no collapse body
- **aria-expanded**: "true" | "false" (estado atual)
- **aria-controls**: ID único do collapse body (uuid v4)
- **Keyboard Navigation**: Enter/Space para toggle
- **Focus Visible**: Outline 2px para navegação por teclado
- **Screen Reader**: "Expandido" / "Recolhido" anunciado

**WCAG 2.1 Level AA:**
- ✅ Color contrast 4.5:1 (texto sobre fundo)
- ✅ Focus indicator visível
- ✅ Keyboard operable
- ✅ ARIA semantics corretos

---

## Integração Vue 2

\`\`\`vue
<template>
  <app-collapse type="margin" accordion>
    <app-collapse-item
      v-for="faq in faqs"
      :key="faq.id"
      :is-visible="faq.id === openFaqId"
      @visible="handleToggle(faq.id, $event)"
    >
      <template #header>
        <div class="d-flex align-items-center">
          <i class="bi bi-question-circle me-2"></i>
          <h5 class="mb-0">{{ faq.question }}</h5>
        </div>
      </template>

      <div class="faq-answer" v-html="faq.answer" />
    </app-collapse-item>
  </app-collapse>
</template>

<script setup>
import { ref } from 'vue'
import AppCollapse from '@/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@/components/app-collapse/AppCollapseItem.vue'

const openFaqId = ref(null)
const faqs = ref([
  { id: 1, question: 'Como criar uma missão?', answer: '<p>...</p>' },
  { id: 2, question: 'Como acessar relatórios?', answer: '<p>...</p>' },
])

const handleToggle = (id, isOpen) => {
  openFaqId.value = isOpen ? id : null
  console.log(\`FAQ \${id} \${isOpen ? 'aberto' : 'fechado'}\`)
}
</script>
\`\`\`

---

## UX Writing Matrix

| Elemento | Texto | Contexto | Razão |
|----------|-------|----------|-------|
| FAQ Header | "Ainda está com dúvidas?" | Após lista de materiais | Tom acolhedor |
| CTA FAQ | "Acessar Perguntas Frequentes" | Material de Apoio | Ação clara |
| Empty State | "Nenhum item disponível" | Lista vazia | Feedback direto |
| Skill Header | "Habilidade EF67LP01" | Relatórios | Código BNCC |
| Mission Header | "Missão: [nome]" | Listas de missões | Identificação |
| Loading | "Carregando..." | Skeleton | Estado transitório |

---

## Casos de Uso Reais

### 1. FAQ de Materiais de Apoio
\`\`\`vue
<app-collapse-item title="Tutoriais em Vídeo">
  <b-row>
    <b-col v-for="video in videos" cols="12" sm="6" lg="4">
      <iframe :src="video.url" allowfullscreen />
      <p>{{ video.name }}</p>
    </b-col>
  </b-row>
</app-collapse-item>
\`\`\`

### 2. Relatório de Habilidades (Skeleton)
\`\`\`vue
<app-collapse-item v-for="i in 3" :key="i" :title="String(i)">
  <b-skeleton-wrapper :loading="loading">
    <template #loading>
      <b-skeleton animation="wave" width="100%" height="120px" />
    </template>
    <skill-chart :data="skillData[i]" />
  </b-skeleton-wrapper>
</app-collapse-item>
\`\`\`

### 3. Detalhe de Missão (Custom Header)
\`\`\`vue
<app-collapse-item>
  <template #header>
    <div class="d-flex justify-content-between w-100">
      <div>
        <h5>Missão: Frações</h5>
        <small>3º ano A - Matemática</small>
      </div>
      <b-badge variant="success">Concluída</b-badge>
    </div>
  </template>
  <mission-details :mission-id="missionId" />
</app-collapse-item>
\`\`\`

---

## Regras de Negócio

1. **Accordion Mode**: Apenas 1 item aberto por vez (padrão em relatórios)
2. **Default Expanded**: Primeiro item aberto em FAQs (melhor UX)
3. **Persistent State**: Salvar estado no localStorage (relatórios grandes)
4. **Lazy Load Content**: Carregar dados apenas ao expandir (performance)
5. **Max Items**: Paginar listas com >20 itens (evitar scroll infinito)
6. **Mobile**: Chevron maior (1.5rem) para touch fácil

---

## Performance

- **UUID Generation**: Apenas no mount (não re-render)
- **Event Delegation**: Click handler único no header
- **CSS-only Animation**: Não usar JS para transições
- **Lazy Content**: v-if no body + v-show no wrapper (carregar sob demanda)

---

## Troubleshooting

**Problema**: Chevron não rotaciona
- **Solução**: Adicionar classe \`.collapse-icon\` no parent \`AppCollapse\`

**Problema**: Accordion não fecha outros
- **Solução**: Passar prop \`accordion=true\` no \`AppCollapse\`

**Problema**: Hover não funciona
- **Solução**: Verificar \`hover=true\` em \`AppCollapse\` + \`openOnHover\` interno

**Problema**: ID duplicado (console warning)
- **Solução**: UUID v4 gerado automaticamente (verificar import)
        `
      }
    }
  }
};

// ====================================
// Estilos
// ====================================

const styles = `
<style>
  /* Educacross Design System Variables */
  :root {
    --primary: #6e63e8;
    --success: #28c76f;
    --danger: #ea5455;
    --warning: #ff9f43;
    --info: #00cfe8;
    --secondary: #6c757d;
    --border-color: #dbdade;
    --body-bg: #f8f7fa;
    --card-bg: #ffffff;
    --text-color: #5d596c;
  }

  /* Collapse Icon Wrapper */
  .collapse-icon {
    width: 100%;
  }

  /* Collapse Types */
  .collapse-default .card {
    margin-bottom: 0;
    box-shadow: none;
  }

  .collapse-border .card {
    border: 1px solid var(--border-color);
    margin-bottom: 0.5rem;
  }

  .collapse-shadow .card {
    box-shadow: 0 4px 24px 0 rgba(34,41,47,.1);
    margin-bottom: 1rem;
    border: none;
  }

  .collapse-margin .card {
    margin-bottom: 1rem;
    border: 1px solid var(--border-color);
  }

  /* Card Base */
  .card {
    background-color: var(--card-bg);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  /* Header */
  .card-header {
    position: relative;
    padding: 1rem 3rem 1rem 1rem;
    background-color: transparent;
    border-bottom: none;
    cursor: pointer;
    transition: background-color 0.2s ease;
    min-height: 56px;
    display: flex;
    align-items: center;
  }

  .card-header:hover {
    background-color: rgba(0,0,0,0.025);
  }

  .card-header:focus {
    outline: 2px solid var(--primary);
    outline-offset: -2px;
  }

  /* Header Expanded State */
  .card-header[aria-expanded="true"] {
    background-color: rgba(110, 99, 232, 0.05);
  }

  /* Chevron Icon (CSS only) */
  .card-header::after {
    content: "";
    position: absolute;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    width: 0;
    height: 0;
    border-left: 0.4rem solid transparent;
    border-right: 0.4rem solid transparent;
    border-top: 0.4rem solid var(--text-color);
    transition: transform 0.35s ease;
  }

  .card-header[aria-expanded="true"]::after {
    transform: translateY(-50%) rotate(-180deg);
  }

  /* Left Icon Variant */
  .card-header.left {
    padding: 1rem 1rem 1rem 3.8rem;
  }

  .card-header.left::after {
    left: 1.5rem;
    right: auto;
  }

  /* Title */
  .collapse-title {
    font-size: 1.25rem;
    line-height: 1.5;
    font-weight: 500;
    color: #202223;
    margin: 0;
  }

  /* Body */
  .card-body {
    padding: 1.5rem;
    color: var(--text-color);
    line-height: 1.5;
  }

  /* Collapse Animation */
  .collapse {
    transition: max-height 0.35s ease, opacity 0.35s ease;
  }

  .collapsing {
    overflow: hidden;
  }

  /* Responsive */
  @media (max-width: 576px) {
    .card-header {
      padding: 0.75rem 2.5rem 0.75rem 0.75rem;
    }

    .card-header::after {
      right: 0.75rem;
      border-left-width: 0.35rem;
      border-right-width: 0.35rem;
      border-top-width: 0.35rem;
    }

    .collapse-title {
      font-size: 1.1rem;
    }

    .card-body {
      padding: 1rem;
    }
  }
</style>
`;

// ====================================
// Helper: Interactive State
// ====================================

function createInteractiveCollapse() {
  const id = `collapse-${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    id,
    render: (title, content, isOpen = false) => `
      <div class="collapse-icon collapse-margin">
        <div class="card">
          <div 
            class="card-header" 
            role="tab"
            aria-expanded="${isOpen}"
            aria-controls="${id}"
            data-bs-toggle="collapse"
            data-bs-target="#${id}"
            tabindex="0"
          >
            <span class="collapse-title">${title}</span>
          </div>
          <div id="${id}" class="collapse ${isOpen ? 'show' : ''}" role="tabpanel">
            <div class="card-body">
              ${content}
            </div>
          </div>
        </div>
      </div>
    `,
    addListeners: () => {
      setTimeout(() => {
        const header = document.querySelector(`[aria-controls="${id}"]`);
        const collapse = document.getElementById(id);
        
        if (header && collapse) {
          const toggle = () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !isExpanded);
            collapse.classList.toggle('show');
          };

          header.addEventListener('click', toggle);
          header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          });
        }
      }, 100);
    }
  };
}

// ====================================
// Stories
// ====================================

export const Closed = {
  name: 'Closed (Default State)',
  render: () => {
    const collapse = createInteractiveCollapse();
    collapse.addListeners();
    return styles + collapse.render(
      'Como criar uma missão personalizada?',
      '<p>Para criar uma missão personalizada, acesse o menu <strong>Missões</strong> no painel do professor, clique em <strong>Nova Missão</strong> e selecione as atividades desejadas.</p>',
      false
    );
  }
};

export const Opened = {
  name: 'Opened (Expanded)',
  render: () => {
    const collapse = createInteractiveCollapse();
    collapse.addListeners();
    return styles + collapse.render(
      'Como acessar relatórios de desempenho?',
      `
        <p>Os relatórios estão disponíveis no menu <strong>Relatórios</strong>:</p>
        <ul>
          <li><strong>Relatório de Habilidades</strong> - Performance por habilidade BNCC</li>
          <li><strong>Relatório de Missões</strong> - Progresso em atividades</li>
          <li><strong>Relatório High Five</strong> - Top 5 alunos da turma</li>
        </ul>
        <p>Você pode filtrar por período, turma e área de conhecimento.</p>
      `,
      true
    );
  }
};

export const WithIcon = {
  name: 'With Custom Icon',
  render: () => {
    const collapse = createInteractiveCollapse();
    collapse.addListeners();
    return styles + collapse.render(
      '<i class="bi bi-file-earmark-pdf me-2" style="color: #ea5455;"></i> Guia de Avaliação Diagnóstica (PDF)',
      `
        <p><strong>Documento:</strong> guia-avaliacao-diagnostica.pdf</p>
        <p><strong>Tamanho:</strong> 2.4 MB</p>
        <p><strong>Páginas:</strong> 12</p>
        <button class="btn btn-primary btn-sm mt-2">
          <i class="bi bi-download me-1"></i> Download
        </button>
      `,
      false
    );
  }
};

export const Multiple = {
  name: 'Multiple Items (Accordion)',
  render: () => {
    const items = [
      { title: 'Tutoriais em Vídeo', content: '<iframe src="https://player.vimeo.com/video/123456789?color=655CD6" width="100%" height="200" frameborder="0" allowfullscreen></iframe><p class="mt-2"><strong>Como criar missões personalizadas</strong></p>' },
      { title: 'Documentos para Download', content: '<div class="d-flex align-items-center"><img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'45\' height=\'45\'%3E%3Crect fill=\'%23ea5455\' width=\'45\' height=\'45\' rx=\'5\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' fill=\'white\' font-size=\'16\' font-family=\'Arial\' font-weight=\'bold\'%3EPDF%3C/text%3E%3C/svg%3E" alt="PDF" style="width:45px;height:45px;border-radius:5px;"><div class="ms-3"><p class="mb-1"><strong>Manual do Professor</strong></p><button class="btn btn-outline-primary btn-sm"><i class="bi bi-download me-1"></i> Download</button></div></div>' },
      { title: 'Imagens e Infográficos', content: '<p>Recursos visuais para apoio pedagógico:</p><ul><li>Infográfico: Taxonomia de Bloom</li><li>Poster: Níveis de Proficiência</li><li>Tabela: Habilidades BNCC EF</li></ul>' }
    ];

    const html = items.map((item, idx) => {
      const collapse = createInteractiveCollapse();
      collapse.addListeners();
      return collapse.render(item.title, item.content, idx === 0);
    }).join('');

    return styles + `<div style="max-width:600px;">${html}</div>`;
  }
};

export const FAQ = {
  name: 'FAQ Pattern',
  render: () => {
    const faqs = [
      { q: '<i class="bi bi-question-circle me-2" style="color:#6e63e8;"></i> Como redefinir minha senha?', a: '<p>Clique em <strong>Esqueci minha senha</strong> na tela de login. Insira seu e-mail cadastrado e siga as instruções enviadas para sua caixa de entrada.</p><p><em>Caso não receba o e-mail, verifique a pasta de spam.</em></p>' },
      { q: '<i class="bi bi-question-circle me-2" style="color:#6e63e8;"></i> Posso usar a plataforma offline?', a: '<p>A plataforma Educacross requer conexão com a internet para funcionar. Porém, é possível baixar materiais em PDF para consulta offline.</p>' },
      { q: '<i class="bi bi-question-circle me-2" style="color:#6e63e8;"></i> Como adicionar alunos à minha turma?', a: '<ol><li>Acesse <strong>Minha Turma</strong> no menu principal</li><li>Clique em <strong>Adicionar Alunos</strong></li><li>Importe via planilha ou adicione manualmente</li><li>Confirme e salve as alterações</li></ol><p><strong>Formatos aceitos:</strong> XLSX, CSV</p>' }
    ];

    const html = faqs.map((faq, idx) => {
      const collapse = createInteractiveCollapse();
      collapse.addListeners();
      return collapse.render(faq.q, faq.a, idx === 0);
    }).join('');

    return styles + `
      <div style="max-width:700px;">
        <h3 style="margin-bottom:1.5rem;color:#202223;">Perguntas Frequentes</h3>
        ${html}
        <div class="text-center mt-4">
          <p style="color:#5d596c;margin-bottom:1rem;">Ainda está com dúvidas?</p>
          <button class="btn btn-primary">Acessar Central de Ajuda</button>
        </div>
      </div>
    `;
  }
};

export const SkillReport = {
  name: 'Skill Report Pattern',
  render: () => {
    const skills = [
      { code: 'EF67LP01', desc: 'Identificar tema central e ideia principal', students: 28, avg: 75 },
      { code: 'EF67LP08', desc: 'Inferir informação implícita em texto', students: 28, avg: 62 },
      { code: 'EF69LP03', desc: 'Produzir textos narrativos', students: 28, avg: 81 }
    ];

    const html = skills.map((skill, idx) => {
      const collapse = createInteractiveCollapse();
      collapse.addListeners();
      
      const color = skill.avg >= 70 ? '#28c76f' : skill.avg >= 50 ? '#ff9f43' : '#ea5455';
      const badge = skill.avg >= 70 ? 'Proficiente' : skill.avg >= 50 ? 'Básico' : 'Abaixo do Básico';
      
      return collapse.render(
        `
          <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
            <div>
              <strong style="color:#6e63e8;">${skill.code}</strong>
              <p style="margin:0;font-size:0.95rem;color:#5d596c;">${skill.desc}</p>
            </div>
            <div style="text-align:right;">
              <span style="display:inline-block;padding:0.25rem 0.75rem;background:${color};color:white;border-radius:1rem;font-size:0.85rem;font-weight:600;">${skill.avg}%</span>
            </div>
          </div>
        `,
        `
          <div style="display:flex;justify-content:space-between;margin-bottom:1.5rem;">
            <div>
              <p style="margin:0;color:#6c757d;">Alunos avaliados</p>
              <h4 style="margin:0.25rem 0 0 0;color:#202223;">${skill.students}</h4>
            </div>
            <div>
              <p style="margin:0;color:#6c757d;">Média da turma</p>
              <h4 style="margin:0.25rem 0 0 0;color:${color};">${skill.avg}%</h4>
            </div>
            <div>
              <p style="margin:0;color:#6c757d;">Classificação</p>
              <h4 style="margin:0.25rem 0 0 0;color:${color};">${badge}</h4>
            </div>
          </div>
          <div style="background:#f8f7fa;padding:1rem;border-radius:0.5rem;">
            <p style="margin:0;"><strong>Recomendação:</strong> ${skill.avg >= 70 ? 'Turma demonstra domínio satisfatório. Continue com atividades de aprofundamento.' : 'Reforçar com atividades práticas e exercícios direcionados.'}</p>
          </div>
        `,
        idx === 0
      );
    }).join('');

    return styles + `
      <div style="max-width:800px;">
        <div style="margin-bottom:1.5rem;padding:1rem;background:#f8f9fa;border-left:4px solid #6e63e8;">
          <h4 style="margin:0 0 0.5rem 0;color:#202223;">Relatório de Habilidades - 7º Ano A</h4>
          <p style="margin:0;color:#5d596c;">Língua Portuguesa • Período: Janeiro a Março 2026</p>
        </div>
        ${html}
      </div>
    `;
  }
};

export const LeftIcon = {
  name: 'Left Icon Position',
  render: () => {
    return styles + `
      <style>
        .left-icon-demo .card-header {
          padding: 1rem 1rem 1rem 3.8rem;
        }
        .left-icon-demo .card-header::after {
          left: 1.5rem;
          right: auto;
        }
      </style>
      <div class="collapse-icon collapse-margin left-icon-demo" style="max-width:500px;">
        <div class="card">
          <div 
            class="card-header left" 
            role="tab"
            aria-expanded="false"
            aria-controls="left-collapse"
            data-bs-toggle="collapse"
            data-bs-target="#left-collapse"
            tabindex="0"
          >
            <span class="collapse-title">Ícone de seta à esquerda</span>
          </div>
          <div id="left-collapse" class="collapse" role="tabpanel">
            <div class="card-body">
              <p>Usado em navegações onde o ícone deve ter mais destaque visual.</p>
              <p>Padrão no frontoffice: ícone à direita.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

export const Responsive = {
  name: 'Responsive Behavior',
  parameters: {
    viewport: { defaultViewport: 'mobile1' }
  },
  render: () => {
    const collapse = createInteractiveCollapse();
    collapse.addListeners();
    return styles + `
      <div style="max-width:100%;padding:1rem;background:#f8f7fa;">
        ${collapse.render(
          'Título responsivo em mobile',
          `
            <p>Em telas menores:</p>
            <ul>
              <li>Padding reduzido (0.75rem)</li>
              <li>Chevron menor (0.35rem)</li>
              <li>Font-size título: 1.1rem</li>
              <li>Body padding: 1rem</li>
            </ul>
            <p>Touch target mínimo: 48x48px (WCAG 2.5.5)</p>
          `,
          false
        )}
      </div>
    `;
  }
};

export const LoadingSkeleton = {
  name: 'Loading Skeleton',
  render: () => {
    const skeletons = Array.from({ length: 3 }, (_, i) => {
      const collapse = createInteractiveCollapse();
      return collapse.render(
        `${i + 1}`,
        `
          <div style="animation: pulse 1.5s ease-in-out infinite;">
            <div style="height:120px;background:linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);border-radius:0.5rem;"></div>
          </div>
        `,
        false
      );
    }).join('');

    return styles + `
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      </style>
      <div style="max-width:600px;">
        <p style="color:#6c757d;margin-bottom:1rem;">Carregando relatório de habilidades...</p>
        ${skeletons}
      </div>
    `;
  }
};

export const Interactive = {
  name: 'Interactive Demo',
  render: () => {
    const accordionId = `accordion-${Math.random().toString(36).substr(2, 9)}`;
    
    setTimeout(() => {
      let openIndex = 0;
      const headers = document.querySelectorAll(`[data-accordion="${accordionId}"]`);
      
      headers.forEach((header, index) => {
        const collapseId = header.getAttribute('aria-controls');
        const collapse = document.getElementById(collapseId);
        
        const toggle = () => {
          // Close all others
          headers.forEach((h, i) => {
            if (i !== index) {
              h.setAttribute('aria-expanded', 'false');
              const c = document.getElementById(h.getAttribute('aria-controls'));
              if (c) c.classList.remove('show');
            }
          });
          
          // Toggle current
          const isExpanded = header.getAttribute('aria-expanded') === 'true';
          header.setAttribute('aria-expanded', !isExpanded);
          collapse.classList.toggle('show');
          openIndex = !isExpanded ? index : -1;
        };
        
        header.addEventListener('click', toggle);
        header.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (index + 1) % headers.length;
            headers[nextIndex].focus();
          } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (index - 1 + headers.length) % headers.length;
            headers[prevIndex].focus();
          }
        });
      });
    }, 100);
    
    return styles + `
      <div style="max-width:650px;">
        <div style="background:#e8f5e9;padding:1rem;border-radius:0.5rem;margin-bottom:1.5rem;border-left:4px solid #28c76f;">
          <h5 style="margin:0 0 0.5rem 0;color:#1b5e20;">✅ Interactive Demo</h5>
          <p style="margin:0;color:#2e7d32;">Clique nos headers ou use <kbd>Enter</kbd>/<kbd>Space</kbd> para expandir. Navegue com <kbd>↑</kbd>/<kbd>↓</kbd>.</p>
        </div>

        <div class="collapse-icon collapse-margin">
          <div class="card">
            <div 
              class="card-header" 
              role="tab"
              aria-expanded="true"
              aria-controls="demo-1"
              data-accordion="${accordionId}"
              tabindex="0"
            >
              <span class="collapse-title"><i class="bi bi-gear me-2"></i> Configurações da Conta</span>
            </div>
            <div id="demo-1" class="collapse show" role="tabpanel">
              <div class="card-body">
                <form>
                  <div class="mb-2">
                    <label class="form-label">Nome completo</label>
                    <input type="text" class="form-control" value="Maria Silva" />
                  </div>
                  <div class="mb-2">
                    <label class="form-label">E-mail</label>
                    <input type="email" class="form-control" value="maria.silva@escola.com.br" />
                  </div>
                  <button type="button" class="btn btn-primary btn-sm">Salvar Alterações</button>
                </form>
              </div>
            </div>
          </div>

          <div class="card">
            <div 
              class="card-header" 
              role="tab"
              aria-expanded="false"
              aria-controls="demo-2"
              data-accordion="${accordionId}"
              tabindex="0"
            >
              <span class="collapse-title"><i class="bi bi-bell me-2"></i> Notificações</span>
            </div>
            <div id="demo-2" class="collapse" role="tabpanel">
              <div class="card-body">
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="notif1" checked />
                  <label class="form-check-label" for="notif1">E-mail ao concluir missão</label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="notif2" />
                  <label class="form-check-label" for="notif2">Relatórios semanais</label>
                </div>
                <div class="form-check mb-2">
                  <input class="form-check-input" type="checkbox" id="notif3" checked />
                  <label class="form-check-label" for="notif3">Novos materiais de apoio</label>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div 
              class="card-header" 
              role="tab"
              aria-expanded="false"
              aria-controls="demo-3"
              data-accordion="${accordionId}"
              tabindex="0"
            >
              <span class="collapse-title"><i class="bi bi-shield-check me-2"></i> Privacidade e Segurança</span>
            </div>
            <div id="demo-3" class="collapse" role="tabpanel">
              <div class="card-body">
                <p><strong>Última atualização de senha:</strong> 15 de janeiro de 2026</p>
                <p><strong>Autenticação de dois fatores:</strong> <span style="color:#28c76f;">Ativada</span></p>
                <button type="button" class="btn btn-outline-primary btn-sm">Alterar Senha</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }


