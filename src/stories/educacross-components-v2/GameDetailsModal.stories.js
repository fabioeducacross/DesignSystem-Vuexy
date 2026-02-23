/**
 * GameDetailsModal
 * Componente real de referência:
 * educacross-frontoffice/src/components/modal/GameDetailsModal.vue
 */

export default {
    title: 'Educacross Components V2/Modals/GameDetailsModal',
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component:
                    'Modal de detalhes do jogo com cabeçalho customizado (botão voltar condicional e fechar) e conteúdo central equivalente ao ActivityDetail.'
            }
        }
    },
    argTypes: {
        value: { control: 'boolean', description: 'Controla visibilidade do modal' },
        selectedActivityId: { control: 'number', description: 'ID da atividade selecionada' },
        subjectId: { control: 'number', description: 'ID da disciplina (subject.id)' },
        renderWebgl: { control: 'boolean', description: 'Estado interno do ActivityDetail para exibir botão voltar' }
    }
}

const baseStyles = `
  .game-details-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: rgba(75, 70, 92, 0.2);
  }

  .game-details-wrapper .modal-dialog {
    width: 100%;
    max-width: 1140px;
    margin: 0;
  }

  .game-details-wrapper .modal-content {
    border: 0;
    box-shadow: 0 0.25rem 1rem rgba(47, 43, 61, 0.14);
    border-radius: 0.375rem;
    overflow: visible;
    background: #fff;
  }

  .game-details-wrapper .modal-header {
    position: relative;
    min-height: 3.5rem;
    padding: 0.8rem 1rem 0.25rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 0;
  }

  .game-details-wrapper .back {
    position: absolute;
    right: 3.4rem;
    top: 0.5rem;
    border: 0;
    background: #fff;
    color: #5e5873;
    border-radius: 0.357rem;
    box-shadow: 0 5px 20px 0 rgb(34 41 47 / 10%);
    width: 38px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all .23s ease .1s;
  }

  .game-details-wrapper .back:hover {
    transform: translate(-3px, 5px);
  }

  .game-details-wrapper .close {
    position: absolute;
    top: -0.95rem;
    right: -0.95rem;
    width: 2.3rem;
    height: 2.3rem;
    border: 0;
    border-radius: 0.625rem;
    background: #fff;
    color: #6e6b7b;
    box-shadow: 0 5px 20px 0 rgb(34 41 47 / 10%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    cursor: pointer;
    transition: all .23s ease .1s;
  }

  .game-details-wrapper .close:hover {
    transform: translate(-1px, 1px);
  }

  .game-details-wrapper .close span {
    font-size: 1.65rem;
    line-height: 1;
  }

  .game-details-wrapper .modal-body {
    padding: 0 1.5rem 1.5rem;
    max-height: 70vh;
    overflow: auto;
  }

  .gd-activity-root {
    padding-top: 0.5rem;
  }

  .gd-title {
    margin: 0 0 .35rem 0;
    color: #5e5873;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .gd-img-activity {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: .375rem;
    background: #f0f0f0;
    border: 1px solid #ebe9f1;
  }

  .gd-skill-block {
    border: 1px solid #ebe9f1;
    border-radius: .375rem;
    padding: .6rem .7rem;
    margin-bottom: .5rem;
    background: #fff;
  }

  .gd-gallery-thumb {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: .375rem;
    border: 1px solid #ebe9f1;
    background: #fff;
  }

  .gd-webgl {
    border: 1px solid #ebe9f1;
    border-radius: .375rem;
    overflow: hidden;
    height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #0f172a;
    color: #fff;
    font-size: .95rem;
  }
`

const renderModal = (args) => `
  <div class="game-details-wrapper">
    <div class="modal-dialog modal-xl modal-dialog-centered m-0" role="dialog" aria-modal="true" aria-label="Detalhes do jogo">
      <div class="modal-content shadow bg-white">
        <div class="modal-header">
        ${args.renderWebgl ? `
          <button class="back" aria-label="Voltar">
            <span class="material-symbols-outlined" style="font-size:16px">arrow_back</span>
          </button>
        ` : ''}
        <button class="close" aria-label="Fechar">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>

        <div class="modal-body">
        ${args.value ? `
          <section class="gd-activity-root">
            ${args.renderWebgl ? `
              <div class="gd-webgl">
                Visualização do jogo (WebGL) · activityId ${args.selectedActivityId}
              </div>
            ` : `
              <div class="row align-items-start mb-3">
                <div class="col-12 col-lg-5 col-xl-4">
                  <div class="d-flex align-items-stretch gap-3 mb-2">
                    <img class="gd-img-activity" src="/images/teacher-context/school-context/activity-detail/belinha_activityhelp.png" alt="activity" />
                    <div class="d-flex flex-column justify-content-between">
                      <h1 class="gd-title text-primary">Frações Intergalácticas</h1>
                      <div><span class="badge rounded-pill bg-primary">Nível 3</span></div>
                      <span>Local da ilha: <span class="fw-bold text-primary">Setor Aurora</span></span>
                    </div>
                  </div>

                  <button class="btn btn-primary d-flex align-items-center gap-2 justify-content-center w-100 mb-2">
                    <span class="material-symbols-outlined" style="font-size: 22px">play_circle</span>
                    <span>Jogar</span>
                  </button>

                  <button class="btn btn-primary d-flex align-items-center gap-2 justify-content-center w-100">
                    <span class="material-symbols-outlined" style="font-size: 22px">picture_as_pdf</span>
                    <span>Baixar plano de aula</span>
                  </button>

                  <hr />
                  <p>Contém habilidades:</p>

                  <div class="gd-skill-block">
                    <div class="mb-1"><span class="fw-bold text-primary">BNCC</span></div>
                    <span class="badge rounded-pill bg-label-primary">EF05MA06</span>
                  </div>

                  <div class="gd-skill-block">
                    <div class="mb-1"><span class="fw-bold text-primary">Matriz SAEB</span></div>
                    <span class="badge rounded-pill bg-label-primary">D20</span>
                  </div>
                </div>

                <div class="col-12 col-lg-7 col-xl-8">
                  <section class="px-lg-3">
                    <div class="mb-3">
                      <h4>Ação do jogo</h4>
                      <p>Resolver desafios progressivos de comparação e equivalência de frações em contextos do cotidiano.</p>
                    </div>
                    <div class="mb-3">
                      <h4>Avaliação da aprendizagem</h4>
                      <p>O desempenho considera acertos, tempo de execução, tentativas e cooperação entre estudantes.</p>
                    </div>
                    <div>
                      <h4>Orientações pedagógicas</h4>
                      <p class="text-black">Incentive os estudantes a verbalizar estratégias antes da resposta final e registrar hipóteses no diário de bordo.</p>
                    </div>
                  </section>
                </div>
              </div>

              <hr />

              <div>
                <div class="d-flex align-items-center justify-content-between py-2">
                  <h4 class="fw-normal text-primary mb-0">Galeria de imagens</h4>
                  <div>
                    <button class="btn btn-outline-primary p-0 me-1" type="button"><span class="material-symbols-outlined">chevron_left</span></button>
                    <button class="btn btn-outline-primary p-0" type="button"><span class="material-symbols-outlined">chevron_right</span></button>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12 col-md-6 mb-3"><img class="gd-gallery-thumb" src="/images/missions/mission-challenges.png" alt="galeria 1" /></div>
                  <div class="col-12 col-md-6 mb-3"><img class="gd-gallery-thumb" src="/images/missions/mission-performance.png" alt="galeria 2" /></div>
                </div>
              </div>
            `}
          </section>
        ` : ''}
        </div>
      </div>
    </div>
  </div>
  <style>${baseStyles}</style>
`

export const Default = {
    args: {
        value: true,
        selectedActivityId: 101,
        subjectId: 7,
        renderWebgl: false
    },
    render: (args) => renderModal(args)
}

export const WebglAtivo = {
    args: {
        value: true,
        selectedActivityId: 101,
        subjectId: 7,
        renderWebgl: true
    },
    render: (args) => renderModal(args)
}
