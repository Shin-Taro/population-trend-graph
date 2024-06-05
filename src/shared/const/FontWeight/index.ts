type FontWeightKey = `FONT_WEIGHT_${number}`

const FONT_WEIGHT_600 = 600

export const FontWeight = {
  FONT_WEIGHT_600,
} as const satisfies Record<FontWeightKey, number>
