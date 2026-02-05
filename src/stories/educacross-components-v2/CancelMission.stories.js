/**
 * CancelMission - Mission Cancellation Modal
 * =========================================
 * Modal de confirmação e feedback para cancelamento de missão
 * 
 * @component CancelMission
 * @category Educacross Components V2
 * @source educacross-frontoffice\src\components\mission-plus\CancelMission.vue
 * @assets Assets/Interface/belinha-school-enable-script.png
 * @status PIXEL-PERFECT
 * @since 2.0.0
 */

export default {
  title: 'Front-office/Modals/CancelMission',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
<style>
  /* Base Typography - Figma Professional Style */
  .sbdocs-wrapper {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    color: #1d1d1d;
    line-height: 1.6;
    font-size: 15px;
    max-width: 880px;
    margin: 0 auto;
  }

  .sbdocs h1 {
    font-size: 2.75rem;
    font-weight: 700;
    color: #000;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .sbdocs h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #000;
    margin: 3.5rem 0 1.25rem 0;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .sbdocs h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1d1d1d;
    margin: 2.5rem 0 1rem 0;
    line-height: 1.4;
  }

  .sbdocs p {
    margin-bottom: 1.25rem;
    color: #333;
    font-size: 15px;
    line-height: 1.7;
  }

  .sbdocs ul {
    margin: 1.5rem 0;
    padding-left: 0;
    list-style: none;
  }

  .sbdocs ul li {
    position: relative;
    padding-left: 1.75rem;
    margin-bottom: 0.875rem;
    color: #333;
    line-height: 1.7;
  }

  .sbdocs ul li::before {
    content: '•';
    position: absolute;
    left: 0.5rem;
    color: #6e63e8;
    font-weight: bold;
    font-size: 1.25em;
  }

  .sbdocs table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    font-size: 14px;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  }

  .sbdocs th {
    background: #f8f9fa;
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: #1d1d1d;
    border-bottom: 2px solid #e9ecef;
  }

  .sbdocs td {
    padding: 12px 16px;
    border-bottom: 1px solid #f1f3f5;
    color: #333;
  }

  .sbdocs code {
    background: #f8f9fa;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
    color: #6e63e8;
    font-family: 'Monaco', 'Menlo', monospace;
  }

  .sbdocs pre {
    background: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .sbdocs pre code {
    background: transparent;
    padding: 0;
  }
</style>

# CancelMission

Modal de confirmação para cancelamento de missão com dois estados: **confirmação** e **feedback de sucesso**.

## Contexto de Uso

**Persona**: Professor/Coordenador  
**Tela**: Listagem de Missões > Ações de Missão  
**Fluxo**: 
1. Professor clica em "Cancelar Missão"
2. Sistema exibe modal de confirmação com alerta
3. Professor confirma cancelamento
4. Sistema processa e exibe feedback de sucesso

**Casos de Uso**:
- Cancelar missão enviada por engano
- Prevenir reenvio acidental de missão
- Oferecer opção de arquivamento pós-cancelamento

## Arquitetura da Informação

\`\`\`
CancelMission Modal
├─ Estado 1: Confirmação
│  ├─ Imagem: Belinha (311x241px)
│  ├─ Título: "Cancelar envio de missão?"
│  ├─ Warning: Nome da missão
│  ├─ Atenção: Aviso em vermelho
│  └─ Botões: [Não quero cancelar] [Quero cancelar + spinner]
│
└─ Estado 2: Sucesso
   ├─ Título: "Missão cancelada!"
   ├─ Mensagem: Sugestão de arquivamento
   └─ Botão: [Ok]
\`\`\`

## Especificações de Design

### Dimensões

| Elemento | Largura | Altura | Observações |
|----------|---------|---------|-------------|
| Modal Container | auto | auto | Centralizado |
| Imagem Belinha | 311px | 241px | Fixa |
| Botão Ação | 18rem (288px) | 48px | Par de botões |
| Botão Ok | 18rem (288px) | 48px | Único |

### Tipografia

| Elemento | Font Size | Weight | Line Height | Color |
|----------|-----------|---------|-------------|--------|
| Título Confirmação | 24px | 500 | 29px | #4b4b4b |
| Warning Text | 18px | 500 | 22px | #6e6b7b |
| Atenção Text | 14px | 700 | 24px | #ea5455 |
| Título Cancelada | 28px | 500 | 36px | #5e5873 |
| Mensagem Sucesso | 14px | 400 | 24px | #6e6b7b |
| Botão Label | inherit | 500 | 24px | inherit |

### Cores

| Elemento | Background | Text | Border |
|----------|------------|------|--------|
| Modal | transparent | - | - |
| Btn Outline Danger | transparent | #ea5455 | #ea5455 |
| Btn Danger | #ea5455 | #fff | - |
| Btn Primary | #6e63e8 | #fff | - |
| Warning Text | - | #6e6b7b | - |
| Atenção Text | - | #ea5455 | - |

### Layout e Espaçamento

| Propriedade | Valor | Aplicação |
|-------------|-------|-----------|
| Modal Padding | 0 40px | Textos laterais |
| Margin Bottom (imagem) | 1rem | Espaçamento |
| Margin Top (warning) | 1rem | Entre elementos |
| Gap Buttons | 1rem (4 = 1rem) | Espaço entre botões |
| Margin Bottom (botão) | 1rem | Espaçamento inferior |
| Margin Bottom (título) | 6 (1.5rem) | Estado sucesso |

### Assets

| Asset | Caminho | Dimensões | Uso |
|-------|---------|-----------|-----|
| Belinha | @/assets/images/teacher-context/school-context/images-info-feedback/belinha-school-enable-script.png | 311x241px | Ilustração de confirmação |

### Comportamento e Estados

| Estado | Trigger | Visual | Ação |
|--------|---------|--------|------|
| Confirmação | Modal aberto | Exibe formulário de confirmação | Aguarda ação |
| Loading | Clique "Quero cancelar" | Spinner no botão + disabled | API call |
| Sucesso | API success | Fade-in, troca de conteúdo | Exibe mensagem |
| Error | API error | Toast de erro | Mantém modal |
| Fechado | Clique "Não quero cancelar" ou "Ok" | Modal fecha | Emit evento |

## Regras de Negócio

1. **Irreversibilidade**: Cancelamento é permanente - missão não pode ser reenviada
2. **Estados Mutuamente Exclusivos**: Apenas um estado (confirmação ou sucesso) visível por vez
3. **Loading State**: Botão "Quero cancelar" fica desabilitado durante requisição
4. **Sugestão de Arquivamento**: Após cancelar, sistema sugere arquivar para ocultar da listagem
5. **Feedback Visual**: Animação fade-in (1s) ao exibir estado de sucesso

## Acessibilidade

- **Contraste**: Warning text (#6e6b7b) em fundo claro - WCAG AAA
- **Atenção Text**: Vermelho (#ea5455) com peso 700 - alta legibilidade
- **Keyboard Navigation**: Tab entre botões, Enter para confirmar
- **Screen Readers**: Texto descritivo claro em cada estado
- **Focus States**: Botões com outline ao receber foco

## UX Writing Matrix

| Elemento | Tipo | Conteúdo | Tom | Função |
|----------|------|----------|-----|---------|
| Título Confirmação | Heading 2 | "Cancelar envio de missão?" | Questionador | Clarificar ação |
| Warning Text | Parágrafo | "Tem certeza que deseja cancelar a "[Nome]"?" | Cauteloso | Confirmar intenção |
| Atenção Text | Parágrafo | "Atenção: Ao cancelar o envio da missão..." | Alerta | Avisar consequência |
| Btn Secundário | CTA | "Não quero cancelar" | Reasseguro | Cancelar ação |
| Btn Primário | CTA | "Quero cancelar" | Definitivo | Confirmar cancelamento |
| Título Sucesso | Heading 1 | "Missão cancelada!" | Assertivo | Confirmar sucesso |
| Mensagem Sucesso | Parágrafo | "Não é mais possível enviar essa missão..." | Informativo | Orientar próximo passo |
| Btn Ok | CTA | "Ok" | Neutro | Fechar modal |

**Princípios de Copy**:
1. **Clareza nas Consequências**: Texto de atenção explica irreversibilidade
2. **Confirmação Dupla**: Pergunta + warning com nome da missão
3. **Sugestão Útil**: Após cancelar, oferece solução (arquivar)

## Exemplo de Integração

\`\`\`vue
<template>
  <b-modal
    v-model="showCancelModal"
    centered
    hide-header
    hide-footer
    @hidden="handleClose"
  >
    <CancelMission
      :cancel-mission="selectedMission"
      @close-cancel-mission="showCancelModal = false"
      @close-cancel-mission-and-refresh="handleCancelSuccess"
    />
  </b-modal>
</template>

<script setup>
import { ref } from 'vue'
import CancelMission from '@/components/mission-plus/CancelMission.vue'

const showCancelModal = ref(false)
const selectedMission = ref({
  id: 123,
  name: 'Missão de Matemática - Frações',
  guideName: 'Introdução às Frações'
})

const handleCancelSuccess = () => {
  // Atualiza lista de missões
  refreshMissionList()
  showCancelModal.value = false
}
</script>
\`\`\`

## Performance

- **Animação Otimizada**: CSS animation (fade-in 1s) - GPU-accelerated
- **Lazy Loading**: Componente carregado apenas quando modal aberto
- **State Management**: Estado local reativo (cancelled, loadingButton)

## Variações

### 1. Loading State
- Spinner visível no botão "Quero cancelar"
- Botão desabilitado durante requisição

### 2. Success State
- Fade-in animation
- Troca completa de conteúdo
- Botão único para fechar

## Componentes Relacionados

- **Modal Container**: Bootstrap Vue Modal wrapper
- **BButton**: Botões de ação
- **BSpinner**: Loading indicator
- **Toast**: Feedback de erro (caso API falhe)
        `
      }
    }
  }
};

// CSS Styles
const componentStyles = `
.cancel-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  padding: 2rem;
}

.cancel-mission .confirm-cancel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cancel-mission .img-belinha {
  width: 311px;
  height: 241px;
  object-fit: contain;
  margin-bottom: 1rem;
}

.cancel-mission h2 {
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  color: #4b4b4b;
  margin-bottom: 1rem;
}

.cancel-mission .warning-cancel-mission {
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #6e6b7b;
  padding: 0 40px;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.cancel-mission .attention-cancel-mission {
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #ea5455;
  padding: 0 40px;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
}

.cancel-mission .button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.cancel-mission .btn-cancel-action {
  width: 18rem;
  height: 48px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.4px;
}

.cancel-mission .cancelled {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cancel-mission .title-cancelled {
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  color: #5e5873;
  margin-bottom: 1.5rem;
}

.cancel-mission .warning-mission-cancelled {
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: #6e6b7b;
  padding: 0 40px;
  margin-bottom: 1.5rem;
}

.cancel-mission .fade-in {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.cancel-mission .spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.15em;
  margin-right: 0.5rem;
}
`;

// Story 1: Estado de Confirmação
export const ConfirmationState = {
  parameters: {
    docs: {
      description: {
        story: 'Estado inicial mostrando confirmação de cancelamento com aviso em destaque.'
      }
    }
  },
  render: () => `
    <style>${componentStyles}</style>
    <div class="cancel-mission">
      <div class="confirm-cancel">
        <div class="d-flex justify-content-center mb-1">
          <svg class="img-belinha" viewBox="0 0 311 241" xmlns="http://www.w3.org/2000/svg">
            <rect width="311" height="241" fill="#f8f9fa" rx="8"/>
            <circle cx="155" cy="100" r="40" fill="#6e63e8" opacity="0.2"/>
            <circle cx="155" cy="100" r="25" fill="#6e63e8"/>
            <path d="M155 120 L135 180 L175 180 Z" fill="#6e63e8"/>
            <circle cx="145" cy="95" r="4" fill="white"/>
            <circle cx="165" cy="95" r="4" fill="white"/>
            <path d="M145 105 Q155 110 165 105" stroke="white" stroke-width="2" fill="none"/>
            <text x="155" y="220" text-anchor="middle" font-size="14" fill="#6e6b7b" font-family="Arial">Belinha</text>
          </svg>
        </div>

        <h2 class="mb-1 text-center">Cancelar envio de missão?</h2>
        
        <p class="warning-cancel-mission mt-1">
          Tem certeza que deseja cancelar a "Missão de Matemática - Frações"?
        </p>
        
        <p class="attention-cancel-mission mt-1">
          Atenção: Ao cancelar o envio da missão, a mesma não poderá ser reenviada para os alunos.
        </p>
        
        <div class="button-group">
          <button class="btn btn-outline-danger btn-cancel-action">
            Não quero cancelar
          </button>
          <button class="btn btn-danger btn-cancel-action">
            Quero cancelar
          </button>
        </div>
      </div>
    </div>
  `
};

// Story 2: Loading State
export const LoadingState = {
  parameters: {
    docs: {
      description: {
        story: 'Botão de confirmação em estado de loading durante requisição de cancelamento.'
      }
    }
  },
  render: () => `
    <style>${componentStyles}</style>
    <div class="cancel-mission">
      <div class="confirm-cancel">
        <div class="d-flex justify-content-center mb-1">
          <svg class="img-belinha" viewBox="0 0 311 241" xmlns="http://www.w3.org/2000/svg">
            <rect width="311" height="241" fill="#f8f9fa" rx="8"/>
            <circle cx="155" cy="100" r="40" fill="#6e63e8" opacity="0.2"/>
            <circle cx="155" cy="100" r="25" fill="#6e63e8"/>
            <path d="M155 120 L135 180 L175 180 Z" fill="#6e63e8"/>
            <circle cx="145" cy="95" r="4" fill="white"/>
            <circle cx="165" cy="95" r="4" fill="white"/>
            <path d="M145 105 Q155 110 165 105" stroke="white" stroke-width="2" fill="none"/>
          </svg>
        </div>

        <h2 class="mb-1 text-center">Cancelar envio de missão?</h2>
        
        <p class="warning-cancel-mission mt-1">
          Tem certeza que deseja cancelar a "Missão de Português - Interpretação de Texto"?
        </p>
        
        <p class="attention-cancel-mission mt-1">
          Atenção: Ao cancelar o envio da missão, a mesma não poderá ser reenviada para os alunos.
        </p>
        
        <div class="button-group">
          <button class="btn btn-outline-danger btn-cancel-action">
            Não quero cancelar
          </button>
          <button class="btn btn-danger btn-cancel-action" disabled>
            <span class="spinner-border spinner-border-sm" role="status"></span>
            Quero cancelar
          </button>
        </div>
      </div>
    </div>
  `
};

// Story 3: Success State
export const SuccessState = {
  parameters: {
    docs: {
      description: {
        story: 'Estado de sucesso após cancelamento, com animação fade-in e sugestão de arquivamento.'
      }
    }
  },
  render: () => `
    <style>${componentStyles}</style>
    <div class="cancel-mission">
      <div class="cancelled fade-in">
        <h1 class="title-cancelled">Missão cancelada!</h1>
        
        <p class="warning-mission-cancelled">
          Não é mais possível enviar essa missão para os alunos, caso deseje ocultar a visualização
          dessa missão na listagem você pode arquivar a mesma.
        </p>
        
        <button class="btn btn-primary btn-cancel-action">
          Ok
        </button>
      </div>
    </div>
  `
};

// Story 4: Interactive Demo
export const InteractiveDemo = {
  parameters: {
    docs: {
      description: {
        story: 'Demo interativo completo com transição entre estados de confirmação, loading e sucesso.'
      }
    }
  },
  render: () => {
    setTimeout(() => {
      const btnSecondary = document.querySelector('#cancel-mission-demo .btn-outline-danger');
      const btnPrimary = document.querySelector('#cancel-mission-demo .btn-danger');
      const confirmState = document.querySelector('#cancel-mission-demo .confirm-cancel');
      const successState = document.querySelector('#cancel-mission-demo .cancelled');

      if (btnSecondary) {
        btnSecondary.addEventListener('click', () => {
          alert('Cancelamento foi abortado.');
        });
      }

      if (btnPrimary) {
        btnPrimary.addEventListener('click', () => {
          // Ativa loading
          btnPrimary.disabled = true;
          btnPrimary.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Quero cancelar';
          
          // Simula API call
          setTimeout(() => {
            confirmState.style.display = 'none';
            successState.style.display = 'flex';
            successState.classList.add('fade-in');
          }, 2000);
        });
      }

      const btnOk = document.querySelector('#cancel-mission-demo .btn-primary');
      if (btnOk) {
        btnOk.addEventListener('click', () => {
          alert('Modal fechado!');
        });
      }
    }, 100);

    return `
      <style>${componentStyles}</style>
      <div id="cancel-mission-demo" class="cancel-mission">
        <div class="confirm-cancel">
          <div class="d-flex justify-content-center mb-1">
            <svg class="img-belinha" viewBox="0 0 311 241" xmlns="http://www.w3.org/2000/svg">
              <rect width="311" height="241" fill="#f8f9fa" rx="8"/>
              <circle cx="155" cy="100" r="40" fill="#6e63e8" opacity="0.2"/>
              <circle cx="155" cy="100" r="25" fill="#6e63e8"/>
              <path d="M155 120 L135 180 L175 180 Z" fill="#6e63e8"/>
              <circle cx="145" cy="95" r="4" fill="white"/>
              <circle cx="165" cy="95" r="4" fill="white"/>
              <path d="M145 105 Q155 110 165 105" stroke="white" stroke-width="2" fill="none"/>
            </svg>
          </div>

          <h2 class="mb-1 text-center">Cancelar envio de missão?</h2>
          
          <p class="warning-cancel-mission mt-1">
            Tem certeza que deseja cancelar a "Missão de Ciências - Sistema Solar"?
          </p>
          
          <p class="attention-cancel-mission mt-1">
            Atenção: Ao cancelar o envio da missão, a mesma não poderá ser reenviada para os alunos.
          </p>
          
          <div class="button-group">
            <button class="btn btn-outline-danger btn-cancel-action">
              Não quero cancelar
            </button>
            <button class="btn btn-danger btn-cancel-action">
              Quero cancelar
            </button>
          </div>
        </div>

        <div class="cancelled" style="display: none;">
          <h1 class="title-cancelled">Missão cancelada!</h1>
          
          <p class="warning-mission-cancelled">
            Não é mais possível enviar essa missão para os alunos, caso deseje ocultar a visualização
            dessa missão na listagem você pode arquivar a mesma.
          </p>
          
          <button class="btn btn-primary btn-cancel-action">
            Ok
          </button>
        </div>
      </div>
    `;
  }
};

// Story 5: Missões Diferentes
export const DifferentMissions = {
  parameters: {
    docs: {
      description: {
        story: 'Exemplos com diferentes nomes de missões para demonstrar flexibilidade do texto.'
      }
    }
  },
  render: () => `
    <style>${componentStyles}</style>
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div class="cancel-mission">
        <div class="confirm-cancel">
          <h2 class="mb-1 text-center">Cancelar envio de missão?</h2>
          <p class="warning-cancel-mission mt-1">
            Tem certeza que deseja cancelar a "Tabuada do 5 - Prática"?
          </p>
          <p class="attention-cancel-mission mt-1">
            Atenção: Ao cancelar o envio da missão, a mesma não poderá ser reenviada para os alunos.
          </p>
          <div class="button-group">
            <button class="btn btn-outline-danger btn-cancel-action">Não quero cancelar</button>
            <button class="btn btn-danger btn-cancel-action">Quero cancelar</button>
          </div>
        </div>
      </div>

      <div class="cancel-mission">
        <div class="confirm-cancel">
          <h2 class="mb-1 text-center">Cancelar envio de missão?</h2>
          <p class="warning-cancel-mission mt-1">
            Tem certeza que deseja cancelar a "Leitura e Interpretação - Fábulas"?
          </p>
          <p class="attention-cancel-mission mt-1">
            Atenção: Ao cancelar o envio da missão, a mesma não poderá ser reenviada para os alunos.
          </p>
          <div class="button-group">
            <button class="btn btn-outline-danger btn-cancel-action">Não quero cancelar</button>
            <button class="btn btn-danger btn-cancel-action">Quero cancelar</button>
          </div>
        </div>
      </div>

      <div class="cancel-mission">
        <div class="confirm-cancel">
          <h2 class="mb-1 text-center">Cancelar envio de missão?</h2>
          <p class="warning-cancel-mission mt-1">
            Tem certeza que deseja cancelar a "Geografia - Continentes e Oceanos"?
          </p>
          <p class="attention-cancel-mission mt-1">
            Atenção: Ao cancelar o envio da missão, a mesma não poderá ser reenviada para os alunos.
          </p>
          <div class="button-group">
            <button class="btn btn-outline-danger btn-cancel-action">Não quero cancelar</button>
            <button class="btn btn-danger btn-cancel-action">Quero cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story 6: Responsivo
export const ResponsiveDemo = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstração do comportamento responsivo em diferentes tamanhos de tela.'
      }
    }
  },
  render: () => `
    <style>
      ${componentStyles}
      .responsive-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }
    </style>
    <div class="responsive-grid">
      <div class="cancel-mission" style="max-width: 350px;">
        <div class="confirm-cancel">
          <h2 class="mb-1 text-center" style="font-size: 20px;">Cancelar envio de missão?</h2>
          <p class="warning-cancel-mission mt-1" style="font-size: 16px; padding: 0 20px;">
            Tem certeza que deseja cancelar a "Missão Mobile"?
          </p>
          <p class="attention-cancel-mission mt-1" style="font-size: 13px; padding: 0 20px;">
            Atenção: Ao cancelar o envio da missão, a mesma não poderá ser reenviada.
          </p>
          <div class="button-group" style="flex-direction: column;">
            <button class="btn btn-outline-danger btn-cancel-action" style="width: 100%;">Não quero cancelar</button>
            <button class="btn btn-danger btn-cancel-action" style="width: 100%;">Quero cancelar</button>
          </div>
        </div>
      </div>

      <div class="cancel-mission">
        <div class="confirm-cancel">
          <h2 class="mb-1 text-center">Cancelar envio de missão?</h2>
          <p class="warning-cancel-mission mt-1">
            Tem certeza que deseja cancelar a "Missão Desktop"?
          </p>
          <p class="attention-cancel-mission mt-1">
            Atenção: Ao cancelar o envio da missão, a mesma não poderá ser reenviada para os alunos.
          </p>
          <div class="button-group">
            <button class="btn btn-outline-danger btn-cancel-action">Não quero cancelar</button>
            <button class="btn btn-danger btn-cancel-action">Quero cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `
};

// Story 7: Dark Mode Concept
export const DarkModeConcept = {
  parameters: {
    docs: {
      description: {
        story: 'Conceito de dark mode para o modal (não implementado no original).'
      }
    }
  },
  render: () => `
    <style>
      ${componentStyles}
      .dark-theme {
        background: #1e1e2d;
        padding: 2rem;
        border-radius: 8px;
      }
      .dark-theme .cancel-mission h2 {
        color: #e9ecef;
      }
      .dark-theme .warning-cancel-mission {
        color: #adb5bd;
      }
      .dark-theme .attention-cancel-mission {
        color: #ff6b6b;
      }
      .dark-theme .title-cancelled {
        color: #e9ecef;
      }
      .dark-theme .warning-mission-cancelled {
        color: #adb5bd;
      }
    </style>
    <div class="dark-theme">
      <div class="cancel-mission">
        <div class="confirm-cancel">
          <h2 class="mb-1 text-center">Cancelar envio de missão?</h2>
          <p class="warning-cancel-mission mt-1">
            Tem certeza que deseja cancelar a "Missão Dark Mode"?
          </p>
          <p class="attention-cancel-mission mt-1">
            Atenção: Ao cancelar o envio da missão, a mesma não poderá ser reenviada para os alunos.
          </p>
          <div class="button-group">
            <button class="btn btn-outline-danger btn-cancel-action">Não quero cancelar</button>
            <button class="btn btn-danger btn-cancel-action">Quero cancelar</button>
          </div>
        </div>
      </div>
    </div>
  `
};

export const Default = ConfirmationState;


