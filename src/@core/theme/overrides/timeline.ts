// MUI Imports
import type { Theme } from '@mui/material/styles'

const timeline: Theme['components'] = {
  MuiTimeline: {
    styleOverrides: {
      root: {
        padding: 0
      }
    }
  },
  MuiTimelineDot: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        margin: theme.spacing(3, 0),
        boxShadow: 'none',
        '&:has(> i), &:has(> svg)': {
          padding: 6
        },
        '& > svg, & > i': {
          fontSize: '1.25rem'
        },
        '&:has(svg)': {
          width: 32,
          height: 32,
          alignItems: 'center',
          justifyContent: 'center'
        },
        ...(ownerState.variant === 'tonal' && {
          border: 0,
          ...(ownerState.color === 'grey'
            ? {
                backgroundColor: 'var(--mui-palette-action-selected)',
                color: 'var(--mui-palette-text-primary)'
              }
            : {
                backgroundColor: `var(--mui-palette-${ownerState.color}-lightOpacity)`,
                color: `var(--mui-palette-${ownerState.color}-main)`
              })
        })
      }),
      filled: ({ ownerState }) => ({
        ...(ownerState.color === 'grey'
          ? { boxShadow: '0 0 0 3px rgb(var(--mui-palette-action-activeChannel) / 0.04)' }
          : { boxShadow: `0 0 0 3px var(--mui-palette-${ownerState.color}-lightOpacity)` })
      }),
      outlined: {
        padding: 5,
        '& + .MuiTimelineConnector-root': {
          backgroundColor: 'transparent',
          borderInlineStart: '1px dashed var(--mui-palette-divider)'
        },
        '&:has(+ .MuiTimelineConnector-root)': {
          marginBlock: '0.625rem'
        }
      }
    }
  },
  MuiTimelineConnector: {
    styleOverrides: {
      root: {
        width: 1,
        backgroundColor: 'var(--mui-palette-divider)'
      }
    }
  },
  MuiTimelineContent: {
    styleOverrides: {
      root: {
        paddingBottom: '1rem'
      }
    }
  }
}

export default timeline
