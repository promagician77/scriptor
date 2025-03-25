// Third-party Imports
import styled from '@emotion/styled'
import type { CSSObject } from '@emotion/styled'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Util Imports
import { horizontalLayoutClasses } from '@layouts/utils/layoutClasses'

type StyledFooterProps = {
  overrideStyles?: CSSObject
}

const StyledFooter = styled.footer<StyledFooterProps>`
  &.${horizontalLayoutClasses.footerFixed} {
    position: sticky;
    inset-block-end: 0;
    z-index: var(--footer-z-index);
    background-color: var(--mui-palette-background-paper);
    box-shadow: var(--mui-customShadows-lg);
    [data-skin='bordered'] & {
      box-shadow: none;
      border-block-start: 1px solid var(--border-color);
    }
  }

  &.${horizontalLayoutClasses.footerContentCompact} .${horizontalLayoutClasses.footerContentWrapper} {
    margin-inline: auto;
    max-inline-size: ${themeConfig.compactContentWidth}px;
  }

  .${horizontalLayoutClasses.footerContentWrapper} {
    padding-block: 16px;
    padding-inline: ${themeConfig.layoutPadding}px;
  }

  ${({ overrideStyles }) => overrideStyles}
`

export default StyledFooter
