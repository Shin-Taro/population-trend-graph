type ColorKey = `COLOR_${string}`
type ColorValue = `#${string}`

const COLOR_C4C4C4 = "#c4c4c4"

export const Colors = {
  COLOR_C4C4C4,
} as const satisfies Record<ColorKey, ColorValue>
