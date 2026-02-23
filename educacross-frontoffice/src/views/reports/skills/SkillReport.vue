<template>
  <section>
    <SkillReportFilter v-model="params" :loading="loading" :loading-export="loadingExport" />

    <b-skeleton-wrapper :loading="loading">
      <template v-slot:loading>
        <div>
          <b-skeleton height="2rem" />
          <AppCollapse>
            <AppCollapseItem v-for="i in 3" :key="`skeleton-${i}`" :title="`${i}`" class="mb-1">
              <template v-slot:header>
                <b-skeleton class="w-100 mr-2 mb-0" height="5rem" />
              </template>
            </AppCollapseItem>
          </AppCollapse>
        </div>
      </template>

      <div v-if="proficiencyData.knowledgeAxes && proficiencyData.knowledgeAxes.length">
        <app-collapse>
          <app-collapse-item
            v-for="proficiency in proficiencyData.knowledgeAxes"
            :key="proficiency.knowledgeAxisId"
            :title="proficiency.knowledgeAxisName"
            body-class="px-0 pb-0 pt-1"
            card-header-class="border-bottom pl-2"
            class="mb-50"
          >
            <template v-slot:header>
              <div class="d-md-flex align-items-center justify-content-between w-100 pr-2">
                <h3 class="text-body mb-md-0">
                  {{ proficiency.knowledgeAxisName }}
                </h3>
                <div>
                  <div class="mb-1">
                    <span class="font-semibold text-body">Rendimento do Ano Escolar</span>
                  </div>
                  <div>
                    <b-progress :max="100" :value="proficiency.performance" height="4px" />
                    <small> {{ $filters.formatNumber(proficiency.performance) }}% </small>
                  </div>
                </div>
              </div>
            </template>
            <div>
              <b-row align-v="center" class="d-none d-md-flex px-2 mb-2">
                <b-col md="6">
                  <p class="font-bold">Habilidade</p>
                </b-col>
                <b-col md="3">
                  <p class="font-bold">Rendimento</p>
                </b-col>
                <b-col md="1">
                  <p class="font-bold text-center">Alunos</p>
                </b-col>
                <b-col md="2">
                  <p class="font-bold text-center">Tempo de aprendizagem</p>
                </b-col>
              </b-row>
              <b-row
                v-for="(descriptor, indexDescriptor) in proficiency.descriptors"
                :key="indexDescriptor"
                :class="{
                  'mb-2 border-bottom': indexDescriptor < proficiency.descriptors.length - 1,
                }"
                class="px-2 pb-2"
              >
                <b-col class="d-md-flex justify-content-center flex-column mb-1 mb-md-0" md="6">
                  <p class="font-bold d-md-none">Habilidade</p>
                  <span class="">
                    {{ descriptor.descriptorName }}
                  </span>
                  <div v-if="$can(ACTION.READ, PERMISSION.GENERAL.TEACHER)" class="mt-2">
                    <router-link
                      :to="{
                        name: 'TeacherSkillReportDetails',
                        params: { id: descriptor.descriptorId },
                        query: { educationalOrganizationId: params.EducationalOrganizationId },
                      }"
                    >
                      Ver detalhes
                    </router-link>
                  </div>
                </b-col>
                <b-col class="d-md-flex justify-content-center flex-column mb-1 mb-md-0" md="3">
                  <p class="font-bold mb-1 d-md-none">Rendimento</p>
                  <div>
                    <b-progress
                      :max="100"
                      :value="descriptor.performance"
                      height="4px"
                      variant="primary"
                    />
                    <small> {{ $filters.formatNumber(descriptor.performance) }}% </small>
                  </div>
                </b-col>
                <b-col
                  class="d-md-flex align-items-center justify-content-center mb-1 mb-md-0"
                  md="1"
                >
                  <div class="text-md-center">
                    <p class="font-bold d-md-none mb-1">Alunos</p>
                    <span class="">
                      {{ $filters.formatNumber(descriptor.students) }}
                    </span>
                  </div>
                </b-col>
                <b-col
                  class="d-md-flex align-items-center justify-content-center mb-1 mb-md-0"
                  md="2"
                >
                  <div class="text-md-center">
                    <p class="font-bold d-md-none">Tempo de aprendizagem</p>
                    <span class="">
                      {{ descriptor.totalTime | formattedTime('Não jogado') }}
                    </span>
                  </div>
                </b-col>
              </b-row>
            </div>
          </app-collapse-item>
        </app-collapse>
      </div>
      <b-card v-else>
        <div class="d-flex flex-column align-items-center">
          <b-img class="mb-1" src="@/assets/images/belinha/confusion.svg" />
          <span class="text-center text-primary font-bold" v-html="$t('noInformationFound')"></span>
        </div>
      </b-card>
    </b-skeleton-wrapper>
    <portal to="fixed-sticky-footer-destination">
      <div class="d-flex justify-content-center bg-white p-1">
        <b-button
          v-b-tooltip.hover="'Exportar em Excel'"
          :disabled="loadingExport"
          class="d-flex align-items-center gap-1"
          variant="outline-primary"
          @click="exportToExcel"
        >
          <span class="material-symbols-outlined" style="font-size: 18px"> ios_share </span>
          Exportar em Excel
        </b-button>
      </div>
    </portal>
  </section>
</template>

<script setup>
import SkillReportFilter from './SkillReportFilter.vue'
import AppCollapse from '@/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@/components/app-collapse/AppCollapseItem.vue'
import { ACTION, PERMISSION } from '@/consts/permissions'
import { formatNumber } from '@/filters/filters'
import ability from '@/libs/acl/ability'
import {
  getNetworkProficiency,
  getNetworkProficiencyExcel,
  getProficiencyData,
} from '@/services/shared/reports/Report.service.js'
import * as Excel from 'exceljs/dist/exceljs.min'
import { saveAs } from 'file-saver'
import { ref, watch } from 'vue'

const loading = ref(true)
const loadingExport = ref(false)
const params = ref({})

const proficiencyData = ref({})

const fetchData = async () => {
  loading.value = true
  proficiencyData.value = {}

  const { SubjectId, EducationalOrganizationId, SerieId, ClassId } = params.value

  if (!SubjectId || !EducationalOrganizationId) {
    loading.value = false
    return
  }

  try {
    let data

    if (ability.can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
      if (!SerieId) {
        loading.value = false
        return
      }
      ;({ data } = await getNetworkProficiency(params.value))
    } else {
      if (!ClassId) {
        loading.value = false
        return
      }
      ;({ data } = await getProficiencyData(params.value))
    }

    proficiencyData.value = data
  } catch (error) {
    proficiencyData.value = {}
  } finally {
    loading.value = false
  }
}

const exportToExcel = async () => {
  loadingExport.value = true
  if (ability.can(ACTION.READ, PERMISSION.GENERAL.NETWORK_MANAGER)) {
    getNetworkProficiencyExcel(params.value)
      .then(response => {
        const fileName = 'Relatório de Habilidades.xlsx'
        saveAs(response.data, fileName)
      })
      .finally(() => {
        loadingExport.value = false
      })
  } else {
    await exportToExcelAdminTeacher()
    loadingExport.value = false
  }
}

const exportToExcelAdminTeacher = async () => {
  let rowCount = 0

  const wb = new Excel.Workbook()

  const ws = wb.addWorksheet('Relatório de habilidades')
  ws.properties.defaultColWidth = 35

  const title1 = ws.addRow([proficiencyData.value.bncc])
  rowCount += 1
  ws.mergeCells(`A${rowCount}:B${rowCount}`)
  title1.font = { bold: true, size: 12 }
  title1.alignment = { horizontal: 'center' }

  proficiencyData.value.knowledgeAxes.forEach(knowledgeAxes => {
    const subtitle1 = ws.addRow(['Eixo', 'Desempenho do eixo'])
    rowCount += 1
    subtitle1.font = { bold: true, size: 12 }
    subtitle1.alignment = { horizontal: 'center' }

    const text1 = ws.addRow([
      knowledgeAxes.knowledgeAxisName,
      `${formatNumber(knowledgeAxes.performance)}%`,
    ])
    text1.alignment = { horizontal: 'center' }
    rowCount += 1

    const subtitleText1 = ws.addRow(['Descritores', 'Desempenho do descritor'])
    rowCount += 1
    subtitleText1.font = { bold: true, size: 12 }
    subtitleText1.alignment = { horizontal: 'center' }

    knowledgeAxes.descriptors.forEach(descriptor => {
      const text2 = ws.addRow([
        descriptor.descriptorName,
        `${formatNumber(descriptor.performance)}%`,
      ])
      text2.alignment = { horizontal: 'center' }
      rowCount += 1
    })

    ws.addRow()
    rowCount += 1
  })
  const buf = await wb.xlsx.writeBuffer()

  saveAs(new Blob([buf]), 'Relatório de habilidades.xlsx')
}

watch([params], () => {
  fetchData()
})

</script>