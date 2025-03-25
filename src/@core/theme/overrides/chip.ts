// MUI Imports
import type { Theme } from '@mui/material/styles'

const chip: Theme['components'] = {
  MuiChip: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        ...theme.typography.body2,
        fontWeight: theme.typography.fontWeightMedium,
        '&.MuiChip-outlined:not(.MuiChip-colorDefault)': {
          borderColor: `var(--mui-palette-${ownerState.color}-main)`
        },
        ...(ownerState.size === 'small'
          ? {
              blockSize: 24,
              borderRadius: 'var(--mui-shape-customBorderRadius-sm)'
            }
          : {
              blockSize: 28,
              borderRadius: 'var(--mui-shape-borderRadius)'
            }),
        '& .MuiChip-deleteIcon': {
          ...(ownerState.size === 'small'
            ? {
                fontSize: '1rem',
                marginInlineEnd: theme.spacing(1),
                marginInlineStart: theme.spacing(-2)
              }
            : {
                fontSize: '1.25rem',
                marginInlineEnd: theme.spacing(1.5),
                marginInlineStart: theme.spacing(-2)
              })
        },
        '& .MuiChip-avatar, & .MuiChip-icon': {
          '& i, & svg': {
            ...(ownerState.size === 'small'
              ? {
                  fontSize: 13
                }
              : {
                  fontSize: 15
                })
          },
          ...(ownerState.size === 'small'
            ? {
                blockSize: 16,
                inlineSize: 16,
                marginInlineStart: theme.spacing(1),
                marginInlineEnd: theme.spacing(-1.5)
              }
            : {
                blockSize: 20,
                inlineSize: 20,
                marginInlineStart: theme.spacing(1.5),
                marginInlineEnd: theme.spacing(-2)
              })
        },
        '&.Mui-disabled': {
          opacity: 0.45
        },
        ...(ownerState.variant === 'tonal' && {
          '&:not(.MuiChip-colorDefault)': {
            backgroundColor: `var(--mui-palette-${ownerState.color}-lightOpacity)`,
            color: `var(--mui-palette-${ownerState.color}-main)`,
            '&.Mui-focusVisible': {
              backgroundColor: `var(--mui-palette-${ownerState.color}-mainOpacity)`
            },
            '& .MuiChip-deleteIcon': {
              color: `rgb(var(--mui-palette-${ownerState.color}-mainChannel) / 0.7)`,
              '&:hover': {
                color: `var(--mui-palette-${ownerState.color}-main)`
              }
            },
            '&.MuiChip-clickable:hover': {
              backgroundColor: `var(--mui-palette-${ownerState.color}-main)`,
              color: 'var(--mui-palette-common-white)'
            }
          }
        })
      }),
      label: ({ ownerState, theme }) => ({
        ...(ownerState.size === 'small'
          ? {
              paddingInline: theme.spacing(2.5),
              paddingBlock: theme.spacing(0.5)
            }
          : {
              paddingInline: theme.spacing(3),
              paddingBlock: theme.spacing(1)
            })
      }),
      iconMedium: {
        fontSize: '1.25rem'
      },
      iconSmall: {
        fontSize: '1rem'
      }
    }
  }
}

export default chip
