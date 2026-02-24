/**
 * ==============================================
 * EDUCACROSS DESIGN SYSTEM - TYPOGRAPHY
 * ==============================================
 * 
 * Sistema tipográfico oficial da Educacross.
 * Baseado na identidade visual institucional.
 * 
 * Cores da marca:
 * - Teal Principal: #0C5257
 * - Teal Escuro: #225054
 * - Dourado: #FAB84A
 * - Laranja: #E9934C
 * - Vermelho: #DF2B3C
 * - Creme: #F2EEE3
 */

export default {
  title: 'Vuexy/Foundations/Typography',
  parameters: {
    previewTabs: {
      canvas: { hidden: false },
    },
  },
};

// ============================================
// HERO SECTION COMPONENT (Reusável)
// ============================================
const heroSection = (title, description) => `
  <div style="
    background: linear-gradient(135deg, #0C5257 0%, #225054 100%);
    padding: 3rem 2rem;
    margin: -1rem -1rem 2rem -1rem;
    border-radius: 0 0 24px 24px;
    position: relative;
    overflow: hidden;
  ">
    <!-- Pattern decorativo -->
    <div style="
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(250, 184, 74, 0.1) 0%, transparent 70%);
    "></div>
    
    <div style="position: relative; z-index: 1; max-width: 600px;">
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
        <div style="
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #FAB84A, #E9934C);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        ">🔤</div>
        <h1 style="
          color: white;
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
        ">${title}</h1>
      </div>
      <p style="
        color: rgba(255, 255, 255, 0.85);
        font-size: 1.125rem;
        line-height: 1.6;
        margin: 0;
      ">${description}</p>
    </div>
    
    <!-- Belinha decorativa -->
    <img 
      src="/vuexy/img/educacross/belinha.svg" 
      alt="Belinha" 
      style="
        position: absolute;
        right: 2rem;
        bottom: -10px;
        width: 80px;
        height: auto;
        opacity: 0.9;
      "
    />
  </div>
`;

// ============================================
// CARD COMPONENT (Reusável)
// ============================================
const card = (title, icon, borderColor, content) => `
  <div style="
    background: white;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
    border-left: 4px solid ${borderColor};
    transition: transform 0.2s, box-shadow 0.2s;
  " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(12, 82, 87, 0.12)';" 
     onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 12px rgba(12, 82, 87, 0.08)';">
    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
      <span style="font-size: 1.25rem;">${icon}</span>
      <h3 style="
        color: #225054;
        font-size: 1.125rem;
        font-weight: 600;
        margin: 0;
      ">${title}</h3>
    </div>
    ${content}
  </div>
`;

// ============================================
// CODE BOX COMPONENT (Reusável)
// ============================================
const codeBox = (code) => `
  <div style="
    background: #1a2a2c;
    border-radius: 8px;
    padding: 1rem;
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.8125rem;
    color: #a0d4a0;
    overflow-x: auto;
    margin: 0.75rem 0;
  ">
    <code>${code}</code>
  </div>
`;

// ============================================
// FONT FAMILY
// ============================================
export const FontFamily = {
  render: () => `
    <div style="padding: 1rem; max-width: 900px; background: #F8F6EF; min-height: 100vh;">
      ${heroSection(
        'Font Family',
        'As famílias tipográficas utilizadas no Design System Educacross. Public Sans é nossa fonte principal, escolhida por sua legibilidade e modernidade.'
      )}
      
      <div style="padding: 0 1rem; display: flex; flex-direction: column; gap: 1.5rem;">
        
        <!-- Public Sans -->
        ${card('Public Sans', '✨', '#FAB84A', `
          <div style="
            background: linear-gradient(135deg, #F8F6EF, #F2EEE3);
            border-radius: 12px;
            padding: 1.25rem;
            margin-bottom: 1rem;
          ">
            <div style="
              font-size: 2.5rem;
              font-weight: 300;
              color: #225054;
              margin-bottom: 0.5rem;
              letter-spacing: 2px;
            ">ABCDEFGHIJKLM</div>
            <div style="
              font-size: 2.5rem;
              font-weight: 300;
              color: #225054;
              letter-spacing: 2px;
            ">NOPQRSTUVWXYZ</div>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1rem;">
            <div style="
              background: #F8F6EF;
              border-radius: 8px;
              padding: 1rem;
              text-align: center;
            ">
              <div style="font-size: 1.5rem; color: #225054; margin-bottom: 0.25rem;">
                abcdefghijklmnopqrstuvwxyz
              </div>
              <small style="color: #6c757d;">Minúsculas</small>
            </div>
            <div style="
              background: #F8F6EF;
              border-radius: 8px;
              padding: 1rem;
              text-align: center;
            ">
              <div style="font-size: 1.5rem; color: #225054; margin-bottom: 0.25rem;">
                0123456789 !@#$%
              </div>
              <small style="color: #6c757d;">Números & Símbolos</small>
            </div>
          </div>
          
          ${codeBox('font-family: "Public Sans", sans-serif;')}
          
          <p style="color: #6c757d; font-size: 0.875rem; margin: 0;">
            <strong style="color: #0C5257;">Uso:</strong> Interface principal, textos, botões, labels e toda comunicação digital.
          </p>
        `)}
        
        <!-- Monospace -->
        ${card('Monospace', '💻', '#0C5257', `
          <div style="
            background: #1a2a2c;
            border-radius: 12px;
            padding: 1.25rem;
            margin-bottom: 1rem;
          ">
            <div style="
              font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
              font-size: 1.5rem;
              color: #a0d4a0;
              margin-bottom: 0.5rem;
            ">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
            <div style="
              font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
              font-size: 1.5rem;
              color: #FAB84A;
            ">abcdefghijklmnopqrstuvwxyz</div>
            <div style="
              font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
              font-size: 1.5rem;
              color: #DF2B3C;
              margin-top: 0.5rem;
            ">0123456789 !@#$%&*()</div>
          </div>
          
          ${codeBox('font-family: var(--bs-font-monospace);')}
          
          <p style="color: #6c757d; font-size: 0.875rem; margin: 0;">
            <strong style="color: #0C5257;">Uso:</strong> Código, snippets, dados técnicos e elementos que precisam de largura fixa.
          </p>
        `)}
        
        <!-- Dica -->
        <div style="
          background: linear-gradient(135deg, rgba(250, 184, 74, 0.15), rgba(233, 147, 76, 0.1));
          border: 1px solid rgba(250, 184, 74, 0.3);
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        ">
          <img src="/vuexy/img/educacross/belinha.svg" alt="Belinha" style="width: 48px; height: auto;" />
          <div>
            <h4 style="color: #225054; margin: 0 0 0.5rem 0; font-size: 1rem;">💡 Dica da Belinha</h4>
            <p style="color: #225054; margin: 0; font-size: 0.9375rem; line-height: 1.6;">
              Para garantir a consistência tipográfica, sempre use as variáveis CSS: 
              <code style="background: white; padding: 2px 6px; border-radius: 4px; color: #0C5257;">var(--bs-font-sans-serif)</code> 
              e 
              <code style="background: white; padding: 2px 6px; border-radius: 4px; color: #0C5257;">var(--bs-font-monospace)</code>
            </p>
          </div>
        </div>
        
      </div>
    </div>
  `,
};

// ============================================
// HEADINGS
// ============================================
export const Headings = {
  render: () => `
    <div style="padding: 1rem; max-width: 900px; background: #F8F6EF; min-height: 100vh;">
      ${heroSection(
        'Headings',
        'Hierarquia de títulos para criar estrutura visual clara e organizada. Use de forma consistente para melhorar a escaneabilidade.'
      )}
      
      <div style="padding: 0 1rem;">
        
        <!-- Tabela de Headings -->
        <div style="
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
        ">
          <!-- Header -->
          <div style="
            background: linear-gradient(135deg, #0C5257, #225054);
            padding: 1rem 1.5rem;
            display: grid;
            grid-template-columns: 1fr 120px 150px;
            gap: 1rem;
            color: white;
            font-weight: 600;
            font-size: 0.875rem;
          ">
            <span>Exemplo</span>
            <span>Tamanho</span>
            <span>Uso Recomendado</span>
          </div>
          
          <!-- H1 -->
          <div style="
            padding: 1.5rem;
            display: grid;
            grid-template-columns: 1fr 120px 150px;
            gap: 1rem;
            align-items: center;
            border-bottom: 1px solid #E0DDD4;
          ">
            <h1 style="margin: 0; color: #225054;">Heading 1</h1>
            <div>
              <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #0C5257; font-size: 0.75rem;">2.5rem</code>
              <div style="color: #6c757d; font-size: 0.75rem; margin-top: 4px;">40px</div>
            </div>
            <span style="color: #6c757d; font-size: 0.875rem;">Títulos de página</span>
          </div>
          
          <!-- H2 -->
          <div style="
            padding: 1.5rem;
            display: grid;
            grid-template-columns: 1fr 120px 150px;
            gap: 1rem;
            align-items: center;
            border-bottom: 1px solid #E0DDD4;
          ">
            <h2 style="margin: 0; color: #225054;">Heading 2</h2>
            <div>
              <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #0C5257; font-size: 0.75rem;">2rem</code>
              <div style="color: #6c757d; font-size: 0.75rem; margin-top: 4px;">32px</div>
            </div>
            <span style="color: #6c757d; font-size: 0.875rem;">Seções principais</span>
          </div>
          
          <!-- H3 -->
          <div style="
            padding: 1.5rem;
            display: grid;
            grid-template-columns: 1fr 120px 150px;
            gap: 1rem;
            align-items: center;
            border-bottom: 1px solid #E0DDD4;
          ">
            <h3 style="margin: 0; color: #225054;">Heading 3</h3>
            <div>
              <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #0C5257; font-size: 0.75rem;">1.75rem</code>
              <div style="color: #6c757d; font-size: 0.75rem; margin-top: 4px;">28px</div>
            </div>
            <span style="color: #6c757d; font-size: 0.875rem;">Subseções</span>
          </div>
          
          <!-- H4 -->
          <div style="
            padding: 1.5rem;
            display: grid;
            grid-template-columns: 1fr 120px 150px;
            gap: 1rem;
            align-items: center;
            border-bottom: 1px solid #E0DDD4;
          ">
            <h4 style="margin: 0; color: #225054;">Heading 4</h4>
            <div>
              <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #0C5257; font-size: 0.75rem;">1.5rem</code>
              <div style="color: #6c757d; font-size: 0.75rem; margin-top: 4px;">24px</div>
            </div>
            <span style="color: #6c757d; font-size: 0.875rem;">Títulos de cards</span>
          </div>
          
          <!-- H5 -->
          <div style="
            padding: 1.5rem;
            display: grid;
            grid-template-columns: 1fr 120px 150px;
            gap: 1rem;
            align-items: center;
            border-bottom: 1px solid #E0DDD4;
          ">
            <h5 style="margin: 0; color: #225054;">Heading 5</h5>
            <div>
              <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #0C5257; font-size: 0.75rem;">1.25rem</code>
              <div style="color: #6c757d; font-size: 0.75rem; margin-top: 4px;">20px</div>
            </div>
            <span style="color: #6c757d; font-size: 0.875rem;">Labels de seção</span>
          </div>
          
          <!-- H6 -->
          <div style="
            padding: 1.5rem;
            display: grid;
            grid-template-columns: 1fr 120px 150px;
            gap: 1rem;
            align-items: center;
          ">
            <h6 style="margin: 0; color: #225054;">Heading 6</h6>
            <div>
              <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #0C5257; font-size: 0.75rem;">1rem</code>
              <div style="color: #6c757d; font-size: 0.75rem; margin-top: 4px;">16px</div>
            </div>
            <span style="color: #6c757d; font-size: 0.875rem;">Títulos menores</span>
          </div>
        </div>
        
        <!-- Exemplo contextual -->
        <div style="
          background: white;
          border-radius: 16px;
          padding: 2rem;
          margin-top: 1.5rem;
          box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
        ">
          <div style="
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #FAB84A;
          ">
            <span style="font-size: 1.25rem;">📚</span>
            <h3 style="margin: 0; color: #225054;">Exemplo de Hierarquia</h3>
          </div>
          
          <div style="
            background: #F8F6EF;
            border-radius: 12px;
            padding: 1.5rem;
          ">
            <h1 style="color: #0C5257; margin-bottom: 0.5rem;">Plataforma Educacross</h1>
            <p style="color: #6c757d; margin-bottom: 1.5rem;">Aprenda brincando com a Belinha!</p>
            
            <h2 style="color: #225054; margin-bottom: 0.75rem;">Jogos Educativos</h2>
            
            <h3 style="color: #225054; margin-bottom: 0.5rem;">Matemática</h3>
            <h4 style="color: #225054; margin-bottom: 0.25rem;">Números e Quantidades</h4>
            <p style="color: #6c757d; font-size: 0.875rem;">Atividades para desenvolver o raciocínio lógico.</p>
            
            <h3 style="color: #225054; margin: 1rem 0 0.5rem;">Português</h3>
            <h4 style="color: #225054; margin-bottom: 0.25rem;">Alfabetização</h4>
            <p style="color: #6c757d; font-size: 0.875rem;">Jogos de letras e palavras.</p>
          </div>
        </div>
        
      </div>
    </div>
  `,
};

// ============================================
// BODY TEXT
// ============================================
export const BodyText = {
  render: () => `
    <div style="padding: 1rem; max-width: 900px; background: #F8F6EF; min-height: 100vh;">
      ${heroSection(
        'Body Text',
        'Tamanhos de texto para diferentes contextos. Escolha o tamanho adequado para garantir legibilidade e hierarquia visual.'
      )}
      
      <div style="padding: 0 1rem; display: flex; flex-direction: column; gap: 1.5rem;">
        
        ${card('Default', '📝', '#0C5257', `
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <span style="
              background: #0C5257;
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 0.75rem;
              font-weight: 600;
            ">1rem / 16px</span>
            <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #6c757d; font-size: 0.75rem;">.text-body</code>
          </div>
          <p style="color: #225054; line-height: 1.7; margin: 0; font-size: 1rem;">
            Este é o texto padrão usado para parágrafos e conteúdo geral da plataforma Educacross. 
            Otimizado para leitura em telas, com espaçamento entre linhas confortável.
          </p>
        `)}
        
        ${card('Large', '📖', '#FAB84A', `
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <span style="
              background: #FAB84A;
              color: #225054;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 0.75rem;
              font-weight: 600;
            ">1.125rem / 18px</span>
            <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #6c757d; font-size: 0.75rem;">.text-lg</code>
          </div>
          <p style="color: #225054; line-height: 1.7; margin: 0; font-size: 1.125rem;">
            Texto maior usado para destaques, introduções de seção e quando queremos dar mais ênfase ao conteúdo.
          </p>
        `)}
        
        ${card('Small', '🔍', '#E9934C', `
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <span style="
              background: #E9934C;
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 0.75rem;
              font-weight: 600;
            ">0.875rem / 14px</span>
            <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #6c757d; font-size: 0.75rem;">.text-sm / .small</code>
          </div>
          <p style="color: #225054; line-height: 1.6; margin: 0; font-size: 0.875rem;">
            Texto menor usado para notas, legendas, informações secundárias e metadados.
          </p>
        `)}
        
        ${card('Extra Small', '🔬', '#6c757d', `
          <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
            <span style="
              background: #6c757d;
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 0.75rem;
              font-weight: 600;
            ">0.75rem / 12px</span>
            <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #6c757d; font-size: 0.75rem;">.text-xs</code>
          </div>
          <p style="color: #6c757d; line-height: 1.5; margin: 0; font-size: 0.75rem;">
            Texto muito pequeno para timestamps, labels auxiliares e informações de rodapé.
          </p>
        `)}
        
      </div>
    </div>
  `,
};

// ============================================
// FONT WEIGHTS
// ============================================
export const FontWeights = {
  render: () => `
    <div style="padding: 1rem; max-width: 900px; background: #F8F6EF; min-height: 100vh;">
      ${heroSection(
        'Font Weights',
        'Pesos tipográficos disponíveis para criar hierarquia e ênfase. Use com moderação para manter a consistência visual.'
      )}
      
      <div style="padding: 0 1rem;">
        
        <!-- Grid de pesos -->
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        ">
          
          <!-- Light -->
          <div style="
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
            text-align: center;
          ">
            <div style="
              font-weight: 300;
              font-size: 3rem;
              color: #225054;
              margin-bottom: 0.5rem;
            ">Aa</div>
            <div style="font-weight: 600; color: #0C5257; margin-bottom: 0.25rem;">Light</div>
            <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #6c757d; font-size: 0.75rem;">300</code>
          </div>
          
          <!-- Regular -->
          <div style="
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
            text-align: center;
          ">
            <div style="
              font-weight: 400;
              font-size: 3rem;
              color: #225054;
              margin-bottom: 0.5rem;
            ">Aa</div>
            <div style="font-weight: 600; color: #0C5257; margin-bottom: 0.25rem;">Regular</div>
            <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #6c757d; font-size: 0.75rem;">400</code>
          </div>
          
          <!-- Medium -->
          <div style="
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
            text-align: center;
          ">
            <div style="
              font-weight: 500;
              font-size: 3rem;
              color: #225054;
              margin-bottom: 0.5rem;
            ">Aa</div>
            <div style="font-weight: 600; color: #0C5257; margin-bottom: 0.25rem;">Medium</div>
            <code style="background: #F8F6EF; padding: 4px 8px; border-radius: 4px; color: #6c757d; font-size: 0.75rem;">500</code>
          </div>
          
          <!-- Semibold -->
          <div style="
            background: linear-gradient(135deg, #FAB84A, #E9934C);
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
            text-align: center;
          ">
            <div style="
              font-weight: 600;
              font-size: 3rem;
              color: white;
              margin-bottom: 0.5rem;
            ">Aa</div>
            <div style="font-weight: 600; color: white; margin-bottom: 0.25rem;">Semibold ⭐</div>
            <code style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; color: white; font-size: 0.75rem;">600</code>
          </div>
          
          <!-- Bold -->
          <div style="
            background: linear-gradient(135deg, #0C5257, #225054);
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
            text-align: center;
          ">
            <div style="
              font-weight: 700;
              font-size: 3rem;
              color: white;
              margin-bottom: 0.5rem;
            ">Aa</div>
            <div style="font-weight: 600; color: #FAB84A; margin-bottom: 0.25rem;">Bold</div>
            <code style="background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; color: white; font-size: 0.75rem;">700</code>
          </div>
          
        </div>
        
        <!-- Classes -->
        <div style="
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
        ">
          <div style="
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid #FAB84A;
          ">
            <span style="font-size: 1.25rem;">🏷️</span>
            <h3 style="margin: 0; color: #225054;">Classes Bootstrap</h3>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #F8F6EF; border-radius: 8px;">
              <span style="font-weight: 300;">Light text example</span>
              <code style="font-size: 0.75rem; color: #0C5257;">.font-weight-light</code>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #F8F6EF; border-radius: 8px;">
              <span style="font-weight: 400;">Normal text example</span>
              <code style="font-size: 0.75rem; color: #0C5257;">.font-weight-normal</code>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #F8F6EF; border-radius: 8px;">
              <span style="font-weight: 500;">Medium text example</span>
              <code style="font-size: 0.75rem; color: #0C5257;">.fw-medium</code>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #F8F6EF; border-radius: 8px;">
              <span style="font-weight: 600;">Semibold text example</span>
              <code style="font-size: 0.75rem; color: #0C5257;">.fw-semibold</code>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #F8F6EF; border-radius: 8px;">
              <span style="font-weight: 700;">Bold text example</span>
              <code style="font-size: 0.75rem; color: #0C5257;">.font-weight-bold</code>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  `,
};

// ============================================
// TEXT STYLES
// ============================================
export const TextStyles = {
  render: () => `
    <div style="padding: 1rem; max-width: 900px; background: #F8F6EF; min-height: 100vh;">
      ${heroSection(
        'Text Styles',
        'Utilitários de texto para alinhamento, decoração, transformação e comportamento. Aplique conforme a necessidade do layout.'
      )}
      
      <div style="padding: 0 1rem; display: flex; flex-direction: column; gap: 1.5rem;">
        
        ${card('Alinhamento', '↔️', '#0C5257', `
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="background: #F8F6EF; padding: 1rem; border-radius: 8px; text-align: start;">
              <code style="float: right; font-size: 0.75rem; color: #6c757d;">.text-start</code>
              Alinhado à esquerda
            </div>
            <div style="background: #F8F6EF; padding: 1rem; border-radius: 8px; text-align: center;">
              <code style="font-size: 0.75rem; color: #6c757d;">.text-center</code><br>
              Centralizado
            </div>
            <div style="background: #F8F6EF; padding: 1rem; border-radius: 8px; text-align: end;">
              <code style="float: left; font-size: 0.75rem; color: #6c757d;">.text-end</code>
              Alinhado à direita
            </div>
          </div>
        `)}
        
        ${card('Decoração', '✨', '#FAB84A', `
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F8F6EF; padding: 1rem; border-radius: 8px;">
              <span style="text-decoration: underline;">Texto sublinhado</span>
              <code style="font-size: 0.75rem; color: #6c757d;">.text-decoration-underline</code>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F8F6EF; padding: 1rem; border-radius: 8px;">
              <span style="text-decoration: line-through;">Texto riscado</span>
              <code style="font-size: 0.75rem; color: #6c757d;">.text-decoration-line-through</code>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F8F6EF; padding: 1rem; border-radius: 8px;">
              <a href="#" style="text-decoration: none; color: #0C5257;">Link sem sublinhado</a>
              <code style="font-size: 0.75rem; color: #6c757d;">.text-decoration-none</code>
            </div>
          </div>
        `)}
        
        ${card('Transformação', '🔄', '#E9934C', `
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F8F6EF; padding: 1rem; border-radius: 8px;">
              <span style="text-transform: lowercase;">TEXTO EM MINÚSCULAS</span>
              <code style="font-size: 0.75rem; color: #6c757d;">.text-lowercase</code>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F8F6EF; padding: 1rem; border-radius: 8px;">
              <span style="text-transform: uppercase;">texto em maiúsculas</span>
              <code style="font-size: 0.75rem; color: #6c757d;">.text-uppercase</code>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; background: #F8F6EF; padding: 1rem; border-radius: 8px;">
              <span style="text-transform: capitalize;">primeira letra maiúscula</span>
              <code style="font-size: 0.75rem; color: #6c757d;">.text-capitalize</code>
            </div>
          </div>
        `)}
        
        ${card('Truncamento', '✂️', '#DF2B3C', `
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div style="background: #F8F6EF; padding: 1rem; border-radius: 8px;">
              <code style="font-size: 0.75rem; color: #6c757d; display: block; margin-bottom: 0.5rem;">.text-truncate</code>
              <div style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 300px;
                background: white;
                padding: 0.5rem;
                border-radius: 4px;
              ">
                Este é um texto muito longo que será truncado com reticências quando ultrapassar o limite do container
              </div>
            </div>
          </div>
        `)}
        
      </div>
    </div>
  `,
};

// ============================================
// LINE HEIGHT
// ============================================
export const LineHeight = {
  render: () => `
    <div style="padding: 1rem; max-width: 900px; background: #F8F6EF; min-height: 100vh;">
      ${heroSection(
        'Line Height',
        'Espaçamento entre linhas para melhorar a legibilidade. Textos mais longos precisam de mais espaço.'
      )}
      
      <div style="padding: 0 1rem; display: flex; flex-direction: column; gap: 1.5rem;">
        
        <div style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        ">
          
          <!-- LH 1 -->
          <div style="
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span style="
                background: #DF2B3C;
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 600;
              ">Line Height 1</span>
              <code style="font-size: 0.75rem; color: #6c757d;">.lh-1</code>
            </div>
            <p style="
              line-height: 1;
              color: #225054;
              background: #F8F6EF;
              padding: 1rem;
              border-radius: 8px;
              margin: 0;
            ">
              Texto com line-height 1. Linhas ficam muito próximas. Use apenas para títulos de uma linha.
            </p>
          </div>
          
          <!-- LH SM -->
          <div style="
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span style="
                background: #E9934C;
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 600;
              ">Line Height SM</span>
              <code style="font-size: 0.75rem; color: #6c757d;">.lh-sm</code>
            </div>
            <p style="
              line-height: 1.25;
              color: #225054;
              background: #F8F6EF;
              padding: 1rem;
              border-radius: 8px;
              margin: 0;
            ">
              Texto com line-height 1.25. Compacto mas ainda legível. Bom para UI elements.
            </p>
          </div>
          
          <!-- LH Base -->
          <div style="
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
            border: 2px solid #FAB84A;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span style="
                background: #FAB84A;
                color: #225054;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 600;
              ">Line Height Base ⭐</span>
              <code style="font-size: 0.75rem; color: #6c757d;">.lh-base</code>
            </div>
            <p style="
              line-height: 1.5;
              color: #225054;
              background: #F8F6EF;
              padding: 1rem;
              border-radius: 8px;
              margin: 0;
            ">
              Texto com line-height 1.5. Padrão recomendado para parágrafos. Boa legibilidade.
            </p>
          </div>
          
          <!-- LH LG -->
          <div style="
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span style="
                background: #0C5257;
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 600;
              ">Line Height LG</span>
              <code style="font-size: 0.75rem; color: #6c757d;">.lh-lg</code>
            </div>
            <p style="
              line-height: 2;
              color: #225054;
              background: #F8F6EF;
              padding: 1rem;
              border-radius: 8px;
              margin: 0;
            ">
              Texto com line-height 2. Muito espaçado. Ideal para textos que precisam de muita respiração.
            </p>
          </div>
          
        </div>
        
      </div>
    </div>
  `,
};

// ============================================
// INTERACTIVE DEMO
// ============================================
export const Interactive = {
  render: () => {
    const containerId = 'typography-interactive-' + Math.random().toString(36).substr(2, 9);
    
    return `
      <div style="padding: 1rem; max-width: 900px; background: #F8F6EF; min-height: 100vh;">
        ${heroSection(
          'Demo Interativo',
          'Experimente diferentes combinações tipográficas em tempo real. Ajuste os controles para ver como afetam a apresentação do texto.'
        )}
        
        <div style="padding: 0 1rem;">
          
          <!-- Controles -->
          <div style="
            background: white;
            border-radius: 16px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
          ">
            <div style="
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin-bottom: 1rem;
              padding-bottom: 0.75rem;
              border-bottom: 2px solid #FAB84A;
            ">
              <span style="font-size: 1.25rem;">🎛️</span>
              <h3 style="margin: 0; color: #225054;">Controles</h3>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              <div>
                <label style="display: block; font-weight: 600; color: #225054; margin-bottom: 0.5rem;">
                  Tamanho Base
                </label>
                <select 
                  class="custom-select" 
                  onchange="document.getElementById('demoContent-${containerId}').style.fontSize = this.value;"
                  style="border-color: #E0DDD4;"
                >
                  <option value="14px">Pequeno (14px)</option>
                  <option value="16px" selected>Padrão (16px)</option>
                  <option value="18px">Grande (18px)</option>
                  <option value="20px">Extra Grande (20px)</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; font-weight: 600; color: #225054; margin-bottom: 0.5rem;">
                  Peso da Fonte
                </label>
                <select 
                  class="custom-select" 
                  onchange="document.getElementById('demoContent-${containerId}').style.fontWeight = this.value;"
                  style="border-color: #E0DDD4;"
                >
                  <option value="300">Light (300)</option>
                  <option value="400" selected>Regular (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semibold (600)</option>
                  <option value="700">Bold (700)</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; font-weight: 600; color: #225054; margin-bottom: 0.5rem;">
                  Line Height
                </label>
                <select 
                  class="custom-select" 
                  onchange="document.getElementById('demoContent-${containerId}').style.lineHeight = this.value;"
                  style="border-color: #E0DDD4;"
                >
                  <option value="1">Compacto (1)</option>
                  <option value="1.25">Pequeno (1.25)</option>
                  <option value="1.5" selected>Padrão (1.5)</option>
                  <option value="1.75">Grande (1.75)</option>
                  <option value="2">Espaçado (2)</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Preview -->
          <div id="demoContent-${containerId}" style="
            background: white;
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 2px 12px rgba(12, 82, 87, 0.08);
            transition: all 0.3s ease;
          ">
            <h1 style="color: #0C5257; margin-bottom: 0.5rem;">Plataforma Educacross</h1>
            <p style="color: #FAB84A; font-weight: 600; margin-bottom: 1.5rem;">Aprender nunca foi tão divertido! 🦉</p>
            
            <h2 style="color: #225054; margin-bottom: 1rem;">Nossa Missão</h2>
            <p style="color: #6c757d; margin-bottom: 1.5rem;">
              Transformar a educação através de jogos interativos e experiências de aprendizado personalizadas. 
              Com a Belinha, nossa coruja mascote, guiamos crianças em uma jornada de descobertas.
            </p>
            
            <h3 style="color: #225054; margin-bottom: 0.75rem;">Como Funciona</h3>
            <ul style="color: #6c757d; margin-bottom: 1.5rem; padding-left: 1.5rem;">
              <li>Jogos educativos gamificados</li>
              <li>Acompanhamento de progresso em tempo real</li>
              <li>Conteúdo adaptativo por idade</li>
              <li>Relatórios detalhados para pais e educadores</li>
            </ul>
            
            <div style="
              background: linear-gradient(135deg, rgba(250, 184, 74, 0.1), rgba(233, 147, 76, 0.05));
              border-radius: 12px;
              padding: 1rem;
              display: flex;
              align-items: center;
              gap: 1rem;
            ">
              <img src="/vuexy/img/educacross/belinha.svg" alt="Belinha" style="width: 48px; height: auto;" />
              <p style="color: #225054; margin: 0; font-size: 0.9375rem;">
                <strong>Dica:</strong> Experimente diferentes configurações acima para ver como a tipografia afeta a leitura!
              </p>
            </div>
          </div>
          
        </div>
      </div>
    `;
  },
};
