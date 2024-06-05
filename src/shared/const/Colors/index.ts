type ColorKey = `COLOR_${string}`
type ColorValue = `#${string}`

const COLOR_C4C4C4 = "#c4c4c4"
const COLOR_636363 = "#636363"
const COLOR_075FB1 = "#075fb1"

export const Colors = {
  COLOR_C4C4C4,
  COLOR_636363,
  COLOR_075FB1,
} as const satisfies Record<ColorKey, ColorValue>
