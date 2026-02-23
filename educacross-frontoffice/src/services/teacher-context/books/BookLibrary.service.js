import axios from '@/libs/axios'
import { urlString } from '@/utils/utils'

const resource = '/v2/book-library'

export const getBooksLibrary = filters => {
  const parameters = urlString(filters)

  return axios.get(`${resource}?${parameters}`)
}

export const enableDisableBooksLibrary = (id, classId) => {
  return axios.put(`${resource}/${id}`, {
    ClassId: classId,
  })
}

/**
 * Represents a single image with its URL.
 * @typedef {Object} Image
 * @property {string} imageUrl - The URL of the image.
 */

/**
 * Represents detailed information about a book.
 * @typedef {Object} BookDetails
 * @property {string} title - The title of the book.
 * @property {string} imageUrl - URL of the main image of the book.
 * @property {string} author - Author of the book.
 * @property {string} goal - The goal associated with the book.
 * @property {string} genre - Genre of the book.
 * @property {string} thematic - Thematic elements of the book.
 * @property {string} synopsis - A brief summary of the book.
 * @property {number} readingTimeInMin - Estimated reading time in minutes.
 * @property {string} classPlanUrl - URL to the class plan associated with the book.
 * @property {Image[]} images - Array of additional images related to the book.
 */

/**
 * Fetches book details from a specific API endpoint.
 *
 * @returns {Promise<BookDetails>} A promise that resolves to an object containing detailed information about a book.
 */
export const getBookDetails = id => {
  return axios.get(`${resource}/${id}`)
}

export const getEnableDisableAudio = classId => {
  return axios.get(`${resource}/enabled-disabled-audio/${classId}`)
}

export const putEnableDisableAudio = classId => {
  return axios.put(`${resource}/enabled-disabled-audio/${classId}`)
}
