/**
 * @component EvaluationsHtmlContentRenderer
 * @description HTML content renderer for evaluation questions with responsive image sizing and text alignment
 * @source educacross-frontoffice/src/components/EvaluationsHtmlContentRenderer.vue
 * @generated 2026-02-03
 */

const componentStyles = `
<style>
.html-content-renderer {
  white-space: wrap;
  overflow-wrap: break-word;
  padding: 20px;
  background: white;
  border: 1px solid #DBDADE;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.6;
  color: #5D596C;
  max-width: 800px;
  margin: 0 auto;
}

.html-content-renderer img {
  max-width: var(--max-image-width, 100%);
  max-height: var(--max-image-height, 600px);
  height: auto;
  border-radius: 4px;
  display: block;
  margin: 16px 0;
}

.html-content-renderer .align-center {
  display: block;
  text-align: center;
  width: 100%;
  margin: 16px 0;
}

.html-content-renderer .align-center img {
  display: inline-block;
  max-width: var(--max-image-width, 100%);
  max-height: var(--max-image-height, 600px);
}

.html-content-renderer .align-left {
  display: block;
  text-align: left;
  width: 100%;
  margin: 16px 0;
}

.html-content-renderer .align-left img {
  display: inline-block;
  max-width: var(--max-image-width, 100%);
}

.html-content-renderer .align-right {
  display: block;
  text-align: right;
  width: 100%;
  margin: 16px 0;
}

.html-content-renderer .align-right img {
  display: inline-block;
  max-width: var(--max-image-width, 100%);
}

.html-content-renderer .align-justify {
  display: block;
  text-align: justify;
  width: 100%;
  margin: 16px 0;
}

.html-content-renderer h1,
.html-content-renderer h2,
.html-content-renderer h3 {
  color: #5D596C;
  margin-bottom: 12px;
  margin-top: 20px;
  font-weight: 600;
}

.html-content-renderer h1 {
  font-size: 24px;
}

.html-content-renderer h2 {
  font-size: 20px;
}

.html-content-renderer h3 {
  font-size: 18px;
}

.html-content-renderer p {
  margin-bottom: 16px;
  line-height: 1.7;
}

.html-content-renderer ul,
.html-content-renderer ol {
  margin-bottom: 16px;
  padding-left: 24px;
}

.html-content-renderer li {
  margin-bottom: 8px;
}

.html-content-renderer strong {
  font-weight: 700;
  color: #5D596C;
}

.html-content-renderer em {
  font-style: italic;
}

.html-content-renderer code {
  background: #F3F2F7;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

.html-content-renderer blockquote {
  border-left: 4px solid #6E63E8;
  padding-left: 16px;
  margin: 16px 0;
  color: #6E6B7B;
  font-style: italic;
}

.html-content-renderer table {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}

.html-content-renderer th,
.html-content-renderer td {
  border: 1px solid #DBDADE;
  padding: 12px;
  text-align: left;
}

.html-content-renderer th {
  background: #F8F7FA;
  font-weight: 600;
}

.demo-container {
  padding: 24px;
  background: #F8F7FA;
  border-radius: 12px;
}

.demo-label {
  font-size: 13px;
  font-weight: 600;
  color: #6E6B7B;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mobile-viewport {
  max-width: 375px;
  margin: 0 auto;
}

@media (max-width: 767px) {
  .html-content-renderer {
    padding: 12px;
    font-size: 13px;
  }

  .html-content-renderer img {
    max-width: 100%;
    max-height: 400px;
  }

  .html-content-renderer h1 {
    font-size: 20px;
  }

  .html-content-renderer h2 {
    font-size: 18px;
  }

  .html-content-renderer h3 {
    font-size: 16px;
  }
}
</style>
`;

export default {
  title: 'Front-office/Evaluations/EvaluationsHtmlContentRenderer',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'HTML content renderer for evaluation questions with responsive image sizing and text alignment. Supports multiple alignment classes and CSS variables for image constraints.',
      },
    },
  },
};

/**
 * Basic HTML content with paragraph and heading, default image sizing (max-width 100%)
 */
export const Default = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Renderizador de Conteúdo HTML</div>
      <div class="html-content-renderer">
        <h2>Qual foi o principal motivo da Revolução Francesa?</h2>
        <p>
          A Revolução Francesa foi um período de profundas transformações políticas e sociais 
          na França que teve início em 1789 e se estendeu até 1799. Este evento histórico 
          marcou o fim do absolutismo monárquico e o surgimento de ideais de liberdade, 
          igualdade e fraternidade.
        </p>
        <p>
          As causas da revolução incluíram crises econômicas, desigualdade social extrema 
          entre as classes (nobreza, clero e terceiro estado), e influências do Iluminismo 
          que questionavam o poder absoluto dos reis.
        </p>
      </div>
    </div>
  `,
};

/**
 * Content with multiple images showing responsive sizing within max constraints
 */
export const WithImages = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Conteúdo com Imagens Responsivas</div>
      <div class="html-content-renderer" style="--max-image-width: 500px; --max-image-height: 400px;">
        <h2>O Ciclo da Água na Natureza</h2>
        <p>
          O ciclo da água, também conhecido como ciclo hidrológico, descreve o movimento 
          contínuo da água na superfície, acima e abaixo da superfície da Terra.
        </p>
        <img src="https://via.placeholder.com/800x600/6E63E8/FFFFFF?text=Ciclo+da+Água" alt="Diagrama do ciclo da água" />
        <p>
          O processo envolve várias etapas importantes: evaporação, condensação, 
          precipitação e infiltração. Cada etapa desempenha um papel fundamental 
          na manutenção do equilíbrio hídrico do planeta.
        </p>
        <img src="https://via.placeholder.com/600x400/28C76F/FFFFFF?text=Evaporação" alt="Processo de evaporação" />
        <p>
          A evaporação é o processo pelo qual a água líquida se transforma em vapor 
          de água devido ao calor do sol. Este vapor sobe para a atmosfera onde se 
          resfria e se condensa em nuvens.
        </p>
      </div>
    </div>
  `,
};

/**
 * Text and image using .align-center class for centered content
 */
export const CenterAligned = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Conteúdo Centralizado</div>
      <div class="html-content-renderer">
        <div class="align-center">
          <h2>Sistema Solar</h2>
        </div>
        <div class="align-center">
          <p>
            O Sistema Solar é composto pelo Sol e todos os corpos celestes que orbitam ao seu redor, 
            incluindo oito planetas, suas luas, asteroides e cometas.
          </p>
        </div>
        <div class="align-center">
          <img src="https://via.placeholder.com/600x400/6E63E8/FFFFFF?text=Sistema+Solar" alt="Sistema Solar" />
        </div>
        <div class="align-center">
          <p>
            Os planetas em ordem de distância do Sol são: Mercúrio, Vênus, Terra, Marte, 
            Júpiter, Saturno, Urano e Netuno.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * Left-aligned content with .align-left class showing left justification
 */
export const LeftAligned = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Conteúdo Alinhado à Esquerda</div>
      <div class="html-content-renderer">
        <div class="align-left">
          <h2>A Fotossíntese nas Plantas</h2>
        </div>
        <div class="align-left">
          <img src="https://via.placeholder.com/500x300/28C76F/FFFFFF?text=Fotossíntese" alt="Processo de fotossíntese" />
        </div>
        <div class="align-left">
          <p>
            A fotossíntese é o processo biológico realizado pelas plantas, algas e algumas 
            bactérias, através do qual convertem energia luminosa em energia química.
          </p>
        </div>
        <div class="align-left">
          <p><strong>Componentes necessários:</strong></p>
          <ul>
            <li>Luz solar (energia luminosa)</li>
            <li>Dióxido de carbono (CO₂)</li>
            <li>Água (H₂O)</li>
            <li>Clorofila (pigmento verde das folhas)</li>
          </ul>
        </div>
        <div class="align-left">
          <p>
            Como resultado, as plantas produzem glicose (alimento) e liberam oxigênio (O₂) 
            para a atmosfera, essencial para a respiração dos seres vivos.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * Right-aligned content with .align-right demonstrating right alignment
 */
export const RightAligned = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Conteúdo Alinhado à Direita</div>
      <div class="html-content-renderer">
        <div class="align-right">
          <h2>Teorema de Pitágoras</h2>
        </div>
        <div class="align-right">
          <p>
            O Teorema de Pitágoras estabelece que em todo triângulo retângulo, 
            o quadrado da hipotenusa é igual à soma dos quadrados dos catetos.
          </p>
        </div>
        <div class="align-right">
          <img src="https://via.placeholder.com/400x300/FF9F43/FFFFFF?text=a²+%2B+b²+%3D+c²" alt="Teorema de Pitágoras" />
        </div>
        <div class="align-right">
          <p>
            <strong>Fórmula:</strong> a² + b² = c²
          </p>
        </div>
        <div class="align-right">
          <p>
            Onde <em>a</em> e <em>b</em> são os catetos (lados que formam o ângulo reto) 
            e <em>c</em> é a hipotenusa (lado oposto ao ângulo reto).
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * Justified text using .align-justify class for newspaper-style layout
 */
export const JustifyAligned = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Texto Justificado</div>
      <div class="html-content-renderer">
        <h2>A Independência do Brasil</h2>
        <div class="align-justify">
          <p>
            A Independência do Brasil foi um processo político que culminou no rompimento 
            dos laços entre o Brasil e Portugal, proclamada em 7 de setembro de 1822 por 
            Dom Pedro I às margens do Rio Ipiranga em São Paulo. Este acontecimento marcou 
            o fim de mais de três séculos de domínio colonial português sobre o território 
            brasileiro e estabeleceu o Brasil como uma nação soberana e independente.
          </p>
        </div>
        <div class="align-justify">
          <p>
            As causas que levaram à independência foram múltiplas e complexas. Entre elas, 
            destacam-se os ideais iluministas que se espalhavam pela Europa e América, a 
            influência da independência dos Estados Unidos em 1776, a Revolução Francesa 
            de 1789, e principalmente a crise política em Portugal causada pela invasão 
            napoleônica em 1808. A transferência da corte portuguesa para o Brasil naquele 
            ano transformou o Rio de Janeiro na capital do Império Português, elevando o 
            status político da colônia.
          </p>
        </div>
        <div class="align-justify">
          <p>
            O processo de independência não foi imediato nem pacífico em todas as regiões. 
            Enquanto em algumas províncias a adesão foi relativamente tranquila, em outras 
            como Bahia, Maranhão e Pará houve resistência e conflitos armados que se 
            estenderam por meses após o grito de independência. A consolidação efetiva da 
            independência só ocorreu em 1823, com a expulsão das últimas tropas portuguesas 
            do território brasileiro. O reconhecimento internacional da independência do 
            Brasil foi um processo gradual, sendo Portugal o último a reconhecê-la em 1825.
          </p>
        </div>
      </div>
    </div>
  `,
};

/**
 * Multiple paragraphs with overflow-wrap demonstrating text wrapping
 */
export const LongContent = {
  render: () => `
    ${componentStyles}
    <div class="demo-container">
      <div class="demo-label">Conteúdo Extenso com Quebra de Palavras</div>
      <div class="html-content-renderer">
        <h2>Compreensão de Texto: A Biodiversidade Brasileira</h2>
        <p>
          O Brasil é considerado o país com a maior biodiversidade do planeta, abrigando 
          entre 15% e 20% de todas as espécies conhecidas no mundo. Esta riqueza biológica 
          extraordinária está distribuída em seis biomas principais: Amazônia, Cerrado, 
          Mata Atlântica, Caatinga, Pampa e Pantanal.
        </p>
        <h3>A Floresta Amazônica</h3>
        <p>
          A Amazônia é a maior floresta tropical do mundo e representa aproximadamente 
          49% do território brasileiro. Com mais de 40.000 espécies de plantas, 1.300 
          espécies de aves, 3.000 espécies de peixes, 430 espécies de mamíferos e 
          2,5 milhões de espécies de insetos, a região amazônica é um verdadeiro 
          tesouro da biodiversidade global.
        </p>
        <p>
          Além de sua importância biológica, a Amazônia desempenha um papel crucial 
          na regulação do clima global através do processo de evapotranspiração, que 
          libera milhões de toneladas de água na atmosfera diariamente. Este fenômeno 
          influencia padrões climáticos não apenas no Brasil, mas em toda a América do Sul.
        </p>
        <h3>O Cerrado e Sua Importância</h3>
        <p>
          O Cerrado, segundo maior bioma brasileiro, é frequentemente chamado de "berço 
          das águas" por abrigar nascentes de importantes bacias hidrográficas como 
          Amazônica, do São Francisco e do Paraná. Com aproximadamente 11.000 espécies 
          de plantas nativas, das quais 44% são endêmicas, o Cerrado apresenta uma 
          biodiversidade única e extremamente adaptada às condições de solo pobre e 
          períodos de seca prolongados.
        </p>
        <p>
          Infelizmente, tanto a Amazônia quanto o Cerrado enfrentam ameaças significativas 
          devido ao desmatamento, expansão agrícola, mineração e mudanças climáticas. 
          A preservação destes biomas é fundamental não apenas para a manutenção da 
          biodiversidade, mas também para a regulação do clima, proteção de recursos 
          hídricos e manutenção dos serviços ecossistêmicos essenciais para a vida humana.
        </p>
        <p>
          <strong>Questão para reflexão:</strong> Considerando a importância da biodiversidade 
          brasileira para o equilíbrio ambiental global, quais medidas você considera mais 
          eficazes para promover a conservação dos nossos biomas?
        </p>
      </div>
    </div>
  `,
};

/**
 * 375px viewport showing responsive image sizing and text flow
 */
export const MobileView = {
  render: () => `
    ${componentStyles}
    <div class="demo-container mobile-viewport">
      <div class="demo-label">Visualização Mobile (375px)</div>
      <div class="html-content-renderer">
        <h2>Estados Físicos da Matéria</h2>
        <p>
          A matéria pode existir em diferentes estados físicos, sendo os três principais: 
          sólido, líquido e gasoso.
        </p>
        <img src="https://via.placeholder.com/400x300/6E63E8/FFFFFF?text=Estados+da+Matéria" alt="Estados da matéria" />
        <h3>Estado Sólido</h3>
        <p>
          No estado sólido, as partículas estão fortemente ligadas e organizadas em 
          uma estrutura rígida. Exemplos: gelo, madeira, ferro.
        </p>
        <h3>Estado Líquido</h3>
        <p>
          No estado líquido, as partículas têm mais liberdade de movimento, permitindo 
          que o líquido flua e tome a forma do recipiente. Exemplos: água, óleo, mercúrio.
        </p>
        <h3>Estado Gasoso</h3>
        <p>
          No estado gasoso, as partículas se movem livremente e ocupam todo o espaço 
          disponível. Exemplos: ar, vapor d'água, gás oxigênio.
        </p>
        <p>
          <strong>Importante:</strong> As mudanças de estado físico ocorrem com variações 
          de temperatura e pressão, como fusão (sólido → líquido), vaporização (líquido → 
          gasoso) e condensação (gasoso → líquido).
        </p>
      </div>
    </div>
  `,
};
