// MUI Imports
import type { Theme } from '@mui/material/styles'

// Type Imports
import type { MenuItemStyles } from '@menu/types'

// Util Imports
import { menuClasses } from '@menu/utils/menuClasses'

const menuItemStyles = (theme: Theme, iconClass: string): MenuItemStyles => ({
  root: ({ level }) => ({
    [`&.${menuClasses.open} > .${menuClasses.button}`]: {
      backgroundColor: 'var(--mui-palette-action-hover) !important'
    },
    ...(level === 0
      ? {
          [`& .${menuClasses.button}.${menuClasses.active}`]: {
            backgroundColor: 'var(--mui-palette-primary-lightOpacity) !important',
            color: 'var(--mui-palette-primary-main) !important'
          }
        }
      : {
          [`&:not([aria-expanded]) > .${menuClasses.button}.${menuClasses.active}`]: {
            color: 'var(--mui-palette-primary-main)',
            backgroundColor: level === 1 ? 'var(--mui-palette-primary-lightOpacity)' : 'transparent'
          },
          [`&[aria-expanded] > .${menuClasses.button}.${menuClasses.active}`]: {
            backgroundColor: 'var(--mui-palette-action-selected) !important'
          }
        }),
    [`&.${menuClasses.disabled} > .${menuClasses.button}`]: {
      color: 'var(--mui-palette-text-disabled)',
      '& *': {
        color: 'inherit'
      }
    }
  }),
  button: ({ level }) => ({
    paddingInline: theme.spacing(4),
    '&:not(:has(.MuiChip-root))': {
      paddingBlock: theme.spacing(level === 0 ? 2.5 : 2)
    },
    '&:has(.MuiChip-root)': {
      paddingBlock: theme.spacing(level === 0 ? 2.25 : 1.75)
    },
    [`&:not(.${menuClasses.active}):hover, &:not(.${menuClasses.active}):focus-visible, &:not(.${menuClasses.active})[aria-expanded="true"]`]:
      {
        backgroundColor: 'var(--mui-palette-action-hover)'
      }
  }),
  icon: ({ level }) => ({
    marginInlineEnd: theme.spacing(2),
    ...(level < 2
      ? { fontSize: '1.375rem' }
      : {
          fontSize: '0.375rem',
          marginInlineStart: theme.spacing(0.5),
          [`.${menuClasses.active}:not([aria-expanded]) > .${menuClasses.active} &`]: {
            marginInlineStart: 0,
            borderRadius: '50%',
            boxShadow: '0 0 0 3px var(--mui-palette-primary-lightOpacity)'
          },
          [`[aria-expanded="true"] &`]: {
            borderRadius: '50%',
            boxShadow: '0 0 0 1px var(--mui-palette-background-paper)'
          }
        }),
    '& > i, & > svg': {
      fontSize: 'inherit'
    },
    [`& .${iconClass}`]: {
      fontSize: '0.375rem',
      color: 'var(--mui-palette-text-disabled)',
      ...(level === 1 && {
        marginInline: theme.spacing(2)
      }),
      [`.${menuClasses.active}:not([aria-expanded]) > .${menuClasses.active} &`]: {
        fontSize: '0.5rem',
        color: 'var(--mui-palette-primary-main)'
      }
    }
  }),
  prefix: {
    marginInlineEnd: theme.spacing(2)
  },
  suffix: {
    marginInlineStart: theme.spacing(2)
  },
  subMenuStyles: {
    zIndex: 'calc(var(--header-z-index) + 1)'
  },
  subMenuExpandIcon: {
    fontSize: '1.375rem',
    marginInlineStart: theme.spacing(2),
    '& i, & svg': {
      fontSize: 'inherit'
    }
  },
  subMenuContent: {
    backgroundColor: 'var(--mui-palette-background-paper)',
    borderRadius: 'var(--mui-shape-borderRadius)',
    boxShadow: 'var(--mui-customShadows-lg)',
    '[data-skin="bordered"] ~ [data-floating-ui-portal] &': {
      boxShadow: 'none',
      border: '1px solid var(--mui-palette-divider)'
    },
    '& > ul, & > div > ul': {
      paddingBlock: theme.spacing(2),
      '& > li:not(:last-child)': {
        marginBlockEnd: theme.spacing(0.5)
      }
    }
  }
})

export default menuItemStyles
