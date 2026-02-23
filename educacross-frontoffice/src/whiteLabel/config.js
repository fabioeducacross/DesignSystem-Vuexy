import LogoLoginEduca from '@/assets/images/pages/login/LogoLogin.svg'
// Asset imports (Vite will transform these to URLs)
import MainLogoEduca from '@/assets/images/whitelabel-teacher/educacross/MainLogo.svg'
import HowToPlayEduca from '@/assets/images/whitelabel-teacher/educacross/how-to-play/play.png'
import LogoDigitalEvaluationEduca from '@/assets/images/whitelabel-teacher/educacross/logo-digital-evaluation.svg'
import LightLogoEduca from '@/assets/images/whitelabel-teacher/educacross/logo-light.svg'
import SmallLogoEduca from '@/assets/images/whitelabel-teacher/educacross/logo-mini.png'
import SecondaryLogoEduca from '@/assets/images/whitelabel-teacher/educacross/logo-secundario.svg'
import HoraMatHorizontal from '@/assets/images/whitelabel-teacher/seduc/HoraMatematica-horizontal.png'
import ColoredLogoSeduc from '@/assets/images/whitelabel-teacher/seduc/colored_logo.png'
import SmallLogoSeduc from '@/assets/images/whitelabel-teacher/seduc/logo-mini.png'
import SEDUCStudentCard from '@/assets/images/whitelabel-teacher/seduc/seduc-card.png'
import LogoSomosPlayReduced from '@/assets/images/whitelabel-teacher/somosplay/logo-reduced.png'
import LogoSomosPlay from '@/assets/images/whitelabel-teacher/somosplay/logo.png'
import ColoredLogoSuper from '@/assets/images/whitelabel-teacher/superensino/colored_logo.png'
import HowToPlaySuper from '@/assets/images/whitelabel-teacher/superensino/how-to-play/play.png'
import SmallLogoSuper from '@/assets/images/whitelabel-teacher/superensino/logo-mini.png'
/**
 * Represents a platform configuration for a specific operating system.
 * @typedef {Object} PlatformConfig
 * @property {string} id - Unique identifier of the app in the store.
 * @property {string} link - URL to the app in the store.
 */

/**
 * Represents a collection of platform configurations.
 * @typedef {Object} Platforms
 * @property {PlatformConfig} Android - Android platform configuration.
 * @property {PlatformConfig} IOS - iOS platform configuration.
 * @property {PlatformConfig} Windows - Windows platform configuration.
 * @property {PlatformConfig} MacOS - macOS platform configuration.
 */

/**
 * Represents additional images used in the whitelabel configuration.
 * @typedef {Object} ImageConfig
 * @property {Object} howToPlay - Section for "how to play" tutorial images.
 * @property {*} howToPlay.play - Image resource for how-to-play instructions.
 */

/**
 * Represents the configuration for a specific whitelabel (brand).
 * @typedef {Object} WhiteLabelConfig
 * @property {WhitelabelEnum} Id - Unique identifier from WhitelabelEnum.
 * @property {string} name - Display name of the brand.
 * @property {string} logo - Path or URL to the main logo.
 * @property {string} appName - Application name.
 * @property {string} helpLink - URL to help/support.
 * @property {string} phoneNumber - Support phone number.
 * @property {string} commonQuestionsLink - Link to FAQ or common questions.
 * @property {string} logoCard - Logo for cards.
 * @property {string} logoCertificate - Logo for certificates.
 * @property {string} domain - Domain name of the brand.
 * @property {string} [instagramTag] - Instagram handle/tag.
 * @property {string} [apiWhats] - WhatsApp support link.
 * @property {string} logoAccessLetter - Logo for access letters.
 * @property {string} [email] - Support email or link.
 * @property {string} Name - Display name (alternative key).
 * @property {*} MainLogo - Required logo asset (main).
 * @property {*} [SecondaryLogo] - Required logo asset (secondary).
 * @property {*} [LightLogo] - Required logo asset (light theme).
 * @property {*} LogoLogin - Logo used in login page.
 * @property {*} SmallLogo - Small/minimized logo.
 * @property {*} [LogoStudentCard] - Logo used in student cards.
 * @property {*} [LogoDigitalEvaluation] - Logo for digital evaluation.
 * @property {string} SuportUrl - Support page URL.
 * @property {string} DeepLinking - Deeplink scheme name.
 * @property {string} SiteUrl - Official site URL.
 * @property {string} [FacebookUrl] - Facebook page URL.
 * @property {string} [YouTubeUrl] - YouTube channel URL.
 * @property {string} [InstagramUrl] - Instagram page URL.
 * @property {string} [InstagramUsername] - Instagram username.
 * @property {string} CommonQuestionsUrl - Alternate common questions link.
 * @property {string} PhoneNumber - Alternate phone number key.
 * @property {string} AppName - Alternate app name key.
 * @property {string} SuggestedMission - Suggested mission name.
 * @property {string} [WindowsInstallerLink] - Link to Windows installer (if applicable).
 * @property {string} NeedHelpHowToInstall - URL to help page for installation.
 * @property {string} LinksToPlatformForStudents - URL with instructions for students.
 * @property {string} [loginUrlManageAccount] - Login URL for managing accounts.
 * @property {string} [suporteWhatsapp] - WhatsApp support link.
 * @property {string} BeautifulUrl - Friendly URL for display.
 * @property {string} BeautifulHelpUrl - Friendly help URL for display.
 * @property {boolean} Typebot - Whether Typebot integration is enabled.
 * @property {Platforms} platforms - Platform-specific configurations.
 * @property {ImageConfig} [images] - Image-related configuration.
 * @property {boolean} showOthersLogins - Whether to show other login options.
 */
import { WhitelabelEnum } from '@/consts/WhitelabelEnum'

/**
 * Exported whitelabel configurations for multiple brands.
 * @type {Object<string, WhiteLabelConfig>}
 */
export default {
  educacross: {
    Id: WhitelabelEnum.Educacross,
    name: 'Educacross',
    logo: '/images/images-educa/logo/logo-educacross.png',
    appName: 'Educacross',
    helpLink: 'https://www.educacross.link/ajuda',
    phoneNumber: '(16) 99299-4152',
    commonQuestionsLink: 'https://suporte.educacross.com.br/hc/pt-br',
    logoCard: 'logoeducaCard.png',
    logoCertificate: 'assets/images/certificate/logo-certificate.png',
    domain: 'www.educacross.com.br',
    instagramTag: '@educacross',
    apiWhats: 'https://educacross.link/whats-suporte',
    logoAccessLetter: 'logoEducaAccessLetter.png',
    email: 'https://educalovers.link/e-mail-suporte',
    Name: 'Educacross',
    MainLogo: MainLogoEduca,
    SecondaryLogo: SecondaryLogoEduca,
    LightLogo: LightLogoEduca,
    LogoLogin: LogoLoginEduca,
    SmallLogo: SmallLogoEduca,
    LogoStudentCard: SecondaryLogoEduca,
    LogoDigitalEvaluation: LogoDigitalEvaluationEduca,
    SuportUrl: 'https://educacross.link/ajuda',
    DeepLinking: 'educacross',
    SiteUrl: 'www.educacross.com.br',
    FacebookUrl: 'https://www.facebook.com/educacross',
    YouTubeUrl: 'https://www.youtube.com/channel/UCtUM_NMMUd2vO35C-LBYK6Q',
    InstagramUrl: 'https://www.instagram.com/educacross/',
    InstagramUsername: 'educacross',
    CommonQuestionsUrl: 'https://educalovers.link/ajuda-deeplink',
    PhoneNumber: '(16) 99299-4152',
    AppName: 'Educacross',
    SuggestedMission: 'Missao Educacross',
    NeedHelpHowToInstall: 'https://educacross.link/ajuda',
    LinksToPlatformForStudents: 'https://educacross.link/como-jogar',
    suporteWhatsapp: 'https://educacross.link/whats-suporte',
    BeautifulUrl: 'www.educacross.com.br',
    BeautifulHelpUrl: 'https://educacross.link/ajuda',
    Typebot: true,
    platforms: {
      Android: {
        id: 'com.CrossReality.EducaCrossMatematica',
        link: 'https://play.google.com/store/apps/details?id=com.CrossReality.EducaCrossMatematica',
      },
      IOS: {
        id: 'id1078681509',
        link: 'https://apps.apple.com/br/app/hora-da-matem%C3%A1tica/id1078681509',
      },
      Windows: {
        id: '9nblggh4nxfk',
        link: 'https://apps.microsoft.com/detail/9nblggh4nxfk?hl=en-us&gl=BR',
      },
      MacOS: {
        id: 'id1173574950',
        link: 'https://apps.apple.com/br/app/hora-da-matem%C3%A1tica/id1173574950',
      },
    },
    images: {
      howToPlay: {
        play: HowToPlayEduca,
      },
    },
    showOthersLogins: true,
  },
  superensino: {
    Id: WhitelabelEnum.SuperEnsino,
    name: 'Super Ensino',
    logo: '/whitelabel/superensino/logo.png',
    appName: 'Super Ensino Games',
    helpLink: 'https://www.superensino.com.br/contato?hsLang=pt-br#faq',
    phoneNumber: '(92) 3042-6800',
    commonQuestionsLink: 'https://www.superensino.com.br/contato?hsLang=pt-br#faq',
    logoCard: 'whitelabel/superensino/logo-card.png',
    logoCertificate: 'assets/images/pdf/whitelabel/superensino/logo-card.png',
    domain: 'www.superensinogames.com.br',
    instagramTag: '@superensino',
    apiWhats: 'https://educacross.link/Superensinowhatsapp',
    logoAccessLetter: 'whitelabel/superensino/logo-card.png',
    Name: 'Super Ensino Games',
    MainLogo: ColoredLogoSuper,
    SecondaryLogo: ColoredLogoSuper,
    LightLogo: ColoredLogoSuper,
    LogoLogin: ColoredLogoSuper,
    SmallLogo: SmallLogoSuper,
    LogoStudentCard: ColoredLogoSuper,
    LogoDigitalEvaluation: ColoredLogoSuper,
    SuportUrl: 'https://suporte.superensino.com.br/professores',
    DeepLinking: 'superensino',
    SiteUrl: 'www.superensino.com.br',
    FacebookUrl: 'https://www.facebook.com/go.superensino/',
    YouTubeUrl: 'https://www.youtube.com/c/SUPERENSINOeducacao',
    InstagramUrl: 'https://www.instagram.com/superensino/',
    InstagramUsername: 'superensino',
    CommonQuestionsUrl: 'https://suporte.superensino.com.br/aluno/games',
    PhoneNumber: '(92) 3042-6800',
    AppName: 'SuperEnsinoGames',
    SuggestedMission: 'Missao Sugerida',
    WindowsInstallerLink: 'https://superensino.link/aluno-windows-instalador',
    NeedHelpHowToInstall: 'https://educacross.link/Super_comojogar',
    LinksToPlatformForStudents: 'https://www.superensino.com.br/contato?hsLang=pt-br#faq',
    loginUrlManageAccount: 'https://acesso.superensino.com.br/escolas/',
    suporteWhatsapp: 'https://api.whatsapp.com/send?phone=559230426800',
    BeautifulUrl: 'acesso.superensino.com.br',
    BeautifulHelpUrl: 'superensino.link/suporte',
    Typebot: false,
    platforms: {
      Android: {
        id: 'com.CrossReality.SuperEnsinoGames',
        link: 'https://play.google.com/store/apps/details?id=com.CrossReality.SuperEnsinoGames',
      },
      IOS: {
        id: 'id1608021121',
        link: 'https://apps.apple.com/br/app/super-ensino-games/id1608021121',
      },
      Windows: {
        id: '9mwlprhpvd70',
        link: 'https://apps.microsoft.com/detail/9mwlprhpvd70?hl=en-us&gl=BR',
      },
      MacOS: {
        id: 'id1608021121',
        link: 'https://apps.apple.com/br/app/super-ensino-games/id1608021121',
      },
    },
    images: {
      howToPlay: {
        play: HowToPlaySuper,
      },
    },
    showOthersLogins: false,
  },
  seduc: {
    Id: WhitelabelEnum.SEDUC,
    name: 'Hora da Matematica',
    logo: '/whitelabel/seduc/logo.png',
    appName: 'Hora da Matematica',
    helpLink: 'https://www.educacross.link/ajuda',
    phoneNumber: '(16) 99299-4152',
    commonQuestionsLink: 'https://suporte.educacross.com.br/hc/pt-br',
    logoCard: 'whitelabel/seduc/logo-card.png',
    logoCertificate: 'assets/images/pdf/whitelabel/seduc/logo-card.png',
    domain: 'account.horadamatematica.com.br',
    instagramTag: '@horadamatematica',
    apiWhats: 'https://educacross.link/whats-suporte',
    logoAccessLetter: 'whitelabel/seduc/logo-card.png',
    email: 'https://educalovers.link/e-mail-suporte',
    Name: 'Hora da Matematica',
    MainLogo: HoraMatHorizontal,
    LightLogo: HoraMatHorizontal,
    LogoLogin: ColoredLogoSeduc,
    SecondaryLogo: ColoredLogoSeduc,
    SmallLogo: SmallLogoSeduc,
    LogoStudentCard: SEDUCStudentCard,
    SuportUrl: 'https://educacross.link/ajuda',
    DeepLinking: 'educacross',
    SiteUrl: 'account.horadamatematica.com.br',
    FacebookUrl: 'https://www.facebook.com/educacross',
    YouTubeUrl: 'https://www.youtube.com/channel/UCtUM_NMMUd2vO35C-LBYK6Q',
    InstagramUrl: 'https://www.instagram.com/educacross/',
    InstagramUsername: 'horadamatematica',
    CommonQuestionsUrl: 'https://educalovers.link/ajuda-deeplink',
    PhoneNumber: '(16) 99299-4152',
    AppName: 'Hora da Matematica',
    SuggestedMission: 'Missao Hora da Matematica',
    WindowsInstallerLink: 'https://educacross.link/aluno-windows-instalador',
    NeedHelpHowToInstall: 'https://educacross.link/ajuda',
    LinksToPlatformForStudents: 'https://educacross.link/como-jogar',
    suporteWhatsapp: 'https://educacross.link/whats-suporte',
    BeautifulUrl: 'account.horadamatematica.com.br',
    BeautifulHelpUrl: 'https://educacross.link/ajuda',
    Typebot: true,
    platforms: {
      Android: {
        id: 'com.CrossReality.EducaCrossMatematica',
        link: 'https://play.google.com/store/apps/details?id=com.CrossReality.EducaCrossMatematica',
      },
      IOS: {
        id: 'id1078681509',
        link: 'https://apps.apple.com/br/app/hora-da-matem%C3%A1tica/id1078681509',
      },
      Windows: {
        id: '9nblggh4nxfk',
        link: 'https://apps.microsoft.com/detail/9nblggh4nxfk?hl=en-us&gl=BR',
      },
      MacOS: {
        id: 'id1173574950',
        link: 'https://apps.apple.com/br/app/hora-da-matem%C3%A1tica/id1173574950',
      },
    },
    showOthersLogins: false,
  },
  somosplay: {
    Id: WhitelabelEnum.SomosPlay,
    name: 'Somos Play',
    logo: '/whitelabel/somosplay/logo.png',
    appName: 'Somos Play',
    helpLink: 'https://ajuda.plurall.net/hc/pt-br',
    phoneNumber: '(11) 4003-3061',
    commonQuestionsLink: 'https://ajuda.plurall.net/hc/pt-br',
    logoCard: 'whitelabel/somosplay/logo.png',
    logoCertificate: 'assets/images/pdf/whitelabel/somosplay/logo.png',
    domain: 'somosplay.educacross.com.br',
    // instagramTag: '@somosplay',
    // apiWhats: 'https://api.whatsapp.com/send?phone=', // WhatsApp desabilitado
    logoAccessLetter: 'whitelabel/somosplay/logo.png',
    // email: 'faleconosco@somoseducacao.com.br', // E-mail desabilitado para Somos Play
    Name: 'Somos Play',
    MainLogo: LogoSomosPlay,
    LightLogo: LogoSomosPlay,
    LogoLogin: LogoSomosPlay,
    SecondaryLogo: LogoSomosPlay,
    SmallLogo: LogoSomosPlayReduced,
    LogoStudentCard: LogoSomosPlay,
    SuportUrl: 'https://ajuda.plurall.net/hc/pt-br',
    DeepLinking: 'somosplay',
    SiteUrl: 'somosplay.educacross.com.br',
    CommonQuestionsUrl: 'https://ajuda.plurall.net/hc/pt-br',
    PhoneNumber: '(11) 4003-3061',
    AppName: 'Somos Play',
    SuggestedMission: 'Missao Somos Play',
    NeedHelpHowToInstall: 'https://ajuda.plurall.net/hc/pt-br',
    LinksToPlatformForStudents: 'https://ajuda.plurall.net/hc/pt-br',
    BeautifulUrl: 'somosplay.educacross.com.br',
    BeautifulHelpUrl: 'https://ajuda.plurall.net/hc/pt-br',
    Typebot: false, // Chat desabilitado para Somos Play
    platforms: {
      Android: {
        id: 'com.crossreality.plurallgames',
        link: 'https://play.google.com/store/apps/details?id=com.crossreality.plurallgames',
      },
      IOS: {
        id: 'id6748966801',
        link: 'https://apps.apple.com/br/app/somos-play/id6748966801',
      },
      Windows: {
        id: '9ndmfxzrtrrk',
        link: 'https://apps.microsoft.com/detail/9ndmfxzrtrrk?hl=pt-BR&gl=BR',
      },
      MacOS: {
        id: 'id6748966801',
        link: 'https://apps.apple.com/br/app/somos-play/id6748966801',
      },
    },
    showOthersLogins: false,
  },
}
