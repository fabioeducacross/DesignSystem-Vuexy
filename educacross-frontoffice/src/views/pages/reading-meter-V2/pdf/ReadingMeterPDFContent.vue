<template>
  <div class="reading-meter-pdf-pages">
    <b-overlay :show="loading" no-wrap />

    <div
      v-for="(student, studentIndex) in students"
      :key="`student-${studentIndex}`"
      class="student-evaluation"
    >
      <div
        class="pdf-page cover-page print-component page-break"
        :data-fileName="`${student.studentName} - ${evaluationName}`"
      >
        <div class="page-header">
          <img v-if="logoEducacross" :src="logoEducacross" alt="Educacross" class="logo-left" />
          <img v-if="logoInstitution" :src="logoInstitution" alt="Instituição" class="logo-right" />
        </div>

        <div class="cover-content">
          <div class="evaluation-icons">
            <span class="material-symbols-outlined icon icon-words">format_list_numbered</span>
            <span class="material-symbols-outlined icon icon-text">book_6</span>
          </div>

          <h1 class="evaluation-title">{{ evaluationName }}</h1>
          <p class="evaluation-period">Período: {{ formatPeriod }}</p>

          <div class="student-info-box">
            <div class="info-row">
              <span class="label">Escola:</span>
              <span class="value">{{ schoolName }}</span>
            </div>
            <div class="info-row">
              <span class="label">Aluno:</span>
              <span class="value">{{ student.name }}</span>
            </div>
            <div class="info-row">
              <span class="label">Turma:</span>
              <span class="value">
                {{ className }}
                <span class="serie-badge">{{ serieName }}</span>
              </span>
            </div>
          </div>
        </div>

        <div class="page-footer">
          <span class="footer-text">{{ evaluationName }}</span>
          <span class="page-number">1</span>
        </div>
      </div>

      <div
        v-for="(test, testIndex) in readingTests"
        :key="`test-${studentIndex}-${testIndex}`"
        class="test-group"
      >
        <!-- Página Separadora de Teste -->
        <div class="pdf-page test-separator-page print-component page-break">
          <div class="test-separator-header">
            <span class="student-name">{{ student.studentName }}</span>
            <span class="class-info">{{ className }} - {{ serieName }}</span>
          </div>

          <div class="test-separator-content">
            <h1 class="test-separator-title">
              Teste: <span class="test-type-name">{{ getTestTypeName(test.type) }}</span>
            </h1>
          </div>

          <div class="page-footer">
            <span class="footer-text"
              >{{ evaluationName }} - Teste: {{ getTestTypeName(test.type) }}</span
            >
            <span class="page-number">{{
              studentIndex * (readingTests.length * 2) + testIndex * 2 + 2
            }}</span>
          </div>
        </div>

        <!-- Página de Conteúdo do Teste -->
        <div
          class="pdf-page test-page print-component page-break"
          :data-fileName="`${student.studentName} - Teste ${testIndex + 1}`"
        >
          <div class="test-header">
            <span class="student-name">{{ student.studentName }}</span>
            <span class="class-info">{{ className }} - {{ serieName }}</span>
          </div>

          <div class="test-content">
            <div class="test-title-row">
              <div class="test-type">
                <span class="label">Teste:</span>
                <span class="type-name">{{ getTestTypeName(test.type) }}</span>
              </div>
              <span class="word-count">{{ getWordCount(test) }} palavras</span>
            </div>

            <!-- Lista de Palavras -->
            <div v-if="test.type === 2" class="word-list-container">
              <div
                v-for="(row, rowIndex) in getWordRows(test.content)"
                :key="`row-${rowIndex}`"
                class="word-row"
              >
                <span class="row-arrow">→</span>
                <div class="word-row-cells">
                  <div
                    v-for="(word, wordIndex) in row"
                    :key="`word-${rowIndex}-${wordIndex}`"
                    class="word-cell"
                  >
                    {{ word }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Texto Completo -->
            <div v-if="test.type === 1" class="text-content">
              <span class="arrow">→</span>
              <p class="text-paragraph">{{ test.content }}</p>
            </div>
          </div>

          <div class="page-footer">
            <span class="footer-text"
              >{{ evaluationName }} - Teste: {{ getTestTypeName(test.type) }}</span
            >
            <span class="page-number">{{
              studentIndex * (readingTests.length * 2) + testIndex * 2 + 3
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getReadingEvaluationTests } from '@/services/shared/readingFluencyEvaluation/readingFluencyEvaluation.service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters.js'

import { ref, computed, onMounted } from 'vue'

const emit = defineEmits(['setInfos'])

const loading = ref(true)
const students = ref([])
const readingTests = ref([])
const evaluationName = ref('')
const startDate = ref('')
const endDate = ref('')
const logoEducacross = ref('')
const logoInstitution = ref('')
const info = ref({})

// Get filter composables
const { institution, classe, serie } = useFilters()

const schoolName = computed(() => {
  return institution.value?.name || 'Escola não identificada'
})

const className = computed(() => {
  return classe.value?.Name || classe.value?.name || 'Turma não identificada'
})

const serieName = computed(() => {
  return serie.value?.name || classe.value?.SerieName || 'Série não identificada'
})

const formatPeriod = computed(() => {
  if (!startDate.value || !endDate.value) return ''
  const start = new Date(startDate.value).toLocaleDateString('pt-BR')
  const end = new Date(endDate.value).toLocaleDateString('pt-BR')
  return `${start} a ${end}`
})

// Router and route composables for Vue 2.7 migration
import { useRouter, useRoute } from 'vue-router/composables'
const router = useRouter()
const route = useRoute()

const getWhitelabelInfos = () => {
  // Safely get logo from store (whitelabel module)
  logoEducacross.value = store.state.whitelabel.LogoDigitalEvaluation
  logoInstitution.value = store.state.whitelabel.LogoInstitution
}

const handleGetInfos = async () => {
  loading.value = true
  info.value = route.params

  try {
    if (info.value.evaluationId) {
      const response = await getReadingEvaluationTests(info.value.evaluationId, {
        ClassId: classe.value.ClassId,
      })

      evaluationName.value = response.data.name || 'Avaliação de Fluência'
      readingTests.value = response.data.readingFluencyTests || []
      startDate.value = info.value.startDate
      endDate.value = info.value.endDate
    }

    students.value = info.value.students || []

    emit('setInfos', {
      pdfTitle: evaluationName.value,
      massPdf: students.value.length > 1,
      students: students.value,
      selector: '.print-component',
    })
  } catch (error) {
    const role = store.getters.accessRole
    let routeName = 'AdminFluencyV2Evaluations'
    if (role === 'NetworkManager') {
      routeName = 'NetworkManagerFluencyV2Evaluations'
    } else if (role === 'Teacher') {
      routeName = 'TeacherFluencyV2Evaluations'
    }
    router.push({ name: routeName })
  } finally {
    loading.value = false
  }
}

const getTestTypeName = type => {
  return type === 2 ? 'Lista de Palavras' : 'Texto Completo'
}

const getWords = content => {
  return content.split(/\s+/).filter(w => w.trim())
}

const getWordRows = content => {
  const words = content.split(/\s+/).filter(w => w.trim())
  const rows = []
  const wordsPerRow = 5

  for (let i = 0; i < words.length; i += wordsPerRow) {
    rows.push(words.slice(i, i + wordsPerRow))
  }

  return rows
}

const getWordCount = test => {
  if (test.type === 2) {
    return getWords(test.content).length
  }
  return test.content.split(/\s+/).filter(w => w.trim()).length
}

onMounted(() => {
  getWhitelabelInfos()
  handleGetInfos()
})
</script>

<style lang="scss" scoped>
  .reading-meter-pdf-pages {
    .pdf-page {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      margin: 0 auto 20px auto;
      background: white;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      position: relative;
      page-break-after: always;

      &.page-break {
        break-after: page;
      }

      .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30mm;

        .logo-left,
        .logo-right {
          max-width: 80px;
          max-height: 30px;
          object-fit: contain;
        }
      }

      .page-footer {
        position: absolute;
        bottom: 15mm;
        left: 20mm;
        right: 20mm;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 9pt;
        color: #6c757d;

        .footer-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
        }

        .page-number {
          font-family: 'Montserrat', sans-serif;
          font-weight: 600;
        }
      }
    }

    // Página de Capa
    .cover-page {
      .cover-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200mm;

        .evaluation-icons {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;

          .icon {
            width: 48px;
            height: 48px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;

            &.icon-words {
              background-color: #ffb443;
              color: #ef6c00;
            }

            &.icon-text {
              background-color: #8bc728;
              color: #2e7d32;
            }
          }
        }

        .evaluation-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 24pt;
          font-weight: 700;
          text-align: center;
          margin-bottom: 15px;
          color: #000;
        }

        .evaluation-period {
          font-family: 'Montserrat', sans-serif;
          font-size: 12pt;
          color: #6c757d;
          margin-bottom: 60px;
        }

        .student-info-box {
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 30px 40px;
          min-width: 400px;

          .info-row {
            display: flex;
            margin-bottom: 15px;
            font-family: 'Montserrat', sans-serif;

            &:last-child {
              margin-bottom: 0;
            }

            .label {
              font-size: 11pt;
              color: #6c757d;
              min-width: 80px;
              font-weight: 400;
            }

            .value {
              font-size: 11pt;
              color: #000;
              font-weight: 700;

              .serie-badge {
                background-color: #e8f1ff;
                color: #7367f0;
                padding: 2px 8px;
                border-radius: 4px;
                font-size: 9pt;
                margin-left: 8px;
              }
            }
          }
        }
      }
    }

    // Página Separadora de Teste
    .test-separator-page {
      .test-separator-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e0e0e0;
        font-family: 'Montserrat', sans-serif;
        font-size: 10pt;
        color: #000;

        .student-name {
          font-weight: 400;
        }

        .class-info {
          font-weight: 400;
        }
      }

      .test-separator-content {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 220mm;

        .test-separator-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 32pt;
          font-weight: 400;
          color: #000;
          text-align: center;

          .test-type-name {
            color: #7367f0;
            font-weight: 400;
          }
        }
      }
    }

    // Página de Teste
    .test-page {
      .test-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e0e0e0;
        font-family: 'Montserrat', sans-serif;
        font-size: 10pt;
        color: #000;

        .student-name {
          font-weight: 400;
        }

        .class-info {
          font-weight: 400;
        }
      }

      .test-content {
        .test-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;

          .test-type {
            font-family: 'Montserrat', sans-serif;
            font-size: 14pt;

            .label {
              color: #000;
              font-weight: 400;
            }

            .type-name {
              color: #7367f0;
              font-weight: 700;
              margin-left: 8px;
            }
          }

          .word-count {
            font-family: 'Montserrat', sans-serif;
            font-size: 12pt;
            font-weight: 700;
            color: #7367f0;
          }
        }

        .word-list-container {
          margin-top: 20px;

          .word-row {
            display: flex;
            align-items: stretch;
            margin-bottom: 8px;

            .row-arrow {
              font-size: 16pt;
              color: #000;
              margin-right: 8px;
              display: flex;
              align-items: center;
              font-weight: 400;
              min-width: 20px;
            }

            .word-row-cells {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 0;
              flex: 1;

              .word-cell {
                border: 1px solid #d0d0d0;
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #fff;
                font-family: 'Montserrat', sans-serif;
                font-size: 11pt;
                font-weight: 400;
                color: #000;
                text-transform: uppercase;
                text-align: center;
                word-break: break-word;
                min-height: 40px;

                &:not(:last-child) {
                  border-right: none;
                }
              }
            }
          }
        }

        .text-content {
          font-family: 'Montserrat', sans-serif;
          margin-top: 30px;

          .arrow {
            font-size: 18pt;
            color: #000;
            margin-right: 10px;
            float: left;
            line-height: 1.8;
          }

          .text-paragraph {
            font-size: 11pt;
            font-weight: 400;
            color: #000;
            line-height: 1.8;
            text-align: justify;
            text-transform: uppercase;
            margin: 0;
            word-spacing: 0.2em;
          }
        }
      }
    }

    // Página Separadora
    .separator-page {
      display: flex;
      align-items: center;
      justify-content: center;

      .separator-content {
        text-align: center;

        .separator-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 32pt;
          font-weight: 700;
          color: #000;
        }
      }
    }
  }

  @media print {
    .reading-meter-pdf-pages {
      .pdf-page {
        box-shadow: none;
        margin: 0;
        page-break-after: always;
      }
    }
  }

  // Classe para modo HTMLtoPdf
  .HTMLtoPdf {
    .pdf-page {
      width: 794px !important;
      height: 1123px !important;
      box-shadow: none;
      margin: 0;
      page-break-after: always;
    }
  }
</style>