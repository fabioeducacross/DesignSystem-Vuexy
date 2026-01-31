export default {
  title: 'Foundations/Typography',
  parameters: {
    previewTabs: {
      canvas: { hidden: false },
    },
  },
};

export const FontFamily = {
  render: () => `
    <div style="padding: 2rem; max-width: 800px;">
      <h2 style="margin-bottom: 2rem;">Font Family</h2>
      
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div style="padding: 1.5rem; background: #f8f7fa; border-radius: 8px; border-left: 4px solid #7367f0;">
          <div style="font-weight: 600; margin-bottom: 1rem; color: #2f2b3d;">
            Sans Serif (Padrão)
          </div>
          <code style="display: block; background: white; padding: 1rem; border-radius: 4px; margin-bottom: 1rem; overflow-x: auto; font-size: 0.875rem;">
--bs-font-sans-serif: "Public Sans", -apple-system, blinkmacsystemfont, "Segoe UI", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
          </code>
          <p style="font-size: 1.125rem; margin-bottom: 0.5rem;">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </p>
          <p style="font-size: 1.125rem; margin-bottom: 0.5rem;">
            abcdefghijklmnopqrstuvwxyz
          </p>
          <p style="font-size: 1.125rem; margin-bottom: 0.5rem;">
            0123456789 !@#$%&*()
          </p>
          <p style="margin-top: 1rem; color: #6c757d;">
            Public Sans é a fonte principal do Vuexy, usada para todo o conteúdo de UI. 
            É uma fonte sans-serif moderna, legível e otimizada para interfaces digitais.
          </p>
        </div>
        
        <div style="padding: 1.5rem; background: #f8f7fa; border-radius: 8px; border-left: 4px solid #6c757d;">
          <div style="font-weight: 600; margin-bottom: 1rem; color: #2f2b3d;">
            Monospace (Código)
          </div>
          <code style="display: block; background: white; padding: 1rem; border-radius: 4px; margin-bottom: 1rem; overflow-x: auto; font-size: 0.875rem;">
--bs-font-monospace: "SFMono-Regular", menlo, monaco, consolas, "Liberation Mono", "Courier New", monospace;
          </code>
          <p style="font-family: var(--bs-font-monospace); font-size: 1rem; margin-bottom: 0.5rem;">
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </p>
          <p style="font-family: var(--bs-font-monospace); font-size: 1rem; margin-bottom: 0.5rem;">
            abcdefghijklmnopqrstuvwxyz
          </p>
          <p style="font-family: var(--bs-font-monospace); font-size: 1rem; margin-bottom: 0.5rem;">
            0123456789 !@#$%&*()
          </p>
          <p style="margin-top: 1rem; color: #6c757d;">
            Fonte monospace usada para código, snippets e elementos técnicos.
            Cada caractere tem a mesma largura, facilitando a leitura de código.
          </p>
        </div>
        
        <div style="padding: 1.5rem; background: #e9e7fd; border-radius: 8px;">
          <h5 style="margin-bottom: 1rem; color: #2f2b3d;">📌 Uso no Código</h5>
          <div style="background: white; padding: 1rem; border-radius: 4px; font-family: var(--bs-font-monospace); font-size: 0.875rem;">
            <div style="color: #6c757d;">/* CSS */</div>
            <div style="color: #2f2b3d; margin-top: 0.5rem;">
              font-family: var(--bs-font-sans-serif);
            </div>
            <div style="color: #2f2b3d;">
              font-family: var(--bs-font-monospace);
            </div>
            
            <div style="color: #6c757d; margin-top: 1rem;">/* Classes Bootstrap */</div>
            <div style="color: #2f2b3d; margin-top: 0.5rem;">
              &lt;p class="font-monospace"&gt;Código&lt;/p&gt;
            </div>
          </div>
        </div>
        
        <div style="padding: 1.5rem; background: #ddf6e8; border-radius: 8px;">
          <h5 style="margin-bottom: 1rem; color: #2f2b3d;">✨ Pesos Disponíveis</h5>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div>
              <div style="font-weight: 300; font-size: 1.25rem;">Light (300)</div>
              <code style="font-size: 0.75rem; color: #6c757d;">font-weight: 300;</code>
            </div>
            <div>
              <div style="font-weight: 400; font-size: 1.25rem;">Regular (400)</div>
              <code style="font-size: 0.75rem; color: #6c757d;">font-weight: 400;</code>
            </div>
            <div>
              <div style="font-weight: 500; font-size: 1.25rem;">Medium (500)</div>
              <code style="font-size: 0.75rem; color: #6c757d;">font-weight: 500;</code>
            </div>
            <div>
              <div style="font-weight: 600; font-size: 1.25rem;">Semibold (600)</div>
              <code style="font-size: 0.75rem; color: #6c757d;">font-weight: 600;</code>
            </div>
            <div>
              <div style="font-weight: 700; font-size: 1.25rem;">Bold (700)</div>
              <code style="font-size: 0.75rem; color: #6c757d;">font-weight: 700;</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const Headings = {
  render: () => `
    <div style="padding: 2rem; max-width: 800px;">
      <h1 style="margin-bottom: 0.5rem;">Typography</h1>
      <p style="color: #6c757d; margin-bottom: 3rem;">
        Sistema tipográfico do Vuexy com hierarquia e escalas definidas.
      </p>
      
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #dee2e6; padding-bottom: 0.5rem; margin-bottom: 1rem;">
            <h1>Heading 1</h1>
            <code style="font-size: 0.875rem; color: #6c757d;">h1 / 2.5rem</code>
          </div>
          <p style="color: #6c757d;">Usado para títulos principais de página</p>
        </div>
        
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #dee2e6; padding-bottom: 0.5rem; margin-bottom: 1rem;">
            <h2>Heading 2</h2>
            <code style="font-size: 0.875rem; color: #6c757d;">h2 / 2rem</code>
          </div>
          <p style="color: #6c757d;">Seções principais dentro de uma página</p>
        </div>
        
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #dee2e6; padding-bottom: 0.5rem; margin-bottom: 1rem;">
            <h3>Heading 3</h3>
            <code style="font-size: 0.875rem; color: #6c757d;">h3 / 1.75rem</code>
          </div>
          <p style="color: #6c757d;">Subseções e grupos de conteúdo</p>
        </div>
        
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #dee2e6; padding-bottom: 0.5rem; margin-bottom: 1rem;">
            <h4>Heading 4</h4>
            <code style="font-size: 0.875rem; color: #6c757d;">h4 / 1.5rem</code>
          </div>
          <p style="color: #6c757d;">Títulos de cards e componentes</p>
        </div>
        
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #dee2e6; padding-bottom: 0.5rem; margin-bottom: 1rem;">
            <h5>Heading 5</h5>
            <code style="font-size: 0.875rem; color: #6c757d;">h5 / 1.25rem</code>
          </div>
          <p style="color: #6c757d;">Subtítulos e labels de seção</p>
        </div>
        
        <div>
          <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #dee2e6; padding-bottom: 0.5rem; margin-bottom: 1rem;">
            <h6>Heading 6</h6>
            <code style="font-size: 0.875rem; color: #6c757d;">h6 / 1rem</code>
          </div>
          <p style="color: #6c757d;">Títulos menores e auxiliares</p>
        </div>
      </div>
    </div>
  `,
};

export const BodyText = {
  render: () => `
    <div style="padding: 2rem; max-width: 800px;">
      <h2 style="margin-bottom: 2rem;">Body Text</h2>
      
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <div style="font-weight: 600; margin-bottom: 0.5rem;">
            Default (1rem / 16px)
            <code style="margin-left: 1rem; font-weight: normal; color: #6c757d;">.text-body</code>
          </div>
          <p style="line-height: 1.6;">
            Este é o texto padrão usado para parágrafos e conteúdo geral. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        
        <div>
          <div style="font-weight: 600; margin-bottom: 0.5rem;">
            Large (1.125rem / 18px)
            <code style="margin-left: 1rem; font-weight: normal; color: #6c757d;">.text-lg</code>
          </div>
          <p style="font-size: 1.125rem; line-height: 1.6;">
            Texto maior usado para destaque ou introduções.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        
        <div>
          <div style="font-weight: 600; margin-bottom: 0.5rem;">
            Small (0.875rem / 14px)
            <code style="margin-left: 1rem; font-weight: normal; color: #6c757d;">.text-sm / .small</code>
          </div>
          <p style="font-size: 0.875rem; line-height: 1.5;">
            Texto menor usado para notas, legendas e informações secundárias.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        
        <div>
          <div style="font-weight: 600; margin-bottom: 0.5rem;">
            Extra Small (0.75rem / 12px)
            <code style="margin-left: 1rem; font-weight: normal; color: #6c757d;">.text-xs</code>
          </div>
          <p style="font-size: 0.75rem; line-height: 1.4;">
            Texto muito pequeno para metadados, timestamps e informações auxiliares.
          </p>
        </div>
      </div>
    </div>
  `,
};

export const FontWeights = {
  render: () => `
    <div style="padding: 2rem; max-width: 800px;">
      <h2 style="margin-bottom: 2rem;">Font Weights</h2>
      
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: white; border: 1px solid #dee2e6; border-radius: 4px;">
          <span style="font-weight: 300; font-size: 1.125rem;">Light (300)</span>
          <code>.fw-light</code>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: white; border: 1px solid #dee2e6; border-radius: 4px;">
          <span style="font-weight: 400; font-size: 1.125rem;">Normal (400)</span>
          <code>.fw-normal</code>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: white; border: 1px solid #dee2e6; border-radius: 4px;">
          <span style="font-weight: 500; font-size: 1.125rem;">Medium (500)</span>
          <code>.fw-medium</code>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: white; border: 1px solid #dee2e6; border-radius: 4px;">
          <span style="font-weight: 600; font-size: 1.125rem;">Semibold (600)</span>
          <code>.fw-semibold</code>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: white; border: 1px solid #dee2e6; border-radius: 4px;">
          <span style="font-weight: 700; font-size: 1.125rem;">Bold (700)</span>
          <code>.fw-bold</code>
        </div>
      </div>
      
      <h3 style="margin: 3rem 0 1rem;">Usage Examples</h3>
      <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 1.5rem;">
        <p class="fw-normal">This is normal weight text with <strong>strong/bold</strong> emphasis.</p>
        <p class="fw-medium">This is medium weight text, good for slight emphasis.</p>
        <p class="fw-semibold">This is semibold text, used for headings and labels.</p>
      </div>
    </div>
  `,
};

export const TextStyles = {
  render: () => `
    <div style="padding: 2rem; max-width: 800px;">
      <h2 style="margin-bottom: 2rem;">Text Styles & Utilities</h2>
      
      <div style="display: grid; gap: 2rem;">
        <!-- Alignment -->
        <div>
          <h3 style="margin-bottom: 1rem;">Text Alignment</h3>
          <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <p class="text-start mb-0">.text-start - Aligned to start (left)</p>
            <p class="text-center mb-0">.text-center - Centered text</p>
            <p class="text-end mb-0">.text-end - Aligned to end (right)</p>
          </div>
        </div>
        
        <!-- Decoration -->
        <div>
          <h3 style="margin-bottom: 1rem;">Text Decoration</h3>
          <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <p class="text-decoration-underline mb-0">.text-decoration-underline</p>
            <p class="text-decoration-line-through mb-0">.text-decoration-line-through</p>
            <a href="#" class="text-decoration-none">.text-decoration-none (removes underline from links)</a>
          </div>
        </div>
        
        <!-- Transform -->
        <div>
          <h3 style="margin-bottom: 1rem;">Text Transform</h3>
          <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <p class="text-lowercase mb-0">.text-lowercase - TRANSFORMS TO LOWERCASE</p>
            <p class="text-uppercase mb-0">.text-uppercase - transforms to uppercase</p>
            <p class="text-capitalize mb-0">.text-capitalize - capitalizes each word</p>
          </div>
        </div>
        
        <!-- Wrapping -->
        <div>
          <h3 style="margin-bottom: 1rem;">Text Wrapping</h3>
          <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
            <p class="text-wrap mb-0" style="max-width: 200px; background: #f8f9fa; padding: 0.5rem;">
              .text-wrap - This long text will wrap to multiple lines
            </p>
            <p class="text-nowrap mb-0" style="max-width: 200px; background: #f8f9fa; padding: 0.5rem; overflow: hidden;">
              .text-nowrap - This long text will not wrap and will overflow
            </p>
            <p class="text-truncate mb-0" style="max-width: 200px; background: #f8f9fa; padding: 0.5rem;">
              .text-truncate - This long text will be truncated with ellipsis...
            </p>
          </div>
        </div>
        
        <!-- Muted -->
        <div>
          <h3 style="margin-bottom: 1rem;">Text Muted</h3>
          <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 1.5rem;">
            <p class="mb-2">This is regular text.</p>
            <p class="text-muted mb-0">.text-muted - This is muted/secondary text.</p>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const LineHeight = {
  render: () => `
    <div style="padding: 2rem; max-width: 800px;">
      <h2 style="margin-bottom: 2rem;">Line Height</h2>
      
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <div style="font-weight: 600; margin-bottom: 0.5rem;">
            Line Height 1 (1)
            <code style="margin-left: 1rem; font-weight: normal; color: #6c757d;">.lh-1</code>
          </div>
          <p style="line-height: 1; background: #f8f9fa; padding: 1rem;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore.
          </p>
        </div>
        
        <div>
          <div style="font-weight: 600; margin-bottom: 0.5rem;">
            Line Height SM (1.25)
            <code style="margin-left: 1rem; font-weight: normal; color: #6c757d;">.lh-sm</code>
          </div>
          <p style="line-height: 1.25; background: #f8f9fa; padding: 1rem;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore.
          </p>
        </div>
        
        <div>
          <div style="font-weight: 600; margin-bottom: 0.5rem;">
            Line Height Base (1.5 - Default)
            <code style="margin-left: 1rem; font-weight: normal; color: #6c757d;">.lh-base</code>
          </div>
          <p style="line-height: 1.5; background: #f8f9fa; padding: 1rem;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore.
          </p>
        </div>
        
        <div>
          <div style="font-weight: 600; margin-bottom: 0.5rem;">
            Line Height LG (2)
            <code style="margin-left: 1rem; font-weight: normal; color: #6c757d;">.lh-lg</code>
          </div>
          <p style="line-height: 2; background: #f8f9fa; padding: 1rem;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore.
          </p>
        </div>
      </div>
    </div>
  `,
};

// Interactive Demo
export const Interactive = () => {
  const containerId = 'typography-interactive-' + Math.random().toString(36).substr(2, 9);
  
  return `
    <div id="${containerId}" style="padding: 2rem; max-width: 800px;">
      <div class="alert alert-info mb-4">
        <i class="bx bx-info-circle me-2"></i>
        <strong>Interactive Demo:</strong> Adjust font scale using controls below.
      </div>
      
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">Font Scale Control</h5>
          <div class="mb-3">
            <label class="form-label">Base Font Size:</label>
            <select class="form-select" style="max-width: 200px;" onchange="document.getElementById('demoContent-${containerId}').style.fontSize = this.value;">
              <option value="14px">Small (14px)</option>
              <option value="16px" selected>Default (16px)</option>
              <option value="18px">Large (18px)</option>
              <option value="20px">Extra Large (20px)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div id="demoContent-${containerId}" class="card">
        <div class="card-body">
          <h1>Heading 1 Sample</h1>
          <h2>Heading 2 Sample</h2>
          <h3>Heading 3 Sample</h3>
          <p>This is a paragraph demonstrating body text. Notice how all typography scales proportionally when you change the base font size above.</p>
          <small class="text-muted">Small text example</small>
        </div>
      </div>
    </div>
  `;
};
