// MUI Imports
import type { Theme } from '@mui/material/styles'

// Type Imports
import type { VerticalNavState } from '@menu/contexts/verticalNavContext'
import type { MenuProps } from '@menu/vertical-menu'

// Util Imports
import { menuClasses } from '@menu/utils/menuClasses'

const menuSectionStyles = (verticalNavOptions: VerticalNavState, theme: Theme): MenuProps['menuSectionStyles'] => {
  // Vars
  const { isCollapsed, isHovered } = verticalNavOptions

  const collapsedNotHovered = isCollapsed && !isHovered

  return {
    root: {
      marginBlockStart: theme.spacing(4),
      [`& .${menuClasses.menuSectionContent}`]: {
        color: 'var(--mui-palette-text-disabled)',
        paddingInline: `${theme.spacing(collapsedNotHovered ? 7.75 : 0)} !important`,
        paddingBlock: `${theme.spacing(collapsedNotHovered ? 4.625 : 2.5)} !important`,
        marginBlockEnd: theme.spacing(2),
        gap: theme.spacing(4),

        '&:before': {
          content: '""',
          blockSize: 1,
          inlineSize: collapsedNotHovered ? '1.375rem' : '1rem',
          backgroundColor: 'var(--mui-palette-divider)'
        },

        [`& .${menuClasses.menuSectionLabel}`]: {
          flexGrow: 0,
          textTransform: 'uppercase',
          fontSize: '13px',
          lineHeight: 1.38462,
          letterSpacing: '0.4px',
          ...(collapsedNotHovered && {
            display: 'none'
          })
        }
      }
    }
  }
}

export default menuSectionStyles
