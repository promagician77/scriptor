// Next Imports
import { Public_Sans } from 'next/font/google'

// MUI Imports
import type { Theme } from '@mui/material/styles'

// Type Imports
import type { Settings } from '@core/contexts/settingsContext'
import type { Skin, SystemMode } from '@core/types'

// Theme Options Imports
import overrides from './overrides'
import colorSchemes from './colorSchemes'
import spacing from './spacing'
import shadows from './shadows'
import customShadows from './customShadows'
import typography from './typography'

const public_sans = Public_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700', '800', '900'] })

const theme = (settings: Settings, mode: SystemMode, direction: Theme['direction']): Theme => {
  return {
    direction,
    components: overrides(settings.skin as Skin),
    colorSchemes: colorSchemes(settings.skin as Skin),
    ...spacing,
    shape: {
      borderRadius: 6,
      customBorderRadius: {
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10
      }
    },
    shadows: shadows(mode),
    typography: typography(public_sans.style.fontFamily),
    customShadows: customShadows(mode),
    mainColorChannels: {
      light: '34 48 62',
      dark: '230 230 241',
      lightShadow: '34 48 62',
      darkShadow: '20 20 29'
    }
  } as Theme
}

export default theme
