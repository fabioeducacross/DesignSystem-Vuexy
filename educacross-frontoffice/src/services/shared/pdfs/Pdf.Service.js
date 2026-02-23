// pdfZipDownloader.js
// Importing required modules
import store from '@/store'
import { sanitizeString } from '@/utils/utils'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import JSZip from 'jszip'
import { nextTick } from 'vue'

// Variables to keep track of the total number of components and the quantity that's ready
let componentsTotal = 0
let qtdReady = 0

/**
 * Function to set the percentage of PDF loading completion.
 */
const setPdfLoadPercentage = () => {
  const percentage = Math.round((qtdReady / (2 * componentsTotal)) * 100)
  store.commit('UPDATE_PDF_LOAD_PERCENTAGE', percentage)
}

/**
 * Function to verify a name, ensuring it's unique by adding a suffix if necessary.
 * @param {string} name - The name to be verified.
 * @param {string[]} names - An array of existing names.
 * @returns {string} - The verified (unique) name.
 */
const verifyName = (name, names) => {
  if (names.includes(name)) {
    const nameParts = name.split(' ')
    const prefix = nameParts.slice(0, -1).join(' ')
    const suffix = nameParts.slice(-1)[0]

    let newSuffix = parseInt(suffix, 10) + 1

    if (Number.isNaN(newSuffix)) {
      newSuffix = 1
    }

    return verifyName(`${prefix} ${newSuffix}`, names)
  }
  return name
}

/**
 * Function to generate a PDF from an HTML component.
 * @param {HTMLElement} component - The HTML component to be converted to PDF.
 * @param {number} scale - The scale to be used when converting the HTML to canvas.
 * @param {boolean} stretch - Whether to stretch the content to fit the PDF.
 * @param {number} padding - The padding to be added around the content in the PDF.
 * @returns {Promise<ArrayBuffer>} - A promise that resolves with the generated PDF as an ArrayBuffer.
 */
const generatePDF = async (originalComponent, scale, stretch, padding) => {
  const component = originalComponent.cloneNode(true)

  // Adiciona o clone ao DOM temporariamente fora da tela
  component.style.position = 'absolute'
  component.style.left = '-9999px'
  component.style.top = '0'
  document.body.appendChild(component)

  const canvas = await html2canvas(component, {
    useCORS: true,
    allowTaint: true,
    scale,
  })

  document.body.removeChild(component)

  qtdReady += 1
  setPdfLoadPercentage() // Increment percentage after PNG is ready

  // calculate the content size in mm
  const contentWidth = ((canvas.width / scale) * 25.4) / 96
  const contentHeight = ((canvas.height / scale) * 25.4) / 96

  // detect the orientation based on the content size
  const orientation = contentWidth > contentHeight ? 'l' : 'p'

  let pdfWidth = 210
  let pdfHeight = 297

  if (stretch) {
    if (orientation === 'l') {
      pdfWidth = contentHeight + padding
      pdfHeight = contentWidth + padding
    } else {
      pdfWidth = contentWidth + padding
      pdfHeight = contentHeight + padding
    }
  }

  const pdf = new JsPDF({
    orientation,
    unit: 'mm',
    format: [pdfWidth, pdfHeight],
  })

  // center the content considering the padding, orientation and content size
  let xOffset = pdfWidth / 2 - contentWidth / 2
  let yOffset = pdfHeight / 2 - contentHeight / 2

  if (orientation === 'l') {
    xOffset = pdfHeight / 2 - contentWidth / 2
    yOffset = pdfWidth / 2 - contentHeight / 2
  }

  pdf.addImage(canvas, 'PNG', xOffset, yOffset, contentWidth, contentHeight, null, 'SLOW')

  return pdf.output('arraybuffer')
}

/**
 * Function to download PDFs for a selection of HTML components.
 * The PDFs are added to a ZIP file, which is then downloaded.
 * @param {string} query - A CSS selector to select the HTML components.
 * @param {string} [zipName='pdfs'] - The name of the ZIP file.
 * @param {number} [scale=2] - The scale to be used when converting the HTML to canvas.
 * @param {boolean} [stretch=false] - Whether to stretch the content to fit the PDF.
 * @param {number} [padding=0] - The padding to be added around the content in the PDF.
 * @param {number} [concurrencyLimit=4] - The maximum number of concurrent PDF generation tasks.
 */
const downloadPDFs = async (
  query,
  zipName = 'pdfs',
  scale = 2,
  stretch = false,
  padding = 0,
  concurrencyLimit = 4,
) => {
  await nextTick()

  // sanitize zipName
  zipName = sanitizeString(zipName)

  const components = Array.from(document.querySelectorAll(query))
  const printComponents = Array.from(document.querySelectorAll('.print-component'))

  printComponents.forEach(component => {
    component.classList.add('HTMLtoPdf')
  })

  const names = []
  const zip = new JSZip()

  componentsTotal = components.length
  qtdReady = 0

  setPdfLoadPercentage()

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

  const processQueue = async queue => {
    while (queue.length) {
      const component = queue.shift()

      // eslint-disable-next-line no-await-in-loop
      const pdfData = await generatePDF(component, scale, stretch, padding)

      let name = component.getAttribute('data-filename') || `pdf ${qtdReady}`
      name = verifyName(name, names)
      name = sanitizeString(name)
      names.push(name)
      zip.file(`${name}.pdf`, pdfData, { binary: true })

      qtdReady += 1
      setPdfLoadPercentage()

      // eslint-disable-next-line no-await-in-loop
      await wait(50)
    }
  }

  names.pop()

  await processQueue(components)

  components.pop()
  qtdReady = 0

  printComponents.forEach(component => {
    component.classList.remove('HTMLtoPdf')
  })

  printComponents.pop()

  const zipData = await zip.generateAsync({ type: 'blob' })
  saveAs(zipData, `${zipName}.zip`)
}

export default downloadPDFs
