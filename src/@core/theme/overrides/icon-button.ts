// MUI Imports
import type { Theme } from '@mui/material/styles'

// Config Imports
import themeConfig from '@configs/themeConfig'

const iconButton: Theme['components'] = {
  MuiIconButton: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        '& .MuiSvgIcon-root, & i, & svg': {
          fontSize: 'inherit'
        },
        ...(ownerState.color === 'default'
          ? {
              '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
                backgroundColor: 'rgb(var(--mui-palette-text-primaryChannel) / 0.08)'
              },
              ...(themeConfig.disableRipple && {
                '&.Mui-focusVisible:not(.Mui-disabled)': {
                  backgroundColor: 'rgb(var(--mui-palette-text-primaryChannel) / 0.08)'
                }
              }),
              '&.Mui-disabled': {
                opacity: 0.45,
                color: 'var(--mui-palette-action-active)'
              }
            }
          : {
              ...(ownerState.color !== 'inherit' && {
                '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
                  backgroundColor: `var(--mui-palette-${ownerState.color}-lighterOpacity)`
                },
                ...(themeConfig.disableRipple && {
                  '&.Mui-focusVisible:not(.Mui-disabled)': {
                    backgroundColor: `var(--mui-palette-${ownerState.color}-lighterOpacity)`
                  }
                }),
                '&.Mui-disabled': {
                  opacity: 0.45,
                  color: `var(--mui-palette-${ownerState.color}-main)`
                }
              })
            })
      }),
      sizeSmall: ({ theme }) => ({
        padding: theme.spacing(1.25),
        fontSize: '1.25rem'
      }),
      sizeMedium: ({ theme }) => ({
        padding: theme.spacing(2),
        fontSize: '1.375rem'
      }),
      sizeLarge: ({ theme }) => ({
        padding: theme.spacing(3),
        fontSize: '1.5rem'
      })
    }
  }
}

export default iconButton
