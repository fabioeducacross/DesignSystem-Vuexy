import config from '@/whiteLabel/config'

/**
 * List of valid property names that can be retrieved from a whitelabel config.
 * @typedef {(
 *   "Id" |
 *   "name" |
 *   "logo" |
 *   "appName" |
 *   "helpLink" |
 *   "phoneNumber" |
 *   "commonQuestionsLink" |
 *   "logoCard" |
 *   "logoCertificate" |
 *   "domain" |
 *   "instagramTag" |
 *   "apiWhats" |
 *   "logoAccessLetter" |
 *   "email" |
 *   "Name" |
 *   "MainLogo" |
 *   "SecondaryLogo" |
 *   "LightLogo" |
 *   "LogoLogin" |
 *   "SmallLogo" |
 *   "LogoStudentCard" |
 *   "LogoDigitalEvaluation" |
 *   "FavIcon" |
 *   "SuportUrl" |
 *   "DeepLinking" |
 *   "SiteUrl" |
 *   "FacebookUrl" |
 *   "YouTubeUrl" |
 *   "InstagramUrl" |
 *   "InstagramUsername" |
 *   "CommonQuestionsUrl" |
 *   "PhoneNumber" |
 *   "AppName" |
 *   "SuggestedMission" |
 *   "WindowsInstallerLink" |
 *   "NeedHelpHowToInstall" |
 *   "LinksToPlatformForStudents" |
 *   "LoginUrl" |
 *   "loginUrlManageAccount" |
 *   "suporteWhatsapp" |
 *   "BeautifulUrl" |
 *   "BeautifulHelpUrl" |
 *   "Typebot" |
 *   "platforms" |
 *   "images" |
 *   "showOthersLogins"
 * )} WhiteLabelOption
 */

/**
 * Retrieves a property value from the active whitelabel configuration.
 *
 * The active whitelabel is determined by the environment variable `VUE_APP_WHITELABEL`.
 *
 * @param {WhiteLabelOption} option - The property name to retrieve from the whitelabel configuration.
 * @returns {*} The value of the requested property, or an empty string if not found.
 */
export default function getWhitelabelConfig(option) {
  const whiteLabelKey = import.meta.env.VITE_APP_WHITELABEL

  return config[whiteLabelKey][option]
}
