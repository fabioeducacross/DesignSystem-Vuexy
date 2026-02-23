<script setup>
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import EvaluationAnswerSheetBlock from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationAnswerSheetBlock.vue'
import EvaluationInfoArea from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationInfoArea.vue'
import EvaluationLogosHeader from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationLogosHeader.vue'
import {
  getQuestionOptions,
  generateQRCodeContent,
} from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationPdfUtils.js'
import EvaluationTitle from '@/views/pages/teacher-context/evaluations/evaluation-download/components/EvaluationTitle.vue'
import QRCode from 'qrcode'
import { ref, onMounted } from 'vue'

// Props
const props = defineProps({
  evaluationName: {
    type: String,
    required: true,
  },
  evaluationSubjects: {
    type: Array,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  testBookNumber: {
    type: Number,
    required: true,
  },
  schoolLogo: { type: String, required: true },
  studentName: { type: String, required: true },
  schoolName: { type: String, required: true },
  classSeries: { type: String, required: true },
  className: { type: String, required: true },
  tests: {
    type: Array,
    required: true,
  },
  studentId: { type: Number, required: true },
})

// Constants
const questionsPerColumn = 15
const qrCodeDataUrls = ref([])

// Helper Functions
const configureMaxColumnsPerPage = () => {
  const maxNumberOfColumnsPerPageGivenOptionsSize = {
    2: 5,
    3: 4,
    4: 4,
    5: 3,
  }

  // Find the maximum number of options across all tests to determine page layout
  const maxOptionsAcrossAllTests = Math.max(
    ...props.tests.map(test => {
      return Math.max(
        ...test.questions.map(question => {
          return getQuestionOptions(question).length
        }),
      )
    }),
  )

  return maxNumberOfColumnsPerPageGivenOptionsSize[maxOptionsAcrossAllTests]
}

const calculateBlockColumns = test => {
  // Each block internally divides its questions into columns of n questions
  // Calculate how many columns this block will need
  return Math.ceil(test.questions.length / questionsPerColumn)
}

const divideTheQuestionsIntoPages = () => {
  const maxColumnsPerPage = configureMaxColumnsPerPage()

  // Each test is one block
  // A page can have multiple blocks as long as total columns <= maxColumnsPerPage
  // If a single block exceeds maxColumnsPerPage, split it across multiple pages
  const pages = []
  let currentPage = []
  let currentPageColumnCount = 0

  props.tests.forEach((test, testIndex) => {
    const blockNumber = testIndex + 1
    const blockColumnCount = calculateBlockColumns(test)

    // Case 1: Block fits entirely on current page
    if (currentPageColumnCount + blockColumnCount <= maxColumnsPerPage) {
      currentPage.push({ ...test, blockNumber })
      currentPageColumnCount += blockColumnCount
    }
    // Case 2: Block doesn't fit on current page
    else {
      // Start a new page if current page has content
      if (currentPage.length > 0) {
        pages.push(currentPage)
        currentPage = []
        currentPageColumnCount = 0
      }

      // Case 2a: Block fits on a fresh page
      if (blockColumnCount <= maxColumnsPerPage) {
        currentPage.push({ ...test, blockNumber })
        currentPageColumnCount = blockColumnCount
      }
      // Case 2b: Block exceeds page limit - split it across multiple pages
      else {
        const totalQuestions = test.questions.length
        let questionIndex = 0

        while (questionIndex < totalQuestions) {
          const questionsToTake = Math.min(
            maxColumnsPerPage * questionsPerColumn,
            totalQuestions - questionIndex,
          )
          const questionsForThisPage = test.questions.slice(
            questionIndex,
            questionIndex + questionsToTake,
          )

          // Create a partial block for this page
          const partialBlock = {
            ...test,
            blockNumber,
            questions: questionsForThisPage,
            isPartial: true,
            partialStartIndex: questionIndex,
          }

          currentPage.push(partialBlock)
          pages.push(currentPage)

          questionIndex += questionsToTake
          currentPage = []
          currentPageColumnCount = 0
        }
      }
    }
  })

  // Add the last page if it has content
  if (currentPage.length > 0) {
    pages.push(currentPage)
  }

  return pages
}

const pages = divideTheQuestionsIntoPages()

/**
 * Generate QR codes for each page
 */
const generateQRCodes = async () => {
  const qrCodeSize = 126

  const qrCodePromises = pages.map(async (page, pageIndex) => {
    const answerPageNumber = pageIndex + 1

    const currentSubjectIds = page.map(block => block.subjectId)
    const currentBlockIndices = page.map(block => block.blockNumber - 1)

    const student = { id: props.studentId }

    const qrCodeContent = generateQRCodeContent(
      student,
      currentSubjectIds,
      answerPageNumber,
      currentBlockIndices,
      answerPageNumber === 1 ? props.tests : [],
    )

    try {
      return await QRCode.toDataURL(qrCodeContent, {
        errorCorrectionLevel: 'L',
        margin: 1,
        width: qrCodeSize,
      })
    } catch (error) {
      return null
    }
  })

  qrCodeDataUrls.value = await Promise.all(qrCodePromises)
}

onMounted(() => {
  generateQRCodes()
})
</script>

<template>
  <div>
    <div
      v-for="(page, pageIndex) in pages"
      :key="`page-${pageIndex}-student-${studentId}`"
      class="evaluation-answer-sheet"
    >
      <EvaluationLogosHeader
        :second-logo="schoolLogo"
        :first-logo="getWhitelabelConfig('MainLogo')"
        class="mb-2"
      />
      <EvaluationTitle
        :test-book-number="testBookNumber"
        :end-date="endDate"
        :start-date="startDate"
        :evaluation-subjects="evaluationSubjects"
        :evaluation-name="evaluationName"
      />

      <div class="d-flex gap-2">
        <EvaluationInfoArea
          :student-name="studentName"
          :school-name="schoolName"
          :class-series="classSeries"
          :class-name="className"
          class="flex-1"
        />
        <div style="width: 126px; height: 126px" class="border rounded p-50">
          <img
            v-if="qrCodeDataUrls[pageIndex]"
            :src="qrCodeDataUrls[pageIndex]"
            alt="QR Code"
            style="width: 100%; height: 100%"
          />
          <div v-else class="d-flex align-items-center justify-content-center h-100">
            <span class="text-muted">QR Code</span>
          </div>
        </div>
      </div>
      <div class="d-flex gap-2 justify-content-center" style="height: 555px">
        <EvaluationAnswerSheetBlock
          v-for="(block, blockIndex) in page"
          :key="`page-${pageIndex}-block-${blockIndex}-student-${studentId}`"
          :test="block"
          :block-index="block.blockNumber - 1"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .evaluation-answer-sheet {
    width: 46.7rem;
    height: 66rem;

    background-color: white;
    break-inside: avoid;
  }
</style>