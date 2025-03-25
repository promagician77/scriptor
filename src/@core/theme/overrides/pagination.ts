// MUI Imports
import type { Theme } from '@mui/material/styles'

const pagination: Theme['components'] = {
  MuiPagination: {
    styleOverrides: {
      ul: { rowGap: 6 }
    }
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ ownerState }) => ({
        ...(ownerState.size === 'medium' && {
          height: '2.375rem',
          minWidth: '2.375rem'
        }),
        ...(ownerState.shape !== 'rounded' && {
          borderRadius: '50px'
        }),
        '&.Mui-selected.Mui-disabled': {
          color: 'var(--mui-palette-text-primary)',
          opacity: 0.45
        },
        '&.Mui-disabled': {
          opacity: 0.45
        },
        ...(ownerState.size === 'small' && {
          marginInline: '0.125rem',
          ...(ownerState.shape === 'rounded' && {
            borderRadius: 'var(--mui-shape-customBorderRadius-sm)'
          })
        }),
        ...(ownerState.size === 'large' && {
          marginInline: '0.25rem',
          ...(ownerState.shape === 'rounded' && {
            borderRadius: 'var(--mui-shape-customBorderRadius-lg)'
          })
        }),
        ...(ownerState.variant === 'tonal' && {
          '&:not(.MuiPaginationItem-ellipsis)': {
            backgroundColor: 'var(--mui-palette-action-selected)'
          },
          ...(ownerState.color === 'standard'
            ? {
                '&.Mui-selected': {
                  '&, &.Mui-disabled': {
                    backgroundColor: 'var(--mui-palette-primary-lightOpacity)',
                    color: 'var(--mui-palette-primary-main)'
                  },
                  '&:hover': {
                    backgroundColor: 'var(--mui-palette-primary-mainOpacity)'
                  }
                },
                '&:hover:not(.Mui-selected):not(.MuiPaginationItem-ellipsis)': {
                  backgroundColor: 'var(--mui-palette-action-disabledBackground)'
                }
              }
            : {
                '&.Mui-selected': {
                  '&, &.Mui-disabled': {
                    backgroundColor: `var(--mui-palette-${ownerState.color}-main)`,
                    color: `var(--mui-palette-${ownerState.color}-contrastText)`
                  },
                  '&:not(.Mui-disabled)': {
                    boxShadow: `var(--mui-customShadows-${ownerState.color}-sm)`
                  },
                  '&:hover': {
                    backgroundColor: `var(--mui-palette-${ownerState.color}-dark)`
                  }
                },
                '&:hover:not(.Mui-selected):not(.MuiPaginationItem-ellipsis)': {
                  backgroundColor: `var(--mui-palette-${ownerState.color}-lightOpacity)`,
                  color: `var(--mui-palette-${ownerState.color}-main)`
                }
              })
        })
      }),
      text: ({ ownerState }) => ({
        ...(ownerState.color !== 'standard' && {
          '&.Mui-selected.Mui-disabled': {
            backgroundColor: `var(--mui-palette-${ownerState.color}-main)`,
            color: `var(--mui-palette-${ownerState.color}-contrastText)`
          }
        })
      }),
      outlined: ({ ownerState }) => ({
        borderColor: 'var(--mui-palette-customColors-inputBorder)',
        ...(ownerState.color !== 'standard' && {
          '&.Mui-selected, &.Mui-selected.Mui-disabled': {
            color: `var(--mui-palette-${ownerState.color}-main)`,
            backgroundColor: `var(--mui-palette-${ownerState.color}-lightOpacity)`,
            borderColor: `rgb(var(--mui-palette-${ownerState.color}-mainChannel))`
          }
        })
      }),
      ellipsis: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      sizeSmall: {
        height: '1.875rem',
        minWidth: '1.875rem'
      },
      sizeLarge: {
        height: '3rem',
        minWidth: '3rem'
      }
    }
  }
}

export default pagination
