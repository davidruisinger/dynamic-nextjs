import { css, BaseThemedCssFunction } from 'styled-components'

/**
 * We are unsing the same breakpoints as bootstrap 4
 * See: https://getbootstrap.com/docs/4.0/layout/overview/#responsive-breakpoints
 *
 * NOTE: the sorting of those breakpoints matters!
 * Seee: https://stackoverflow.com/questions/8790321/why-does-the-order-of-media-queries-matter-in-css
 */
export const MEDIA_BREAKPOINTS = {
  // Extra small devices (portrait phones, less than 576px)
  // No media query since this is the default in our mobile 1st approach
  xs: 0,
  // Small devices (landscape phones, 576px and up)
  sm: 576,
  // Medium devices (tablets, 768px and up)
  md: 768,
  // Large devices (desktops, 992px and up)
  lg: 992,
  // Extra large devices (large desktops, 1200px and up)
  xl: 1200,
}

interface media {
  xs: BaseThemedCssFunction<any>
  sm: BaseThemedCssFunction<any>
  md: BaseThemedCssFunction<any>
  lg: BaseThemedCssFunction<any>
  xl: BaseThemedCssFunction<any>
}

/**
 * Iterates over the MEDIA_BREAKPOINTS,
 * creates an object with a function for each breakpoint
 * each function returns a media query for that breakpoint
 * Inspired by https://www.styled-components.com/docs/advanced#media-templates
 *
 * NOTE: We are using a mobile 1st approach using "min-width" instead of "max-width"
 */
//@ts-ignore
const mediaTemplate: media = Object.keys(MEDIA_BREAKPOINTS).reduce(
  (acc, label) => {
    // 16px == 1em
    acc[label] = (...args) => css`
      @media (min-width: ${MEDIA_BREAKPOINTS[label] / 16}em) {
        // @ts-ignore
        ${css(...args)};
      }
    `
    return acc
  },
  {}
)

export default mediaTemplate
