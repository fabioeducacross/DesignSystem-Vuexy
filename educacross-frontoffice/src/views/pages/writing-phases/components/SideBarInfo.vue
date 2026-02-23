<template>
  <div>
    <div
      v-if="showTextMore"
      class="text-primary cursor-pointer d-flex align-items-center gap-1 text-nowrap"
      @click="changeSidebar()"
    >
      <span class="material-symbols-outlined"> help </span>
      <u class="underline">Saber Mais</u>
    </div>
    <b-sidebar
      id="add-new-user-sidebar"
      :visible="sidebarActive"
      bg-variant="white"
      sidebar-class="sidebar-lg"
      body-class="d-flex flex-column"
      width="820px"
      shadow
      backdrop
      no-header
      right
    >
      <template v-slot="{}">
        <div
          class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
        >
          <h6 class="mb-0 text-body">Sobre Fases da Escrita</h6>

          <span
            class="material-symbols-outlined cursor-pointer text-body"
            style="font-size: 20px"
            @click="changeSidebar(false)"
          >
            close
          </span>
        </div>

        <!-- BODY -->
        <div class="p-2 overflow-y-auto">
          <h4 class="text-primary">Fases da Escrita</h4>
          <p>
            A compreensão e identificação das fases da escrita colabora para que os educadores
            entendam melhor o progresso de aprendizagem das crianças na escrita e na leitura, e
            assim, planejar intervenções pedagógicas adequadas. Emília Ferreiro e Ana Teberosky,
            especialistas em desenvolvimento da escrita, propuseram um modelo que descreve as fases
            do desenvolvimento da escrita. As fases da escrita são:
          </p>

          <b-alert show variant="pre">
            <div class="alert-body text-body font-weight-normal">
              <h6 class="font-bold text-pre">
                <span
                  class="material-symbols-outlined align-text-bottom"
                  style="font-variation-settings: 'FILL' 1; font-size: 16px"
                >
                  circle
                </span>
                PRÉ-SILÁBICA
              </h6>
              <p class="font-weight-normal">
                Essa fase é um ato de imitação do adulto e interpretação das imagens e textos
                memorizados.
              </p>
              <b>Características:</b>
              <ul
                class="list-style-icons"
                style="list-style-type: disc; list-style-position: outside"
              >
                <li>
                  Marcas (zigue-zague) ou rabiscos ou garatujas que imitam a escrita do adulto;
                </li>
                <li>Uso de letras e números sem valor sonoro;</li>
                <li>
                  Utilizam, com frequência, letras do próprio nome: realismo nominal: objetos
                  grandes precisam de mais letras e objetos pequenos, menos letras.
                </li>
              </ul>

              <p class="font-12 text-pre" style="font-weight: 700">Rabiscos e garatujas:</p>
              <div class="border-1 border-pre rounded p-1 d-flex align-items-center gap-2 md:w-2/3">
                <b-img
                  src="@/views/pages/writing-phases/components/images/tree.svg"
                  class="d-none d-md-block"
                />
                <div>
                  <p>Palavra correta: <b>ÁRVORE</b></p>
                  <p>
                    A criança poderá escrever:
                    <b-img
                      src="@/views/pages/writing-phases/components/images/writing_example.svg"
                      class="d-inline"
                    />
                  </p>
                </div>
              </div>

              <p class="font-12 text-pre" style="font-weight: 700">Letras sem valor sonoro:</p>
              <div
                class="border-1 border-info rounded p-1 d-flex align-items-center gap-2 md:w-2/3"
              >
                <b-img
                  src="@/views/pages/writing-phases/components/images/ball.svg"
                  class="d-none d-md-block"
                />
                <div>
                  <p>Palavra correta: <b>BOLA</b></p>
                  <p>A criança poderá escrever: <b>PDEOR</b></p>
                </div>
              </div>
            </div>
          </b-alert>

          <b-alert show variant="ssv">
            <div class="alert-body text-body font-weight-normal">
              <h6 class="font-bold text-ssv">
                <span
                  class="material-symbols-outlined align-text-bottom"
                  style="font-variation-settings: 'FILL' 1; font-size: 16px"
                >
                  circle
                </span>
                SILÁBICA SEM VALOR SONORO
              </h6>
              <p class="font-weight-normal">
                Nessa fase a criança começa a perceber que as palavras são compostas por partes
                menores, as sílabas e que cada sílaba corresponde a um conjunto de sons.
              </p>
              <b>Características:</b>
              <ul
                class="list-style-icons mb-50"
                style="list-style-type: disc; list-style-position: outside"
              >
                <li>
                  Uso de uma letra para representar o som escutado, uma letra para cada sílaba;
                </li>
                <li>A maioria das letras não tem ligação com o som da sílaba pronunciada.</li>
              </ul>

              <div class="border-1 border-ssv rounded p-1 d-flex align-items-center gap-2 md:w-2/3">
                <b-img
                  src="@/views/pages/writing-phases/components/images/doll.svg"
                  class="d-none d-md-block"
                />
                <div>
                  <p>Palavra correta: <b>BONECA</b></p>
                  <p>A criança poderá escrever: <b>RSI</b></p>
                </div>
              </div>
            </div>
          </b-alert>

          <b-alert show variant="scv">
            <div class="alert-body text-body font-weight-normal">
              <h6 class="font-bold text-scv">
                <span
                  class="material-symbols-outlined align-text-bottom"
                  style="font-variation-settings: 'FILL' 1; font-size: 16px"
                >
                  circle
                </span>
                SILÁBICA COM VALOR SONORO
              </h6>
              <p class="font-weight-normal">
                Nessa fase a criança começa a perceber que as palavras são compostas por partes
                menores, as sílabas e que cada sílaba corresponde a um conjunto de sons.
              </p>
              <b>Características:</b>
              <ul
                class="list-style-icons mb-50"
                style="list-style-type: disc; list-style-position: outside"
              >
                <li>É perceptível a relação entre a letra (grafema e som - fonema);</li>
                <li>As letras escritas pertencem à sílaba representada.</li>
              </ul>

              <div class="border-1 border-scv rounded p-1 d-flex align-items-center gap-2 md:w-2/3">
                <b-img
                  src="@/views/pages/writing-phases/components/images/doll.svg"
                  class="d-none d-md-block"
                />
                <div>
                  <p>Palavra correta: <b>BONECA</b></p>
                  <p>A criança poderá escrever: <b>OEA ou OEK</b></p>
                </div>
              </div>
            </div>
          </b-alert>

          <b-alert show variant="sal">
            <div class="alert-body text-body font-weight-normal">
              <h6 class="font-bold text-sal">
                <span
                  class="material-symbols-outlined align-text-bottom"
                  style="font-variation-settings: 'FILL' 1; font-size: 16px"
                >
                  circle
                </span>
                SILÁBICA-ALFABÉTICA
              </h6>
              <p class="font-weight-normal">
                Nessa fase a criança começa a fazer a transição da leitura por sílabas para a
                leitura por letras e estabelece uma relação mais precisa entre os sons da fala e as
                letras do alfabeto.
              </p>
              <b>Características:</b>
              <ul
                class="list-style-icons mb-50"
                style="list-style-type: disc; list-style-position: outside"
              >
                <li>
                  Momento crucial da alfabetização, transitando entre a compreensão da escrita como
                  representação de sílabas e a descoberta da correspondência entre sons e letras;
                </li>
                <li>Há uma mistura de letras isoladas com sílabas;</li>
                <li>
                  Identifica que a sílaba pode ser formada por uma consoante e uma voga, mas ainda
                  representa uma das sílabas com apenas uma letra, havendo intermitência na
                  representação das sílabas numa mesma palavra.
                </li>
              </ul>

              <div class="border-1 border-sal rounded p-1 d-flex align-items-center gap-2 md:w-2/3">
                <b-img
                  src="@/views/pages/writing-phases/components/images/ice-cream.svg"
                  class="d-none d-md-block"
                />
                <div>
                  <p>Palavra correta: <b>SORVETE</b></p>
                  <p>A criança poderá escrever: <b>SOVT ou SVTI</b></p>
                </div>
              </div>
            </div>
          </b-alert>

          <b-alert show variant="alf">
            <div class="alert-body text-body font-weight-normal">
              <h6 class="font-bold text-alf">
                <span
                  class="material-symbols-outlined align-text-bottom"
                  style="font-variation-settings: 'FILL' 1; font-size: 16px"
                >
                  circle
                </span>
                ALFABÉTICA
              </h6>
              <p class="font-weight-normal">
                Nessa fase a leitura costuma ser por decodificação, não conservando o conteúdo que
                está lendo.
              </p>
              <b>Características:</b>
              <ul
                class="list-style-icons mb-50"
                style="list-style-type: disc; list-style-position: outside"
              >
                <li>A escrita se torna mais convencional;</li>
                <li>
                  A construção da palavra é realizada considerando a formação da sílaba, consoante
                  acompanhada de vogal;
                </li>
                <li>Começa a percepção que uma sílaba também pode ser acompanhada</li>
                <li>por 2 consoantes e uma vogal;</li>
                <li>É possível apresentar dificuldades em relação ao espaçamento entre palavras</li>
                <li>Há correspondência entre letras e sons.</li>
              </ul>

              <div class="border-1 border-alf rounded p-1 d-flex align-items-center gap-2 md:w-2/3">
                <b-img
                  src="@/views/pages/writing-phases/components/images/lollipop.svg"
                  class="d-none d-md-block"
                />
                <div>
                  <p>Palavra correta: <b>PIRULITO</b></p>
                  <p>A criança poderá escrever: <b>PIRULITO</b></p>
                </div>
              </div>
            </div>
          </b-alert>

          <b-alert show variant="ort">
            <div class="alert-body text-body font-weight-normal">
              <h6 class="font-bold text-ort">
                <span
                  class="material-symbols-outlined align-text-bottom"
                  style="font-variation-settings: 'FILL' 1; font-size: 16px"
                >
                  circle
                </span>
                ORTOGRÁFICA
              </h6>
              <p class="font-weight-normal">
                Nesta etapa, há ampliação da capacidade leitora, o aluno consegue ler com mais
                fluidez, sendo capaz de conservar a compreensão do que é lido.
              </p>
              <b>Características:</b>
              <ul
                class="list-style-icons mb-50"
                style="list-style-type: disc; list-style-position: outside"
              >
                <li>Domínio das regras ortográficas, uso de acentuação e pontuação;</li>
                <li>A escrita se aproxima da norma culta da língua.</li>
              </ul>

              <div class="border-1 border-ort rounded p-1 d-flex align-items-center gap-2 md:w-2/3">
                <b-img
                  src="@/views/pages/writing-phases/components/images/dog-face.svg"
                  class="d-none d-md-block"
                />
                <div>
                  <p>Palavra correta: <b>CACHORRO</b></p>
                  <p>A criança poderá escrever: <b>CACHORRO</b></p>
                </div>
              </div>
            </div>
          </b-alert>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script setup>
import BadgeStatus from '@/components/badge/BadgeStatus.vue'
import CellStatus from '@/components/badge/CellStatus.vue'
import { ref, onUnmounted, getCurrentInstance } from 'vue'

const props = defineProps({
  showTextMore: {
    type: Boolean,
    default: false,
  },
})

const sidebarActive = ref(false)

const changeSidebar = (val = !sidebarActive.value) => {
  sidebarActive.value = val
}

const vm = getCurrentInstance().proxy

vm.$bus.on('changeSidebar', () => {
  changeSidebar()
})

onUnmounted(() => {
  vm.$bus.off('changeSidebar')
})
</script>