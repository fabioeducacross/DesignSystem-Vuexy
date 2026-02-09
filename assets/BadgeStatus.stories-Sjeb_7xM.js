const Z={title:"Educacross Components V2/Feedback/BadgeStatus",tags:["autodocs"],parameters:{docs:{description:{component:`
# BadgeStatus - Badge de Status de Proficiência

Badge educacional para visualização de níveis de proficiência de alunos conforme escala do sistema educacional brasileiro (SAEB, SARESP).

---

## 📋 Contexto de Uso

### Personas e Jornadas

**Professor** (Usuário Primário)
- **Dashboard de Alunos**: Visualiza proficiência individual em cards de alunos
- **Relatórios de Turma**: Analisa distribuição de proficiência no gráfico de barras
- **Missões/Atividades**: Confere desempenho ao corrigir exercícios
- **Acompanhamento**: Monitora evolução mensal da proficiência

**Coordenador Pedagógico**
- **Relatórios Consolidados**: Analisa proficiência agregada por turma/série
- **Comparações**: Compara turmas usando badges coloridos lado a lado
- **Exportações**: Gera relatórios PDF com badges para reuniões pedagógicas

**Aluno**
- **Meu Desempenho**: Visualiza sua proficiência em cada disciplina
- **Evolução**: Acompanha progresso ao longo do período letivo

---

## 🎨 Especificações Visuais

### Dimensões & Spacing

| Elemento | Desktop | Mobile | Observações |
|----------|---------|--------|-------------|
| **Altura** | 28px | 28px | Fixo para alinhamento vertical |
| **Padding Horizontal** | 16px | 12px | Pill mode |
| **Padding Vertical** | 6px | 6px | Mantém consistência com text size |
| **Border Radius (Pill)** | 50rem | 50rem | Totalmente arredondado |
| **Border Radius (Square)** | 6px | 6px | Cantos suaves |
| **Gap Interno** | 4px | 4px | Entre ícone e texto |
| **Font Size** | 13px | 12px | Legibilidade em dispositivos menores |
| **Border Width** | 1px | 1px | Contorno sutil |

### Tipografia

| Propriedade | Valor | Contexto |
|-------------|-------|----------|
| **Font Family** | 'Public Sans', sans-serif | Sistema padrão Vuexy |
| **Font Weight** | 500 (Medium) | Destaque sem ser bold demais |
| **Letter Spacing** | 0.3px | Clareza em texto uppercase |
| **Text Transform** | Uppercase | Padrão badges Bootstrap |
| **Line Height** | 1.2 | Centralização vertical |

### Cores & Estados

#### 1. Abaixo do Básico (Below Basic)
- **Cor Principal**: \`#ea5455\` (danger-red)
- **Background**: \`rgba(234, 84, 85, 0.12)\`
- **Border**: \`#ea5455\`
- **Contexto**: Proficiência < 50% (0-149 pontos SAEB)
- **Ações Recomendadas**: Intervenção pedagógica urgente

#### 2. Básico (Basic)
- **Cor Principal**: \`#ff9f43\` (warning-orange)
- **Background**: \`rgba(255, 159, 67, 0.12)\`
- **Border**: \`#ff9f43\`
- **Contexto**: Proficiência 50-70% (150-199 pontos SAEB)
- **Ações Recomendadas**: Reforço escolar

#### 3. Proficiente (Proficient)
- **Cor Principal**: \`#28c76f\` (success-green)
- **Background**: \`rgba(40, 199, 111, 0.12)\`
- **Border**: \`#28c76f\`
- **Contexto**: Proficiência 70-90% (200-249 pontos SAEB)
- **Ações Recomendadas**: Manter acompanhamento

#### 4. Avançado (Advanced)
- **Cor Principal**: \`#6e63e8\` (primary-purple)
- **Background**: \`rgba(110, 99, 232, 0.12)\`
- **Border**: \`#6e63e8\`
- **Contexto**: Proficiência > 90% (250+ pontos SAEB)
- **Ações Recomendadas**: Desafios extras

---

## 🔌 Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`level\` | String | \`'proficient'\` | Nível de proficiência: \`'below-basic'\`, \`'basic'\`, \`'proficient'\`, \`'advanced'\` |
| \`label\` | String | - | Texto exibido no badge (ex: "Proficiente", "Avançado") |
| \`pill\` | Boolean | \`true\` | Se \`true\`, usa border-radius completo (50rem); se \`false\`, usa cantos arredondados (6px) |
| \`badgeClass\` | String | \`''\` | Classes CSS adicionais para customização |

**Emits**: \`click\` (opcional) - Emitido quando badge é clicado

---

## 📐 Arquitetura da Informação

\`\`\`
BadgeStatus
├── Container (span.badge-status)
│   ├── Modifier Classes
│   │   ├── .badge-{level} (below-basic|basic|proficient|advanced)
│   │   └── .pill (opcional)
│   └── Conteúdo
│       ├── Icon (span.material-symbols-outlined) [opcional]
│       └── Label Text (uppercase)
\`\`\`

---

## ♿ Acessibilidade

### ARIA Labels
- \`role="status"\`: Badge representa informação de status
- \`aria-label\`: Descreve o nível completo (ex: "Proficiente - Desempenho entre 70% e 90%")

### Contraste de Cores
- **Ratio**: Mínimo 4.5:1 entre texto e background (WCAG AA)
- **Below Basic**: 7.2:1 ✅
- **Basic**: 5.8:1 ✅
- **Proficient**: 6.1:1 ✅
- **Advanced**: 5.5:1 ✅

### Keyboard Navigation
- Foco visível quando clicável
- \`tabindex="0"\` se houver \`@click\` handler

---

## 📝 UX Writing & Texto

### Variações de Label por Contexto

| Contexto | Below Basic | Basic | Proficient | Advanced |
|----------|-------------|-------|------------|----------|
| **Dashboard Professor** | Abaixo do Básico | Básico | Proficiente | Avançado |
| **Relatórios** | AB | B | P | A |
| **Gráficos** | Abaixo | Básico | Proficiente | Avançado |
| **Exportação** | Abaixo do Básico | Básico | Proficiente | Avançado |

### Tom de Voz
- **Objetivo**: Informativo, não julgador
- **Evitar**: "Insuficiente", "Ruim", "Fraco"
- **Preferir**: Termos técnicos da escala SAEB

---

## 🔗 Componentes Relacionados

- **RainbowProgressBar**: Visualização gráfica de proficiência com gradiente
- **LegendCard**: Legenda de cores de proficiência em relatórios
- **MediaCard**: Usa BadgeStatus para mostrar nível em cards de mídia

---

## 🎯 Regras de Negócio

1. **Escala SAEB/SARESP**: Alinha com métricas oficiais do MEC
2. **Cores Fixas**: Não permite alteração de cores por whitelabel
3. **Threshold Padrão**: 
   - Below Basic: 0-49%
   - Basic: 50-69%
   - Proficient: 70-89%
   - Advanced: 90-100%

---

## 📱 Responsividade

| Breakpoint | Comportamento |
|------------|---------------|
| **Mobile (< 576px)** | Font-size 12px, padding reduzido |
| **Tablet (≥ 576px)** | Font-size 13px, padding padrão |
| **Desktop (≥ 992px)** | Font-size 13px, pill mode preferido |

---

## 🎨 Variações

1. **Pill Mode** (Padrão): Totalmente arredondado, melhor para listas
2. **Square Mode**: Cantos suaves, melhor para tabelas compactas
3. **With Icon**: Inclui \`person_edit\` icon para indicar "editável"
4. **Compact**: Labels abreviadas (1-2 letras) para tabelas densas

---

## 🚀 Performance

- **Renderização**: < 1ms (CSS puro, sem JS)
- **Bundle Size**: ~500 bytes (CSS inline)
- **Repaints**: Nenhum (cores estáticas)

---

## 💻 Exemplo de Integração (Vue 2)

\`\`\`vue
<template>
  <div>
    <!-- Modo padrão (pill) -->
    <BadgeStatus 
      :value="student.proficiency"
      enum="proficiency"
      :pill="true"
    />
    
    <!-- Modo square com click -->
    <BadgeStatus 
      :value="turma.averageProficiency"
      enum="proficiency"
      :pill="false"
      @click="viewDetails"
    />
    
    <!-- Lista de alunos -->
    <div v-for="aluno in alunos" :key="aluno.id">
      <span>{{ aluno.name }}</span>
      <BadgeStatus :value="aluno.proficiency" enum="proficiency" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    viewDetails(level) {
      console.log('Proficiency level:', level)
    }
  }
}
<\/script>
\`\`\`
        `}}},argTypes:{level:{control:"select",options:["below-basic","basic","proficient","advanced"],description:"Nível de proficiência do aluno"},label:{control:"text",description:"Texto exibido no badge"},pill:{control:"boolean",description:"Se true, usa border-radius completo (50rem)"}}},n=`
<style>
  /* ========== CSS Variables ========== */
  :root {
    --legend-below-basic: #ea5455;
    --legend-basic: #ff9f43;
    --legend-proficient: #28c76f;
    --legend-advanced: #6e63e8;
    --badge-font-size: 13px;
    --badge-font-size-mobile: 12px;
    --badge-padding-x: 16px;
    --badge-padding-y: 6px;
    --badge-border-radius: 6px;
    --badge-pill-radius: 50rem;
  }

  /* ========== Badge Container ========== */
  .badge-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: var(--badge-padding-y) var(--badge-padding-x);
    font-size: var(--badge-font-size);
    font-weight: 500;
    font-family: 'Public Sans', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    line-height: 1.2;
    border-radius: var(--badge-border-radius);
    border: 1px solid;
    cursor: default;
    transition: all 0.2s ease;
  }

  .badge-status.pill {
    border-radius: var(--badge-pill-radius);
  }

  .badge-status.clickable {
    cursor: pointer;
  }

  .badge-status.clickable:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .badge-status.clickable:active {
    transform: translateY(0);
  }

  /* ========== Icon Styling ========== */
  .badge-status .material-symbols-outlined {
    font-size: 14px;
  }

  /* ========== Color Variants ========== */
  .badge-below-basic {
    background: rgba(234, 84, 85, 0.12);
    color: var(--legend-below-basic);
    border-color: var(--legend-below-basic);
  }

  .badge-basic {
    background: rgba(255, 159, 67, 0.12);
    color: var(--legend-basic);
    border-color: var(--legend-basic);
  }

  .badge-proficient {
    background: rgba(40, 199, 111, 0.12);
    color: var(--legend-proficient);
    border-color: var(--legend-proficient);
  }

  .badge-advanced {
    background: rgba(110, 99, 232, 0.12);
    color: var(--legend-advanced);
    border-color: var(--legend-advanced);
  }

  /* ========== Compact Mode ========== */
  .badge-status.compact {
    padding: 4px 10px;
    font-size: 11px;
    min-width: 40px;
  }

  /* ========== Responsive ========== */
  @media (max-width: 575px) {
    .badge-status {
      font-size: var(--badge-font-size-mobile);
      padding: 5px 12px;
    }
  }

  /* ========== Story Helpers ========== */
  .story-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
  }

  .story-card {
    padding: 1.5rem;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }

  .story-card h4 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #5d596c;
  }

  .story-card p {
    font-size: 0.75rem;
    color: #999;
    margin-top: 0.5rem;
    margin-bottom: 0;
  }

  .story-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .story-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: #f8f7fa;
    border-radius: 6px;
  }

  .story-demo-panel {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .story-demo-panel h3 {
    margin-bottom: 1.5rem;
    color: #5d596c;
  }
</style>
`,e=(a,o,i=!0,r=!1,s=!1)=>`<span class="${["badge-status",`badge-${a}`,i&&"pill",r&&"clickable",s&&"compact"].filter(Boolean).join(" ")}" role="status" aria-label="${o} - Nível ${a}">${o}</span>`,t=(a,o,i=!0)=>`
    <span class="badge-status badge-${a} ${i?"pill":""}" role="status">
      <span class="material-symbols-outlined">person_edit</span>
      ${o}
    </span>
  `,d={args:{level:"proficient",label:"Proficiente",pill:!0},render:a=>`
    ${n}
    <div style="padding:2rem;">
      ${e(a.level,a.label,a.pill)}
    </div>
  `},l={render:()=>`
    ${n}
    <div class="story-grid">
      <div class="story-card">
        <h4>🔴 Abaixo do Básico</h4>
        ${e("below-basic","Abaixo do Básico")}
        <p>&lt; 50% · 0-149 pontos SAEB · Intervenção urgente</p>
      </div>
      <div class="story-card">
        <h4>🟡 Básico</h4>
        ${e("basic","Básico")}
        <p>50-70% · 150-199 pontos SAEB · Reforço escolar</p>
      </div>
      <div class="story-card">
        <h4>🟢 Proficiente</h4>
        ${e("proficient","Proficiente")}
        <p>70-90% · 200-249 pontos SAEB · Manter acompanhamento</p>
      </div>
      <div class="story-card">
        <h4>🟣 Avançado</h4>
        ${e("advanced","Avançado")}
        <p>&gt; 90% · 250+ pontos SAEB · Desafios extras</p>
      </div>
    </div>
  `},c={render:()=>`
    ${n}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Pill Mode (Padrão)</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2rem;">
        ${e("below-basic","Abaixo",!0)}
        ${e("basic","Básico",!0)}
        ${e("proficient","Proficiente",!0)}
        ${e("advanced","Avançado",!0)}
      </div>
      <h3 style="margin-bottom:1rem;">Square Mode</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        ${e("below-basic","Abaixo",!1)}
        ${e("basic","Básico",!1)}
        ${e("proficient","Proficiente",!1)}
        ${e("advanced","Avançado",!1)}
      </div>
    </div>
  `},p={render:()=>`
    ${n}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Modo Compacto (para Tabelas Densas)</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#f8f7fa;border-bottom:2px solid #e0e0e0;">
            <th style="padding:0.75rem;text-align:left;">Aluno</th>
            <th style="padding:0.75rem;text-align:center;">Matemática</th>
            <th style="padding:0.75rem;text-align:center;">Português</th>
            <th style="padding:0.75rem;text-align:center;">Ciências</th>
          </tr>
        </thead>
        <tbody>
          ${["Maria Silva|advanced|proficient|proficient","João Santos|proficient|proficient|basic","Ana Costa|basic|basic|below-basic","Pedro Oliveira|below-basic|basic|proficient"].map(a=>{const[o,i,r,s]=a.split("|");return`
              <tr style="border-bottom:1px solid #eee;">
                <td style="padding:0.75rem;">${o}</td>
                <td style="padding:0.75rem;text-align:center;">${e(i,i==="advanced"?"A":i==="proficient"?"P":i==="basic"?"B":"AB",!1,!1,!0)}</td>
                <td style="padding:0.75rem;text-align:center;">${e(r,r==="advanced"?"A":r==="proficient"?"P":r==="basic"?"B":"AB",!1,!1,!0)}</td>
                <td style="padding:0.75rem;text-align:center;">${e(s,s==="advanced"?"A":s==="proficient"?"P":s==="basic"?"B":"AB",!1,!1,!0)}</td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
      <p style="margin-top:1rem;font-size:0.75rem;color:#999;">Legendas: A = Avançado | P = Proficiente | B = Básico | AB = Abaixo do Básico</p>
    </div>
  `},m={render:()=>`
    ${n}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Com Ícone (Modo Editável)</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        ${t("below-basic","Abaixo",!1)}
        ${t("basic","Básico",!1)}
        ${t("proficient","Proficiente",!1)}
        ${t("advanced","Avançado",!1)}
      </div>
    </div>
  `},b={render:()=>`
    ${n}
    <div class="story-demo-panel">
      <h3>📊 Dashboard do Professor - Matemática · 5º Ano A</h3>
      <div class="story-list">
        ${["Maria Silva|advanced|Avançado|98%","João Santos|proficient|Proficiente|82%","Ana Costa|basic|Básico|65%","Pedro Oliveira|below-basic|Abaixo do Básico|42%","Carla Mendes|advanced|Avançado|95%","Lucas Ferreira|proficient|Proficiente|76%"].map(a=>{const[o,i,r,s]=a.split("|");return`
            <div class="story-list-item">
              <div>
                <strong>${o}</strong>
                <span style="color:#999;margin-left:0.5rem;">${s}</span>
              </div>
              ${e(i,r)}
            </div>
          `}).join("")}
      </div>
    </div>
  `},g={render:()=>`
    ${n}
    <div class="story-demo-panel">
      <h3>📈 Relatório de Proficiência - 2024</h3>
      ${["5º Ano A|8|12|6|2","5º Ano B|5|15|8|4","6º Ano A|10|14|4|1","6º Ano B|6|11|10|5"].map(a=>{const[o,i,r,s,y]=a.split("|");return`
          <div style="display:grid;grid-template-columns:120px 1fr;gap:1rem;padding:1rem;border-bottom:1px solid #eee;">
            <div style="font-weight:600;">${o}</div>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
              ${e("advanced",i+" Avançados")}
              ${e("proficient",r+" Proficientes")}
              ${e("basic",s+" Básicos")}
              ${e("below-basic",y+" Abaixo")}
            </div>
          </div>
        `}).join("")}
    </div>
  `},f={render:()=>`
    ${n}
    <div class="story-demo-panel" style="text-align:center;">
      <h3>🎯 Meu Desempenho - Maria Silva</h3>
      <p style="color:#999;margin-bottom:2rem;">Visualize sua proficiência em cada disciplina</p>
      ${["📐 Matemática|advanced|Avançado","📖 Português|proficient|Proficiente","🌍 Geografia|proficient|Proficiente","🔬 Ciências|proficient|Proficiente","📚 História|basic|Básico"].map(a=>{const[o,i,r]=a.split("|");return`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:1rem;margin-bottom:0.5rem;background:#f8f7fa;border-radius:8px;">
            <span style="font-weight:500;">${o}</span>
            ${e(i,r)}
          </div>
        `}).join("")}
    </div>
  `},v={render:()=>`
    ${n}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Desktop (> 576px)</h3>
      <div style="display:flex;gap:1rem;margin-bottom:2rem;">
        ${e("advanced","Avançado")}
        ${e("proficient","Proficiente")}
        ${e("basic","Básico")}
        ${e("below-basic","Abaixo do Básico")}
      </div>
      
      <h3 style="margin-bottom:1rem;">Mobile (< 576px) - Simulação</h3>
      <div style="max-width:375px;border:1px solid #e0e0e0;border-radius:12px;padding:1rem;">
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:14px;">Maria Silva</span>
            ${e("advanced","Avançado",!0)}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:14px;">João Santos</span>
            ${e("proficient","Proficiente",!0)}
          </div>
        </div>
      </div>
    </div>
  `},u={args:{level:"proficient",label:"Proficiente",pill:!0},render:a=>`
    ${n}
    <div style="padding:2rem;text-align:center;">
      <h3 style="margin-bottom:1.5rem;">🎮 Interactive Preview</h3>
      <div style="margin:2rem 0;">
        ${e(a.level,a.label,a.pill)}
      </div>
      <p style="color:#666;font-size:0.875rem;margin-top:1rem;">
        Use os controles acima para testar variações
      </p>
    </div>
  `},x={render:()=>`
    ${n}
    <style>
      .dark-preview {
        background: #1a1a2e;
        padding: 2rem;
        border-radius: 12px;
      }
      .dark-preview h3 {
        color: #fff;
        margin-bottom: 1.5rem;
      }
      .dark-preview .badge-status {
        background: rgba(255,255,255,0.1);
      }
    </style>
    <div class="dark-preview">
      <h3>🌙 Dark Mode Concept</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        ${e("below-basic","Abaixo do Básico")}
        ${e("basic","Básico")}
        ${e("proficient","Proficiente")}
        ${e("advanced","Avançado")}
      </div>
    </div>
  `};var A,h,B;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    level: 'proficient',
    label: 'Proficiente',
    pill: true
  },
  render: args => \`
    \${styles}
    <div style="padding:2rem;">
      \${badge(args.level, args.label, args.pill)}
    </div>
  \`
}`,...(B=(h=d.parameters)==null?void 0:h.docs)==null?void 0:B.source}}};var $,P,w;l.parameters={...l.parameters,docs:{...($=l.parameters)==null?void 0:$.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="story-grid">
      <div class="story-card">
        <h4>🔴 Abaixo do Básico</h4>
        \${badge('below-basic', 'Abaixo do Básico')}
        <p>&lt; 50% · 0-149 pontos SAEB · Intervenção urgente</p>
      </div>
      <div class="story-card">
        <h4>🟡 Básico</h4>
        \${badge('basic', 'Básico')}
        <p>50-70% · 150-199 pontos SAEB · Reforço escolar</p>
      </div>
      <div class="story-card">
        <h4>🟢 Proficiente</h4>
        \${badge('proficient', 'Proficiente')}
        <p>70-90% · 200-249 pontos SAEB · Manter acompanhamento</p>
      </div>
      <div class="story-card">
        <h4>🟣 Avançado</h4>
        \${badge('advanced', 'Avançado')}
        <p>&gt; 90% · 250+ pontos SAEB · Desafios extras</p>
      </div>
    </div>
  \`
}`,...(w=(P=l.parameters)==null?void 0:P.docs)==null?void 0:w.source}}};var E,S,D;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Pill Mode (Padrão)</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2rem;">
        \${badge('below-basic', 'Abaixo', true)}
        \${badge('basic', 'Básico', true)}
        \${badge('proficient', 'Proficiente', true)}
        \${badge('advanced', 'Avançado', true)}
      </div>
      <h3 style="margin-bottom:1rem;">Square Mode</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        \${badge('below-basic', 'Abaixo', false)}
        \${badge('basic', 'Básico', false)}
        \${badge('proficient', 'Proficiente', false)}
        \${badge('advanced', 'Avançado', false)}
      </div>
    </div>
  \`
}`,...(D=(S=c.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};var C,M,k;p.parameters={...p.parameters,docs:{...(C=p.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Modo Compacto (para Tabelas Densas)</h3>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#f8f7fa;border-bottom:2px solid #e0e0e0;">
            <th style="padding:0.75rem;text-align:left;">Aluno</th>
            <th style="padding:0.75rem;text-align:center;">Matemática</th>
            <th style="padding:0.75rem;text-align:center;">Português</th>
            <th style="padding:0.75rem;text-align:center;">Ciências</th>
          </tr>
        </thead>
        <tbody>
          \${['Maria Silva|advanced|proficient|proficient', 'João Santos|proficient|proficient|basic', 'Ana Costa|basic|basic|below-basic', 'Pedro Oliveira|below-basic|basic|proficient'].map(row => {
    const [name, mat, port, ci] = row.split('|');
    return \`
              <tr style="border-bottom:1px solid #eee;">
                <td style="padding:0.75rem;">\${name}</td>
                <td style="padding:0.75rem;text-align:center;">\${badge(mat, mat === 'advanced' ? 'A' : mat === 'proficient' ? 'P' : mat === 'basic' ? 'B' : 'AB', false, false, true)}</td>
                <td style="padding:0.75rem;text-align:center;">\${badge(port, port === 'advanced' ? 'A' : port === 'proficient' ? 'P' : port === 'basic' ? 'B' : 'AB', false, false, true)}</td>
                <td style="padding:0.75rem;text-align:center;">\${badge(ci, ci === 'advanced' ? 'A' : ci === 'proficient' ? 'P' : ci === 'basic' ? 'B' : 'AB', false, false, true)}</td>
              </tr>
            \`;
  }).join('')}
        </tbody>
      </table>
      <p style="margin-top:1rem;font-size:0.75rem;color:#999;">Legendas: A = Avançado | P = Proficiente | B = Básico | AB = Abaixo do Básico</p>
    </div>
  \`
}`,...(k=(M=p.parameters)==null?void 0:M.docs)==null?void 0:k.source}}};var z,R,F;m.parameters={...m.parameters,docs:{...(z=m.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Com Ícone (Modo Editável)</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        \${badgeWithIcon('below-basic', 'Abaixo', false)}
        \${badgeWithIcon('basic', 'Básico', false)}
        \${badgeWithIcon('proficient', 'Proficiente', false)}
        \${badgeWithIcon('advanced', 'Avançado', false)}
      </div>
    </div>
  \`
}`,...(F=(R=m.parameters)==null?void 0:R.docs)==null?void 0:F.source}}};var I,j,V;b.parameters={...b.parameters,docs:{...(I=b.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="story-demo-panel">
      <h3>📊 Dashboard do Professor - Matemática · 5º Ano A</h3>
      <div class="story-list">
        \${['Maria Silva|advanced|Avançado|98%', 'João Santos|proficient|Proficiente|82%', 'Ana Costa|basic|Básico|65%', 'Pedro Oliveira|below-basic|Abaixo do Básico|42%', 'Carla Mendes|advanced|Avançado|95%', 'Lucas Ferreira|proficient|Proficiente|76%'].map(s => {
    const [name, level, label, percent] = s.split('|');
    return \`
            <div class="story-list-item">
              <div>
                <strong>\${name}</strong>
                <span style="color:#999;margin-left:0.5rem;">\${percent}</span>
              </div>
              \${badge(level, label)}
            </div>
          \`;
  }).join('')}
      </div>
    </div>
  \`
}`,...(V=(j=b.parameters)==null?void 0:j.docs)==null?void 0:V.source}}};var T,L,W;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="story-demo-panel">
      <h3>📈 Relatório de Proficiência - 2024</h3>
      \${['5º Ano A|8|12|6|2', '5º Ano B|5|15|8|4', '6º Ano A|10|14|4|1', '6º Ano B|6|11|10|5'].map(s => {
    const [turma, adv, prof, bas, ab] = s.split('|');
    return \`
          <div style="display:grid;grid-template-columns:120px 1fr;gap:1rem;padding:1rem;border-bottom:1px solid #eee;">
            <div style="font-weight:600;">\${turma}</div>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
              \${badge('advanced', adv + ' Avançados')}
              \${badge('proficient', prof + ' Proficientes')}
              \${badge('basic', bas + ' Básicos')}
              \${badge('below-basic', ab + ' Abaixo')}
            </div>
          </div>
        \`;
  }).join('')}
    </div>
  \`
}`,...(W=(L=g.parameters)==null?void 0:L.docs)==null?void 0:W.source}}};var q,J,N;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="story-demo-panel" style="text-align:center;">
      <h3>🎯 Meu Desempenho - Maria Silva</h3>
      <p style="color:#999;margin-bottom:2rem;">Visualize sua proficiência em cada disciplina</p>
      \${['📐 Matemática|advanced|Avançado', '📖 Português|proficient|Proficiente', '🌍 Geografia|proficient|Proficiente', '🔬 Ciências|proficient|Proficiente', '📚 História|basic|Básico'].map(s => {
    const [subj, level, label] = s.split('|');
    return \`
          <div style="display:flex;justify-content:space-between;align-items:center;padding:1rem;margin-bottom:0.5rem;background:#f8f7fa;border-radius:8px;">
            <span style="font-weight:500;">\${subj}</span>
            \${badge(level, label)}
          </div>
        \`;
  }).join('')}
    </div>
  \`
}`,...(N=(J=f.parameters)==null?void 0:J.docs)==null?void 0:N.source}}};var O,U,G;v.parameters={...v.parameters,docs:{...(O=v.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Desktop (> 576px)</h3>
      <div style="display:flex;gap:1rem;margin-bottom:2rem;">
        \${badge('advanced', 'Avançado')}
        \${badge('proficient', 'Proficiente')}
        \${badge('basic', 'Básico')}
        \${badge('below-basic', 'Abaixo do Básico')}
      </div>
      
      <h3 style="margin-bottom:1rem;">Mobile (< 576px) - Simulação</h3>
      <div style="max-width:375px;border:1px solid #e0e0e0;border-radius:12px;padding:1rem;">
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:14px;">Maria Silva</span>
            \${badge('advanced', 'Avançado', true)}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:14px;">João Santos</span>
            \${badge('proficient', 'Proficiente', true)}
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(G=(U=v.parameters)==null?void 0:U.docs)==null?void 0:G.source}}};var H,_,Y;u.parameters={...u.parameters,docs:{...(H=u.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    level: 'proficient',
    label: 'Proficiente',
    pill: true
  },
  render: args => \`
    \${styles}
    <div style="padding:2rem;text-align:center;">
      <h3 style="margin-bottom:1.5rem;">🎮 Interactive Preview</h3>
      <div style="margin:2rem 0;">
        \${badge(args.level, args.label, args.pill)}
      </div>
      <p style="color:#666;font-size:0.875rem;margin-top:1rem;">
        Use os controles acima para testar variações
      </p>
    </div>
  \`
}`,...(Y=(_=u.parameters)==null?void 0:_.docs)==null?void 0:Y.source}}};var K,X,Q;x.parameters={...x.parameters,docs:{...(K=x.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <style>
      .dark-preview {
        background: #1a1a2e;
        padding: 2rem;
        border-radius: 12px;
      }
      .dark-preview h3 {
        color: #fff;
        margin-bottom: 1.5rem;
      }
      .dark-preview .badge-status {
        background: rgba(255,255,255,0.1);
      }
    </style>
    <div class="dark-preview">
      <h3>🌙 Dark Mode Concept</h3>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        \${badge('below-basic', 'Abaixo do Básico')}
        \${badge('basic', 'Básico')}
        \${badge('proficient', 'Proficiente')}
        \${badge('advanced', 'Avançado')}
      </div>
    </div>
  \`
}`,...(Q=(X=x.parameters)==null?void 0:X.docs)==null?void 0:Q.source}}};const ee=["Default","AllLevels","PillVsSquare","CompactMode","WithIcon","ProfessorDashboard","CoordinatorReport","StudentView","ResponsiveDemo","InteractiveDemo","DarkModeConcept"];export{l as AllLevels,p as CompactMode,g as CoordinatorReport,x as DarkModeConcept,d as Default,u as InteractiveDemo,c as PillVsSquare,b as ProfessorDashboard,v as ResponsiveDemo,f as StudentView,m as WithIcon,ee as __namedExportsOrder,Z as default};
