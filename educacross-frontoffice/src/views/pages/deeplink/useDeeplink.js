import androidIcon from '@/assets/images/icons/android-icon.svg'
import appleIcon from '@/assets/images/icons/apple-icon.svg'
import windowsIcon from '@/assets/images/icons/windows-icon.svg'
import getWhitelabelConfig from '@/services/whitelabel/WhiteLabel.Service'
import { ref, computed } from 'vue'

/**
 * @typedef {Object} System
 * @property {string} name - The name of the operating system.
 * @property {string} icon - The path to the icon of the operating system.
 * @property {string} app_deeplink - The application deep link URL.
 * @property {string} store_deeplink - The store deep link URL.
 * @property {string} store_link - The store link URL.
 * @property {RegExp} regex - The regular expression to match the user agent.
 */

/**
 * Composable for handling deeplinks based on the user's operating system.
 * @returns {Object} An object containing the `systems`, `currentSystemDeepLinkContext`, and deeplink methods.
 */
export function useDeeplink() {
  const deeplinkContext = getWhitelabelConfig('DeepLinking')
  const platforms = getWhitelabelConfig('platforms')

  /**
   * @type {Object<string, System>}
   */
  const systems = {
    Windows: {
      name: 'Windows',
      icon: windowsIcon,
      app_deeplink: `${deeplinkContext}://`,
      store_deeplink: `ms-windows-store://pdp?productid=${platforms?.Windows.id}`,
      store_link: platforms.Windows.link,
      regex: /Windows/,
    },
    MacOs: {
      name: 'MacOS',
      icon: appleIcon,
      app_deeplink: `${deeplinkContext}://`,
      store_deeplink: `macappstore://apps.apple.com/us/app/safari/${platforms?.MacOS.id}`,
      store_link: platforms.MacOS.link,
      regex: /Macintosh/,
    },
    Android: {
      name: 'Android',
      icon: androidIcon,
      app_deeplink: `${deeplinkContext}://`,
      store_deeplink: `market://launch?id=${platforms?.Android.id}`,
      store_link: platforms.Android.link,
      regex: /Android|CrOS/,
    },
    IOS: {
      name: 'IOS',
      icon: appleIcon,
      app_deeplink: `${deeplinkContext}://`,
      store_deeplink: `itms-apps://apps.apple.com/us/app/safari/${platforms?.IOS.id}`,
      store_link: platforms.IOS.link,
      regex: /iPhone|iPad|iPod/,
    },
  }

  /**
   * Retrieves the system information based on the user agent.
   * @returns {System} An object containing the system information.
   */
  const getSystemDeeplink = () => {
    const userAgent = navigator.userAgent
    let sys = null

    Object.values(systems).forEach(system => {
      if (system.regex.test(userAgent)) {
        sys = system
      }
    })

    if (!sys && /Linux/.test(userAgent) && isPortrait()) {
      return {
        name: 'Linux',
        icon: androidIcon,
        app_deeplink: `${deeplinkContext}://`,
        store_link: platforms.Android.link,
        regex: /Linux/,
      }
    }

    return sys
  }

  const isPortrait = () => {
    return window.innerWidth < window.innerHeight
  }

  const currentSystemDeepLinkContext = computed(() => getSystemDeeplink())

  const openDeepLink = link => {
    window.location.href = link
  }

  const openWeb = params => {
    window.open(`${import.meta.env.VITE_APP_WEBGL_PLAY_LINK}${params}`, '_blank')
  }

  /**
   * Opens the store link for the specified system on the browser. If the system is the current system, it will open the app deeplink.
   * @param {System} system
   * @returns {void}
   */
  const openStore = system => {
    if (system === currentSystemDeepLinkContext.value) {
      openDeepLink(system.store_deeplink)
    } else {
      window.open(system.store_link, '_blank')
    }
  }

  return {
    systems,
    currentSystemDeepLinkContext,
    openDeepLink,
    openWeb,
    openStore,
  }
}