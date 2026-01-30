export default {
  title: 'Foundations/Typography',
  parameters: {
    previewTabs: {
      canvas: { hidden: false },
    },
  },
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
