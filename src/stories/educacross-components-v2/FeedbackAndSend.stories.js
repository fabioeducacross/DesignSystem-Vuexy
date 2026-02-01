/**
 * FeedbackAndSend - Pixel Perfect Stories
 * =========================================
 * Extraído automaticamente do frontoffice Educacross
 * 
 * @component FeedbackAndSend
 * @source educacross-frontoffice\src\components\mission-plus\FeedbackAndSend.vue
 * @generated 2026-02-01T20:35:35.842770
 * 
 * Props: None
 * Slots: None
 * Emits: close, close-and-update
 */

export default {
  title: 'Educacross V2/FeedbackAndSend',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## FeedbackAndSend

Componente extraído pixel-perfect do frontoffice Educacross.

### Props
- Nenhuma prop definida

### Slots
- Nenhum slot definido

### Events
- **close**
- **close-and-update**
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



`;

// Template base
const baseTemplate = `
<div>
    <div class="text-center">
      <h1 class="mb-2">Deseja enviar missão?</h1>
    </div>
    <div class="text-center">
      <span class="material-symbols-outlined modal-icon text-sucess display-2 text-success">
        task_alt
      </span>
      <h1 class="text-success mb-2">Missão criada com sucesso!</h1>
    </div>

    <hr class="w-full divider w-75 mx-auto my-2 border-gray" />

    <MissionDetails :guide-id="props.id" />

    <hr class="w-full divider w-75 mx-auto my-2 border-gray" />

    <div class="d-flex justify-content-center gap-4 mb-2">
      <b-button
        ref="loadableButtonarchiveMission"
        class="button-left"
        variant="outline-primary"
        type="border"
        disabled=""
      >
        Sair sem enviar missão
      </b-button>
      <b-button
        variant="primary"
        class="button-right"
        type="filled"
        disabled=""
      >
        <b-spinner small variant="white" />
        Enviar missão agora
      </b-button>
    </div>
    <p class="text-center modal-desc">
      <span class="font-bold">Atenção:</span> Ao enviar a missão agora, ela irá se iniciar em
      <span class="font-bold text-primary">Sample Text</span> e então, não será mais
      possível apagar ou editá-la.
    </p>
  </div>
`;

// Story: Default
export const Default = {
  render: () => `
    <style>${componentStyles}</style>
    ${baseTemplate}
  `
};


