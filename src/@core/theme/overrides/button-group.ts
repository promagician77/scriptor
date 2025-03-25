// MUI Imports
import type { Theme } from '@mui/material/styles'

// Config Imports
import themeConfig from '@configs/themeConfig'

const buttonGroup: Theme['components'] = {
  MuiButtonGroup: {
    defaultProps: {
      disableRipple: themeConfig.disableRipple
    },
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.variant === 'tonal' &&
          ownerState.color !== 'inherit' && {
            '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
              '&, &.Mui-disabled': {
                ...(ownerState.orientation === 'horizontal'
                  ? {
                      borderRight: `1px solid var(--mui-palette-${ownerState.color}-darkOpacity)`
                    }
                  : {
                      borderBottom: `1px solid var(--mui-palette-${ownerState.color}-darkOpacity)`
                    })
              }
            }
          })
      }),
      text: ({ ownerState }) => ({
        ...(ownerState.color !== 'inherit' && {
          '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
            '&, &.Mui-disabled': {
              borderColor: `var(--mui-palette-${ownerState.color}-main)`
            }
          }
        })
      }),
      contained: ({ ownerState }) => ({
        ...(ownerState.color !== 'inherit' && {
          '&:not(.Mui-disabled)': {
            boxShadow: `var(--mui-customShadows-${ownerState.color}-sm)`
          },
          '& .MuiButtonGroup-firstButton, & .MuiButtonGroup-middleButton': {
            '&, &.Mui-disabled': {
              borderColor: `var(--mui-palette-${ownerState.color}-dark)`
            }
          }
        })
      })
    }
  }
}

export default buttonGroup
