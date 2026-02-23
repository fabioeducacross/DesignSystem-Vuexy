/**
 * @param {Date} date returs a simple date format
 * */

export default function formatDate(date) {
  if (!date || !isValidDate(date)) return '-'

  const parsedDate = new Date(date)

  return parsedDate.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

// Helper function to check if a date is valid
function isValidDate(date) {
  const parsedDate = new Date(date)
  return !Number.isNaN(parsedDate.getTime())
}

export const getMonthList = (length = new Date().getMonth() + 1) => {
  return Array.from({ length }, (item, i) => {
    const str = new Date(0, i).toLocaleString('pt-BR', { month: 'long' })
    const capitalized = str[0].toUpperCase() + str.substr(1)
    return {
      name: capitalized,
      id: i + 1,
    }
  })
}

export const currentMonth = () => {
  const currentMonth = new Date().getMonth()

  const str = new Date(0, currentMonth).toLocaleString('pt-BR', { month: 'long' })
  const capitalized = str[0].toUpperCase() + str.substr(1)

  return {
    name: capitalized,
    id: currentMonth + 1,
  }
}

const isDate = value => value instanceof Date

export const formatISODate = date => {
  try {
    if (!date || !isValidDate(date)) return '-'
    if (!isDate) date = new Date(date)

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  } catch (error) {
    return '-'
  }
}
