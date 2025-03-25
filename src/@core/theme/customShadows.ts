// MUI Imports
import type { Theme } from '@mui/material/styles'

// Type Imports
import type { SystemMode } from '@core/types'

const customShadows = (mode: SystemMode): Theme['customShadows'] => {
  return {
    xs: `0px 1px 5px rgb(var(--mui-mainColorChannels-${mode}Shadow) / ${mode === 'light' ? 0.06 : 0.18})`,
    sm: `0px 2px 6px rgb(var(--mui-mainColorChannels-${mode}Shadow) / ${mode === 'light' ? 0.08 : 0.2})`,
    md: `0px 3px 8px rgb(var(--mui-mainColorChannels-${mode}Shadow) / ${mode === 'light' ? 0.1 : 0.22})`,
    lg: `0px 4px 12px rgb(var(--mui-mainColorChannels-${mode}Shadow) / ${mode === 'light' ? 0.14 : 0.24})`,
    xl: `0px 5px 22px rgb(var(--mui-mainColorChannels-${mode}Shadow) / ${mode === 'light' ? 0.18 : 0.26})`,
    primary: {
      sm: '0px 2px 4px rgb(var(--mui-palette-primary-mainChannel) / 0.4)',
      md: '0px 4px 16px rgb(var(--mui-palette-primary-mainChannel) / 0.45)',
      lg: '0px 10px 20px rgb(var(--mui-palette-primary-mainChannel) / 0.4)'
    },
    secondary: {
      sm: '0px 2px 4px rgb(var(--mui-palette-secondary-mainChannel) / 0.4)',
      md: '0px 4px 16px rgb(var(--mui-palette-secondary-mainChannel) / 0.45)',
      lg: '0px 10px 20px rgb(var(--mui-palette-secondary-mainChannel) / 0.4)'
    },
    error: {
      sm: '0px 2px 4px rgb(var(--mui-palette-error-mainChannel) / 0.4)',
      md: '0px 4px 16px rgb(var(--mui-palette-error-mainChannel) / 0.45)',
      lg: '0px 10px 20px rgb(var(--mui-palette-error-mainChannel) / 0.4)'
    },
    warning: {
      sm: '0px 2px 4px rgb(var(--mui-palette-warning-mainChannel) / 0.4)',
      md: '0px 4px 16px rgb(var(--mui-palette-warning-mainChannel) / 0.45)',
      lg: '0px 10px 20px rgb(var(--mui-palette-warning-mainChannel) / 0.4)'
    },
    info: {
      sm: '0px 2px 4px rgb(var(--mui-palette-info-mainChannel) / 0.4)',
      md: '0px 4px 16px rgb(var(--mui-palette-info-mainChannel) / 0.45)',
      lg: '0px 10px 20px rgb(var(--mui-palette-info-mainChannel) / 0.4)'
    },
    success: {
      sm: '0px 2px 4px rgb(var(--mui-palette-success-mainChannel) / 0.4)',
      md: '0px 4px 16px rgb(var(--mui-palette-success-mainChannel) / 0.45)',
      lg: '0px 10px 20px rgb(var(--mui-palette-success-mainChannel) / 0.4)'
    }
  }
}

export default customShadows
