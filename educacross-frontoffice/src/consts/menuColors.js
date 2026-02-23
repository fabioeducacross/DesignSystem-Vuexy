import { addAlpha } from '@/utils/utils'
import { colors } from '@themeConfig'

const WHITE_TONE = '#fff'
const PURPLE = '#6463e8'
const BLUE = '#0089ca'
const GREEN = '#133d59'
const WINE = '#311B48'
const DARKENED = '#1c0f2a'
const PRIMARY = colors.primary

const GRAY = () => document.body.style.getPropertyValue('--gray')

const menuColors = {
  educacrossTeacher: {
    menuFontColor: WHITE_TONE,
    menuBackgroundColor: DARKENED,
    menuFontSelectedColor: WHITE_TONE,
    menuBackgroundSelectedColorPrimary: WINE,
    menuBackgroundSelectedColorSecundary: PURPLE,
  },
  educacrossAdmin: {
    menuFontColor: GRAY,
    menuBackgroundColor: WHITE_TONE,
    menuFontSelectedColor: PRIMARY,
    menuBackgroundSelectedColorPrimary: addAlpha(PRIMARY, 0.12),
    menuBackgroundSelectedColorSecundary: addAlpha(PRIMARY, 0.12),
  },
  educacrossResponsible: {
    menuFontColor: WHITE_TONE,
    menuBackgroundColor: GREEN,
    menuFontSelectedColor: WHITE_TONE,
    menuBackgroundSelectedColorPrimary: PURPLE,
    menuBackgroundSelectedColorSecundary: PURPLE,
  },
  superensino: {
    menuFontColor: WHITE_TONE,
    menuBackgroundColor: BLUE,
    menuFontSelectedColor: WHITE_TONE,
    menuBackgroundSelectedColorPrimary: addAlpha('#000000', 0.35),
    menuBackgroundSelectedColorSecundary: addAlpha('#000000', 0.5),
  },
  somosplay: {
    menuFontColor: WHITE_TONE,
    menuBackgroundColor: DARKENED,
    menuFontSelectedColor: WHITE_TONE,
    menuBackgroundSelectedColorPrimary: WINE,
    menuBackgroundSelectedColorSecundary: PURPLE,
  },
}

export default menuColors
