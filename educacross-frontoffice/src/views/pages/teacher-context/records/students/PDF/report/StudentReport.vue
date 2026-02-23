<template>
  <div>
    <section
      v-for="(student, index) in students"
      :key="index"
      :data-fileName="getPDFName(student)"
      class="page print-component"
    >
      <!-- start header -->
      <div class="d-flex flex-row justify-between items-center">
        <div class="d-inline-flex">
          <b-img src="@/assets/images/pdf/report/logo/report-logo.png" class="image-logo" />
          <span
            class="font-extrabold whitespace-normal text-15 text-black w-48 vertical-align-middle"
            >Boletim de
            {{
              moduleId === ModulesEnum.CustomMissions ? 'Missões da Escola' : 'Sistema de ensino'
            }}</span
          >
        </div>
        <div class="border-item p-1 b-round-12">
          <b-img :src="logo" />
        </div>
      </div>
      <div class="d-flex justify-between mt-1">
        <div class="d-flex flex-column">
          <span class="font-extrabold text-black text-12">
            {{ student.studentName }}
          </span>
          <span class="h6 text-12 mb-0 text-black d-flex align-items-center">
            {{ student.className }} -
            <span class="report-badge">{{ student.serieName }} </span>
            <b-badge pill :variant="`${student.isRegular ? 'light-success' : 'light-warning'}`">
              {{ student.isRegular ? 'Turma Regular do Aluno' : 'Turma Extra do Aluno' }}
            </b-badge>
          </span>
          <span class="h6 text-12 mb-0 text-black">{{ student.institutionName }}</span>
        </div>
        <div class="text-right d-flex flex-column">
          <span class="text-12 mb-0 text-black font-extrabold text-capitalize">{{ month }}</span>
          <span :class="disciplineType(student.subjectId)" class="text-12 mb-0 font-extrabold">
            {{ disciplineName(student.subjectId) }}
          </span>
        </div>
      </div>
      <!-- end header -->

      <!-- start main cards -->
      <div>
        <div class="cards-grid">
          <div class="data-card" :class="student.subjectId === 3 ? 'child-data-card' : ''">
            <div class="img-type">
              <img src="@/assets/images/pdf/report/card/progress.svg" alt="Progresso Icone" />
            </div>
            <div class="text">
              <p v-if="!average" class="percent">{{ student.progress }}%</p>
              <div v-else class="average">
                <div class="avg-student">
                  <p class="avg-s-percent">{{ student.progress }}%</p>
                  <p class="avg-s-text">média do <strong class="font-extrabold">aluno</strong></p>
                </div>
                <div class="avg-class">
                  <p class="avg-c-percent">{{ student.progressClass }}%</p>
                  <p class="avg-c-text">média da <strong class="font-extrabold">turma</strong></p>
                </div>
              </div>
              <p class="title">Jogos Finalizados</p>
              <p class="subtitle">
                Média geral de finalização que o aluno obteve em todos os jogos
              </p>
            </div>
          </div>

          <div class="data-card" :class="student.subjectId === 3 ? 'd-none' : ''">
            <div class="img-type">
              <img src="@/assets/images/pdf/report/card/perfomance.svg" alt="Desempenho Icone" />
            </div>
            <div class="text">
              <p v-if="!average" class="percent">{{ student.performance }}%</p>
              <div v-else class="average">
                <div class="avg-student">
                  <p class="avg-s-percent">{{ student.performance }}%</p>
                  <p class="avg-s-text">média do <strong class="font-extrabold">aluno</strong></p>
                </div>
                <div class="avg-class">
                  <p class="avg-c-percent">{{ student.performanceClass }}%</p>
                  <p class="avg-c-text">média da <strong class="font-extrabold">turma</strong></p>
                </div>
              </div>
              <p class="title">Média de Desempenho</p>
              <p class="subtitle">Média geral que o aluno obteve de todas as missões realizadas</p>
            </div>
          </div>

          <div class="data-card">
            <div class="img-type">
              <img src="@/assets/images/pdf/report/card/finalized.svg" alt="Finalizada Icone" />
            </div>
            <div class="text">
              <p class="percent">
                {{ student.totalGuideFinished
                }}<span class="font-bold text-black text-14 margin-de">de</span
                >{{ student.totalGuides }}
              </p>
              <p class="title">Missões Finalizadas</p>
              <p class="subtitle">
                Número total de missões pelo número total de missões enviadas pelo professor
              </p>
            </div>
          </div>

          <div class="data-card">
            <div class="img-type">
              <img src="@/assets/images/pdf/report/card/games.svg" alt="Jogos Icone" />
            </div>
            <div class="text">
              <p v-if="!average" class="percent">
                {{ student.activitiesPlayed }}
              </p>
              <div v-else class="average">
                <div class="avg-student">
                  <p class="avg-s-percent">
                    {{ student.activitiesPlayed }}
                  </p>
                  <p class="avg-s-text">média do <strong class="font-extrabold">aluno</strong></p>
                </div>
                <div class="avg-class">
                  <p class="avg-c-percent">
                    {{ student.activitiesPlayedClass }}
                  </p>
                  <p class="avg-c-text">média da <strong class="font-extrabold">turma</strong></p>
                </div>
              </div>
              <p class="title">Jogos Acessados</p>
              <p class="subtitle">São todos os jogos que foram acessados dentro da Educacross</p>
            </div>
          </div>

          <div class="data-card">
            <div class="img-type">
              <img
                src="@/assets/images/pdf/report/card/apprenticeship.svg"
                alt="Aprendizado Icone"
              />
            </div>
            <div class="text">
              <p v-if="!average" class="percent">
                {{ formattedTime(student.totalTime, '0s') }}
              </p>
              <div v-else class="average">
                <div class="avg-student">
                  <p class="avg-s-percent-class">
                    {{ formattedTime(student.totalTime, '0s') }}
                  </p>
                  <p class="avg-s-text">média do <strong class="font-extrabold">aluno</strong></p>
                </div>
                <div class="avg-class">
                  <p class="avg-c-percent-class">
                    {{ formattedTime(student.totalTimeClass, '0s') }}
                  </p>
                  <p class="avg-c-text">média da <strong class="font-extrabold">turma</strong></p>
                </div>
              </div>
              <p class="title">Tempo de Aprendizado</p>
              <p class="subtitle">
                Tempo total que o aluno ficou conectado na plataforma aprendendo
              </p>
            </div>
          </div>

          <div class="data-card">
            <div class="img-type">
              <img src="@/assets/images/pdf/report/card/challenge.svg" alt="Desafios Icone" />
            </div>
            <div class="text">
              <p v-if="!average" class="percent">
                {{ student.challangesDone }}
              </p>
              <div v-else class="average">
                <div class="avg-student">
                  <p class="avg-s-percent">
                    {{ student.challangesDone }}
                  </p>
                  <p class="avg-s-text">média do <strong class="font-extrabold">aluno</strong></p>
                </div>
                <div class="avg-class">
                  <p class="avg-c-percent">
                    {{ student.challangesDoneClass }}
                  </p>
                  <p class="avg-c-text">média da <strong class="font-extrabold">turma</strong></p>
                </div>
              </div>
              <p class="title">Desafios realizados</p>
              <p class="subtitle">Números de rodadas, ou seja, desafios concluídos, em cada jogo</p>
            </div>
          </div>
        </div>
      </div>
      <!-- end main cards -->

      <!-- start averages -->
      <div class="mt-2">
        <h3
          v-if="student.subjectId === 1 || student.subjectId === 4"
          class="text-center font-extrabold text-15"
        >
          Desempenho por Unidade Temática
        </h3>
        <h3 v-else-if="student.subjectId === 2" class="text-center font-extrabold text-15">
          Desempenho por Campo de Atuação
        </h3>
        <h3 v-else class="text-center font-extrabold text-15">
          Desempenho por Campos de Experiência
        </h3>

        <div class="d-flex justify-between mt-2">
          <div v-for="(item, index) in bnccKeys" :key="index" class="average-card">
            <div :class="!average ? 'average-card-border' : 'class-average-card-border'">
              <span v-if="!average" class="text-black">{{
                getKlownledgeAxis(student.knowledgesAxis, item.value).performance
              }}</span>
              <div v-else>
                <span class="text-black text-center font-extrabold text-16 d-block">{{
                  getKlownledgeAxis(student.knowledgesAxis, item.value).performance
                }}</span>
                <span class="text-black font-medium text-7 d-block text-center"
                  >média do <strong class="font-extrabold">aluno</strong></span
                >
                <div class="separator-botton" />
                <span
                  class="text-9 text-black font-extrabold d-block text-center"
                  style="margin-top: -3px"
                  >{{
                    getKlownledgeAxis(student.knowledgesAxis, item.value).performanceClass
                  }}</span
                >
                <span class="text-7 text-black text-center d-block font-medium"
                  >média da <strong class="font-extrabold">turma</strong></span
                >
              </div>
            </div>
            <img
              :src="
                imgAxis(
                  item.key,
                  getKlownledgeAxis(student.knowledgesAxis, item.value).activities,
                  student.subjectId,
                )
              "
              alt="BNCC Icone"
              :class="average ? 'printIcon' : 'printIcon'"
            />
            <div class="average-description">
              <span class="text-10 font-bold text-black d-block">{{ item.value }}</span>
              <span class="text-10 font-bold d-block">
                {{ getKlownledgeAxis(student.knowledgesAxis, item.value).activities }}
                jogos
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- end averages -->

      <!-- start footer -->
      <!-- <footer class="text-9 mt-4">
        <img src="./footer-info.svg" alt="" />
        <p class="text-center mb-0 font-medium text-spacing">
          Tem alguma dúvida? Entre em contato com o suporte em
          <a
            href="suporte.educacross.com.br"
            target="_blank"
            class="text-color-base"
            style="text-decoration: underline"
            >suporte.educacross.com.br</a
          >
        </p>
      </footer> -->
      <!-- end footer -->
    </section>
  </div>
</template>

<script setup>
import { ModulesEnum } from '@/consts/admin-context/enums/modules.js'
import BNCC_AXIS_NAME from '@/consts/teacher-context/BNCCAxisName'
import { SubjectEnum } from '@/consts/teacher-context/enums/subjectEnum'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router/composables'
import { formattedTime } from '@/filters/filters'

const STYLE_ID = 'student-report-page-style'

const injectPageStyle = () => {
  const existingStyles = document.querySelectorAll('[id$="-page-style"]')
  existingStyles.forEach(style => style.remove())

  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = '@page { size: 157.42mm 222.77mm; margin: 0; }'
  document.head.appendChild(style)
}

const removePageStyle = () => {
  const style = document.getElementById(STYLE_ID)
  if (style) style.remove()
}

onMounted(() => {
  injectPageStyle()
})

onUnmounted(() => {
  removePageStyle()
})

// Dynamically import all institution-missions icons
const missionIcons = import.meta.glob(
  '@/assets/images/teacher-context/school-context/institution-missions/icons/*',
  { eager: true },
)

const props = defineProps({})

const emit = defineEmits(['setInfos'])

const average = ref(false)
const subjectId = ref(null)
const students = ref([])
const month = ref('')
const moduleId = ref(null)
const pdfNamesHash = ref(new Set())

const route = useRoute()

const logo = computed(() => getWhitelabelConfig('LogoStudentCard'))

const bnccKeys = computed(() => {
  const bncc = BNCC_AXIS_NAME(subjectId.value)
  const keys = Object.keys(bncc)
  return keys.map(key => ({ key, value: bncc[key] }))
})

const disciplineName = value => {
  if (value === 1) {
    return 'Matemática'
  }
  if (value === 2) {
    return 'Língua Portuguesa'
  }
  if (value === 3) {
    return 'Educação Infantil'
  }
  return ''
}

const getKlownledgeAxis = (knowledsgeAxis, value) => {
  let axis = null

  if (knowledsgeAxis && knowledsgeAxis.length > 0) {
    axis = knowledsgeAxis.find(item => item.tag.toLowerCase() === value.toLowerCase())
  }

  if (!axis) {
    return {
      activities: '0',
      performance: '-',
      performanceClass: '-',
    }
  }

  if (typeof axis.performance === 'number') {
    axis.performance = `${axis.performance}%`
    axis.performanceClass = `${axis.performanceClass}%`
  }

  return axis
}

const disciplineType = value => {
  if (value === 1) {
    return 'math'
  }

  if (value === 2) {
    return 'portuguese'
  }

  if (value === 3) {
    return 'child-ed'
  }

  if (value === 4) {
    return 'math'
  }

  return ''
}

const imgAxis = (axis, qtd, subjectIdVal) => {
  let subjectName = null

  Object.entries(SubjectEnum).forEach(subject => {
    if (subject[1] === subjectIdVal) {
      subjectName = subject[0]
    }
  })

  if (!subjectName) return ''

  const imagePath = `/src/assets/images/teacher-context/school-context/institution-missions/icons/${subjectName}-${
    qtd === 0 ? 'disabled' : 'enabled'
  }-${axis}.png`
  return missionIcons[imagePath]?.default || ''
}

const getPDFName = student => {
  let baseName = `${student.studentName}-${student.className}`

  if (pdfNamesHash.value.has(baseName)) {
    let counter = 1
    let newName = `${baseName}(${counter})`

    while (pdfNamesHash.value.has(newName)) {
      counter++
      newName = `${baseName}(${counter})`
    }

    baseName = newName
  }

  pdfNamesHash.value.add(baseName)
  return baseName
}

const processData = data => {
  return data.map(el => {
    el.performance = parseFloat(el.performance.toFixed(1))
    el.performanceClass = parseFloat(el.performanceClass.toFixed(1))

    el.progress = parseFloat(el.progress.toFixed(1))
    el.progressClass = parseFloat(el.progressClass.toFixed(1))

    el.knowledgesAxis = el.knowledgesAxis.map(i => {
      const performance = +i.performance
      const performanceClass = +i.performanceClass

      i.performance = `${parseFloat(performance.toFixed(1))}%`
      i.performanceClass = `${parseFloat(performanceClass.toFixed(1))}%`

      return i
    })

    return el
  })
}

const formattedTimeFn = formattedTime

const created = () => {
  const { average: avg, subjectId: subjId, month: m, students: studentsProp, pdfTitle, module } = route.params

  average.value = avg
  subjectId.value = subjId
  month.value = m
  moduleId.value = module
  students.value = processData(studentsProp)

  emit('setInfos', {
    pdfTitle,
    massPdf: studentsProp.length > 1,
    students: studentsProp,
    selector: '.page',
  })
}

created()
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  .page {
    max-width: 595px;
    min-height: 842px;
    padding: 30px 30px 20px 30px;
    margin: 10mm auto;
    border: 1px #d3d3d3 solid;
    background: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  .text-15 {
    font-size: 15px;
  }

  .text-14 {
    font-size: 14px;
  }

  .text-10 {
    font-size: 10px;
  }

  .text-9 {
    font-size: 9px;

    span {
      border: 0.5px solid #d3d3d3;
      border-radius: 10px;
      padding: 6px 10px;

      img {
        margin-right: 7px;
      }
    }
  }

  .margin-de {
    margin: 0 5px;
  }

  .text-12 {
    font-size: 12px;
  }

  .border-item {
    border: 0.5px solid #dbdbdb;
  }

  .b-round-12 {
    border-radius: 12px;
  }

  .text-spacing {
    letter-spacing: 0px;
  }

  .math {
    color: #00bdb8;
  }
  .portuguese {
    color: #fd7e14;
  }
  .child-ed {
    color: #7367f0;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin-top: 24px;
  }

  .data-card {
    border-radius: 18px;
    border: 0.5px solid #dbdbdb;

    display: flex;
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-right: 22px;
  }

  .img-type {
    height: 100px;

    & > img {
      width: 140px;
      height: 100%;
    }
  }

  .title {
    font-weight: 600;
    font-size: 12px;
    color: #000;
    margin-bottom: 0;
    text-align: center;
    line-height: normal;
    white-space: nowrap;
  }

  .subtitle {
    font-weight: 400;
    font-size: 7px;
    color: #000;
    margin-bottom: 0;
    text-align: center;
    line-height: 1.5;

    margin-top: 4px;
  }

  .percent {
    font-size: 28px;
    font-weight: 900;
    color: #000;
    text-align: center;
    margin-bottom: 0;
  }

  .average-card {
    position: relative;
    width: 96px;
  }

  .average-card-border {
    border: #dbdbdb 0.5px solid;
    border-radius: 18px;

    width: 96px;
    height: 76px;

    display: flex;
    justify-content: center;
    align-items: center;

    & > span {
      font-size: 24px;
      font-weight: 900;
      text-align: center;
      display: block;
    }
  }

  .footer-report {
    position: relative;
    margin-top: auto;
  }

  .printIcon {
    width: 33px;
    height: 33px;

    position: absolute;
    margin-left: calc(50% - 33px / 2);
    margin-top: calc(-33px / 2);
  }

  .average-description {
    margin-top: 24px;

    text-align: center;
  }

  .average {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .avg-s-percent {
    font-size: 16px;
    font-weight: 900;
    color: #000;

    margin-bottom: 0;

    border-right: 0.5px solid #dbdbdb;
    padding-right: 5px;
  }

  .avg-c-percent {
    font-size: 10px;
    font-weight: 900;
    color: #000;

    margin-bottom: 0;

    padding-left: 5px;
  }

  .avg-s-percent-class {
    font-size: 16px;
    font-weight: 900;
    color: #000;

    margin-bottom: 0;

    border-right: 0.5px solid #dbdbdb;

    padding-right: 5px;

    white-space: nowrap;
  }

  .avg-c-percent-class {
    font-size: 10px;
    font-weight: 900;
    color: #000;

    margin-bottom: 0;

    padding-left: 5px;
  }

  .avg-s-text {
    font-size: 7px;
    font-weight: 500;
    color: #000;

    margin-bottom: 0;

    padding-right: 5px;
  }

  .avg-c-text {
    font-size: 7px;
    font-weight: 500;
    color: #000;

    margin-bottom: 0;

    padding-left: 5px;

    white-space: nowrap;
  }

  .class-average-card-border {
    border: #dbdbdb 0.5px solid;
    border-radius: 18px;

    height: 91px;
    width: 96px;
  }

  .text-16 {
    font-size: 16px;
  }

  .text-7 {
    font-size: 7px;
  }

  .separator-botton {
    border-bottom: 0.5px solid #dbdbdb;
    width: 36px;

    margin: 8px auto 6px auto;
  }

  .image-logo {
    border: 0.5px solid #dbdbdb;
    border-radius: 12px;

    margin-right: 11px;
  }

  .report-badge {
    display: block;
    padding: 0rem 0.4rem;

    font-size: 12;
    color: #7367f0;
    font-weight: 700;

    border-radius: 10rem;
  }

  .vertical-align-middle {
    vertical-align: middle;
  }

  @media print {
    html,
    body {
      width: 157.42mm;
      height: 222.77mm;
    }

    .page {
      margin: 0;
      border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: auto;
      page-break-inside: avoid;
    }
  }

  .HTMLtoPdf {
    box-shadow: none !important;
    border: 0 !important;
    margin: 0 !important;

    .percent {
      margin-bottom: 10px;
    }

    .average-card-border {
      span {
        margin-bottom: 30px;
      }
    }
  }
</style>