import axiosIns from '@/libs/axios'
import axiosInsAccount from '@/libs/axiosAccount'

/**
 * Fetches the logout redirect URL from the API
 * @param {boolean} isUserAuthenticated - Whether the user is authenticated as access or account
 * @returns {Promise<string>} The redirect URL or empty string if not available
 */
export async function getLogoutRedirectUrl(isUserAuthenticated) {
  try {
    const axiosInstance = isUserAuthenticated ? axiosIns : axiosInsAccount
    const { data } = await axiosInstance.get('/v1/api/logout-url')

    return data.redirectUrl || ''
  } catch (error) {
    return ''
  }
}
