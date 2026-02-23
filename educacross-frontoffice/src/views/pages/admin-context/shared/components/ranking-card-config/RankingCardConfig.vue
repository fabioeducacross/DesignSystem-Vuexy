<template>
  <b-card class="school-ranking">
    <h1 class="school-ranking-title">
      {{ data ? data.name : 'Ranking da Escola' }}
    </h1>
    <hr />
    <b-tabs>
      <b-tab title="Quadro de insígnias">
        <div class="filters-wrapper">
          <b-form class="filters-form" autocomplete="off">
            <b-form-group id="subject-group" class="filters-form-items" label="Turma">
              <ESelect
                v-model="classe"
                class="filter-chooser filter-items"
                label="name"
                :options="classes"
                @input="setConfig"
              >
                <template #noOptions> Nenhuma turma encontrada </template>
              </ESelect>
            </b-form-group>
            <b-form-group id="classes-group" class="filters-form-items" label="Instituição">
              <ESelect
                v-model="institution"
                class="filter-chooser filter-items"
                label="name"
                :options="institutions"
                @input="setConfig"
              >
                <template #noOptions> Nenhuma instituição encontrada </template>
              </ESelect>
            </b-form-group>
            <b-form-group id="dataType-group" class="filters-form-items" :label="whitelabelName">
              <ESelect
                v-model="educa"
                class="filter-chooser filter-items"
                label="name"
                :options="educacross"
                @input="setConfig"
              >
                <template #noOptions> Nenhum dado encontrado </template>
              </ESelect>
            </b-form-group>
          </b-form>
        </div>
      </b-tab>
      <b-tab title="Missões da Escola">
        <div class="filters-wrapper">
          <b-form class="filters-form" autocomplete="off">
            <b-form-group id="subject-group" class="filters-form-items" label="Recado para o aluno">
              <ESelect
                v-model="enable"
                class="filter-chooser filter-items"
                label="name"
                :options="enableOptions"
                @input="setConfig"
              >
                <template #noOptions> Nenhum dado encontrado </template>
              </ESelect>
            </b-form-group>
          </b-form>
        </div>
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script setup>
import ESelect from '@/components/selects/ESelect.vue'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { BCard, BForm, BFormGroup, BTab, BTabs } from 'bootstrap-vue'
import { ref, watch, onMounted } from 'vue'

// Props
const props = defineProps({
  institutionData: { type: Object, default: null, required: false },
  data: { type: Object, default: null, required: false },
})

// Emits
const emit = defineEmits(['classConfig', 'schoolConfig'])

// Reactive state
const classe = ref({
  id: null,
  name: 'Selecione um tipo de ranking',
})
const classes = ref([
  { id: 0, name: 'Individual' },
  { id: 1, name: 'Absoluto' },
  { id: 2, name: 'Relativo' },
])

const institution = ref({
  id: null,
  name: 'Selecione um tipo de ranking',
})
const institutions = ref([
  { id: 0, name: 'Individual' },
  { id: 1, name: 'Absoluto' },
  { id: 2, name: 'Relativo' },
])

const educa = ref({
  id: null,
  name: 'Selecione um tipo de ranking',
})
const educacross = ref([
  { id: 0, name: 'Individual' },
  { id: 1, name: 'Absoluto' },
  { id: 2, name: 'Relativo' },
])

const enable = ref({
  id: null,
  name: null,
})
const enableOptions = ref([
  { id: 0, name: 'Habilitado' },
  { id: 1, name: 'Desabilitado' },
])

const whitelabelName = ref('')

// Methods
const getWhitelabelInfos = () => {
  whitelabelName.value = getWhitelabelConfig('name')
}

const setConfig = () => {
  if (props.data) {
    emit('classConfig', {
      id: props.data.classId,
      typeRankingClass: classe.value.id,
      typeRankingInstitution: institution.value.id,
      typeRankingEducaCross: educa.value.id,
      enableMessageGuide: enable.value.id === 0,
    })
  } else {
    emit('schoolConfig', {
      typeRankingClass: classe.value.id,
      typeRankingInstitution: institution.value.id,
      typeRankingEducaCross: educa.value.id,
      enableMessageGuide: enable.value.id === 0,
    })
  }
}

const handleCreateSelectByData = () => {
  const foundClasse = classes.value.find(cl => cl.id === props.data.typeRankingClass)
  if (foundClasse) classe.value = foundClasse

  const foundInstitution = institutions.value.find(inst => inst.id === props.data.typeRankingInstitution)
  if (foundInstitution) institution.value = foundInstitution

  const foundEduca = educacross.value.find(edc => edc.id === props.data.typeRankingEducaCross)
  if (foundEduca) educa.value = foundEduca

  enable.value = props.data.enableMessageGuide ? enableOptions.value[0] : enableOptions.value[1]
}

const handleCreateSelectByInstitution = () => {
  if (props.institutionData && (props.institutionData.typeRankingClass || props.institutionData.typeRankingClass === 0)) {
    const foundClasse = classes.value.find(cl => cl.id === props.institutionData.typeRankingClass)
    if (foundClasse) classe.value = foundClasse
  }
  if (props.institutionData && (props.institutionData.typeRankingInstitution || props.institutionData.typeRankingInstitution === 0)) {
    const foundInstitution = institutions.value.find(inst => inst.id === props.institutionData.typeRankingInstitution)
    if (foundInstitution) institution.value = foundInstitution
  }
  if (props.institutionData && (props.institutionData.typeRankingEducacross || props.institutionData.typeRankingEducacross === 0)) {
    const foundEduca = educacross.value.find(edc => edc.id === props.institutionData.typeRankingEducacross)
    if (foundEduca) educa.value = foundEduca
  }
  if (props.institutionData) {
    enable.value = props.institutionData.enableMessageGuide ? enableOptions.value[0] : enableOptions.value[1]
  }
}

// Watchers
watch(() => props.institutionData, () => {
  handleCreateSelectByInstitution()
})

// Lifecycle
onMounted(() => {
  getWhitelabelInfos()
  if (props.data) {
    handleCreateSelectByData()
  }
  if (props.institutionData) {
    handleCreateSelectByInstitution()
  }
})
</script>

<style lang="scss" scoped>
  .school-ranking-title {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;

    color: #2c2c2c;
  }

  .school-ranking {
    min-width: 48%;
  }

  .filters-form {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-between;
  }

  .filters-form-items {
    flex: 1;
    margin: 0px 5px;
  }

  .filters-wrapper {
    margin-top: 24px;
  }

  .school-ranking-example-content {
    display: flex;
    justify-content: space-between;
  }

  .wrapper-test {
    display: flex;
    flex-wrap: wrap;
    align-content: stretch;
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
