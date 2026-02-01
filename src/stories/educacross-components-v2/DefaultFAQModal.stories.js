/**
 * DefaultFAQModal - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component DefaultFAQModal
 * @source educacross-frontoffice\src\components\modal\DefaultFAQModal.vue
 * @generated 2026-02-01T20:35:35.818240
 * 
 * Props: None
 * Slots: None
 * Emits: open-faq, open-whatsapp-support, open-email
 */

export default {
  title: 'Educacross V2/DefaultFAQModal',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## DefaultFAQModal

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **open-faq**
- **open-whatsapp-support**
- **open-email**
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
  --danger: #ea5455;
  --danger-rgb: 234, 84, 85;
  --warning: #ff9f43;
  --warning-rgb: 255, 159, 67;
  --info: #00cfe8;
  --info-rgb: 0, 207, 232;
  --secondary: #6c757d;
  --secondary-rgb: 108, 117, 125;
  --light: #f8f9fa;
  --dark: #343a40;
  --legend-below-basic: #ea5455;
  --legend-basic: #ff9f43;
  --legend-proficient: #28c76f;
  --legend-advanced: #6e63e8;
  --border-color: #dbdade;
  --body-bg: #f8f7fa;
  --card-bg: #ffffff;
  --text-color: #5d596c;
  --heading-color: #5d596c;
}


.material-symbols-outlined.support-icon {
  font-size: 48px;
}

.modal-content-navBar {
  display: flex;
  flex-direction: row;
  justify-content: center;

  .close {
    margin: 0;
    position: absolute !important;
    right: 20px !important;
    top: 10px !important;
  }

  .modal-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;

    .modal-header-icon {
      color: #7367f0;
      padding: 16px;
      background: rgba(115, 103, 240, 0.12);
      border-radius: 10px;
    }

    .modal-header-text {
      padding-top: 15px;
      font-weight: 500;
      font-size: 21px;
      line-height: 26px;
    }

    .modal-content-infos {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 30px 0;

      .modal-content-infos-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #7367f0;
        box-sizing: border-box;
        border-radius: 10px;
        text-align: center;
        padding: 16px;

        .modal-content-infos-text-header {
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
        }

        .modal-content-infos-text-content {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          text-align: center;
        }
      }
    }
  }
}
`;

// Template base
const baseTemplate = `
<b-modal id="faq-modal" ref="faq-modal" content-class="shadow" centered hide-footer size="lg">
    <div class="modal-content-navBar">
      <div class="modal-container">
        <div class="modal-header-icon">
          <span class="material-symbols-outlined support-icon">
            help
          </span>
        </div>
        <div class="modal-header-text">
          <span>Estou com dúvida!</span>
        </div>

        <div class="modal-content-infos gap-5 flex-column flex-lg-row">
          <div class="modal-content-infos-container">
            <p class="modal-content-infos-text-header">Central de Ajuda</p>
            <p class="modal-content-infos-text-content" style="padding: 16px">
              Montamos um conteúdo super completo para sanar possíveis dúvidas. São mais de 100
              perguntas e respostas com tutoriais de navegação da Sample Text.
            </p>
            <b-button variant="primary" class="button-faq-content">
              <div class="d-flex align-items-center justify-content-center gap-2">
                <span class="material-symbols-outlined">
                  import_contacts
                </span>
                <span>Acessar Central de Ajuda</span>
              </div>
            </b-button>
          </div>
          <div class="modal-content-infos-container">
            <p class="modal-content-infos-text-header">Entre em contato</p>
            <p class="modal-content-infos-text-content">
              Caso não encontre a sua dúvida no portal, você poderá entrar em contato direto com a
              nossa equipe das 7h às 19h de Segunda à Sexta.
            </p>
            <div class="d-flex align-items-center justify-content-between gap-2">
              <b-button
                variant="outline-primary"
                class="whatsapp-contact"
              >
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <img src="@/assets/icons/whatsapp-primary.svg" />
                  <span>WhatsApp</span>
                </div>
              </b-button>

              <b-button variant="outline-primary">
                <div class="d-flex align-items-center justify-content-between gap-2">
                  <span style="font-size: 16px" class="material-icons mr-50">mail</span>
                  <span>E-mail</span>
                </div>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-modal>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


