import { css } from "styled-components"
import ress from "ress"

export const reset = css`
  ${ress}

  * {
    box-sizing: border-box;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
  }

  li {
    list-style: none;
  }

  input,
  select,
  textarea,
  button,
  object,
  a[href] {
    &:focus {
      outline: solid 1px black;
    }
  }

  html {
    font-size: 62.5%;
  }
`
