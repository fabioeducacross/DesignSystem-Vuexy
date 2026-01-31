export default {
  title: 'Foundations/Colors',
  parameters: {
    previewTabs: {
      canvas: { hidden: false },
    },
  },
};

const colors = {
  primary: {
    name: 'Primary',
    hex: '#5f61e6',
    usage: 'Ações principais, links, botões CTA',
  },
  secondary: {
    name: 'Secondary',
    hex: '#8592a3',
    usage: 'Ações secundárias, elementos auxiliares',
  },
  success: {
    name: 'Success',
    hex: '#56ca00',
    usage: 'Mensagens de sucesso, status positivo',
  },
  danger: {
    name: 'Danger',
    hex: '#ff4c51',
    usage: 'Erros, alertas críticos, ações destrutivas',
  },
  warning: {
    name: 'Warning',
    hex: '#ffb400',
    usage: 'Avisos, atenção necessária',
  },
  info: {
    name: 'Info',
    hex: '#16b1ff',
    usage: 'Informações, dicas, ajuda',
  },
  dark: {
    name: 'Dark',
    hex: '#4b4b4b',
    usage: 'Texto principal, elementos escuros',
  },
  light: {
    name: 'Light',
    hex: '#f8f8f8',
    usage: 'Backgrounds claros, separadores',
  },
};

const createColorSwatch = (color, details) => `
  <div style="
    border: 1px solid #dee2e6;
    border-radius: 8px;
    overflow: hidden;
    background: white;
  ">
    <div style="
      background: ${details.hex};
      height: 120px;
      position: relative;
    ">
      <div style="
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 0.75rem;
        background: rgba(0,0,0,0.5);
        color: white;
        font-weight: 600;
      ">
        ${details.hex}
      </div>
    </div>
    <div style="padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem; font-weight: 600;">
        ${details.name}
      </h4>
      <p style="margin: 0; font-size: 0.875rem; color: #6c757d;">
        ${details.usage}
      </p>
      <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <code style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: #f8f8f8; border-radius: 4px;">
          .text-${color}
        </code>
        <code style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: #f8f8f8; border-radius: 4px;">
          .bg-${color}
        </code>
        <code style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: #f8f8f8; border-radius: 4px;">
          .btn-${color}
        </code>
      </div>
    </div>
  </div>
`;

export const ThemeColors = {
  render: () => `
    <div style="padding: 2rem;">
      <h1 style="margin-bottom: 0.5rem;">Theme Colors</h1>
      <p style="color: #6c757d; margin-bottom: 2rem;">
        Paleta de cores do tema Vuexy e seus usos recomendados.
      </p>
      
      <div style="
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
      ">
        ${Object.entries(colors).map(([key, details]) => 
          createColorSwatch(key, details)
        ).join('')}
      </div>
    </div>
  `,
};

export const GrayScale = {
  render: () => {
    const grays = [
      { name: 'Gray 100', hex: '#f8f9fa', class: 'bg-gray-100' },
      { name: 'Gray 200', hex: '#e9ecef', class: 'bg-gray-200' },
      { name: 'Gray 300', hex: '#dee2e6', class: 'bg-gray-300' },
      { name: 'Gray 400', hex: '#ced4da', class: 'bg-gray-400' },
      { name: 'Gray 500', hex: '#adb5bd', class: 'bg-gray-500' },
      { name: 'Gray 600', hex: '#6c757d', class: 'bg-gray-600' },
      { name: 'Gray 700', hex: '#495057', class: 'bg-gray-700' },
      { name: 'Gray 800', hex: '#343a40', class: 'bg-gray-800' },
      { name: 'Gray 900', hex: '#212529', class: 'bg-gray-900' },
    ];
    
    return `
      <div style="padding: 2rem;">
        <h2 style="margin-bottom: 0.5rem;">Gray Scale</h2>
        <p style="color: #6c757d; margin-bottom: 2rem;">
          Escala de cinzas para textos, bordas e backgrounds.
        </p>
        
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${grays.map(gray => `
            <div style="
              display: flex;
              align-items: center;
              background: white;
              border: 1px solid #dee2e6;
              border-radius: 4px;
              overflow: hidden;
            ">
              <div style="
                background: ${gray.hex};
                width: 100px;
                height: 60px;
                flex-shrink: 0;
              "></div>
              <div style="padding: 1rem; flex: 1;">
                <strong>${gray.name}</strong>
                <div style="display: flex; gap: 1rem; margin-top: 0.25rem; font-size: 0.875rem; color: #6c757d;">
                  <span>${gray.hex}</span>
                  <code style="background: #f8f8f8; padding: 0.125rem 0.5rem; border-radius: 3px;">
                    ${gray.class}
                  </code>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },
};

export const LabelColors = {
  render: () => {
    const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];
    
    return `
      <div style="padding: 2rem;">
        <h2 style="margin-bottom: 0.5rem;">Label Colors</h2>
        <p style="color: #6c757d; margin-bottom: 2rem;">
          Variantes de badges/labels com background suave.
        </p>
        
        <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
          ${variants.map(v => `
            <div style="text-align: center;">
              <span class="badge bg-label-${v}" style="font-size: 0.875rem; padding: 0.5rem 1rem;">
                ${v.charAt(0).toUpperCase() + v.slice(1)}
              </span>
              <div style="margin-top: 0.5rem; font-size: 0.75rem; color: #6c757d;">
                .bg-label-${v}
              </div>
            </div>
          `).join('')}
        </div>
        
        <h3 style="margin: 2rem 0 1rem;">Usage Example</h3>
        <div style="background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="badge bg-label-success">Active</span>
            <span class="badge bg-label-warning">Pending</span>
            <span class="badge bg-label-danger">Rejected</span>
            <span class="badge bg-label-info">In Review</span>
          </div>
        </div>
      </div>
    `;
  },
};

export const UsageExamples = {
  render: () => `
    <div style="padding: 2rem; max-width: 900px;">
      <h2 style="margin-bottom: 2rem;">Usage Examples</h2>
      
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <!-- Buttons -->
        <div>
          <h3 style="margin-bottom: 1rem;">Buttons</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-success">Success</button>
            <button class="btn btn-danger">Danger</button>
            <button class="btn btn-warning">Warning</button>
            <button class="btn btn-info">Info</button>
          </div>
        </div>
        
        <!-- Alerts -->
        <div>
          <h3 style="margin-bottom: 1rem;">Alerts</h3>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            <div class="alert alert-primary mb-0">Primary alert message</div>
            <div class="alert alert-success mb-0">Success alert message</div>
            <div class="alert alert-danger mb-0">Danger alert message</div>
            <div class="alert alert-warning mb-0">Warning alert message</div>
          </div>
        </div>
        
        <!-- Text Colors -->
        <div>
          <h3 style="margin-bottom: 1rem;">Text Colors</h3>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <p class="text-primary mb-0">Primary text color</p>
            <p class="text-success mb-0">Success text color</p>
            <p class="text-danger mb-0">Danger text color</p>
            <p class="text-warning mb-0">Warning text color</p>
            <p class="text-info mb-0">Info text color</p>
            <p class="text-muted mb-0">Muted text color</p>
          </div>
        </div>
        
        <!-- Backgrounds -->
        <div>
          <h3 style="margin-bottom: 1rem;">Background Colors</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
            <div class="bg-primary text-white p-3 rounded">.bg-primary</div>
            <div class="bg-success text-white p-3 rounded">.bg-success</div>
            <div class="bg-danger text-white p-3 rounded">.bg-danger</div>
            <div class="bg-warning text-dark p-3 rounded">.bg-warning</div>
            <div class="bg-info text-white p-3 rounded">.bg-info</div>
            <div class="bg-light text-dark p-3 rounded border">.bg-light</div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const Interactive = {
  render: () => `
    <div style="padding: 2rem; max-width: 900px;">
      <h2 style="margin-bottom: 2rem;">🎨 Interactive Color Palette</h2>
      
      <div id="color-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
        ${Object.entries({
          primary: '#5f61e6',
          secondary: '#8592a3',
          success: '#56ca00',
          danger: '#ff4c51',
          warning: '#ffb400',
          info: '#16b1ff',
          dark: '#4b4b4b',
          light: '#f8f8f8'
        }).map(([name, hex]) => `
          <div style="border: 1px solid #dee2e6; border-radius: 8px; overflow: hidden; cursor: pointer; transition: transform 0.2s;"
               onmouseover="this.style.transform = 'scale(1.05)'"
               onmouseout="this.style.transform = 'scale(1)'"
               onclick="
                 navigator.clipboard.writeText('${hex}');
                 const toast = document.getElementById('color-toast');
                 const toastText = document.getElementById('toast-text');
                 toastText.textContent = '✅ Copied ${hex}';
                 toast.style.display = 'block';
                 setTimeout(() => toast.style.display = 'none', 2000);
               ">
            <div style="background: ${hex}; height: 120px; position: relative;">
              <div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 0.75rem; background: rgba(0,0,0,0.5); color: white; font-weight: 600;">
                ${hex}
              </div>
            </div>
            <div style="padding: 1rem; background: white;">
              <h5 style="margin: 0 0 0.5rem 0; font-size: 1rem; text-transform: capitalize;">${name}</h5>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <code style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: #f8f8f8; border-radius: 4px;">.text-${name}</code>
                <code style="font-size: 0.75rem; padding: 0.25rem 0.5rem; background: #f8f8f8; border-radius: 4px;">.bg-${name}</code>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div id="color-toast" style="position: fixed; top: 20px; right: 20px; display: none; z-index: 9999;">
        <div class="alert alert-success" style="box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          <i class="bx bx-check-circle me-2"></i>
          <span id="toast-text"></span>
        </div>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>💡 Tip:</strong> Click any color to copy its hex code to clipboard!
      </div>
    </div>
  `,
};
