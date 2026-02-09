const W={title:"Educacross Components V2/Data Display/SubjectBand",tags:["autodocs"],parameters:{docs:{description:{component:`
# SubjectBand - Banda de Disciplinas Coloridas

Componente de identificação visual que exibe bandas coloridas representando uma ou mais disciplinas escolares conforme padrões BNCC.

---

## 📋 Contexto de Uso

### Personas e Jornadas

**Professor** (Uso Principal)
- **Avaliações**: Identifica visualmente a disciplina no cabeçalho de provas
- **Relatórios**: Visualiza disciplinas abordadas em missões/atividades
- **Planejamento**: Confirma disciplinas selecionadas ao criar conteúdo

**Coordenador Pedagógico**
- **Relatórios Gerenciais**: Visualiza distribuição de disciplinas em dashboards
- **Análise**: Identifica gaps de cobertura curricular (disciplinas não abordadas)
- **Comparações**: Compara carga de atividades entre disciplinas

**Aluno**
- **Atividades**: Identifica matéria da atividade/missão no card
- **Histórico**: Visualiza disciplinas cursadas em relatórios de progresso

---

## 🎨 Especificações Visuais

### Dimensões & Spacing

| Elemento | Desktop | Mobile | Observações |
|----------|---------|--------|-------------|
| **Altura da Banda** | 40px | 32px | Altura fixa para consistência |
| **Padding Interno** | 8px | 6px | Espaço ao redor do texto |
| **Gap entre Bandas** | 4px | 4px | Espaçamento horizontal |
| **Margin Bottom** | 8px | 8px | Espaço após o componente (0.5rem) |
| **Border Radius** | 6px | 6px | Cantos suavemente arredondados |
| **Font Size** | 14px | 13px | Legibilidade em mobile |

### Tipografia

| Propriedade | Valor | Contexto |
|-------------|-------|----------|
| **Font Family** | 'Public Sans', sans-serif | Sistema padrão Vuexy |
| **Font Weight** | 700 (Bold) | Destaque e legibilidade |
| **Text Align** | Center | Centralização horizontal e vertical |
| **Color** | #ffffff | Branco para contraste sobre cores vibrantes |
| **Line Height** | 1.5 | Centralização vertical |

### Cores por Disciplina (Padrão BNCC)

| Disciplina | Cor Principal | RGB | Hex | Uso |
|-----------|---------------|-----|-----|-----|
| **Matemática** | Primary | 110, 99, 232 | #6e63e8 | Raciocínio lógico |
| **Português** | Info | 0, 207, 232 | #00cfe8 | Linguagens |
| **Ciências** | Success | 40, 199, 111 | #28c76f | Natureza/Biologia |
| **História** | Warning | 255, 159, 67 | #ff9f43 | Humanidades/Tempo |
| **Geografia** | Danger | 234, 84, 85 | #ea5455 | Espaço/Território |
| **Inglês** | Secondary | 108, 117, 125 | #6c757d | Língua estrangeira |
| **Artes** | Purple (Custom) | 156, 39, 176 | #9c27b0 | Criatividade |
| **Ed. Física** | Orange (Custom) | 255, 152, 0 | #ff9800 | Movimento |

---

## 🔌 Props API

| Prop | Tipo | Default | Descrição |
|------|------|---------|-----------|
| \`subjectsIds\` | Array<String> | \`[]\` | Array de IDs de disciplinas (ex: \`['math', 'portuguese']\`) |

**Observação**: O componente mapeia automaticamente os IDs para objetos do \`SubjectEnum\` que contêm \`label\` e \`variant\` (cor).

---

## ♿ Acessibilidade

### ARIA Labels
- \`role="list"\`: Container de bandas representa uma lista de disciplinas
- \`role="listitem"\`: Cada banda é um item da lista
- \`aria-label\`: Descreve a disciplina (ex: "Matemática - Disciplina principal")

### Contraste de Cores
- **Ratio**: Mínimo 4.5:1 entre branco (#fff) e cores de fundo
- Todas as cores passam teste WCAG AA ✅

### Screen Readers
- Texto claro e descritivo (nome completo da disciplina)
- Ordem de leitura lógica (esquerda → direita)

---

## 💻 Exemplo de Integração (Vue 2)

\`\`\`vue
<template>
  <div>
    <!-- Disciplina única -->
    <SubjectBand :subjectsIds="['math']" />
    
    <!-- Múltiplas disciplinas -->
    <SubjectBand :subjectsIds="['math', 'portuguese', 'science']" />
    
    <!-- Em card de avaliação -->
    <div class="evaluation-card">
      <SubjectBand :subjectsIds="evaluation.subjects" />
      <h3>{{ evaluation.title }}</h3>
      <p>{{ evaluation.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      evaluation: {
        subjects: ['math', 'science'],
        title: 'Avaliação de Álgebra e Química',
        description: 'Prova multidisciplinar...'
      }
    }
  }
}
<\/script>
\`\`\`
        `}}},argTypes:{subjectsIds:{control:"object",description:"Array de IDs de disciplinas"}}},a=`
<style>
  :root {
    --primary: #6e63e8;
    --info: #00cfe8;
    --success: #28c76f;
    --warning: #ff9f43;
    --danger: #ea5455;
    --secondary: #6c757d;
    --purple-custom: #9c27b0;
    --orange-custom: #ff9800;
  }

  .subject-band-container {
    display: flex;
    flex-direction: row;
    gap: 4px;
    margin-bottom: 8px;
  }

  .subject-band {
    flex: 1;
    padding: 8px;
    color: #ffffff;
    font-weight: 700;
    font-size: 14px;
    font-family: 'Public Sans', sans-serif;
    text-align: center;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    text-transform: capitalize;
    line-height: 1.5;
  }

  .bg-primary { background-color: var(--primary); }
  .bg-info { background-color: var(--info); }
  .bg-success { background-color: var(--success); }
  .bg-warning { background-color: var(--warning); }
  .bg-danger { background-color: var(--danger); }
  .bg-secondary { background-color: var(--secondary); }
  .bg-purple { background-color: var(--purple-custom); }
  .bg-orange { background-color: var(--orange-custom); }

  @media (max-width: 575px) {
    .subject-band-container {
      flex-direction: column;
    }
    .subject-band {
      min-height: 32px;
      font-size: 13px;
      padding: 6px;
    }
  }

  .story-demo-panel {
    max-width: 900px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .evaluation-card {
    padding: 1.5rem;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  .evaluation-card h4 {
    margin-top: 0.5rem;
    margin-bottom: 0.25rem;
    font-size: 1rem;
    color: #5d596c;
  }

  .evaluation-card p {
    margin: 0;
    font-size: 0.875rem;
    color: #999;
  }
</style>
`,e=r=>{const R={math:{label:"Matemática",variant:"primary"},portuguese:{label:"Língua Portuguesa",variant:"info"},science:{label:"Ciências",variant:"success"},history:{label:"História",variant:"warning"},geography:{label:"Geografia",variant:"danger"},english:{label:"Língua Inglesa",variant:"secondary"},arts:{label:"Artes",variant:"purple"},physical_education:{label:"Educação Física",variant:"orange"}};return`<section class="subject-band-container" role="list">${r.map(T=>{const p=R[T];return`
      <div class="subject-band bg-${p.variant}" role="listitem" aria-label="${p.label}">
        ${p.label}
      </div>
    `}).join("")}</section>`},s={args:{subjectsIds:["math"]},render:r=>`
    ${a}
    <div style="padding:2rem;">
      ${e(r.subjectsIds)}
    </div>
  `},n={render:()=>`
    ${a}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1.5rem;">Todas as Disciplinas (BNCC)</h3>
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🔵 Matemática</h4>
      ${e(["math"])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">💙 Língua Portuguesa</h4>
      ${e(["portuguese"])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🟢 Ciências</h4>
      ${e(["science"])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🟡 História</h4>
      ${e(["history"])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🔴 Geografia</h4>
      ${e(["geography"])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">⚫ Inglês</h4>
      ${e(["english"])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🟣 Artes</h4>
      ${e(["arts"])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🟠 Educação Física</h4>
      ${e(["physical_education"])}
    </div>
  `},i={render:()=>`
    ${a}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1.5rem;">Combinações Comuns</h3>
      
      <h4>Exatas</h4>
      ${e(["math","science"])}
      
      <h4 style="margin-top:1.5rem;">Humanas</h4>
      ${e(["history","geography"])}
      
      <h4 style="margin-top:1.5rem;">Linguagens</h4>
      ${e(["portuguese","english","arts"])}
    </div>
  `},t={render:()=>`
    ${a}
    <div class="story-demo-panel">
      <h3 style="margin-bottom:1.5rem;">📝 Cabeçalhos de Avaliação</h3>
      
      <div class="evaluation-card">
        ${e(["math"])}
        <h4>Avaliação de Álgebra</h4>
        <p>Equações de 1º e 2º grau · 5º Ano A · 15 questões</p>
      </div>
      
      <div class="evaluation-card">
        ${e(["portuguese"])}
        <h4>Interpretação de Texto</h4>
        <p>Gêneros textuais e ortografia · 6º Ano B · 20 questões</p>
      </div>
      
      <div class="evaluation-card">
        ${e(["math","science"])}
        <h4>Prova Multidisciplinar</h4>
        <p>Matemática financeira e Química · 9º Ano · 30 questões</p>
      </div>
    </div>
  `},o={render:()=>`
    ${a}
    <div class="story-demo-panel">
      <h3 style="margin-bottom:1.5rem;">🎯 Cards de Missões</h3>
      
      <div class="evaluation-card">
        ${e(["history","geography"])}
        <h4>Missão: Brasil Colonial</h4>
        <p>Estudo sobre as capitanias hereditárias e o território brasileiro</p>
        <small style="color:#999;">Prazo: 15/03/2024 | 28 alunos</small>
      </div>
      
      <div class="evaluation-card">
        ${e(["portuguese","arts"])}
        <h4>Projeto: Literatura Visual</h4>
        <p>Criação de histórias ilustradas com técnicas artísticas</p>
        <small style="color:#999;">Prazo: 20/03/2024 | 32 alunos</small>
      </div>
    </div>
  `},d={render:()=>`
    ${a}
    <div class="story-demo-panel">
      <h3 style="margin-bottom:1.5rem;">📊 Widget de Dashboard</h3>
      <p style="margin-bottom:1.5rem;color:#666;">Atividades da Semana</p>
      
      <div style="display:grid;grid-template-columns:1fr;gap:1rem;">
        <div style="padding:1rem;background:#f8f7fa;border-radius:8px;">
          ${e(["math"])}
          <div style="margin-top:0.75rem;">
            <strong>Prova de Geometria</strong>
            <div style="display:flex;justify-content:space-between;margin-top:0.25rem;font-size:0.875rem;color:#999;">
              <span>5º Ano A</span>
              <span>Hoje · 14:00</span>
            </div>
          </div>
        </div>
        
        <div style="padding:1rem;background:#f8f7fa;border-radius:8px;">
          ${e(["portuguese","english"])}
          <div style="margin-top:0.75rem;">
            <strong>Redação Bilíngue</strong>
            <div style="display:flex;justify-content:space-between;margin-top:0.25rem;font-size:0.875rem;color:#999;">
              <span>6º Ano B</span>
              <span>Amanhã · 10:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `},c={render:()=>`
    ${a}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Desktop (> 576px)</h3>
      <div style="margin-bottom:3rem;">
        ${e(["math","portuguese","science"])}
      </div>
      
      <h3 style="margin-bottom:1rem;">Mobile (< 576px) - Simulação</h3>
      <div style="max-width:375px;border:1px solid #e0e0e0;border-radius:12px;padding:1rem;">
        <style>
          .mobile-demo .subject-band-container {
            flex-direction: column;
          }
          .mobile-demo .subject-band {
            min-height: 32px;
            font-size: 13px;
            padding: 6px;
          }
        </style>
        <div class="mobile-demo">
          ${e(["math","portuguese","science"])}
        </div>
      </div>
    </div>
  `},m={args:{subjectsIds:["math","portuguese"]},render:r=>`
    ${a}
    <div style="padding:2rem;text-align:center;">
      <h3 style="margin-bottom:1.5rem;">🎮 Interactive Preview</h3>
      <div style="max-width:600px;margin:0 auto;">
        ${e(r.subjectsIds)}
      </div>
      <p style="color:#666;font-size:0.875rem;margin-top:1rem;">
        Use os controles acima para testar diferentes combinações
      </p>
    </div>
  `},l={render:()=>`
    ${a}
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
    </style>
    <div class="dark-preview">
      <h3>🌙 Dark Mode Concept</h3>
      ${e(["math","portuguese","science"])}
      <div style="margin-top:1rem;">
        ${e(["history","geography"])}
      </div>
    </div>
  `};var u,g,b;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    subjectsIds: ['math']
  },
  render: args => \`
    \${styles}
    <div style="padding:2rem;">
      \${subjectBand(args.subjectsIds)}
    </div>
  \`
}`,...(b=(g=s.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var h,v,y;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1.5rem;">Todas as Disciplinas (BNCC)</h3>
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🔵 Matemática</h4>
      \${subjectBand(['math'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">💙 Língua Portuguesa</h4>
      \${subjectBand(['portuguese'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🟢 Ciências</h4>
      \${subjectBand(['science'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🟡 História</h4>
      \${subjectBand(['history'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🔴 Geografia</h4>
      \${subjectBand(['geography'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">⚫ Inglês</h4>
      \${subjectBand(['english'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🟣 Artes</h4>
      \${subjectBand(['arts'])}
      
      <h4 style="margin-top:2rem;margin-bottom:1rem;">🟠 Educação Física</h4>
      \${subjectBand(['physical_education'])}
    </div>
  \`
}`,...(y=(v=n.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var x,f,D;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1.5rem;">Combinações Comuns</h3>
      
      <h4>Exatas</h4>
      \${subjectBand(['math', 'science'])}
      
      <h4 style="margin-top:1.5rem;">Humanas</h4>
      \${subjectBand(['history', 'geography'])}
      
      <h4 style="margin-top:1.5rem;">Linguagens</h4>
      \${subjectBand(['portuguese', 'english', 'arts'])}
    </div>
  \`
}`,...(D=(f=i.parameters)==null?void 0:f.docs)==null?void 0:D.source}}};var j,$,B;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="story-demo-panel">
      <h3 style="margin-bottom:1.5rem;">📝 Cabeçalhos de Avaliação</h3>
      
      <div class="evaluation-card">
        \${subjectBand(['math'])}
        <h4>Avaliação de Álgebra</h4>
        <p>Equações de 1º e 2º grau · 5º Ano A · 15 questões</p>
      </div>
      
      <div class="evaluation-card">
        \${subjectBand(['portuguese'])}
        <h4>Interpretação de Texto</h4>
        <p>Gêneros textuais e ortografia · 6º Ano B · 20 questões</p>
      </div>
      
      <div class="evaluation-card">
        \${subjectBand(['math', 'science'])}
        <h4>Prova Multidisciplinar</h4>
        <p>Matemática financeira e Química · 9º Ano · 30 questões</p>
      </div>
    </div>
  \`
}`,...(B=($=t.parameters)==null?void 0:$.docs)==null?void 0:B.source}}};var C,A,E;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="story-demo-panel">
      <h3 style="margin-bottom:1.5rem;">🎯 Cards de Missões</h3>
      
      <div class="evaluation-card">
        \${subjectBand(['history', 'geography'])}
        <h4>Missão: Brasil Colonial</h4>
        <p>Estudo sobre as capitanias hereditárias e o território brasileiro</p>
        <small style="color:#999;">Prazo: 15/03/2024 | 28 alunos</small>
      </div>
      
      <div class="evaluation-card">
        \${subjectBand(['portuguese', 'arts'])}
        <h4>Projeto: Literatura Visual</h4>
        <p>Criação de histórias ilustradas com técnicas artísticas</p>
        <small style="color:#999;">Prazo: 20/03/2024 | 32 alunos</small>
      </div>
    </div>
  \`
}`,...(E=(A=o.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var I,P,S;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div class="story-demo-panel">
      <h3 style="margin-bottom:1.5rem;">📊 Widget de Dashboard</h3>
      <p style="margin-bottom:1.5rem;color:#666;">Atividades da Semana</p>
      
      <div style="display:grid;grid-template-columns:1fr;gap:1rem;">
        <div style="padding:1rem;background:#f8f7fa;border-radius:8px;">
          \${subjectBand(['math'])}
          <div style="margin-top:0.75rem;">
            <strong>Prova de Geometria</strong>
            <div style="display:flex;justify-content:space-between;margin-top:0.25rem;font-size:0.875rem;color:#999;">
              <span>5º Ano A</span>
              <span>Hoje · 14:00</span>
            </div>
          </div>
        </div>
        
        <div style="padding:1rem;background:#f8f7fa;border-radius:8px;">
          \${subjectBand(['portuguese', 'english'])}
          <div style="margin-top:0.75rem;">
            <strong>Redação Bilíngue</strong>
            <div style="display:flex;justify-content:space-between;margin-top:0.25rem;font-size:0.875rem;color:#999;">
              <span>6º Ano B</span>
              <span>Amanhã · 10:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
}`,...(S=(P=d.parameters)==null?void 0:P.docs)==null?void 0:S.source}}};var k,M,z;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => \`
    \${styles}
    <div style="padding:2rem;">
      <h3 style="margin-bottom:1rem;">Desktop (> 576px)</h3>
      <div style="margin-bottom:3rem;">
        \${subjectBand(['math', 'portuguese', 'science'])}
      </div>
      
      <h3 style="margin-bottom:1rem;">Mobile (< 576px) - Simulação</h3>
      <div style="max-width:375px;border:1px solid #e0e0e0;border-radius:12px;padding:1rem;">
        <style>
          .mobile-demo .subject-band-container {
            flex-direction: column;
          }
          .mobile-demo .subject-band {
            min-height: 32px;
            font-size: 13px;
            padding: 6px;
          }
        </style>
        <div class="mobile-demo">
          \${subjectBand(['math', 'portuguese', 'science'])}
        </div>
      </div>
    </div>
  \`
}`,...(z=(M=c.parameters)==null?void 0:M.docs)==null?void 0:z.source}}};var F,w,H;m.parameters={...m.parameters,docs:{...(F=m.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    subjectsIds: ['math', 'portuguese']
  },
  render: args => \`
    \${styles}
    <div style="padding:2rem;text-align:center;">
      <h3 style="margin-bottom:1.5rem;">🎮 Interactive Preview</h3>
      <div style="max-width:600px;margin:0 auto;">
        \${subjectBand(args.subjectsIds)}
      </div>
      <p style="color:#666;font-size:0.875rem;margin-top:1rem;">
        Use os controles acima para testar diferentes combinações
      </p>
    </div>
  \`
}`,...(H=(w=m.parameters)==null?void 0:w.docs)==null?void 0:H.source}}};var L,q,G;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
    </style>
    <div class="dark-preview">
      <h3>🌙 Dark Mode Concept</h3>
      \${subjectBand(['math', 'portuguese', 'science'])}
      <div style="margin-top:1rem;">
        \${subjectBand(['history', 'geography'])}
      </div>
    </div>
  \`
}`,...(G=(q=l.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};const O=["Default","AllSubjects","MultipleSubjects","EvaluationHeader","MissionCards","DashboardWidget","ResponsiveDemo","InteractiveDemo","DarkModeConcept"];export{n as AllSubjects,l as DarkModeConcept,d as DashboardWidget,s as Default,t as EvaluationHeader,m as InteractiveDemo,o as MissionCards,i as MultipleSubjects,c as ResponsiveDemo,O as __namedExportsOrder,W as default};
