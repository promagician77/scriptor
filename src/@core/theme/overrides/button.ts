// MUI Imports
import type { Theme } from '@mui/material/styles'

// Config Imports
import themeConfig from '@configs/themeConfig'

const iconStyles = (size?: string) => ({
  '& > *:nth-of-type(1)': {
    ...(size === 'small'
      ? {
          fontSize: '1rem'
        }
      : {
          ...(size === 'medium'
            ? {
                fontSize: '1.125rem'
              }
            : {
                fontSize: '1.25rem'
              })
        })
  }
})

const button: Theme['components'] = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: themeConfig.disableRipple
    }
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        '&.Mui-disabled': {
          opacity: 0.45,
          ...(ownerState.variant === 'tonal' &&
            ownerState.color !== 'inherit' && {
              color: `var(--mui-palette-${ownerState.color}-main)`
            })
        },
        transition: theme.transitions.create('all', {
          duration: theme.transitions.duration.shorter
        }),
        '&:not(.Mui-disabled):not(.MuiButtonGroup-grouped):hover': {
          transform: 'translateY(-1px)'
        },
        ...(ownerState.variant === 'text'
          ? {
              ...(ownerState.size === 'small' && {
                padding: theme.spacing(1.5, 2)
              }),
              ...(ownerState.size === 'medium' && {
                padding: theme.spacing(2, 3)
              }),
              ...(ownerState.size === 'large' && {
                padding: theme.spacing(2.75, 4)
              })
            }
          : {
              ...(ownerState.variant === 'outlined'
                ? {
                    ...(ownerState.size === 'small' && {
                      padding: theme.spacing(1.25, 2.75)
                    }),
                    ...(ownerState.size === 'medium' && {
                      padding: theme.spacing(1.75, 4.75)
                    }),
                    ...(ownerState.size === 'large' && {
                      padding: theme.spacing(2.5, 5.75)
                    })
                  }
                : {
                    ...(ownerState.size === 'small' && {
                      padding: theme.spacing(1.5, 3)
                    }),
                    ...(ownerState.size === 'medium' && {
                      padding: theme.spacing(2, 5)
                    }),
                    ...(ownerState.size === 'large' && {
                      padding: theme.spacing(2.75, 6)
                    })
                  })
            }),
        ...(ownerState.variant === 'tonal' &&
          ownerState.color !== 'inherit' && {
            backgroundColor: `var(--mui-palette-${ownerState.color}-lightOpacity)`,
            color: `var(--mui-palette-${ownerState.color}-main)`,
            '&:not(.Mui-disabled):hover': {
              color: `var(--mui-palette-${ownerState.color}-contrastText)`,
              backgroundColor: `var(--mui-palette-${ownerState.color}-dark)`,
              borderColor: `var(--mui-palette-${ownerState.color}-dark)`,
              boxShadow: `var(--mui-customShadows-${ownerState.color}-sm)`
            },
            '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
              color: `var(--mui-palette-${ownerState.color}-contrastText)`,
              backgroundColor: `var(--mui-palette-${ownerState.color}-dark)`,
              borderColor: `var(--mui-palette-${ownerState.color}-dark)`,
              boxShadow: 'none'
            }
          })
      }),
      sizeSmall: ({ theme }) => ({
        lineHeight: 1.38462,
        fontSize: theme.typography.body2.fontSize,
        borderRadius: 'var(--mui-shape-customBorderRadius-sm)'
      }),
      sizeLarge: {
        fontSize: '1.0625rem',
        lineHeight: 1.529412,
        borderRadius: 'var(--mui-shape-customBorderRadius-lg)'
      },
      startIcon: ({ theme, ownerState }) => ({
        ...(ownerState.size === 'small'
          ? {
              marginInlineEnd: theme.spacing(1.5)
            }
          : {
              ...(ownerState.size === 'medium'
                ? {
                    marginInlineEnd: theme.spacing(2)
                  }
                : {
                    marginInlineEnd: theme.spacing(2.5)
                  })
            }),
        ...iconStyles(ownerState.size)
      }),
      endIcon: ({ theme, ownerState }) => ({
        ...(ownerState.size === 'small'
          ? {
              marginInlineStart: theme.spacing(1.5)
            }
          : {
              ...(ownerState.size === 'medium'
                ? {
                    marginInlineStart: theme.spacing(2)
                  }
                : {
                    marginInlineStart: theme.spacing(2.5)
                  })
            }),
        ...iconStyles(ownerState.size)
      }),
      text: ({ ownerState }) => ({
        ...(ownerState.color !== 'inherit' && {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: `var(--mui-palette-${ownerState.color}-lighterOpacity)`
            },
          '&.Mui-disabled': {
            color: `var(--mui-palette-${ownerState.color}-main)`
          }
        })
      }),
      outlined: ({ ownerState }) => ({
        borderColor: `var(--mui-palette-${ownerState.color}-main)`,
        ...(ownerState.color !== 'inherit' && {
          '&:not(.Mui-disabled):hover': {
            color: `var(--mui-palette-${ownerState.color}-contrastText)`,
            backgroundColor: `var(--mui-palette-${ownerState.color}-dark)`,
            borderColor: `var(--mui-palette-${ownerState.color}-dark)`,
            boxShadow: `var(--mui-customShadows-${ownerState.color}-sm)`
          },
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            color: `var(--mui-palette-${ownerState.color}-contrastText)`,
            backgroundColor: `var(--mui-palette-${ownerState.color}-dark)`,
            borderColor: `var(--mui-palette-${ownerState.color}-dark)`,
            boxShadow: 'none'
          },
          '&.Mui-disabled': {
            color: `var(--mui-palette-${ownerState.color}-main)`,
            borderColor: `var(--mui-palette-${ownerState.color}-main)`
          }
        })
      }),
      contained: ({ ownerState }) => ({
        ...(ownerState.color !== 'inherit' && {
          '&:not(.Mui-disabled):not(.MuiButtonGroup-grouped)': {
            boxShadow: `var(--mui-customShadows-${ownerState.color}-sm)`
          },
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            color: `var(--mui-palette-${ownerState.color}-contrastText)`,
            backgroundColor: `var(--mui-palette-${ownerState.color}-dark)`,
            boxShadow: 'none'
          },
          '&.Mui-disabled': {
            color: `var(--mui-palette-${ownerState.color}-contrastText)`,
            backgroundColor: `var(--mui-palette-${ownerState.color}-main)`
          }
        })
      })
    }
  }
}

export default button
