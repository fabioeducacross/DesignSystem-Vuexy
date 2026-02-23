<template>
  <b-card class="">
    <b-row>
      <!-- Per Page -->
      <b-col
        cols="12"
        md="auto"
        class="d-flex flex-column flex-md-row align-items-center justify-content-start mb-1 mb-md-0 gap-1"
      >
        <label>{{ $t('show') }}</label>
        <ESelect
          :value="perPage"
          :options="[
            { id: 5, name: 5 },
            { id: 10, name: 10 },
            { id: 25, name: 25 },
          ]"
          :clearable="false"
          :searchable="false"
          class="per-page-selector d-inline-block"
          @input="onPerPageChange"
        />

        <div style="width: 260px">
          <b-dropdown
            block
            text="Primary"
            variant="outline-primary"
            menu-class=""
            toggle-class="d-flex align-items-center gap-1 py-50"
            @hidden="onCloseFilter"
          >
            <template v-slot:button-content>
              <span class="material-symbols-outlined"> tune </span
              ><span class="mr-auto">Classificar e ordenar</span>
            </template>

            <b-dropdown-item
              v-for="(item, index) in orderBy"
              :key="index"
              :variant="paramsOrderBy === item ? 'primary' : ''"
              @click.capture.stop="filterOrderBy($event, item)"
            >
              {{ orderByDescription[item] }}
            </b-dropdown-item>

            <b-dropdown-divider />
            <div class="w-100 d-flex flex-col gap-4 px-1">
              <div class="d-flex align-items-center">
                <b-form-radio
                  v-model="ascendingRadio"
                  name="ascendingRadio"
                  value="false"
                  class="radio-inline"
                >
                  <span class="text-body">Ordem decrescente</span>
                </b-form-radio>
              </div>
              <div class="d-flex align-items-center">
                <b-form-radio
                  v-model="ascendingRadio"
                  name="ascendingRadio"
                  value="true"
                  class="radio-inline"
                >
                  <span class="text-body">Ordem crescente</span>
                </b-form-radio>
              </div>
            </div>
          </b-dropdown>
        </div>
      </b-col>

      <!-- Search -->
      <b-col cols="12" md>
        <b-row align-h="end" align-v="center">
          <b-col style="max-width: 520px">
            <b-input-group>
              <template v-slot:prepend>
                <b-input-group-text id="searchQueryIcon" @click="$refs.searchQueryRef.$el.focus()">
                  <span class="material-symbols-outlined"> search </span>
                </b-input-group-text>
              </template>
              <b-form-input
                ref="searchQueryRef"
                v-model="search"
                class="d-inline-block searchQuery"
                :placeholder="$t('Pesquisar por conteúdo ou nome do jogo')"
                debounce="500"
                type="text"
              />
            </b-input-group>
          </b-col>
          <b-col cols="12" sm="auto">
            <b-button
              variant="outline-primary"
              size="sm"
              class="w-100 mt-2 mt-sm-0 d-flex align-items-center"
              :class="{ 'cursor-not-allowed': generatingExcel || loading }"
              style="height: 38px"
              :disabled="generatingExcel || loading"
              @click="exportToExcel"
            >
              <div class="d-flex align-items-center justify-content-center gap-2">
                <b-spinner v-if="generatingExcel" small></b-spinner>
                <span
                  v-if="!generatingExcel"
                  class="material-symbols-outlined"
                  style="font-size: 22px"
                >
                  ios_share</span
                >
                <span>Exportar em Excel</span>
              </div>
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import {useStudentDetails} from '@/views/dashboard/studentDetails/useStudentDetails.js'
import { watch, ref } from 'vue'

const {
  perPage,
  search,
  orderBy,
  ascending,
  orderByDescription,
  paramsOrderBy,
  generatingExcel,
  exportToExcel,
  loading,
  resetPage,
} = useStudentDetails()

watch([search], () => {
  resetPage()
})

const onPerPageChange = value => {
  perPage.value = value
  resetPage()
}

const changedFilter = ref(false)

const ascendingRadio = ref(ascending.value)

watch(
  [ascendingRadio],
  () => {
    changedFilter.value = true
    ascending.value = ascendingRadio.value
  },
  { immediate: true },
)

const filterOrderBy = (event, data) => {
  event.preventDefault()
  changedFilter.value = true
  paramsOrderBy.value = data
}

const onCloseFilter = () => {
  if (changedFilter.value) {
    // resetPage()
    changedFilter.value = false
  }
}
</script>

<style lang="scss" scoped>
  .searchQuery {
    border-left: 0;
    padding-left: 0;
  }
  #searchQueryIcon {
    .material-symbols-outlined {
      font-size: 18px;
    }
  }

  .per-page-selector {
    width: 80px;
    min-width: 80px;
  }
</style>
<style lang="scss">
  .hide-unworked-checkbox {
    .custom-control-label {
      line-height: 18px;
    }
  }
</style>