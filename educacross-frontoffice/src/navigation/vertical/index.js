/**
 * This file contains constants and functions related to the configuration of the menu
 * for different user roles (Admin, Teacher, Student) in the application.
 */
import { ACTION, PERMISSION } from '@/consts/permissions'
import Admin from '@/navigation/vertical/admin.js'
import Auditor from '@/navigation/vertical/auditor.js'
import NetworkManager from '@/navigation/vertical/networkManager.js'
import Student from '@/navigation/vertical/student.js'
import Teacher from '@/navigation/vertical/teacher.js'
import store from '@/store'

const ROLE_ITEMS = {
  Admin,
  Teacher,
  Auditor,
  Student,
  NetworkManager,
}

/**
 * EDUCATION_SYSTEM_STRUCTURE contains functions that generate menu items for education systems
 * based on the user's role (Student, Teacher).
 */
const EDUCATION_SYSTEM_STRUCTURE = {
  Student: item => ({
    title: item.name,
    icon: 'auto_stories',
    order: 30,
    route: {
      name: `studentEducationSystem${item.id}`,
      params: { educationSystemId: item.id },
    },
    resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
    action: ACTION.READ,
  }),
  Teacher: item => ({
    title: `${item.name}`,
    icon: 'auto_stories',
    order: 70,
    route: {
      name: `EducationSystemModules${item.id}`,
      params: { educationSystemId: item.id },
    },
    resource: PERMISSION.MODULE.EDUCATION_SYSTEMS,
    action: ACTION.READ,
  }),
}

/**
 * Fetches and formats education system items based on the user's role.
 *
 * @param {string} role - The role of the user (Student, Teacher).
 * @returns {Array} An array of formatted education system items.
 */
export const fetchAndFormatEducationSystemItems = role => {
  const data = store?.state.access.educationSystems

  if (!data) return []

  const structure = EDUCATION_SYSTEM_STRUCTURE[role]

  return data.map(item => structure(item))
}

export default ROLE_ITEMS
