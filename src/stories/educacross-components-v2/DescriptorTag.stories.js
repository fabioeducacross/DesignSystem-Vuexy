/**
 * DescriptorTag - BNCC Descriptor Tag Component
 * 
 * Tag compacta para exibir códigos de descritores BNCC (Base Nacional Comum Curricular).
 * Formato padrão: EF05MA08 (Ensino Fundamental, 5º ano, Matemática, habilidade 08).
 * 
 * @component DescriptorTag
 * @category Educacross Components V2
 * @subcategory Data Display
 * @priority P2
 * @status EXPANDED
 * @since v2.0
 * 
 * Key Features:
 * - ✅ Tag inline-flex compacta com padding 4×10px
 * - ✅ Código BNCC monospace (EF05MA08, EF05LP01, EF05CI03)
 * - ✅ Icon opcional (bi-bookmark roxo 14px) + label opcional (• Frações)
 * - ✅ Clickable variant: hover background roxo #6E63E8 + texto branco
 * - ✅ Color variants: default (#F3F2F7), primary (#E8E7FD roxo), success (#E8F5E9 verde), info (#E0F7FA ciano)
 * - ✅ Small size variant (padding 2×8px, font-size 11px) para tabelas
 * - ✅ Multiple descriptors em grid flex-wrap
 * - ✅ Relatório cobertura: abordados (verde checkmark) vs não abordados (opacity 0.6)
 * 
 * Real-world usage:
 * - Missões com descritores BNCC (3-5 códigos primary roxo)
 * - Cabeçalho de avaliação impressa (descritores + labels descritivos)
 * - Relatório cobertura curricular (verde ✓ vs cinza -)
 * - Tabelas de questões (tags pequenas 11px)
 * - Organização por disciplina (Matemática, Português, Ciências)
 */

export default {
  title: 'Educacross Components V2/Data Display/DescriptorTag',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# DescriptorTag

Componente de **tag compacta** para exibir códigos de descritores BNCC (Base Nacional Comum Curricular brasileira).

## Quando usar

- ✅ Missões/atividades com alinhamento BNCC (3-5 descritores)
- ✅ Cabeçalho de avaliações impressas (código + label descritivo)
- ✅ Relatórios de cobertura curricular (abordados vs não abordados)
- ✅ Tabelas de questões (tags pequenas 11px)
- ✅ Filtros de busca por descritor
- ✅ Organização por disciplina (Matemática, Português, Ciências)

## Formato BNCC

- **EF05MA08**: Ensino Fundamental, 5º ano, Matemática, habilidade 08
- **EF05LP01**: Ensino Fundamental, 5º ano, Língua Portuguesa, habilidade 01
- **EF05CI03**: Ensino Fundamental, 5º ano, Ciências, habilidade 03

## Variantes

- **Default**: Tag cinza (#F3F2F7) com código EF05MA08
- **WithLabel**: Código + bullet • + label descritivo ("Frações")
- **AllVariants**: 4 cores (default, primary roxo, success verde Concluído, info ciano)
- **Clickable**: 3 tags onclick alert (cursor pointer, hover roxo+branco)
- **MultipleDescriptors**: Card missão com 3 descritores primary (EF05MA08, EF05MA09, EF05MA10)
- **CabecalhoAvaliacao**: Header avaliação + 3 descritores + labels ("Problemas adição/subtração")
- **RelatorioCobertura**: 2 colunas (5 abordados verde ✓ vs 3 não abordados cinza)
- **SmallSize**: 6 tags 11px para tabelas compactas
- **AllSubjects**: 3 seções (Matemática roxo, Português verde, Ciências ciano) com 3 códigos cada

## Características visuais

- **Tag**: inline-flex, padding 4×10px, background #F3F2F7, border 1px #D8D6DE, border-radius 4px
- **Code**: font-size 13px, font-weight 600, font-family monospace
- **Label**: font-weight 400, system-ui (após bullet •)
- **Icon**: 14px roxo #6E63E8 (bi-bookmark)
- **Clickable hover**: background #6E63E8, color #fff
        `
      }
    }
  }
};

/**
 * ## Props API (sem props - display only component)
 * 
 * | Prop | Type | Default | Description |
 * |------|------|---------|-------------|
 * | code | String | '' | Código BNCC (ex: EF05MA08) |
 * | label | String | null | Label descritivo opcional (ex: "Frações") |
 * | variant | String | 'default' | Variante: 'default', 'primary', 'success', 'info' |
 * | clickable | Boolean | false | Se true, cursor pointer + hover roxo+branco |
 * | size | String | 'medium' | Tamanho: 'small' (11px, padding 2×8px), 'medium' (13px, padding 4×10px) |
 * | icon | String | null | Icon opcional (ex: 'bi-bookmark') |
 * | onClick | Function | null | Callback ao clicar (somente se clickable=true) |
 * 
 * ## Design Specs
 * 
 * **Cores:**
 * - Default: background `#F3F2F7`, border `1px #D8D6DE`, color `#5E5873`
 * - Primary: background `#E8E7FD`, border `1px #C2BFF4`, color `#6E63E8`
 * - Success: background `#E8F5E9`, border `1px #9FDEA4`, color `#28C76F`
 * - Info: background `#E0F7FA`, border `1px #80DEEA`, color `#00CFE8`
 * - Clickable hover: background `#6E63E8`, color `#fff`, border `1px #6E63E8`
 * - Icon: color `#6E63E8`, font-size `14px`
 * 
 * **Dimensões:**
 * - Tag medium: padding `4px 10px`, border-radius `4px`, gap `6px`
 * - Tag small: padding `2px 8px`, border-radius `3px`, gap `4px`, font-size `11px`
 * - Code: font-size `13px` (medium), `11px` (small), font-weight `600`
 * - Label: font-size `13px` (medium), `11px` (small), font-weight `400`
 * - Icon: font-size `14px` (medium), `12px` (small)
 * - Bullet: margin `0 4px`
 * 
 * **Tipografia:**
 * - Code: font-family `'Courier New', monospace`, font-weight `600`
 * - Label: font-family `system-ui`, font-weight `400`
 * 
 * **Animações:**
 * - Clickable hover: transition `all .2s`
 */

const styles = `<style>
.descriptor-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: #F3F2F7;
  border: 1px solid #D8D6DE;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #5E5873;
  white-space: nowrap;
}

.descriptor-tag.clickable {
  cursor: pointer;
  transition: all .2s;
}

.descriptor-tag.clickable:hover {
  background: #6E63E8;
  color: #fff;
  border-color: #6E63E8;
}

.descriptor-tag.primary {
  background: #E8E7FD;
  border-color: #C2BFF4;
  color: #6E63E8;
}

.descriptor-tag.success {
  background: #E8F5E9;
  border-color: #9FDEA4;
  color: #28C76F;
}

.descriptor-tag.info {
  background: #E0F7FA;
  border-color: #80DEEA;
  color: #00CFE8;
}

.descriptor-tag.small {
  padding: 2px 8px;
  border-radius: 3px;
  gap: 4px;
  font-size: 11px;
}

.descriptor-icon {
  font-size: 14px;
  color: #6E63E8;
}

.descriptor-tag.small .descriptor-icon {
  font-size: 12px;
}

.descriptor-code {
  font-family: 'Courier New', monospace;
  font-weight: 600;
}

.descriptor-label {
  font-family: system-ui;
  font-weight: 400;
}

.descriptor-bullet {
  margin: 0 2px;
  opacity: 0.6;
}
</style>`;

/**
 * Story: Default
 * 
 * Tag simples com código EF05MA08 + ícone bookmark roxo.
 * 
 * Educational context: Descritor BNCC padrão sem label.
 */
export const Default = {
  render: () => `
    ${styles}
    <span class="descriptor-tag">
      <i class="bi bi-bookmark descriptor-icon"></i>
      <span class="descriptor-code">EF05MA08</span>
    </span>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Descritor BNCC padrão (Matemática 5º ano, habilidade 08).
    </p>
  `
};

/**
 * Story: WithLabel
 * 
 * Tag com código EF05MA08 + bullet • + label "Frações".
 * 
 * Educational context: Descritor com label descritivo para contexto.
 */
export const WithLabel = {
  render: () => `
    ${styles}
    <span class="descriptor-tag">
      <i class="bi bi-bookmark descriptor-icon"></i>
      <span class="descriptor-code">EF05MA08</span>
      <span class="descriptor-bullet">•</span>
      <span class="descriptor-label">Frações</span>
    </span>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Descritor com label "Frações" para facilitar identificação.
    </p>
  `
};

/**
 * Story: AllVariants
 * 
 * 4 color variants: default (cinza), primary (roxo), success (verde + "Concluído"), info (ciano).
 * 
 * Educational context: Variações de cor para diferentes estados/contextos.
 */
export const AllVariants = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-direction: column; gap: 16px">
      <div>
        <strong style="display: block; margin-bottom: 8px; font-size: 13px; color: #6E6B7B">Default (cinza):</strong>
        <span class="descriptor-tag">
          <span class="descriptor-code">EF05MA08</span>
        </span>
      </div>
      
      <div>
        <strong style="display: block; margin-bottom: 8px; font-size: 13px; color: #6E6B7B">Primary (roxo):</strong>
        <span class="descriptor-tag primary">
          <i class="bi bi-bookmark descriptor-icon"></i>
          <span class="descriptor-code">EF05MA08</span>
        </span>
      </div>
      
      <div>
        <strong style="display: block; margin-bottom: 8px; font-size: 13px; color: #6E6B7B">Success (verde + "Concluído"):</strong>
        <span class="descriptor-tag success">
          <i class="bi bi-check-circle descriptor-icon"></i>
          <span class="descriptor-code">EF05MA08</span>
          <span class="descriptor-bullet">•</span>
          <span class="descriptor-label">Concluído</span>
        </span>
      </div>
      
      <div>
        <strong style="display: block; margin-bottom: 8px; font-size: 13px; color: #6E6B7B">Info (ciano):</strong>
        <span class="descriptor-tag info">
          <i class="bi bi-info-circle descriptor-icon"></i>
          <span class="descriptor-code">EF05MA08</span>
        </span>
      </div>
    </div>
  `
};

/**
 * Story: Clickable
 * 
 * 3 tags onclick alert: EF05MA08 (Frações), EF05LP01 (Leitura), EF05CI03 (Ciclo da Água).
 * Cursor pointer + hover roxo+branco.
 * 
 * Educational context: Descritores clicáveis para filtrar questões ou exibir detalhes.
 */
export const Clickable = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-wrap: wrap; gap: 8px">
      <span class="descriptor-tag clickable primary" onclick="alert('Detalhes do descritor EF05MA08: Frações')">
        <i class="bi bi-bookmark descriptor-icon"></i>
        <span class="descriptor-code">EF05MA08</span>
        <span class="descriptor-bullet">•</span>
        <span class="descriptor-label">Frações</span>
      </span>
      
      <span class="descriptor-tag clickable primary" onclick="alert('Detalhes do descritor EF05LP01: Leitura')">
        <i class="bi bi-bookmark descriptor-icon"></i>
        <span class="descriptor-code">EF05LP01</span>
        <span class="descriptor-bullet">•</span>
        <span class="descriptor-label">Leitura</span>
      </span>
      
      <span class="descriptor-tag clickable primary" onclick="alert('Detalhes do descritor EF05CI03: Ciclo da Água')">
        <i class="bi bi-bookmark descriptor-icon"></i>
        <span class="descriptor-code">EF05CI03</span>
        <span class="descriptor-bullet">•</span>
        <span class="descriptor-label">Ciclo da Água</span>
      </span>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Descritores clicáveis (hover roxo+branco) para exibir detalhes ou filtrar questões.
    </p>
  `
};

/**
 * Story: MultipleDescriptors
 * 
 * Card missão "Frações Básicas" + 3 descritores primary roxo (EF05MA08, EF05MA09, EF05MA10) + meta.
 * 
 * Educational context: Missão com múltiplos descritores BNCC (3-5 códigos típico).
 */
export const MultipleDescriptors = {
  render: () => `
    ${styles}
    <div style="max-width: 600px; padding: 20px; background: #fff; border: 1px solid #D8D6DE; border-radius: 8px">
      <h3 style="margin: 0 0 12px; font-size: 18px; font-weight: 600; color: #5E5873">
        Missão: Frações Básicas
      </h3>
      
      <div style="margin-bottom: 12px">
        <strong style="display: block; margin-bottom: 8px; font-size: 13px; color: #6E6B7B">Descritores BNCC:</strong>
        <div style="display: flex; flex-wrap: wrap; gap: 8px">
          <span class="descriptor-tag primary">
            <i class="bi bi-bookmark descriptor-icon"></i>
            <span class="descriptor-code">EF05MA08</span>
          </span>
          <span class="descriptor-tag primary">
            <i class="bi bi-bookmark descriptor-icon"></i>
            <span class="descriptor-code">EF05MA09</span>
          </span>
          <span class="descriptor-tag primary">
            <i class="bi bi-bookmark descriptor-icon"></i>
            <span class="descriptor-code">EF05MA10</span>
          </span>
        </div>
      </div>
      
      <p style="margin: 0; font-size: 13px; color: #6E6B7B">
        12 questões • 5º A • Matemática
      </p>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Missão com 3 descritores BNCC (típico 3-5 códigos por atividade).
    </p>
  `
};

/**
 * Story: CabecalhoAvaliacao
 * 
 * Card header avaliação + meta + peso + seção BNCC background cinza + 3 descritores + labels descritivos.
 * 
 * Educational context: Cabeçalho de avaliação impressa com descritores e labels.
 */
export const CabecalhoAvaliacao = {
  render: () => `
    ${styles}
    <div style="max-width: 700px; padding: 24px; background: #fff; border: 1px solid #D8D6DE; border-radius: 8px">
      <h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #5E5873">
        Avaliação: Operações com Frações
      </h2>
      <p style="margin: 0 0 16px; font-size: 14px; color: #6E6B7B">
        5º A • Matemática • Data: 20/01/2024 • Peso: 10 pontos
      </p>
      
      <div style="padding: 16px; background: #F8F8F8; border-radius: 6px">
        <strong style="display: block; margin-bottom: 12px; font-size: 13px; color: #6E6B7B; text-transform: uppercase; letter-spacing: 0.5px">
          Descritores BNCC Abordados:
        </strong>
        
        <div style="display: flex; flex-direction: column; gap: 10px">
          <div style="display: flex; align-items: center; gap: 10px">
            <span class="descriptor-tag primary">
              <i class="bi bi-bookmark descriptor-icon"></i>
              <span class="descriptor-code">EF05MA08</span>
            </span>
            <span style="font-size: 14px; color: #5E5873">Problemas de adição e subtração com frações</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 10px">
            <span class="descriptor-tag primary">
              <i class="bi bi-bookmark descriptor-icon"></i>
              <span class="descriptor-code">EF05MA09</span>
            </span>
            <span style="font-size: 14px; color: #5E5873">Multiplicação e divisão de frações</span>
          </div>
          
          <div style="display: flex; align-items: center; gap: 10px">
            <span class="descriptor-tag primary">
              <i class="bi bi-bookmark descriptor-icon"></i>
              <span class="descriptor-code">EF05MA10</span>
            </span>
            <span style="font-size: 14px; color: #5E5873">Equivalência entre frações</span>
          </div>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Cabeçalho de avaliação impressa com descritores + labels descritivos.
    </p>
  `
};

/**
 * Story: RelatorioCobertura
 * 
 * Relatório cobertura BNCC: 2 colunas (5 abordados verde ✓ com activity count vs 3 não abordados cinza opacity 0.6 com 0 atividades).
 * 
 * Educational context: Relatório de cobertura curricular (planejamento pedagógico).
 */
export const RelatorioCobertura = {
  render: () => `
    ${styles}
    <div style="max-width: 900px; padding: 24px; background: #fff; border: 1px solid #D8D6DE; border-radius: 8px">
      <h3 style="margin: 0 0 20px; font-size: 18px; font-weight: 600; color: #5E5873">
        Cobertura BNCC - Matemática 5º Ano
      </h3>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px">
        <!-- Abordados -->
        <div>
          <h4 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #28C76F">
            <i class="bi bi-check-circle" style="margin-right: 6px"></i>
            Descritores Abordados (5)
          </h4>
          
          <div style="display: flex; flex-direction: column; gap: 10px">
            <div style="display: flex; align-items: center; justify-content: space-between">
              <span class="descriptor-tag success">
                <i class="bi bi-check-circle descriptor-icon"></i>
                <span class="descriptor-code">EF05MA08</span>
              </span>
              <span style="font-size: 13px; color: #6E6B7B">12 atividades</span>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: space-between">
              <span class="descriptor-tag success">
                <i class="bi bi-check-circle descriptor-icon"></i>
                <span class="descriptor-code">EF05MA09</span>
              </span>
              <span style="font-size: 13px; color: #6E6B7B">8 atividades</span>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: space-between">
              <span class="descriptor-tag success">
                <i class="bi bi-check-circle descriptor-icon"></i>
                <span class="descriptor-code">EF05MA10</span>
              </span>
              <span style="font-size: 13px; color: #6E6B7B">15 atividades</span>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: space-between">
              <span class="descriptor-tag success">
                <i class="bi bi-check-circle descriptor-icon"></i>
                <span class="descriptor-code">EF05MA11</span>
              </span>
              <span style="font-size: 13px; color: #6E6B7B">6 atividades</span>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: space-between">
              <span class="descriptor-tag success">
                <i class="bi bi-check-circle descriptor-icon"></i>
                <span class="descriptor-code">EF05MA12</span>
              </span>
              <span style="font-size: 13px; color: #6E6B7B">10 atividades</span>
            </div>
          </div>
        </div>
        
        <!-- Não Abordados -->
        <div>
          <h4 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #EA5455">
            <i class="bi bi-x-circle" style="margin-right: 6px"></i>
            Não Abordados (3)
          </h4>
          
          <div style="display: flex; flex-direction: column; gap: 10px">
            <div style="display: flex; align-items: center; justify-content: space-between">
              <span class="descriptor-tag" style="opacity: 0.6">
                <span class="descriptor-code">EF05MA13</span>
              </span>
              <span style="font-size: 13px; color: #6E6B7B; opacity: 0.6">0 atividades</span>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: space-between">
              <span class="descriptor-tag" style="opacity: 0.6">
                <span class="descriptor-code">EF05MA14</span>
              </span>
              <span style="font-size: 13px; color: #6E6B7B; opacity: 0.6">0 atividades</span>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: space-between">
              <span class="descriptor-tag" style="opacity: 0.6">
                <span class="descriptor-code">EF05MA15</span>
              </span>
              <span style="font-size: 13px; color: #6E6B7B; opacity: 0.6">0 atividades</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Relatório de cobertura curricular (5 abordados verde ✓ vs 3 não abordados cinza).
    </p>
  `
};

/**
 * Story: SmallSize
 * 
 * 6 tags pequenas (11px, padding 2×8px) para uso em tabelas compactas.
 * 
 * Educational context: Tags pequenas em tabelas de questões ou listas.
 */
export const SmallSize = {
  render: () => `
    ${styles}
    <div style="display: flex; flex-wrap: wrap; gap: 6px">
      <span class="descriptor-tag small primary">
        <span class="descriptor-code">EF05MA08</span>
      </span>
      <span class="descriptor-tag small primary">
        <span class="descriptor-code">EF05MA09</span>
      </span>
      <span class="descriptor-tag small primary">
        <span class="descriptor-code">EF05LP01</span>
      </span>
      <span class="descriptor-tag small primary">
        <span class="descriptor-code">EF05LP02</span>
      </span>
      <span class="descriptor-tag small primary">
        <span class="descriptor-code">EF05CI01</span>
      </span>
      <span class="descriptor-tag small primary">
        <span class="descriptor-code">EF05CI02</span>
      </span>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Variante:</strong> Small size (11px, padding 2×8px) para tabelas compactas.
    </p>
  `
};

/**
 * Story: AllSubjects
 * 
 * 3 seções (Matemática roxo, Português verde, Ciências ciano) com 3 códigos BNCC cada.
 * 
 * Educational context: Organização de descritores por disciplina (planejamento multi-disciplinar).
 */
export const AllSubjects = {
  render: () => `
    ${styles}
    <div style="max-width: 700px; display: flex; flex-direction: column; gap: 24px">
      <!-- Matemática -->
      <div>
        <h4 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #6E63E8">
          <i class="bi bi-calculator" style="margin-right: 8px"></i>
          Matemática
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px">
          <span class="descriptor-tag primary">
            <i class="bi bi-bookmark descriptor-icon"></i>
            <span class="descriptor-code">EF05MA08</span>
          </span>
          <span class="descriptor-tag primary">
            <i class="bi bi-bookmark descriptor-icon"></i>
            <span class="descriptor-code">EF05MA09</span>
          </span>
          <span class="descriptor-tag primary">
            <i class="bi bi-bookmark descriptor-icon"></i>
            <span class="descriptor-code">EF05MA10</span>
          </span>
        </div>
      </div>
      
      <!-- Português -->
      <div>
        <h4 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #28C76F">
          <i class="bi bi-book" style="margin-right: 8px"></i>
          Língua Portuguesa
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px">
          <span class="descriptor-tag success">
            <i class="bi bi-bookmark descriptor-icon" style="color: #28C76F"></i>
            <span class="descriptor-code">EF05LP01</span>
          </span>
          <span class="descriptor-tag success">
            <i class="bi bi-bookmark descriptor-icon" style="color: #28C76F"></i>
            <span class="descriptor-code">EF05LP02</span>
          </span>
          <span class="descriptor-tag success">
            <i class="bi bi-bookmark descriptor-icon" style="color: #28C76F"></i>
            <span class="descriptor-code">EF05LP03</span>
          </span>
        </div>
      </div>
      
      <!-- Ciências -->
      <div>
        <h4 style="margin: 0 0 12px; font-size: 16px; font-weight: 600; color: #00CFE8">
          <i class="bi bi-lightbulb" style="margin-right: 8px"></i>
          Ciências
        </h4>
        <div style="display: flex; flex-wrap: wrap; gap: 8px">
          <span class="descriptor-tag info">
            <i class="bi bi-bookmark descriptor-icon" style="color: #00CFE8"></i>
            <span class="descriptor-code">EF05CI01</span>
          </span>
          <span class="descriptor-tag info">
            <i class="bi bi-bookmark descriptor-icon" style="color: #00CFE8"></i>
            <span class="descriptor-code">EF05CI02</span>
          </span>
          <span class="descriptor-tag info">
            <i class="bi bi-bookmark descriptor-icon" style="color: #00CFE8"></i>
            <span class="descriptor-code">EF05CI03</span>
          </span>
        </div>
      </div>
    </div>
    <p style="margin-top: 16px; font-size: 13px; color: #6E6B7B">
      <strong>Contexto:</strong> Organização de descritores por disciplina (Matemática, Português, Ciências).
    </p>
  `
};
