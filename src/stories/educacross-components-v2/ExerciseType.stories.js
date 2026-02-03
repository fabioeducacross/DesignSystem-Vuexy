/**
 * ExerciseType - Exercise Type Classification Tags
 * =================================================
 * Tags/badges para classificar tipos de exercícios educacionais
 * 
 * @component ExerciseType
 * @category Educacross Components V2 / Data Display
 * @source educacross-frontoffice (biblioteca de missões, criação de exercícios)
 * @priority P1 - Core UI
 * @status EXPANDED
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Data Display/ExerciseType',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ExerciseType - Classificação de Exercícios

Tags visuais para identificar o tipo de exercício em missões educacionais (múltipla escolha, dissertativa, V/F, associação, ordenação, lacunas).

### Casos de Uso

**Professor**: Criar missões com tipos variados de exercícios, identificar formato visual na biblioteca, planejar diversidade de avaliações

**Coordenador**: Analisar distribuição de tipos de exercícios nas turmas, relatórios de uso pedagógico

**Aluno**: Identificar rapidamente o formato do exercício, preparar-se para tipo de resposta esperada

---

## Tipos Disponíveis

| Tipo | Ícone | Cor | Uso |
|------|-------|-----|-----|
| **Múltipla Escolha** | bi-list-check | #28C76F (verde) | Selecionar 1 alternativa correta |
| **Dissertativa** | bi-file-text | #00CFE8 (azul) | Resposta texto livre |
| **Verdadeiro/Falso** | bi-toggle-on | #FF9F43 (laranja) | Afirmações V ou F |
| **Associação** | bi-link-45deg | #9C27B0 (roxo) | Conectar itens relacionados |
| **Ordenação** | bi-sort-down | #FB8C00 (laranja escuro) | Sequenciar itens |
| **Preencher Lacunas** | bi-dash-square | #00897B (verde água) | Completar texto |

---

## Props API

| Prop | Tipo | Valores | Default | Descrição |
|------|------|---------|---------|-----------|
| type | string | 'multiple-choice', 'essay', 'true-false', 'matching', 'ordering', 'fill-blanks' | - | Tipo do exercício |
| variant | string | 'filled', 'outline' | 'filled' | Estilo visual |
| size | string | 'sm', 'md' | 'md' | Tamanho do badge |
| showIcon | boolean | true, false | true | Exibe ícone |

---

## Acessibilidade

- ✅ Cores com contraste WCAG AA
- ✅ Ícones descritivos reforçam significado
- ✅ Texto legível em todos os tamanhos
- ✅ Suporte aria-label para leitores de tela
        `
      }
    }
  }
};

const css = `<style>
  .exercise-type {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 13px;
    font-weight: 600;
    transition: all 0.2s;
    white-space: nowrap;
  }
  
  .exercise-type i {
    font-size: 16px;
  }
  
  /* Types - Colors */
  .type-multiple-choice {
    background: #E8F5E9;
    color: #28C76F;
  }
  
  .type-essay {
    background: #E3F2FD;
    color: #00CFE8;
  }
  
  .type-true-false {
    background: #FFF8E1;
    color: #FF9F43;
  }
  
  .type-matching {
    background: #F3E5F5;
    color: #9C27B0;
  }
  
  .type-ordering {
    background: #FFF3E0;
    color: #FB8C00;
  }
  
  .type-fill-blanks {
    background: #E0F2F1;
    color: #00897B;
  }
  
  /* Outline variant */
  .type-outline {
    background: transparent;
    border: 2px solid currentColor;
  }
  
  /* Small size */
  .exercise-type-small {
    padding: 3px 10px;
    font-size: 11px;
  }
  
  .exercise-type-small i {
    font-size: 13px;
  }
  
  /* Hover effect */
  .exercise-type:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
</style>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">`;

export const Default = {
  render: () => `
    ${css}
    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
      <span class="exercise-type type-multiple-choice">
        <i class="bi bi-list-check"></i>
        Múltipla Escolha
      </span>
      
      <span class="exercise-type type-essay">
        <i class="bi bi-file-text"></i>
        Dissertativa
      </span>
      
      <span class="exercise-type type-true-false">
        <i class="bi bi-toggle-on"></i>
        Verdadeiro ou Falso
      </span>
      
      <span class="exercise-type type-matching">
        <i class="bi bi-link-45deg"></i>
        Associação
      </span>
      
      <span class="exercise-type type-ordering">
        <i class="bi bi-sort-down"></i>
        Ordenação
      </span>
      
      <span class="exercise-type type-fill-blanks">
        <i class="bi bi-dash-square"></i>
        Preencher Lacunas
      </span>
    </div>
  `
};

export const OutlineVariant = {
  render: () => `
    ${css}
    <div style="display: flex; flex-wrap: wrap; gap: 12px;">
      <span class="exercise-type type-multiple-choice type-outline">
        <i class="bi bi-list-check"></i>
        Múltipla Escolha
      </span>
      
      <span class="exercise-type type-essay type-outline">
        <i class="bi bi-file-text"></i>
        Dissertativa
      </span>
      
      <span class="exercise-type type-true-false type-outline">
        <i class="bi bi-toggle-on"></i>
        V ou F
      </span>
      
      <span class="exercise-type type-matching type-outline">
        <i class="bi bi-link-45deg"></i>
        Associação
      </span>
    </div>
  `
};

export const SmallSize = {
  render: () => `
    ${css}
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
      <span class="exercise-type exercise-type-small type-multiple-choice">
        <i class="bi bi-list-check"></i>
        MC
      </span>
      
      <span class="exercise-type exercise-type-small type-essay">
        <i class="bi bi-file-text"></i>
        Diss
      </span>
      
      <span class="exercise-type exercise-type-small type-true-false">
        <i class="bi bi-toggle-on"></i>
        V/F
      </span>
      
      <span class="exercise-type exercise-type-small type-matching">
        <i class="bi bi-link-45deg"></i>
        Assoc
      </span>
      
      <span class="exercise-type exercise-type-small type-ordering">
        <i class="bi bi-sort-down"></i>
        Ord
      </span>
      
      <span class="exercise-type exercise-type-small type-fill-blanks">
        <i class="bi bi-dash-square"></i>
        Lacuna
      </span>
    </div>
    <p style="margin-top: 12px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Variante pequena para tabelas e visualizações compactas.
    </p>
  `
};

export const BibliotecaDeMissoes = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 900px;">
      <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">Biblioteca de Missões - Matemática 5º Ano</h3>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${[
          { titulo: 'Frações Básicas', descricao: 'Introdução ao conceito de frações', questoes: 12, tipo: 'multiple-choice', icone: 'bi-list-check' },
          { titulo: 'Operações com Frações', descricao: 'Adição e subtração de frações', questoes: 8, tipo: 'essay', icone: 'bi-file-text' },
          { titulo: 'Quiz Rápido: Frações', descricao: 'Avaliação rápida de conhecimento', questoes: 10, tipo: 'true-false', icone: 'bi-toggle-on' },
          { titulo: 'Conectando Frações e Decimais', descricao: 'Relação entre representações numéricas', questoes: 6, tipo: 'matching', icone: 'bi-link-45deg' }
        ].map(missao => `
          <div style="background: #F8F8F8; border-radius: 8px; padding: 16px; display: flex; justify-content: space-between; align-items: center; gap: 16px;">
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 6px;">
                <h4 style="margin: 0; font-size: 16px; font-weight: 600; color: #5E5873;">${missao.titulo}</h4>
                <span class="exercise-type type-${missao.tipo}">
                  <i class="bi ${missao.icone}"></i>
                  ${missao.tipo === 'multiple-choice' ? 'Múltipla Escolha' : 
                    missao.tipo === 'essay' ? 'Dissertativa' :
                    missao.tipo === 'true-false' ? 'V ou F' : 'Associação'}
                </span>
              </div>
              <p style="margin: 0; font-size: 13px; color: #6E6B7B;">${missao.descricao}</p>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 24px; font-weight: 700; color: #6E63E8;">${missao.questoes}</div>
              <div style="font-size: 12px; color: #6E6B7B;">questões</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Biblioteca de missões com tipo de exercício visível. Professor navegando conteúdos.
    </p>
  `
};

export const CriacaoDeMissao = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 24px; max-width: 700px;">
      <h3 style="margin: 0 0 8px; font-size: 20px; font-weight: 600; color: #5E5873;">Criar Nova Questão</h3>
      <p style="margin: 0 0 20px; font-size: 14px; color: #6E6B7B;">Selecione o tipo de exercício para adicionar</p>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
        ${[
          { tipo: 'multiple-choice', nome: 'Múltipla Escolha', desc: 'Selecionar 1 alternativa', icone: 'bi-list-check' },
          { tipo: 'essay', nome: 'Dissertativa', desc: 'Resposta em texto livre', icone: 'bi-file-text' },
          { tipo: 'true-false', nome: 'Verdadeiro/Falso', desc: 'Afirmações V ou F', icone: 'bi-toggle-on' },
          { tipo: 'matching', nome: 'Associação', desc: 'Conectar itens', icone: 'bi-link-45deg' },
          { tipo: 'ordering', nome: 'Ordenação', desc: 'Sequenciar itens', icone: 'bi-sort-down' },
          { tipo: 'fill-blanks', nome: 'Preencher Lacunas', desc: 'Completar texto', icone: 'bi-dash-square' }
        ].map(opcao => `
          <div style="padding: 16px; border: 2px solid #E5E3F3; border-radius: 10px; cursor: pointer; transition: all 0.2s; background: #fff;" onmouseover="this.style.borderColor='#6E63E8'; this.style.background='#F8F7FD'" onmouseout="this.style.borderColor='#E5E3F3'; this.style.background='#fff'">
            <div style="margin-bottom: 10px;">
              <span class="exercise-type type-${opcao.tipo}">
                <i class="bi ${opcao.icone}"></i>
                ${opcao.nome}
              </span>
            </div>
            <p style="margin: 0; font-size: 12px; color: #6E6B7B;">${opcao.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Interface de criação de missão. Professor escolhendo tipo de questão.
    </p>
  `
};

export const RelatorioPorTipo = {
  render: () => `
    ${css}
    <div style="background: #fff; border: 1px solid #D8D6DE; border-radius: 8px; padding: 20px; max-width: 600px;">
      <h3 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #5E5873;">Distribuição por Tipo - Turma 5º A</h3>
      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${[
          { tipo: 'multiple-choice', nome: 'Múltipla Escolha', count: 45, percent: 35, icone: 'bi-list-check' },
          { tipo: 'essay', nome: 'Dissertativa', count: 28, percent: 22, icone: 'bi-file-text' },
          { tipo: 'true-false', nome: 'Verdadeiro/Falso', count: 32, percent: 25, icone: 'bi-toggle-on' },
          { tipo: 'matching', nome: 'Associação', count: 15, percent: 12, icone: 'bi-link-45deg' },
          { tipo: 'ordering', nome: 'Ordenação', count: 8, percent: 6, icone: 'bi-sort-down' }
        ].map(item => `
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="exercise-type type-${item.tipo}" style="min-width: 180px;">
              <i class="bi ${item.icone}"></i>
              ${item.nome}
            </span>
            <div style="flex: 1; background: #E8E8E8; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="width: ${item.percent}%; height: 100%; background: linear-gradient(90deg, #6E63E8, #28C76F); transition: width 0.5s;"></div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; min-width: 100px; justify-content: flex-end;">
              <span style="font-size: 18px; font-weight: 700; color: #5E5873;">${item.count}</span>
              <span style="font-size: 12px; color: #6E6B7B;">(${item.percent}%)</span>
            </div>
          </div>
        `).join('')}
      </div>
      <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #E8E8E8; display: flex; justify-content: space-between;">
        <span style="font-size: 14px; color: #6E6B7B;">Total de exercícios:</span>
        <span style="font-size: 18px; font-weight: 700; color: #6E63E8;">128</span>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B;">
      <strong>Contexto:</strong> Relatório coordenador - distribuição de tipos nas missões da turma.
    </p>
  `
};
