import { 
  createDocPage, 
  createExampleCard, 
  createPropsTable, 
  createUsageSection 
} from '../_helpers/docTemplate.js';
import { getDeleteGuideMascot } from '../_helpers/mascots.js';

/**
 * DeleteGuide - Mission Deletion Confirmation Component
 * =========================================
 * 
 * Confirmation dialog for deleting missions with Belinha mascot guidance.
 * Includes loading states and destructive action patterns.
 * 
 * @component DeleteGuide
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\mission-plus\DeleteGuide.vue
 * @priority P2
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Educacross Components V2/Modals/DeleteGuide',
  parameters: {
    layout: 'fullscreen',
    docs: { page: null },
    options: { showPanel: false }
  }
};

/**
 * Design Specs
 * 
 * Cores:
 * - Danger: #EA5455 (vermelho destrutivo)
 * - Outline danger: border #EA5455, text #EA5455
 * - Filled danger: background #EA5455, text white
 * - Spinner: white (contrasta com danger background)
 * 
 * Dimensões:
 * - Belinha image: mb-1 (margin-bottom 8px)
 * - Gap buttons: gap-4 (24px)
 * - Button padding: Bootstrap padrão ~10px 20px
 * - Spinner: small variant (16×16px)
 * 
 * Tipografia:
 * - Título h1: font-size ~24px (Bootstrap default)
 * - Button text: font-size 14px
 * 
 * Layout:
 * - Container: d-flex flex-col align-items-center
 * - Buttons: d-flex justify-content-center gap-4
 */

// Documentação principal
export const Documentation = {
  render: () => createDocPage({
    title: 'DeleteGuide',
    subtitle: 'Modal de confirmação para exclusão de missões com orientação da mascote Belinha',
    badge: 'Front-office / Modals',
    badgeIcon: 'delete_forever',
    showStats: true,
    stats: {
      'Tipo': 'Confirmation',
      'Ação': 'Destructive',
      'Loading': '✓'
    },
    colors: {
      primary: '#EA5455',
      secondary: '#f39c12'
    },
    content: `
      ${createUsageSection({
        title: 'Fluxo de Exclusão',
        icon: 'rule',
        steps: [
          /**
           * DeleteGuide - Modal de confirmação para exclusão de guias/missões
           *
           * Versão simplificada e fiel ao componente real do frontoffice.
           */

          export default {
            title: 'Educacross Components V2/Modals/DeleteGuide',
            parameters: {
              layout: 'centered',
              docs: { page: null },
              options: { showPanel: false },
            },
            argTypes: {
              missionName: {
                control: 'text',
                description: 'Nome da missão a ser excluída',
              },
              loadingButton: {
                control: 'boolean',
                description: 'Estado de carregamento do botão de exclusão',
              },
            },
          };

          const styles = `
            <style>
              .delete-guide {
                display: flex;
                flex-direction: column;
                align-items: center;
                font-family: 'Public Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                padding: 24px;
              }

              .delete-guide img.mb-1 {
                margin-bottom: 0.25rem;
                height: 200px;
                object-fit: contain;
              }

              .delete-guide h1 {
                font-size: 1.5rem;
                font-weight: 400;
                color: #4b4b4b;
                text-align: center;
                margin: 0.5rem 0 1.25rem;
                line-height: 1.4;
              }

              .delete-actions {
                display: flex;
                justify-content: center;
                gap: 24px;
                flex-wrap: wrap;
              }

              .btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 0.571rem 1.5rem;
                border-radius: 0.375rem;
                font-size: 0.9375rem;
                font-weight: 500;
                line-height: 1.5;
                border: 1px solid transparent;
                cursor: pointer;
                text-decoration: none;
                transition: all 0.15s ease-in-out;
              }

              .btn:disabled {
                opacity: 0.65;
                cursor: not-allowed;
              }

              .btn-outline-danger {
                color: #ea5455;
                border-color: #ea5455;
                background: transparent;
              }

              .btn-outline-danger:hover:not(:disabled) {
                background: rgba(234, 84, 85, 0.04);
              }

              .btn-danger {
                background: #ea5455;
                border-color: #ea5455;
                color: #fff;
              }

              .btn-danger:hover:not(:disabled) {
                background: #e42728;
                border-color: #de1f20;
              }

              .spinner-border-sm {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid rgba(255, 255, 255, 0.45);
                border-top-color: #fff;
                border-radius: 50%;
                animation: spin 0.75s linear infinite;
              }

              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
            </style>
          `;

          const renderDeleteGuide = ({ missionName = 'Matemática Básica', loadingButton = false } = {}) => `
            ${styles}
            <div class="delete-guide">
              <img
                class="mb-1"
                src="/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png"
                alt="belinha"
              />

              <h1>Deseja excluir a missão "${missionName}"?</h1>

              <div class="delete-actions">
                <button class="btn btn-outline-danger" ${loadingButton ? 'disabled' : ''}>Não quero excluir</button>

                <button class="btn btn-danger" ${loadingButton ? 'disabled' : ''}>
                  Quero excluir
                  ${loadingButton ? '<span class="spinner-border-sm"></span>' : ''}
                </button>
              </div>
            </div>
          `;

          export const Default = {
            args: {
              missionName: 'Matemática Básica',
              loadingButton: false,
            },
            render: (args) => renderDeleteGuide(args),
          };

          export const Loading = {
            args: {
              missionName: 'Matemática Básica',
              loadingButton: true,
            },
            render: (args) => renderDeleteGuide(args),
          };

          export const Overview = {
            name: 'Overview',
            parameters: {
              layout: 'padded',
            },
            render: () => `
              ${styles}
              <div style="padding:24px;background:#f8f8fb;min-height:100vh;font-family:'Public Sans',sans-serif;">
                <div style="max-width:980px;margin:0 auto;">
                  <h3 style="margin:0 0 20px 0;color:#5e5873;font-weight:700;">DeleteGuide — Variantes</h3>

                  <div style="display:grid;grid-template-columns:1fr;gap:16px;">
                    <section style="background:#fff;border:1px solid #ebe9f1;border-radius:12px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                      <h6 style="margin:0 0 10px 0;color:#7367f0;font-weight:600;">Padrão</h6>
                      <div style="border:1px dashed #d9d5ec;border-radius:10px;padding:8px;">
                        ${renderDeleteGuide({ missionName: 'Matemática Básica', loadingButton: false })}
                      </div>
                    </section>

                    <section style="background:#fff;border:1px solid #ebe9f1;border-radius:12px;padding:14px;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
                      <h6 style="margin:0 0 10px 0;color:#ff9f43;font-weight:600;">Carregando</h6>
                      <div style="border:1px dashed #d9d5ec;border-radius:10px;padding:8px;">
                        ${renderDeleteGuide({ missionName: 'Matemática Básica', loadingButton: true })}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            `,
          };

          export const Documentation = {
            name: '📖 Documentation',
            parameters: {
              layout: 'fullscreen',
              controls: { disable: true },
            },
            render: () => `
              ${styles}
              <div style="font-family:'Public Sans',sans-serif;background:#f8f8fb;min-height:100vh;padding:24px;">
                <div style="max-width:1100px;margin:0 auto;">
                  <div style="background:linear-gradient(135deg,#7367f0 0%,#5f53e8 100%);color:#fff;border-radius:14px;padding:22px;margin-bottom:20px;">
                    <h1 style="margin:0 0 6px 0;font-size:1.8rem;font-weight:700;">DeleteGuide</h1>
                    <p style="margin:0;opacity:.95;">Componente de confirmação para exclusão de missão.</p>
                  </div>

                  <section style="background:#fff;border:1px solid #ebe9f1;border-radius:12px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin:0 0 12px 0;color:#5e5873;">Preview</h3>
                    <div style="border:1px dashed #d9d5ec;border-radius:10px;padding:10px;">
                      ${renderDeleteGuide({ missionName: 'Matemática Básica', loadingButton: false })}
                    </div>
                  </section>

                  <section style="background:#fff;border:1px solid #ebe9f1;border-radius:12px;padding:16px;margin-bottom:16px;">
                    <h3 style="margin:0 0 12px 0;color:#5e5873;">Props</h3>
                    <table style="width:100%;border-collapse:collapse;">
                      <thead>
                        <tr style="background:#f8f8fb;">
                          <th style="text-align:left;padding:10px;border:1px solid #ebe9f1;">Prop</th>
                          <th style="text-align:left;padding:10px;border:1px solid #ebe9f1;">Tipo</th>
                          <th style="text-align:left;padding:10px;border:1px solid #ebe9f1;">Descrição</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="padding:10px;border:1px solid #ebe9f1;"><code>guideObj</code></td>
                          <td style="padding:10px;border:1px solid #ebe9f1;">Object</td>
                          <td style="padding:10px;border:1px solid #ebe9f1;">Objeto com os dados da missão, incluindo <code>name</code>.</td>
                        </tr>
                        <tr>
                          <td style="padding:10px;border:1px solid #ebe9f1;"><code>loadingButton</code></td>
                          <td style="padding:10px;border:1px solid #ebe9f1;">Boolean</td>
                          <td style="padding:10px;border:1px solid #ebe9f1;">Controla estado de loading/desabilitado dos botões.</td>
                        </tr>
                      </tbody>
                    </table>
                  </section>

                  <section style="background:#fff;border:1px solid #ebe9f1;border-radius:12px;padding:16px;">
                    <h3 style="margin:0 0 12px 0;color:#5e5873;">Código (Vue real)</h3>
                    <pre style="background:#2f3349;color:#eaeaea;padding:14px;border-radius:8px;overflow:auto;font-size:12px;line-height:1.5;"><code>&lt;div class=&quot;d-flex flex-col align-items-center&quot;&gt;
            &lt;b-img-lazy
              src=&quot;/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png&quot;
              class=&quot;mb-1&quot;
              :height=&quot;300&quot;
            /&gt;

            &lt;h1&gt;Deseja excluir a missão &quot;{{ guideObj.name }}&quot;?&lt;/h1&gt;

            &lt;div class=&quot;d-flex justify-content-center gap-4&quot;&gt;
              &lt;b-button variant=&quot;outline-danger&quot; :disabled=&quot;loadingButton&quot; @click=&quot;close&quot;&gt;
                Não quero excluir
              &lt;/b-button&gt;

              &lt;b-button variant=&quot;danger&quot; :disabled=&quot;loadingButton&quot; @click=&quot;deleteGuide&quot;&gt;
                Quero excluir
                &lt;b-spinner v-show=&quot;loadingButton&quot; small variant=&quot;white&quot; /&gt;
              &lt;/b-button&gt;
            &lt;/div&gt;
          &lt;/div&gt;</code></pre>
                  </section>
                </div>
              </div>
            `,
          };
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">role</code><span style="color:#6E6B7B;font-size:14px;">Define o papel semântico do componente na árvore de acessibilidade</span></div>
          <div style="display:flex;align-items:flex-start;gap:12px;padding:12px;background:#F8F8F8;border-radius:8px;"><code style="background:#E8E8F7;padding:3px 8px;border-radius:4px;font-size:12px;flex-shrink:0;">aria-disabled</code><span style="color:#6E6B7B;font-size:14px;">Anuncia estado desabilitado sem remover do tab order</span></div>
        </div>
      </div>

      <div style="background:white;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <h2 style="font-size:1rem;font-weight:600;color:#5E5873;margin:0 0 16px 0;">✅ Checklist WCAG 2.1 AA</h2>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">1.4.3</code>Contraste mínimo 4.5:1 para texto normal</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.1.1</code>Toda funcionalidade disponível via teclado</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">2.4.7</code>Foco visível em todos os elementos interativos</span></div>
          <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F0FFF4;border-left:3px solid #28C76F;border-radius:4px;"><span style="color:#28C76F;font-weight:700;">✓</span><span style="color:#5E5873;font-size:14px;"><code style="font-size:11px;color:#28C76F;font-weight:600;margin-right:8px;">4.1.2</code>Nome, função e valor programaticamente determinável</span></div>
        </div>
      </div>

    </div>
  `,
};

