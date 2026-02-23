import { addAlpha } from '../utils'
import BNCC_AXIS_NAME from '@/consts/teacher-context/BNCCAxisName'
import BNCC_LABEL_NAME from '@/consts/teacher-context/BNCCLabelName'
import ActivityTypeEnum from '@/consts/teacher-context/enums/activityTypeEnum'
import { SubjectEnum } from '@/consts/teacher-context/enums/subjectEnum'
import router from '@/router'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import store from '@/store'
import { Base64 } from 'js-base64'
import sha256 from 'js-sha256'

// Helper: base64url encode from raw bytes
function base64UrlEncode(bytes) {
  let binary = ''
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i])
  const base64 = btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
  return base64
}

// New helper: generate PKCE code verifier securely without randomstring (browser-safe)
function generateCodeVerifier(length = 128) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
  const randomValues = new Uint8Array(length)
  crypto.getRandomValues(randomValues)
  let result = ''
  for (let i = 0; i < length; i += 1) {
    // Map random byte to charset index
    result += charset[randomValues[i] % charset.length]
  }
  return result
}

class UtilTeacherService {
  decodeToken(token) {
    const base64Token = token.split('.')[1]
    return JSON.parse(Base64.decode(base64Token))
  }

  generalError(error) {
    // colocado para tirar o loading global, caso dê algum erro, pois está sendo chamado em todos os métodos de requisições
    const appLoading = document.getElementById('loading-bg')
    const body = document.getElementById('body')

    let errorResponse = {
      status: 0,
      message: [],
      errorDictionary: [],
      data: {},
    }

    if (error === 'REFRESH_TOKEN_ERROR') {
      appLoading.style.display = 'none'
      body.style.overflowY = 'auto'
      errorResponse = {
        status: 0,
        message: [],
      }
      return errorResponse
    }

    if (error.response.status) {
      errorResponse.status = error.response.status
      if (error.response.data) errorResponse.data = error.response.data
      if (error.response.status === 400) {
        if (error.response.data.message) {
          errorResponse.message.push(error.response.data.message)
        } else if (error.response.data.errors) {
          const errorsKeys = Object.keys(error.response.data.errors)
          const allErrors = []
          errorsKeys.forEach(key => {
            allErrors.push(...error.response.data.errors[key].toString().split(','))
          })
          errorResponse.message = allErrors
          errorResponse.errorDictionary = errorsKeys
        } else if (error.response.data.ErrorMessage) {
          errorResponse.message.push(error.response.data.ErrorMessage)
        } else {
          const errorsKeys = Object.keys(error.response.data)
          const allErrors = []
          errorsKeys.forEach(key => {
            allErrors.push(...error.response.data[key].toString().split(','))
          })
          errorResponse.message = allErrors
          errorResponse.errorDictionary = errorsKeys
        }
      } else if (error.response.status === 303) {
        if (error.response.data.message) {
          errorResponse.message.push(error.response.data.message)
        }
      } else if (error.response.status === 401 || error.response.status === 403) {
        if (error.response.data.message) errorResponse.message.push(error.response.data.message)
        else errorResponse.message.push('Não foi possível realizar a operação.')
      } else {
        errorResponse.message.push('Algo inesperado aconteceu.')
      }

      return errorResponse
    }

    return ''
  }

  changeTextBySubject(key, label, subjectId = store.getters['filters/subject']?.id) {
    return BNCC_LABEL_NAME(key, label, subjectId)
  }

  bnccAxisName(subjectId = store.getters['filters/subject']?.id) {
    return BNCC_AXIS_NAME(subjectId)
  }

  variantByContentType(contentName) {
    if (contentName.toLowerCase().includes(this.bnccAxisName().firstAxis.toLowerCase())) {
      return 'firstAxis'
    }
    if (contentName.toLowerCase().includes(this.bnccAxisName().secondAxis.toLowerCase())) {
      return 'secondAxis'
    }
    if (contentName.toLowerCase().includes(this.bnccAxisName().thirdAxis.toLowerCase())) {
      return 'thirdAxis'
    }
    if (contentName.toLowerCase().includes(this.bnccAxisName().fourthAxis.toLowerCase())) {
      return 'fourthAxis'
    }
    if (contentName.toLowerCase().includes(this.bnccAxisName().fifthAxis.toLowerCase())) {
      return 'fifthAxis'
    }

    return ''
  }

  activityType = {
    getNumberByType(type) {
      switch (type) {
        case ActivityTypeEnum.individual:
        case ActivityTypeEnum.individualName:
          return ActivityTypeEnum.individual
        case ActivityTypeEnum.collective:
        case ActivityTypeEnum.collectiveName:
          return ActivityTypeEnum.collective
        case ActivityTypeEnum.mix:
        case ActivityTypeEnum.mixName:
          return ActivityTypeEnum.mix
        default:
          return undefined
      }
    },
    formatText(type) {
      switch (this.getNumberByType(type)) {
        case ActivityTypeEnum.individual:
          return 'Individual'
        case ActivityTypeEnum.collective:
          return 'Coletiva'
        default:
          return 'Mista'
      }
    },
    bgColorForChip(type) {
      switch (this.getNumberByType(type)) {
        case ActivityTypeEnum.individual:
          return 'warning'
        case ActivityTypeEnum.collective:
          return '#0D6EFD'
        default:
          return 'success'
      }
    },
    bgColorForBadge(type) {
      switch (this.getNumberByType(type)) {
        case ActivityTypeEnum.individual:
          return 'individual'
        case ActivityTypeEnum.collective:
          return 'collective'
        default:
          return 'mix'
      }
    },
    isCollective(type) {
      return Boolean(
        ActivityTypeEnum.collective === type || ActivityTypeEnum.collectiveName === type,
      )
    },
    getIconByType(type) {
      let number = null
      if (typeof type === 'string') {
        number = this.getNumberByType(type)
      }

      switch (number) {
        case ActivityTypeEnum.individual:
          return 'icon-user'
        case ActivityTypeEnum.collective:
          return 'people'
        default:
          return 'people'
      }
    },
  }

  modulo = {
    haveModulo(subjectId, moduloId) {
      const { accessModules } = store.getters
      const module = accessModules[subjectId]

      if (!module) {
        return false
      }

      return module.includes(moduloId)
    },
  }

  subjects = {
    genericFunction(id, subjectEnum) {
      return Boolean(id === subjectEnum)
    },
    isMath(subjectId) {
      return (
        this.genericFunction(subjectId, SubjectEnum.math) ||
        this.genericFunction(subjectId, SubjectEnum.mathEnglish)
      )
    },
    isPortuguese(subjectId) {
      return this.genericFunction(subjectId, SubjectEnum.portuguese)
    },
    isMultiliteracy(subjectId) {
      return this.genericFunction(subjectId, SubjectEnum.multiliteracy)
    },
  }

  educationSystem = {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      ) {
        return true
      }
      return false
    },

    /**
     * @typedef {Object} Subject
     * @property {number} subjectId - The unique identifier of the subject.
     * @property {number[]} serieIds - The series identifiers associated with the subject.
     */

    /**
     * Represents the configuration for an educational platform.
     * @typedef {Object} EducationPlatformConfig
     * @property {number} id - The unique identifier of the configuration.
     * @property {string} name - The name of the platform.
     * @property {string} menuColor - The hexadecimal color code for the menu background.
     * @property {string} fontMenuColor - The hexadecimal color code for the menu font.
     * @property {string} menuImageUrl - The URL to the menu's background image.
     * @property {string} imageUrl - The URL to the platform's main image.
     * @property {string} reducedWebMenuImageUrl - The URL to the reduced version of the web menu's image.
     * @property {Subject[]} subjects - An array of subjects associated with the platform.
     *
     * @returns {EducationPlatformConfig}
     */
    getEducationSystem() {
      // Acessa o array de sistemas de educação no estado do Vuex.
      const { educationSystems } = store.state.access
      // Obtém o parâmetro do ID do sistema de educação a partir da rota atual.
      const { menuEducationSystemId } = router.currentRoute.meta

      // Se não houver um ID de sistema de educação na rota, retorna nulo.
      if (!menuEducationSystemId) return null

      // Retorna o objeto de sistema de educação correspondente ao ID fornecido na rota.
      return educationSystems.find(
        educationSystem => educationSystem.id === parseInt(menuEducationSystemId, 10),
      )
    },

    /**
     * Define as variáveis da raiz CSS para personalizar a aparência do menu.
     *
     * @param {string} menuBackgroundColor - A cor de fundo do menu.
     * @param {string} fontMenuColor - A cor do texto do menu.
     * @param {string} menuActiveBackgroundColor - A cor de fundo do item ativo no menu.
     * @param {string} menuActiveFontColor - A cor do texto do item ativo no menu.
     * @param {string} menuActiveBackgroundColorLink - A cor de fundo do link do item ativo no menu.
     */
    setRootVariables(
      menuBackgroundColor,
      fontMenuColor,
      menuActiveBackgroundColor,
      menuActiveFontColor,
      menuActiveBackgroundColorLink,
    ) {
      const rootStyle = document.documentElement.style
      rootStyle.setProperty('--menuBackgroundColor', menuBackgroundColor)
      rootStyle.setProperty('--menuFontColor', fontMenuColor)
      rootStyle.setProperty('--menuActiveBackgroundColor', menuActiveBackgroundColor)
      rootStyle.setProperty('--menuActiveFontColor', menuActiveFontColor)
      rootStyle.setProperty('--menuActiveBackgroundColorLink', menuActiveBackgroundColorLink)
    },

    /**
     * Define a cor do menu e o logotipo com base na página atual e no ID do menu selecionado.
     */
    setColor() {
      const logo = document.querySelector('.logo-container > img:first-of-type')
      const logoMini = document.querySelector('.logo-container > img:last-of-type')
      const role = store.getters.accessRole.toLowerCase()
      const roleKeys = {
        teacher: 'menu_colors_teacher',
        auditor: 'menu_colors_teacher',
        student: 'menu_colors_responsible',
        admin: 'menu_colors_admin',
        manager: 'menu_colors_admin',
        secretariat: 'menu_colors_admin',
        networkmanager: 'menu_colors_admin',
        coordinator: 'menu_colors_admin',
      }

      let styledPalette = store.state.app[roleKeys[role]]

      // Verifica se a rota atual contém o nome do sistema de ensino e atualiza as cores com as cores do sistema de ensino.
      const educationSystem = this.getEducationSystem()

      if (educationSystem) {
        const { menuColor, menuImageUrl, reducedWebMenuImageUrl, fontMenuColor } = educationSystem
        styledPalette = {
          menuBackgroundColor: menuColor,
          menuFontColor: fontMenuColor,
          menuBackgroundSelectedColorPrimary: addAlpha(fontMenuColor, 0.12),
          menuBackgroundSelectedColorSecundary: addAlpha(fontMenuColor, 0.25),
          menuFontSelectedColor: fontMenuColor,
        }

        if (logo) {
          logo.setAttribute('src', menuImageUrl)
        }

        if (logoMini) {
          logoMini.setAttribute('src', reducedWebMenuImageUrl)
        }
      }

      const {
        menuBackgroundColor,
        menuBackgroundSelectedColorPrimary,
        menuBackgroundSelectedColorSecundary,
        menuFontColor,
        menuFontSelectedColor,
      } = styledPalette

      this.setRootVariables(
        menuBackgroundColor,
        menuFontColor,
        menuBackgroundSelectedColorPrimary,
        menuFontSelectedColor,
        menuBackgroundSelectedColorSecundary,
      )
    },
    /**
     * Redefine as variáveis de cor do menu para os valores padrão para o papel do usuário atual.
     */
    resetColors() {
      const role = store.getters.accessRole
      const logo = document.querySelector('.logo-container > img:first-of-type')
      const logoMini = document.querySelector('.logo-container > img:last-of-type')

      const roleKeys = {
        teacher: 'menu_colors_teacher',
        student: 'menu_colors_responsible',
        admin: 'menu_colors_admin',
        manager: 'menu_colors_admin',
        secretariat: 'menu_colors_admin',
        networkmanager: 'menu_colors_admin',
      }

      const styledPalette = store.state.app[roleKeys[role?.toLowerCase()]]

      if (!styledPalette) {
        return
      }

      const {
        menuBackgroundColor,
        menuBackgroundSelectedColorPrimary,
        menuBackgroundSelectedColorSecundary,
        menuFontColor,
        menuFontSelectedColor,
      } = styledPalette

      this.setRootVariables(
        menuBackgroundColor,
        menuFontColor,
        menuBackgroundSelectedColorPrimary,
        menuFontSelectedColor,
        menuBackgroundSelectedColorSecundary,
      )

      const logoMiniBase = getWhitelabelConfig('SmallLogo')
      const logoBase = getWhitelabelConfig('MainLogo')

      logo.setAttribute('src', logoBase)
      logoMini.setAttribute('src', logoMiniBase)
    },
  }

  generateLoginLex(loginEndpoint, redirectUri, clientId, toApp = false) {
    const codeVerifier = generateCodeVerifier(128)
    const hexDigest = sha256(codeVerifier)
    const bytes = new Uint8Array(hexDigest.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
    const codeChallenge = base64UrlEncode(bytes)

    store.commit('codeVerifier', codeVerifier)

    let url = `${loginEndpoint}sso/connect/authorize?redirect_uri=${redirectUri}`
    if (toApp) {
      url += '/app'
    }
    url += `&code_challenge=${codeChallenge}&code_challenge_method=S256&response_type=code&client_id=${clientId}&scope=openid profile`
    return url
  }

  generateLoginLexUri(toApp = false) {
    return this.generateLoginLex(
      import.meta.env.VITE_APP_LEX_LOGIN,
      import.meta.env.VITE_APP_LEX_REDIRECT,
      import.meta.env.VITE_APP_LEX_CLIENT_ID,
      toApp,
    )
  }

  generateLoginLexMapleUri(toApp = false) {
    return this.generateLoginLex(
      import.meta.env.VITE_APP_LEX_MAPLE_LOGIN,
      import.meta.env.VITE_APP_LEX_MAPLE_REDIRECT,
      import.meta.env.VITE_APP_LEX_MAPLE_CLIENT_ID,
      toApp,
    )
  }

  handleFormatErrors(errors) {
    const errorsArray = []

    Object.keys(errors).forEach(key => {
      if (Array.isArray(errors[key])) {
        errors[key].forEach(element => errorsArray.push(`${element}`))
      } else {
        errorsArray.push(`${errors[key]}`)
      }
    })

    return errorsArray
  }
}

export default new UtilTeacherService()
