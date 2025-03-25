// MUI Imports
import type { Theme } from '@mui/material/styles'

// Config Imports
import themeConfig from '@configs/themeConfig'

const tabs: Theme['components'] = {
  MuiTabs: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        minBlockSize: 38,
        ...(ownerState.orientation === 'horizontal'
          ? {
              borderBlockEnd: '1px solid var(--mui-palette-divider)'
            }
          : {
              borderInlineEnd: '1px solid var(--mui-palette-divider)'
            }),
        '& .MuiTab-root:hover': {
          color: `var(--mui-palette-${ownerState.textColor}-main)`,
          ...(ownerState.orientation === 'horizontal'
            ? {
                paddingBlockEnd: theme.spacing(1.5),
                borderBlockEnd: `2px solid var(--mui-palette-${ownerState.textColor}-lightOpacity)`
              }
            : {
                paddingInlineEnd: theme.spacing(4.5),
                borderInlineEnd: `2px solid var(--mui-palette-${ownerState.textColor}-lightOpacity)`
              })
        },
        '& .MuiTabScrollButton-root': {
          borderRadius: 'var(--mui-shape-borderRadius)'
        },
        '& ~ .MuiTabPanel-root': {
          ...(ownerState.orientation === 'horizontal'
            ? {
                paddingBlockStart: theme.spacing(6)
              }
            : {
                paddingInlineStart: theme.spacing(6)
              })
        }
      }),
      vertical: {
        minWidth: 131,
        '& .MuiTab-root': {
          minWidth: 130
        }
      }
    }
  },
  MuiTab: {
    defaultProps: {
      disableRipple: themeConfig.disableRipple
    },
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        lineHeight: 1.4667,
        padding: theme.spacing(2, 5),
        minBlockSize: 38,
        color: 'var(--mui-palette-text-primary)',
        '& > .MuiTab-iconWrapper': {
          fontSize: '1.125rem',
          ...(ownerState.iconPosition === 'top' && {
            marginBlockEnd: theme.spacing(1.5)
          }),
          ...(ownerState.iconPosition === 'bottom' && {
            marginBlockStart: theme.spacing(1.5)
          }),
          ...(ownerState.iconPosition === 'start' && {
            marginInlineEnd: theme.spacing(1.5)
          }),
          ...(ownerState.iconPosition === 'end' && {
            marginInlineStart: theme.spacing(1.5)
          })
        }
      })
    }
  },
  MuiTabPanel: {
    styleOverrides: {
      root: {
        padding: 0
      }
    }
  }
}

export default tabs
