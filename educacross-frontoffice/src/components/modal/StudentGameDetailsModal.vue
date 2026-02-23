<template>
  <b-modal
    v-if="value"
    id="student-detail-modal"
    ref="studentDetailModal"
    :visible="value"
    content-class="shadow "
    modal-class="d-flex flex-column justify-content-center"
    title="Detalhes do aluno no jogo"
    hide-footer
    scrollable
    static
    size="xl"
    @close="closeModal"
    @hide="closeModal"
  >
    <section>
      <b-skeleton-wrapper :loading="isLoading" class="w-100 px-1">
        <template #loading>
          <div class="h-100">
            <b-row class="match-height h-50">
              <b-col cols="12">
                <b-row>
                  <b-col>
                    <b-row>
                      <b-col cols="6">
                        <b-skeleton
                          type="card"
                          height="100px"
                          class="w-100 rounded mb-1"
                        ></b-skeleton>
                      </b-col>
                      <b-col cols="6">
                        <b-skeleton
                          type="card"
                          height="100px"
                          class="w-100 rounded mb-1"
                        ></b-skeleton>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </div>
        </template>
        <b-row align-v="center">
          <b-col cols="12" sm="12" md="6">
            <div class="d-flex align-items-center gap-4 mb-1">
              <img class="modal-game-image" :src="data.imageUrl" alt="" />
              <div class="text-left">
                <h4 class="font-normal">{{ data.name }}</h4>
                <span class="d-block text-primary">
                  {{ formatNumber(data.challengesDone) }} desafios realizados
                </span>
                <span class="text-primary">
                  {{ formatNumber(data.attempts) }} tentativas de jogo
                </span>
              </div>
            </div>
          </b-col>
          <b-col cols="12" sm="12" md="6">
            <div class="text-right">
              <span>
                Acompanhe a evolução de
                <span class="font-bold text-primary">{{ studentName }}</span> nesse jogo.
              </span>
            </div>
          </b-col>
        </b-row>
      </b-skeleton-wrapper>

      <b-skeleton-table
        :columns="tableColumns.length"
        :rows="5"
        :class="{ 'd-none': !isLoading }"
      />
      <b-table
        ref="refListTable"
        :class="{ 'd-none': isLoading }"
        :fields="tableColumns"
        :items="data.activityAttempt"
        class="position-relative border rounded"
        thead-tr-class="thead-row"
        tbody-tr-class="tbody-row"
        show-empty
        responsive
        primary-key="id"
      >
        <template #head="item">
          <div
            v-b-tooltip.html
            :title="$t(item.field.tooltip)"
            class="d-flex align-items-center gap-1 font-weight-bolder text-uppercase"
          >
            {{ $t(item.label) }}
            <span
              v-if="item.field.tooltip"
              class="material-symbols-outlined head-icon-info"
              style="font-size: 16px"
            >
              info
            </span>
          </div>
        </template>
        <template #cell(attempt)="item">
          <span class="font-bold">{{ item.attempt }}</span>
        </template>
        <template #cell(date)="item">
          <span>{{ item.date | formattedDate }}</span>
        </template>
        <template #cell(hits)="item">
          <span class="text-success">{{ item.hits }}</span>
        </template>
        <template #cell(errors)="item">
          <span class="text-danger">{{ item.errors }}</span>
        </template>
        <template #cell(finish)="item">
          <b-badge pill :variant="item.finish ? 'light-success' : 'light-danger'">
            <span>
              {{ item.finish ? 'Concluído' : 'Não concluído' }}
            </span>
          </b-badge>
        </template>
        <template #empty>
          <div class="d-flex flex-column align-items-center">
            <b-img src="@/assets/images/belinha/confusion.svg" class="mb-1" />
            <span class="text-center text-primary font-bold" v-html="$t(emptyText)"></span>
          </div>
        </template>
      </b-table>
    </section>
  </b-modal>
</template>

<script setup>
import { ref } from 'vue'
import ListTableLocalSorting from '@/components/table/ListTableLocalSorting.vue'
import { formatNumber, formattedTime } from '@/filters/filters'

const props = defineProps({
  value: {
    type: Boolean,
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
  data: {
    type: Object,
  },
  studentName: {
    type: String,
  },
})

const emit = defineEmits(['input'])

const emptyText = ref('noInformationFound')

const closeModal = () => {
  emit('input', false)
}

const tableColumns = ref([
  {
    key: 'attempt',
    label: 'TENTATIVA',
    sortable: true,
    formatter: value => formatNumber(value),
  },
  {
    key: 'date',
    label: 'ÚLTIMO ACESSO',
    sortable: true,
  },
  {
    key: 'hits',
    label: 'ACERTOS',
    sortable: true,
    formatter: value => formatNumber(value),
  },
  {
    key: 'errors',
    label: 'ERROS',
    sortable: true,
    formatter: value => formatNumber(value),
  },
  {
    key: 'finish',
    label: 'STATUS',
    sortable: true,
  },
  {
    key: 'totalTime',
    label: 'TEMPO INVESTIDO',
    sortable: true,
    formatter: value => formattedTime(value),
  },
])
</script>

<style lang="scss" scoped>
.modal-game-image {
  width: 95px;
  height: 95px;
}
</style>