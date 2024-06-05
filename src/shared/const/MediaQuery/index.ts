const MEDIA_QUERY_SP = "@media screen and (max-width: 768px)"
const MEDIA_QUERY_PC = "@media screen and (min-width: 769px)"

export const MediaQuery = {
  MEDIA_QUERY_SP,
  MEDIA_QUERY_PC,
} as const satisfies Record<`MEDIA_QUERY_${string}`, string>
