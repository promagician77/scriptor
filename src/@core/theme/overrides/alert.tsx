// React Imports
import React from 'react'

// MUI Imports
import type { Theme } from '@mui/material/styles'

const alerts: Theme['components'] = {
  MuiAlert: {
    defaultProps: {
      iconMapping: {
        error: <i className='bx-error-circle' />,
        warning: <i className='bx-error' />,
        info: <i className='bx-info-circle' />,
        success: <i className='bx-check-circle' />
      }
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: theme.spacing(3, 4),
        gap: theme.spacing(3),
        ...theme.typography.body1,
        '&:not(:has(.MuiAlertTitle-root))': {
          '& .MuiAlert-icon + .MuiAlert-message': {
            alignSelf: 'center'
          },
          '&:has(.MuiAlert-action) .MuiAlert-icon': {
            marginBlockStart: 4
          }
        }
      }),
      icon: {
        padding: 0,
        margin: 0,
        minInlineSize: 22,
        blockSize: 22,
        borderRadius: 500,
        alignItems: 'center',
        justifyContent: 'center',
        '& i, & svg': {
          fontSize: 18
        }
      },
      message: {
        padding: 0
      },
      action: {
        padding: 0,
        marginInlineEnd: 0
      },
      standard: ({ ownerState }) => ({
        '& .MuiAlert-icon': {
          backgroundColor: `var(--mui-palette-${ownerState.severity}-main)`,
          color: `var(--mui-palette-${ownerState.severity}-contrastText)`,
          boxShadow: `0 0 0 2px var(--mui-palette-${ownerState.severity}-lightOpacity)`
        }
      }),
      outlined: ({ ownerState }) => ({
        borderColor: `var(--mui-palette-${ownerState.severity}-main)`,
        '& .MuiAlert-icon': {
          backgroundColor: `var(--mui-palette-${ownerState.severity}-main)`,
          color: `var(--mui-palette-${ownerState.severity}-contrastText)`,
          boxShadow: `0 0 0 2px var(--mui-palette-${ownerState.severity}-lightOpacity)`
        }
      }),
      filled: ({ ownerState }) => ({
        '& .MuiAlert-icon': {
          backgroundColor: 'var(--mui-palette-common-white)',
          color: `var(--mui-palette-${ownerState.severity}-main)`,
          boxShadow: `0 0 0 2px var(--mui-palette-${ownerState.severity}-light)`
        }
      })
    }
  },
  MuiAlertTitle: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: theme.typography.h5.fontSize,
        lineHeight: 1.33333,
        marginTop: 0,
        marginBottom: theme.spacing(1),
        color: 'inherit'
      })
    }
  }
}

export default alerts
