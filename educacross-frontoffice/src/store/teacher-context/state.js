/*= ========================================================================================
  File Name: state.js
  Description: Vuex Store - state
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== */
// import navbarSearchAndPinList from '@/layouts/components/navbar/navbarSearchAndPinList' // retirar o comentário quando solucionar o problema de importação do --navbarSearchAndPinList--

// import colors from '@/../themeConfig.js' // retirar o comentário quando solucionar o problema de importação do --colors--

// /////////////////////////////////////////////
// Helper
// /////////////////////////////////////////////

// *From Auth - Data will be received from auth provider
// const userDefaults = {
//   uid         : 0,          // From Auth
//   displayName : "John Doe", // From Auth
//   about       : "Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.",
//   photoURL    : require("@/assets/images/portrait/small/avatar-s-11.jpg"), // From Auth
//   status      : "online",
//   userRole    : "admin"
// }

// Check if device is touch device
// This is used to remove perfect scrollbar from touch devices
// Using Dynamic components
const isTouchDevice = () => {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  const mq = query => window.matchMedia(query).matches

  if ('ontouchstart' in window || window.DocumentTouch) {
    return true
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return mq(query)
}

// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

export const teacherContextConstructor = () => ({
  // AppActiveUser           : userDefaults,
  bodyOverlay: false,
  isVerticalNavMenuActive: true,
  is_touch_device: isTouchDevice(),
  mainLayoutType: 'vertical', // dar roolback nessa linha quando solucionar a questão dos temas
  // navbarSearchAndPinList,  // retirar o comentário quando solucionar o problema de importação do --navbarSearchAndPinList--
  reduceButton: false, // dar roolback nessa linha quando solucionar a questão dos temas
  verticalNavMenuWidth: 'default',
  verticalNavMenuItemsMin: false,
  scrollY: 0,
  // starredPages: navbarSearchAndPinList['pages'].data.filter(
  //   (page) => page.is_bookmarked
  // ),  // retirar o comentário quando solucionar o problema de importação do --navbarSearchAndPinList--
  theme: 'light', // dar roolback nessa linha quando solucionar a questão dos temas
  // themePrimaryColor: colors.primary, // retirar o comentário quando solucionar o problema de importação do --colors--

  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar & navbar component
  windowWidth: null,

  subjectId: undefined,
  classId: undefined,

  accessToken: '',
  accessHasBook: false,
  accessEducationSystems: [],
  accessClasses: [],
  accessSubjects: [],
  isEducacrossUser: false,
  teacherClass: [],

  backgroundWhiteLabelColor: '',
  fontWhiteLabelColor: '',
  imageWhiteLabel: '',
  changeSubjectsByEducationSystemId: 0,

  pdfLoadPercent: 0,

  suggestGuide: {
    id: null,
    recommendations: [],
    step: 0,
    activitiesRemoved: [],
    activitiesUsedForRecommendation: [],
  },

  globalError: {},
})

const state = teacherContextConstructor()

export default state
