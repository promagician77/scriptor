// MUI Imports
import type { Theme } from '@mui/material/styles'

// Type Imports
import type { MenuItemStyles } from '@menu/types'
import type { VerticalNavState } from '@menu/contexts/verticalNavContext'

// Util Imports
import { menuClasses } from '@menu/utils/menuClasses'

const menuItemStyles = (verticalNavOptions: VerticalNavState, theme: Theme): MenuItemStyles => {
  // Vars
  const { isCollapsed, isHovered, isPopoutWhenCollapsed, transitionDuration } = verticalNavOptions

  const popoutCollapsed = isPopoutWhenCollapsed && isCollapsed
  const popoutExpanded = isPopoutWhenCollapsed && !isCollapsed
  const collapsedNotHovered = isCollapsed && !isHovered

  return {
    root: ({ level }) => ({
      ...(!isPopoutWhenCollapsed || popoutExpanded || (popoutCollapsed && level === 0)
        ? {
            marginBlockStart: theme.spacing(1)
          }
        : {
            marginBlockStart: 0
          }),
      [`&.${menuClasses.subMenuRoot}.${menuClasses.open} > .${menuClasses.button}`]: {
        backgroundColor: 'var(--mui-palette-action-selected)',
        ...(level > 0 && {
          [`.${menuClasses.icon}`]: {
            borderRadius: '50%',
            boxShadow: '0 0 0 1px var(--mui-palette-background-paper)'
          }
        })
      },
      ...(level == 0
        ? {
            [`& > .${menuClasses.button}.${menuClasses.active}`]: {
              backgroundColor: 'var(--mui-palette-primary-lightOpacity) !important',
              color: 'var(--mui-palette-primary-main) !important',
              '&::after': {
                content: '""',
                position: 'absolute',
                blockSize: '2.625rem',
                inlineSize: 4,
                backgroundColor: 'var(--mui-palette-primary-main)',
                insetInlineEnd: 0,
                borderStartStartRadius: 'var(--mui-shape-borderRadius)',
                borderEndStartRadius: 'var(--mui-shape-borderRadius)'
              }
            }
          }
        : {
            [`&.${menuClasses.subMenuRoot} > .${menuClasses.button}.${menuClasses.active}`]: {
              backgroundColor: 'var(--mui-palette-action-selected)'
            },
            [`&:not(.${menuClasses.subMenuRoot}) > .${menuClasses.button}.${menuClasses.active}`]: {
              color: 'inherit',
              backgroundColor: 'transparent',
              [`& .${menuClasses.icon}`]: {
                ...(level === 1
                  ? {
                      marginInlineStart: theme.spacing(popoutCollapsed ? 0 : 1)
                    }
                  : {
                      marginInlineStart: theme.spacing((popoutCollapsed ? 0 : 1) + 2 * (level - 1))
                    }),
                borderRadius: '50%',
                color: 'var(--mui-palette-primary-main)',
                boxShadow: '0 0 0 3px var(--mui-palette-primary-lightOpacity)',
                '& i': {
                  fontSize: '0.5rem'
                }
              }
            }
          }),
      [`&.${menuClasses.disabled} > .${menuClasses.button}`]: {
        color: 'var(--mui-palette-text-disabled)'
      }
    }),
    button: ({ level, active }) => ({
      marginInline: theme.spacing(4),
      paddingBlock: theme.spacing(2.5),
      paddingInline: theme.spacing(4),
      ...(popoutCollapsed &&
        level > 0 && {
          marginInline: 0,
          ...(popoutCollapsed && {
            marginBlockEnd: theme.spacing(0.5)
          })
        }),
      ...(!(isCollapsed && !isHovered) && {
        '&:has(.MuiChip-root)': {
          paddingBlock: theme.spacing(2.25)
        }
      }),
      ...((!isPopoutWhenCollapsed || popoutExpanded || (popoutCollapsed && level === 0)) && {
        borderRadius: 'var(--mui-shape-borderRadius)',
        transition: `padding-inline-start ${transitionDuration}ms ease-in-out`,
        paddingInline: theme.spacing(3.75)
      }),
      ...(!active && {
        '&:hover, &:focus-visible': {
          backgroundColor: 'var(--mui-palette-action-hover)'
        },
        '&[aria-expanded="true"]': {
          backgroundColor: 'var(--mui-palette-action-selected)'
        }
      })
    }),
    icon: ({ level }) => ({
      transition: `margin-inline-end ${transitionDuration}ms ease-in-out`,
      ...(level === 0 && {
        fontSize: '1.375rem',
        marginInlineEnd: theme.spacing(2)
      }),
      ...(level > 0 && {
        fontSize: '0.375rem',
        color: 'var(--mui-palette-text-disabled)',
        marginInlineEnd: theme.spacing(5)
      }),
      ...(level === 1 && {
        marginInlineStart: theme.spacing(popoutCollapsed ? 0.5 : 1.5)
      }),
      ...(level > 1 && {
        marginInlineStart: theme.spacing((popoutCollapsed ? 0.5 : 1.5) + 2 * (level - 1))
      }),
      ...(collapsedNotHovered && {
        marginInlineEnd: 0
      }),
      ...(popoutCollapsed &&
        level > 0 && {
          marginInlineEnd: theme.spacing(2)
        }),
      '& > i, & > svg': {
        fontSize: 'inherit'
      }
    }),
    prefix: {
      marginInlineEnd: theme.spacing(2)
    },
    label: ({ level }) => ({
      ...((!isPopoutWhenCollapsed || popoutExpanded || (popoutCollapsed && level === 0)) && {
        transition: `opacity ${transitionDuration}ms ease-in-out`,
        ...(collapsedNotHovered && {
          opacity: 0
        })
      })
    }),
    suffix: {
      marginInlineStart: theme.spacing(2)
    },
    subMenuExpandIcon: {
      fontSize: '1.375rem',
      marginInlineStart: theme.spacing(2),
      '& i, & svg': {
        fontSize: 'inherit'
      }
    },

    subMenuContent: ({ level }) => ({
      zIndex: 'calc(var(--drawer-z-index) + 1)',
      borderRadius: 'var(--border-radius)',
      backgroundColor: popoutCollapsed ? 'var(--mui-palette-background-paper)' : 'transparent',

      ...(popoutCollapsed &&
        level === 0 && {
          paddingBlock: theme.spacing(2),
          boxShadow: 'var(--mui-customShadows-lg)',
          '[data-skin="bordered"] ~ [data-floating-ui-portal] &': {
            boxShadow: 'none',
            border: '1px solid var(--mui-palette-divider)'
          },
          [`& .${menuClasses.button}`]: {
            paddingInline: theme.spacing(4)
          }
        })
    })
  }
}

export default menuItemStyles
