import { ACCESS_ROLE_ENUM } from '@/consts/accessRoleEnum'
import { ACTION, PERMISSION } from '@/consts/permissions.js'
import { emitter } from '@/eventBus'
import { updateAbility, updateInstitutionAbility } from '@/libs/acl/ability'
import axiosIns from '@/libs/axios'
import axiosInsAccount from '@/libs/axiosAccount'
import router from '@/router'
import { getLogoutRedirectUrl } from '@/services/auth/logout.service'
import {
  getEducationSystemModule,
  getEducationSystemModuleV2,
} from '@/services/shared/educationSystem/EducationSystem.Service.js'
import store from '@/store'
import useFilters from '@/store/filters/useFilters'
import { Base64 } from 'js-base64'
import { nextTick } from 'vue'

/**
 * Return if user is logged in
 * This is completely up to you and how you want to store the token in your frontend application
 * e.g. If you are using cookies to store the application please update this function
 */
// eslint-disable-next-line arrow-body-style
export const isUserLoggedIn = () => {
  return store.state.access.token && store.state.access.refreshToken
}

export const isAccountLoggedIn = () => store.state.account.token && store.state.account.refreshToken

export const getUserData = () => store.getters.accessRole

/**
 * This function returns the decoded token
 * @param {String} token
 * @returns Object
 */

export const decodeToken = token => {
  const base64Token = token.split('.')[1]
  return JSON.parse(Base64.decode(base64Token))
}

/**
 * Emergency logout function that forcefully clears all authentication state.
 * Used when normal logout procedures fail (e.g., getLogoutRedirectUrl errors).
 * This ensures the user is completely logged out even if API calls fail.
 * @function
 * @async
 * @returns {Promise<void>}
 */
async function panicLogout() {
  try {
    // Try to revoke all access tokens (best effort - ignore errors)
    await revokeAllAccess().catch(() => {})
    await revokeAccount().catch(() => {})
  } catch (error) {
    // Ignore any errors during panic logout
  } finally {
    // Force clear all authentication state
    store.dispatch('logoutAccess')
    store.commit('logoutAccount')
    store.dispatch('filters/reset')
    store.dispatch('resetTeacherContext')

    // Redirect to login page
    await router.push({ name: 'login' })
  }
}

/**
 * Asynchronously revokes all logged accesses to the application by sending requests to the API.
 * Commits 'logoutAccess' and 'resetLoggedAccess' mutations to the store upon success.
 * @function
 * @async
 * @throws {Error} If any of the API requests fail.
 */
export async function revokeAllAccess() {
  const loggedAccess = store.state.loggedAccess.loggedAccess

  const impersonated = Object.values(loggedAccess.impersonated)
  const users = Object.values(loggedAccess.users)

  const allAccess = impersonated.concat(users)

  if (allAccess.length === 0) {
    return
  }

  const revokePromises = allAccess.map(value =>
    axiosIns
      .post(
        '/v2/applicationusers/revoke-token',
        {
          token: value.AccessToken,
          refreshToken: value.RefreshToken,
        },
        {
          headers: {
            showErrorToast: false,
          },
        },
      )
      .finally(() => {
        store.dispatch('logoutLoggedAccess', value)
      }),
  )

  await Promise.allSettled(revokePromises)
}

/**
 * Logs out the current user.
 * @function
 * @param {boolean} [redirect=true] - Whether or not to redirect after logout.
 * @returns {void}
 */
export const logoutUser = async (redirect = true) => {
  store.dispatch('logoutAccess')

  if (redirect) {
    store.dispatch('filters/reset')
    await router.push({ name: 'managerAccount' })
  } else {
    try {
      const redirectUrl = await getLogoutRedirectUrl(isUserLoggedIn())

      if (redirectUrl) {
        window.location.href = redirectUrl
      }
    } catch (error) {
      // If getLogoutRedirectUrl fails, perform panic logout
      await panicLogout()
    } finally {
      store.dispatch('filters/reset')
    }
  }
}

/**
 * Asynchronously revokes the current account's access by sending a request to the API.
 * If the account has no token or refreshToken, it resolves immediately.
 * If successful, it commits the 'logoutAccount' mutation to the store.
 * @function
 * @async
 * @returns {Promise} A promise that resolves when the access is revoked or rejects with an error.
 * @throws {Error} If the API request fails.
 */
export async function revokeAccount() {
  const { token, refreshToken } = store.state.account

  if (!token || !refreshToken) {
    return
  }

  return axiosIns
    .post(
      '/v2/account/revoke-token',
      {
        token,
        refreshToken,
      },
      {
        headers: {
          showErrorToast: false,
        },
      },
    )
    .finally(() => {
      store.commit('logoutAccount')
    })
}

/**
 * Faz logout da conta atual.
 *
 * @param {boolean} [redirect=true] - Whether to redirect after logout
 * @throws {Error} Se ocorrer algum erro ao fazer logout da conta.
 *
 * @returns {Promise<void>}
 */
export const logoutAccount = async (redirect = true) => {
  // Fetch redirect URL BEFORE revoking tokens (requires valid token)
  let redirectUrl = ''

  if (redirect) {
    try {
      redirectUrl = await getLogoutRedirectUrl(isAccountLoggedIn())
    } catch (error) {
      // If getLogoutRedirectUrl fails, perform panic logout
      await panicLogout()
      return
    }
  }

  // Now revoke tokens
  try {
    await revokeAllAccess()
    await revokeAccount()
  } catch (error) {}

  // Clear store state
  store.dispatch('logoutAccess')
  store.commit('logoutAccount')

  if (!redirect) return

  // Redirect to appropriate destination
  if (redirectUrl) {
    window.location.href = redirectUrl
  } else {
    router.push({ name: 'login' })
  }
}

/**
 * Removes repeated objects from an array
 * @param {Array} arr - Array with potentially repeated objects
 * @returns {Array} Array with unique objects
 */
export function removeRepeatedObjects(arr) {
  const uniqueJSON = new Set(arr.map(JSON.stringify))
  return [...uniqueJSON].map(JSON.parse)
}

/**
 * Process the abilities based on the user role and returns them
 * @param {Object} abilities - Object containing general and module permissions
 * @param educationSystems
 * @returns {Object} Processed abilities
 */
function processAbilities(abilities, educationSystems) {
  if (Array.isArray(abilities)) {
    return mapAbilities(abilities).flat()
  }

  const { generalPermissions, modulePermissions } = abilities
  abilities.generalPermissions = mapAbilities(generalPermissions).flat()

  const Role = store.getters.accessRole
  const isTeacher = Role === 'Teacher'

  store.commit('setSerieModulePermissions', modulePermissions)
  store.commit('setModuleSubjects', Object.keys(modulePermissions))

  abilities.modulePermissions = processModulePermissions(
    modulePermissions,
    isTeacher,
    educationSystems,
  )

  return abilities
}

/**
 * Makes an API call to get account permissions and processes the abilities
 * @async
 * @returns {Promise<*>} Promise object representing the processed abilities
 */
async function accountAbilities() {
  return new Promise((resolve, reject) => {
    axiosInsAccount
      .get('v1/account/permissions')
      .then(response => resolve(response.data.permissions))
      .catch(error => reject(error))
  })
}

/**
 * Process the abilities based on the teacher-specific permission structure
 * @param {Object} abilities - Object containing general and module permissions
 * @returns {Object} Processed abilities
 */
function processTeacherAbilities(abilities) {
  const { generalPermissions, modulePermissions } = abilities

  // Map general permissions to CASL format
  abilities.generalPermissions = mapAbilities(generalPermissions).flat()

  // Store raw module permissions indexed by serieId
  store.commit('setSerieModulePermissions', modulePermissions)
  store.commit('setModuleSubjects', Object.keys(modulePermissions))

  // Process module permissions for teacher (keeps object structure by serieId)
  abilities.modulePermissions = processModulePermissions(
    modulePermissions,
    true, // isTeacher
    [], // educationSystems - not needed for teachers
  )
  // create education system permissions for teachers

  return abilities
}

/**
 * @typedef GetTeacherPermissionResponseResource
 * @property {string[]} [actions]
 * @property {string|null} [name]
 * @property {string|null} [subject]
 */

/**
 * @typedef GetTeacherPermissionResponseResource
 */

/**
 * @typedef ResponseGetTeacherPermissionResponseResource
 * @property {GetTeacherPermissionResponseResource[]|null} [generalPermissions]
 * @property {{[key: string]: GetTeacherPermissionResponseResource[]|null}|null} [modulePermissions]
 */

/**
 * Adds education system permissions to teacher abilities for their classes
 * @param {Object} abilities - Teacher abilities object
 * @param {Array} classes - Array of teacher's classes
 * @param {Array} educationSystems - Array of education systems
 */
export function addEducationSystemPermissionsForTeacher(abilities, classes, educationSystems) {
  // Create a map for efficient lookup O(1) instead of O(n)
  const classesMap = new Map(classes.map(c => [c.ClassId, c]))

  educationSystems.forEach(educationSystem => {
    educationSystem.classesIds.forEach(classId => {
      const classItem = classesMap.get(classId)

      // Validate that class exists and has module permissions initialized
      if (!classItem || !abilities.modulePermissions[classId]) {
        return
      }

      // Check if permission already exists to avoid duplicates
      const permissionExists = abilities.modulePermissions[classId].some(
        p => p.subject === `${PERMISSION.MODULE.EDUCATION_SYSTEMS}-${educationSystem.id}`,
      )

      if (!permissionExists) {
        abilities.modulePermissions[classId].push({
          subject: `${PERMISSION.MODULE.EDUCATION_SYSTEMS}-${educationSystem.id}`,
          action: ACTION.READ,
          name: educationSystem.name,
        })
      }
    })
  })

  return abilities
}

/**
 * @returns {AxiosResponse<ResponseGetTeacherPermissionResponseResource>}
 */
async function fetchTeacherAbilities(classes) {
  try {
    const { data } = await axiosIns.get('v1/applicationusers/teacher/permissions')
    const response = await getEducationSystemModuleV2()

    const educationSystems = response.data || []

    const abilities = processTeacherAbilities(data)

    // Add education system permissions for teacher's classes
    addEducationSystemPermissionsForTeacher(abilities, classes, educationSystems)

    store.commit('setAbilities', abilities)
  } catch (error) {
    throw new Error('Failed to fetch teacher permissions')
  }
}

/**
 * Faz login do usuário como Account.
 *
 * @param {string} token O token de acesso do usuário.
 * @param {string} refreshToken O token de atualização do usuário.
 * @param {Object} userData Os dados do usuário.
 *
 * @throws {Error} Se ocorrer algum erro ao fazer login da conta.
 */
async function loginAccount(token, refreshToken, userData) {
  store.commit('loginAccount', { token, refreshToken, userData })
  const abilities = await accountAbilities()
  updateAbility(abilities)
  store.commit('setAbilities', abilities)
}

export function generateEducationSystemPermissions(modulePermissions, educationSystems) {
  educationSystems.forEach(educationSystem => {
    educationSystem.subjects.forEach(subject => {
      subject.serieIds.forEach(serieId => {
        if (!modulePermissions[serieId]) {
          return
        }
        modulePermissions[serieId].push({
          subject: `${PERMISSION.MODULE.EDUCATION_SYSTEMS}-${educationSystem.id}`,
          actions: [ACTION.READ],
          name: educationSystem.name,
        })
      })
    })
  })
  return modulePermissions
}

/**
 * Faz login do usuário como Access.
 *
 * @param {string} token O token de acesso do usuário.
 * @param {string} refreshToken O token de atualização do usuário.
 * @param {Object} userData Os dados do usuário.
 *
 * @throws {Error} Se ocorrer algum erro ao fazer login do acesso.
 */
async function loginAccess(token, refreshToken, userData) {
  const { InstitutionSubjects, Role, InstitutionId } = userData
  store.commit('loginAccess', { token, refreshToken, userData })

  await nextTick()

  const { classes, classe } = useFilters()
  let abilities = {}

  if (Role === ACCESS_ROLE_ENUM.TEACHER.name) {
    await store.dispatch('fetchClasses')
    await fetchTeacherAbilities(classes.value)
  } else if (Role === ACCESS_ROLE_ENUM.STUDENT.name) {
    await store.dispatch('fetchStudents')
  }

  if (userData.Role === 'Teacher') {
    if (classes.value.length) {
      if (!classe.value || !classes.value.find(c => c.ClassId === classe.value.ClassId)) {
        classe.value = classes.value[0]
      }
    } else {
      store.dispatch('setHasAccountAction', userData.HasAccount)
      throw Error('noClassesError')
    }
  }

  if (InstitutionSubjects && classes.value) {
    userData.InstitutionSubjects = InstitutionSubjects.filter(subject => {
      const subjectClasses = classes.value.filter(classItem =>
        subject.Levels.includes(classItem.Level),
      )

      return subjectClasses.length > 0
    })
  }

  try {
    let educationSystems = []
    if (InstitutionId) {
      const response = await getEducationSystemModule(InstitutionId)

      educationSystems = response.data || []
      store.commit('educationSystems', response.data)
    }

    if (Role !== ACCESS_ROLE_ENUM.TEACHER.name) {
      abilities = await accessAbilities(educationSystems)
    }

    if (userData.Role !== 'Student' && userData.Role !== 'Teacher') {
      abilities.generalPermissions.push(
        {
          action: 'read',
          subject: 'Admin',
        },
        {
          action: 'read',
          subject: 'AbilityReport',
        },
      )

      // solução temporária. Precisa ser refatorada no backend.
      if (
        // userData.Role === 'Coordinator' ||
        // userData.Role === 'Secretariat' ||
        // userData.Role === 'Manager'
        userData.Role !== 'NetworkManager'
      ) {
        abilities.generalPermissions.push(
          {
            action: 'read',
            subject: 'RankingConquest',
          },
          {
            action: 'read',
            subject: 'StudentEvidence',
          },
        )
      } else if (userData.Role === 'Manager') {
        abilities.generalPermissions.push({
          action: 'read',
          subject: 'Manager',
        })
      }
    }

    if (Role !== ACCESS_ROLE_ENUM.TEACHER.name) {
      store.commit('setAbilities', abilities)
    }
    store.commit('setUserDataAccess', userData)

    const getAbilities = store.getters.getAbilities
    updateAbility(getAbilities)

    const instituionAbilities = store.getters.getInstituionAbilities
    updateInstitutionAbility(instituionAbilities)

    emitter.emit('accessLogged')
  } catch (error) {
    throw new Error('loginAccessError')
  }
}

/**
 * Logs in the user with the provided token and refreshToken.
 *
 * @param {string} token - The access token of the user.
 * @param {string} refreshToken - The refresh token of the user.
 * @param {boolean} resetStore - Whether to reset the store.
 * @returns {Promise<void>}
 * @throws {Error} If an error occurs while logging in the user, or if the teacher has no classes.
 */
export async function loginUser(token, refreshToken, resetStore = true) {
  const userData = decodeToken(token)

  if (resetStore) store.dispatch('resetTeacherContext')

  if (userData.Role === 'Account') {
    await loginAccount(token, refreshToken, userData)
  } else {
    let Id = userData.UserId
    if (userData.BackToNetworkManager) {
      Id = userData.InstitutionId
    }
    // Commit the updated loggedAccess to the store.
    store.commit('addAccess', {
      Impersonated: userData.BackToNetworkManager,
      Id,
      AccessToken: token,
      RefreshToken: refreshToken,
    })

    await loginAccess(token, refreshToken, userData)
  }
}

async function accessAbilities(educationSystems) {
  return new Promise((resolve, reject) => {
    axiosIns
      .get('v2/applicationusers/permissions')
      .then(response => resolve(processAbilities(response.data, educationSystems)))
      .catch(error => reject(error))
  })
}

/**
 * Maps the abilities to a desired format
 * @param {Array} abilities - Array of abilities to be mapped
 * @returns {Array} Mapped abilities
 */
export function mapAbilities(abilities) {
  const newAbilities = abilities.flatMap(ability => {
    return ability.actions.map(item => {
      return {
        subject: ability.subject,
        action: item,
        name: ability.name,
      }
    })
  })

  return newAbilities.filter(item => item.action && item.subject)
}

/**
 * Process module permissions based on whether the user is a teacher or not
 * @param {Object} modulePermissions - Module permissions to be processed
 * @param {boolean} isTeacher - Indicates if the user is a teacher
 * @param {Array} educationSystems - Array of education systems to be processed
 * @returns {Array|Object} Processed module permissions
 */
export function processModulePermissions(modulePermissions, isTeacher, educationSystems) {
  const modulePermissionsWithEducationSystems = generateEducationSystemPermissions(
    modulePermissions,
    educationSystems,
  )

  if (isTeacher) {
    return Object.fromEntries(
      Object.entries(modulePermissionsWithEducationSystems).map(([key, value]) => [
        key,
        mapAbilities(value),
      ]),
    )
  }

  let flatModulePermissions = Object.values(modulePermissionsWithEducationSystems).flat()
  flatModulePermissions = removeRepeatedObjects(flatModulePermissions)

  return mapAbilities(flatModulePermissions)
}

/**
 * This function logs in an impersonated admin using provided access credentials.
 *
 * @function loginImpersonatedAdmin
 * @param {Object} [access={ accessToken: String, refreshToken: String }] - The access credentials for impersonated admin login.
 * @param {string} access.accessToken - The access token for the impersonated admin.
 * @param {string} access.refreshToken - The refresh token for the impersonated admin.
 * @example
 * const access = { token: 'your_access_token', refreshToken: 'your_refresh_token' };
 * loginImpersonatedAdmin(access);
 * @exports
 */
export const loginImpersonatedAdmin = async access => {
  const { accessToken, refreshToken } = access

  return loginUser(accessToken, refreshToken, true)
}

/**
 * Logs out the currently impersonated admin user, and logs back in the original user.
 * The original user's information is retrieved from the application store and used to perform a new login.
 *
 * @export
 * @function
 *
 * @returns {void}
 */
export const logoutImpersonatedAdmin = async () => {
  const { UserId } = store.getters.accessUserData

  const loggedAccess = store.state.loggedAccess.loggedAccess.users

  const userOrigin = loggedAccess[UserId]

  if (!userOrigin) return logoutUser()

  return loginUser(userOrigin.AccessToken, userOrigin.RefreshToken, true)
}
