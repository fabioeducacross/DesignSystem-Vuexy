/**
 * Card - Student Access Card Component
 * =========================================
 * Cartão de acesso do estudante para impressão ou exportação PDF
 * 
 * @component Card
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\PDFs\Card.vue
 * @assets Assets/Logos/Principal/, Assets/Gamificação/
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Cards/Card',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
<style>
  /* Base Typography - Figma Professional Style */
  .sbdocs-wrapper {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    color: #1d1d1d;
    line-height: 1.6;
    font-size: 15px;
    max-width: 880px;
    margin: 0 auto;
  }

  .sbdocs h1 {
    font-size: 2.75rem;
    font-weight: 700;
    color: #000;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .sbdocs h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #000;
    margin: 3.5rem 0 1.25rem 0;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .sbdocs h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1d1d1d;
    margin: 2.5rem 0 1rem 0;
    line-height: 1.4;
  }

  .sbdocs h4 {
    font-size: 1.05rem;
    font-weight: 600;
    color: #333;
    margin: 2rem 0 0.75rem 0;
    line-height: 1.4;
  }

  .sbdocs p {
    margin-bottom: 1.25rem;
    color: #333;
    font-size: 15px;
    line-height: 1.7;
  }

  .sbdocs p strong {
    color: #000;
    font-weight: 600;
  }

  .sbdocs ul {
    margin: 1.5rem 0;
    padding-left: 0;
    list-style: none;
  }

  .sbdocs ul li {
    position: relative;
    padding-left: 1.75rem;
    margin-bottom: 0.875rem;
    color: #333;
    line-height: 1.7;
  }

  .sbdocs ul li::before {
    content: '•';
    position: absolute;
    left: 0.5rem;
    color: #6e63e8;
    font-weight: bold;
    font-size: 1.25em;
  }

  .sbdocs ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }

  .sbdocs ol li {
    margin-bottom: 0.875rem;
    color: #333;
    line-height: 1.7;
  }

  .sbdocs hr {
    border: none;
    height: 1px;
    background: #e5e5e5;
    margin: 3rem 0;
  }

  .sbdocs pre {
    background: #f8f9fa;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    padding: 1.5rem;
    overflow-x: auto;
    margin: 2rem 0;
    font-size: 13px;
    line-height: 1.6;
  }

  .sbdocs code {
    background: #f1f3f5;
    color: #6e63e8;
    padding: 0.15rem 0.4rem;
    border-radius: 3px;
    font-size: 0.9em;
    font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', monospace;
    font-weight: 500;
  }

  .sbdocs pre code {
    background: transparent;
    padding: 0;
    color: #1d1d1d;
    font-size: 13px;
    font-weight: 400;
  }

  .sbdocs table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 14px;
  }

  .sbdocs thead {
    background: #fff;
    border-bottom: 2px solid #e5e5e5;
  }

  .sbdocs thead th {
    color: #1d1d1d;
    font-weight: 600;
    text-align: left;
    padding: 0.875rem 1rem;
    font-size: 13px;
    letter-spacing: 0.02em;
  }

  .sbdocs tbody tr {
    border-bottom: 1px solid #f1f3f5;
  }

  .sbdocs tbody tr:hover {
    background-color: #fafbfc;
  }

  .sbdocs tbody td {
    padding: 0.875rem 1rem;
    color: #333;
    line-height: 1.6;
  }

  .sbdocs tbody td:first-child {
    font-weight: 500;
    color: #1d1d1d;
  }

  .sbdocs a {
    color: #6e63e8;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.15s ease;
  }

  .sbdocs a:hover {
    border-bottom-color: #6e63e8;
  }

  .sbdocs blockquote {
    background: #f0f7ff;
    border-left: 3px solid #3b82f6;
    padding: 1.25rem 1.5rem;
    margin: 2rem 0;
    border-radius: 6px;
  }

  .sbdocs blockquote p {
    color: #1e40af;
    margin: 0;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .sbdocs-wrapper {
      font-size: 14px;
    }

    .sbdocs h1 {
      font-size: 2rem;
    }

    .sbdocs h2 {
      font-size: 1.5rem;
      margin-top: 2.5rem;
    }

    .sbdocs table {
      font-size: 13px;
    }
  }

  .sbdocs ::selection {
    background: #d4d0fb;
    color: #1d1d1d;
  }
</style>

# Student Access Card

Cartão de acesso físico do estudante para impressão contendo credenciais e código de gamificação.

---

## Contexto de Uso

### Jornada do Usuário

**Persona:** Coordenador Pedagógico / Professor  
**Tela:** Gerenciamento de Alunos → Exportar Cartões  
**Fluxo:** Lista de Alunos → Selecionar Alunos → Gerar Cartões → Exportar PDF

### Casos de Uso

1. **Início do Ano Letivo:** Impressão em massa de cartões para todos os alunos da turma
2. **Novo Aluno:** Geração individual para matrícula recente
3. **Cartão Perdido:** Reemissão com novo código de acesso
4. **Eventos Especiais:** Impressão de lote para atividades gamificadas

---

## Arquitetura da Informação

### Estrutura do Componente

\`\`\`
StudentCard (Container)
│
├── Header Section
│   ├── Logo (Educacross)
│   └── Card Title
│
├── Content Section
│   ├── Left Column
│   │   ├── Description (Bold Highlight)
│   │   ├── Primary Action
│   │   ├── Details Link (Danger)
│   │   └── User Info
│   │       ├── Username
│   │       └── Password
│   │
│   └── Right Column
│       └── QR Code (Access)
│
├── Gamification Section
│   ├── Fruit Code Label
│   └── Fruit Icons Grid (4 icons)
│
└── Footer Section
    └── Warning Notice (Personal Use)
\`\`\`

### Hierarquia Visual (DOM)

\`\`\`
.student-card-body
└── .background
    ├── .card-head-container
    │   ├── <img> [Logo]
    │   └── <span> [Title]
    │
    ├── .content-flex
    │   ├── .info-container
    │   │   ├── .description [Bold 16px]
    │   │   ├── .primary-action [Bold 12px]
    │   │   ├── .details-link [Bold 10px danger]
    │   │   └── .user-info
    │   │       ├── .username
    │   │       └── .password
    │   │
    │   └── .qr-container
    │       └── <qrcode-vue>
    │
    ├── .fruits-container
    │   ├── .fruits-code-label
    │   └── .fruits-grid
    │       └── .fruit-container [4x]
    │           └── <img> [Fruit Icon]
    │
    └── .container-warning
        ├── <icon> [Warning]
        └── <span> [Alert Text]
\`\`\`

---

## Especificações de Design

### Dimensões do Card

| Propriedade | Valor | Uso |
|-------------|-------|-----|
| Width | 441px | Largura fixa para impressão |
| Height | 264px | Altura fixa (padrão business card) |
| Border | 4px dashed #9c9c9c | Linha de corte |
| Padding | 4.28px | Margem de segurança |
| Background | #d2f6ff | Azul claro Educacross |

### Sistema Tipográfico

| Elemento | Size | Weight | Transform | Color |
|----------|------|--------|-----------|-------|
| Card Title | 12px | bold | uppercase | #000 |
| Description | 16px | bold | uppercase | #000 |
| Primary Action | 12px | bold | uppercase | #000 |
| Details Link | 10px | bold | uppercase | #EA5455 (danger) |
| User Info Label | 14px | bold | uppercase | #000 |
| User Info Value | 14px | normal | uppercase | #000 |
| Fruits Code | 12px | bold | uppercase | #000 |
| Warning Text | 8px | bold | uppercase | #EA5455 (danger) |

### Cores

| Token | Hex | Uso |
|-------|-----|-----|
| Background | #d2f6ff | Fundo do card |
| Border | #9c9c9c | Linha de corte |
| Fruit Border | #0c5257 | Borda dos ícones de frutas |
| Text Primary | #000 | Textos principais |
| Text Danger | #EA5455 | Avisos e links de atenção |
| QR Background | #fff | Fundo do QR Code |

### Layout e Espaçamento

| Propriedade | Valor | Aplicação |
|-------------|-------|-----------|
| Card Padding | 15px 23px 27px 23px | Conteúdo interno |
| Header margin-bottom | 16px | Espaço abaixo do header |
| Content height | 100px | Área de conteúdo principal |
| User info margin-top | 10px | Espaço acima das credenciais |
| QR Padding | 6px | Margem interna do QR |
| Fruit Container | 50px × 50px | Tamanho dos ícones |
| Footer margin-top | 8px | Espaço acima do aviso |

---

## Elementos Visuais

### Assets Utilizados

| Tipo | Caminho | Dimensões | Uso |
|------|---------|-----------|-----|
| Logo | Assets/Logos/Principal/logo.svg | Auto × 23px | Header do card |
| QR Code | Gerado dinamicamente | 80px × 80px | Código de acesso |
| Frutas | Assets/Gamificação/*.svg | 40px × 40px | Sistema de gamificação |
| Ícone Warning | Material Icons | 10px | Aviso de uso pessoal |

### Códigos de Frutas (Gamificação)

Sistema único de identificação visual:
- 4 ícones de frutas por card
- Combinação única por estudante
- Usado para login sem digitação (crianças menores)

---

## Comportamento e Estados

### Estado de Impressão

\`\`\`css
@media print {
  .student-card-body {
    page-break-inside: avoid;
    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  }
}
\`\`\`

**Características:**
- Cores exatas preservadas na impressão
- Não quebra o card entre páginas
- Remove margens desnecessárias

### Geração de PDF

- **Formato:** A4 com múltiplos cards por página
- **Orientação:** Portrait
- **Margem:** Auto-calculada para centralização
- **Qualidade:** Alta resolução para impressão profissional

---

## Regras de Negócio

### Geração de Credenciais

**Username:**
- Formato: Primeira letra do nome + sobrenome
- Exemplo: João Silva → jsilva
- Lowercase obrigatório
- Sem caracteres especiais

**Password:**
- Gerada aleatoriamente pelo sistema
- 6-8 caracteres alfanuméricos
- Case-insensitive para facilitar digitação
- Expira: Nunca (uso contínuo)

### Código de Frutas

**Geração:**
- 4 frutas aleatórias de um pool de 12 opções
- Combinação única por estudante
- Armazenada no banco de dados
- Usada para login visual (gamificação)

**Frutas Disponíveis:**
Maçã, Banana, Uva, Melancia, Morango, Laranja, Abacaxi, Pera, Cereja, Limão, Manga, Kiwi

### QR Code

**Conteúdo:**
- URL de deep link para login automático
- Formato: \`https://app.educacross.com.br/login?token={token}\`
- Válido por: 1 ano letivo
- Segurança: Token único e criptografado

---

## Acessibilidade

### Considerações de Impressão

| Aspecto | Implementação |
|---------|---------------|
| Contraste | Textos pretos em fundo claro (AAA) |
| Tamanho de Fonte | Mínimo 10px para legibilidade impressa |
| QR Code Size | 80px × 80px para leitura confiável |
| Borda Tracejada | Guia visual para corte manual |

### Usabilidade para Crianças

- **Texto em Maiúsculas:** Facilita leitura para alfabetização inicial
- **Código Visual (Frutas):** Alternativa para quem não domina leitura
- **QR Code:** Login sem digitação para dispositivos móveis
- **Cores Vibrantes:** Engajamento visual

---

## Exemplo de Integração

### Vue 2 Component

\`\`\`vue
<template>
  <div>
    <Card
      v-for="student in students"
      :key="student.id"
      :student-name="student.name"
      :username="student.username"
      :password="student.password"
      :qr-token="student.qrToken"
      :fruit-codes="student.fruitCodes"
    />
  </div>
</template>

<script>
import Card from '@/components/PDFs/Card.vue'

export default {
  components: { Card },
  
  data() {
    return {
      students: []
    }
  },
  
  async mounted() {
    this.students = await this.$api.get('/students/cards')
  },
  
  methods: {
    async exportPDF() {
      const element = document.getElementById('studentsCards')
      const options = {
        margin: 10,
        filename: 'cartoes-acesso.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      await html2pdf().from(element).set(options).save()
    }
  }
}
</script>
\`\`\`

### Geração em Massa

\`\`\`javascript
// API Endpoint
POST /api/students/generate-cards
{
  "classId": "abc123",
  "studentIds": ["id1", "id2", "id3"]
}

// Response
{
  "cards": [
    {
      "studentId": "id1",
      "username": "jsilva",
      "password": "xyz789",
      "qrToken": "encrypted-token",
      "fruitCodes": ["maca", "banana", "uva", "melancia"]
    }
  ],
  "pdfUrl": "https://cdn.educacross.com.br/cards/batch-abc.pdf"
}
\`\`\`

---

## Performance

### Otimizações de Impressão

| Métrica | Target | Implementação |
|---------|--------|---------------|
| Cards por página A4 | 6-8 | Grid 2×3 ou 2×4 |
| Tempo de geração (50 cards) | < 10s | Processamento assíncrono |
| Tamanho PDF (50 cards) | < 2MB | Compressão de imagens |
| Qualidade QR Code | 100% scan rate | Margem mínima de 4 módulos |

### Assets Loading

- SVGs inline quando < 5KB
- Logo carregado uma vez e reutilizado
- Frutas pré-carregadas em sprite sheet

---

## Variações

### Card Simplificado (Sem Gamificação)

Para escolas que não usam sistema de frutas:
- Remove seção de Fruit Codes
- Aumenta espaço de QR Code
- Foco apenas em credenciais tradicionais

### Card para Impressora Térmica

Dimensões ajustadas para impressoras de carteirinha:
- Width: 85.6mm (CR80 standard)
- Height: 54mm
- Orientação: Landscape
- Remove borda tracejada

---

## Componentes Relacionados

- **CardsList** - Geração em lote de múltiplos cards
- **StudentCard** - Versão digital do card (não imprimível)
- **QRCodeGenerator** - Geração isolada de QR Codes
- **FruitSelector** - Interface de seleção de frutas
        `
      }
    }
  }
};

// Estilos inline do componente
const componentStyles = `

:root {
  --primary: #6e63e8;
  --primary-rgb: 110, 99, 232;
  --success: #28c76f;
  --success-rgb: 40, 199, 111;
  --danger:5455;
  --danger-rgb: 234, 84, 85;
  --warning:9f43;
  --warning-rgb: 255, 159, 67;
  --info: #00cfe8;
  --info-rgb: 0, 207, 232;
  --secondary: #6c757d;
  --secondary-rgb: 108, 117, 125;
  --light:8f9fa;
  --dark: #343a40;
  --legend-below-basic:5455;
  --legend-basic:9f43;
  --legend-proficient: #28c76f;
  --legend-advanced: #6e63e8;
  --border-color:;
  --body-bg:8f7fa;
  --card-bg:;
  --text-color: #5d596c;
  --heading-color: #5d596c;
}


* {
  text-transform: uppercase;
}


.student-card-body {
  border: 4px dashed #9c9c9c;

  width: 441px;
  height: 264px;
  padding: 4.28px;

  color: #000;
}

.background {
  width: 100%;
  height: 100%;

  padding: 15px 23px 27px 23px;
  position: relative;

  background:2f6ff;
}

.line-height-14 {
  line-height: 14px;
}

.card-head-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.logo {
  height: 23px;
}

.fruit-container {
  padding: 0.25rem;
  border-radius: 0.357rem;
  border: 1px solid #0c5257;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
}

.fruit {
  max-width: 100%;
  max-height: 100%;
}

.info-container {
  line-height: 14px;
}

.user-info {
  margin-top: 10px;
}

.qr-container {
  align-self: center;

  padding: 6px;
  background:;
  border-radius: 8px;
}

.container-warning {
  margin-top: 8px;

  .icon-warning {
    font-size: 10px;
  }
}

@media print {
  .cardsBody {
    margin: 0 !important;
    padding: 0 !important;
  }

  .student-card-body {
    page-break-before: auto;
    page-break-after: auto;
    page-break-inside: avoid;

    -webkit-print-color-adjust: exact;
    color-adjust: exact;
  } {
    background:;
  }
}

.HTMLtoPdf {
  margin: auto;
  margin-top: calc(50% - 264px);

  .fruits-code {
    margin-bottom: 5px !important;
  }
}
`;

// Template base
const baseTemplate = `
<div
    id="studentsCards"
    class="student-card-body print-component"
    :data-fileName="student.studentName"
  >
    <div class="background">
      <div class="card-head-container">
        <img src="" alt="logo" class="logo" >
        <span class="font-bold text-black font-12">Título do Card</span>
      </div>
      <div class="d-flex justify-between" style="height: 100px">
        <div class="info-container">
          <div class="d-flex flex-col">
            <span class="font-bold font-16">Descrição breve do conteúdo</span>
            <span class="font-bold font-12">Ação Principal</span>
            <span class="font-bold font-10 text-danger">
              Ver Mais - Detalhes
            </span>
            <div class="d-flex flex-col">
              <span class="font-bold font-14 user-info">
                Usuário: <span>Categoria</span>
              </span>
              <span class="font-bold font-14">
                Senha: <span>Subtítulo</span>
              </span>
            </div>
          </div>
        </div>
        <div class="qr-container">
          <qrcode-vue value="" size="" render-as="svg" />
        </div>
      </div>
      <div class="fruits-container">
        <p class="font-12 font-bold mb-0 fruits-code">Código de frutas:</p>
        <div class="d-flex justify-between">
          <div
            class="fruit-container bg-white"
          >
            <img class="fruit" fluid src="" >
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-end align-items-center font-bold font-8 text-danger container-warning"
      >
        <span class="material-symbols-outlined cursor-pointer icon-warning"> Warning </span>
        <span class="alert-text">Uso pessoal e intransferível</span>
      </div>
    </div>
  </div>
`;

// ===================================
// UX Writing - Arquitetura de Conteúdo
// ===================================

/**
 * Matriz de UX Writing para Student Access Card
 * 
 * | Elemento | Tipo | Conteúdo | Tom | Função |
 * |----------|------|----------|-----|--------|
 * | Card Title | Heading | "CARTÃO DE ACESSO" | Formal, Institucional | Identificar propósito do documento |
 * | Description | Body | "ENTREGUE ESTE CARTÃO PARA O(A) ALUNO(A)" | Imperativo, Instrucional | Orientar destinatário |
 * | Primary Action | CTA | "MOSTRAR OU ESCANEAR" | Direto, Orientativo | Instruir uso primário |
 * | Details Link | Link | "CLIQUE PARA VER DETALHES" | Convidativo, Informativo | Indicar acesso a informações adicionais |
 * | Username Label | Label | "NOME DE USUÁRIO" | Formal, Descritivo | Identificar campo |
 * | Password Label | Label | "SENHA" | Formal, Descritivo | Identificar campo |
 * | Fruits Code Label | Label | "CÓDIGO DE FRUTAS" | Amigável, Lúdico | Apresentar alternativa gamificada |
 * | Warning Text | Alert | "ESTE CARTÃO É DE USO PESSOAL. NÃO COMPARTILHAR." | Assertivo, Preventivo | Reforçar segurança e privacidade |
 * 
 * Princípios:
 * - Textos em maiúsculas para reforçar formalidade e legibilidade
 * - Linguagem imperativa para ações ("ENTREGUE", "MOSTRAR")
 * - Mensagens curtas e diretas (máximo 10 palavras)
 * - Avisos em vermelho para destaque visual
 * - Termos simples para compreensão infantil
 */

// ===================================
// Stories: Variações do Componente
// ===================================

/**
 * Story: Default - Card Básico
 * Cartão padrão com dados de exemplo
 */
export const Default = {
  parameters: {
    docs: {
      description: {
        story: `
Cartão de acesso básico com informações padrão:
- Logo Educacross
- Credenciais de exemplo (jsilva / abc123)
- QR Code de teste
- 4 frutas aleatórias para gamificação
        `
      }
    }
  },
  render: () => `
    <style>${componentStyles}</style>
    <div class="student-card-body print-component">
      <div class="background">
        <!-- Header -->
        <div class="card-head-container">
          <img src="/vuexy/images/logo.png" alt="Educacross Logo" class="logo">
          <span class="font-bold text-black font-12">CARTÃO DE ACESSO</span>
        </div>

        <!-- Content -->
        <div class="d-flex justify-between" style="height: 100px">
          <div class="info-container">
            <div class="d-flex flex-col">
              <span class="font-bold font-16">ENTREGUE ESTE CARTÃO</span>
              <span class="font-bold font-16">PARA O(A) ALUNO(A)</span>
              <span class="font-bold font-12" style="margin-top: 8px">MOSTRAR OU ESCANEAR</span>
              <span class="font-bold font-10 text-danger">
                CLIQUE PARA VER DETALHES
              </span>
              <div class="d-flex flex-col" style="margin-top: 10px">
                <span class="font-bold font-14 user-info">
                  NOME DE USUÁRIO: <span style="font-weight: normal">jsilva</span>
                </span>
                <span class="font-bold font-14">
                  SENHA: <span style="font-weight: normal">abc123</span>
                </span>
              </div>
            </div>
          </div>

          <!-- QR Code -->
          <div class="qr-container">
            <svg viewBox="0 0 80 80" style="width: 80px; height: 80px">
              <rect width="80" height="80" fill="#fff"/>
              <path d="M10,10 h15v15h-15z M40,10 h15v15h-15z M10,40 h15v15h-15z M40,40 h15v15h-15z M20,20 h5v5h-5z M50,20 h5v5h-5z M20,50 h5v5h-5z M50,50 h5v5h-5z" fill="#000"/>
            </svg>
          </div>
        </div>

        <!-- Frutas de Gamificação -->
        <div class="fruits-container">
          <p class="font-12 font-bold mb-0 fruits-code">CÓDIGO DE FRUTAS:</p>
          <div class="d-flex justify-between" style="margin-top: 8px">
            <div class="fruit-container bg-white">
              <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                <circle cx="20" cy="20" r="15" fill="#ff6b6b"/>
                <ellipse cx="20" cy="22" rx="12" ry="10" fill="#ff8787"/>
                <rect x="19" y="5" width="2" height="8" fill="#8b4513"/>
                <ellipse cx="23" cy="10" rx="4" ry="2" fill="#4caf50"/>
              </svg>
            </div>
            <div class="fruit-container bg-white">
              <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                <path d="M10,25 Q10,10 20,10 Q30,10 30,25 Q30,35 20,35 Q10,35 10,25" fill="#ffeb3b"/>
                <rect x="19" y="5" width="2" height="6" fill="#8b4513"/>
              </svg>
            </div>
            <div class="fruit-container bg-white">
              <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                <circle cx="18" cy="20" r="8" fill="#9c27b0"/>
                <circle cx="25" cy="18" r="7" fill="#9c27b0"/>
                <circle cx="22" cy="25" r="7" fill="#9c27b0"/>
                <circle cx="20" cy="22" r="4" fill="#ce93d8"/>
              </svg>
            </div>
            <div class="fruit-container bg-white">
              <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                <ellipse cx="20" cy="22" rx="13" ry="12" fill="#ff6f00"/>
                <circle cx="20" cy="20" r="2" fill="#bf360c"/>
                <path d="M20,10 Q25,12 25,18" stroke="#4caf50" stroke-width="2" fill="none"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Footer Warning -->
        <div class="d-flex justify-end align-items-center font-bold font-8 text-danger container-warning">
          <span class="material-symbols-outlined cursor-pointer icon-warning">Warning</span>
          <span class="alert-text">ESTE CARTÃO É DE USO PESSOAL. NÃO COMPARTILHAR.</span>
        </div>
      </div>
    </div>
  `
};

/**
 * Story: WithStudentData - Card com Dados Reais
 * Cartão preenchido com informações de estudante
 */
export const WithStudentData = {
  parameters: {
    docs: {
      description: {
        story: `
Cartão com dados reais de estudante:
- Nome: Maria Santos (usuário: msantos)
- Senha: xyz789
- QR Code com token único
- Frutas específicas: Maçã, Banana, Uva, Laranja
        `
      }
    }
  },
  render: () => `
    <style>${componentStyles}</style>
    <div class="student-card-body print-component">
      <div class="background">
        <div class="card-head-container">
          <img src="/vuexy/images/logo.png" alt="Educacross Logo" class="logo">
          <span class="font-bold text-black font-12">CARTÃO DE ACESSO - MARIA SANTOS</span>
        </div>

        <div class="d-flex justify-between" style="height: 100px">
          <div class="info-container">
            <div class="d-flex flex-col">
              <span class="font-bold font-16">ENTREGUE ESTE CARTÃO</span>
              <span class="font-bold font-16">PARA A ALUNA MARIA</span>
              <span class="font-bold font-12" style="margin-top: 8px">MOSTRAR OU ESCANEAR</span>
              <span class="font-bold font-10 text-danger">
                CLIQUE PARA VER DETALHES
              </span>
              <div class="d-flex flex-col" style="margin-top: 10px">
                <span class="font-bold font-14 user-info">
                  NOME DE USUÁRIO: <span style="font-weight: normal">msantos</span>
                </span>
                <span class="font-bold font-14">
                  SENHA: <span style="font-weight: normal">xyz789</span>
                </span>
              </div>
            </div>
          </div>

          <div class="qr-container">
            <svg viewBox="0 0 80 80" style="width: 80px; height: 80px">
              <rect width="80" height="80" fill="#fff"/>
              <path d="M10,10 h15v15h-15z M40,10 h15v15h-15z M10,40 h15v15h-15z M40,40 h15v15h-15z M15,15 h5v5h-5z M45,15 h5v5h-5z M15,45 h5v5h-5z M45,45 h5v5h-5z M30,15 h5v5h-5z M30,30 h5v5h-5z M30,45 h5v5h-5z" fill="#000"/>
            </svg>
          </div>
        </div>

        <div class="fruits-container">
          <p class="font-12 font-bold mb-0 fruits-code">CÓDIGO DE FRUTAS:</p>
          <div class="d-flex justify-between" style="margin-top: 8px">
            <div class="fruit-container bg-white">
              <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                <circle cx="20" cy="20" r="15" fill="#ff6b6b"/>
                <ellipse cx="20" cy="22" rx="12" ry="10" fill="#ff8787"/>
                <rect x="19" y="5" width="2" height="8" fill="#8b4513"/>
                <ellipse cx="23" cy="10" rx="4" ry="2" fill="#4caf50"/>
              </svg>
            </div>
            <div class="fruit-container bg-white">
              <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                <path d="M10,25 Q10,10 20,10 Q30,10 30,25 Q30,35 20,35 Q10,35 10,25" fill="#ffeb3b"/>
                <rect x="19" y="5" width="2" height="6" fill="#8b4513"/>
              </svg>
            </div>
            <div class="fruit-container bg-white">
              <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                <circle cx="18" cy="20" r="8" fill="#9c27b0"/>
                <circle cx="25" cy="18" r="7" fill="#9c27b0"/>
                <circle cx="22" cy="25" r="7" fill="#9c27b0"/>
              </svg>
            </div>
            <div class="fruit-container bg-white">
              <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                <ellipse cx="20" cy="22" rx="13" ry="12" fill="#ff6f00"/>
                <circle cx="20" cy="20" r="2" fill="#bf360c"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="d-flex justify-end align-items-center font-bold font-8 text-danger container-warning">
          <span class="material-symbols-outlined cursor-pointer icon-warning">Warning</span>
          <span class="alert-text">ESTE CARTÃO É DE USO PESSOAL. NÃO COMPARTILHAR.</span>
        </div>
      </div>
    </div>
  `
};

/**
 * Story: PrintReady - Pronto para Impressão
 * Múltiplos cards em layout de impressão A4
 */
export const PrintReady = {
  parameters: {
    docs: {
      description: {
        story: `
Layout otimizado para impressão em A4:
- Grid 2×3 (6 cards por página)
- Margens de segurança para corte
- Cores exatas preservadas
- Page-break configurado
        `
      }
    }
  },
  render: () => `
    <style>
      ${componentStyles}
      
      .print-grid {
        display: grid;
        grid-template-columns: repeat(2, 441px);
        grid-template-rows: repeat(3, 264px);
        gap: 20px;
        padding: 20px;
        background: #fff;
      }
      
      @media print {
        .print-grid {
          gap: 10mm;
          padding: 10mm;
        }
        
        .student-card-body {
          page-break-inside: avoid;
        }
      }
    </style>
    
    <div class="print-grid">
      <!-- Card 1 -->
      <div class="student-card-body print-component">
        <div class="background">
          <div class="card-head-container">
            <img src="/vuexy/images/logo.png" alt="Logo" class="logo">
            <span class="font-bold text-black font-12">CARTÃO DE ACESSO</span>
          </div>
          <div class="d-flex justify-between" style="height: 100px">
            <div class="info-container">
              <div class="d-flex flex-col">
                <span class="font-bold font-16">ENTREGUE ESTE CARTÃO</span>
                <span class="font-bold font-16">PARA O(A) ALUNO(A)</span>
                <span class="font-bold font-12" style="margin-top: 8px">MOSTRAR OU ESCANEAR</span>
                <div class="d-flex flex-col" style="margin-top: 10px">
                  <span class="font-bold font-14 user-info">
                    USUÁRIO: <span style="font-weight: normal">jsilva</span>
                  </span>
                  <span class="font-bold font-14">
                    SENHA: <span style="font-weight: normal">abc123</span>
                  </span>
                </div>
              </div>
            </div>
            <div class="qr-container">
              <svg viewBox="0 0 80 80" style="width: 80px; height: 80px">
                <rect width="80" height="80" fill="#fff"/>
                <path d="M10,10 h15v15h-15z M40,10 h15v15h-15z M10,40 h15v15h-15z" fill="#000"/>
              </svg>
            </div>
          </div>
          <div class="fruits-container">
            <p class="font-12 font-bold mb-0 fruits-code">CÓDIGO DE FRUTAS:</p>
            <div class="d-flex justify-between" style="margin-top: 8px">
              <div class="fruit-container bg-white">
                <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                  <circle cx="20" cy="20" r="15" fill="#ff6b6b"/>
                </svg>
              </div>
              <div class="fruit-container bg-white">
                <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                  <path d="M10,25 Q10,10 20,10 Q30,10 30,25 Q30,35 20,35 Q10,35 10,25" fill="#ffeb3b"/>
                </svg>
              </div>
              <div class="fruit-container bg-white">
                <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                  <circle cx="20" cy="22" r="10" fill="#9c27b0"/>
                </svg>
              </div>
              <div class="fruit-container bg-white">
                <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                  <ellipse cx="20" cy="22" rx="13" ry="12" fill="#ff6f00"/>
                </svg>
              </div>
            </div>
          </div>
          <div class="d-flex justify-end align-items-center font-bold font-8 text-danger container-warning">
            <span class="material-symbols-outlined icon-warning">Warning</span>
            <span class="alert-text">USO PESSOAL - NÃO COMPARTILHAR</span>
          </div>
        </div>
      </div>
      
      <!-- Repetir mais 5 cards com dados diferentes... -->
      ${Array.from({ length: 5 }).map((_, i) => `
        <div class="student-card-body print-component">
          <div class="background">
            <div class="card-head-container">
              <img src="/vuexy/images/logo.png" alt="Logo" class="logo">
              <span class="font-bold text-black font-12">CARTÃO ${i + 2}</span>
            </div>
            <div class="d-flex justify-between" style="height: 100px">
              <div class="info-container">
                <div class="d-flex flex-col">
                  <span class="font-bold font-16">ALUNO ${i + 2}</span>
                  <div class="d-flex flex-col" style="margin-top: 10px">
                    <span class="font-bold font-14">
                      USUÁRIO: <span style="font-weight: normal">user${i + 2}</span>
                    </span>
                    <span class="font-bold font-14">
                      SENHA: <span style="font-weight: normal">pass${i + 2}</span>
                    </span>
                  </div>
                </div>
              </div>
              <div class="qr-container">
                <svg viewBox="0 0 80 80" style="width: 80px; height: 80px">
                  <rect width="80" height="80" fill="#fff"/>
                  <path d="M10,10 h15v15h-15z M40,40 h15v15h-15z" fill="#000"/>
                </svg>
              </div>
            </div>
            <div class="fruits-container">
              <p class="font-12 font-bold mb-0">CÓDIGO DE FRUTAS:</p>
              <div class="d-flex justify-between" style="margin-top: 8px">
                ${Array.from({ length: 4 }).map(() => `
                  <div class="fruit-container bg-white">
                    <svg viewBox="0 0 40 40" class="fruit" style="width: 40px; height: 40px">
                      <circle cx="20" cy="20" r="12" fill="#4caf50"/>
                    </svg>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="d-flex justify-end align-items-center font-bold font-8 text-danger container-warning">
              <span class="material-symbols-outlined icon-warning">Warning</span>
              <span class="alert-text">USO PESSOAL</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `
};

