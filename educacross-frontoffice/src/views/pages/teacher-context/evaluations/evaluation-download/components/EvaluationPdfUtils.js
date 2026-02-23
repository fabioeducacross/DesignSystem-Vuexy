// No migration needed - keep as-is
export const contentIsAOption = content => {
  // Assuming options have questionType between 4 and 7
  return content.questionType >= 4 && content.questionType <= 7
}

export const getQuestionOptions = question => {
  return question.contents.filter(content => contentIsAOption(content))
}

export const formatQuestionNumber = number => {
  return number.toString().padStart(2, '0')
}

export const getAlphabetLetter = index => {
  return String.fromCharCode(65 + index)
}

export const getEnunciation = question => {
  return question?.contents.find(content => content.questionType === 1)
}

/**
 * Generates the QR code content string with student and page information
 * @param {Object} student - The student object containing id and tests
 * @param {Array<number>} currentSubjectIds - Array of subject IDs on current page
 * @param {number} answerPageNumber - The current page number
 * @param {Array<number>} currentBlockIndices - Array of block indices on current page
 * @param {Array<Object>} allTests - All tests for the student (to get detailed info on first page)
 * @returns {string} Colon-separated string for QR code encoding
 */
export const generateQRCodeContent = (
  student,
  currentSubjectIds,
  answerPageNumber,
  currentBlockIndices,
  allTests = [],
) => {
  let content = `${student.id}`

  content += `:PAGE:${answerPageNumber}`

  const subjectIdsString = currentSubjectIds.length > 0 ? currentSubjectIds.join(',') : 'ALL'
  content += `:SUBJECTS:${subjectIdsString}`

  const blockIndicesString = currentBlockIndices.length > 0 ? currentBlockIndices.join(',') : 'ALL'
  content += `:BLOCKS:${blockIndicesString}`

  content += `:SUBJECT_COUNT:${currentSubjectIds.length}`

  // Add detailed test information only on the first page
  if (answerPageNumber === 1 && allTests.length > 0) {
    allTests.forEach(test => {
      const subjectId = test.subjectId
      const questionsLength = test.questions ? test.questions.length : 0

      // Find the max number of options on the questions
      let contentType1Count = 0
      if (test.questions) {
        test.questions.forEach(question => {
          const optionsCount = getQuestionOptions(question).length
          contentType1Count = Math.max(contentType1Count, optionsCount)
        })
      }

      content += `:${subjectId}:${questionsLength}:${contentType1Count}`
    })
  }

  return content
}