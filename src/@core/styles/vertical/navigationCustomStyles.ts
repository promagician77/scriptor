// MUI Imports
import type { Theme } from '@mui/material/styles'

// Third-party Imports
import type { CSSObject } from '@emotion/react'

// Type Imports
import type { VerticalNavState } from '@menu/contexts/verticalNavContext'
import type { Settings } from '@core/contexts/settingsContext'

// Util Imports
import { menuClasses, verticalNavClasses } from '@menu/utils/menuClasses'

const navigationCustomStyles = (verticalNavOptions: VerticalNavState, theme: Theme, settings?: Settings): CSSObject => {
  // Vars
  const { collapsedWidth, isCollapsed, isHovered, transitionDuration, isBreakpointReached, isToggled } =
    verticalNavOptions

  const isSemiDark = settings?.semiDark
  const collapsedHovered = isCollapsed && isHovered
  const collapsedNotHovered = isCollapsed && !isHovered

  return {
    color: 'var(--mui-palette-text-primary)',
    zIndex: 'var(--drawer-z-index) !important',
    [`& .${verticalNavClasses.bgColorContainer}`]: {
      overflow: 'visible'
    },
    [`& .${verticalNavClasses.header}`]: {
      paddingBlock: theme.spacing(4.25),
      paddingInline: theme.spacing(8, 5),
      marginBlockStart: theme.spacing(3),
      position: 'relative',

      ...(collapsedNotHovered && {
        paddingInline: theme.spacing(8),
        '& a': {
          transform: `translateX(-${22 - ((collapsedWidth as number) - 42) / 2}px)`
        }
      }),
      '& a': {
        transition: `transform ${transitionDuration}ms ease`
      }
    },
    [`& .${verticalNavClasses.container}`]: {
      transition: theme.transitions.create(['inline-size', 'inset-inline-start', 'box-shadow'], {
        duration: transitionDuration,
        easing: 'ease-in-out'
      }),
      borderColor: 'transparent',
      boxShadow: 'var(--mui-customShadows-sm)',
      '[data-skin="bordered"] &': {
        boxShadow: 'none',
        ...(collapsedHovered && {
          boxShadow: 'var(--mui-customShadows-sm)'
        }),
        borderColor: 'var(--mui-palette-divider)'
      }
    },
    [`& .${verticalNavClasses.header} > span`]: {
      position: 'absolute',
      right: -11,
      ...(isBreakpointReached &&
        !isToggled && {
          display: 'none !important'
        }),

      '& .icon-wrapper': {
        display: 'flex',
        borderColor: 'var(--mui-palette-background-default)',
        borderRadius: '50%',
        backgroundColor: 'var(--mui-palette-primary-main)',
        '& i, & svg': {
          margin: theme.spacing(0.5),
          fontSize: '1.125rem',
          color: 'var(--mui-palette-primary-contrastText)',
          transition: `transform ${transitionDuration}ms ease-in-out`,

          transform: `rotate(${collapsedHovered ? '180deg' : '0deg'})`,
          '[dir="rtl"] &': {
            transform: `rotate(${collapsedHovered ? '0deg' : '180deg'})`
          }
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inlineSize: 36,
          aspectRatio: 1,
          zIndex: -1,
          background: 'var(--mui-palette-background-default)',
          insetBlockStart: 'calc(50% - 18px)',
          insetInlineEnd: -7,
          borderRadius: '50%',
          ...(!isBreakpointReached &&
            !isSemiDark && {
              '[data-skin="bordered"] &': {
                border: '1px solid var(--mui-palette-divider)',
                clipPath: 'circle(71% at 0% 50%)',
                '[dir="rtl"] &': {
                  clipPath: 'circle(71% at 100% 50%)'
                }
              }
            })
        }
      }
    },
    [`& .${menuClasses.root}`]: {
      paddingBlock: theme.spacing(1)
    },
    [`& .${verticalNavClasses.backdrop}`]: {
      backgroundColor: 'var(--backdrop-color)'
    }
  }
}

export default navigationCustomStyles
