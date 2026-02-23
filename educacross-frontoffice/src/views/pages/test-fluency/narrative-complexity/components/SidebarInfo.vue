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
      v-model="sidebarActive"
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
          <h6 class="mb-0">Sobre Complexidade Narrativa e Perfomance Leitora</h6>

          <span
            class="material-symbols-outlined cursor-pointer"
            style="font-size: 16px"
            @click="changeSidebar(false)"
          >
            close
          </span>
        </div>

        <!-- BODY -->
        <div class="p-2 overflow-y-auto text-justify text-body">
          <h2 class="text-primary">Complexidade Narrativa</h2>
          <p>
            A Complexidade Narrativa informa sobre o desenvolvimento cognitivo dos alunos em relação
            ao seu tempo de escolaridade. Seus resultados são fornecidos na medida de percentil.
          </p>
          <h4 class="text-primary">O que é percentil?</h4>
          <p>
            Percentil é uma medida estatística que indica a posição relativa de um valor dentro de
            um conjunto de dados. Ele mostra a porcentagem de valores que estão abaixo de um
            determinado valor em um conjunto ordenado de dados.
          </p>
          <p>
            Por exemplo, se um valor está no 70º percentil, significa que 70% dos valores do
            conjunto estão abaixo dele, e 30% estão acima. Percentis são amplamente utilizados em
            áreas como estatísticas, avaliação educacional e análise de dados para comparações e
            classificações.
          </p>
          <p class="font-bold">Categorias de resultados em Complexidade Narrativa</p>

          <b-alert variant="primary" show>
            <div class="alert-body">
              <h6 class="font-bold text-primary">ACIMA DO ESPERADO</h6>
              <span class="text-body font-normal"
                >Percentil igual ou maior que 76. O aluno tem excelentes habilidades para narrar
                histórias, compatíveis com o bom desenvolvimento de habilidades leitoras.
              </span>
            </div>
          </b-alert>

          <b-alert variant="success" show>
            <div class="alert-body">
              <h6 class="font-bold text-success">DENTRO DO ESPERADO</h6>
              <span class="text-body font-normal"
                >Percentil igual ou maior que 26 e menor que 76. O aluno narra histórias com
                habilidades dentro da média, podendo desenvolver boas habilidades leitoras se
                estimulado.
              </span>
            </div>
          </b-alert>

          <b-alert variant="danger" show>
            <div class="alert-body">
              <h6 class="font-bold text-danger">ABAIXO DO ESPERADO</h6>
              <span class="text-body font-normal"
                >Percentil menor que 26. O aluno tem dificuldades em narrar histórias bem
                estruturadas e possui risco de ter dificuldades em desenvolver habilidades leitoras.
              </span>
            </div>
          </b-alert>
          <div v-if="showPercentilePerformance">
            <h2 class="text-primary">Índices Preditivos de Performance Leitora</h2>
            <p>
              Índices preditivos permitem uma visão geral ou individual
              <span class="font-bold"
                >dos alunos com probabilidade de baixa performance leitora.</span
              >
              Seus resultados são divididos em valores de Compreensão e Decodificação.
            </p>

            <h4 class="text-primary">O que é Compreensão?</h4>
            <p>
              Um dos índices preditivos do teste, que se refere à habilidade de interpretar textos
              lidos
            </p>

            <p class="font-bold">Categorias de resultados preditivos em Compreensão</p>
            <b-alert variant="success" show>
              <div class="alert-body">
                <h6 class="font-bold text-success">BAIXA PROBABILIDADE</h6>
                <span class="text-body font-normal"
                  >Percentil igual ou maior que 26. O aluno corre um baixo risco de ter dificuldades
                  em interpretar textos lidos futuramente.
                </span>
              </div>
            </b-alert>

            <b-alert variant="orange" show>
              <div class="alert-body">
                <h6 class="font-bold text-orange">MÉDIA PROBABILIDADE</h6>
                <span class="text-body font-normal"
                  >Percentil igual ou maior que 11 e menor que 26. O aluno corre um médio risco de
                  ter dificuldades em interpretar textos lidos futuramente.
                </span>
              </div>
            </b-alert>

            <b-alert variant="danger" show>
              <div class="alert-body">
                <h6 class="font-bold text-danger">ALTA PROBABILIDADE</h6>
                <span class="text-body font-normal"
                  >Percentil menor que 11. O aluno corre um alto risco de ter dificuldades em
                  interpretar textos lidos futuramente.
                </span>
              </div>
            </b-alert>

            <h4 class="text-primary">O que é Decodificação?</h4>
            <p>
              Um dos índices preditivos do teste, que se refere à habilidade de lidar com a relação
              grafema x fonema.
            </p>

            <p class="font-bold">Categorias de resultados preditivos em Decodificação</p>
            <b-alert variant="success" show>
              <div class="alert-body">
                <h6 class="font-bold text-success">BAIXA PROBABILIDADE</h6>
                <span class="text-body font-normal"
                  >Percentil igual ou maior que 26. O aluno corre um baixo risco de ter dificuldades
                  em lidar com a relação grafema x fonema.
                </span>
              </div>
            </b-alert>

            <b-alert variant="orange" show>
              <div class="alert-body">
                <h6 class="font-bold text-orange">MÉDIA PROBABILIDADE</h6>
                <span class="text-body font-normal"
                  >Percentil igual ou maior que 11 e menor que 26. O aluno corre um médio risco de
                  ter dificuldades em lidar com a relação grafema x fonema.
                </span>
              </div>
            </b-alert>

            <b-alert variant="danger" show>
              <div class="alert-body">
                <h6 class="font-bold text-danger">ALTA PROBABILIDADE</h6>
                <span class="text-body font-normal"
                  >Percentil menor que 11. O aluno corre um alto risco de ter dificuldades em lidar
                  com a relação grafema x fonema.
                </span>
              </div>
            </b-alert>
          </div>
        </div>
      </template>
    </b-sidebar>
  </div>
</template>

<script setup>
import BadgeStatus from '@/components/badge/BadgeStatus.vue'
import CellStatus from '@/components/badge/CellStatus.vue'
import { ref, computed, onUnmounted, getCurrentInstance } from 'vue'

const props = defineProps({
  showTextMore: {
    type: Boolean,
    default: true,
  },
  showPercentilePerformance: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:showPercentilePerformance'])

const ISidebarActive = ref(false)
const sidebarActive = computed({
  get() {
    return ISidebarActive.value
  },
  set(val) {
    ISidebarActive.value = val
    emit('update:showPercentilePerformance', val)
  },
})

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

<style lang="scss">
  .table-light-success {
    background-color: #e5f8ee !important;
  }
</style>