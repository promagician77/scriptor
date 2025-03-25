// React Imports
import React from 'react'

// MUI Imports
import type { Theme } from '@mui/material/styles'

const Icon = () => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M4 7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7Z'
        stroke='var(--mui-palette-text-disabled)'
        strokeWidth='2'
      />
    </svg>
  )
}

const IndeterminateIcon = () => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z'
        fill='currentColor'
      />
      <path d='M8.5 11.5H15.5V12.5H8.5V11.5Z' fill='white' />
    </svg>
  )
}

const CheckedIcon = () => {
  return (
    <svg width='1em' height='1em' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z'
        fill='currentColor'
      />
      <path
        d='M11 13.793L9.35348 12.1465L8.64648 12.8535L11 15.207L15.8535 10.3535L15.1465 9.6465L11 13.793Z'
        fill='white'
      />
    </svg>
  )
}

const checkbox: Theme['components'] = {
  MuiCheckbox: {
    defaultProps: {
      icon: <Icon />,
      indeterminateIcon: <IndeterminateIcon />,
      checkedIcon: <CheckedIcon />
    },
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        ...(ownerState.size === 'small'
          ? {
              padding: theme.spacing(1),
              '& svg': {
                fontSize: '1.25rem'
              }
            }
          : {
              padding: theme.spacing(1.5),
              '& svg': {
                fontSize: '1.5rem'
              }
            }),
        '&:not(.Mui-checked):not(.Mui-disabled):not(.MuiCheckbox-indeterminate) svg, &:not(.Mui-checked):not(.Mui-disabled):not(.MuiCheckbox-indeterminate) i':
          {
            color: 'var(--mui-palette-text-disabled)'
          },
        '&.Mui-checked:not(.Mui-disabled) svg, &.MuiCheckbox-indeterminate:not(.Mui-disabled) svg': {
          filter: `drop-shadow(var(--mui-customShadows-${ownerState.color}-sm))`
        },
        '&.Mui-disabled': {
          opacity: 0.45,
          '&:not(.Mui-checked)': {
            color: 'var(--mui-palette-text-disabled)'
          },
          '&.Mui-checked.MuiCheckbox-colorPrimary': {
            color: 'var(--mui-palette-primary-main)'
          },
          '&.Mui-checked.MuiCheckbox-colorSecondary': {
            color: 'var(--mui-palette-secondary-main)'
          },
          '&.Mui-checked.MuiCheckbox-colorError': {
            color: 'var(--mui-palette-error-main)'
          },
          '&.Mui-checked.MuiCheckbox-colorWarning': {
            color: 'var(--mui-palette-warning-main)'
          },
          '&.Mui-checked.MuiCheckbox-colorInfo': {
            color: 'var(--mui-palette-info-main)'
          },
          '&.Mui-checked.MuiCheckbox-colorSuccess': {
            color: 'var(--mui-palette-success-main)'
          }
        }
      })
    }
  }
}

export default checkbox
