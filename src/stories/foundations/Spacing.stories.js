export default {
  title: 'Foundations/Spacing',
  parameters: {
    previewTabs: {
      canvas: { hidden: false },
    },
  },
};

const spacingScale = [
  { name: '0', value: '0', rem: '0rem', px: '0px' },
  { name: '1', value: '0.25rem', rem: '0.25rem', px: '4px' },
  { name: '2', value: '0.5rem', rem: '0.5rem', px: '8px' },
  { name: '3', value: '1rem', rem: '1rem', px: '16px' },
  { name: '4', value: '1.5rem', rem: '1.5rem', px: '24px' },
  { name: '5', value: '3rem', rem: '3rem', px: '48px' },
];

export const SpacingScale = {
  render: () => `
    <div style="padding: 2rem; max-width: 900px;">
      <h1 style="margin-bottom: 0.5rem;">Spacing</h1>
      <p style="color: #6c757d; margin-bottom: 3rem;">
        Sistema de espaçamento do Bootstrap/Vuexy com escala consistente.
      </p>
      
      <h2 style="margin-bottom: 1.5rem;">Escala de Espaçamento</h2>
      
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${spacingScale.map(s => `
          <div style="
            display: flex;
            align-items: center;
            background: white;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 1rem;
          ">
            <div style="width: 100px; flex-shrink: 0;">
              <strong>${s.name}</strong>
            </div>
            <div style="flex: 1; display: flex; align-items: center; gap: 2rem;">
              <div style="background: #5f61e6; height: 40px; width: ${s.value}; border-radius: 4px;"></div>
              <div>
                <div><code>${s.rem}</code></div>
                <div style="font-size: 0.875rem; color: #6c757d;">${s.px}</div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div style="background: #e7f3ff; border-left: 4px solid #2196f3; padding: 1rem; margin-top: 2rem; border-radius: 4px;">
        <strong>💡 Nota:</strong> Bootstrap também suporta valores <code>auto</code> para margin.
      </div>
    </div>
  `,
};

export const MarginUtilities = {
  render: () => `
    <div style="padding: 2rem; max-width: 900px;">
      <h2 style="margin-bottom: 2rem;">Margin Utilities</h2>
      
      <div style="display: grid; gap: 2rem;">
        <!-- All sides -->
        <div>
          <h3 style="margin-bottom: 1rem;">All Sides</h3>
          <div style="background: #f8f9fa; padding: 2rem; border-radius: 8px;">
            <div style="background: white; border: 2px dashed #5f61e6;">
              <div class="m-3" style="background: #e3f2fd; padding: 1rem; border: 1px solid #2196f3;">
                .m-3 (margin: 1rem all sides)
              </div>
            </div>
          </div>
          <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.875rem; color: #6c757d;">
            .m-{0-5} applies margin to all sides
          </div>
        </div>
        
        <!-- Specific sides -->
        <div>
          <h3 style="margin-bottom: 1rem;">Specific Sides</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
              <div class="mt-3" style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">
                .mt-3
              </div>
              <div style="margin-top: 0.25rem; font-size: 0.75rem; color: #6c757d;">
                margin-top
              </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
              <div class="mb-3" style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">
                .mb-3
              </div>
              <div style="margin-top: 0.25rem; font-size: 0.75rem; color: #6c757d;">
                margin-bottom
              </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
              <div class="ms-3" style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">
                .ms-3
              </div>
              <div style="margin-top: 0.25rem; font-size: 0.75rem; color: #6c757d;">
                margin-start (left)
              </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
              <div class="me-3" style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">
                .me-3
              </div>
              <div style="margin-top: 0.25rem; font-size: 0.75rem; color: #6c757d;">
                margin-end (right)
              </div>
            </div>
          </div>
        </div>
        
        <!-- Horizontal & Vertical -->
        <div>
          <h3 style="margin-bottom: 1rem;">Horizontal & Vertical</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
              <div class="mx-3" style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">
                .mx-3
              </div>
              <div style="margin-top: 0.25rem; font-size: 0.75rem; color: #6c757d;">
                margin left & right
              </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
              <div class="my-3" style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">
                .my-3
              </div>
              <div style="margin-top: 0.25rem; font-size: 0.75rem; color: #6c757d;">
                margin top & bottom
              </div>
            </div>
          </div>
        </div>
        
        <!-- Auto -->
        <div>
          <h3 style="margin-bottom: 1rem;">Auto Centering</h3>
          <div style="background: #f8f9fa; padding: 2rem; border-radius: 8px;">
            <div class="mx-auto" style="background: #e3f2fd; padding: 1rem; border: 1px solid #2196f3; max-width: 300px;">
              .mx-auto (centered)
            </div>
          </div>
          <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.875rem; color: #6c757d;">
            .mx-auto centers block elements horizontally
          </div>
        </div>
      </div>
    </div>
  `,
};

export const PaddingUtilities = {
  render: () => `
    <div style="padding: 2rem; max-width: 900px;">
      <h2 style="margin-bottom: 2rem;">Padding Utilities</h2>
      
      <div style="display: grid; gap: 2rem;">
        <!-- All sides -->
        <div>
          <h3 style="margin-bottom: 1rem;">All Sides</h3>
          <div style="background: #f8f9fa; padding: 2rem; border-radius: 8px; display: inline-block;">
            <div class="p-3" style="background: #e3f2fd; border: 1px solid #2196f3;">
              .p-3 (padding: 1rem all sides)
            </div>
          </div>
          <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.875rem; color: #6c757d;">
            .p-{0-5} applies padding to all sides
          </div>
        </div>
        
        <!-- Specific sides -->
        <div>
          <h3 style="margin-bottom: 1rem;">Specific Sides</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
            <div style="background: #f8f9fa; border-radius: 8px; overflow: hidden;">
              <div class="pt-3" style="background: #e3f2fd; border: 1px solid #2196f3;">
                .pt-3
              </div>
              <div style="padding: 0.5rem; font-size: 0.75rem; color: #6c757d;">
                padding-top
              </div>
            </div>
            
            <div style="background: #f8f9fa; border-radius: 8px; overflow: hidden;">
              <div class="pb-3" style="background: #e3f2fd; border: 1px solid #2196f3;">
                .pb-3
              </div>
              <div style="padding: 0.5rem; font-size: 0.75rem; color: #6c757d;">
                padding-bottom
              </div>
            </div>
            
            <div style="background: #f8f9fa; border-radius: 8px; overflow: hidden;">
              <div class="ps-3" style="background: #e3f2fd; border: 1px solid #2196f3;">
                .ps-3
              </div>
              <div style="padding: 0.5rem; font-size: 0.75rem; color: #6c757d;">
                padding-start (left)
              </div>
            </div>
            
            <div style="background: #f8f9fa; border-radius: 8px; overflow: hidden;">
              <div class="pe-3" style="background: #e3f2fd; border: 1px solid #2196f3;">
                .pe-3
              </div>
              <div style="padding: 0.5rem; font-size: 0.75rem; color: #6c757d;">
                padding-end (right)
              </div>
            </div>
          </div>
        </div>
        
        <!-- Horizontal & Vertical -->
        <div>
          <h3 style="margin-bottom: 1rem;">Horizontal & Vertical</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: #f8f9fa; border-radius: 8px; overflow: hidden;">
              <div class="px-3" style="background: #e3f2fd; border: 1px solid #2196f3;">
                .px-3
              </div>
              <div style="padding: 0.5rem; font-size: 0.75rem; color: #6c757d;">
                padding left & right
              </div>
            </div>
            
            <div style="background: #f8f9fa; border-radius: 8px; overflow: hidden;">
              <div class="py-3" style="background: #e3f2fd; border: 1px solid #2196f3;">
                .py-3
              </div>
              <div style="padding: 0.5rem; font-size: 0.75rem; color: #6c757d;">
                padding top & bottom
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const GapUtilities = {
  render: () => `
    <div style="padding: 2rem; max-width: 900px;">
      <h2 style="margin-bottom: 2rem;">Gap Utilities (Flexbox & Grid)</h2>
      
      <div style="display: grid; gap: 2rem;">
        <!-- Gap for flex -->
        <div>
          <h3 style="margin-bottom: 1rem;">Flexbox with Gap</h3>
          <div style="background: #f8f9fa; padding: 1.5rem; border-radius: 8px;">
            <div class="d-flex gap-3">
              <div style="background: #e3f2fd; padding: 1rem; border: 1px solid #2196f3; flex: 1;">Item 1</div>
              <div style="background: #e3f2fd; padding: 1rem; border: 1px solid #2196f3; flex: 1;">Item 2</div>
              <div style="background: #e3f2fd; padding: 1rem; border: 1px solid #2196f3; flex: 1;">Item 3</div>
            </div>
          </div>
          <div style="margin-top: 0.5rem; font-family: monospace; font-size: 0.875rem; color: #6c757d;">
            .d-flex .gap-3
          </div>
        </div>
        
        <!-- Gap sizes -->
        <div>
          <h3 style="margin-bottom: 1rem;">Gap Sizes</h3>
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${[0, 1, 2, 3, 4, 5].map(size => `
              <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
                <div class="d-flex gap-${size}">
                  <div style="background: #5f61e6; color: white; padding: 0.5rem 1rem; border-radius: 4px;">A</div>
                  <div style="background: #5f61e6; color: white; padding: 0.5rem 1rem; border-radius: 4px;">B</div>
                  <div style="background: #5f61e6; color: white; padding: 0.5rem 1rem; border-radius: 4px;">C</div>
                </div>
                <div style="margin-top: 0.5rem; font-size: 0.75rem; color: #6c757d;">
                  .gap-${size} (${spacingScale.find(s => s.name === size.toString())?.rem || 'auto'})
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Row & Column gap -->
        <div>
          <h3 style="margin-bottom: 1rem;">Row & Column Gap</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
              <div class="d-flex flex-wrap row-gap-2 column-gap-3" style="max-width: 200px;">
                <div style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">A</div>
                <div style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">B</div>
                <div style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">C</div>
                <div style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">D</div>
              </div>
              <div style="margin-top: 0.5rem; font-size: 0.75rem; color: #6c757d;">
                .row-gap-2 .column-gap-3
              </div>
            </div>
            
            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px;">
              <div class="d-grid gap-2" style="grid-template-columns: 1fr 1fr;">
                <div style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">A</div>
                <div style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">B</div>
                <div style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">C</div>
                <div style="background: #e3f2fd; padding: 0.5rem; border: 1px solid #2196f3;">D</div>
              </div>
              <div style="margin-top: 0.5rem; font-size: 0.75rem; color: #6c757d;">
                .d-grid .gap-2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
};

export const UsageExamples = {
  render: () => `
    <div style="padding: 2rem; max-width: 900px;">
      <h2 style="margin-bottom: 2rem;">Common Usage Examples</h2>
      
      <div style="display: flex; flex-direction: column; gap: 3rem;">
        <!-- Card with spacing -->
        <div>
          <h3 style="margin-bottom: 1rem;">Card Component</h3>
          <div class="card" style="max-width: 400px;">
            <div class="card-body p-4">
              <h5 class="card-title mb-3">Card Title</h5>
              <p class="card-text mb-4">
                This card uses .p-4 for padding and .mb-3, .mb-4 for spacing between elements.
              </p>
              <button class="btn btn-primary">Action</button>
            </div>
          </div>
          <div style="margin-top: 1rem; background: #f8f9fa; padding: 1rem; border-radius: 4px; font-family: monospace; font-size: 0.875rem;">
            .p-4 (body padding)<br>
            .mb-3 (title margin)<br>
            .mb-4 (text margin)
          </div>
        </div>
        
        <!-- Button group -->
        <div>
          <h3 style="margin-bottom: 1rem;">Button Group</h3>
          <div class="d-flex gap-2">
            <button class="btn btn-primary">Save</button>
            <button class="btn btn-secondary">Cancel</button>
            <button class="btn btn-outline-danger">Delete</button>
          </div>
          <div style="margin-top: 1rem; background: #f8f9fa; padding: 1rem; border-radius: 4px; font-family: monospace; font-size: 0.875rem;">
            .d-flex .gap-2
          </div>
        </div>
        
        <!-- Form spacing -->
        <div>
          <h3 style="margin-bottom: 1rem;">Form with Proper Spacing</h3>
          <form style="max-width: 400px;">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" placeholder="name@example.com">
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control">
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="check1">
                <label class="form-check-label" for="check1">
                  Remember me
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
          <div style="margin-top: 1rem; background: #f8f9fa; padding: 1rem; border-radius: 4px; font-family: monospace; font-size: 0.875rem;">
            .mb-3 between form groups
          </div>
        </div>
        
        <!-- Section spacing -->
        <div>
          <h3 style="margin-bottom: 1rem;">Page Sections</h3>
          <div>
            <section class="mb-5">
              <h2 class="mb-3">Section 1</h2>
              <p class="mb-0">Content for section 1...</p>
            </section>
            
            <section class="mb-5">
              <h2 class="mb-3">Section 2</h2>
              <p class="mb-0">Content for section 2...</p>
            </section>
          </div>
          <div style="margin-top: 1rem; background: #f8f9fa; padding: 1rem; border-radius: 4px; font-family: monospace; font-size: 0.875rem;">
            .mb-5 between sections<br>
            .mb-3 for section headings
          </div>
        </div>
      </div>
    </div>
  `,
};

export const Interactive = {
  render: () => `
    <div style="padding: 2rem; max-width: 900px;">
      <h2 style="margin-bottom: 2rem;">📏 Interactive Spacing Demo</h2>
      
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title mb-3">Adjust Spacing</h5>
          
          <div class="mb-3">
            <label class="form-label">Padding: <strong id="padding-value">3</strong></label>
            <input type="range" class="form-range" min="0" max="5" value="3" 
                   oninput="
                     document.getElementById('demo-box').className = 'bg-primary text-white rounded p-' + this.value;
                     document.getElementById('padding-value').textContent = this.value;
                     document.getElementById('padding-code').textContent = '.p-' + this.value;
                   ">
          </div>
          
          <div class="mb-3">
            <label class="form-label">Margin: <strong id="margin-value">3</strong></label>
            <input type="range" class="form-range" min="0" max="5" value="3" 
                   oninput="
                     document.getElementById('demo-box').className = 'bg-primary text-white rounded p-3 m-' + this.value;
                     document.getElementById('margin-value').textContent = this.value;
                     document.getElementById('margin-code').textContent = '.m-' + this.value;
                   ">
          </div>
        </div>
      </div>
      
      <div style="background: #f8f9fa; padding: 2rem; border-radius: 8px;">
        <div id="demo-box" class="bg-primary text-white rounded p-3">
          <strong>Demo Box</strong>
          <p class="mb-0">Adjust the sliders above to see spacing changes in real-time</p>
        </div>
      </div>
      
      <div class="alert alert-info mt-4">
        <strong>Current Classes:</strong>
        <code id="padding-code">.p-3</code>
        <code id="margin-code" class="ms-2">.m-3</code>
      </div>
      
      <div class="mt-4">
        <h5>Quick Examples</h5>
        <div class="d-flex gap-3 flex-wrap">
          <button class="btn btn-sm btn-outline-primary" onclick="
            document.getElementById('demo-box').className = 'bg-primary text-white rounded p-1';
            document.querySelector('input[type=range]').value = 1;
            document.getElementById('padding-value').textContent = '1';
            document.getElementById('padding-code').textContent = '.p-1';
          ">Small Padding</button>
          <button class="btn btn-sm btn-outline-primary" onclick="
            document.getElementById('demo-box').className = 'bg-primary text-white rounded p-5';
            document.querySelector('input[type=range]').value = 5;
            document.getElementById('padding-value').textContent = '5';
            document.getElementById('padding-code').textContent = '.p-5';
          ">Large Padding</button>
          <button class="btn btn-sm btn-outline-secondary" onclick="
            document.getElementById('demo-box').className = 'bg-primary text-white rounded p-3 m-0';
            document.querySelectorAll('input[type=range]')[0].value = 3;
            document.querySelectorAll('input[type=range]')[1].value = 0;
            document.getElementById('padding-value').textContent = '3';
            document.getElementById('margin-value').textContent = '0';
            document.getElementById('padding-code').textContent = '.p-3';
            document.getElementById('margin-code').textContent = '.m-0';
          ">Reset</button>
        </div>
      </div>
    </div>
  `,
};
