type FontSizeKey = `FONT_SIZE_${number}`
type FontSizeValue = `${number}rem`

const FONT_SIZE_25 = "2.5rem"
const FONT_SIZE_18 = "1.8rem"
const FONT_SIZE_15 = "1.5rem"

export const FontSize = {
  FONT_SIZE_25,
  FONT_SIZE_15,
  FONT_SIZE_18,
} as const satisfies Record<FontSizeKey, FontSizeValue>
